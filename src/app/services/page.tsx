"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Layers, Globe, Database, Cpu, 
  MapPin, Radio, Zap, ChevronRight, CheckCircle2 
} from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const serviceCatalog = [
    {
      id: "spatial-analysis",
      category: "core",
      title: "Advanced Spatial Analysis",
      icon: Layers,
      description: "Complex vector and raster vector processing algorithms designed to extract actionable intelligence from geographic layers.",
      subServices: [
        "Hydrological Modeling & Flood Risk Mapping",
        "Multi-Criteria Suitability Analysis",
        "DEM, SRTM, and LiDAR Processing",
        "High-fidelity Map Design & Cartography"
      ],
      color: "text-brand-emerald",
      borderGlow: "hover:border-brand-emerald/30"
    },
    {
      id: "webgis-development",
      category: "dev",
      title: "Cloud WebGIS Development",
      icon: Globe,
      description: "Low-latency custom interactive map web applications optimized for speed, streaming data, and massive vector datasets.",
      subServices: [
        "Custom MapLibre GL & Mapbox GL Frontends",
        "GeoServer Orchestration & Layer Tuning",
        "PostGIS Spatial Database Performance Indexing",
        "Real-time Dashboard Analytics Infrastructure"
      ],
      color: "text-brand-cyan",
      borderGlow: "hover:border-brand-cyan/30"
    },
    {
      id: "remote-sensing",
      category: "core",
      title: "Remote Sensing & Geospatial AI",
      icon: Cpu,
      description: "Automated imagery classification and analysis pipelines driven by machine learning model frameworks.",
      subServices: [
        "Land Use Land Cover (LULC) Change Detection",
        "Google Earth Engine Large Scale Automation",
        "Satellite Imagery Sub-pixel Feature Extraction",
        "Multispectral & Hyperspectral Matrix Analytics"
      ],
      color: "text-brand-accent",
      borderGlow: "hover:border-brand-accent/30"
    },
    {
      id: "zoning-intelligence",
      category: "zoning",
      title: "USA Zoning Intelligence",
      icon: MapPin,
      description: "Precise evaluation of municipal property code frameworks, parcel configurations, and structural constraints.",
      subServices: [
        "Detailed Zoning Verification Reports",
        "Building Setback & Height Regulation Checks",
        "Lot Coverage & Parking Ratio Analysis",
        "Overlay District & Land Use Optimization"
      ],
      color: "text-amber-400",
      borderGlow: "hover:border-amber-400/30"
    },
    {
      id: "utility-mapping",
      category: "core",
      title: "Utility & FTTH Network Design",
      icon: Zap,
      description: "Fiber optic planning layouts, digital engineering drawings, and structural infrastructure assets cataloging.",
      subServices: [
        "FTTH Architecture Planning & Layouts",
        "Telecommunications Asset Digitization",
        "Georeferencing & Cadastral Database Integration",
        "As-Built Utility Connectivity Mapping"
      ],
      color: "text-purple-400",
      borderGlow: "hover:border-purple-400/30"
    },
    {
      id: "spatial-apis",
      category: "dev",
      title: "Python Automation & Spatial APIs",
      icon: Database,
      description: "Automating repetitive data handling pipelines and delivering fast, flexible custom geoJSON data structures.",
      subServices: [
        "GDAL / Fiona / Shapely Script Toolkits",
        "Automated Shapefile Vector Extraction Layers",
        "Custom RESTful GeoJSON API Endpoint Deployments",
        "Batch Spatial Processing ETL Orchestrations"
      ],
      color: "text-rose-400",
      borderGlow: "hover:border-rose-400/30"
    }
  ];

  const categories = [
    { label: "All Sectors", value: "all" },
    { label: "Core Analytics", value: "core" },
    { label: "WebGIS & Development", value: "dev" },
    { label: "Zoning Solutions", value: "zoning" }
  ];

  const filteredServices = selectedCategory === "all" 
    ? serviceCatalog 
    : serviceCatalog.filter(s => s.category === selectedCategory);

  return (
    <div className="w-full bg-spatial-grid min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Dynamic Structural Heading */}
      <section className="max-w-4xl mx-auto text-center mt-8 mb-12 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-brand-surface/50 backdrop-blur-md"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-emerald" />
          <span className="text-[11px] font-mono uppercase tracking-widest text-slate-600 dark:text-slate-400">
            Capability Index
          </span>
        </motion.div>
        <h1 className="text-4xl sm:text-5xl font-sans font-black text-slate-900 dark:text-white tracking-tight">
          Enterprise Geospatial Services <br />
          <span className="bg-clip-text text-transparent bg-gradient-spatial">Engineered for Scale</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          We combine physical spatial data parameters with flexible cloud pipelines, providing precise maps, metrics, and data structures.
        </p>
      </section>

      {/* Interactive Filtering Navigation */}
      <section className="max-w-3xl mx-auto flex flex-wrap justify-center gap-2 mb-16">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`px-4 py-2 rounded-lg font-sans text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 border ${
              selectedCategory === cat.value
                ? "bg-slate-900 dark:bg-white text-white dark:text-brand-dark border-transparent shadow-md"
                : "bg-white/60 dark:bg-brand-surface/40 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800/80 hover:border-brand-cyan/40"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </section>

      {/* Main Services Capabilities Grid */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {filteredServices.map((service, idx) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`glass-panel p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-xl flex flex-col space-y-6 transition-all duration-300 transform hover:-translate-y-1 group bg-white/30 dark:bg-brand-surface/30 ${service.borderGlow}`}
            >
              {/* Card Header Structure */}
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-xl bg-slate-100 dark:bg-brand-muted flex items-center justify-center ${service.color} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={24} />
                </div>
                <h3 className="text-lg sm:text-xl font-sans font-bold text-slate-900 dark:text-white leading-snug group-hover:text-brand-cyan transition-colors">
                  {service.title}
                </h3>
              </div>

              {/* Description Context */}
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {service.description}
              </p>

              {/* Sub-Service Bullet Framework */}
              <div className="space-y-2.5 flex-grow pt-2">
                <h4 className="text-[10px] font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500 font-bold">
                  Technical Deliverables
                </h4>
                <ul className="space-y-2">
                  {service.subServices.map((sub, sIdx) => (
                    <li key={sIdx} className="flex items-start space-x-2.5 text-xs font-medium text-slate-600 dark:text-slate-300">
                      <CheckCircle2 size={14} className={`mt-0.5 shrink-0 ${service.color}`} />
                      <span>{sub}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Interactive Trigger Anchor */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800/60">
                <Link
                  href="/contact"
                  className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 hover:text-brand-cyan dark:hover:text-brand-emerald transition-colors"
                >
                  <span>Request Solution Spec</span>
                  <ChevronRight size={14} className="transform group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </section>
    </div>
  );
}