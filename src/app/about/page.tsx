"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Target, Eye, Layers, Compass, Code, Cpu, ArrowUpRight } from "lucide-react";

export default function AboutPage() {
  const [activeTimeline, setActiveTimeline] = useState<number>(0);

  const coreValues = [
    { title: "Our Mission", desc: "To weaponize spatial data structures, making automated zoning intelligence and enterprise WebGIS frameworks universally deployable for infrastructure leaders.", icon: Target },
    { title: "Our Vision", desc: "To become the global standard for cloud-native geospatial consulting, orchestrating AI-driven satellite and raster processing architecture pipelines.", icon: Eye },
    { title: "Core Values", desc: "Uncompromising spatial precision, complete dedication to open-source cloud architectures, and sub-millisecond API execution performance.", icon: Shield }
  ];

  const technicalProficiencies = [
    { skill: "PostgreSQL / PostGIS Spatial Databases", level: "95%" },
    { skill: "QGIS / ArcGIS Pro Advanced Analytics", level: "98%" },
    { skill: "GeoServer / MapLibre Cloud Orchestration", level: "92%" },
    { skill: "Python GIS Automation (GDAL, Fiona, Shapely)", level: "94%" },
    { skill: "Google Earth Engine & Raster Processing", level: "90%" },
    { skill: "React / Next.js Custom WebGIS Vector Tiling", level: "95%" }
  ];

  const historicalTimeline = [
    {
      year: "2024",
      title: "Foundation & Core Engine R&D",
      description: "GIS Gynix launched as a focused geospatial consultancy, delivering custom spatial analysis and advanced Python mapping scripts for global infrastructure clients."
    },
    {
      year: "2025",
      title: "WebGIS & Automation Expansion",
      description: "Scaled internal operations to support cloud-native vector tiling pipelines, deploying high-performance web maps using MapLibre, Leaflet, and custom PostGIS backends."
    },
    {
      year: "2026",
      title: "Zoning Intelligence & Geospatial AI",
      description: "Pioneered automated US municipal zoning analytics systems and cloud-based raster data classification engines, cementing our position as an elite global GIS engineering agency."
    }
  ];

  const industriesServed = [
    "Civil Engineering & Surveying",
    "Real Estate & Land Development",
    "Municipal Government & Urban Planning",
    "Telecommunications (FTTH Fiber Design)",
    "Environmental Logistics & Hydrology"
  ];

  return (
    <div className="w-full bg-spatial-grid min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto text-center mt-8 mb-16 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-brand-surface/50 backdrop-blur-md"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
          <span className="text-[11px] font-mono uppercase tracking-widest text-slate-600 dark:text-slate-400">
            Corporate Ecosystem
          </span>
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl font-sans font-black text-slate-900 dark:text-white tracking-tight"
        >
          Engineering Precision From <br />
          <span className="bg-clip-text text-transparent bg-gradient-spatial">Macro to Micro Scales</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed"
        >
          GIS Gynix is a premium, international geospatial engineering and remote sensing collective. We bridge the gap between heavy spatial data models and lightning-fast web visualization.
        </motion.p>
      </section>

      {/* Corporate Philosophy Cards */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
        {coreValues.map((val, idx) => {
          const Icon = val.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx }}
              className="glass-panel p-6 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col space-y-4 shadow-sm"
            >
              <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-brand-muted flex items-center justify-center text-brand-cyan">
                <Icon size={20} />
              </div>
              <h3 className="text-lg font-sans font-bold text-slate-900 dark:text-white">{val.title}</h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed flex-grow">{val.desc}</p>
            </motion.div>
          );
        })}
      </section>

      {/* Technical Matrix & Industry Domain Hub */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24 items-start">
        {/* Progress Metrics Stack */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-xs font-mono uppercase tracking-widest text-brand-emerald">Stack Calibration</h2>
            <h3 className="text-2xl sm:text-3xl font-sans font-extrabold text-slate-900 dark:text-white">Core Spatial Proficiencies</h3>
          </div>
          <div className="space-y-4">
            {technicalProficiencies.map((prof, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs sm:text-sm font-medium">
                  <span className="text-slate-700 dark:text-slate-300">{prof.skill}</span>
                  <span className="font-mono text-brand-cyan">{prof.level}</span>
                </div>
                <div className="w-full h-2 bg-slate-200 dark:bg-brand-muted rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: prof.level }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-full bg-gradient-spatial rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sectors Served Panel */}
        <div className="glass-panel p-8 rounded-2xl border border-slate-200 dark:border-slate-800/60 shadow-lg space-y-6 bg-white/40 dark:bg-brand-surface/40">
          <div className="space-y-2">
            <h2 className="text-xs font-mono uppercase tracking-widest text-brand-accent">Target Markets</h2>
            <h3 className="text-2xl sm:text-3xl font-sans font-extrabold text-slate-900 dark:text-white">Industries Weaponized</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            Our data orchestration layer interfaces cleanly across enterprise operations, supporting continuous integration for multi-national agencies and private equity groups alike.
          </p>
          <ul className="space-y-3 pt-2">
            {industriesServed.map((ind, idx) => (
              <li key={idx} className="flex items-center space-x-3 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 group cursor-default">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-emerald group-hover:scale-125 transition-transform" />
                <span className="group-hover:text-brand-emerald transition-colors">{ind}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Interactive Timeline Engineering Layer */}
      <section className="max-w-4xl mx-auto space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-xs font-mono uppercase tracking-widest text-brand-cyan">Operational Footprint</h2>
          <h3 className="text-2xl sm:text-3xl font-sans font-extrabold text-slate-900 dark:text-white">Evolution Timeline</h3>
        </div>

        <div className="relative border-l border-slate-200 dark:border-slate-800 ml-4 sm:ml-32 space-y-8 pb-12">
          {historicalTimeline.map((item, idx) => (
            <div key={idx} className="relative pl-6 sm:pl-8 group">
              {/* Timeline Radial Indicator */}
              <button 
                onClick={() => setActiveTimeline(idx)}
                className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 transition-all duration-300 z-10 ${
                  activeTimeline === idx 
                    ? "bg-brand-dark border-brand-emerald scale-125 shadow-lg shadow-brand-emerald/40" 
                    : "bg-slate-300 dark:bg-brand-muted border-slate-100 dark:border-brand-dark group-hover:border-brand-cyan"
                }`}
                aria-label={`Select item year ${item.year}`}
              />

              {/* Offset Year Label for Desktop */}
              <div className="hidden sm:block absolute -left-36 top-1 font-mono font-black text-xl text-right w-24 tracking-tight transition-colors duration-200 text-slate-400 dark:text-slate-600 group-hover:text-brand-cyan">
                {item.year}
              </div>

              {/* Dynamic Content Panel Card */}
              <div className={`glass-panel p-5 rounded-xl border transition-all duration-300 ${
                activeTimeline === idx 
                  ? "border-brand-cyan/40 shadow-md bg-white/70 dark:bg-brand-surface/70" 
                  : "border-slate-200 dark:border-slate-800/60 opacity-70 hover:opacity-100"
              }`}>
                <span className="inline-block sm:hidden font-mono font-bold text-xs text-brand-cyan mb-1">{item.year}</span>
                <h4 className="text-base sm:text-lg font-sans font-bold text-slate-900 dark:text-white group-hover:text-brand-emerald transition-colors">{item.title}</h4>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}