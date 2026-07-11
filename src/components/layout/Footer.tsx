"use client";

import React from "react";
import Link from "next/link";
import { Mail, MapPin, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const navigationGrid = {
    solutions: [
      { name: "Zoning Intelligence", href: "/zoning-intelligence" },
      { name: "WebGIS Platforms", href: "/webgis-solutions" },
      { name: "Spatial Data Science", href: "/services" },
      { name: "Remote Sensing & AI", href: "/services" },
    ],
    resources: [
      { name: "Pakistan GIS Data Portal", href: "/data-portal" },
      { name: "Geospatial Articles", href: "/blog" },
    ],
    company: [
      { name: "About Our Team", href: "/about" },
      { name: "Project Portfolio", href: "/portfolio" },
      { name: "Contact Our Team", href: "/contact" },
    ],
  };

  return (
    // CHANGED: Added text-slate-600 for light mode, dark:text-slate-400 for dark mode
    <footer className="w-full bg-slate-950 text-slate-600 dark:text-slate-400 border-t border-slate-900 font-sans pt-16 pb-8 z-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 border-b border-slate-900 pb-12">
        
        {/* Company Overview Block */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded bg-gradient-spatial p-[1px] flex items-center justify-center">
              <div className="w-full h-full bg-brand-dark rounded-[3px] flex items-center justify-center text-brand-emerald font-mono font-bold text-sm">G</div>
            </div>
            <span className="font-extrabold text-lg uppercase tracking-wider text-white">GIS Gynix</span>
          </div>
          {/* CHANGED: Made paragraph text responsive to contrast rules */}
          <p className="text-sm leading-relaxed text-slate-400 dark:text-slate-400 max-w-sm">
            Global GIS Systems Engineering & Strategic Geospatial Intelligence. We design and deploy high-performance spatial cloud infrastructure worldwide alongside dedicated regional open-data repositories.
          </p>
          <div className="pt-2 space-y-2 text-xs font-mono">
            <div className="flex items-center space-x-2">
              <Mail size={14} className="text-brand-cyan" /> 
              <span className="text-slate-400 dark:text-slate-400">gisgynix@gmail.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin size={14} className="text-brand-cyan" /> 
              <span className="text-slate-400 dark:text-slate-400">Global Services & Regional Portals</span>
            </div>
          </div>
        </div>

        {/* Directory Sub-Links */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-4">Core Solutions</h4>
          <ul className="space-y-2.5 text-sm">
            {navigationGrid.solutions.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="hover:text-brand-emerald text-slate-400 dark:text-slate-400 transition-colors duration-150 flex items-center group">
                  {item.name} 
                  <ArrowUpRight size={12} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-4">Data & Insights</h4>
          <ul className="space-y-2.5 text-sm">
            {navigationGrid.resources.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="hover:text-brand-cyan text-slate-400 dark:text-slate-400 transition-colors duration-150 flex items-center group">
                  {item.name} 
                  <ArrowUpRight size={12} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-4">Company</h4>
          <ul className="space-y-2.5 text-sm">
            {navigationGrid.company.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="hover:text-brand-accent text-slate-400 dark:text-slate-400 transition-colors duration-150 flex items-center group">
                  {item.name} 
                  <ArrowUpRight size={12} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-600">
        <p>&copy; {new Date().getFullYear()} GIS Gynix. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 sm:mt-0 text-slate-500">
          <span>Enterprise Geospatial Deployments</span>
        </div>
      </div>
    </footer>
  );
}