"use client";

import React from "react";
import Link from "next/link";
import { 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUpRight 
} from "lucide-react";

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
      { name: "Contact Us Now", href: "/contact" },
    ],
  };

  const socialLinks = [
    { 
      name: "Fiverr", 
      href: "https://www.fiverr.com/s/qDEo8Ay", 
      iconUrl: "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/fiverr-icon.png" 
    },
    { 
      name: "Upwork", 
      href: "https://www.upwork.com/freelancers/~014c5dfcb05a8b2acb?mp_source=share", 
      iconUrl: "https://cdn-icons-png.flaticon.com/128/15527/15527365.png" 
    },
    { 
      name: "Facebook", 
      href: "https://www.facebook.com/profile.php?id=61553547554500", 
      iconUrl: "https://cdn-icons-png.flaticon.com/128/15047/15047435.png" 
    },
    { 
      name: "WhatsApp", 
      href: "https://wa.me/923375316392", 
      iconUrl: "https://cdn-icons-png.flaticon.com/128/3536/3536445.png" 
    },
  ];

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
          <div className="pt-2 space-y-2.5 text-xs font-mono">
            <div className="flex items-center space-x-2">
              <Mail size={14} className="text-brand-cyan" /> 
              <span>gisgynix@gmail.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone size={14} className="text-brand-cyan" /> 
              <span>+923375316392</span>
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
                <Link href={item.href} className="hover:text-brand-emerald transition-colors duration-150 flex items-center group">
                  {item.name} <ArrowUpRight size={12} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
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
                <Link href={item.href} className="hover:text-brand-cyan transition-colors duration-150 flex items-center group">
                  {item.name} <ArrowUpRight size={12} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Corporate & Social Gateway Layout */}
        <div className="flex flex-col justify-between space-y-6 lg:space-y-0">
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-4">Corporate</h4>
            <ul className="space-y-2.5 text-sm">
              {navigationGrid.company.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-brand-accent transition-colors duration-150 flex items-center group">
                    {item.name} <ArrowUpRight size={12} className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Social Network Section with Custom Branded Image Assets */}
          <div className="lg:pt-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">Connect Network</h4>
            <div className="flex items-center gap-4.5">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.name}
                  className="transition-transform duration-200 hover:scale-110 block shrink-0 brightness-90 hover:brightness-100"
                >
                  <img 
                    src={social.iconUrl} 
                    alt={`${social.name} logo`}
                    className="h-4.5 w-4.5 object-contain" 
                  />
                </a>
              ))}
            </div>
          </div>
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