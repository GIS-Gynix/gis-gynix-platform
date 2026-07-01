"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Layers, Sun, Moon } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navigationLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Zoning Intel", href: "/zoning-intelligence" },
    { name: "WebGIS Apps", href: "/webgis-solutions" },
    { name: "Data Portal", href: "/data-portal" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 h-20 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-900 z-50 flex items-center justify-between px-4 sm:px-8 lg:px-12 transition-all duration-300">
      {/* Brand Identity Logo Branding Container */}
      <Link href="/" className="flex items-center space-x-3 group z-50">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-cyan via-brand-emerald to-brand-accent p-[1.5px] shadow-lg shadow-brand-cyan/10 group-hover:shadow-brand-cyan/20 transition-all duration-300">
          <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
            <Layers className="text-brand-cyan w-5 h-5 transform group-hover:scale-110 transition-transform" />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="font-sans font-black text-sm tracking-wider text-white uppercase">
            GIS <span className="text-brand-cyan">Gynix</span>
          </span>
          <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase leading-none">
            Spatial Intelligence
          </span>
        </div>
      </Link>

      {/* Desktop View Core Route Links Panel */}
      <nav className="hidden lg:flex items-center space-x-1">
        {navigationLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 rounded-xl text-xs font-sans font-bold tracking-wide transition-all duration-200 ${
                isActive
                  ? "text-brand-cyan bg-slate-900/60 shadow-inner border border-slate-800/50"
                  : "text-slate-300 hover:text-white hover:bg-slate-900/30"
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </nav>

      {/* Action Utility Block Element */}
      <div className="hidden lg:flex items-center space-x-4">
        {/* Theme Status Indicator (Fixed to Dark for Premium Geospatial Feel) */}
        <div className="w-9 h-9 rounded-xl border border-slate-800 bg-slate-900/40 flex items-center justify-center text-slate-400">
          <Moon size={16} className="text-brand-cyan animate-pulse-slow" />
        </div>

        {/* Global Pipeline Action Button Route Trigger */}
        <Link
          href="/contact"
          className="px-4 py-2.5 rounded-xl bg-gradient-spatial text-brand-dark font-sans font-black text-xs tracking-wide shadow-md shadow-brand-emerald/10 hover:shadow-brand-emerald/20 transition-all duration-200 transform hover:-translate-y-0.5"
        >
          Launch Project
        </Link>
      </div>

      {/* Mobile Responsive Hamburger Toggle Button Element */}
      <div className="flex items-center lg:hidden space-x-3">
        <div className="w-8 h-8 rounded-lg border border-slate-800 bg-slate-900/40 flex items-center justify-center text-slate-400">
          <Moon size={14} className="text-brand-cyan" />
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-xl border border-slate-800 bg-slate-900/40 text-slate-300 hover:text-white transition-colors outline-none z-50"
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Responsive Overlay Navigation Slide Drawer */}
      <div
        className={`fixed inset-0 w-screen h-screen bg-slate-950/95 backdrop-blur-lg z-40 transition-all duration-300 flex flex-col justify-center px-6 space-y-6 lg:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col space-y-4 max-w-sm mx-auto w-full">
          {navigationLinks.map((link, idx) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`w-full py-3 px-4 rounded-xl text-sm font-sans font-bold tracking-wider border transition-all ${
                  isActive
                    ? "bg-slate-900 border-slate-800 text-brand-cyan text-center"
                    : "border-transparent text-slate-300 text-center hover:bg-slate-900/50"
                }`}
                style={{ transitionDelay: `${idx * 40}ms` }}
              >
                {link.name}
              </Link>
            );
          })}
          
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="w-full py-3.5 mt-4 rounded-xl bg-gradient-spatial text-brand-dark font-sans font-black text-center text-xs uppercase tracking-widest shadow-lg"
          >
            Launch Project Pipeline
          </Link>
        </div>
      </div>
    </header>
  );
}