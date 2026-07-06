import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs"; // Force standard Node environment execution

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

    const encoder = new TextEncoder();

    // Create a native, high-performance web stream to pipe rows as they arrive
    const stream = new ReadableStream({
      async start(controller) {
        try {
          let page = 0;
          const CHUNK_SIZE = 2000;
          let keepFetching = true;
          let isFirstFeature = true;

          // 1. Write the initial GeoJSON FeatureCollection envelope wrapper header
          controller.enqueue(encoder.encode(`{\n"type": "FeatureCollection",\n"features": [\n`));

          while (keepFetching) {
            const from = page * CHUNK_SIZE;
            const to = from + CHUNK_SIZE - 1;

            const { data: chunk, error } = await supabase
              .from(tableName)
              .select(`*, geom`)
              .range(from, to);

            if (error) throw error;

            if (chunk && chunk.length > 0) {
              let textBlock = "";

              chunk.forEach((row: any) => {
                const { geom, ...attributes } = row;
                let parsedGeometry = null;
                
                if (geom) {
                  parsedGeometry = typeof geom === "string" ? JSON.parse(geom) : geom;
                }

                const feature = {
                  type: "Feature",
                  properties: attributes, // Keeps attribute tables fully readable in QGIS/ArcGIS
                  geometry: parsedGeometry
                };

                // Append comma separators cleanly between features
                textBlock += (isFirstFeature ? "" : ",\n") + JSON.stringify(feature);
                isFirstFeature = false;
              });

              // Push the formatted text block into the stream pipe channel
              controller.enqueue(encoder.encode(textBlock));

              if (chunk.length < CHUNK_SIZE) keepFetching = false;
              else page++;
            } else {
              keepFetching = false;
            }
          }

          // 2. Close out the GeoJSON JSON array wrapper syntax correctly
          controller.enqueue(encoder.encode(`\n]\n}`));
          controller.close(); // Close the network stream successfully
        } catch (streamErr: any) {
          console.error("Database streaming context error:", streamErr);
          controller.error(streamErr);
        }
      },
    });

    // Stream response directly to browser disk layout memory cache
    return new NextResponse(stream, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="${tableName}_complete.geojson"`,
        "Transfer-Encoding": "chunked",
      },
    });

  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}