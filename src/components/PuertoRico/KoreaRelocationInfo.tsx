"use client";

import React from "react";
import { Map, Sun, Shield, Heart, CheckCircle2, Navigation, Coffee, GraduationCap } from "lucide-react";

const WHY_KOREA = [
  { icon: GraduationCap, title: "Post-College Advantage", desc: "A US degree gives you a huge advantage for the E-7 professional work visa in Korea, especially in IT/Tech." },
  { icon: Shield, title: "Tech Hub", desc: "Seoul is a massive tech hub. Your Full-Stack Java + Next.js stack is exactly what the enterprise market demands." },
  { icon: Heart, title: "Creator Scene", desc: "The content creation, vlogging, and art scene is massive. Perfect environment for your Z Flip 8 setup." },
  { icon: Navigation, title: "Accessibility", desc: "World-class public transit. Subways and KTX trains run everywhere. No car needed." }
];

const SEOUL_INFO = [
  "Major tech districts like Pangyo (the 'Silicon Valley' of Korea) and Gangnam.",
  "Fastest internet in the world, perfect for uploading content and remote dev work.",
  "Vibrant cafe culture for working and studying.",
  "Excellent healthcare (National Health Insurance).",
  "High demand for bilingual (English/Korean) developers."
];

const CHECKLIST = [
  "Save $35,000 (Moving costs + safety net)",
  "Complete HiSET and graduate from College in the US",
  "Build a strong Web Dev portfolio (Next.js & Spring Boot)",
  "Achieve TOPIK Level 4+ Certification",
  "Hit 160 lbs (Health & Fitness prime)",
  "Visit Korea for a 2-week scouting trip",
  "Start applying for jobs (E-7 Visa sponsorship)",
  "Downsize belongings to fit in 2 suitcases"
];

export default function KoreaRelocationInfo() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="relative rounded-3xl overflow-hidden bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 shadow-2xl min-h-[220px] flex items-center group transition-all duration-500 hover:border-white/20">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/30 via-purple-900/20 to-transparent" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl opacity-50 -mr-20 -mt-20 group-hover:opacity-80 transition-opacity duration-700" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl opacity-50 -ml-10 -mb-10 group-hover:opacity-80 transition-opacity duration-700" />
        
        <div className="relative z-10 p-8 sm:p-10">
          <div className="flex items-center gap-4 mb-3">
            <div className="bg-indigo-500/20 p-3 rounded-2xl border border-indigo-500/30 shadow-lg backdrop-blur-sm">
              <Map className="w-8 h-8 text-indigo-400 drop-shadow-[0_0_8px_rgba(129,140,248,0.6)]" />
            </div>
            <h2 className="text-4xl font-black text-white tracking-tighter drop-shadow-md">Korea</h2>
          </div>
          <p className="text-purple-400 font-mono font-black tracking-[0.3em] text-sm uppercase drop-shadow-sm ml-1">대한민국 — Post-College Relocation</p>
          <p className="text-zinc-300 mt-5 max-w-lg text-base leading-relaxed font-medium">Target: After College. Degree in hand, a strong Full-Stack portfolio, TOPIK fluency, and $35K saved. Ready to secure an E-7 visa and thrive in Seoul's tech and creator scene.</p>
        </div>
      </div>

      {/* Why Korea Grid */}
      <div>
        <h3 className="text-2xl font-black text-white mb-6 tracking-tight flex items-center gap-2">
          <span className="text-indigo-400">Why</span> Korea?
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {WHY_KOREA.map((item, i) => (
            <div key={i} className="group bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 p-5 rounded-2xl flex items-start gap-5 hover:border-indigo-500/50 hover:bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)] shadow-lg">
              <div className="bg-indigo-500/10 p-3 rounded-xl border border-indigo-500/20 text-indigo-400 group-hover:bg-indigo-500/20 group-hover:scale-110 transition-all duration-300 shadow-inner">
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
        {/* Seoul Recommendations */}
        <div className="bg-purple-900/10 backdrop-blur-md border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <h3 className="text-2xl font-black text-purple-300 mb-2 flex items-center gap-3 tracking-tight relative z-10">
            <Map className="w-6 h-6" /> Seoul <span className="text-sm text-zinc-400 font-medium">(Recommended)</span>
          </h3>
          <p className="text-zinc-400 text-sm mb-6 font-bold relative z-10">The Tech & Creator Capital</p>
          
          <ul className="space-y-4 relative z-10">
            {SEOUL_INFO.map((info, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-zinc-200 font-medium">
                <CheckCircle2 className="w-5 h-5 text-purple-400 shrink-0 mt-0.5 drop-shadow-sm" />
                <span>{info}</span>
              </li>
            ))}
          </ul>
          
          <div className="mt-8 pt-6 border-t border-purple-500/20 relative z-10">
            <h4 className="font-mono text-[10px] text-zinc-400 uppercase mb-2 font-bold tracking-widest">Rent Estimate (Seoul)</h4>
            <div className="text-3xl font-black text-white drop-shadow-sm">$500 - $900<span className="text-sm text-zinc-500 font-medium ml-1">/ month</span></div>
            <p className="text-xs text-zinc-400 mt-2 font-medium leading-relaxed">For a 1-room officetel via wolse (monthly rent + deposit).</p>
          </div>
        </div>

        {/* Relocation Checklist */}
        <div className="bg-[#0a0a0a]/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
          <h3 className="text-2xl font-black text-white mb-6 tracking-tight">Master Checklist</h3>
          <div className="space-y-4">
            {CHECKLIST.map((task, i) => (
              <div key={i} className="flex gap-4 items-start group cursor-pointer">
                <div className="w-6 h-6 rounded-lg border-2 border-white/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:border-indigo-400 group-hover:bg-indigo-500/10 transition-all duration-300 shadow-inner">
                  <div className="w-3 h-3 rounded-sm bg-transparent" />
                </div>
                <span className="text-sm text-zinc-300 font-medium group-hover:text-white transition-colors duration-300">{task}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Mini Culture Guide */}
      <div className="bg-gradient-to-br from-black/80 to-[#0a0a0a]/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl opacity-50" />
        
        <h3 className="font-black text-xl text-white mb-6 flex items-center gap-3 tracking-tight relative z-10">
          <Coffee className="w-6 h-6 text-indigo-400 drop-shadow-[0_0_8px_rgba(129,140,248,0.6)]" /> Quick Culture Guide
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
          <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl text-center border border-white/5 hover:border-white/15 transition-all duration-300 hover:-translate-y-1 shadow-inner">
            <div className="text-xs font-mono font-bold text-zinc-500 mb-2 uppercase tracking-widest">Greeting</div>
            <div className="font-black text-white text-sm">&quot;Annyeonghaseyo&quot;</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl text-center border border-white/5 hover:border-white/15 transition-all duration-300 hover:-translate-y-1 shadow-inner">
            <div className="text-xs font-mono font-bold text-zinc-500 mb-2 uppercase tracking-widest">Pace</div>
            <div className="font-black text-white text-sm">Ppalli Ppalli (Fast)</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl text-center border border-white/5 hover:border-white/15 transition-all duration-300 hover:-translate-y-1 shadow-inner">
            <div className="text-xs font-mono font-bold text-zinc-500 mb-2 uppercase tracking-widest">Drink</div>
            <div className="font-black text-white text-sm">Iced Americano</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl text-center border border-white/5 hover:border-white/15 transition-all duration-300 hover:-translate-y-1 shadow-inner">
            <div className="text-xs font-mono font-bold text-zinc-500 mb-2 uppercase tracking-widest">Language</div>
            <div className="font-black text-white text-sm">Honorifics Matter</div>
          </div>
        </div>
      </div>

    </div>
  );
}