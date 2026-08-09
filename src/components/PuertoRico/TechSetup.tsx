"use client";

import React from "react";
import { Smartphone, Laptop, CheckCircle2, MonitorOff, Focus, Wifi } from "lucide-react";

const APPS = [
  { name: "Naver Dictionary", platform: "Android", desc: "Best Korean-English dictionary. Superior to Google Translate for grammar and nuance." },
  { name: "Papago", platform: "Android", desc: "Naver's translation app — extremely accurate for Korean." },
  { name: "Anki", platform: "Windows & Android", desc: "Spaced repetition for Korean vocab & College terms." },
  { name: "VS Code", platform: "Windows", desc: "Primary code editor. Extensions: Prettier, ESLint, Tailwind, Figma." },
  { name: "Figma", platform: "Web & Windows", desc: "For UI/UX design and prototyping your web apps." },
  { name: "CapCut", platform: "Windows & Android", desc: "For your video editing and content creation." },
  { name: "Better Leveling", platform: "Web", desc: "This app. Install as PWA to home screen." },
];

const CURRENT_MOBILE_SETUP = [
  "S10 FE Home Screen: Only Anki, Papago, Naver Dictionary, Udemy, CapCut, and Better Leveling (PWA).",
  "Delete TikTok, Instagram (unless for posting your own content), Twitter.",
  "Enable Samsung's Digital Wellbeing 'Focus Mode' during 90-min Pomodoro blocks.",
  "No phone in bedroom after 9:30 PM."
];

const CURRENT_PC_SETUP = [
  "Vivobook: Create a dedicated 'Study/Dev' Windows account with no games installed.",
  "Use Windows Focus Assist to block Reddit/YouTube during study blocks.",
  "Folder Structure: /Development, /Korean, /Art, /College.",
  "Keep Windows Terminal, VS Code, and Figma pinned to the taskbar."
];

const FUTURE_ECOSYSTEM_SETUP = [
  "Galaxy Book Pro: Use as your primary workstation. It's incredibly thin and light for carrying around college and cafes.",
  "Z Flip 8: Leverage 'Flex Mode' as a built-in tripod for your vlogging and content creation.",
  "Quick Share & Multi Control: Seamlessly drag and drop files (like video clips) between the Z Flip 8 and the Galaxy Book Pro.",
  "Set both devices to Korean as a secondary system language for passive immersion.",
  "Migrate all 2FA, banking, Anki data, and local files before retiring the Vivobook and S10 FE."
];

export default function TechSetup() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="relative bg-gradient-to-br from-zinc-900/90 to-black/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/10 flex items-center justify-between shadow-2xl overflow-hidden group hover:border-white/20 transition-all duration-500">
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
        
        <div className="relative z-10">
          <h2 className="text-3xl font-black text-white flex items-center gap-3 mb-2 tracking-tighter">
            <div className="bg-indigo-500/10 p-2 rounded-xl border border-indigo-500/20 shadow-inner">
              <Focus className="w-7 h-7 text-indigo-400 drop-shadow-[0_0_8px_rgba(129,140,248,0.6)]" />
            </div>
            Tech Ecosystem
          </h2>
          <p className="text-sm text-zinc-400 font-medium ml-1 max-w-md">Optimizing your digital environment for college, development, and content creation.</p>
        </div>
        <MonitorOff className="w-16 h-16 text-zinc-800 hidden sm:block relative z-10 group-hover:text-zinc-700 transition-colors" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        
        {/* Current S10 FE Setup */}
        <div className="bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl hover:border-indigo-500/30 transition-all duration-300">
          <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3 tracking-tight">
            <div className="bg-indigo-500/10 p-2 rounded-xl border border-indigo-500/20 shadow-inner">
              <Smartphone className="w-5 h-5 text-indigo-400" />
            </div>
            Current: S10 FE
          </h3>
          <ul className="space-y-4">
            {CURRENT_MOBILE_SETUP.map((item, i) => (
              <li key={i} className="flex gap-4 items-start text-sm text-zinc-300 font-medium group">
                <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5 drop-shadow-sm group-hover:scale-110 transition-transform" />
                <span className="leading-relaxed group-hover:text-white transition-colors">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Current Vivobook Setup */}
        <div className="bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl hover:border-indigo-500/30 transition-all duration-300">
          <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3 tracking-tight">
            <div className="bg-indigo-500/10 p-2 rounded-xl border border-indigo-500/20 shadow-inner">
              <Laptop className="w-5 h-5 text-indigo-400" />
            </div>
            Current: Vivobook
          </h3>
          <ul className="space-y-4">
            {CURRENT_PC_SETUP.map((item, i) => (
              <li key={i} className="flex gap-4 items-start text-sm text-zinc-300 font-medium group">
                <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5 drop-shadow-sm group-hover:scale-110 transition-transform" />
                <span className="leading-relaxed group-hover:text-white transition-colors">{item}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Future Setup */}
      <div className="bg-indigo-900/10 backdrop-blur-md border border-indigo-500/30 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        <h3 className="text-2xl font-black text-indigo-300 mb-2 flex items-center gap-3 tracking-tight relative z-10">
          <Laptop className="w-6 h-6" /> Future Upgrade: Samsung Ecosystem
        </h3>
        <p className="text-zinc-400 text-sm mb-6 font-bold relative z-10">Galaxy Book Pro + Z Flip 8</p>
        
        <ul className="space-y-4 relative z-10">
          {FUTURE_ECOSYSTEM_SETUP.map((info, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-zinc-200 font-medium">
              <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5 drop-shadow-sm" />
              <span>{info}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Apps list */}
      <div className="bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
        <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3 tracking-tight">
          <div className="bg-purple-500/10 p-2 rounded-xl border border-purple-500/20 shadow-inner">
            <Wifi className="w-5 h-5 text-purple-400 drop-shadow-[0_0_6px_rgba(168,85,247,0.6)]" />
          </div>
          Essential Apps
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {APPS.map((app, i) => (
            <div key={i} className="group bg-black/30 border border-white/5 p-5 rounded-2xl flex items-start gap-4 hover:bg-white/5 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-black text-white text-base group-hover:text-indigo-400 transition-colors">{app.name}</h4>
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