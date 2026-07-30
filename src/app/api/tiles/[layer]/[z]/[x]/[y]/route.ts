import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables.");
}

const supabase = createClient(supabaseUrl, supabaseKey);

type RouteContext = {
  params: Promise<{
    layer: string;
    z: string;
    x: string;
    y: string;
  }>;
};

export async function GET(request: Request, context: RouteContext) {
  try {
    // 1. Await parameters for Next.js 15 compatibility
    const params = await context.params;
    const rawLayer = params.layer;
    const z = parseInt(params.z, 10);
    const x = parseInt(params.x, 10);
    const y = parseInt(params.y, 10);

    // Validate tile coordinates
    if (isNaN(z) || isNaN(x) || isNaN(y)) {
      return NextResponse.json({ error: "Invalid tile coordinates" }, { status: 400 });
    }

    // Decode and sanitize layer name
    const layer = decodeURIComponent(rawLayer).replace(/"/g, '""');

    // 2. PostGIS MVT Query (Assumes table geometry 'geom' is in EPSG:4326 or EPSG:3857)
    // ST_TileEnvelope(z, x, y) returns a box in SRID 3857
    const sqlQuery = `
      SELECT ST_AsMVT(tile, '${layer}', 4096, 'geom') AS mvt FROM (
        SELECT 
          id,
          ST_AsMVTGeom(
            ST_Transform(geom, 3857),
            ST_TileEnvelope(${z}, ${x}, ${y}),
            4096, 64, true
          ) AS geom
        FROM public."${layer}"
        WHERE ST_Intersects(
          ST_Transform(geom, 3857),
          ST_TileEnvelope(${z}, ${x}, ${y})
        )
      ) AS tile;
    `;

    const { data, error: tileError } = await supabase.rpc("execute_raw_tile_query", {
      query_text: sqlQuery,
    });

    if (tileError) {
      console.error("PostGIS Query Error:", tileError);
      return NextResponse.json({ error: tileError.message }, { status: 500 });
    }

    // 3. Handle Empty Tile Responses safely
    if (!data || data.length === 0) {
      return new NextResponse(null, { status: 204 });
    }

    // PostgREST hex strings often begin with '\x'
    let hexString = typeof data === "string" ? data : data[0]?.mvt || "";
    if (hexString.startsWith("\\x")) {
      hexString = hexString.slice(2);
    }

    if (!hexString) {
      return new NextResponse(null, { status: 204 });
    }

    const tileBuffer = Buffer.from(hexString, "hex");

    return new NextResponse(tileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/x-protobuf",
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      },
    });
  } catch (err: any) {
    console.error("Tile Endpoint Error:", err);
    return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
  }
}