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
      { name: "Developer Tools", href: "#" },
    ],
    company: [
      { name: "About Corporate Ecosystem", href: "/about" },
      { name: "Project Portfolio Hub", href: "/portfolio" },
      { name: "Secure Contact Gate", href: "/contact" },
    ],
  };

  return (
    <footer className="w-full bg-slate-950 text-slate-400 border-t border-slate-900 font-sans pt-16 pb-8 z-10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 border-b border-slate-900 pb-12">
        
        {/* Company Overview Block */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded bg-gradient-spatial p-[1px] flex items-center justify-center">
              <div className="w-full h-full bg-brand-dark rounded-[3px] flex items-center justify-center text-brand-emerald font-mono font-bold text-sm">G</div>
            </div>
            <span className="font-extrabold text-lg uppercase tracking-wider text-white">GIS Gynix</span>
          </div>
          <p className="text-sm leading-relaxed text-slate-400 max-w-sm">
            International tier spatial engineering collective specializing in real-time Cloud WebGIS deployment, modern vector-tile optimization architectures, and zoning intelligence orchestration models.
          </p>
          <div className="pt-2 space-y-2 text-xs font-mono">
            <div className="flex items-center space-x-2">
              <Mail size={14} className="text-brand-cyan" /> 
              <span>operations@gisgynix.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin size={14} className="text-brand-cyan" /> 
              <span>Global Delivery Network</span>
            </div>
          </div>
        </div>

        {/* Iterative Sub-Link Directories */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-4">Core Solutions</h4>
          <ul className="space-y-2.5 text-sm">
            {navigationGrid.solutions.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="text-slate-400 hover:text-brand-emerald transition-colors duration-150 flex items-center group">
                  {item.name} 
                  <ArrowUpRight size={12} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-4">Resources</h4>
          <ul className="space-y-2.5 text-sm">
            {navigationGrid.resources.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="text-slate-400 hover:text-brand-cyan transition-colors duration-150 flex items-center group">
                  {item.name} 
                  <ArrowUpRight size={12} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-4">Corporate</h4>
          <ul className="space-y-2.5 text-sm">
            {navigationGrid.company.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className="text-slate-400 hover:text-brand-accent transition-colors duration-150 flex items-center group">
                  {item.name} 
                  <ArrowUpRight size={12} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-600">
        <p>&copy; {new Date().getFullYear()} GIS Gynix. All rights engineered internationally.</p>
        <div className="flex space-x-6 mt-4 sm:mt-0">
          <Link href="#" prefetch={false} className="hover:text-slate-400">Security Architecture</Link>
          <Link href="#" prefetch={false} className="hover:text-slate-400">Terms of Deployment</Link>
        </div>
      </div>
    </footer>
  );
}