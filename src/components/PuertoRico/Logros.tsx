"use client";

import React, { useState, useEffect } from "react";
import { getPRData, savePRData, PRStorageData } from "@/lib/pr-storage";
import { Award, Lock, CheckCircle2 } from "lucide-react";

const ACHIEVEMENTS = [
  // Cursos (6)
  { id: "a1", icon: "🐍", title: "Python Hero", desc: "Complete Python Bootcamp." },
  { id: "a2", icon: "🌐", title: "Web Master", desc: "Complete Full-Stack Bootcamp." },
  { id: "a3", icon: "⚛️", title: "React Ninja", desc: "Complete Next.js/React Guide." },
  { id: "a4", icon: "☁️", title: "Cloud Native", desc: "Complete 1st Cloud Certification." },
  { id: "a5", icon: "🤖", title: "AI Whisperer", desc: "Complete AI Studio Bootcamp." },
  { id: "a6", icon: "🎓", title: "Grandmaster", desc: "Complete all 19 Udemy courses." },
  // Español (6)
  { id: "a7", icon: "🗣️", title: "Primeros Pasos", desc: "Hit A1 Internal Spanish." },
  { id: "a8", icon: "📚", title: "Vocabulario A2", desc: "Hit A2 Internal Spanish." },
  { id: "a9", icon: "🥉", title: "B1 Oficial", desc: "Pass DELE B1 Exam." },
  { id: "a10", icon: "🥈", title: "B2 Oficial", desc: "Pass DELE B2 Exam." },
  { id: "a11", icon: "🥇", title: "C1 Oficial", desc: "Pass DELE C1 Exam." },
  { id: "a12", icon: "🎬", title: "Sin Subtítulos", desc: "Watch a PR movie without subs." },
  // Fitness & Salud (6)
  { id: "a13", icon: "💧", title: "Hidratación", desc: "7-day water habit streak." },
  { id: "a14", icon: "🏃", title: "Cardio Diario", desc: "7-day walking streak." },
  { id: "a15", icon: "📉", title: "Bajo de Peso", desc: "Hit 200 lbs." },
  { id: "a16", icon: "🔥", title: "Corte Profundo", desc: "Hit 180 lbs." },
  { id: "a17", icon: "💪", title: "Meta Final", desc: "Hit 160 lbs." },
  { id: "a18", icon: "🧘", title: "Restauración", desc: "Complete 10 Sunday Yoga flows." },
  // Ahorros (6)
  { id: "a19", icon: "💵", title: "Primer Mil", desc: "Save $1,000." },
  { id: "a20", icon: "💰", title: "Fondo Emergencia", desc: "Save $5,000." },
  { id: "a21", icon: "🏦", title: "Cincos Cifras", desc: "Save $10,000." },
  { id: "a22", icon: "📈", title: "Medio Camino", desc: "Save $17,500." },
  { id: "a23", icon: "💎", title: "Casi Allí", desc: "Save $25,000." },
  { id: "a24", icon: "🏆", title: "Meta PR", desc: "Save $35,000." },
  // Vida & PR (6)
  { id: "a25", icon: "💼", title: "Primer Ingreso", desc: "Earn first remote IT dollar." },
  { id: "a26", icon: "🌴", title: "Scouting Trip", desc: "Book/Go on 2-week PR trip." },
  { id: "a27", icon: "📦", title: "Minimalista", desc: "Downsize Lewiston apartment." },
  { id: "a28", icon: "✈️", title: "One-Way Ticket", desc: "Buy the flight to PR." },
  { id: "a29", icon: "🔑", title: "Nuevo Hogar", desc: "Sign lease in PR." },
  { id: "a30", icon: "🇵🇷", title: "Boricua", desc: "10 Years Complete. You made it." }
];

export default function Logros() {
  const [data, setData] = useState<PRStorageData | null>(null);

  useEffect(() => {
    setData(getPRData());
  }, []);

  if (!data) return null;

  const toggleUnlock = (id: string) => {
    const current = data.unlockedAchievements[id] ? true : false;
    
    if (!current) {
      window.dispatchEvent(new Event('triggerConfetti'));
    }

    const newAch = { ...data.unlockedAchievements, [id]: !current };
    setData(savePRData({ unlockedAchievements: newAch }));
  };

  const unlockedCount = Object.values(data.unlockedAchievements).filter(Boolean).length;
  const total = ACHIEVEMENTS.length;
  const progress = (unlockedCount / total) * 100;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="bg-gradient-to-br from-[#ce1126] to-black border border-[#ce1126]/30 rounded-2xl p-6 shadow-lg shadow-[#ce1126]/20 flex flex-col sm:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-2 mb-2">
            <Award className="w-8 h-8 text-[#f5a623]" /> Sala de Trofeos PR
          </h2>
          <p className="text-sm font-mono text-zinc-300">Desbloquea estos 30 logros durante los próximos 10 años.</p>
        </div>
        <div className="flex flex-col items-center sm:items-end min-w-[120px]">
          <div className="text-4xl font-black text-[#f5a623] font-mono">{unlockedCount}<span className="text-xl text-zinc-500">/{total}</span></div>
          <div className="w-full h-1.5 bg-black/50 rounded-full mt-2 overflow-hidden border border-white/10">
            <div className="h-full bg-[#f5a623]" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {ACHIEVEMENTS.map(ach => {
          const isUnlocked = data.unlockedAchievements[ach.id] ? true : false;
          
          return (
            <div 
              key={ach.id}
              onClick={() => toggleUnlock(ach.id)}
              className={`relative flex flex-col items-center text-center p-4 rounded-xl border transition-all cursor-pointer overflow-hidden group ${
                isUnlocked 
                  ? 'bg-gradient-to-b from-[#f5a623]/20 to-black/40 border-[#f5a623]/50 shadow-[0_0_15px_rgba(245,166,35,0.2)]'
                  : 'bg-[#11182c] border-white/5 hover:border-white/10 hover:bg-white/5'
              }`}
            >
              {isUnlocked && (
                <div className="absolute top-2 right-2 text-[#4ade80]">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              )}
              
              <div className={`text-4xl mb-3 transition-transform duration-300 ${isUnlocked ? 'scale-110 drop-shadow-[0_0_10px_rgba(245,166,35,0.8)]' : 'opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100'}`}>
                {ach.icon}
              </div>
              
              <h3 className={`font-bold text-xs mb-1 font-mono uppercase tracking-tight ${isUnlocked ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
                {ach.title}
              </h3>
              <p className={`text-[9px] leading-tight ${isUnlocked ? 'text-zinc-300' : 'text-zinc-600'}`}>
                {ach.desc}
              </p>

              {!isUnlocked && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[1px]">
                  <Lock className="w-6 h-6 text-white/50" />
                </div>
              )}
            </div>
          );
        })}
      </div>
      
    </div>
  );
}