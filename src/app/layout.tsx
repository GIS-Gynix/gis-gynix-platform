import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Universally supported premium font configurations
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans", // Keeping the variable name so tailwind.config.ts doesn't break!
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono", // Keeping the variable name so tailwind.config.ts doesn't break!
});

export const metadata: Metadata = {
  title: "GIS Gynix | Enterprise WebGIS & Cloud Geospatial Engineering",
  description: "Global GIS Systems Engineering firm specializing in low-latency WebGIS platforms, premium zoning intelligence models, and automated remote sensing pipelines.",
  metadataBase: new URL("https://gisgynix.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
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