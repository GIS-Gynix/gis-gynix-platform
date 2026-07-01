"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Layers, Map, ShieldCheck, Database, 
  Terminal, Globe, Cpu, ArrowUpRight 
} from "lucide-react";

export default function ServicesPage() {
  const servicesList = [
    {
      id: "zoning",
      title: "USA Zoning Intelligence & Parcel Analysis",
      icon: <Layers className="w-6 h-6 text-brand-cyan" />,
      description: "Comprehensive parsing and extraction of municipal ordinances, overlay boundaries, and real estate lot telemetry. Ideal for developers navigating complex urban development requirements.",
      features: ["Zoning Classification Extraction", "Lot-Level GIS Telemetry Maps", "Setback & Building Height Analysis", "Municipal Rule Digitization Matrix"],
    },
    {
      id: "webgis",
      title: "Enterprise WebGIS Solutions & Mapping Portals",
      icon: <Globe className="w-6 h-6 text-brand-emerald" />,
      description: "Custom cloud-native web mapping dashboards crafted with high-performance vector rendering. Designed to provide beautiful, responsive visual workflows for internal teams and clients.",
      features: ["Vector Tile Asset Styling", "Interactive Mapbox/Leaflet Interfaces", "Spatial Filtering & Custom Buffers", "ArcGIS Dashboard Integrations"],
    },
    {
      id: "remote-sensing",
      title: "Remote Sensing & Satellite Image Processing",
      icon: <Map className="w-6 h-6 text-brand-accent" />,
      description: "Advanced analysis of multi-spectral aerial and satellite datasets. We run automated workflows to extract environmental indicators, change-detection grids, and infrastructure metrics.",
      features: ["NDVI & Land Cover Classification", "Multitemporal Change Detection", "Aerial Raster Geometry Orthomosaics", "Dem/TIN Elevation Computations"],
    },
    {
      id: "automation",
      title: "Spatial Data Engineering & Scripting Pipelines",
      icon: <Terminal className="w-6 h-6 text-brand-cyan" />,
      description: "High-volume spatial ETL pipelines designed to automate geometric cleanups, attribute merges, and database transfers. We eliminate tedious manual file processes.",
      features: ["PostGIS Vector Query Speedups", "Custom QGIS Python Toolsets", "GeoJSON/Shapefile Bulk Conversion", "Automated Raster Compression Runs"],
    }
  ];

  return (
    <div className="w-full bg-spatial-grid min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      
      {/* Services Section Header Briefing */}
      <section className="max-w-4xl mx-auto text-center mb-16 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-brand-surface/50 backdrop-blur-md"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-emerald" />
          <span className="text-[11px] font-mono uppercase tracking-widest text-slate-600 dark:text-slate-400">
            Professional Capabilities Matrix
          </span>
        </motion.div>
        
        <h1 className="text-4xl sm:text-5xl font-sans font-black text-slate-900 dark:text-white tracking-tight">
          Core Services & Solutions <br />
          <span className="bg-clip-text text-transparent bg-gradient-spatial">Geospatial Operations</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Explore specialized engineering categories provided by GIS Gynix. Click on any capability to load a tailored system configuration request pipeline directly routed to our inbox.
        </p>
      </section>

      {/* Responsive Services Interactive Grid Panel */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {servicesList.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-brand-surface/20 hover:border-brand-cyan/40 dark:hover:border-brand-cyan/30 shadow-xl relative flex flex-col justify-between group transition-all duration-300"
          >
            <div className="space-y-6">
              {/* Header Icon Segment */}
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center shadow-md">
                  {service.icon}
                </div>
                <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase">
                  Module-0{index + 1}
                </span>
              </div>

              {/* Title & Technical Explanations */}
              <div className="space-y-2">
                <h3 className="text-xl font-sans font-black text-slate-900 dark:text-white group-hover:text-brand-cyan transition-colors duration-200">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans font-medium">
                  {service.description}
                </p>
              </div>

              {/* Key Deliverables Bullet Point Grid Matrix */}
              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block font-bold">
                  Core Engineering Deliverables:
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans font-medium text-slate-600 dark:text-slate-300">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <span className="w-1 h-1 rounded-full bg-brand-emerald" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Dynamic Link Redirect Button with New Tab Routing */}
            <div className="pt-8 mt-auto">
              <a
                href={`/contact?service=${service.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-brand-dark text-white font-sans font-bold text-xs tracking-wider uppercase flex items-center justify-center space-x-2 shadow-lg hover:shadow-brand-cyan/10 transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <span>Request {service.id === "zoning" ? "Zoning Analysis" : "Service"}</span>
                <ArrowUpRight size={14} className="opacity-70" />
              </a>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Professional Infrastructure Quality Badge Footer */}
      <section className="max-w-4xl mx-auto text-center mt-16 text-xs font-mono text-slate-400 flex flex-col sm:flex-row items-center justify-center gap-4 border-t border-slate-200 dark:border-slate-900 pt-8">
        <div className="flex items-center space-x-2">
          <ShieldCheck size={14} className="text-brand-emerald" />
          <span>Full Ownership Handover</span>
        </div>
        <span className="hidden sm:inline text-slate-700">|</span>
        <div className="flex items-center space-x-2">
          <Database size={14} className="text-brand-cyan" />
          <span>PostgreSQL / PostGIS Secure Stacks</span>
        </div>
      </section>

    </div>
  );
}