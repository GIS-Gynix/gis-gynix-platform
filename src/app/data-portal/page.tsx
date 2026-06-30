"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { 
  Database, Search, Download, Filter, 
  Layers, Map, Info, Calendar, HardDrive, Binary 
} from "lucide-react";

export default function DataPortalPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const dataInventory = [
    {
      id: "pak-adm1-boundaries",
      category: "administrative",
      title: "Provincial Administrative Boundaries",
      description: "Complete vector dataset containing high-fidelity polygons for Balochistan, Punjab, Sindh, Khyber Pakhtunkhwa, Gilgit-Baltistan, and Azad Kashmir.",
      format: "Shapefile / GeoJSON",
      size: "4.2 MB",
      projection: "WGS 84 / EPSG:4326",
      updated: "2026-04",
      license: "ODbL (Open Data)"
    },
    {
      id: "pak-road-network",
      category: "infrastructure",
      title: "National Highway & Motorway Vector Model",
      description: "Clean line topology networks of major transport arteries across Pakistan, optimized for network analysis and routing engine integration.",
      format: "GeoJSON / KML",
      size: "18.7 MB",
      projection: "WGS 84 / UTM Zone 42N",
      updated: "2026-05",
      license: "ODbL (Open Data)"
    },
    {
      id: "pak-srtm-dem",
      category: "raster",
      title: "SRTM 30m Digital Elevation Model (DEM)",
      description: "Hydrologically corrected continuous elevation raster matrix sheets tile sets covering the northern mountainous terrain and Indus plains.",
      format: "GeoTIFF (Raster)",
      size: "142.0 MB",
      projection: "WGS 84 / EPSG:4326",
      updated: "2026-01",
      license: "Public Domain"
    },
    {
      id: "pak-major-rivers",
      category: "hydrology",
      title: "Indus River Basin Hydrology Network",
      description: "Stream hierarchies, major river paths, water bodies, and delta boundary line features optimized for flood catchment layout simulations.",
      format: "Shapefile",
      size: "8.1 MB",
      projection: "WGS 84 / EPSG:4326",
      updated: "2026-03",
      license: "ODbL (Open Data)"
    }
  ];

  const categories = [
    { label: "All Datasets", value: "all" },
    { label: "Administrative", value: "administrative" },
    { label: "Infrastructure", value: "infrastructure" },
    { label: "Hydrology Core", value: "hydrology" },
    { label: "Elevation Raster", value: "raster" }
  ];

  // Execute download burst feedback loop
  const triggerDownloadSimulation = (datasetTitle: string) => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#00F5D4", "#01B4E4", "#3A86FF"]
    });
    alert(`Initializing secure asset package stream download for: ${datasetTitle}`);
  };

  const filteredData = dataInventory.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
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
          Download curated vector boundaries, infrastructure networks, and elevation rasters. All files include projection configurations and structural attribute schemas.
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
        <AnimatePresence mode="popLayout">
          {filteredData.map((item, idx) => (
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
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {item.description}
                </p>

                {/* File Metadata Grid Block */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 text-[11px] font-mono font-medium text-slate-500 dark:text-slate-400">
                  <div className="flex items-center space-x-1.5">
                    <Binary size={12} className="text-brand-accent" />
                    <span>{item.format}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <HardDrive size={12} className="text-brand-accent" />
                    <span>{item.size}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Map size={12} className="text-brand-accent" />
                    <span>{item.projection}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Calendar size={12} className="text-brand-accent" />
                    <span>{item.updated}</span>
                  </div>
                </div>
              </div>

              {/* Right Action Download System */}
              <button
                onClick={() => triggerDownloadSimulation(item.title)}
                className="w-full md:w-auto px-6 py-4 rounded-xl bg-slate-900 dark:bg-brand-muted border border-slate-800 text-white dark:text-slate-200 font-sans font-bold text-sm tracking-wide flex items-center justify-center space-x-2 hover:bg-brand-cyan hover:text-brand-dark dark:hover:bg-gradient-spatial dark:hover:text-brand-dark transition-all duration-200 shadow-md shrink-0 group/btn"
              >
                <Download size={16} className="transform group-hover/btn:translate-y-0.5 transition-transform" />
                <span>Download Asset Package</span>
              </button>
            </motion.div>
          ))}

          {filteredData.length === 0 && (
            <div className="text-center py-12 font-sans text-slate-500 text-sm">
              No matching geospatial registries indexed. Broaden your search criteria parameters.
            </div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}