import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl!, supabaseKey!);

export async function GET() {
  try {
    // Query the standard metadata table where QGIS stores layer styles automatically
    const { data: styles, error } = await supabase
      .from("layer_styles")
      .select("table_name, styleqml");

    if (error) {
      console.warn("layer_styles table not found or empty. Using fallbacks.");
      return NextResponse.json({ success: true, styles: {} });
    }

    const styleMap: Record<string, string> = {};

    styles.forEach((row: any) => {
      // Regex pattern to extract the exact hex color code from QGIS XML style definitions
      const hexMatch = row.styleqml?.match(/color="([^"]+)"/);
      if (hexMatch && hexMatch[1]) {
        styleMap[row.table_name] = hexMatch[1]; // Maps e.g. "pakistan_roads" -> "#FF00AA"
      }
    });

    return NextResponse.json({ success: true, styles: styleMap });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}