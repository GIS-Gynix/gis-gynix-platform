import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Universally supported premium font configurations
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: {
    default: "GIS Gynix | Enterprise WebGIS, Cloud Geospatial & Zoning Services",
    template: "%s | GIS Gynix",
  },
  description: "Global GIS Systems Engineering firm specializing in low-latency WebGIS platforms, premium zoning intelligence models, and automated remote sensing pipelines and free GIS data portals.",
  keywords: [
    "GIS & RS Services",
    "GIS",
    "Remote Sensing",
    "Pakistan Free GIS Data",
    "Pakistan Road Network Data",
    "WebGIS Development",
    "Zoning Services",
    "Real Estate Services",
    "Zoning Mapping Of USA(United States of America), Canada, Australia",
    "Free GIS Data",
    "PostGIS",
    "Node.JS",
    "GeoServer",
    "Geo Node",
    "Spatial Intelligence",
    "Spatial Analysis",
    "Parcel Mapping",
  ],
  metadataBase: new URL("https://gis-gynix-platform.vercel.app"),
  openGraph: {
    title: "GIS Gynix | Spatial Intelligence & WebGIS Solutions",
    description: "WebGIS applications, zoning intelligence, and spatial data streaming.",
    url: "https://gis-gynix-platform.vercel.app",
    siteName: "GIS Gynix",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "GIS Gynix",
    "url": "https://gis-gynix-platform.vercel.app",
    "description": "GIS & Remote Sensing agency providing WebGIS development, zoning intelligence, and spatial analytics.",
    "knowsAbout": [
      "Geographic Information Systems",
      "WebGIS Development",
      "Zoning Services",
      "Free GIS Data",
      "PostGIS",
      "Mapbox GL",
      "Remote Sensing"
    ]
  };

  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased min-h-screen flex flex-col bg-slate-50 dark:bg-brand-dark transition-colors duration-300`}>
        <ThemeProvider>
          <Navbar />
          <main className="flex-grow pt-20">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}