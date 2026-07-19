"use client";

import React, { useState, useEffect } from 'react';
import { Sparkles, Zap, Flame, Quote, Check, Copy, Crown } from 'lucide-react';
import { awardXp } from '@/lib/hunter-system';
import confetti from 'canvas-confetti';

const DIRECTIVE_QUOTES = [
  {
    quote: "A hunter who fears the weights will never rise above E-Rank. Step into Planet Fitness and conquer the iron.",
    author: "Shadow Monarch System",
    stat: "STR FOCUS"
  },
  {
    quote: "Your target weight of 160 LBS is not a dream—it is an inevitability forged through daily discipline and macro precision.",
    author: "Korean Gochujang Cutting Codex",
    stat: "VIT FOCUS"
  },
  {
    quote: "When fatigue sets in during the 4th set, remember: the system only rewards those who push beyond their perceived limits.",
    author: "Awakened Hunter Guidance",
    stat: "AGI FOCUS"
  },
  {
    quote: "Meal prep is the armor of the modern hunter. A clean kitchen builds an unbreakable physique.",
    author: "Shadow Monarch System",
    stat: "INT FOCUS"
  },
  {
    quote: "Consistency is your strongest skill. Do not break the daily streak; let your discipline terrify the weakness within you.",
    author: "S-Rank Vanguard",
    stat: "PER FOCUS"
  },
  {
    quote: "Hydration fuels mana. Drink your gallon today so tomorrow's workout is unstoppable.",
    author: "System Recovery Oracle",
    stat: "VIT FOCUS"
  },
  {
    quote: "You did not awaken just to remain average. Lift heavy, track your macros, and claim your S-Rank destiny.",
    author: "Shadow Monarch System",
    stat: "ALL STATS"
  }
];

interface MotivationOracleProps {
  onNavigate?: (tab: string) => void;
}

export default function MotivationOracle({ onNavigate }: MotivationOracleProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [xpClaimed, setXpClaimed] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [isVip, setIsVip] = useState<boolean>(false);

  useEffect(() => {
    // Randomize initial quote
    setCurrentIndex(Math.floor(Math.random() * DIRECTIVE_QUOTES.length));
    if (typeof window !== 'undefined') {
      const today = new Date().toISOString().split('T')[0];
      const claimedDate = localStorage.getItem('pf_oracle_xp_date');
      if (claimedDate === today) {
        setXpClaimed(true);
      }
      const tier = localStorage.getItem('hunter_vip_tier');
      if (tier === "S-Rank VIP Guild") setIsVip(true);
    }
  }, []);

  const handleGenerateNext = () => {
    let nextIdx = Math.floor(Math.random() * DIRECTIVE_QUOTES.length);
    while (nextIdx === currentIndex && DIRECTIVE_QUOTES.length > 1) {
      nextIdx = Math.floor(Math.random() * DIRECTIVE_QUOTES.length);
    }
    setCurrentIndex(nextIdx);

    // Award daily oracle XP
    if (!xpClaimed) {
      awardXp(15, 'per');
      setXpClaimed(true);
      if (typeof window !== 'undefined') {
        const today = new Date().toISOString().split('T')[0];
        localStorage.setItem('pf_oracle_xp_date', today);
      }
      try {
        confetti({
          particleCount: 40,
          spread: 50,
          origin: { y: 0.7 },
          colors: ['#00f0ff', '#ffd700']
        });
      } catch {}
    }
  };

  const handleCopy = () => {
    const current = DIRECTIVE_QUOTES[currentIndex];
    navigator.clipboard.writeText(`"${current.quote}" - ${current.author} [Better Leveling v2]`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const current = DIRECTIVE_QUOTES[currentIndex] || DIRECTIVE_QUOTES[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in duration-300">
      
      {/* Left 8 Cols: General Feature - Motivation & Directive Oracle */}
      <div className="lg:col-span-8 bg-gradient-to-r from-system-panel via-system-card to-system-dark p-6 rounded-2xl border border-system-blue/40 shadow-xl relative overflow-hidden flex flex-col justify-between gap-6">
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-system-blue/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-system-blue/10 border border-system-blue flex items-center justify-center shadow-glow-blue">
              <Zap className="w-5 h-5 text-system-blue animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-black uppercase tracking-widest text-system-cyan bg-system-blue/20 px-2 py-0.5 rounded border border-system-blue/30">
                  ⚡ General Hunter Feature
                </span>
                <span className="text-xs font-mono text-zinc-400">Daily Wisdom Codex</span>
              </div>
              <h3 className="text-lg font-black text-white uppercase tracking-wider mt-0.5">
                Shadow Monarch Daily Directive Oracle
              </h3>
            </div>
          </div>

          <span className="bg-system-dark/80 text-system-cyan text-xs font-mono font-bold px-3 py-1 rounded-lg border border-system-blue/30">
            {current.stat}
          </span>
        </div>

        {/* Quote Content */}
        <div className="relative pl-6 border-l-4 border-system-cyan py-2 my-2">
          <Quote className="absolute -left-3 -top-2 w-6 h-6 text-system-cyan/30 transform -scale-x-100" />
          <p className="text-base sm:text-lg font-bold text-white leading-relaxed italic">
            "{current.quote}"
          </p>
          <div className="mt-2 text-xs font-mono font-bold text-system-gold uppercase tracking-widest">
            — {current.author}
          </div>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/10">
          <div className="flex items-center gap-2">
            <button
              onClick={handleGenerateNext}
              className="px-5 py-2.5 rounded-xl bg-system-blue text-system-dark font-black text-xs uppercase tracking-wider hover:bg-white transition-all shadow-glow-blue flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 fill-current" />
              <span>Generate Directive</span>
            </button>

            <button
              onClick={handleCopy}
              className="p-2.5 rounded-xl bg-system-dark/80 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white transition-all flex items-center gap-1.5 text-xs font-mono cursor-pointer"
              title="Copy quote to clipboard"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              <span className="hidden sm:inline">{copied ? "Copied!" : "Copy"}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {!xpClaimed ? (
              <span className="text-xs font-mono font-bold text-system-cyan bg-system-cyan/10 px-3 py-1 rounded-lg border border-system-cyan/30 animate-pulse">
                Click Generate for +15 Daily XP!
              </span>
            ) : (
              <span className="text-xs font-mono font-bold text-system-gold bg-system-gold/10 px-3 py-1 rounded-lg border border-system-gold/30">
                +15 Daily Oracle XP Claimed!
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Right 4 Cols: VIP Premium Feature Teaser & Quick Link */}
      <div className="lg:col-span-4 bg-gradient-to-br from-system-panel via-system-card to-system-dark p-6 rounded-2xl border-2 border-system-gold/50 shadow-glow-gold flex flex-col justify-between gap-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-system-gold/10 rounded-full blur-2xl pointer-events-none animate-pulse" />

        <div className="space-y-3 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-system-gold/20 border border-system-gold text-system-gold text-[10px] font-mono uppercase tracking-widest font-bold">
            <Crown className="w-3 h-3 fill-system-gold animate-bounce" />
            S-Rank VIP Exclusive Suite
          </div>
          <h3 className="text-xl font-black text-white uppercase tracking-wider text-glow-gold">
            AI Coach & Recomposition Lab
          </h3>
          <p className="text-xs text-zinc-300 leading-relaxed">
            {isVip 
              ? "Your S-Rank VIP privileges are active! Access your custom weekly cutting schedule, skin retention advice, and macro simulation lab."
              : "Upgrade to the S-Rank VIP Guild to unlock the AI Recomposing Simulator, custom meal blueprints, and exclusive +1,500 XP golden trophies!"
            }
          </p>
        </div>

        <button
          onClick={() => onNavigate?.('membership')}
          className="relative z-10 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-system-gold via-yellow-400 to-system-gold text-black font-black uppercase text-xs tracking-widest shadow-glow-gold hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer animate-pulse"
        >
          <Crown className="w-4 h-4 fill-black" />
          <span>{isVip ? "Open S-Rank VIP Lab" : "Explore S-Rank Perks & Upgrade"}</span>
        </button>
      </div>

    </div>
  );
}
