"use client";

import React from "react";
import { Map, Sun, Shield, Heart, CheckCircle2, Navigation, Coffee } from "lucide-react";

const WHY_PR = [
  { icon: Sun, title: "El Clima", desc: "Tropical year-round. No more Lewiston winters." },
  { icon: Shield, title: "Comodidad", desc: "US Territory. No passport needed, uses USD, USPS/Amazon works." },
  { icon: Heart, title: "Cultura & Gente", desc: "Warm, vibrant, family-oriented culture. Rich history." },
  { icon: Navigation, title: "Accesibilidad", desc: "Short flight to East Coast. Same time zone (AST/EST)." }
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
];

export default function PuertoRicoInfo() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="relative rounded-2xl overflow-hidden bg-[#11182c] border border-white/10 shadow-xl min-h-[200px] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-[#ce1126] via-[#0a3d8f] to-transparent opacity-20" />
        <div className="absolute right-0 top-0 h-full w-1/2 bg-[url('https://images.unsplash.com/photo-1590418606746-018840f9cb25?q=80&w=1000')] bg-cover bg-center mix-blend-overlay opacity-30 mask-image:linear-gradient(to_left,black,transparent)]" />
        
        <div className="relative z-10 p-8">
          <div className="flex items-center gap-3 mb-2">
            <Map className="w-8 h-8 text-[#ce1126]" />
            <h2 className="text-3xl font-black text-white tracking-tight">Puerto Rico</h2>
          </div>
          <p className="text-[#f5a623] font-mono font-bold tracking-widest text-sm uppercase">La Isla del Encanto</p>
          <p className="text-zinc-300 mt-4 max-w-md">Target: April 2031. The culmination of 10 years of study, saving, and physical transformation.</p>
        </div>
      </div>

      {/* Why PR Grid */}
      <div>
        <h3 className="text-lg font-bold text-white mb-4">¿Por Qué Puerto Rico?</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {WHY_PR.map((item, i) => (
            <div key={i} className="bg-black/30 border border-white/5 p-4 rounded-xl flex items-start gap-4 hover:bg-white/5 transition-colors">
              <div className="bg-[#ce1126]/20 p-2 rounded-lg text-[#ce1126]">
                <item.icon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold text-sm mb-1">{item.title}</h4>
                <p className="text-zinc-400 text-xs leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Caguas Recommendations */}
        <div className="bg-[#0a3d8f]/10 border border-[#0a3d8f]/30 rounded-2xl p-6">
          <h3 className="text-xl font-black text-[#0a3d8f] mb-2 flex items-center gap-2">
            <Map className="w-5 h-5" /> Caguas (Recomendado)
          </h3>
          <p className="text-zinc-300 text-xs mb-4">El Centro y Corazón de Puerto Rico</p>
          
          <ul className="space-y-3">
            {CAGUAS_INFO.map((info, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-zinc-200">
                <CheckCircle2 className="w-4 h-4 text-[#0a3d8f] shrink-0 mt-0.5" />
                <span>{info}</span>
              </li>
            ))}
          </ul>
          
          <div className="mt-6 pt-4 border-t border-[#0a3d8f]/20">
            <h4 className="font-mono text-[10px] text-zinc-400 uppercase mb-2">Rent Estimate (2031)</h4>
            <div className="text-2xl font-black text-white">$700 - $1,100<span className="text-sm text-zinc-500 font-normal"> / mes</span></div>
            <p className="text-xs text-zinc-400 mt-1">Para un apartamento de 1-2 habitaciones fuera del área turística.</p>
          </div>
        </div>

        {/* Relocation Checklist */}
        <div className="bg-[#11182c] border border-white/5 rounded-2xl p-6">
          <h3 className="text-xl font-black text-white mb-4">Checklist de Mudanza</h3>
          <div className="space-y-3">
            {CHECKLIST.map((task, i) => (
              <div key={i} className="flex gap-3 items-start group">
                <div className="w-5 h-5 rounded border border-white/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:border-[#f5a623] transition-colors">
                  <div className="w-2.5 h-2.5 rounded-[1px] bg-transparent" />
                </div>
                <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">{task}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Mini Culture Guide */}
      <div className="bg-gradient-to-r from-black to-[#11182c] border border-white/10 rounded-2xl p-6 shadow-md">
        <h3 className="font-bold text-white mb-4 flex items-center gap-2">
          <Coffee className="w-5 h-5 text-[#f5a623]" /> Cultura Rápida
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/5 p-3 rounded-lg text-center">
            <div className="text-xs font-mono text-zinc-500 mb-1">Saludo</div>
            <div className="font-bold text-white text-sm">"Buen día"</div>
          </div>
          <div className="bg-white/5 p-3 rounded-lg text-center">
            <div className="text-xs font-mono text-zinc-500 mb-1">Ritmo</div>
            <div className="font-bold text-white text-sm">Más relajado</div>
          </div>
          <div className="bg-white/5 p-3 rounded-lg text-center">
            <div className="text-xs font-mono text-zinc-500 mb-1">Café</div>
            <div className="font-bold text-white text-sm">Siempre a las 3pm</div>
          </div>
          <div className="bg-white/5 p-3 rounded-lg text-center">
            <div className="text-xs font-mono text-zinc-500 mb-1">Idioma</div>
            <div className="font-bold text-white text-sm">Spanglish común</div>
          </div>
        </div>
      </div>

    </div>
  );
}