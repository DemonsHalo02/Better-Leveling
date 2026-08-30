"use client";

import React from "react";
import { Compass, Sun, Shield, Heart, CheckCircle2, Navigation, Coffee } from "lucide-react";

const WHY_PR = [
  { icon: Sun, title: "Game Development", desc: "A flexible, in-demand skill set that works whether you land a job or go freelance — and it's the foundation everything else builds on." },
  { icon: Shield, title: "Content Creation", desc: "Documenting the coding + art journey builds a portfolio and an audience at the same time. Low pressure, mixed format — whatever's fun that week." },
  { icon: Heart, title: "Filmmaking & Game Dev", desc: "Learning iPhone Filmmaking, Final Cut Pro X, and Digital Art to create high-quality content and build a freelance creative skill set as personal hobbies." },
  { icon: Navigation, title: "Japanese Language", desc: "Learning Japanese to translate Roblox games, understand J-Pop, and watch Anime without subtitles." }
];

const CAGUAS_INFO = [
  "Freelance: faster to start, more control over schedule, income is inconsistent at first.",
  "Full-time job: steadier income and benefits, but less flexible schedule.",
  "Either path benefits from the same portfolio — build projects that show off real skills.",
  "Apply to both simultaneously once the portfolio is ready; take whichever comes first.",
  "Content creation can feed either path — a following makes freelance clients easier to find, and a strong GitHub/portfolio helps job applications either way."
];

const CHECKLIST = [
  "Finish all courses (Game Dev, Art, Content Creation, Japanese) by April 2, 2027",
  "Build 3-5 portfolio-worthy game dev projects",
  "Set up a GitHub, portfolio site, and (if going freelance) an Upwork/Fiverr profile",
  "Launch a content channel once there's real progress to show",
  "Practice Roblox development and filmmaking consistently",
  "Learn enough Japanese to understand Anime and J-Pop",
  "Save $15,000 toward a MacBook Pro + iPad Pro + emergency fund",
  "Hit 160 lbs (Health & Fitness prime)"
];

export default function PuertoRicoInfo() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="relative rounded-3xl overflow-hidden bg-[#11182c]/80 backdrop-blur-md border border-white/10 shadow-2xl min-h-[220px] flex items-center group transition-all duration-500 hover:border-white/20">
        <div className="absolute inset-0 bg-gradient-to-r from-[#ce1126]/30 via-[#0a3d8f]/20 to-transparent" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#ce1126]/10 rounded-full blur-3xl opacity-50 -mr-20 -mt-20 group-hover:opacity-80 transition-opacity duration-700" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#0a3d8f]/10 rounded-full blur-3xl opacity-50 -ml-10 -mb-10 group-hover:opacity-80 transition-opacity duration-700" />
        
        <div className="relative z-10 p-8 sm:p-10">
          <div className="flex items-center gap-4 mb-3">
            <div className="bg-[#ce1126]/20 p-3 rounded-2xl border border-[#ce1126]/30 shadow-lg backdrop-blur-sm">
              <Compass className="w-8 h-8 text-[#ce1126] drop-shadow-[0_0_8px_rgba(206,17,38,0.6)]" />
            </div>
            <h2 className="text-4xl font-black text-white tracking-tighter drop-shadow-md">Future Plan</h2>
          </div>
          <p className="text-[#f5a623] font-mono font-black tracking-[0.3em] text-sm uppercase drop-shadow-sm ml-1">10-Year Master Plan</p>
          <p className="text-zinc-300 mt-5 max-w-lg text-base leading-relaxed font-medium">Staying in the USA to build a game dev dev and freelance career. Learning Japanese to understand J-Pop and Anime, and practicing Roblox development and filmmaking as creative hobbies.</p>
        </div>
      </div>

      {/* Why Grid */}
      <div>
        <h3 className="text-2xl font-black text-white mb-6 tracking-tight flex items-center gap-2">
          <span className="text-[#ce1126]">Why</span> These Goals?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {WHY_PR.map((item, i) => (
            <div key={i} className="group bg-[#11182c]/80 backdrop-blur-md border border-white/10 p-5 rounded-2xl flex items-start gap-5 hover:border-white/20 hover:bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl shadow-lg">
              <div className="bg-[#ce1126]/10 p-3 rounded-xl border border-[#ce1126]/20 text-[#ce1126] group-hover:bg-[#ce1126]/20 group-hover:scale-110 transition-all duration-300 shadow-inner">
                <item.icon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-black text-base mb-1.5 tracking-tight">{item.title}</h4>
                <p className="text-zinc-400 text-sm leading-relaxed font-medium">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Career Path Notes */}
        <div className="bg-[#0a3d8f]/10 backdrop-blur-md border border-[#0a3d8f]/30 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#0a3d8f]/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <h3 className="text-2xl font-black text-[#0a3d8f] mb-2 flex items-center gap-3 tracking-tight relative z-10">
            <Compass className="w-6 h-6" /> Job vs. Freelance <span className="text-sm text-zinc-400 font-medium">(Open to Both)</span>
          </h3>
          <p className="text-zinc-400 text-sm mb-6 font-bold relative z-10">Whichever Pays Better or Comes First Wins</p>
          
          <ul className="space-y-4 relative z-10">
            {CAGUAS_INFO.map((info, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-zinc-200 font-medium">
                <CheckCircle2 className="w-5 h-5 text-[#0a3d8f] shrink-0 mt-0.5 drop-shadow-sm" />
                <span>{info}</span>
              </li>
            ))}
          </ul>
          
          <div className="mt-8 pt-6 border-t border-[#0a3d8f]/20 relative z-10">
            <h4 className="font-mono text-[10px] text-zinc-400 uppercase mb-2 font-bold tracking-widest">Tech Upgrade Budget</h4>
            <div className="text-3xl font-black text-white drop-shadow-sm">$2.5K - $4K<span className="text-sm text-zinc-500 font-medium ml-1"> total</span></div>
            <p className="text-xs text-zinc-400 mt-2 font-medium leading-relaxed">MacBook Pro + iPad Pro for dev work, art, and content editing.</p>
          </div>
        </div>

        {/* Goals Checklist */}
        <div className="bg-[#11182c]/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
          <h3 className="text-2xl font-black text-white mb-6 tracking-tight">Goals Checklist</h3>
          <div className="space-y-4">
            {CHECKLIST.map((task, i) => (
              <div key={i} className="flex gap-4 items-start group cursor-pointer">
                <div className="w-6 h-6 rounded-lg border-2 border-white/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:border-[#f5a623] group-hover:bg-[#f5a623]/10 transition-all duration-300 shadow-inner">
                  <div className="w-3 h-3 rounded-sm bg-transparent" />
                </div>
                <span className="text-sm text-zinc-300 font-medium group-hover:text-white transition-colors duration-300">{task}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Quick Reference */}
      <div className="bg-gradient-to-br from-black/80 to-[#11182c]/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#f5a623]/10 rounded-full blur-3xl opacity-50" />
        
        <h3 className="font-black text-xl text-white mb-6 flex items-center gap-3 tracking-tight relative z-10">
          <Coffee className="w-6 h-6 text-[#f5a623] drop-shadow-[0_0_8px_rgba(245,166,35,0.6)]" /> Quick Reference
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
          <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl text-center border border-white/5 hover:border-white/15 transition-all duration-300 hover:-translate-y-1 shadow-inner">
            <div className="text-xs font-mono font-bold text-zinc-500 mb-2 uppercase tracking-widest">Stack</div>
            <div className="font-black text-white text-sm">Next.js + React</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl text-center border border-white/5 hover:border-white/15 transition-all duration-300 hover:-translate-y-1 shadow-inner">
            <div className="text-xs font-mono font-bold text-zinc-500 mb-2 uppercase tracking-widest">Japanese</div>
            <div className="font-black text-white text-sm">JLPT Goal</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl text-center border border-white/5 hover:border-white/15 transition-all duration-300 hover:-translate-y-1 shadow-inner">
            <div className="text-xs font-mono font-bold text-zinc-500 mb-2 uppercase tracking-widest">Hobbies</div>
            <div className="font-black text-white text-sm">Game Dev & Content Creation</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl text-center border border-white/5 hover:border-white/15 transition-all duration-300 hover:-translate-y-1 shadow-inner">
            <div className="text-xs font-mono font-bold text-zinc-500 mb-2 uppercase tracking-widest">Content</div>
            <div className="font-black text-white text-sm">Mixed / Flexible</div>
          </div>
        </div>
      </div>

    </div>
  );
}
