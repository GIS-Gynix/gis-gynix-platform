"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import maplibregl from "maplibre-gl";
import { 
  Layers, Map as MapIcon, Maximize2, 
  MousePointer, Radio, Eye, EyeOff, Info 
} from "lucide-react";

export default function WebGisSolutionsPage() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [lng, setLng] = useState<number>(-77.0425);
  const [lat, setLat] = useState<number>(38.8951);
  const [zoom, setZoom] = useState<number>(11);
  const [currentBasemap, setCurrentBasemap] = useState<string>("dark");
  const [layerVisible, setLayerVisible] = useState<boolean>(true);

  const basemaps: Record<string, string> = {
    dark: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
    voyager: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
    positron: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
  };

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize MapLibre GL core architecture instance
    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: basemaps[currentBasemap],
      center: [lng, lat],
      zoom: zoom,
      attributionControl: false
    });

    mapRef.current = map;

    // Register active dynamic event hooks for telemetry metrics
    map.on("move", () => {
      const center = map.getCenter();
      setLng(Number(center.lng.toFixed(4)));
      setLat(Number(center.lat.toFixed(4)));
      setZoom(Number(map.getZoom().toFixed(2)));
    });

    // Inject mock GeoJSON parcels once style resources load completely
    map.on("style.load", () => {
      map.addSource("mock-parcels", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: { id: 101, type: "Commercial Mixed-Use" },
              geometry: {
                type: "Polygon",
                coordinates: [[
                  [-77.05, 38.90],
                  [-77.03, 38.90],
                  [-77.03, 38.89],
                  [-77.05, 38.89],
                  [-77.05, 38.90]
                ]]
              }
            }
          ]
        }
      });

      map.addLayer({
        id: "parcels-layer",
        type: "fill",
        source: "mock-parcels",
        layout: { visibility: layerVisible ? "visible" : "none" },
        paint: {
          "fill-color": "#00F5D4",
          "fill-opacity": 0.25,
          "fill-outline-color": "#01B4E4"
        }
      });
    });

    return () => map.remove();
  }, []);

  // Sync state changes with internal map engines smoothly
  const handleBasemapChange = (styleKey: string) => {
    setCurrentBasemap(styleKey);
    if (mapRef.current) {
      mapRef.current.setStyle(basemaps[styleKey]);
    }
  };

  const toggleLayerVisibility = () => {
    const nextState = !layerVisible;
    setLayerVisible(nextState);
    if (mapRef.current && mapRef.current.getLayer("parcels-layer")) {
      mapRef.current.setLayoutProperty("parcels-layer", "visibility", nextState ? "visible" : "none");
    }
  };

  return (
    <div className="w-full bg-spatial-grid min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Informative Section Header */}
      <section className="max-w-4xl mx-auto text-center mt-8 mb-12 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-brand-surface/50 backdrop-blur-md"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
          <span className="text-[11px] font-mono uppercase tracking-widest text-slate-600 dark:text-slate-400">
            Interactive GIS Infrastructure Sandbox
          </span>
        </motion.div>
        <h1 className="text-4xl sm:text-5xl font-sans font-black text-slate-900 dark:text-white tracking-tight">
          Cloud-Native WebGIS Systems <br />
          <span className="bg-clip-text text-transparent bg-gradient-spatial">Operational Matrix Portal</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-sm leading-relaxed">
          Interact with our production framework engine below. We compile enterprise tiled geometries, serving data globally with sub-second processing latencies.
        </p>
      </section>

      {/* Embedded Live Dashboard Layout */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 h-[650px] mb-16">
        
        {/* Left Control Panel Container */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-brand-surface/40 flex flex-col justify-between h-full shadow-xl">
          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="text-base font-sans font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Layers size={18} className="text-brand-cyan" /> Layer Inventory
              </h3>
              <p className="text-xs text-slate-500">Toggle operational data boundaries.</p>
            </div>

            {/* Layer Controller Option */}
            <button
              onClick={toggleLayerVisibility}
              className={`w-full flex items-center justify-between p-3 rounded-xl border text-xs font-semibold font-mono transition-all ${
                layerVisible 
                  ? "border-brand-emerald/40 bg-brand-emerald/5 text-slate-800 dark:text-brand-emerald" 
                  : "border-slate-200 dark:border-slate-800 text-slate-500"
              }`}
            >
              <span className="flex items-center gap-2">Mock Zoning Parcels</span>
              {layerVisible ? <Eye size={14} /> : <EyeOff size={14} />}
            </button>

            <div className="border-t border-slate-200 dark:border-slate-800 pt-4 space-y-3">
              <h3 className="text-xs font-sans font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <MapIcon size={14} className="text-brand-accent" /> Basemap Engine
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {Object.keys(basemaps).map((styleKey) => (
                  <button
                    key={styleKey}
                    onClick={() => handleBasemapChange(styleKey)}
                    className={`px-3 py-2 rounded-lg border text-xs font-mono capitalize transition-all ${
                      currentBasemap === styleKey
                        ? "border-brand-cyan bg-brand-cyan/5 text-brand-cyan font-bold"
                        : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-brand-cyan/40"
                    }`}
                  >
                    {styleKey} Vector Core
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Telemetry Display Panel */}
          <div className="bg-slate-900 dark:bg-brand-dark rounded-xl p-4 border border-slate-800 text-[11px] font-mono space-y-2 text-slate-400">
            <div className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Telemetry Metrics</div>
            <div className="flex justify-between"><span>LONGITUDE:</span><span className="text-brand-emerald font-bold">{lng}</span></div>
            <div className="flex justify-between"><span>LATITUDE:</span><span className="text-brand-emerald font-bold">{lat}</span></div>
            <div className="flex justify-between"><span>ZOOM RATIO:</span><span className="text-brand-cyan font-bold">{zoom}</span></div>
          </div>
        </div>

        {/* Right Mapping Canvas Container Layer */}
        <div className="lg:col-span-3 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl relative h-full bg-slate-950">
          <div ref={mapContainerRef} className="w-full h-full" />
          
          {/* Absolute Mapping Watermark Badge */}
          <div className="absolute top-4 right-4 pointer-events-none glass-panel px-3 py-1.5 rounded-lg border border-white/10 text-[10px] font-mono text-white tracking-widest uppercase">
            MapLibre GL Vector Engine
          </div>
        </div>
      </section>
    </div>
  );
}