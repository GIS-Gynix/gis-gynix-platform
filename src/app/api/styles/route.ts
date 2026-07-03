import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl!, supabaseKey!);

export async function GET() {
  try {
    const { data: styles, error } = await supabase
      .from("layer_styles")
      .select("table_name, styleqml");

    if (error || !styles || styles.length === 0) {
      console.warn("layer_styles table missing or empty.");
      return NextResponse.json({ success: true, styles: {} });
    }

    const styleMap: Record<string, string> = {};

    styles.forEach((row: any) => {
      const qml = row.styleqml || "";
      
      // 1. Try standard XML attribute format: color="#ff0000"
      let match = qml.match(/color="([^"]+)"/);
      
      // 2. Try QGIS property tag format: <prop k="color" v="#ff0000"/>
      if (!match) {
        match = qml.match(/k="color"\s+v="([^"]+)"/) || qml.match(/v="([^"]+)"\s+k="color"/);
      }

      // 3. Try fallback outline color tag if main color wasn't caught
      if (!match) {
        match = qml.match(/k="outline_color"\s+v="([^"]+)"/);
      }

      if (match && match[1]) {
        // Ensure it looks like a valid hex color code
        let color = match[1].trim();
        if (!color.startsWith("#") && /^[0-9A-Fa-f]{6}$/.test(color)) {
          color = `#${color}`;
        }
        // If QGIS saved it with an alpha channel (like #ff0000ff), strip the transparency part
        if (color.startsWith("#") && color.length === 9) {
          color = color.substring(0, 7);
        }
        
        styleMap[row.table_name] = color;
      }
    });

    return NextResponse.json({ success: true, styles: styleMap });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}