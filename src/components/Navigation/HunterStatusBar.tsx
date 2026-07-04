"use client";

import React, { useEffect, useState } from 'react';
import { loadHunterState, HunterState } from '@/lib/hunter-system';
import { Shield, Zap, Flame, Award, Heart, Activity } from 'lucide-react';

export default function HunterStatusBar() {
  const [state, setState] = useState<HunterState | null>(null);

  useEffect(() => {
    setState(loadHunterState());

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
      case 'S-Rank': return 'text-system-gold border-system-gold shadow-glow-gold';
      case 'A-Rank': return 'text-system-purple border-system-purple shadow-glow-purple';
      case 'B-Rank': return 'text-system-blue border-system-blue shadow-glow-blue';
      default: return 'text-system-cyan border-system-cyan';
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-system-dark/90 backdrop-blur-md border-b border-system-blue/30 px-4 py-3 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left: System Title & Rank */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-system-panel border border-system-blue flex items-center justify-center shadow-glow-blue animate-pulse-glow">
              <Shield className="w-5 h-5 text-system-blue" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-system-blue font-bold flex items-center gap-1">
                <span className="inline-block w-2 h-2 rounded-full bg-system-blue animate-ping" />
                System Awakening
              </div>
              <h1 className="text-lg font-black tracking-wider text-white uppercase text-glow">
                Better Leveling <span className="text-xs text-system-cyan font-normal">v2</span>
              </h1>
            </div>
          </div>

          <div className={`px-3 py-1 rounded-full border text-xs font-black tracking-widest uppercase flex items-center gap-1.5 ${getRankColor(state.rank)} bg-system-panel`}>
            <Award className="w-3.5 h-3.5" />
            <span>{state.rank}</span>
            <span className="opacity-50">|</span>
            <span className="font-normal text-zinc-300">{state.title}</span>
          </div>
        </div>

        {/* Center: Level & XP Bar */}
        <div className="flex-1 max-w-md w-full flex items-center gap-3 bg-system-panel px-3 py-2 rounded-xl border border-system-blue/20">
          <div className="flex flex-col items-center justify-center min-w-[50px] bg-system-blue/10 border border-system-blue/40 rounded-lg py-1 px-2">
            <span className="text-[10px] text-system-cyan uppercase font-bold tracking-tighter">Level</span>
            <span className="text-xl font-black text-white leading-none text-glow">{state.level}</span>
          </div>

          <div className="flex-1 space-y-1">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-zinc-400 flex items-center gap-1">
                <Zap className="w-3 h-3 text-system-blue" /> XP Progress
              </span>
              <span className="text-system-cyan font-mono">{state.xp} / {state.xpToNextLevel} ({xpPercentage}%)</span>
            </div>
            <div className="w-full h-2.5 bg-black/60 rounded-full overflow-hidden border border-white/10 p-0.5">
              <div 
                className="h-full bg-gradient-to-r from-system-blue via-system-cyan to-white rounded-full transition-all duration-500 shadow-glow-blue"
                style={{ width: `${xpPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right: HP, MP, Streak & Stat Points */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          {/* HP Bar */}
          <div className="flex items-center gap-1.5 bg-system-panel px-2.5 py-1.5 rounded-lg border border-red-500/30 text-xs font-mono" title="Recovery & Sleep Status">
            <Heart className="w-4 h-4 text-red-500 fill-red-500/20" />
            <span className="text-red-400 font-bold">{state.hp}%</span>
          </div>

          {/* MP Bar */}
          <div className="flex items-center gap-1.5 bg-system-panel px-2.5 py-1.5 rounded-lg border border-blue-500/30 text-xs font-mono" title="Hydration & Mana Status">
            <Activity className="w-4 h-4 text-blue-400 fill-blue-400/20" />
            <span className="text-blue-300 font-bold">{state.mp}%</span>
          </div>

          {/* Streak */}
          <div className="flex items-center gap-1.5 bg-system-panel px-3 py-1.5 rounded-lg border border-system-gold/40 text-xs font-bold text-system-gold shadow-glow-gold">
            <Flame className="w-4 h-4 fill-system-gold animate-bounce" />
            <span>{state.streakDays} Day Streak</span>
          </div>

          {/* Available Stat Points Alert */}
          {state.stats.availablePoints > 0 && (
            <div className="animate-pulse bg-system-purple/20 border border-system-purple px-2.5 py-1 rounded-lg text-xs font-bold text-system-cyan flex items-center gap-1 shadow-glow-purple">
              <span className="w-2 h-2 rounded-full bg-system-cyan" />
              +{state.stats.availablePoints} PTS
            </div>
          )}
        </div>

      </div>
    </header>
  );
}
