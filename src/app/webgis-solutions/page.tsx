"use client";

import React, { useState, useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import { 
  Layers, Map as MapIcon, List, Eye, EyeOff, ShieldCheck, X 
} from "lucide-react";
import "maplibre-gl/dist/maplibre-gl.css";

interface GISLayer {
  id: string;
  table_name: string;
  display_name: string;
  visible: boolean;
  geometry_type: "line" | "point" | "polygon";
  legend_color: string;
  stroke_width: number;
  fill_opacity: number;
}

export default function WebGISAppsPage() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  
  // Widget Open/Close States
  const [openWidgets, setOpenWidgets] = useState<{
    layers: boolean;
    legend: boolean;
    basemaps: boolean;
  }>({
    layers: true,
    legend: false,
    basemaps: false
  });

  const [currentBasemap, setCurrentBasemap] = useState("dark");
  const [gisLayers, setGisLayers] = useState<GISLayer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const basemaps = [
    { 
      id: "streets", 
      label: "OpenStreetMap Standard", 
      style: {
        version: 8,
        sources: { 
          "osm-tiles": { 
            type: "raster", 
            tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"], 
            tileSize: 256, 
            attribution: "© OpenStreetMap contributors" 
          } 
        },
        layers: [{ id: "osm-layer", type: "raster", source: "osm-tiles" }]
      },
      thumbnail: "https://tile.openstreetmap.org/5/23/14.png"
    },
    { 
      id: "dark", 
      label: "Dark Gray Canvas", 
      style: {
        version: 8,
        sources: { 
          "carto-dark-tiles": { 
            type: "raster", 
            tiles: ["https://basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png"], 
            tileSize: 256, 
            attribution: "© CartoDB" 
          } 
        },
        layers: [{ id: "carto-dark-layer", type: "raster", source: "carto-dark-tiles" }]
      },
      thumbnail: "https://basemaps.cartocdn.com/dark_all/5/23/14.png"
    },
    { 
      id: "satellite", 
      label: "Imagery with Labels", 
      style: {
        version: 8,
        sources: { 
          "esri-satellite": { 
            type: "raster", 
            tiles: ["https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"], 
            tileSize: 256, 
            attribution: "© Esri" 
          },
          "carto-labels": {
            type: "raster",
            tiles: ["https://basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png"],
            tileSize: 256
          }
        },
        layers: [
          { id: "satellite-layer", type: "raster", source: "esri-satellite" },
          { id: "labels-layer", type: "raster", source: "carto-labels" }
        ]
      },
      thumbnail: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/5/14/11"
    }
  ];

  useEffect(() => {
    Promise.all([
      fetch("/api/layers").then(res => res.json()),
      fetch("/api/styles").then(res => res.json())
    ]).then(([layersData, stylesData]) => {
      if (layersData.success) {
        const sldStyles = stylesData.styles || {};
        
        const liveLayers = layersData.layers.map((layer: any) => {
          const nameLower = layer.table_name.toLowerCase();
          
          let geomType: "line" | "point" | "polygon" = "polygon";
          if (nameLower.includes("water") || nameLower.includes("road") || nameLower.includes("stream") || nameLower.includes("railway") || nameLower.includes("canal") || nameLower.includes("pipeline")) {
            geomType = "line";
          } else if (nameLower.includes("point") || nameLower.includes("node") || nameLower.includes("station")) {
            geomType = "point";
          }

          const sldRule = sldStyles[layer.table_name] || { color: "#3A86FF", width: 2.5, opacity: 0.5 };

          return {
            id: layer.id.toString(),
            table_name: layer.table_name,
            display_name: layer.display_name,
            visible: false,
            geometry_type: geomType,
            legend_color: sldRule.color,
            stroke_width: sldRule.width,
            fill_opacity: sldRule.opacity
          };
        });
        setGisLayers(liveLayers);
      }
      setLoading(false);
    }).catch((err) => {
      console.error("Error setting operations workspace:", err);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    const initialBasemap = basemaps.find(b => b.id === currentBasemap) || basemaps[1];

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: initialBasemap.style as any,
      center: [69.3451, 30.3753], 
      zoom: 5.5,
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: true }), "top-right");
    mapRef.current = map;

    map.on("style.load", () => {
      gisLayers.forEach((layer) => {
        if (layer.visible) {
          reapplyLayerToMap(map, layer);
        }
      });
    });

    return () => map.remove();
  }, []);

  const reapplyLayerToMap = (map: maplibregl.Map, layer: GISLayer) => {
    if (!map.getSource(layer.table_name)) {
      map.addSource(layer.table_name, {
        type: "vector",
        tiles: [`${window.location.origin}/api/tiles/${layer.table_name}/{z}/{x}/{y}`],
      });
    }

    if (!map.getLayer(layer.table_name)) {
      if (layer.geometry_type === "line") {
        map.addLayer({
          id: layer.table_name,
          type: "line",
          source: layer.table_name,
          "source-layer": layer.table_name,
          paint: { "line-color": layer.legend_color, "line-width": layer.stroke_width }
        });
      } else if (layer.geometry_type === "point") {
        map.addLayer({
          id: layer.table_name,
          type: "circle",
          source: layer.table_name,
          "source-layer": layer.table_name,
          paint: {
            "circle-color": layer.legend_color,
            "circle-radius": 6,
            "circle-stroke-color": "#ffffff",
            "circle-stroke-width": 1
          }
        });
      } else {
        map.addLayer({
          id: layer.table_name,
          type: "fill",
          source: layer.table_name,
          "source-layer": layer.table_name,
          paint: {
            "fill-color": layer.legend_color,
            "fill-opacity": layer.fill_opacity,
            "fill-outline-color": layer.legend_color
          }
        });
      }
    } else {
      map.setLayoutProperty(layer.table_name, "visibility", "visible");
    }
  };

  const toggleWidget = (widget: "layers" | "legend" | "basemaps") => {
    setOpenWidgets(prev => ({ ...prev, [widget]: !prev[widget] }));
  };

  const handleBasemapChange = (styleConfig: any, id: string) => {
    setCurrentBasemap(id);
    if (mapRef.current) {
      mapRef.current.setStyle(styleConfig);
    }
  };

  const toggleLayerVisibility = (id: string) => {
    setGisLayers(prev => prev.map(layer => {
      if (layer.id === id) {
        const nextVisibility = !layer.visible;
        const map = mapRef.current;
        if (map) {
          if (nextVisibility) reapplyLayerToMap(map, layer);
          else if (map.getLayer(layer.table_name)) map.setLayoutProperty(layer.table_name, "visibility", "none");
        }
        return { ...layer, visible: nextVisibility };
      }
      return layer;
    }));
  };

  return (
    <div className="w-full h-screen relative bg-slate-950 overflow-hidden font-sans text-slate-200">
      
      {/* FULL SCREEN INTERACTIVE MAP CANVAS */}
      <div className="w-full h-full absolute inset-0 z-0" ref={mapContainerRef} />

      {/* TOP LEFT ICON DOCK (Esri Style) */}
      <div className="absolute top-20 left-4 z-10 flex flex-col space-y-2 bg-slate-900/90 backdrop-blur-md border border-slate-800 p-2 rounded-xl shadow-2xl">
        <button 
          onClick={() => toggleWidget("layers")}
          className={`p-3 rounded-lg transition-all ${openWidgets.layers ? "bg-emerald-500 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
          title="Operational Layers"
        >
          <Layers size={20} />
        </button>
        <button 
          onClick={() => toggleWidget("legend")}
          className={`p-3 rounded-lg transition-all ${openWidgets.legend ? "bg-cyan-500 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
          title="Map Symbology Legend"
        >
          <List size={20} />
        </button>
        <button 
          onClick={() => toggleWidget("basemaps")}
          className={`p-3 rounded-lg transition-all ${openWidgets.basemaps ? "bg-amber-500 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}
          title="Basemap Gallery"
        >
          <MapIcon size={20} />
        </button>
      </div>

      {/* WIDGET 1: LAYER CATALOG (TOP RIGHT WINDOW) */}
      {openWidgets.layers && (
        <div className="absolute top-20 right-4 z-10 w-80 sm:w-8c bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between bg-slate-950/80 px-4 py-3 border-b border-slate-800/60">
            <div className="flex items-center space-x-2">
              <Layers size={14} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider font-mono">Layer List</span>
            </div>
            <button onClick={() => toggleWidget("layers")} className="text-slate-500 hover:text-white"><X size={14} /></button>
          </div>
          <div className="p-4 max-h-64 overflow-y-auto space-y-2 scrollbar-none">
            {loading && <div className="text-center py-4 text-xs font-mono text-slate-500 animate-pulse">Loading spatial assets...</div>}
            {!loading && gisLayers.map(layer => (
              <div 
                key={layer.id} 
                onClick={() => toggleLayerVisibility(layer.id)} 
                className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer select-none transition-all ${
                  layer.visible ? "bg-slate-800/60 border-emerald-500/40 text-white" : "bg-slate-950/40 border-slate-800/80 text-slate-400 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: layer.legend_color }} />
                  <span className="text-xs font-semibold tracking-wide">{layer.display_name}</span>
                </div>
                {layer.visible ? <Eye size={13} className="text-emerald-400" /> : <EyeOff size={13} />}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* WIDGET 2: MAP SYMBOLOGY LEGEND (BOTTOM RIGHT WINDOW) */}
      {openWidgets.legend && (
        <div className="absolute bottom-16 right-4 z-10 w-80 bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between bg-slate-950/80 px-4 py-3 border-b border-slate-800/60">
            <div className="flex items-center space-x-2">
              <List size={14} className="text-cyan-400" />
              <span className="text-xs font-bold uppercase tracking-wider font-mono">Legend</span>
            </div>
            <button onClick={() => toggleWidget("legend")} className="text-slate-500 hover:text-white"><X size={14} /></button>
          </div>
          <div className="p-4 max-h-60 overflow-y-auto space-y-3 scrollbar-none">
            {gisLayers.filter(l => l.visible).length === 0 ? (
              <div className="text-center py-4 text-xs font-mono text-slate-500 border border-dashed border-slate-800 rounded-lg">No layers turned on.</div>
            ) : (
              gisLayers.filter(l => l.visible).map(layer => (
                <div key={layer.id} className="flex flex-col space-y-1.5 pl-1">
                  <span className="text-xs font-semibold text-slate-300">{layer.display_name}</span>
                  <div className="flex items-center space-x-3 pl-2">
                    {layer.geometry_type === "line" ? (
                      <div className="w-6 rounded-full" style={{ backgroundColor: layer.legend_color, height: `${layer.stroke_width}px` }} />
                    ) : (
                      <div className="w-4 h-3 rounded-sm" style={{ backgroundColor: layer.legend_color, opacity: layer.fill_opacity }} />
                    )}
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Active Layer style</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* WIDGET 3: BASEMAP GALLERY (FLOATING SIDE-WIDGET) */}
      {openWidgets.basemaps && (
        <div className="absolute top-20 left-20 z-10 w-72 bg-slate-900/95 backdrop-blur-md border border-slate-800 rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between bg-slate-950/80 px-4 py-3 border-b border-slate-800/60">
            <div className="flex items-center space-x-2">
              <MapIcon size={14} className="text-amber-400" />
              <span className="text-xs font-bold uppercase tracking-wider font-mono">Basemaps</span>
            </div>
            <button onClick={() => toggleWidget("basemaps")} className="text-slate-500 hover:text-white"><X size={14} /></button>
          </div>
          <div className="p-3 grid grid-cols-1 gap-2 max-h-64 overflow-y-auto scrollbar-none">
            {basemaps.map(bm => (
              <div 
                key={bm.id}
                onClick={() => handleBasemapChange(bm.style, bm.id)}
                className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer border transition-all ${
                  currentBasemap === bm.id ? "bg-amber-500/10 border-amber-400 text-white" : "bg-slate-950/30 border-slate-800 text-slate-400 hover:border-slate-700"
                }`}
              >
                <img src={bm.thumbnail} alt={bm.label} className="w-12 h-10 object-cover rounded border border-slate-800" />
                <span className="text-xs font-semibold truncate">{bm.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* STATUS SYSTEM BADGE */}
      <div className="absolute bottom-4 left-4 z-10 bg-slate-950/80 backdrop-blur-md border border-slate-800 px-3 py-1.5 rounded-lg flex items-center space-x-2 pointer-events-none shadow-xl">
        <ShieldCheck className="text-emerald-400" size={14} />
        <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">
          Dynamic HUD System Synchronized
        </span>
      </div>

    </div>
  );
}