"use client";

import React from "react";
import { Map, Sun, Shield, Heart, CheckCircle2, Navigation, Coffee } from "lucide-react";

const WHY_PR = [
<<<<<<< HEAD
  { icon: Sun, title: "The Culture", desc: "Safety, cleanliness, and craftsmanship. A total change from Lewiston winters." },
  { icon: Shield, title: "Vocational Path", desc: "Japan's senmon gakko (vocational schools) offer focused, hands-on IT training with strong job placement into dev roles." },
  { icon: Heart, title: "Language & People", desc: "Disciplined, respectful, detail-oriented culture. Deep history and modern innovation side by side." },
  { icon: Navigation, title: "Accessibility", desc: "World-class public transit. No car needed once settled — trains and buses run everywhere." }
];

const CAGUAS_INFO = [
  "Mid-size city with lower rent than Tokyo/Osaka centers.",
  "Lower cost of living compared to major metro areas.",
  "Good clinics/hospitals and full national health insurance coverage.",
  "Quieter pace than the big cities, easier to focus on school.",
  "Still close enough to a major city hub for extra part-time work."
];

const CHECKLIST = [
  "Save $40,000 (Senmon gakko tuition + JLPT/cert fees + moving costs)",
  "Complete HiSET and get a stable job",
  "Achieve JLPT N2 Certification (minimum admission requirement for senmon gakko)",
  "Research IT-focused senmon gakko programs with a Full-Stack Web Development track",
  "Secure Student Visa (COE) for chosen senmon gakko",
  "Hit 160 lbs (Health & Fitness prime)",
  "Visit Japan for a 2-week scouting trip (2030)",
  "Downsize belongings in Lewiston",
  "Research senmon gakko costs (~¥900K-1.5M/year), dorms, and part-time work (arubaito) rules on a student visa"
=======
  { icon: Sun, title: "The Climate", desc: "Tropical year-round. No more Lewiston winters." },
  { icon: Shield, title: "Comfort & Convenience", desc: "US Territory. No passport needed, uses USD, USPS/Amazon works." },
  { icon: Heart, title: "Culture & People", desc: "Warm, vibrant, family-oriented culture. Rich history." },
  { icon: Navigation, title: "Accessibility", desc: "Short flight to East Coast. Same time zone (AST/EST)." }
];

const CAGUAS_INFO = [
  "Inland city, ~30 mins from San Juan.",
  "Lower cost of living & rent compared to the coast.",
  "Great medical facilities (HIMA San Pablo).",
  "Cooler at night than San Juan.",
  "Less touristy, more authentic local feel."
];

const CHECKLIST = [
  "Save $35,000 (Safety net + moving costs)",
  "Achieve DELE B2 Spanish Certification",
  "Secure 100% Remote Tech Income",
  "Hit 160 lbs (Health & Fitness prime)",
  "Visit PR for a 2-week scouting trip (2030)",
  "Downsize belongings in Lewiston",
  "Research tax implications (Act 60 optional for W2)",
  "Ship car via Jacksonville or buy local"
>>>>>>> parent of 99b8023 (Convert relocation plan theme from Japan to Korea)
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
              <Map className="w-8 h-8 text-[#ce1126] drop-shadow-[0_0_8px_rgba(206,17,38,0.6)]" />
            </div>
<<<<<<< HEAD
            <h2 className="text-4xl font-black text-white tracking-tighter drop-shadow-md">Japan</h2>
          </div>
          <p className="text-[#f5a623] font-mono font-black tracking-[0.3em] text-sm uppercase drop-shadow-sm ml-1">日本 — Vocational School Bound</p>
          <p className="text-zinc-300 mt-5 max-w-lg text-base leading-relaxed font-medium">Target: April 2031. HiSET, a stable job, JLPT fluency, and $40K saved for a Full-Stack Development senmon gakko — the culmination of 10 years of study, saving, and physical transformation.</p>
=======
            <h2 className="text-4xl font-black text-white tracking-tighter drop-shadow-md">Puerto Rico</h2>
          </div>
          <p className="text-[#f5a623] font-mono font-black tracking-[0.3em] text-sm uppercase drop-shadow-sm ml-1">La Isla del Encanto</p>
          <p className="text-zinc-300 mt-5 max-w-lg text-base leading-relaxed font-medium">Target: April 2031. The culmination of 10 years of study, saving, and physical transformation.</p>
>>>>>>> parent of 99b8023 (Convert relocation plan theme from Japan to Korea)
        </div>
      </div>

      {/* Why PR Grid */}
      <div>
        <h3 className="text-2xl font-black text-white mb-6 tracking-tight flex items-center gap-2">
<<<<<<< HEAD
          <span className="text-[#ce1126]">Why</span> Japan?
=======
          <span className="text-[#ce1126]">Why</span> Puerto Rico?
>>>>>>> parent of 99b8023 (Convert relocation plan theme from Japan to Korea)
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
        {/* Caguas Recommendations */}
        <div className="bg-[#0a3d8f]/10 backdrop-blur-md border border-[#0a3d8f]/30 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#0a3d8f]/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          <h3 className="text-2xl font-black text-[#0a3d8f] mb-2 flex items-center gap-3 tracking-tight relative z-10">
<<<<<<< HEAD
            <Map className="w-6 h-6" /> Osaka <span className="text-sm text-zinc-400 font-medium">(Recommended)</span>
          </h3>
          <p className="text-zinc-400 text-sm mb-6 font-bold relative z-10">Affordable, Friendly, and Full of IT-Focused Senmon Gakko</p>
=======
            <Map className="w-6 h-6" /> Caguas <span className="text-sm text-zinc-400 font-medium">(Recommended)</span>
          </h3>
          <p className="text-zinc-400 text-sm mb-6 font-bold relative z-10">The Center & Heart of Puerto Rico</p>
>>>>>>> parent of 99b8023 (Convert relocation plan theme from Japan to Korea)
          
          <ul className="space-y-4 relative z-10">
            {CAGUAS_INFO.map((info, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-zinc-200 font-medium">
                <CheckCircle2 className="w-5 h-5 text-[#0a3d8f] shrink-0 mt-0.5 drop-shadow-sm" />
                <span>{info}</span>
              </li>
            ))}
          </ul>
          
          <div className="mt-8 pt-6 border-t border-[#0a3d8f]/20 relative z-10">
            <h4 className="font-mono text-[10px] text-zinc-400 uppercase mb-2 font-bold tracking-widest">Rent Estimate (2031)</h4>
<<<<<<< HEAD
            <div className="text-3xl font-black text-white drop-shadow-sm">$450 - $800<span className="text-sm text-zinc-500 font-medium ml-1">/ month</span></div>
            <p className="text-xs text-zinc-400 mt-2 font-medium leading-relaxed">For a 1K studio or dorm-style student housing near campus.</p>
=======
            <div className="text-3xl font-black text-white drop-shadow-sm">$700 - $1,100<span className="text-sm text-zinc-500 font-medium ml-1">/ month</span></div>
            <p className="text-xs text-zinc-400 mt-2 font-medium leading-relaxed">For a 1-2 bedroom apartment outside the tourist area.</p>
>>>>>>> parent of 99b8023 (Convert relocation plan theme from Japan to Korea)
          </div>
        </div>

        {/* Relocation Checklist */}
        <div className="bg-[#11182c]/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl">
          <h3 className="text-2xl font-black text-white mb-6 tracking-tight">Relocation Checklist</h3>
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
      
      {/* Mini Culture Guide */}
      <div className="bg-gradient-to-br from-black/80 to-[#11182c]/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#f5a623]/10 rounded-full blur-3xl opacity-50" />
        
        <h3 className="font-black text-xl text-white mb-6 flex items-center gap-3 tracking-tight relative z-10">
          <Coffee className="w-6 h-6 text-[#f5a623] drop-shadow-[0_0_8px_rgba(245,166,35,0.6)]" /> Quick Culture Guide
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
          <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl text-center border border-white/5 hover:border-white/15 transition-all duration-300 hover:-translate-y-1 shadow-inner">
            <div className="text-xs font-mono font-bold text-zinc-500 mb-2 uppercase tracking-widest">Greeting</div>
<<<<<<< HEAD
            <div className="font-black text-white text-sm">&quot;Ohayou Gozaimasu&quot;</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl text-center border border-white/5 hover:border-white/15 transition-all duration-300 hover:-translate-y-1 shadow-inner">
            <div className="text-xs font-mono font-bold text-zinc-500 mb-2 uppercase tracking-widest">Pace</div>
            <div className="font-black text-white text-sm">Punctual & Precise</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl text-center border border-white/5 hover:border-white/15 transition-all duration-300 hover:-translate-y-1 shadow-inner">
            <div className="text-xs font-mono font-bold text-zinc-500 mb-2 uppercase tracking-widest">Drink</div>
            <div className="font-black text-white text-sm">Matcha at 3pm</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl text-center border border-white/5 hover:border-white/15 transition-all duration-300 hover:-translate-y-1 shadow-inner">
            <div className="text-xs font-mono font-bold text-zinc-500 mb-2 uppercase tracking-widest">Language</div>
            <div className="font-black text-white text-sm">Keigo (Polite Form)</div>
=======
            <div className="font-black text-white text-sm">&quot;Buen d&iacute;a&quot;</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl text-center border border-white/5 hover:border-white/15 transition-all duration-300 hover:-translate-y-1 shadow-inner">
            <div className="text-xs font-mono font-bold text-zinc-500 mb-2 uppercase tracking-widest">Pace</div>
            <div className="font-black text-white text-sm">More Relaxed</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl text-center border border-white/5 hover:border-white/15 transition-all duration-300 hover:-translate-y-1 shadow-inner">
            <div className="text-xs font-mono font-bold text-zinc-500 mb-2 uppercase tracking-widest">Coffee</div>
            <div className="font-black text-white text-sm">Always at 3pm</div>
          </div>
          <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl text-center border border-white/5 hover:border-white/15 transition-all duration-300 hover:-translate-y-1 shadow-inner">
            <div className="text-xs font-mono font-bold text-zinc-500 mb-2 uppercase tracking-widest">Language</div>
            <div className="font-black text-white text-sm">Spanglish Common</div>
>>>>>>> parent of 99b8023 (Convert relocation plan theme from Japan to Korea)
          </div>
        </div>
      </div>

    </div>
  );
}