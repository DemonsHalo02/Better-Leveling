import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-outfit)", "sans-serif"],
        mono: ["var(--font-chakra)", "monospace"],
        display: ["var(--font-chakra)", "sans-serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        system: {
          blue: "#0bc2b6", // FF7 Mako Teal / Cyan
          cyan: "#3affc6", // Lifestream Green
          dark: "#0b0c10", // Deep UI slate
          panel: "#161925", // Shinra UI background
          card: "#1e2233", // Lighter UI background
          purple: "#d942ff", // Aether/Materia Purple
          gold: "#e6c76e", // FFXIV Classic UI Gold
          red: "#ff3b3b", // Meteor Red
          green: "#00ff88",
        },
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(11, 194, 182, 0.35)',
        'glow-purple': '0 0 20px rgba(217, 66, 255, 0.35)',
        'glow-gold': '0 0 20px rgba(230, 199, 110, 0.35)',
        'glow-green': '0 0 20px rgba(58, 255, 198, 0.35)',
        'hud': 'inset 0 0 15px rgba(11, 194, 182, 0.15), 0 0 20px rgba(11, 194, 182, 0.2)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '1', filter: 'drop-shadow(0 0 8px rgba(0, 240, 255, 0.6))' },
          '50%': { opacity: '0.7', filter: 'drop-shadow(0 0 2px rgba(0, 240, 255, 0.2))' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
