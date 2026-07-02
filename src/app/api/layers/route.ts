import { NextResponse, NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return NextResponse.json({ success: true, layers: [] }, { status: 200 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json({ success: true, layers: [] }, { status: 200 });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  const { searchParams } = new URL(request.url);
  
  // Cleanly decode any empty spaces (%20) coming from the browser window URL string
  const downloadTable = searchParams.get('download') ? decodeURIComponent(searchParams.get('download')!) : null;

  if (downloadTable) {
    try {
      const { data, error } = await supabase
        .rpc('export_table_to_geojson', { target_table: downloadTable }); // Passing the un-lowercased name

      if (error) throw error;

      return new NextResponse(JSON.stringify(data), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Content-Disposition': `attachment; filename="${downloadTable.replace(/\s+/g, '_')}_network.geojson"`,
        },
      });
    } catch (err: any) {
      return NextResponse.json({ success: false, error: `Export failed: ${err.message}` }, { status: 500 });
    }
  }

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