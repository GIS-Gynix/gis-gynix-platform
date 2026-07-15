"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigation = [
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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/80 backdrop-blur-md border-b border-slate-900/80 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Branding */}
          <div className="flex-shrink-0 flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-3 group">
              {/* Custom Spatial Node Vector Logo */}
              <div className="relative w-9 h-9 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-200">
                {/* Micro glow element on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-cyan to-brand-emerald rounded-lg opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-300" />
                
                <svg 
                  viewBox="0 0 80 80" 
                  className="w-8.5 h-8.5 relative z-10 drop-shadow-[0_0_6px_rgba(6,182,212,0.15)]"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="nav-logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#06b6d4" /> {/* Brand Cyan */}
                      <stop offset="100%" stop-color="#10b981" /> {/* Brand Emerald */}
                    </linearGradient>
                  </defs>

                  {/* Outer structural hexagon framework */}
                  <polygon 
                    points="40,5 75,25 75,65 40,85 5,65 5,25" 
                    transform="scale(0.9) translate(4, 4)"
                    fill="none" 
                    stroke="url(#nav-logo-grad)" 
                    strokeWidth="2" 
                    className="opacity-40 group-hover:opacity-75 transition-opacity duration-300" 
                  />
                  
                  {/* Top isometric data plane */}
                  <polygon 
                    points="40,15 65,28 40,41 15,28" 
                    transform="scale(0.9) translate(4, 4)"
                    fill="none" 
                    stroke="url(#nav-logo-grad)" 
                    strokeWidth="2" 
                  />
                  
                  {/* Base connections & stems */}
                  <path 
                    d="M 15,40 L 40,53 L 65,40" 
                    transform="scale(0.9) translate(4, 4)"
                    fill="none" 
                    stroke="url(#nav-logo-grad)" 
                    strokeWidth="2" 
                  />
                  <line 
                    x1="40" y1="41" x2="40" y2="72" 
                    stroke="url(#nav-logo-grad)" 
                    strokeWidth="2.5" 
                  />
                  
                  {/* Spatial coordinate nodes */}
                  <circle cx="40" cy="72" r="4.5" fill="#10b981" />
                  <circle cx="17.5" cy="29" r="3" fill="#06b6d4" />
                  <circle cx="62.5" cy="29" r="3" fill="#06b6d4" />
                </svg>
              </div>

              {/* Text Signature */}
              <div className="flex flex-col">
                <span className="font-extrabold text-base uppercase tracking-wider text-white">
                  GIS Gynix
                </span>
                <span className="text-[10px] uppercase tracking-widest text-brand-cyan font-mono leading-none">
                  Spatial Intelligence
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-xs font-semibold tracking-wider uppercase transition-all duration-150 ${
                    isActive
                      ? "text-brand-emerald bg-slate-900/60 border-b border-brand-emerald/40"
                      : "text-slate-300 hover:text-white hover:bg-slate-900/30"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Context Action Button */}
          <div className="hidden lg:flex items-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-brand-cyan to-brand-emerald rounded hover:opacity-90 shadow-md shadow-brand-emerald/10 transition-all active:scale-[0.98]"
            >
              Launch Project
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-900 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out ${
          isOpen ? "block opacity-100 max-h-screen" : "hidden opacity-0 max-h-0"
        }`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-4 space-y-1 bg-slate-950 border-b border-slate-900 shadow-xl">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-md text-sm font-medium tracking-wide uppercase ${
                  isActive
                    ? "text-brand-emerald bg-slate-900 font-bold"
                    : "text-slate-300 hover:text-white hover:bg-slate-900/50"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
          <div className="pt-4 pb-2 px-4">
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center px-4 py-3 text-sm font-bold uppercase tracking-wider text-slate-950 bg-gradient-to-r from-brand-cyan to-brand-emerald rounded shadow-md"
            >
              Launch Project
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}