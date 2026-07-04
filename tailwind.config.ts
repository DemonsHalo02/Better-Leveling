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
          blue: "#00f0ff",
          cyan: "#00d4e0",
          dark: "#050811",
          panel: "#0a0f1d",
          card: "#11182c",
          purple: "#7000ff",
          gold: "#ffd700",
          red: "#ff3366",
          green: "#00ff88",
        },
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(0, 240, 255, 0.35)',
        'glow-purple': '0 0 20px rgba(112, 0, 255, 0.35)',
        'glow-gold': '0 0 20px rgba(255, 215, 0, 0.35)',
        'glow-green': '0 0 20px rgba(0, 255, 136, 0.35)',
        'hud': 'inset 0 0 15px rgba(0, 240, 255, 0.15), 0 0 20px rgba(0, 240, 255, 0.2)',
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
