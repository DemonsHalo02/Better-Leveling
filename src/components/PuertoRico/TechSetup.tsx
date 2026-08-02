"use client";

import React from "react";
import { Smartphone, Laptop, CheckCircle2, MonitorOff, Focus, Wifi } from "lucide-react";

const APPS = [
  { name: "Anki", platform: "iOS & Mac", desc: "Spaced repetition for Spanish vocab & Cloud Certs." },
  { name: "VS Code", platform: "Mac", desc: "Primary code editor. Extensions: Prettier, ESLint, Tailwind." },
  { name: "Udemy", platform: "iOS & Mac", desc: "Download courses offline for distraction-free study." },
  { name: "CapCut", platform: "iOS & Mac", desc: "For phase 2 video editing skills." },
  { name: "Better Leveling", platform: "Web", desc: "This app. Install as PWA to home screen." },
];

const IPHONE_SETUP = [
  "Delete TikTok, Instagram, Twitter, Facebook.",
  "Turn on 'Grayscale' in Accessibility (Triple-click power button to toggle).",
  "Set up 'Study Focus' mode: Only allow calls from family. Block all non-essential app notifications.",
  "Home Screen: Only Anki, Calendar, Notes, Udemy, and Better Leveling (PWA).",
  "No phone in bedroom after 9:30 PM."
];

const MAC_SETUP = [
  "Create a dedicated 'Study' user account with no games or entertainment apps installed.",
  "Use 'SelfControl' app to block Reddit/YouTube during 90-min Pomodoro blocks.",
  "Organize Desktop: Clean desktop every Friday.",
  "Folder Structure: /Development, /CloudCerts, /Spanish, /Art.",
  "Keep terminal and VS Code pinned to dock."
];

export default function TechSetup() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-zinc-900 to-black rounded-2xl p-6 border border-white/10 flex items-center justify-between shadow-lg">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-2 mb-1">
            <Focus className="w-6 h-6 text-[#00f0ff]" /> Sistema de Enfoque
          </h2>
          <p className="text-sm text-zinc-400 font-mono">Optimizing your digital environment for the 10-year grind.</p>
        </div>
        <MonitorOff className="w-12 h-12 text-zinc-700 hidden sm:block" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        
        {/* iPhone Setup */}
        <div className="bg-[#11182c] border border-white/5 rounded-2xl p-6 shadow-md">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-[#ce1126]" /> iPhone Minimalism
          </h3>
          <ul className="space-y-3">
            {IPHONE_SETUP.map((item, i) => (
              <li key={i} className="flex gap-3 items-start text-sm text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-[#ce1126] shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Mac Setup */}
        <div className="bg-[#11182c] border border-white/5 rounded-2xl p-6 shadow-md">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Laptop className="w-5 h-5 text-[#0a3d8f]" /> MacBook Workspace
          </h3>
          <ul className="space-y-3">
            {MAC_SETUP.map((item, i) => (
              <li key={i} className="flex gap-3 items-start text-sm text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-[#0a3d8f] shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Apps list */}
      <div className="bg-[#11182c] border border-white/5 rounded-2xl p-6 shadow-md">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Wifi className="w-5 h-5 text-[#4ade80]" /> Aplicaciones Esenciales
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {APPS.map((app, i) => (
            <div key={i} className="bg-black/30 border border-white/5 p-4 rounded-xl flex items-start gap-4 hover:bg-white/5 transition-colors">
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-white text-sm">{app.name}</h4>
                  <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 rounded text-zinc-400">{app.platform}</span>
                </div>
                <p className="text-xs text-zinc-500">{app.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}