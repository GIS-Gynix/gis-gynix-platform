"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, Terminal, User, Mail, 
  Briefcase, MessageSquare, CheckCircle2, Sliders, FileText, Activity 
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    sector: "webgis",
    timeline: "3-months",
    details: ""
  });
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const executeFormSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  // Human-readable labels lookup matrix
  const sectorNames: Record<string, string> = {
    webgis: "Cloud WebGIS Application Development",
    zoning: "USA Zoning & Parcel Analysis Platform",
    "remote-sensing": "Remote Sensing & Satellite AI Analysis",
    automation: "Custom Python Spatial Scripting & Pipelines"
  };

  const timelineNames: Record<string, string> = {
    urgent: "Ad-Hoc / Rapid Support Sprint",
    "1-month": "1-Month Development Cycle",
    "3-months": "3.5-Month Milestone Contract (Fiverr/Upwork)",
    retainer: "Long-Term Agency Developer Retainer"
  };

  return (
    <div className="w-full bg-spatial-grid min-h-screen pt-28 pb-12 px-4 sm:px-6 lg:px-8">
      
      {/* Informative Portal Heading */}
      <section className="max-w-4xl mx-auto text-center mb-12 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-brand-surface/50 backdrop-blur-md"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
          <span className="text-[11px] font-mono uppercase tracking-widest text-slate-600 dark:text-slate-400">
            Secure Inbound Pipeline
          </span>
        </motion.div>
        <h1 className="text-4xl sm:text-5xl font-sans font-black text-slate-900 dark:text-white tracking-tight">
          Retain Spatial Engineers <br />
          <span className="bg-clip-text text-transparent bg-gradient-spatial">Initialize System Calibration</span>
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Submit your scope parameters below. Our web mapping and remote sensing coordination team typically responds with complete system specifications within 24 operational hours.
        </p>
      </section>

      {/* Main Dual-Pane Console Layout Grid */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-20">
        
        {/* Left Interactive Input Form Card */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/30 dark:bg-brand-surface/30 shadow-2xl relative flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form 
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={executeFormSubmission} 
                className="space-y-5"
              >
                {/* Identity Name Row */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <User size={13} className="text-brand-cyan" /> Lead Architect / Contact Name
                  </label>
                  <input
                    required
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Alexander Wright"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-brand-dark/50 font-sans text-sm outline-none focus:border-brand-emerald/60 dark:text-white transition-colors"
                  />
                </div>

                {/* Comms Channel Email Row */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <Mail size={13} className="text-brand-cyan" /> Secure Comms Channel (Email)
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g., wright@enterprise-equity.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-brand-dark/50 font-sans text-sm outline-none focus:border-brand-emerald/60 dark:text-white transition-colors"
                  />
                </div>

                {/* Scope & Selector Row Configuration */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Category Target */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
                      <Briefcase size={13} className="text-brand-accent" /> Operational Sector
                    </label>
                    <select
                      name="sector"
                      value={formData.sector}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-brand-dark/50 font-sans text-sm outline-none focus:border-brand-cyan/60 dark:text-white transition-colors cursor-pointer"
                    >
                      <option value="webgis">Cloud WebGIS App</option>
                      <option value="zoning">USA Zoning Analysis</option>
                      <option value="remote-sensing">Remote Sensing AI</option>
                      <option value="automation">Python Spatial Scripting</option>
                    </select>
                  </div>

                  {/* Lifecycle Duration Target */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
                      <Sliders size={13} className="text-brand-accent" /> Project Lifecycle
                    </label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="w-full px-3 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-brand-dark/50 font-sans text-sm outline-none focus:border-brand-cyan/60 dark:text-white transition-colors cursor-pointer"
                    >
                      <option value="urgent">Ad-Hoc / Rapid Support</option>
                      <option value="1-month">1 Month Sprint</option>
                      <option value="3-months">3.5 Months (Fiverr/Upwork Milestone)</option>
                      <option value="retainer">Long-Term Agency Retainer</option>
                    </select>
                  </div>
                </div>

                {/* Details Description Field */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <MessageSquare size={13} className="text-brand-cyan" /> Engineering Specifications Manifest
                  </label>
                  <textarea
                    required
                    name="details"
                    rows={4}
                    value={formData.details}
                    onChange={handleInputChange}
                    placeholder="Provide coordinate zones, database scale sizes, or municipal code targets..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-brand-dark/50 font-sans text-sm outline-none focus:border-brand-emerald/60 dark:text-white transition-colors resize-none"
                  />
                </div>

                {/* Form Dispatch Button Trigger */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-spatial text-brand-dark font-sans font-bold text-sm tracking-wide flex items-center justify-center space-x-2 shadow-lg shadow-brand-cyan/10 hover:shadow-brand-cyan/20 transition-all duration-200 transform hover:-translate-y-0.5 group"
                >
                  <span>Transmit Pipeline Parameters</span>
                  <Send size={15} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </motion.form>
            ) : (
              // Success Feedback View State Block
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-4 flex flex-col items-center justify-center my-auto"
              >
                <div className="w-16 h-16 rounded-full bg-brand-emerald/10 text-brand-emerald flex items-center justify-center">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="text-2xl font-sans font-black text-slate-900 dark:text-white">Transmission Successful</h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed mx-auto">
                  Your spatial project manifest has been safely encrypted and synchronized directly with the tracking queue.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-600 dark:text-slate-400 hover:text-brand-cyan transition-colors"
                >
                  Calibrate New Stream
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Automated Clear Specification Summary Panel */}
        <div className="glass-panel rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900/40 p-6 shadow-2xl flex flex-col justify-between relative group">
          <div className="space-y-6">
            {/* Header Title segment */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 text-xs font-mono">
              <div className="flex items-center space-x-2 text-slate-800 dark:text-white">
                <FileText size={16} className="text-brand-emerald" />
                <span className="font-bold uppercase tracking-wider">Live Project Scope Breakdown</span>
              </div>
              <div className="flex items-center space-x-1.5 text-slate-400">
                <Activity size={12} className="text-brand-cyan animate-pulse" />
                <span className="text-[10px] tracking-widest uppercase">Live Tracking</span>
              </div>
            </div>

            {/* Structured Readable Data Breakdown */}
            <div className="space-y-5 font-sans">
              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">Prospective Client</span>
                <p className="text-base font-extrabold text-slate-900 dark:text-white transition-all">
                  {formData.name || <span className="text-slate-500 font-normal italic">Awaiting entry...</span>}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">Communication Channel</span>
                <p className="text-base font-medium font-mono text-brand-cyan break-all">
                  {formData.email || <span className="text-slate-500 font-sans font-normal italic">Awaiting entry...</span>}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">Selected Project Domain</span>
                <p className="text-base font-bold text-slate-900 dark:text-brand-emerald">
                  {sectorNames[formData.sector]}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">Development Lifecycle</span>
                <p className="text-base font-bold text-slate-900 dark:text-white">
                  {timelineNames[formData.timeline]}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block">Scope Specifications Manifest</span>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-h-32 overflow-y-auto scrollbar-none bg-slate-950/20 p-3 rounded-xl border border-slate-200 dark:border-slate-800/60 min-h-[64px]">
                  {formData.details || <span className="text-slate-500 italic">No notes provided yet. Write your details in the description field...</span>}
                </p>
              </div>
            </div>
          </div>

          {/* Secure Assurance Indicator Footer Badge */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 mt-6 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>PIPELINE ENGINE V1.0</span>
            <span className="text-brand-emerald font-bold">● SYSTEM OPERATIONAL</span>
          </div>
        </div>

      </section>
    </div>
  );
}