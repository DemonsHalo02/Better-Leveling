import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        system: {
          blue: "#00f0ff",
          cyan: "#00d4e0",
          dark: "#080c14",
          panel: "#0f1626",
          card: "#141c30",
          purple: "#7000ff",
          gold: "#ffd700",
          red: "#ff3366",
          green: "#00ff88",
        },
      },
      boxShadow: {
        'glow-blue': '0 0 15px rgba(0, 240, 255, 0.4)',
        'glow-purple': '0 0 15px rgba(112, 0, 255, 0.4)',
        'glow-gold': '0 0 15px rgba(255, 215, 0, 0.4)',
        'glow-green': '0 0 15px rgba(0, 255, 136, 0.4)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '1', filter: 'drop-shadow(0 0 8px rgba(0, 240, 255, 0.6))' },
          '50%': { opacity: '0.7', filter: 'drop-shadow(0 0 2px rgba(0, 240, 255, 0.2))' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
