'use client';
import { useEffect, useState } from 'react';
import { Download, Map, Layers, ShieldAlert } from 'lucide-react';

interface Layer {
  id: number;
  table_name: string;
  display_name: string;
  description: string;
  file_size_label: string;
  is_downloadable: boolean;
  download_url: string;
}

export default function DataCatalog() {
  const [layers, setLayers] = useState<Layer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/layers')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setLayers(data.layers);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-center py-20 text-slate-400 animate-pulse">Loading GIS Database Layers...</div>;
  }

  return (
    <div className="bg-slate-950 text-white min-h-screen py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="border-b border-slate-800 pb-6 mb-12">
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
            Geospatial Data Portal
          </h1>
          <p className="text-slate-400 mt-2">Download vector shapefile infrastructure datasets directly from our live server stack.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {layers.map((layer) => (
            <div key={layer.id} className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between transition hover:border-emerald-500/40 group">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <div className="p-2 bg-slate-950 rounded-lg text-emerald-400">
                    {layer.table_name.toLowerCase().includes('road') ? <Map className="w-5 h-5" /> : <Layers className="w-5 h-5" />}
                  </div>
                  <span className="text-xs font-mono text-slate-500 bg-slate-950 px-2 py-1 rounded">{layer.table_name}</span>
                </div>
                <h3 className="text-lg font-bold group-hover:text-emerald-400 transition-colors">{layer.display_name}</h3>
                <p className="text-sm text-slate-400 mt-2 line-clamp-3">{layer.description}</p>
              </div>

              <div className="border-t border-slate-800/60 pt-4 mt-6 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-semibold bg-slate-950 px-2 py-1 rounded">{layer.file_size_label}</span>
                {layer.is_downloadable ? (
                  <a 
                    href={layer.download_url.replace('https://gis-gynix-platform.vercel.app', '')} 
                    className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-xs font-bold px-4 py-2 rounded-lg transition active:scale-95"
                    download
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download SHP</span>
                  </a>
                ) : (
                  <span className="text-xs text-slate-500 italic flex items-center space-x-1"><ShieldAlert className="w-3.5 h-3.5" /><span>Secure Layer</span></span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}