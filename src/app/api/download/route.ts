import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import Archiver from "archiver";
import { Readable } from "stream";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl!, supabaseKey!);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tableName = searchParams.get("table");

    if (!tableName) {
      return NextResponse.json({ success: false, error: "Table parameter required" }, { status: 400 });
    }

    // Set up a custom node-compatible Transform stream to format rows into GeoJSON chunks
    const systemPassThrough = new Readable({ read() {} });

    // Initialize the high-performance zip compressor
    const archive = Archiver("zip", { zlib: { level: 6 } });
    
    // Connect the compressor to push data into our readable stream output
    archive.pipe(systemPassThrough as any);

    // Kickoff asynchronous data streaming loop without blocking the execution thread
    (async () => {
      try {
        let page = 0;
        const CHUNK_SIZE = 2000;
        let keepFetching = true;

        // Write the GeoJSON header envelope wrapper into the archive pipeline entry
        archive.append(
          `{\n"type": "FeatureCollection",\n"features": [\n`, 
          { name: `${tableName}.geojson` }
        );

        let isFirstFeature = true;

        while (keepFetching) {
          const from = page * CHUNK_SIZE;
          const to = from + CHUNK_SIZE - 1;

          const { data: chunk, error } = await supabase
            .from(tableName)
            .select(`*, geom`)
            .range(from, to);

          if (error) throw error;

          if (chunk && chunk.length > 0) {
            let featureBlockText = "";
            
            chunk.forEach((row: any) => {
              const { geom, ...attributes } = row;
              let parsedGeometry = null;
              if (geom) {
                parsedGeometry = typeof geom === "string" ? JSON.parse(geom) : geom;
              }

              const feature = {
                type: "Feature",
                properties: attributes,
                geometry: parsedGeometry
              };

              featureBlockText += (isFirstFeature ? "" : ",\n") + JSON.stringify(feature);
              isFirstFeature = false;
            });

            // Feed the formatted geojson text block into the open archive file stream entry
            archive.write(featureBlockText);

            if (chunk.length < CHUNK_SIZE) keepFetching = false;
            else page++;
          } else {
            keepFetching = false;
          }
        }

        // Close out the JSON envelope syntax array constructs inside the archive
        archive.write(`\n]\n}`);
        await archive.finalize();
        systemPassThrough.push(null); // Signal EOF
      } catch (streamErr: any) {
        console.error("Streaming compilation runtime crash:", streamErr);
        systemPassThrough.push(null);
      }
    })();

    // Stream response directly using native headers to handle infinite payload sizing
    return new NextResponse(systemPassThrough as any, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${tableName}_spatial_package.zip"`,
        "Transfer-Encoding": "chunked",
      },
    });

  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}