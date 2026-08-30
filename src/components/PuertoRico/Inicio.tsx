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
  const launchDate = new Date("2027-08-01");
  const daysToLaunch = Math.max(0, Math.floor((launchDate.getTime() - today.getTime()) / (1000 * 3600 * 24)));
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
  
  const japaneseLevels = ["Hiragana & Katakana", "JLPT N5", "JLPT N4", "JLPT N3", "JLPT N2", "JLPT N1"];
  const currentJapaneseLevel = japaneseLevels.filter(l => data.deleProgress[l]).length;

  return (
    <div className="space-y-6">
      {/* Hero Card */}
      <div className="group bg-gradient-to-br from-[#ce1126]/90 via-[#0a3d8f]/80 to-[#050811] rounded-3xl p-6 sm:p-8 shadow-2xl shadow-[#ce1126]/20 border border-white/10 relative overflow-hidden transition-all duration-500 hover:shadow-[#ce1126]/40 backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-[#f5a623]/20 via-[#4ade80]/10 to-transparent rounded-full blur-3xl -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-110"></div>
        <div className="relative z-10">
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-2 tracking-tighter drop-shadow-md">
            Welcome, Nicholas! 🚀
          </h1>
          <p className="text-zinc-200 font-medium text-sm sm:text-lg mb-8 tracking-wide drop-shadow-sm">
            10-Year Master Plan: Roblox Game Dev + Art + Content Creation + Japanese 🎯
          </p>
          
          <div className="flex flex-wrap gap-3 sm:gap-4 font-mono text-xs font-bold">
            <span className="bg-white/10 px-4 py-2 rounded-xl border border-white/20 backdrop-blur-md text-white flex items-center gap-2 shadow-lg">
              <span className="text-lg">🚀</span> Sept 3, 2026
            </span>
            <span className="bg-white/10 px-4 py-2 rounded-xl border border-white/20 backdrop-blur-md text-[#4ade80] flex items-center gap-2 shadow-lg">
              <span className="text-lg">💻</span> Job/Freelance: 2027
            </span>
            <span className="bg-white/10 px-4 py-2 rounded-xl border border-[#f5a623]/40 backdrop-blur-md text-[#f5a623] flex items-center gap-2 shadow-lg">
              <span className="text-lg">🎥</span> Content Launch: 2027
            </span>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: Calendar, color: "text-[#ce1126]", border: "border-l-[#ce1126]", label: "Days to Launch", val: daysToLaunch },
          { icon: BookOpen, color: "text-[#0a3d8f]", border: "border-l-[#0a3d8f]", label: "Courses", val: `${completedCourses}/25` },
          { icon: Target, color: "text-[#f5a623]", border: "border-l-[#f5a623]", label: "Streak", val: `${currentStreak}d` },
          { icon: PiggyBank, color: "text-[#4ade80]", border: "border-l-[#4ade80]", label: "Savings", val: `$${totalSaved.toLocaleString()}` }
        ].map((stat, i) => (
          <div key={i} className={`bg-[#11182c]/80 backdrop-blur-md border-l-4 ${stat.border} p-5 rounded-2xl shadow-lg border-y border-r border-white/5 hover:bg-[#1a233a]/90 transition-colors duration-300`}>
            <div className="text-zinc-400 font-mono text-[10px] sm:text-xs uppercase flex items-center gap-2 mb-2 tracking-wider font-semibold">
              <stat.icon className={`w-4 h-4 ${stat.color}`} /> {stat.label}
            </div>
            <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tighter">
              {stat.val}
            </div>
          </div>
        ))}
      </div>

      {/* Progress Bars */}
      <div className="bg-[#11182c]/80 backdrop-blur-md border border-white/5 rounded-3xl p-6 sm:p-8 shadow-xl">
        <h2 className="text-xl font-black text-white mb-8 flex items-center gap-3 tracking-tight">
          <Brain className="w-6 h-6 text-[#0a3d8f]" />
          Master Plan Progress
        </h2>
        
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
          <div className="space-y-8">
            <ProgressBar title="📚 Udemy Courses (Done by Apr 2, 2027)" current={completedCourses} max={25} color="from-[#ce1126] to-[#f5a623]" />
            <ProgressBar title="🇰🇷 Japanese (JLPT)" current={currentJapaneseLevel} max={6} color="from-[#0a3d8f] to-[#00f0ff]" labelOverride={currentJapaneseLevel === 0 ? "Just Starting" : ["JLPT N5", "JLPT N4", "JLPT N3", "JLPT N2", "JLPT N1", "JLPT N1+"][currentJapaneseLevel - 1]} />
            <ProgressBar title="💰 Savings ($15k Goal)" current={totalSaved} max={15000} color="from-[#4ade80] to-[#00ff88]" labelOverride={`$${totalSaved.toLocaleString()}`} />
          </div>
          <div className="space-y-8">
            <ProgressBar title={`⚖️ Body Goal (${startWeight}→${targetWeight} lbs)`} current={weightProgress} max={100} color="from-[#ff3366] to-[#ff9900]" labelOverride={`${currentWeight} lbs`} />
            <ProgressBar title="🎯 Habits Today" current={habitsDoneToday} max={8} color="from-[#f5a623] to-[#ff3366]" />
            <ProgressBar title="🔥 30-Day Streak Goal" current={Math.min(currentStreak, 30)} max={30} color="from-[#ce1126] to-[#ff3366]" />
          </div>
        </div>
      </div>

      {/* Phase Roadmap */}
      <div>
        <h2 className="text-xl font-black text-white mb-6 ml-2 tracking-tight">Phase Roadmap</h2>
        <div className="flex overflow-x-auto pb-6 gap-4 no-scrollbar snap-x px-2">
          <PhaseCard title="Phase 1 🚀" desc="Game Dev Courses + Content Creation + Japanese" date="Sept 2026–Apr 2027" color="border-t-[#ce1126] hover:shadow-[#ce1126]/20" />
          <PhaseCard title="Phase 2 🎓" desc="Courses Complete, Build Portfolio" date="Apr–Aug 2027" color="border-t-[#0a3d8f] hover:shadow-[#0a3d8f]/20" />
          <PhaseCard title="Phase 3 💼" desc="Land Job or First Freelance Client + Launch Content" date="Aug–Dec 2027" color="border-t-[#f5a623] hover:shadow-[#f5a623]/20" />
          <PhaseCard title="Phase 4 🎥" desc="Grow Content + Freelance Business + Game Dev & Content Creation" date="2028–2029" color="border-t-[#4ade80] hover:shadow-[#4ade80]/20" />
          <PhaseCard title="Phase 5 💰" desc="Career Stable, Save for MacBook Pro + iPad Pro" date="2029–2030" color="border-t-[#ce1126] hover:shadow-[#ce1126]/20" />
          <PhaseCard title="Phase 6 🌟" desc="Established Dev Career + Creative Life" date="2030–2036" color="border-t-[#0a3d8f] hover:shadow-[#0a3d8f]/20" />
        </div>
      </div>
    </div>
  );
}

function ProgressBar({ title, current, max, color, labelOverride }: { title: string, current: number, max: number, color: string, labelOverride?: string }) {
  const percentage = Math.min(100, Math.max(0, (current / max) * 100));
  
  return (
    <div className="group">
      <div className="flex justify-between items-end mb-2.5 font-mono text-xs sm:text-sm">
        <span className="text-zinc-400 group-hover:text-zinc-200 transition-colors">{title}</span>
        <span className="text-white font-bold bg-white/10 px-2 py-0.5 rounded-md shadow-sm">{labelOverride ? labelOverride : `${current}/${max}`}</span>
      </div>
      <div className="h-3 w-full bg-black/60 rounded-full overflow-hidden border border-white/10 shadow-inner">
        <div 
          className={`h-full bg-gradient-to-r ${color} transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(255,255,255,0.2)]`} 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function PhaseCard({ title, desc, date, color }: { title: string, desc: string, date: string, color: string }) {
  return (
    <div className={`min-w-[220px] snap-center bg-[#11182c]/80 backdrop-blur-sm border border-white/5 rounded-2xl p-5 shadow-lg border-t-4 ${color} transition-all duration-300 hover:-translate-y-1 hover:bg-[#1a233a]`}>
      <h3 className="font-black text-white font-mono text-base mb-1 tracking-tight">{title}</h3>
      <p className="text-zinc-400 text-sm mb-4 font-medium">{desc}</p>
      <div className="text-[10px] text-zinc-300 font-mono font-bold uppercase bg-black/50 px-3 py-1.5 rounded-lg inline-block border border-white/10 shadow-inner">
        {date}
      </div>
    </div>
  );
}
