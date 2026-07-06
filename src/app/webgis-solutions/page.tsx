"use client";

import React, { useState, useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import { 
  Layers, Map as MapIcon, List, ChevronLeft, ChevronRight, 
  Eye, EyeOff, ShieldCheck 
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
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<"layers" | "legend" | "basemaps">("layers");
  const [currentBasemap, setCurrentBasemap] = useState("dark");
  const [gisLayers, setGisLayers] = useState<GISLayer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 3 Primary Industry-Standard Basemaps (Corrected Tile Links)
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

  // 1. Fetch layers and exact SLD styles concurrently
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

  // 2. Initialize MapLibre Viewport
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const initialBasemap = basemaps.find(b => b.id === currentBasemap) || basemaps[1];

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: initialBasemap.style as any,
      center: [69.3451, 30.3753], // Pakistan View Coordinates
      zoom: 5.5,
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: true }), "top-right");
    mapRef.current = map;

    // Re-inject custom operational layers automatically whenever style canvas modifies
    map.on("style.load", () => {
      gisLayers.forEach((layer) => {
        if (layer.visible) {
          reapplyLayerToMap(map, layer);
        }
      });
    });

    return () => map.remove();
  }, []); // Run once on load to avoid full re-initialization maps loop glitches

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
          paint: {
            "line-color": layer.legend_color,
            "line-width": layer.stroke_width
          }
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

  // 3. Basemap Switch Controls
  const handleBasemapChange = (styleConfig: any, id: string) => {
    setCurrentBasemap(id);
    if (mapRef.current) {
      mapRef.current.setStyle(styleConfig);
    }
  };

  // 4. Secure Layer Visibility Toggle
  const toggleLayerVisibility = (id: string) => {
    setGisLayers(prev => prev.map(layer => {
      if (layer.id === id) {
        const nextVisibility = !layer.visible;
        const map = mapRef.current;
        if (map) {
          if (nextVisibility) {
            reapplyLayerToMap(map, layer);
          } else {
            if (map.getLayer(layer.table_name)) {
              map.setLayoutProperty(layer.table_name, "visibility", "none");
            }
          }
        }
        return { ...layer, visible: nextVisibility };
      }
      return layer;
    }));
  };

  return (
    <div className="w-full h-screen flex overflow-hidden bg-slate-950 font-sans text-slate-200 relative pt-16">
      
      {/* STATUS BADGE */}
      <div className="absolute bottom-4 right-4 z-10 bg-slate-950/80 backdrop-blur-md border border-slate-800/80 rounded-lg px-3 py-1.5 flex items-center space-x-2 pointer-events-none shadow-xl">
        <ShieldCheck className="text-emerald-400" size={14} />
        <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">
          SLD Cartography Engine Synchronized
        </span>
      </div>

      {/* CONTROL SIDEBAR */}
      <div 
        className={`h-full bg-slate-900 border-r border-slate-800 shadow-2xl flex flex-col transition-all duration-300 z-20 relative ${
          isSidebarOpen ? "w-80 sm:w-96" : "w-0 -translate-x-full"
        }`}
      >
        {/* Tab Header Menu */}
        <div className="flex bg-slate-950 border-b border-slate-800/60 p-1">
          <button 
            onClick={() => setActiveTab("layers")} 
            className={`flex-1 flex items-center justify-center space-x-1.5 py-3 rounded-lg text-xs font-bold uppercase tracking-wide transition-all ${
              activeTab === "layers" ? "bg-slate-800 text-emerald-400" : "text-slate-400 hover:text-white"
            }`}
          >
            <Layers size={13} />
            <span>Layers</span>
          </button>
          <button 
            onClick={() => setActiveTab("legend")} 
            className={`flex-1 flex items-center justify-center space-x-1.5 py-3 rounded-lg text-xs font-bold uppercase tracking-wide transition-all ${
              activeTab === "legend" ? "bg-slate-800 text-cyan-400" : "text-slate-400 hover:text-white"
            }`}
          >
            <List size={13} />
            <span>Legend</span>
          </button>
          <button 
            onClick={() => setActiveTab("basemaps")} 
            className={`flex-1 flex items-center justify-center space-x-1.5 py-3 rounded-lg text-xs font-bold uppercase tracking-wide transition-all ${
              activeTab === "basemaps" ? "bg-slate-800 text-amber-400" : "text-slate-400 hover:text-white"
            }`}
          >
            <MapIcon size={13} />
            <span>Basemaps</span>
          </button>
        </div>

        {/* Sidebar Content Panel */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-none">
          
          {/* TAB 1: GIS LAYERS */}
          {activeTab === "layers" && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xs font-bold tracking-wider uppercase font-mono text-slate-400">Database Layers</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">Stream vectors natively stored within cloud topologies.</p>
              </div>

              {loading && (
                <div className="text-center py-6 text-xs font-mono text-slate-500 animate-pulse">
                  Querying spatial entities...
                </div>
              )}

              <div className="space-y-2">
                {!loading && gisLayers.map(layer => (
                  <div 
                    key={layer.id} 
                    onClick={() => toggleLayerVisibility(layer.id)} 
                    className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer select-none transition-all ${
                      layer.visible 
                        ? "bg-slate-800/50 border-emerald-500/40 text-white" 
                        : "bg-slate-950/30 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="w-3 h-3 rounded-sm opacity-80" style={{ backgroundColor: layer.legend_color }} />
                      <span className="text-xs font-bold tracking-wide">{layer.display_name}</span>
                    </div>
                    {layer.visible ? <Eye size={14} className="text-emerald-400" /> : <EyeOff size={14} />}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: LIVE SYMBOLOGY LEGEND */}
          {activeTab === "legend" && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xs font-bold tracking-wider uppercase font-mono text-slate-400">Active Map Symbology</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">Live signatures parsed directly from SLD profiles.</p>
              </div>
              
              <div className="space-y-3 pt-1">
                {gisLayers.filter(l => l.visible).length === 0 ? (
                  <div className="border border-dashed border-slate-800 rounded-xl p-6 text-center text-xs font-mono text-slate-500">
                    No viewport channels active. Enable map layers to fetch styling profiles.
                  </div>
                ) : (
                  gisLayers.filter(l => l.visible).map(layer => (
                    <div key={layer.id} className="bg-slate-950/40 border border-slate-800/60 p-3.5 rounded-xl flex flex-col space-y-2">
                      <span className="text-xs font-bold text-slate-200">{layer.display_name}</span>
                      <div className="flex items-center space-x-3 pl-1">
                        {layer.geometry_type === "line" ? (
                          <div className="w-8 rounded-full" style={{ backgroundColor: layer.legend_color, height: `${layer.stroke_width}px` }} />
                        ) : (
                          <div className="w-5 h-4 rounded border border-white/10" style={{ backgroundColor: layer.legend_color, opacity: layer.fill_opacity }} />
                        )}
                        <span className="font-mono text-slate-400 uppercase tracking-wider text-[10px]">
                          SLD Legend Rule Match
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 3: BASEMAP GRID GALLERY */}
          {activeTab === "basemaps" && (
            <div className="space-y-4">
              <div>
                <h3 className="text-xs font-bold tracking-wider uppercase font-mono text-slate-400">Backdrop Gallery</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">Switch reference grids without losing toggled geometry overlays.</p>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-1">
                {basemaps.map(bm => (
                  <div 
                    key={bm.id}
                    onClick={() => handleBasemapChange(bm.style, bm.id)}
                    className={`group relative rounded-xl overflow-hidden cursor-pointer border transition-all ${
                      currentBasemap === bm.id ? "border-amber-400 scale-[1.02]" : "border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <img src={bm.thumbnail} alt={bm.label} className="w-full h-20 object-cover opacity-50 group-hover:opacity-75 transition-opacity" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-[10px] font-bold tracking-wide text-white truncate">{bm.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* SIDEBAR ACTUATOR TOGGLE BUTTON */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="absolute top-1/2 -translate-y-1/2 z-30 bg-slate-900 border-y border-r border-slate-800 text-slate-400 hover:text-white p-2 rounded-r-xl shadow-2xl transition-all"
        style={{ left: isSidebarOpen ? "384px" : "0px" }}
      >
        {isSidebarOpen ? <ChevronLeft size={15} /> : <ChevronRight size={15} />}
      </button>

      {/* INTERACTIVE MAP CANVAS CONTAINER */}
      <div className="flex-1 h-full relative bg-slate-950" ref={mapContainerRef} />
    </div>
  );
}