import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Requires service role to bypass row limits if exporting large datasets
const supabase = createClient(supabaseUrl!, supabaseKey!);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tableName = searchParams.get("table");

    if (!tableName) {
      return NextResponse.json({ success: false, error: "Table name parameter is required" }, { status: 400 });
    }

    // 1. Fetch data from PostGIS translating geometry to GeoJSON text natively in SQL
    // This handles any table dynamically and fetches all attribute columns
    const { data: records, error } = await supabase
      .from(tableName)
      .select(`*, geom`); 

    if (error || !records || records.length === 0) {
      return NextResponse.json({ success: false, error: error?.message || "No data found in table" }, { status: 404 });
    }

    // 2. Format database rows into a strictly-compliant GeoJSON FeatureCollection
    const geojson = {
      type: "FeatureCollection",
      features: records.map((row: any) => {
        // Extract geometry column
        const { geom, ...attributes } = row;

        let parsedGeometry = null;
        if (geom) {
          // If geom arrives as a stringified JSON object or PostGIS GeoJSON fragment
          parsedGeometry = typeof geom === "string" ? JSON.parse(geom) : geom;
        }

        return {
          type: "Feature",
          // CRITICAL: All alphanumeric data MUST live inside properties for QGIS/ArcGIS attribute tables
          properties: attributes, 
          geometry: parsedGeometry,
        };
      }),
    };

    // 3. Return as a forced attachment file download with clean headers
    return new NextResponse(JSON.stringify(geojson), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="${tableName}_export.geojson"`,
      },
    });

  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}