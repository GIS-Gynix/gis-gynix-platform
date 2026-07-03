import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl!, supabaseKey!);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const downloadTable = searchParams.get("download");

  try {
    // 1. DOWNLOAD ROUTE HANDLER
    if (downloadTable) {
      const { data, error } = await supabase.rpc("get_table_data", { t_name: downloadTable });
      if (error) throw error;

      const geojson = {
        type: "FeatureCollection",
        features: data.map((row: any) => ({
          type: "Feature",
          geometry: typeof row.geom === "string" ? JSON.parse(row.geom) : row.geom,
          properties: { ...row, geom: undefined }
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

    // 2. DYNAMIC LAYERS DIRECTORY SCANNER
    const { data: tables, error: tableError } = await supabase.rpc("list_spatial_tables");
    if (tableError) throw tableError;

    const dynamicLayers = tables.map((t: any, index: number) => {
      const formattedName = t.table_name
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char: string) => char.toUpperCase());

      // Use the pgAdmin comment if it exists, otherwise fall back to generic
      const finalDescription = t.table_description || 
        `Automated live vector dataset index for ${formattedName}. Features include structural attribute schema maps parsed straight from your database topology.`;

      return {
        id: index + 1,
        table_name: t.table_name,
        display_name: formattedName,
        description: finalDescription,
        file_size_label: `${(t.estimated_bytes / (1024 * 1024)).toFixed(1)} MB`,
        is_downloadable: true,
        download_url: "#"
      };
    });

    return NextResponse.json({ success: true, layers: dynamicLayers });

  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}