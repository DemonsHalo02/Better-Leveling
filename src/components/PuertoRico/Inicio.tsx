"use client";

import React, { useEffect, useState } from "react";
import { getPRData, PRStorageData } from "@/lib/pr-storage";
import { loadHunterState, HunterState } from "@/lib/hunter-system";
import { Calendar, BookOpen, Target, PiggyBank, Brain } from "lucide-react";

export default function Inicio() {
  const [data, setData] = useState<PRStorageData | null>(null);
  const [hunter, setHunter] = useState<HunterState | null>(null);

  useEffect(() => {
    setData(getPRData());
    setHunter(loadHunterState());
    
    const handleStorage = () => setData(getPRData());
    const handleHunter = (e: any) => setHunter(e.detail || loadHunterState());
    
    window.addEventListener("prDataUpdated", handleStorage);
    window.addEventListener("hunterStateChanged", handleHunter);
    
    return () => {
      window.removeEventListener("prDataUpdated", handleStorage);
      window.removeEventListener("hunterStateChanged", handleHunter);
    };
  }, []);

  if (!data || !hunter) return null;

  const today = new Date();
  const moveDate = new Date("2031-08-01");
  const daysToMove = Math.max(0, Math.floor((moveDate.getTime() - today.getTime()) / (1000 * 3600 * 24)));
  const completedCourses = Object.values(data.courseProgress).filter(p => p === 100).length;
  const currentStreak = Math.max(0, ...Object.values(data.habitStreaks), 0);
  const totalSaved = data.savingsIncome - data.savingsExpenses;

  // Calculate Habits completed today
  const todayStr = today.toISOString().split("T")[0];
  const habitsDoneToday = Object.keys(data.habitHistory).filter(k => k.startsWith(todayStr) && data.habitHistory[k]).length;

  // Sync weight from hunter system
  const currentWeight = hunter.profile.currentWeight || 220;
  const startWeight = hunter.profile.startWeight || 220;
  const targetWeight = hunter.profile.targetWeight || 160;
  
  // Prevent division by zero if startWeight == targetWeight
  const weightProgress = startWeight === targetWeight 
    ? 100 
    : Math.max(0, Math.min(100, ((startWeight - currentWeight) / (startWeight - targetWeight)) * 100));
  
  const topikLevels = ["Level 1", "Level 2", "Level 3", "Level 4", "Level 5", "Level 6"];
  const currentTopikLevel = topikLevels.filter(l => data.deleProgress[l]).length;

  return (
    <div className="space-y-8">
      {/* Hero Card */}
      <div className="group bg-gradient-to-br from-indigo-900 via-purple-900 to-black rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/10 relative overflow-hidden transition-all duration-500 hover:border-indigo-500/50 backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-indigo-500/20 via-purple-500/10 to-transparent rounded-full blur-3xl -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-110"></div>
        <div className="relative z-10">
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-2 tracking-tighter drop-shadow-md">
            Welcome, Nicholas! 🇰🇷
          </h1>
          <p className="text-zinc-200 font-medium text-sm sm:text-lg mb-8 tracking-wide drop-shadow-sm">
            The Goal: US College Degree → Tech Career in Seoul
          </p>
          
          <div className="flex flex-wrap gap-3 sm:gap-4 font-mono text-xs font-bold">
            <span className="bg-black/30 px-4 py-2 rounded-xl border border-white/10 backdrop-blur-md text-white flex items-center gap-2 shadow-lg hover:bg-white/5 transition-colors">
              <span className="text-lg">🚀</span> Aug 2026
            </span>
            <span className="bg-black/30 px-4 py-2 rounded-xl border border-white/10 backdrop-blur-md text-purple-400 flex items-center gap-2 shadow-lg hover:bg-white/5 transition-colors">
              <span className="text-lg">🎓</span> College
            </span>
            <span className="bg-black/30 px-4 py-2 rounded-xl border border-white/10 backdrop-blur-md text-emerald-400 flex items-center gap-2 shadow-lg hover:bg-white/5 transition-colors">
              <span className="text-lg">🗣️</span> TOPIK Lvl 5
            </span>
            <span className="bg-indigo-500/20 px-4 py-2 rounded-xl border border-indigo-500/30 backdrop-blur-md text-indigo-300 flex items-center gap-2 shadow-lg hover:bg-indigo-500/30 transition-colors">
              <span className="text-lg">✈️</span> KR: Aug 2031
            </span>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Calendar, color: "text-indigo-400", border: "border-l-indigo-500", label: "Days to Korea", val: daysToMove },
          { icon: BookOpen, color: "text-purple-400", border: "border-l-purple-500", label: "Courses", val: `${completedCourses}/16` },
          { icon: Target, color: "text-emerald-400", border: "border-l-emerald-500", label: "Streak", val: `${currentStreak}d` },
          { icon: PiggyBank, color: "text-blue-400", border: "border-l-blue-500", label: "Savings", val: `$${totalSaved.toLocaleString()}` }
        ].map((stat, i) => (
          <div key={i} className={`bg-[#0a0a0a]/80 backdrop-blur-md border-l-4 ${stat.border} p-5 rounded-2xl shadow-lg border-y border-r border-white/5 hover:bg-white/5 transition-all duration-300 hover:-translate-y-1`}>
            <div className="text-zinc-400 font-sans text-xs uppercase flex items-center gap-2 mb-2 tracking-wider font-bold">
              <stat.icon className={`w-4 h-4 ${stat.color}`} /> {stat.label}
            </div>
            <div className="text-3xl sm:text-4xl font-black text-white font-sans tracking-tighter">
              {stat.val}
            </div>
          </div>
        ))}
      </div>

      {/* Progress Bars */}
      <div className="bg-[#0a0a0a]/80 backdrop-blur-md border border-white/5 rounded-3xl p-6 sm:p-8 shadow-xl">
        <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-3 tracking-tight">
          <Brain className="w-6 h-6 text-indigo-400" />
          Master Plan Progress
        </h2>
        
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
          <div className="space-y-8">
            <ProgressBar title="📚 Masterclasses (Done by Apr 2027)" current={completedCourses} max={16} color="from-indigo-600 to-purple-500" />
            <ProgressBar title="🇰🇷 Korean Level (Lvl 1→6)" current={currentTopikLevel} max={6} color="from-purple-600 to-pink-500" labelOverride={currentTopikLevel === 0 ? "Beginner" : topikLevels[currentTopikLevel - 1]} />
            <ProgressBar title="💰 Savings ($35k Goal)" current={totalSaved} max={35000} color="from-emerald-600 to-teal-400" labelOverride={`$${totalSaved.toLocaleString()}`} />
          </div>
          <div className="space-y-8">
            <ProgressBar title={`⚖️ Body Goal (${startWeight}→${targetWeight} lbs)`} current={weightProgress} max={100} color="from-blue-600 to-indigo-500" labelOverride={`${currentWeight} lbs`} />
            <ProgressBar title="🎯 Habits Today" current={habitsDoneToday} max={8} color="from-orange-500 to-amber-400" />
            <ProgressBar title="🔥 30-Day Streak Goal" current={Math.min(currentStreak, 30)} max={30} color="from-rose-600 to-red-500" />
          </div>
        </div>
      </div>

      {/* Phase Roadmap */}
      <div>
        <h2 className="text-2xl font-black text-white mb-6 ml-2 tracking-tight">Phase Roadmap</h2>
        <div className="flex overflow-x-auto pb-6 gap-4 no-scrollbar snap-x px-2">
          <PhaseCard title="Phase 1 🚀" desc="Courses + Content Creation + Frontend" date="Aug 2026–Apr 2027" color="border-t-indigo-500 hover:shadow-indigo-500/20" />
          <PhaseCard title="Phase 2 🎓" desc="HiSET Complete, Start College, Freelance" date="Apr–Dec 2027" color="border-t-purple-500 hover:shadow-purple-500/20" />
          <PhaseCard title="Phase 3 📚" desc="College + TOPIK Level 5 + Portfolio" date="2027–2031" color="border-t-pink-500 hover:shadow-pink-500/20" />
          <PhaseCard title="Phase 4 ✈️" desc="Graduate College & Move to Korea" date="Aug 2031" color="border-t-emerald-500 hover:shadow-emerald-500/20" />
          <PhaseCard title="Phase 5 🇰🇷" desc="Korea Life + Developer/Creator Career" date="2031–2036" color="border-t-blue-500 hover:shadow-blue-500/20" />
        </div>
      </div>
    </div>
  );
}

function ProgressBar({ title, current, max, color, labelOverride }: { title: string, current: number, max: number, color: string, labelOverride?: string }) {
  const percentage = Math.min(100, Math.max(0, (current / max) * 100));
  
  return (
    <div className="group">
      <div className="flex justify-between items-end mb-2.5 font-sans font-bold text-xs sm:text-sm">
        <span className="text-zinc-400 group-hover:text-white transition-colors">{title}</span>
        <span className="text-white font-black bg-white/10 px-2 py-0.5 rounded-md shadow-sm border border-white/5">{labelOverride ? labelOverride : `${current}/${max}`}</span>
      </div>
      <div className="h-3 w-full bg-black/60 rounded-full overflow-hidden border border-white/10 shadow-inner">
        <div 
          className={`h-full bg-gradient-to-r ${color} transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(255,255,255,0.3)]`} 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function PhaseCard({ title, desc, date, color }: { title: string, desc: string, date: string, color: string }) {
  return (
    <div className={`min-w-[240px] snap-center bg-[#0a0a0a]/80 backdrop-blur-md border border-white/5 rounded-2xl p-6 shadow-lg border-t-4 ${color} transition-all duration-300 hover:-translate-y-2 hover:bg-white/5`}>
      <h3 className="font-black text-white font-sans text-lg mb-2 tracking-tight">{title}</h3>
      <p className="text-zinc-400 text-sm mb-6 font-medium leading-relaxed">{desc}</p>
      <div className="text-[10px] text-zinc-300 font-mono font-bold uppercase bg-black/50 px-3 py-1.5 rounded-lg inline-block border border-white/10 shadow-inner">
        {date}
      </div>
    </div>
  );
}