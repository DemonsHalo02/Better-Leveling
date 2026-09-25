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
          blue: "#00f0ff", // FF7 Mako Cyan
          cyan: "#00ffb3", // Lifestream Teal
          dark: "#02060d", // Very deep slate (almost black)
          panel: "#061324", // Shinra translucent menu blue
          card: "#0d213b", // Lighter menu highlight
          purple: "#b700ff", // Materia Purple
          gold: "#f5d36c", // FF Menu Yellow/Gold
          red: "#ff2a2a", // Limit Break Red
          green: "#00ff66", // HP Green
        },
      },
      boxShadow: {
        'glow-blue': '0 0 15px rgba(0, 240, 255, 0.4), inset 0 0 10px rgba(0, 240, 255, 0.1)',
        'glow-purple': '0 0 15px rgba(183, 0, 255, 0.4), inset 0 0 10px rgba(183, 0, 255, 0.1)',
        'glow-gold': '0 0 15px rgba(245, 211, 108, 0.4), inset 0 0 10px rgba(245, 211, 108, 0.1)',
        'glow-green': '0 0 15px rgba(0, 255, 102, 0.4), inset 0 0 10px rgba(0, 255, 102, 0.1)',
        'hud': 'inset 0 0 25px rgba(0, 240, 255, 0.1), 0 0 20px rgba(0, 240, 255, 0.15)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
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
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        }
      },
    },
  },
  plugins: [],
};
export default config;
