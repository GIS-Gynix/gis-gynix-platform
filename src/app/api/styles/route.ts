import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl!, supabaseKey!);

export async function GET() {
  try {
    const { data: layers, error } = await supabase
      .from("spatial_layers_registry")
      .select("table_name, sld_text");

    if (error || !layers) {
      return NextResponse.json({ success: false, error: error?.message }, { status: 500 });
    }

    const styleMap: Record<string, { color: string; width: number; opacity: number }> = {};

    layers.forEach((row: any) => {
      const sld = row.sld_text || "";
      
      // Default fallback values if no SLD is uploaded yet
      let color = "#3A86FF";
      let width = 2.5;
      let opacity = 0.5;

      // Robust regex parsing for standard OGC SLD configurations
      const fillMatch = sld.match(/<se:SvgParameter name="fill">([^<]+)<\/se:SvgParameter>/i) || 
                        sld.match(/<CssParameter name="fill">([^<]+)<\/CssParameter>/i);
      const strokeMatch = sld.match(/<se:SvgParameter name="stroke">([^<]+)<\/se:SvgParameter>/i) || 
                          sld.match(/<CssParameter name="stroke">([^<]+)<\/CssParameter>/i);
      const widthMatch = sld.match(/<se:SvgParameter name="stroke-width">([^<]+)<\/se:SvgParameter>/i) || 
                         sld.match(/<CssParameter name="stroke-width">([^<]+)<\/CssParameter>/i); // Fixed typo here (wl -> sld)
      const opacityMatch = sld.match(/<se:SvgParameter name="fill-opacity">([^<]+)<\/se:SvgParameter>/i) || 
                           sld.match(/<CssParameter name="fill-opacity">([^<]+)<\/CssParameter>/i);

      if (fillMatch) color = fillMatch[1].trim();
      else if (strokeMatch) color = strokeMatch[1].trim();
      
      if (widthMatch) width = parseFloat(widthMatch[1].trim()) || 2.5;
      if (opacityMatch) opacity = parseFloat(opacityMatch[1].trim()) || 0.5;

      styleMap[row.table_name] = { color, width, opacity };
    });

    return NextResponse.json({ success: true, styles: styleMap });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}