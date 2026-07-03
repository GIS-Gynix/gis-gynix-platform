import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl!, supabaseKey!);

type RouteContext = {
  params: {
    layer: string;
    z: string;
    x: string;
    y: string;
  };
};

export async function GET(request: Request, context: RouteContext) {
  const { layer, z, x, y } = context.params;

  try {
    // 1. Fetch the raw vector tile data from PostGIS
    const sqlQuery = `
      SELECT ST_AsMVT(tile, '${layer}', 4096, 'geom') FROM (
        SELECT 
          id,
          ST_AsMVTGeom(
            ST_Transform(geom, 3857),
            ST_TileEnvelope(${z}, ${x}, ${y}),
            4096, 64, true
          ) AS geom
        FROM public."${layer}"
        WHERE ST_Intersects(geom, ST_Transform(ST_TileEnvelope(${z}, ${x}, ${y}), 4326))
      ) AS tile;
    `;

    const { data: tileData, error: tileError } = await supabase.rpc("execute_raw_tile_query", { query_text: sqlQuery });
    if (tileError) throw tileError;

    const tileBuffer = Buffer.from(tileData, "hex");

    return new NextResponse(tileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/x-protobuf",
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}