"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Tag, 
  BookOpen, 
  Terminal, 
  Shield, 
  CheckCircle, 
  Layers, 
  Server, 
  Activity 
} from "lucide-react";

// Deep engineering database mapping dynamic articles
const dynamicArticlesContent: Record<string, {
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  tag: string;
  difficulty: string;
  content: React.ReactNode;
}> = {
  "automating-usa-zoning-postgis": {
    title: "Automating USA Zoning Spatial Pipelines with PostGIS",
    subtitle: "Orchestrating geometric calculations for property line analysis at scale.",
    date: "June 24, 2026",
    readTime: "8 min read",
    tag: "Zoning",
    difficulty: "Advanced",
    content: (
      <div className="space-y-6 font-sans">
        <p>
          Municipal zoning codes in the United States present a massive workflow hurdle for developers and urban analysts. Building dimensions, yard setbacks, and allowable lot coverage thresholds are often trapped within non-standardized GIS shapefiles or physical legal texts. By leveraging <strong>PostgreSQL</strong> and <strong>PostGIS</strong> vector extensions, we can completely automate these extraction scripts.
        </p>

        <h3 className="text-xl font-bold pt-4 text-slate-900 dark:text-white flex items-center gap-2">
          <Terminal size={18} className="text-brand-cyan" /> 1. Boundary Vector Normalization
        </h3>
        <p>
          Before running proximity calculations, spatial geometries must be normalized. Standardizing multi-polygon structures and re-projecting coordinate reference systems (CRS) to local state planes ensure high structural precision.
        </p>
        <div className="p-4 rounded-xl bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto border border-slate-800">
          {`SELECT ST_Transform(geom, 2283) AS projected_geom \nFROM municipal_parcels \nWHERE zoning_class IS NOT NULL;`}
        </div>

        <h3 className="text-xl font-bold pt-4 text-slate-900 dark:text-white flex items-center gap-2">
          <Layers size={18} className="text-brand-emerald" /> 2. Setback Line Extractions via ST_Buffer
        </h3>
        <p>
          Calculating setbacks requires executing interior negative buffers on parcel polygon boundaries. By applying different interior adjustments on front, side, and rear property lines, we generate clear 3D development footprints.
        </p>
        <ul className="space-y-2 pl-4 border-l-2 border-slate-200 dark:border-slate-800">
          <li className="flex gap-2 text-sm"><CheckCircle size={16} className="text-brand-emerald shrink-0 mt-0.5" /> <strong>ST_Buffer:</strong> Executes distance calculations on primary property boundaries.</li>
          <li className="flex gap-2 text-sm"><CheckCircle size={16} className="text-brand-emerald shrink-0 mt-0.5" /> <strong>ST_Difference:</strong> Separates non-buildable exterior rings instantly.</li>
        </ul>
      </div>
    )
  },
  "optimizing-geoserver-vector-tiles": {
    title: "Optimizing GeoServer & MapLibre Vector Tile Delivery",
    subtitle: "Streaming large geospatial vector layers cleanly with low latency frameworks.",
    date: "May 18, 2026",
    readTime: "12 min read",
    tag: "WebGIS",
    difficulty: "Expert",
    content: (
      <div className="space-y-6 font-sans">
        <p>
          Standard raster layers cause performance bottlenecks for intensive spatial dashboards. Rendering heavy features like national road networks requires transitioning to dynamic server vector tile structures using <strong>Protocol Buffers (PBF)</strong>.
        </p>

        <h3 className="text-xl font-bold pt-4 text-slate-900 dark:text-white flex items-center gap-2">
          <Server size={18} className="text-brand-cyan" /> 1. GeoServer Layer Generalization Settings
        </h3>
        <p>
          To ensure lightning-fast tile delivery, configure GeoServer caching to simplify spatial lines dynamically based on the viewer zoom level.
        </p>
        <div className="p-4 rounded-xl bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto border border-slate-800">
          {`// Enable Tile Generalization rules\norg.geoserver.vector-tiles.simplify=true\ntolerance=0.0005`}
        </div>

        <h3 className="text-xl font-bold pt-4 text-slate-900 dark:text-white flex items-center gap-2">
          <Shield size={18} className="text-brand-accent" /> 2. MapLibre GL Client Side GPU Adjustments
        </h3>
        <p>
          Once tiles are transmitted from GeoServer, MapLibre uses local WebGL commands to parse geometries directly in the user browser. Enforcing fixed feature thresholds keeps interactive framing smooth and readable during rapid pans.
        </p>
      </div>
    )
  },
  "google-earth-engine-lulc-automation": {
    title: "Large-Scale LULC Mapping via Google Earth Engine",
    subtitle: "Automating satellite data monitoring with random forest classification algorithms.",
    date: "April 05, 2026",
    readTime: "10 min read",
    tag: "Remote Sensing",
    difficulty: "Intermediate",
    content: (
      <div className="space-y-6 font-sans">
        <p>
          Land Use Land Cover (LULC) maps provide critical insights for environmental asset tracking and regional development. Utilizing cloud compute engines allows processing multi-spectral imagery matrices instantly without local hardware bounds.
        </p>

        <h3 className="text-xl font-bold pt-4 text-slate-900 dark:text-white flex items-center gap-2">
          <BookOpen size={18} className="text-brand-emerald" /> 1. Spectral Index Ingestion (NDVI & NDWI)
        </h3>
        <p>
          We enhance target asset recognition by injecting specific band indicators directly into our satellite imagery collection stacks before model training begins.
        </p>
        <div className="p-4 rounded-xl bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto border border-slate-800">
          {`var ndvi = image.normalizedDifference(['B8', 'B4']).rename('NDVI');\nvar collection = image.addBands(ndvi);`}
        </div>

        <h3 className="text-xl font-bold pt-4 text-slate-900 dark:text-white flex items-center gap-2">
          <Activity size={18} className="text-brand-cyan" /> 2. Model Asset Training
        </h3>
        <p>
          Using random forest classifiers across processed satellite samples yields clean accuracy scores exceeding 92%, automating continuous landscape monitoring.
        </p>
      </div>
    )
  }
};

export default function BlogPostPage() {
  const params = useParams();
  const articleId = params?.id as string;
  const article = dynamicArticlesContent[articleId];

  if (!article) {
    return (
      <div className="w-full bg-spatial-grid min-h-screen pt-32 pb-12 flex flex-col items-center justify-center text-center">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">Technical Entry Log Disconnected</h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">The request code does not map to a recognized pipeline ledger.</p>
        <Link href="/blog" className="mt-6 px-4 py-2 rounded-xl bg-gradient-spatial text-slate-950 font-sans font-bold text-xs uppercase tracking-wider">
          Return to Hub
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-spatial-grid min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Navigation Return Trigger */}
        <Link href="/blog" className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-400 hover:text-brand-cyan transition-colors">
          <ArrowLeft size={14} />
          <span>Back to Ledger</span>
        </Link>

        {/* Article Metadata Jumbotron Box */}
        <header className="glass-panel p-6 sm:p-10 rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-brand-surface/30 space-y-4">
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500">
            <div className="flex items-center space-x-1"><Calendar size={13} /> <span>{article.date}</span></div>
            <div className="flex items-center space-x-1"><Clock size={13} /> <span>{article.readTime}</span></div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold border bg-rose-500/5 border-rose-500/20 text-rose-400 ml-auto">{article.difficulty}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-sans font-black text-slate-900 dark:text-white leading-tight">
            {article.title}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-medium">
            {article.subtitle}
          </p>
          <div className="pt-2 flex items-center space-x-2 text-xs font-mono">
            <Tag size={12} className="text-brand-emerald" />
            <span className="text-slate-800 dark:text-brand-cyan font-bold uppercase tracking-wider">{article.tag} Log Entry</span>
          </div>
        </header>

        {/* Primary Article Content Block */}
        <article className="glass-panel p-6 sm:p-10 rounded-2xl border border-slate-200 dark:border-slate-800/60 bg-white/70 dark:bg-brand-surface/20 text-slate-800 dark:text-slate-300 leading-relaxed shadow-xl">
          {article.content}
        </article>

      </div>
    </div>
  );
}