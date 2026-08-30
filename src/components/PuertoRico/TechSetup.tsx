"use client";

import React from "react";
import { Smartphone, Laptop, CheckCircle2, MonitorOff, Focus, Wifi, Sparkles, Tablet } from "lucide-react";

const APPS = [
  { name: "Duolingo", platform: "iOS & Windows", desc: "Casual, low-pressure Korean practice — a few minutes a day, no exam prep." },
  { name: "Anki", platform: "iOS & Windows", desc: "Spaced repetition for Japanese vocab using All In One Kanji & Kaishi 1.5k decks." },
  { name: "VS Code", platform: "Windows & macOS", desc: "Primary code editor. Extensions: Prettier, ESLint, Tailwind." },
  { name: "Udemy", platform: "iOS & Windows/macOS", desc: "Download courses offline for distraction-free study." },
  { name: "CapCut", platform: "iOS & Windows/macOS", desc: "Video editing for content creation." },
  { name: "Procreate", platform: "iPad Pro", desc: "The go-to digital art app once the iPad Pro arrives — perfect for the art hobby." },
  { name: "Better Leveling", platform: "Web", desc: "This app. Install as PWA to home screen." },
];

const IPHONE_SETUP = [
  "Delete TikTok, Instagram, Twitter, Facebook.",
  "Turn on 'Grayscale' in Accessibility (Triple-click power button to toggle).",
  "Set up 'Study Focus' mode: Only allow calls from family. Block all non-essential app notifications.",
  "Home Screen: Only Anki, Duolingo, Calendar, Notes, Udemy, and Better Leveling (PWA).",
  "No phone in bedroom after 9:30 PM."
];

const VIVOBOOK_SETUP = [
  "Create a dedicated 'Study' Windows account with no games or entertainment apps installed.",
  "Use Windows Focus Assist to block Reddit/YouTube during 90-min Pomodoro blocks.",
  "Organize Desktop: Clean desktop every Friday.",
  "Folder Structure: /Development, /Japanese, /GameDev, /Content, /Japanese_Docs.",
  "Keep Windows Terminal and VS Code pinned to the taskbar."
];

const MACBOOK_SETUP = [
  "Set up a dedicated dev environment: VS Code, Node/npm, Git, Docker (if needed) via Homebrew.",
  "Use macOS Focus modes to silence notifications during deep-work blocks.",
  "Mirror the same folder structure as the Vivobook: ~/Development, ~/Japanese, ~/GameDev, ~/Content, ~/Japanese_Docs.",
  "Set up Xcode Simulator or a browser dev-tools workflow for responsive testing.",
  "Migrate Anki, Duolingo, and Udemy progress over before retiring the Vivobook."
];

const IPAD_SETUP = [
  "Install Procreate as the primary digital art app for hobby practice.",
  "Use Apple Pencil + Split View to sketch while referencing tutorials or Udemy lessons.",
  "Set up Files app folders synced with the MacBook (iCloud Drive) for art and content assets.",
  "Use it as a lightweight content-creation device: quick edits, thumbnails, and planning on the go.",
  "Keep it distraction-free: no social apps, just Procreate, Udemy, Notes, and Better Leveling (PWA)."
];

export default function TechSetup() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="relative bg-gradient-to-br from-zinc-900/90 to-black/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/10 flex items-center justify-between shadow-2xl overflow-hidden group hover:border-white/20 transition-all duration-500">
        <div className="absolute top-0 right-0 w-48 h-48 bg-[#00f0ff]/10 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
        
        <div className="relative z-10">
          <h2 className="text-3xl font-black text-white flex items-center gap-3 mb-2 tracking-tighter">
            <div className="bg-[#00f0ff]/10 p-2 rounded-xl border border-[#00f0ff]/20 shadow-inner">
              <Focus className="w-7 h-7 text-[#00f0ff] drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]" />
            </div>
            Focus System
          </h2>
          <p className="text-sm text-zinc-400 font-medium ml-1 max-w-md">Optimizing your digital environment for the 10-year grind.</p>
        </div>
        <MonitorOff className="w-16 h-16 text-zinc-800 hidden sm:block relative z-10 group-hover:text-zinc-700 transition-colors" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        
        {/* iPhone Setup */}
        <div className="bg-[#11182c]/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl hover:border-white/20 transition-all duration-300">
          <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3 tracking-tight">
            <div className="bg-[#ce1126]/10 p-2 rounded-xl border border-[#ce1126]/20 shadow-inner">
              <Smartphone className="w-5 h-5 text-[#ce1126]" />
            </div>
            iPhone Minimalism <span className="text-xs text-zinc-500 font-medium">(Current)</span>
          </h3>
          <ul className="space-y-4">
            {IPHONE_SETUP.map((item, i) => (
              <li key={i} className="flex gap-4 items-start text-sm text-zinc-300 font-medium group">
                <CheckCircle2 className="w-5 h-5 text-[#ce1126] shrink-0 mt-0.5 drop-shadow-sm group-hover:scale-110 transition-transform" />
                <span className="leading-relaxed group-hover:text-white transition-colors">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Vivobook Setup */}
        <div className="bg-[#11182c]/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl hover:border-white/20 transition-all duration-300">
          <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3 tracking-tight">
            <div className="bg-[#f5a623]/10 p-2 rounded-xl border border-[#f5a623]/20 shadow-inner">
              <Laptop className="w-5 h-5 text-[#f5a623]" />
            </div>
            Vivobook Workspace <span className="text-xs text-zinc-500 font-medium">(Current)</span>
          </h3>
          <ul className="space-y-4">
            {VIVOBOOK_SETUP.map((item, i) => (
              <li key={i} className="flex gap-4 items-start text-sm text-zinc-300 font-medium group">
                <CheckCircle2 className="w-5 h-5 text-[#f5a623] shrink-0 mt-0.5 drop-shadow-sm group-hover:scale-110 transition-transform" />
                <span className="leading-relaxed group-hover:text-white transition-colors">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Future: MacBook Pro */}
        <div className="bg-[#11182c]/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl hover:border-white/20 transition-all duration-300">
          <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3 tracking-tight">
            <div className="bg-[#0a3d8f]/10 p-2 rounded-xl border border-[#0a3d8f]/20 shadow-inner">
              <Sparkles className="w-5 h-5 text-[#0a3d8f]" />
            </div>
            Future: MacBook Pro
          </h3>
          <ul className="space-y-4">
            {MACBOOK_SETUP.map((item, i) => (
              <li key={i} className="flex gap-4 items-start text-sm text-zinc-300 font-medium group">
                <CheckCircle2 className="w-5 h-5 text-[#0a3d8f] shrink-0 mt-0.5 drop-shadow-sm group-hover:scale-110 transition-transform" />
                <span className="leading-relaxed group-hover:text-white transition-colors">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Future: iPad Pro */}
        <div className="bg-[#11182c]/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl hover:border-white/20 transition-all duration-300">
          <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3 tracking-tight">
            <div className="bg-[#4ade80]/10 p-2 rounded-xl border border-[#4ade80]/20 shadow-inner">
              <Tablet className="w-5 h-5 text-[#4ade80]" />
            </div>
            Future: iPad Pro
          </h3>
          <ul className="space-y-4">
            {IPAD_SETUP.map((item, i) => (
              <li key={i} className="flex gap-4 items-start text-sm text-zinc-300 font-medium group">
                <CheckCircle2 className="w-5 h-5 text-[#4ade80] shrink-0 mt-0.5 drop-shadow-sm group-hover:scale-110 transition-transform" />
                <span className="leading-relaxed group-hover:text-white transition-colors">{item}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Apps list */}
      <div className="bg-[#11182c]/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
        <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3 tracking-tight">
          <div className="bg-[#4ade80]/10 p-2 rounded-xl border border-[#4ade80]/20 shadow-inner">
            <Wifi className="w-5 h-5 text-[#4ade80] drop-shadow-[0_0_6px_rgba(74,222,128,0.6)]" />
          </div>
          Essential Apps
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {APPS.map((app, i) => (
            <div key={i} className="group bg-black/30 border border-white/5 p-5 rounded-2xl flex items-start gap-4 hover:bg-white/5 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-black text-white text-base group-hover:text-[#f5a623] transition-colors">{app.name}</h4>
                  <span className="text-[10px] font-mono font-bold bg-white/10 px-2.5 py-1 rounded-md text-zinc-400 border border-white/5 uppercase tracking-wider shadow-inner">{app.platform}</span>
                </div>
                <p className="text-sm text-zinc-500 font-medium leading-relaxed group-hover:text-zinc-400 transition-colors">{app.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

