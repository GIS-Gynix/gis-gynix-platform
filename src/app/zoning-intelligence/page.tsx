"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Building2, Ruler, ShieldAlert, Car, 
  FileText, Check, HelpCircle, ArrowRight, Layers
} from "lucide-react";
import Link from "lucide-react";

export default function ZoningIntelligencePage() {
  const [billingCycle, setBillingCycle] = useState<"single" | "retainer">("single");

  const zoningParameters = [
    {
      title: "Permitted Land Use Matrix",
      desc: "Cross-referencing base zoning codes (Residential, Commercial, Industrial, Mixed-Use) with municipal tables to confirm exact conditional and permitted use rights.",
      icon: Building2,
      color: "text-blue-500",
    },
    {
      title: "Dimensional Envelopes",
      desc: "Mapping specific building setback boundaries (Front, Rear, Side Yards), precise height limitations, and maximum floor area ratio (FAR) benchmarks.",
      icon: Ruler,
      color: "text-brand-emerald",
    },
    {
      title: "Lot Coverage Regulations",
      desc: "Calculating the exact mathematical threshold for impervious surface allocations, open space requirements, and total footprint limits on site structures.",
      icon: Layers,
      color: "text-brand-cyan",
    },
    {
      title: "Parking & Access Metrics",
      desc: "Parsing complex local code schemas to define exact off-street parking counts, loading docks, and spatial access configuration rules per square foot.",
      icon: Car,
      color: "text-purple-400",
    },
  ];

  const pricingTiers = [
    {
      name: "Single Parcel Feasibility",
      description: "Ideal for individual property buyers, real estate agents, or residential builders evaluating a single plot.",
      price: billingCycle === "single" ? "$349" : "$299",
      period: "per report",
      features: [
        "Base zoning classification verification",
        "Permitted / conditional use breakdown",
        "Dimensional envelope setbacks & heights",
        "Lot coverage & open space metrics",
        "3-Business day delivery timeline",
        "PDF Digital Executive Summary Report"
      ],
      cta: "Order Single Report",
      popular: false,
    },
    {
      name: "Commercial Development Packet",
      description: "Designed for engineering firms, multi-family investors, and urban developers needing intensive site selection data.",
      price: billingCycle === "single" ? "$899" : "$799",
      period: "per project",
      features: [
        "Everything in Single Parcel tier",
        "Overlay district constraint validation",
        "Multi-parcel portfolio aggregation",
        "Critical environmental hazard overlay map",
        "GIS boundary file export (Shapefile/GeoJSON)",
        "Priority developer engineering consultation"
      ],
      cta: "Launch Site Feasibility",
      popular: true,
    }
  ];

  return (
    <div className="w-full bg-spatial-grid min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      
      {/* Structural Hero Section */}
      <section className="max-w-4xl mx-auto text-center mt-8 mb-16 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-brand-surface/50 backdrop-blur-md"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span className="text-[11px] font-mono uppercase tracking-widest text-slate-600 dark:text-slate-400">
            US Municipal Feasibility Portal
          </span>
        </motion.div>
        <h1 className="text-4xl sm:text-5xl font-sans font-black text-slate-900 dark:text-white tracking-tight">
          De-Risking Land Development via <br />
          <span className="bg-clip-text text-transparent bg-gradient-spatial">Automated Zoning Intelligence</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          We extract, simplify, and map complex municipal code guidelines into clear spatial parameters, allowing you to maximize buildable square footage safely.
        </p>
      </section>

      {/* Technical Breakdown Grid */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
        {zoningParameters.map((param, idx) => {
          const Icon = param.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="glass-panel p-6 rounded-xl border border-slate-200 dark:border-slate-800/80 bg-white/40 dark:bg-brand-surface/40 flex flex-col space-y-4 shadow-sm"
            >
              <div className={`w-10 h-10 rounded-lg bg-slate-100 dark:bg-brand-muted flex items-center justify-center ${param.color}`}>
                <Icon size={20} />
              </div>
              <h3 className="text-base font-sans font-bold text-slate-900 dark:text-white">{param.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed flex-grow">{param.desc}</p>
            </motion.div>
          );
        })}
      </section>

      {/* Interactive Pricing Framework */}
      <section className="max-w-6xl mx-auto space-y-12 mb-20">
        <div className="text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-sans font-extrabold text-slate-900 dark:text-white">
            Transparent Pricing Models
          </h2>
          
          {/* Cycle Switch Toggle */}
          <div className="inline-flex items-center p-1 rounded-xl bg-slate-200 dark:bg-brand-muted border border-slate-300 dark:border-slate-800">
            <button
              onClick={() => setBillingCycle("single")}
              className={`px-4 py-2 rounded-lg font-sans text-xs font-bold transition-all ${
                billingCycle === "single"
                  ? "bg-slate-950 dark:bg-white text-white dark:text-brand-dark shadow-md"
                  : "text-slate-600 dark:text-slate-400"
              }`}
            >
              Requests Zoning
            </button>
            <button
              onClick={() => setBillingCycle("retainer")}
              className={`px-4 py-2 rounded-lg font-sans text-xs font-bold transition-all ${
                billingCycle === "retainer"
                  ? "bg-slate-950 dark:bg-white text-white dark:text-brand-dark shadow-md"
                  : "text-slate-600 dark:text-slate-400"
              }`}
            >
              Request Zoning (Discounted, If you are ordering our services for first time)
            </button>
          </div>
        </div>

        {/* Pricing Cards Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {pricingTiers.map((tier, idx) => (
            <div
              key={idx}
              className={`glass-panel p-6 sm:p-8 rounded-2xl border flex flex-col space-y-6 shadow-xl relative bg-white/30 dark:bg-brand-surface/30 ${
                tier.popular 
                  ? "border-brand-cyan/50 shadow-brand-cyan/5" 
                  : "border-slate-200 dark:border-slate-800/60"
              }`}
            >
              {tier.popular && (
                <span className="absolute top-0 right-6 transform -translate-y-1/2 px-3 py-1 rounded-full bg-brand-cyan text-brand-dark font-mono text-[10px] font-bold uppercase tracking-widest shadow">
                  Most Requested
                </span>
              )}

              <div className="space-y-2">
                <h3 className="text-xl font-sans font-bold text-slate-900 dark:text-white">{tier.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed min-h-[40px]">{tier.description}</p>
              </div>

              <div className="flex items-baseline space-x-2 border-b border-slate-200 dark:border-slate-800 pb-4">
                <span className="text-4xl font-mono font-black text-slate-900 dark:text-white">{tier.price}</span>
                <span className="text-xs font-sans font-medium text-slate-500 dark:text-slate-400">/ {tier.period}</span>
              </div>

              <ul className="space-y-3 flex-grow">
                {tier.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-start space-x-3 text-xs font-medium text-slate-700 dark:text-slate-300">
                    <Check size={14} className="text-brand-emerald mt-0.5 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <a
                href="/contact?service=zoning"
                className={`w-full text-center py-3.5 rounded-xl font-sans font-bold text-sm tracking-wide transition-all ${
                  tier.popular
                    ? "bg-gradient-spatial text-brand-dark shadow-md hover:opacity-90"
                    : "bg-slate-900 dark:bg-brand-muted text-white dark:text-slate-200 hover:bg-slate-800 dark:hover:bg-slate-800"
                }`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}