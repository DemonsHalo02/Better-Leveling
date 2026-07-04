"use client";

import React, { useEffect, useState } from 'react';
import { loadHunterState, HunterState } from '@/lib/hunter-system';
import { Shield, Zap, Flame, Award, Heart, Activity, Sparkles, Crown } from 'lucide-react';

interface HunterStatusBarProps {
  onNavigate?: (tab: string) => void;
}

export default function HunterStatusBar({ onNavigate }: HunterStatusBarProps) {
  const [state, setState] = useState<HunterState | null>(null);
  const [vipTier, setVipTier] = useState<string>("E-Rank Free");

  useEffect(() => {
    setState(loadHunterState());
    if (typeof window !== "undefined") {
      const savedTier = localStorage.getItem("hunter_vip_tier");
      if (savedTier) setVipTier(savedTier);
    }

    const handleStateChange = (e: Event) => {
      const customEvent = e as CustomEvent<HunterState>;
      if (customEvent.detail) {
        setState(customEvent.detail);
      } else {
        setState(loadHunterState());
      }
    };

    window.addEventListener('hunterStateChanged', handleStateChange);
    return () => window.removeEventListener('hunterStateChanged', handleStateChange);
  }, []);

  if (!state) return null;

  const xpPercentage = Math.min(100, Math.floor((state.xp / state.xpToNextLevel) * 100));

  const getRankColor = (rank: string) => {
    switch (rank) {
      case 'Shadow Monarch':
      case 'S-Rank': return 'text-system-gold border-system-gold bg-system-gold/10 shadow-glow-gold';
      case 'A-Rank': return 'text-system-purple border-system-purple bg-system-purple/10 shadow-glow-purple';
      case 'B-Rank': return 'text-system-blue border-system-blue bg-system-blue/10 shadow-glow-blue';
      default: return 'text-system-cyan border-system-cyan/50 bg-system-cyan/10 shadow-[0_0_10px_rgba(0,240,255,0.2)]';
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#050811]/90 backdrop-blur-xl border-b border-system-blue/30 px-3 sm:px-6 py-2.5 sm:py-3.5 shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5 sm:gap-4">
        
        {/* Top Row / Left: System Title & Rank */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-system-panel to-system-dark border border-system-blue flex items-center justify-center shadow-glow-blue animate-pulse-glow flex-shrink-0">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-system-blue" />
            </div>
            <div>
              <div className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-system-blue font-mono font-bold flex items-center gap-1.5 leading-none mb-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-system-blue animate-ping" />
                SYSTEM AWAKENING
              </div>
              <h1 className="text-sm sm:text-lg font-black tracking-wider text-white uppercase font-display flex items-center gap-1.5">
                <span>BETTER LEVELING</span>
                <span className="text-[10px] sm:text-xs text-system-dark bg-system-cyan font-mono font-black px-1.5 py-0.5 rounded shadow-[0_0_8px_rgba(0,240,255,0.8)]">v2</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Level Badge */}
            <div className="flex items-center gap-1 bg-system-panel border border-system-blue/40 px-2 sm:px-3 py-1 rounded-lg">
              <span className="text-[9px] sm:text-[10px] text-zinc-400 font-mono uppercase">LV.</span>
              <span className="text-sm sm:text-base font-black text-white font-mono text-glow leading-none">{state.level}</span>
            </div>

            {/* Rank Badge / VIP Account Button */}
            <button
              onClick={() => onNavigate?.('membership')}
              className={`px-2.5 sm:px-3 py-1 rounded-lg border text-[10px] sm:text-xs font-black tracking-widest uppercase font-mono flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer ${
                vipTier === "S-Rank VIP Guild" ? "bg-system-gold text-black border-system-gold shadow-glow-gold" : getRankColor(state.rank)
              }`}
              title="Click to manage Hunter Guild Account & VIP Membership"
            >
              {vipTier === "S-Rank VIP Guild" ? (
                <>
                  <Crown className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-black flex-shrink-0 animate-bounce" />
                  <span>VIP GUILD</span>
                </>
              ) : (
                <>
                  <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0" />
                  <span>{state.rank}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Center: XP Bar */}
        <div className="flex-1 max-w-lg w-full bg-system-panel/60 px-3 py-1.5 sm:py-2 rounded-xl border border-system-blue/20 flex items-center gap-3">
          <div className="flex-1 space-y-1">
            <div className="flex justify-between text-[10px] sm:text-xs font-mono font-semibold">
              <span className="text-zinc-400 flex items-center gap-1 uppercase tracking-wider">
                <Zap className="w-3 h-3 text-system-blue fill-system-blue/30 animate-pulse" /> XP PROGRESS
              </span>
              <span className="text-system-cyan font-bold">{state.xp} / {state.xpToNextLevel} <span className="text-zinc-400">({xpPercentage}%)</span></span>
            </div>
            <div className="w-full h-2 sm:h-2.5 bg-black/80 rounded-full overflow-hidden border border-white/10 p-0.5 shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-system-blue via-system-cyan to-white rounded-full transition-all duration-700 shadow-[0_0_10px_rgba(0,240,255,0.8)]"
                style={{ width: `${xpPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Bottom Row / Right: HP, MP, Streak & Stat Points Alert */}
        <div className="flex items-center justify-between md:justify-end gap-1.5 sm:gap-2.5 overflow-x-auto no-scrollbar py-0.5">
          {/* HP Bar */}
          <div className="flex items-center gap-1 sm:gap-1.5 bg-system-panel/80 px-2 sm:px-2.5 py-1 rounded-lg border border-red-500/30 text-[11px] sm:text-xs font-mono whitespace-nowrap shadow-sm" title="Recovery & Sleep Status">
            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-500 fill-red-500/20" />
            <span className="text-zinc-400 font-bold hidden sm:inline">HP:</span>
            <span className="text-red-400 font-bold">{state.hp}%</span>
          </div>

          {/* MP Bar */}
          <div className="flex items-center gap-1 sm:gap-1.5 bg-system-panel/80 px-2 sm:px-2.5 py-1 rounded-lg border border-blue-500/30 text-[11px] sm:text-xs font-mono whitespace-nowrap shadow-sm" title="Hydration & Mana Status">
            <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400 fill-blue-400/20" />
            <span className="text-zinc-400 font-bold hidden sm:inline">MP:</span>
            <span className="text-blue-300 font-bold">{state.mp}%</span>
          </div>

          {/* Streak */}
          <div className="flex items-center gap-1 sm:gap-1.5 bg-system-panel/80 px-2.5 sm:px-3 py-1 rounded-lg border border-system-gold/40 text-[11px] sm:text-xs font-mono font-bold text-system-gold shadow-[0_0_10px_rgba(255,215,0,0.15)] whitespace-nowrap">
            <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-system-gold animate-bounce" />
            <span>{state.streakDays}d <span className="hidden sm:inline">Streak</span></span>
          </div>

          {/* Available Stat Points Alert */}
          {state.stats.availablePoints > 0 && (
            <div className="animate-pulse bg-gradient-to-r from-system-purple/30 to-system-blue/30 border border-system-cyan px-2.5 sm:px-3 py-1 rounded-lg text-[11px] sm:text-xs font-mono font-black text-white flex items-center gap-1 shadow-[0_0_15px_rgba(0,240,255,0.6)] whitespace-nowrap">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-system-cyan animate-spin" />
              <span>+{state.stats.availablePoints} PTS</span>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
