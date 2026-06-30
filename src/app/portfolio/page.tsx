"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Briefcase, Globe, Layers, Eye, 
  MapPin, Cpu, ArrowUpRight, ShieldCheck 
} from "lucide-react";

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const portfolioProjects = [
    {
      id: "zoning-alexandria",
      category: "zoning",
      title: "Alexandria Zoning Intelligence MVP",
      location: "Virginia, USA",
      industry: "Real Estate Investment Equity",
      description: "Engineered an automated parcel optimization pipeline parsing complex municipal structural boundaries, setback restrictions, and maximum buildable volumes across Alexandria parcels.",
      stack: ["Next.js", "PostGIS", "Tailwind CSS", "Framer Motion"],
      metrics: "94% Report Automation Rate",
      color: "border-amber-500/20"
    },
    {
      id: "realtime-flood",
      category: "webgis",
      title: "Real-Time Hydrological Dashboard",
      location: "Indus Basin Network",
      industry: "Civil Risk & Climate NGOs",
      description: "Deployed a low-latency streaming geospatial system overlaying multi-source digital elevation models (DEM) and live satellite precipitation metrics to map flood vulnerability layers.",
      stack: ["MapLibre GL", "GeoServer", "PostgreSQL", "Node.js"],
      metrics: "Sub-500ms Render Latency",
      color: "border-brand-cyan/20"
    },
    {
      id: "lulc-automation",
      category: "remote-sensing",
      title: "Automated LULC Feature Engine",
      location: "Regional Agricultural Hubs",
      industry: "Environmental Logistics",
      description: "Constructed deep automated processing loops via remote sensing indices to detect and run multi-temporal change detection matrices on vegetation health dynamics.",
      stack: ["Python", "Google Earth Engine", "GDAL", "NumPy"],
      metrics: "10m Resolution Resolution",
      color: "border-brand-emerald/20"
    },
    {
      id: "ftth-optical-grid",
      category: "automation",
      title: "FTTH Fiber Topology Optimizer",
      location: "Metropolitan Urban Corridors",
      industry: "Telecommunications Carrier",
      description: "Developed automated network layout routing models within customized vector frameworks, reducing physical survey drafting dependencies by script automation.",
      stack: ["Python", "QGIS API", "Fiona", "Shapely Vector Core"],
      metrics: "85% Design Lifecycle Acceleration",
      color: "border-purple-500/20"
    }
  ];

  const filterTabs = [
    { label: "All Systems", value: "all" },
    { label: "WebGIS Apps", value: "webgis" },
    { label: "USA Zoning", value: "zoning" },
    { label: "Remote Sensing", value: "remote-sensing" },
    { label: "Python Automation", value: "automation" }
  ];

  const filteredProjects = activeCategory === "all"
    ? portfolioProjects
    : portfolioProjects.filter(p => p.category === activeCategory);

  return (
    <div className="w-full bg-spatial-grid min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Informative Section Header */}
      <section className="max-w-4xl mx-auto text-center mt-8 mb-12 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-brand-surface/50 backdrop-blur-md"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-emerald" />
          <span className="text-[11px] font-mono uppercase tracking-widest text-slate-600 dark:text-slate-400">
            Proven Deployments
          </span>
        </motion.div>
        <h1 className="text-4xl sm:text-5xl font-sans font-black text-slate-900 dark:text-white tracking-tight">
          Enterprise Case Studies & <br />
          <span className="bg-clip-text text-transparent bg-gradient-spatial">Geospatial Solutions History</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Explore our portfolio of production deployments. We transform complex regional matrices into optimized, accessible software tools.
        </p>
      </section>

      {/* Filter Tabs Navigation */}
      <section className="max-w-4xl mx-auto flex flex-wrap justify-center gap-2 mb-16">
        {filterTabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveCategory(tab.value)}
            className={`px-4 py-2 rounded-lg font-sans text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 border ${
              activeCategory === tab.value
                ? "bg-slate-900 dark:bg-white text-white dark:text-brand-dark border-transparent shadow-md"
                : "bg-white/60 dark:bg-brand-surface/40 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800/80 hover:border-brand-cyan/40"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </section>

      {/* Animated Projects Grid Layer */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              key={project.id}
              className={`glass-panel p-6 sm:p-8 rounded-2xl border bg-white/30 dark:bg-brand-surface/30 shadow-xl flex flex-col justify-between group hover:border-brand-cyan/40 transition-all duration-300 ${project.color}`}
            >
              <div className="space-y-4">
                {/* Upper Metadata Row */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono font-semibold text-slate-500">
                  <div className="flex items-center space-x-1.5">
                    <MapPin size={12} className="text-brand-cyan" />
                    <span>{project.location}</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-brand-muted uppercase tracking-wider text-[10px]">
                    {project.industry}
                  </span>
                </div>

                {/* Project Title Block */}
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-sans font-bold text-slate-900 dark:text-white group-hover:text-brand-emerald transition-colors">
                    {project.title}
                  </h3>
                  <div className="p-1 rounded-md bg-slate-100 dark:bg-brand-muted opacity-0 group-hover:opacity-100 transition-opacity text-slate-700 dark:text-white shrink-0">
                    <ArrowUpRight size={16} />
                  </div>
                </div>

                {/* Case Study Summary */}
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Lower Architecture Footprint */}
              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800/60 space-y-4">
                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((tech, tIdx) => (
                    <span 
                      key={tIdx} 
                      className="px-2 py-0.5 rounded font-mono text-[10px] bg-slate-100 dark:bg-brand-dark border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* SLA Verified Metrics Bar */}
                <div className="flex items-center space-x-2 bg-slate-900 rounded-lg px-3 py-2 border border-slate-800">
                  <ShieldCheck size={14} className="text-brand-emerald shrink-0" />
                  <div className="text-[11px] font-mono text-slate-400">
                    VERIFIED IMPACT: <span className="text-white font-bold">{project.metrics}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </section>
    </div>
  );
}