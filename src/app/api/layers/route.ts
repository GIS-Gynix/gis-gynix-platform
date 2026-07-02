import { NextResponse, NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Forces Next.js to treat this as a live server endpoint rather than a static asset
export const dynamic = 'force-dynamic';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const downloadTable = searchParams.get('download');

  // Scenario 1: Dynamic GeoJSON Database Stream
  if (downloadTable) {
    try {
      const { data, error } = await supabase
        .rpc('export_table_to_geojson', { target_table: downloadTable.toLowerCase() });

      if (error) throw error;

      const geojsonPayload = JSON.stringify(data);

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

  // Scenario 2: Active Layer Catalog Response
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