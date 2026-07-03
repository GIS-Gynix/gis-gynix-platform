import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize your Supabase Service/Postgres client connection
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // or your standard service key
const supabase = createClient(supabaseUrl!, supabaseKey!);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const downloadTable = searchParams.get("download");

  try {
    // 1. DYNAMIC DOWNLOAD ROUTE
    if (downloadTable) {
      // Query the specific table requested directly from PostgreSQL
      const { data, error } = await supabase.rpc("get_table_data", { t_name: downloadTable });
      
      if (error) throw error;

      // Transform rows into a clean GeoJSON FeatureCollection format
      const geojson = {
        type: "FeatureCollection",
        features: data.map((row: any) => ({
          type: "Feature",
          geometry: typeof row.geom === "string" ? JSON.parse(row.geom) : row.geom,
          properties: { ...row, geom: undefined } // clear spatial data column from properties block
        }))
      };

      return new NextResponse(JSON.stringify(geojson), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Content-Disposition": `attachment; filename="${downloadTable.toLowerCase().replace(/\s+/g, "_")}.geojson"`
        }
      });
    }

    // 2. AUTO-DETECT CATALOG INDEX ROUTE
    // Queries the PostGIS system directory database directly for all active tables
    const { data: tables, error: tableError } = await supabase.rpc("list_spatial_tables");

    if (tableError) throw tableError;

    // Map system tables dynamically into the exact frontend structure your UI expects
    const dynamicLayers = tables.map((t: any, index: number) => {
      // Formats table name for presentation (e.g., 'pakistan_waterways_data' -> 'Pakistan Waterways Data')
      const formattedName = t.table_name
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char: string) => char.toUpperCase());

      return {
        id: index + 1,
        table_name: t.table_name,
        display_name: formattedName,
        description: `Automated live vector network index mapping system feature class: ${formattedName}. Features include attributes and projection mapping schema natively parsed from your cloud database topology.`,
        file_size_label: `${(t.estimated_bytes / (1024 * 1024)).toFixed(1)} MB`,
        is_downloadable: true,
        download_url: "#" // Triggers your frontend code fallback to stream via API route handler
      };
    });

    return NextResponse.json({ success: true, layers: dynamicLayers });

  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}