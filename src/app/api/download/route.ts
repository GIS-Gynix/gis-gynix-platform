import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Using Service Role is crucial to bypass RLS limits
const supabase = createClient(supabaseUrl!, supabaseKey!);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tableName = searchParams.get("table");

    if (!tableName) {
      return NextResponse.json({ success: false, error: "Table name parameter is required" }, { status: 400 });
    }

    let allRecords: any[] = [];
    let keepFetching = true;
    let page = 0;
    const CHUNK_SIZE = 1000; // Fetch in standard safe blocks

    // LOOP UNTIL 100% OF THE DATA ROWS ARE RETRIEVED
    while (keepFetching) {
      const from = page * CHUNK_SIZE;
      const to = from + CHUNK_SIZE - 1;

      const { data: chunk, error } = await supabase
        .from(tableName)
        .select(`*, geom`)
        .range(from, to); // Explicitly request the next block of rows

      if (error) {
        throw new Error(`Database pagination error: ${error.message}`);
      }

      if (chunk && chunk.length > 0) {
        allRecords = [...allRecords, ...chunk];
        
        // If the chunk fetched is less than the requested size, we have hit the end of the table
        if (chunk.length < CHUNK_SIZE) {
          keepFetching = false;
        } else {
          page++;
        }
      } else {
        keepFetching = false; // No more records found
      }
    }

    if (allRecords.length === 0) {
      return NextResponse.json({ success: false, error: "No data found in this spatial table" }, { status: 404 });
    }

    // Convert the complete array of rows into a fully-compliant OGC GeoJSON FeatureCollection
    const geojson = {
      type: "FeatureCollection",
      features: allRecords.map((row: any) => {
        const { geom, ...attributes } = row;

        let parsedGeometry = null;
        if (geom) {
          parsedGeometry = typeof geom === "string" ? JSON.parse(geom) : geom;
        }

        return {
          type: "Feature",
          properties: attributes, // Keeps attribute tables 100% intact for QGIS/ArcGIS
          geometry: parsedGeometry,
        };
      }),
    };

    // Return the complete file bundle as an attachment stream
    return new NextResponse(JSON.stringify(geojson), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="${tableName}_complete_export.geojson"`,
      },
    });

  } catch (err: any) {
    console.error("Data Portal Export Failure:", err.message);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}