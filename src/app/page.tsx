"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Globe, Layers, ArrowRight, Database, Cpu, CheckCircle } from "lucide-react";
import SpatialHeroCanvas from "@/components/home/SpatialHeroCanvas";

export default function HomePage() {
  const systemMetrics = [
    { label: "Geospatial Projects Completed", count: "50+" },
    { label: "Spatial Cloud Infrastructure Uptime", count: "99.9%" },
    { label: "Target Regions Mapped", count: "12+" },
    { label: "Client Satisfaction", count: "100%" },
  ];

  const operationalSectors = [
    {
      title: "Zoning Intelligence & Zoning Services",
      description: "Automated, scalable mapping of property boundaries, building code dimensions, setbacks, and land development limits across municipal regions.",
      link: "/zoning-intel",
      icon: Layers,
      color: "text-brand-emerald",
    },
    {
      title: "Cloud WebGIS Applications & Platforms",
      description: "Deploying low-latency tiled WebGIS solutions powered by PostGIS database structures, Next.js, and Mapbox GL rendering pipelines.",
      link: "/webgis-solutions",
      icon: Globe,
      color: "text-brand-cyan",
    },
    {
      title: "Free GIS Data & Spatial Repositories",
      description: "Open-access data portal offering vector boundary downloads, administrative layers, and ready-to-analyze spatial features.",
      link: "/data-portal",
      icon: Database,
      color: "text-brand-accent",
    },
  ];

  // Schema.org Structured Data for Rich Search Results
  const homeSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "GIS Gynix",
    "url": "https://gis-gynix-platform.vercel.app",
    "logo": "https://gis-gynix-platform.vercel.app/logo.png",
    "description": "Enterprise GIS systems engineering agency specializing in WebGIS development, zoning services, free GIS data portals, and remote sensing pipelines.",
    "sameAs": [
      "https://github.com"
    ],
    "offers": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "WebGIS Application Development"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Zoning Intelligence & Feasibility Analysis"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Free GIS Data Download Portal"
        }
      }
    ]
  };

  return (
    <main className="relative w-full overflow-hidden bg-spatial-grid min-h-screen font-sans">
      {/* Search Engine Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeSchema) }}
      />

      <SpatialHeroCanvas />

      {/* Main Hero Header Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 flex flex-col items-center justify-center text-center z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-brand-surface/50 backdrop-blur-md mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-brand-emerald animate-pulse-slow" />
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-slate-700 dark:text-slate-300">
            Enterprise GIS Systems & WebGIS Engineering
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-7xl font-sans font-extrabold tracking-tight text-slate-900 dark:text-white max-w-5xl leading-[1.1]"
        >
          WebGIS Solutions, Zoning Services & <br />
          <span className="bg-clip-text text-transparent bg-gradient-spatial">
            Cloud Geospatial Intelligence
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-6 text-base sm:text-xl text-slate-700 dark:text-slate-400 max-w-3xl leading-relaxed font-sans"
        >
          GIS Gynix builds high-performance WebGIS platforms, delivers automated zoning services, and provides open access to free GIS data and remote sensing analytics.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <Link
            href="/contact"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-spatial text-brand-dark font-sans font-bold text-base flex items-center justify-center space-x-2 shadow-lg shadow-brand-cyan/10 hover:shadow-brand-cyan/20 transition-all duration-200 transform hover:-translate-y-0.5 group"
          >
            <span>Request GIS Services</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/data-portal"
            className="w-full sm:w-auto px-8 py-4 rounded-xl glass-panel border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-white font-sans font-semibold text-base flex items-center justify-center space-x-2 hover:bg-slate-100 dark:hover:bg-brand-muted/50 transition-all duration-200"
          >
            <Database size={18} className="text-brand-cyan" />
            <span>Explore Free GIS Data</span>
          </Link>
        </motion.div>
      </section>

      {/* Metrics Section */}
      <section className="relative border-y border-slate-200 dark:border-slate-900 bg-white/40 dark:bg-brand-surface/20 backdrop-blur-sm z-10">
        <h2 className="sr-only">GIS Gynix Operational System Performance Metrics</h2>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {systemMetrics.map((metric, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-3xl sm:text-5xl font-sans font-black text-slate-900 dark:text-white tracking-tight bg-clip-text">
                  {metric.count}
                </div>
                <div className="text-xs sm:text-sm font-sans font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Operational Sectors Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-brand-cyan">
            Our Core Geospatial Capabilities
          </h2>
          <p className="text-3xl sm:text-4xl font-sans font-extrabold tracking-tight text-slate-900 dark:text-white">
            Specialized Spatial Engineering & Mapping Solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {operationalSectors.map((sector, idx) => {
            const Icon = sector.icon;
            return (
              <Link
                key={idx}
                href={sector.link}
                className="glass-panel p-8 rounded-2xl flex flex-col space-y-5 transition-all duration-300 transform hover:-translate-y-1 border border-slate-200 dark:border-slate-800/60 shadow-xl group hover:border-brand-cyan/30"
              >
                <div className={`w-12 h-12 rounded-xl bg-slate-100 dark:bg-brand-muted flex items-center justify-center ${sector.color} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-sans font-bold text-slate-900 dark:text-white group-hover:text-brand-cyan transition-colors">
                  {sector.title}
                </h3>
                <p className="text-sm font-sans text-slate-700 dark:text-slate-400 leading-relaxed flex-grow">
                  {sector.description}
                </p>
                <div className="flex items-center space-x-2 text-xs font-mono font-bold text-brand-cyan pt-2">
                  <span>Explore Feature</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}