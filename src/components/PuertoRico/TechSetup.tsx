"use client";

import React from "react";
import { Smartphone, Laptop, CheckCircle2, MonitorOff, Focus, Wifi } from "lucide-react";

const APPS = [
  { name: "Anki", platform: "iPhone / Samsung", desc: "Spaced repetition for Korean vocab and study goals." },
  { name: "VS Code", platform: "Windows / Web", desc: "Primary code editor. Extensions: Prettier, ESLint, Tailwind." },
  { name: "Microsoft Learn / Keehwan Kim Course", platform: "iPhone / Web", desc: "Download study material offline for focus blocks." },
  { name: "CapCut", platform: "iPhone / Samsung", desc: "For video editing skills and content practice." },
  { name: "Better Leveling", platform: "Web", desc: "This app. Install as a PWA to your home screen." },
];

const IPHONE_SETUP = [
  "Home screen layout: first page = Anki, Calendar, Notes, Microsoft Learn, Better Leveling, and Phone; keep Instagram, YouTube, TikTok, and X in one 'Social' folder on the second page.",
  "Turn on Focus mode with a study block schedule. Allow calls from family only during work hours, and block socials outside the approved window.",
  "Enable Screen Time and set app limits for Instagram, YouTube, TikTok, and X so they stay useful instead of distracting.",
  "Keep Messages, Camera, and Safari available, but avoid putting entertainment apps on the first page of the home screen.",
  "Back up notes, photos, and study files to iCloud, and keep the phone out of the bedroom after 10:30 PM.",
  "Use a simple wallpaper and minimal widgets so the phone feels calm, fast, and focused on your goals."
];

const TAB_SETUP = [
  "Use the Galaxy Tab S10 FE as your main study, note-taking, and digital art hub. Keep it clean and purpose-driven.",
  "Create three folders on the tablet: /Study, /Art, /Planning. Put Samsung Notes, OneNote, AnkiDroid, Microsoft Learn, and your course apps inside /Study.",
  "Put Clip Studio Paint, ibisPaint, and your sketch/reference apps inside /Art. Put Calendar, To Do, and your planning notes inside /Planning.",
  "Use Samsung Notes for class notes and Korean vocab, and keep one notebook for each subject or goal. Use the S Pen for handwritten notes and sketching.",
  "Set the dock to your most-used tools: Samsung Notes, Clip Studio Paint, Browser, Calendar, and Files. Keep entertainment apps off the dock.",
  "Use split-screen for studying while taking notes, and enable cloud sync so your work follows you between the tablet, phone, and laptop."
];

const Z_FLIP_8_SETUP = [
  "When the Galaxy Z Flip 8 arrives in December, use the same structure: Focus mode, short work blocks, and controlled social limits instead of full removal.",
  "Set the cover screen to show Calendar, reminders, Anki, and the weather so it stays useful without pulling you into distractions.",
  "Use Samsung Focus Mode and Routines to mirror the iPhone setup and protect your study hours.",
  "Keep the home screen minimal: first page for study tools, second page for social apps in one folder, and the dock for your top apps only.",
  "Migrate notes, calendar, photos, and study files with Smart Switch, Google, or OneDrive so the transition is smooth."
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
            Tech Setup Plan
          </h2>
          <p className="text-sm text-zinc-400 font-medium ml-1 max-w-md">Use this as your iPhone setup now and your Galaxy Z Flip 8 setup when it arrives in December.</p>
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
            iPhone Setup Checklist
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

        {/* Galaxy Tab S10 FE Setup */}
        <div className="bg-[#11182c]/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl hover:border-white/20 transition-all duration-300">
          <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3 tracking-tight">
            <div className="bg-[#0a3d8f]/10 p-2 rounded-xl border border-[#0a3d8f]/20 shadow-inner">
              <Laptop className="w-5 h-5 text-[#0a3d8f]" />
            </div>
            Galaxy Tab S10 FE Setup Checklist
          </h3>
          <ul className="space-y-4">
            {TAB_SETUP.map((item, i) => (
              <li key={i} className="flex gap-4 items-start text-sm text-zinc-300 font-medium group">
                <CheckCircle2 className="w-5 h-5 text-[#0a3d8f] shrink-0 mt-0.5 drop-shadow-sm group-hover:scale-110 transition-transform" />
                <span className="leading-relaxed group-hover:text-white transition-colors">{item}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      <div className="bg-[#11182c]/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl hover:border-white/20 transition-all duration-300">
        <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3 tracking-tight">
          <div className="bg-[#4ade80]/10 p-2 rounded-xl border border-[#4ade80]/20 shadow-inner">
            <Smartphone className="w-5 h-5 text-[#4ade80]" />
          </div>
          Galaxy Z Flip 8 Setup Checklist
        </h3>
        <ul className="space-y-4">
          {Z_FLIP_8_SETUP.map((item, i) => (
            <li key={i} className="flex gap-4 items-start text-sm text-zinc-300 font-medium group">
              <CheckCircle2 className="w-5 h-5 text-[#4ade80] shrink-0 mt-0.5 drop-shadow-sm group-hover:scale-110 transition-transform" />
              <span className="leading-relaxed group-hover:text-white transition-colors">{item}</span>
            </li>
          ))}
        </ul>
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