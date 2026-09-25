"use client";

import React, { useEffect, useState } from 'react';
import { loadHunterState, HunterState } from '@/lib/hunter-system';
import { Shield, Zap, Flame, Award, Heart, Activity, Sparkles, Crown, Settings } from 'lucide-react';

interface HunterStatusBarProps {
  onNavigate?: (tab: string) => void;
}

export default function HunterStatusBar({ onNavigate }: HunterStatusBarProps) {
  const [state, setState] = useState<HunterState | null>(null);
  const [vipTier, setVipTier] = useState<string>("Unregistered");

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

    const handleCloudRestore = () => {
      setState(loadHunterState());
      const savedTier = localStorage.getItem("hunter_vip_tier");
      if (savedTier) setVipTier(savedTier);
    };

    window.addEventListener('hunterStateChanged', handleStateChange);
    window.addEventListener('hunterStateRestored', handleCloudRestore);
    window.addEventListener('storage', handleCloudRestore);
    return () => {
      window.removeEventListener('hunterStateChanged', handleStateChange);
      window.removeEventListener('hunterStateRestored', handleCloudRestore);
      window.removeEventListener('storage', handleCloudRestore);
    };
  }, []);

  if (!state) return null;

  const xpPercentage = Math.min(100, Math.floor((state.xp / state.xpToNextLevel) * 100));

  const getRankColor = (rank: string) => {
    switch (rank) {
      case 'Warrior of Light':
      case 'Hero of Etheirys': return 'text-system-gold border-system-gold bg-system-gold/10 shadow-glow-gold';
      case 'SOLDIER 1st Class': return 'text-system-purple border-system-purple bg-system-purple/10 shadow-glow-purple';
      case 'SOLDIER 3rd Class': return 'text-system-blue border-system-blue bg-system-blue/10 shadow-glow-blue';
      default: return 'text-system-cyan border-system-cyan/50 bg-system-cyan/10 shadow-[0_0_10px_rgba(0,240,255,0.2)]';
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#02060d]/95 backdrop-blur-xl border-b-2 border-system-blue px-3 sm:px-6 py-2 shadow-[0_10px_30px_rgba(0,240,255,0.15)] tech-border">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        
        {/* Top/Left: Party Member Info & Rank */}
        <div className="flex items-center justify-between gap-4 flex-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-system-panel border border-system-blue flex items-center justify-center shadow-glow-blue animate-pulse-glow flex-shrink-0" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-system-blue" />
            </div>
            <div>
              <div className="text-[10px] sm:text-xs uppercase tracking-widest text-system-blue font-mono font-bold flex items-center gap-2 leading-none mb-1">
                <span className="text-system-cyan font-black">{state.title || "NOVICE MERCENARY"}</span>
              </div>
              <h1 className="text-sm sm:text-xl font-black tracking-widest text-white uppercase flex items-center gap-2">
                <span>{state.profile?.name || "Cloud"}</span>
                <span className="text-[10px] sm:text-xs text-system-dark bg-system-cyan font-mono font-black px-1.5 py-0.5 rounded shadow-[0_0_8px_rgba(0,240,255,0.8)]">v2</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Level Badge */}
            <div className="flex items-center gap-1.5 bg-system-panel border border-system-blue/40 px-3 py-1.5">
              <span className="text-[10px] text-system-cyan font-mono uppercase font-bold">LV.</span>
              <span className="text-base sm:text-lg font-black text-white font-mono text-glow leading-none">{state.level}</span>
            </div>
          </div>
        </div>

        {/* Center: FF7 HP/MP/XP Bars */}
        <div className="flex-[1.5] w-full grid grid-cols-3 gap-3">
          
          {/* HP Bar */}
          <div className="flex flex-col justify-center bg-system-panel/40 px-3 py-1.5 border border-white/5">
            <div className="flex justify-between items-baseline mb-1">
              <span className="text-[10px] font-black text-system-green font-mono uppercase tracking-widest">HP</span>
              <span className="text-xs font-black text-white font-mono">{state.hp} <span className="text-zinc-500 text-[10px]">/ 100</span></span>
            </div>
            <div className="w-full h-1.5 bg-black overflow-hidden border border-white/10">
              <div className="h-full bg-system-green shadow-glow-green transition-all" style={{ width: `${state.hp}%` }} />
            </div>
          </div>

          {/* MP Bar */}
          <div className="flex flex-col justify-center bg-system-panel/40 px-3 py-1.5 border border-white/5">
            <div className="flex justify-between items-baseline mb-1">
              <span className="text-[10px] font-black text-system-blue font-mono uppercase tracking-widest">MP</span>
              <span className="text-xs font-black text-white font-mono">{state.mp} <span className="text-zinc-500 text-[10px]">/ 100</span></span>
            </div>
            <div className="w-full h-1.5 bg-black overflow-hidden border border-white/10">
              <div className="h-full bg-system-blue shadow-glow-blue transition-all" style={{ width: `${state.mp}%` }} />
            </div>
          </div>

          {/* XP Bar (Limit Break Style) */}
          <div className="flex flex-col justify-center bg-system-panel/40 px-3 py-1.5 border border-white/5">
            <div className="flex justify-between items-baseline mb-1">
              <span className="text-[10px] font-black text-system-red font-mono uppercase tracking-widest flex items-center gap-1">
                <Flame className="w-2.5 h-2.5" /> LIMIT
              </span>
              <span className="text-xs font-black text-white font-mono">{xpPercentage}%</span>
            </div>
            <div className="w-full h-1.5 bg-black overflow-hidden border border-white/10">
              <div className="h-full bg-gradient-to-r from-system-red to-system-gold shadow-glow-gold transition-all" style={{ width: `${xpPercentage}%` }} />
            </div>
          </div>

        </div>

        {/* Right: Actions */}
        <div className="flex items-center justify-between lg:justify-end gap-2 overflow-x-auto no-scrollbar py-1">
          {/* Rank Badge / VIP Account Button */}
          <button
            onClick={() => onNavigate?.('membership')}
            className={`px-3 py-1.5 border text-[10px] font-black tracking-widest uppercase font-mono flex items-center gap-1.5 transition-all hover:bg-white hover:text-black cursor-pointer whitespace-nowrap ${
              vipTier === "VIP Aetheryte Sector" ? "bg-system-gold text-black border-system-gold shadow-glow-gold" : getRankColor(state.rank)
            }`}
            title="Manage Avalanche Membership"
          >
            {vipTier === "VIP Aetheryte Sector" ? (
              <>
                <Crown className="w-3.5 h-3.5 fill-black flex-shrink-0 animate-bounce" />
                <span>VIP AETHERYTE</span>
              </>
            ) : (
              <>
                <Award className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{state.rank}</span>
              </>
            )}
          </button>

          {/* Settings Button */}
          <button
            onClick={() => onNavigate?.('settings')}
            className="flex items-center gap-1.5 bg-system-panel hover:bg-system-blue/20 px-3 py-1.5 border border-system-blue/40 text-[10px] font-mono font-bold text-system-cyan shadow-glow-blue transition-all cursor-pointer whitespace-nowrap"
            title="System Settings"
          >
            <Settings className="w-3.5 h-3.5 text-system-blue animate-spin-slow" />
            <span className="hidden sm:inline">SYSTEM</span>
          </button>

          {/* Available Stat Points Alert */}
          {state.stats.availablePoints > 0 && (
            <div className="animate-pulse bg-system-purple/20 border border-system-purple px-3 py-1.5 text-[10px] font-mono font-black text-white flex items-center gap-1.5 shadow-glow-purple whitespace-nowrap">
              <Sparkles className="w-3.5 h-3.5 text-system-purple" />
              <span>+{state.stats.availablePoints} PTS</span>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
