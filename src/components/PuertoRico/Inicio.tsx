"use client";

import React, { useEffect, useState } from "react";
import { getPRData, PRStorageData } from "@/lib/pr-storage";
import { Calendar, BookOpen, Target, PiggyBank, Scale, Brain } from "lucide-react";

export default function Inicio() {
  const [data, setData] = useState<PRStorageData | null>(null);

  useEffect(() => {
    setData(getPRData());
    const handleStorage = () => setData(getPRData());
    window.addEventListener("prDataUpdated", handleStorage);
    return () => window.removeEventListener("prDataUpdated", handleStorage);
  }, []);

  if (!data) return null;

  const today = new Date();
  const moveDate = new Date("2031-04-01");
  const daysToMove = Math.max(0, Math.floor((moveDate.getTime() - today.getTime()) / (1000 * 3600 * 24)));
  const completedCourses = Object.values(data.courseProgress).filter(p => p === 100).length;
  const currentStreak = Math.max(0, ...Object.values(data.habitStreaks), 0);
  const totalSaved = data.savingsIncome - data.savingsExpenses;

  // Calculate Habits completed today
  const todayStr = today.toISOString().split("T")[0];
  const habitsDoneToday = Object.keys(data.habitHistory).filter(k => k.startsWith(todayStr) && data.habitHistory[k]).length;

  const getWeight = () => {
    if (data.weightLogs.length > 0) return data.weightLogs[data.weightLogs.length - 1].weight;
    return 220; // default start
  };
  const currentWeight = getWeight();
  const weightProgress = Math.max(0, Math.min(100, ((220 - currentWeight) / (220 - 160)) * 100));
  
  const deleLevels = ["A1", "A2", "B1", "B2", "C1"];
  const currentDeleLevel = deleLevels.filter(l => data.deleProgress[l]).length;

  return (
    <div className="space-y-6">
      {/* Hero Card */}
      <div className="bg-gradient-to-br from-[#ce1126] via-[#9e0b1b] to-black rounded-2xl p-6 shadow-lg shadow-[#ce1126]/20 border border-[#ce1126]/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="relative z-10">
          <h1 className="text-3xl sm:text-4xl font-black text-white mb-2 tracking-tight">¡Bienvenido, Nicholas! 🇵🇷</h1>
          <p className="text-zinc-200 font-mono text-sm sm:text-base mb-6">10 Years: Lewiston, ME → La Isla del Encanto 🌴</p>
          
          <div className="flex flex-wrap gap-2 sm:gap-4 font-mono text-xs font-bold">
            <span className="bg-black/40 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-sm text-white flex items-center gap-2">
              <span>🚀</span> Aug 3, 2026
            </span>
            <span className="bg-black/40 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-sm text-[#4ade80] flex items-center gap-2">
              <span>🗣️</span> DELE B2: Dec 2028
            </span>
            <span className="bg-black/40 px-3 py-1.5 rounded-lg border border-[#f5a623]/50 backdrop-blur-sm text-[#f5a623] flex items-center gap-2">
              <span>✈️</span> PR: Apr 2031
            </span>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-[#11182c] border-l-4 border-l-[#ce1126] p-4 rounded-xl shadow-md border-y border-r border-white/5">
          <div className="text-zinc-400 font-mono text-[10px] sm:text-xs uppercase flex items-center gap-2 mb-1">
            <Calendar className="w-3.5 h-3.5 text-[#ce1126]" /> Days to PR
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono">{daysToMove}</div>
        </div>
        <div className="bg-[#11182c] border-l-4 border-l-[#0a3d8f] p-4 rounded-xl shadow-md border-y border-r border-white/5">
          <div className="text-zinc-400 font-mono text-[10px] sm:text-xs uppercase flex items-center gap-2 mb-1">
            <BookOpen className="w-3.5 h-3.5 text-[#0a3d8f]" /> Courses
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono">{completedCourses}<span className="text-zinc-500 text-lg">/19</span></div>
        </div>
        <div className="bg-[#11182c] border-l-4 border-l-[#f5a623] p-4 rounded-xl shadow-md border-y border-r border-white/5">
          <div className="text-zinc-400 font-mono text-[10px] sm:text-xs uppercase flex items-center gap-2 mb-1">
            <Target className="w-3.5 h-3.5 text-[#f5a623]" /> Streak
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono">{currentStreak} <span className="text-zinc-500 text-lg">Days</span></div>
        </div>
        <div className="bg-[#11182c] border-l-4 border-l-[#4ade80] p-4 rounded-xl shadow-md border-y border-r border-white/5">
          <div className="text-zinc-400 font-mono text-[10px] sm:text-xs uppercase flex items-center gap-2 mb-1">
            <PiggyBank className="w-3.5 h-3.5 text-[#4ade80]" /> Savings
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white font-mono">${totalSaved.toLocaleString()}</div>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="bg-[#11182c] border border-white/5 rounded-2xl p-6 shadow-md">
        <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
          <Brain className="w-5 h-5 text-system-blue" />
          Master Plan Progress
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <ProgressBar title="📚 Udemy Courses" current={completedCourses} max={19} color="from-[#ce1126] to-[#f5a623]" />
            <ProgressBar title="🇵🇷 Spanish Level (A1→C1)" current={currentDeleLevel} max={5} color="from-[#0a3d8f] to-[#00f0ff]" labelOverride={currentDeleLevel === 0 ? "A0" : deleLevels[currentDeleLevel - 1]} />
            <ProgressBar title="💰 Savings ($35k Goal)" current={totalSaved} max={35000} color="from-[#4ade80] to-[#00ff88]" labelOverride={`$${totalSaved.toLocaleString()}`} />
          </div>
          <div className="space-y-6">
            <ProgressBar title="⚖️ Body Goal (220→160 lbs)" current={weightProgress} max={100} color="from-[#ff3366] to-[#ff9900]" labelOverride={`${currentWeight} lbs`} />
            <ProgressBar title="🎯 Hábitos Hoy" current={habitsDoneToday} max={8} color="from-[#f5a623] to-[#ff3366]" />
            <ProgressBar title="🔥 30-Day Streak Goal" current={Math.min(currentStreak, 30)} max={30} color="from-[#ce1126] to-[#ff3366]" />
          </div>
        </div>
      </div>

      {/* Phase Roadmap */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4 ml-1">Roadmap de las Fases</h2>
        <div className="flex overflow-x-auto pb-4 gap-4 no-scrollbar snap-x">
          <PhaseCard title="Fase 1 🚀" desc="Cursos + Español" date="Aug 2026–Feb 2027" color="border-t-[#ce1126]" />
          <PhaseCard title="Fase 2 🗣️" desc="DELE B1 Prep" date="Feb–Dec 2027" color="border-t-[#0a3d8f]" />
          <PhaseCard title="Fase 3 💼" desc="IT Job + DELE B2" date="2027–2028" color="border-t-[#f5a623]" />
          <PhaseCard title="Fase 4 💪" desc="Remote Income + $35K" date="2028–2030" color="border-t-[#4ade80]" />
          <PhaseCard title="Fase 5 ✈️" desc="Move to Puerto Rico" date="Apr 2031" color="border-t-[#ce1126]" />
          <PhaseCard title="Fase 6 🌴" desc="PR Life + Career" date="2031–2036" color="border-t-[#0a3d8f]" />
        </div>
      </div>
    </div>
  );
}

function ProgressBar({ title, current, max, color, labelOverride }: { title: string, current: number, max: number, color: string, labelOverride?: string }) {
  const percentage = Math.min(100, Math.max(0, (current / max) * 100));
  
  return (
    <div>
      <div className="flex justify-between items-end mb-2 font-mono text-xs">
        <span className="text-zinc-300">{title}</span>
        <span className="text-white font-bold">{labelOverride ? labelOverride : `${current}/${max}`}</span>
      </div>
      <div className="h-2 w-full bg-black rounded-full overflow-hidden border border-white/5">
        <div 
          className={`h-full bg-gradient-to-r ${color} transition-all duration-1000 ease-out`} 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function PhaseCard({ title, desc, date, color }: { title: string, desc: string, date: string, color: string }) {
  return (
    <div className={`min-w-[200px] snap-center bg-[#11182c] border border-white/5 rounded-xl p-4 shadow-sm border-t-4 ${color}`}>
      <h3 className="font-bold text-white font-mono text-sm mb-1">{title}</h3>
      <p className="text-zinc-300 text-xs mb-3">{desc}</p>
      <div className="text-[10px] text-zinc-500 font-mono uppercase bg-black/30 px-2 py-1 rounded inline-block">
        {date}
      </div>
    </div>
  );
}