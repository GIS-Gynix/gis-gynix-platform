"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  BookOpen, Calendar, Clock, ArrowRight, 
  Tag, Search, ThumbsUp, MessageSquare 
} from "lucide-react";
import Link from "next/link";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeTag, setActiveTag] = useState<string>("all");

  const articlesCatalog = [
    {
      id: "automating-usa-zoning-postgis",
      title: "Automating USA Zoning Spatial Pipelines with PostGIS",
      excerpt: "A deep dive into writing geometric parsing scripts that calculate parcel yard setbacks, lot coverage constraints, and building footprints automatically.",
      date: "June 24, 2026",
      readTime: "8 min read",
      tag: "Zoning",
      difficulty: "Advanced",
      likes: 42
    },
    {
      id: "optimizing-geoserver-vector-tiles",
      title: "Optimizing GeoServer & MapLibre Vector Tile Delivery",
      excerpt: "How to tune layer caches, structure protocol buffers (PBF), and optimize WebGL rendering pipelines to stream massive spatial datasets smoothly.",
      date: "May 18, 2026",
      readTime: "12 min read",
      tag: "WebGIS",
      difficulty: "Expert",
      likes: 58
    },
    {
      id: "google-earth-engine-lulc-automation",
      title: "Large-Scale LULC Mapping via Google Earth Engine",
      excerpt: "Leveraging multi-spectral satellite matrices and Random Forest classifiers to automate Land Use Land Cover monitoring models at scale.",
      date: "April 05, 2026",
      readTime: "10 min read",
      tag: "Remote Sensing",
      difficulty: "Intermediate",
      likes: 31
    }
  ];

  const tags = ["all", "WebGIS", "Zoning", "Remote Sensing"];

  const filteredArticles = articlesCatalog.filter(art => {
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          art.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = activeTag === "all" || art.tag === activeTag;
    return matchesSearch && matchesTag;
  });

  return (
    <div className="w-full bg-spatial-grid min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Informative Header Block */}
      <section className="max-w-4xl mx-auto text-center mt-8 mb-12 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-brand-surface/50 backdrop-blur-md"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
          <span className="text-[11px] font-mono uppercase tracking-widest text-slate-600 dark:text-slate-400">
            Spatial Intelligence Ledger
          </span>
        </motion.div>
        <h1 className="text-4xl sm:text-5xl font-sans font-black text-slate-900 dark:text-white tracking-tight">
          The Knowledge Hub <br />
          <span className="bg-clip-text text-transparent bg-gradient-spatial">Technical Documentation & Insights</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          In-depth breakdowns of modern web-mapping architectures, spatial databases, and automated satellite image workflows compiled by our core engineers.
        </p>
      </section>

      {/* Query Filter Navigation Command Panel */}
      <section className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
        {/* Search Field */}
        <div className="md:col-span-1 relative flex items-center">
          <Search className="absolute left-4 text-slate-400 pointer-events-none" size={16} />
          <input
            type="text"
            placeholder="Search knowledge logs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-brand-surface/40 font-sans text-sm outline-none focus:border-brand-cyan/60 dark:text-white transition-colors"
          />
        </div>

        {/* Tag Category Pipeline Toggles */}
        <div className="md:col-span-2 flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTag(t)}
              className={`px-4 py-2.5 rounded-xl font-sans text-xs font-bold capitalize shrink-0 border transition-all ${
                activeTag === t
                  ? "bg-slate-900 dark:bg-white text-white dark:text-brand-dark border-transparent shadow-md"
                  : "bg-white/60 dark:bg-brand-surface/40 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800/80 hover:border-brand-cyan/40"
              }`}
            >
              {t === "all" ? "All Engineering" : t}
            </button>
          ))}
        </div>
      </section>

      {/* Article Cards Grid Section */}
      <section className="max-w-4xl mx-auto space-y-8 mb-20">
        {filteredArticles.map((article, idx) => (
          <motion.article
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            key={article.id}
            className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800/60 bg-white/30 dark:bg-brand-surface/30 shadow-xl flex flex-col space-y-4 hover:border-brand-cyan/30 transition-all duration-300 group relative overflow-hidden"
          >
            {/* Top Meta Details Line */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500 dark:text-slate-400">
              <div className="flex items-center space-x-1">
                <Calendar size={13} />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock size={13} />
                <span>{article.readTime}</span>
              </div>
              <span className={`ml-auto px-2 py-0.5 rounded text-[10px] font-bold border ${
                article.difficulty === "Advanced" || article.difficulty === "Expert"
                  ? "bg-rose-500/5 border-rose-500/20 text-rose-400"
                  : "bg-amber-500/5 border-amber-500/20 text-amber-400"
              }`}>
                {article.difficulty}
              </span>
            </div>

            {/* Title & Excerpt Summary */}
            <div className="space-y-2">
              <h3 className="text-xl sm:text-2xl font-sans font-extrabold text-slate-900 dark:text-white group-hover:text-brand-cyan transition-colors leading-tight">
                {article.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {article.excerpt}
              </p>
            </div>

            {/* Bottom Interaction Area */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800/60 flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
                <Tag size={12} className="text-brand-emerald" />
                <span className="text-slate-600 dark:text-slate-300 font-semibold">{article.tag}</span>
              </div>

              {/* Sub-Route Trigger Link */}
              <Link
                href={`/blog/${article.id}`}
                className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold uppercase tracking-wider text-slate-800 dark:text-white hover:text-brand-emerald transition-colors"
              >
                <span>Read Full Log</span>
                <ArrowRight size={14} className="transform group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </motion.article>
        ))}

        {filteredArticles.length === 0 && (
          <div className="text-center py-12 font-sans text-slate-500 text-sm">
            No technical entries found matching those search criteria keywords.
          </div>
        )}
      </section>
    </div>
  );
}