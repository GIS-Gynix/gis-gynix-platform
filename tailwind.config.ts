import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#030712",
          surface: "#0B1329",
          muted: "#1C2541",
          emerald: "#00F5D4",
          cyan: "#01B4E4",
          accent: "#3A86FF",
        },
      },
      fontFamily: {
        // Enforces your global font configs universally across all tailwind components
        sans: ["var(--font-geist-sans)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      backgroundImage: {
        "radial-grid": "radial-gradient(rgba(1, 180, 244, 0.1) 1px, transparent 1px)",
        "gradient-spatial": "linear-gradient(to right, #00F5D4, #01B4E4, #3A86FF)",
      },
      backgroundSize: {
        "grid-size": "24px 24px",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow-spatial": "glow 6s infinite alternate",
      },
      keyframes: {
        glow: {
          "0%": { boxShadow: "0 0 15px rgba(0, 245, 212, 0.2)" },
          "100%": { boxShadow: "0 0 35px rgba(1, 180, 228, 0.6)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;