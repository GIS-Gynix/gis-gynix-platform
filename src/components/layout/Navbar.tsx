"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { Menu, X, Sun, Moon, Layers, Globe, Database, FileText, Briefcase, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Zoning Intel", href: "/zoning-intelligence", icon: Layers },
    { name: "WebGIS Apps", href: "/webgis-solutions", icon: Globe },
    { name: "Data Portal", href: "/data-portal", icon: Database },
    { name: "Portfolio", href: "/portfolio", icon: Briefcase },
    { name: "Blog", href: "/blog", icon: FileText },
    { name: "Contact", href: "/contact", icon: Mail },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 glass-panel border-b transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Branding Identity */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-spatial p-[2px] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-brand-dark rounded-[6px] flex items-center justify-center font-mono font-bold text-brand-emerald text-xl">
              G
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-sans font-extrabold text-xl tracking-wider uppercase text-slate-900 dark:text-white">
              GIS <span className="text-brand-cyan">Gynix</span>
            </span>
            <span className="text-[10px] uppercase tracking-widest font-mono text-slate-500 dark:text-brand-emerald">
              Spatial Intelligence
            </span>
          </div>
        </Link>

        {/* Desktop Interactive Nav Grid */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="px-4 py-2 rounded-md font-sans text-sm font-medium tracking-wide text-slate-600 dark:text-slate-300 hover:text-brand-cyan dark:hover:text-brand-emerald transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Utility Dynamic Control Shell */}
        <div className="hidden lg:flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-brand-muted transition-all duration-200"
            aria-label="Toggle Theme Mode"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link
            href="/contact"
            className="px-5 py-2.5 rounded-lg bg-gradient-spatial text-brand-dark font-sans font-bold text-sm hover:opacity-90 shadow-md transition-all duration-200 transform hover:-translate-y-[1px]"
          >
            Launch Project
          </Link>
        </div>

        {/* Mobile Control Activation */}
        <div className="flex items-center space-x-4 lg:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border text-slate-700 dark:text-slate-300"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg border text-slate-700 dark:text-slate-300"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer UI System */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-0 w-full glass-panel border-b px-4 py-6 flex flex-col space-y-3 shadow-xl lg:hidden"
          >
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-slate-100 dark:hover:bg-brand-muted text-slate-700 dark:text-slate-200 text-base font-medium"
                >
                  {Icon && <Icon size={18} className="text-brand-cyan" />}
                  <span>{link.name}</span>
                </Link>
              );
            })}
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="w-full text-center py-3 rounded-lg bg-gradient-spatial text-brand-dark font-bold mt-4 block"
            >
              Launch Project
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}