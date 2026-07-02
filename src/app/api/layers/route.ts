import { NextResponse, NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';
// Force Next.js to treat this as a live, dynamic server endpoint
export const dynamic = 'force-dynamic';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const downloadTable = searchParams.get('download');

  // SCENARIO 1: User wants to download a heavy dataset directly from the DB table
  if (downloadTable) {
    try {
      // Use RPC or raw PostGIS SQL command to convert the table into a feature collection
      // We safely fetch the spatial attributes and convert geometry to GeoJSON features
      const { data, error } = await supabase
        .rpc('export_table_to_geojson', { target_table: downloadTable.toLowerCase() });

      if (error) throw error;

      // Create a clean stringified GeoJSON payload
      const geojsonPayload = JSON.stringify(data);

      // Set headers to force the browser to trigger a download dialog save box
      return new NextResponse(geojsonPayload, {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Content-Disposition': `attachment; filename="${downloadTable}_network.geojson"`,
        },
      });
    } catch (err: any) {
      return NextResponse.json({ success: false, error: `Export failed: ${err.message}` }, { status: 500 });
    }
  }

  // SCENARIO 2: Default view - Fetch the catalog list for the frontend UI cards
  try {
    const { data, error } = await supabase
      .from('spatial_layers_registry')
      .select('*')
      .order('id', { ascending: true });

    if (error) throw error;

    return NextResponse.json({ success: true, layers: data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}