"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Globe, Layers, Cpu, Code, ArrowRight, 
  CheckCircle 
} from "lucide-react";

export default function ServicesPage() {
  const corporateServices = [
    {
      id: "webgis",
      title: "Enterprise WebGIS Platforms",
      subtitle: "High-Performance Mapping Applications",
      description: "Custom cloud-native web application solutions engineered using modern vector-tile rendering engines, seamless PostGIS database backends, and low-latency geospatial pipelines.",
      icon: Globe,
      features: ["Custom MapLibre/Mapbox GL integrations", "Real-time vector data streaming solutions", "PostgreSQL/PostGIS infrastructure tuning", "Ogc-compliant server optimization"],
      gradient: "from-brand-cyan to-brand-accent",
    },
    {
      id: "zoning",
      title: "USA Zoning Intelligence Analytics",
      subtitle: "Automated Parcel Data Pipelines",
      description: "Precision automated scraping, processing, and visualization workflows for property lines, setback configurations, floor-area ratios, and municipal land development restrictions.",
      icon: Layers,
      features: ["Multi-county parcel geometry parsing", "Municipal legal text data normalization", "Interactive zoning restriction overlays", "Predictive development capability assessments"],
      gradient: "from-brand-emerald to-brand-cyan",
    },
    {
      id: "remote-sensing",
      title: "Remote Sensing & Geospatial AI",
      subtitle: "Satellite Imagery Computing Analytics",
      description: "Advanced multi-spectral and hyperspectral imagery processing models, automated Land Use Land Cover (LULC) classifications, and automated target changes indicators.",
      icon: Cpu,
      features: ["Automated machine learning land tracking", "Vegetation index modeling (NDWI, NDVI)", "Time-series change detection arrays", "High-performance parallel raster processing"],
      gradient: "from-brand-accent to-purple-600",
    },
    {
      id: "automation",
      title: "Spatial Data Pipelines & Automation",
      subtitle: "Custom Python ETL Infrastructure",
      description: "Automating massive geographical vector file operations, geometry cleaning operations, system migrations, and database ingest routines using optimized standalone tooling.",
      icon: Code,
      features: ["ArcPy and PyQGIS headless pipelines", "GeoPandas and Shapely custom scripts", "Massive spatial database migration", "Automated QA/QC topology checking rules"],
      gradient: "from-purple-600 to-brand-emerald",
    },
  ];

  return (
    <div className="w-full bg-spatial-grid min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      
      {/* Page Context Branding Header */}
      <section className="max-w-4xl mx-auto text-center mb-20 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-brand-surface/50 backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-700 dark:text-slate-300">
            Professional Catalog
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-6xl font-sans font-black tracking-tight text-slate-900 dark:text-white"
        >
          Geospatial Development & <br />
          <span className="bg-clip-text text-transparent bg-gradient-spatial">
            Core Spatial Engineering Services
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-slate-700 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
        >
          Deploying highly tailored, ultra-fast GIS software platforms and structural pipelines designed specifically around open-source architectures.
        </motion.p>
      </section>

      {/* Structural Cards Content Layout */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {corporateServices.map((sector, index) => {
          const IconComponent = sector.icon;
          return (
            <motion.div
              key={sector.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white/40 dark:bg-brand-surface/20 flex flex-col justify-between group hover:border-brand-cyan/40 transition-all duration-300 shadow-xl"
            >
              <div className="space-y-6">
                
                {/* Header Context Indicator */}
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${sector.gradient} flex items-center justify-center text-brand-dark shadow-md group-hover:scale-105 transition-transform duration-300`}>
                    <IconComponent size={22} className="text-slate-950" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-brand-cyan">
                      {sector.subtitle}
                    </span>
                    <h2 className="text-xl font-sans font-extrabold text-slate-900 dark:text-white mt-0.5">
                      {sector.title}
                    </h2>
                  </div>
                </div>

                {/* Main Abstract Copy block */}
                <p className="text-sm text-slate-700 dark:text-slate-400 leading-relaxed font-sans">
                  {sector.description}
                </p>

                {/* Sub-feature System Grid Checkmarks */}
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {sector.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start space-x-2 text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle size={14} className="text-brand-emerald shrink-0 mt-0.5" />
                      <span className="font-medium leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <Link
                  href={`/contact?service=${sector.id}`}
                  className="w-full py-3.5 rounded-xl border-2 border-slate-950 text-slate-950 bg-transparent hover:bg-slate-950 hover:text-white dark:border-slate-700 dark:text-slate-200 dark:hover:bg-white dark:hover:text-slate-950 dark:hover:border-white font-sans font-extrabold text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition-all duration-200 group/btn"
                >
                  <span>Request Service</span>
                  <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>

            </motion.div>
          );
        })}
      </section>

      {/* Global Bottom Summary Banner */}
      <section className="max-w-5xl mx-auto mt-20 text-center glass-panel p-8 sm:p-12 rounded-3xl border border-slate-200 dark:border-slate-800/80 relative overflow-hidden bg-white/50 dark:bg-brand-surface/40">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/5 dark:bg-brand-cyan/10 rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-emerald/5 dark:bg-brand-emerald/10 rounded-full filter blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-sans font-black text-slate-900 dark:text-white">
            Have a Complex Spatial Requirement?
          </h2>
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-400 leading-relaxed">
            Whether you need to parse gigabytes of municipal zoning regulations or scale a web mapping application to millions of render tiles, we deliver robust production solutions.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex px-8 py-4 rounded-xl bg-gradient-spatial text-slate-950 font-sans font-black text-xs uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-[0.99] transition-all"
            >
              Consult Our Specialists Now
            </Link>
          </div>
        </div>
      </section>
      
    </div>
  );
}