"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-commetti"; // Assumes your setup uses canvas-confetti
import { 
  Database, Search, Download, Filter, 
  Layers, Map, Info, Calendar, HardDrive, Binary, ShieldAlert 
} from "lucide-react";

interface SpatialLayer {
  id: number;
  table_name: string;
  display_name: string;
  description: string;
  file_size_label: string;
  is_downloadable: boolean;
  download_url: string;
}

export default function DataPortalPage() {
  const [dataInventory, setDataInventory] = useState<SpatialLayer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Fetch active datasets dynamically from our Supabase PostGIS connection registry
  useEffect(() => {
    fetch("/api/layers", { 
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache"
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setDataInventory(data.layers);
        } else {
          setError(data.error || "Failed to parse active layer registries from database.");
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Network database gateway timeout.");
        setLoading(false);
      });
  }, []);

  const categories = [
    { label: "All Datasets", value: "all" },
    { label: "Administrative Boundaries", value: "administrative" },
    { label: "Infrastructure / Transport", value: "infrastructure" },
    { label: "Hydrology Core", value: "hydrology" }
  ];

  // Helper function to auto-route database entries to your dashboard navigation filter tabs
  const resolveCategory = (tableName: string): string => {
    if (!tableName) return "all";
    const name = tableName.toLowerCase();
    
    if (name.includes("boundary") || name.includes("council") || name.includes("district") || name.includes("tehsil") || name.includes("national") || name.includes("provincial")) {
      return "administrative";
    }
    if (name.includes("road") || name.includes("highway") || name.includes("transport")) {
      return "infrastructure";
    }
    if (name.includes("water") || name.includes("river") || name.includes("hydrology") || name.includes("stream") || name.includes("canal")) {
      return "hydrology";
    }
    return "all";
  };

  // Run live database feature query and stream the memory-safe zipped file
  const triggerDownload = (layer: SpatialLayer) => {
    // Fire festive visual feedback
    try {
      const anyConfetti = confetti as any;
      if (typeof anyConfetti === "function") {
        anyConfetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.8 },
          colors: ["#00F5D4", "#01B4E4", "#3A86FF"]
        });
      }
    } catch (e) {
      console.log("Confetti module skipped");
    }
    
    if (layer.download_url && layer.download_url !== "#" && layer.download_url !== "") {
      window.open(layer.download_url, "_blank");
      return;
    }

    // UPDATED: Standard location routing to trigger on-the-fly zip streaming pipeline
    window.location.href = `/api/download?table=${layer.table_name}`;
  };

  const filteredData = dataInventory.filter(item => {
    const targetQuery = searchQuery.toLowerCase();
    const matchesSearch = (item.display_name?.toLowerCase() || "").includes(targetQuery) || 
                          (item.description?.toLowerCase() || "").includes(targetQuery) ||
                          (item.table_name?.toLowerCase() || "").includes(targetQuery);
    
    const calculatedCategory = resolveCategory(item.table_name);
    const matchesCategory = selectedCategory === "all" || calculatedCategory === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full bg-spatial-grid min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Informative Portal Header */}
      <section className="max-w-4xl mx-auto text-center mt-8 mb-12 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-brand-surface/50 backdrop-blur-md"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-emerald" />
          <span className="text-[11px] font-mono uppercase tracking-widest text-slate-600 dark:text-slate-400">
            Open-Source Geo-Warehouse Registry
          </span>
        </motion.div>
        <h1 className="text-4xl sm:text-5xl font-sans font-black text-slate-900 dark:text-white tracking-tight">
          Pakistan GIS Data Portal <br />
          <span className="bg-clip-text text-transparent bg-gradient-spatial">Analysis-Ready Repositories</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Download curated vector boundaries, infrastructure networks, and hydrology features. All files include projection configurations and structural attribute schemas.
        </p>
      </section>

      {/* Control Search & Filter Command Panel */}
      <section className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {/* Search Field */}
        <div className="md:col-span-1 relative flex items-center">
          <Search className="absolute left-4 text-slate-400 pointer-events-none" size={16} />
          <input
            type="text"
            placeholder="Search spatial index names..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-brand-surface/40 font-sans text-sm outline-none focus:border-brand-cyan/60 dark:text-white transition-colors"
          />
        </div>

        {/* Category Horizontal Scrolling Filters */}
        <div className="md:col-span-2 flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-4 py-2.5 rounded-xl font-sans text-xs font-bold shrink-0 border transition-all ${
                selectedCategory === cat.value
                  ? "bg-slate-900 dark:bg-white text-white dark:text-brand-dark border-transparent shadow-md"
                  : "bg-white/60 dark:bg-brand-surface/40 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800/80 hover:border-brand-cyan/40"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Main Metadata Catalog Stack */}
      <section className="max-w-5xl mx-auto space-y-6 mb-20">
        
        {/* Connection Loading State */}
        {loading && (
          <div className="text-center py-20 text-slate-400 font-medium font-sans animate-pulse flex justify-center items-center space-x-3">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-brand-emerald"></div>
            <span>Synchronizing Live PostGIS Registries...</span>
          </div>
        )}

        {/* Connection Error State */}
        {error && (
          <div className="bg-red-900/20 border border-red-800/40 text-red-400 p-6 rounded-2xl text-center max-w-2xl mx-auto font-sans">
            <p className="font-bold">Database Stream Failover</p>
            <p className="text-xs mt-1 opacity-80">{error}</p>
          </div>
        )}

        <AnimatePresence mode="popLayout">
          {!loading && !error && filteredData.map((item) => (
            <motion.div
              layout
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
              key={item.id}
              className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800/60 bg-white/30 dark:bg-brand-surface/30 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-brand-cyan/30 transition-all duration-300 group"
            >
              {/* Left Details Block */}
              <div className="space-y-3 max-w-2xl">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 rounded-md bg-slate-100 dark:bg-brand-muted text-brand-cyan">
                    <Layers size={16} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-sans font-bold text-slate-900 dark:text-white group-hover:text-brand-emerald transition-colors">
                    {item.display_name}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>

                {/* File Metadata Grid Block */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 text-[11px] font-mono font-medium text-slate-500 dark:text-slate-400">
                  <div className="flex items-center space-x-1.5">
                    <Binary size={12} className="text-brand-accent" />
                    {/* UPDATED: Displays zip encoding information */}
                    <span>Zipped GeoJSON Stream</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <HardDrive size={12} className="text-brand-accent" />
                    <span>{item.file_size_label}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Map size={12} className="text-brand-accent" />
                    <span>WGS 84 / EPSG:4326</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Calendar size={12} className="text-brand-accent" />
                    <span>Live DB Sync</span>
                  </div>
                </div>
              </div>

              {/* Right Action Download System */}
              {item.is_downloadable ? (
                <button
                  onClick={() => triggerDownload(item)}
                  className="w-full md:w-auto px-6 py-4 rounded-xl bg-slate-900 dark:bg-brand-muted border border-slate-800 text-white dark:text-slate-200 font-sans font-bold text-sm tracking-wide flex items-center justify-center space-x-2 hover:bg-brand-cyan hover:text-brand-dark dark:hover:bg-gradient-spatial dark:hover:text-brand-dark transition-all duration-200 shadow-md shrink-0 group/btn"
                >
                  <Download size={16} className="transform group-hover/btn:translate-y-0.5 transition-transform" />
                  <span>Download Asset Package</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    window.location.href = `/contact?dataset=${encodeURIComponent(item.display_name)}`;
                  }}
                  className="w-full md:w-auto px-6 py-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-500 hover:bg-amber-500 hover:text-slate-950 font-sans font-bold text-sm tracking-wide flex items-center justify-center space-x-2 transition-all duration-200 shadow-md shrink-0"
                >
                  <ShieldAlert size={16} />
                  <span>Get Data (Premium Access)</span>
                </button>
              )}
            </motion.div>
          ))}

          {!loading && !error && filteredData.length === 0 && (
            <div className="text-center py-12 font-sans text-slate-500 text-sm">
              No matching geospatial registries indexed. Broaden your search criteria parameters.
            </div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}