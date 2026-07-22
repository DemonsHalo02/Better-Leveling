"use client";

import React, { useState, useEffect } from 'react';
import { Crown, Lock, Sparkles, TrendingDown, Utensils, Award, CheckCircle2, Sliders, Calendar, Flame, Zap, ArrowRight, Shield, Palette } from 'lucide-react';
import { loadHunterState, saveHunterState, awardXp, HunterState } from '@/lib/hunter-system';
import confetti from 'canvas-confetti';

interface VipPremiumShowcaseProps {
  userTier: "E-Rank Free" | "S-Rank VIP Guild";
  onUpgradeClick?: () => void;
}

export default function VipPremiumShowcase({ userTier, onUpgradeClick }: VipPremiumShowcaseProps) {
  const [state, setState] = useState<HunterState | null>(null);

  // Recomposition Lab Slider States
  const [weeklyLossRate, setWeeklyLossRate] = useState<number>(1.0); // lbs per week
  const [simulatedProtein, setSimulatedProtein] = useState<number>(178); // grams
  const [cardioDays, setCardioDays] = useState<number>(3); // days per week

  // Claimed VIP Trophies
  const [claimedTrophies, setClaimedTrophies] = useState<Record<string, boolean>>({});
  const [showClaimToast, setShowClaimToast] = useState<string | null>(null);

  useEffect(() => {
    setState(loadHunterState());
    const handleUpdate = () => setState({ ...loadHunterState() });
    window.addEventListener('hunterStateChanged', handleUpdate);
    if (typeof window !== 'undefined') {
      const savedTrophies = localStorage.getItem('pf_vip_trophies_claimed');
      if (savedTrophies) setClaimedTrophies(JSON.parse(savedTrophies));
    }
    return () => window.removeEventListener('hunterStateChanged', handleUpdate);
  }, []);

  if (!state) return null;

  const isVip = userTier === "S-Rank VIP Guild";
  const startWeight = state.profile?.startWeight || 242;
  const targetWeight = state.profile?.targetWeight || 160;
  const currentWeight = state.profile?.currentWeight || startWeight;
  const lbsRemaining = Math.max(0, Number((currentWeight - targetWeight).toFixed(1)));

  // Calculate simulation dates & calories
  const weeksNeeded = weeklyLossRate > 0 ? Math.ceil(lbsRemaining / weeklyLossRate) : 100;
  const projectedDate = new Date();
  projectedDate.setDate(projectedDate.getDate() + (weeksNeeded * 7));
  const formattedProjectedDate = projectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  // Estimated daily calorie deficit required for slider rate
  const baseTdee = 2850; // estimated maintenance for 242 lb active male
  const dailyDeficit = Math.round((weeklyLossRate * 3500) / 7);
  const cardioBurn = cardioDays * 120; // ~120 kcal per session amortized
  const simulatedCalories = Math.max(1500, baseTdee - dailyDeficit + Math.round(cardioBurn / 7));

  // Lean Muscle Preservation Score
  const proteinRatio = simulatedProtein / 178;
  const musclePreservation = Math.min(99.8, Math.max(88.0, Number((94.5 + (proteinRatio * 4.5) - (weeklyLossRate > 1.5 ? (weeklyLossRate - 1.5) * 3 : 0)).toFixed(1))));

  const handleClaimVipTrophy = (id: string, name: string, xp: number) => {
    if (!isVip) {
      onUpgradeClick?.();
      return;
    }
    if (claimedTrophies[id]) return;

    const updated = { ...claimedTrophies, [id]: true };
    setClaimedTrophies(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('pf_vip_trophies_claimed', JSON.stringify(updated));
    }

    awardXp(xp, 'str');

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ffd700', '#00f0ff', '#7000ff']
      });
    } catch {}

    setShowClaimToast(`Claimed ${name} (+${xp} XP)!`);
    setTimeout(() => setShowClaimToast(null), 4000);
  };

  const vipTrophies = [
    { id: 'vip_founder', name: 'S-Rank Guild Founder', desc: 'Unlocked the highest echelon of Shadow Monarch fitness coaching.', xp: 500, icon: '👑' },
    { id: 'vip_recomp', name: 'Titanium Recomposition Master', desc: 'Simulated and executed a precision cutting blueprint.', xp: 500, icon: '⚡' },
    { id: 'vip_oracle', name: 'Shadow Monarch VIP Vanguard', desc: 'Dedicated to achieving 160 LBS with zero muscle loss.', xp: 500, icon: '🔥' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Toast Notification */}
      {showClaimToast && (
        <div className="fixed top-20 right-4 z-50 bg-gradient-to-r from-system-gold to-yellow-500 text-black px-6 py-3.5 rounded-xl font-black uppercase text-sm tracking-wider shadow-glow-gold flex items-center gap-3 animate-in fade-in slide-in-from-top duration-300">
          <CheckCircle2 className="w-5 h-5 fill-black text-system-gold" />
          <span>{showClaimToast}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-system-gold/20 via-system-panel to-system-dark p-6 border-2 border-system-gold/60 shadow-glow-gold flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-system-gold/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
        
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-system-gold/20 border border-system-gold text-system-gold text-xs font-mono uppercase tracking-widest font-bold">
            <Crown className="w-3.5 h-3.5 text-system-gold animate-bounce" />
            S-Rank VIP Exclusive Suite
          </div>
          <h2 className="text-2xl md:text-3xl font-black tracking-wider text-white uppercase text-glow flex items-center gap-2.5">
            <span>VIP AI COACH & RECOMPOSITION LAB</span>
          </h2>
          <p className="text-zinc-300 text-sm max-w-2xl leading-relaxed">
            Unlock advanced AI recomposition projections, interactive macro cutting simulations, and exclusive S-Rank Golden Trophies designed for elite VIP Hunters.
          </p>
        </div>

        {!isVip && (
          <button
            onClick={onUpgradeClick}
            className="relative z-10 flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-system-gold via-yellow-400 to-system-gold text-black font-black uppercase text-sm tracking-widest shadow-glow-gold hover:scale-105 transition-all w-full md:w-auto justify-center cursor-pointer animate-pulse"
          >
            <Lock className="w-4 h-4 fill-black" />
            <span>Unlock S-Rank VIP Access</span>
          </button>
        )}
      </div>

      {/* TOOL 1: 🤖 S-Rank AI Fitness Coach & Oracle */}
      <div className={`relative bg-system-panel rounded-2xl p-6 border border-system-blue/40 shadow-xl space-y-6 overflow-hidden transition-all ${
        !isVip ? 'opacity-80' : ''
      }`}>
        {!isVip && (
          <div className="absolute inset-0 z-20 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-system-gold/20 border-2 border-system-gold flex items-center justify-center shadow-glow-gold">
              <Lock className="w-7 h-7 text-system-gold animate-pulse" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-black text-white uppercase tracking-wider">AI Coach Oracle Locked</h3>
              <p className="text-xs text-zinc-300 max-w-md">
                S-Rank VIP Guild members receive custom weekly caloric adjustments, loose skin prevention advice, and tailored meal preps across the 19-Country Global Master Deck!
              </p>
            </div>
            <button
              onClick={onUpgradeClick}
              className="px-6 py-3 rounded-xl bg-system-gold text-black font-black uppercase text-xs tracking-widest shadow-glow-gold hover:scale-105 transition-all cursor-pointer"
            >
              Unlock Now ($9.99/mo)
            </button>
          </div>
        )}

        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <div className="w-10 h-10 rounded-xl bg-system-blue/10 border border-system-blue flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-system-blue animate-spin-slow" />
          </div>
          <div>
            <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-system-cyan">VIP AI Intelligence Engine</div>
            <h3 className="text-lg font-black text-white uppercase tracking-wider">Weekly Boss Raid Strategy & Meal Advisor</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
          <div className="bg-system-dark/80 p-4 rounded-xl border border-system-blue/30 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-system-cyan uppercase">
              <TrendingDown className="w-4 h-4" /> 1. Pacing & Cardio Assessment
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              At <strong>{currentWeight} LBS</strong>, you have <strong>{lbsRemaining} LBS</strong> left to shred. Your current pace preserves maximum muscle. <strong>AI Recommendation:</strong> Add 15 mins of incline treadmill walking (3.0 mph, 10% incline) after your Planet Fitness PPL or Home Bodyweight workouts on Tuesday and Thursday!
            </p>
          </div>

          <div className="bg-system-dark/80 p-4 rounded-xl border border-system-gold/40 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-system-gold uppercase">
              <Utensils className="w-4 h-4" /> 2. 19-Country Global Meal Blueprints
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              <strong>VIP Meal Blueprint Suite:</strong> Access all 38 Cutting & Bulking plans across 19 world-class cuisines (Puerto Rico, USA, Canada, Mexico, Dominican Republic, El Salvador, Colombia, Brazil, Venezuela, Argentina, Spain, Italy, France, Germany, Russia, Japan, Korea, China, and India)! Each blueprint features pan or oven crispy chicken, authentic regional spices, clean complex carbs, and your morning national coffee/tea. <strong>Stats:</strong> ~2,080 kcal (Cutting) or ~2,680 kcal (Bulking), 178g+ Protein!
            </p>
          </div>

          <div className="bg-system-dark/80 p-4 rounded-xl border border-system-purple/40 space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-system-purple uppercase">
              <Shield className="w-4 h-4" /> 3. Skin Retraction Protocol
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              To ensure zero loose skin as you approach 160 lbs, keep daily hydration above <strong>1 Gallon</strong> and hit <strong>{simulatedProtein}g protein</strong> daily. This supports collagen elasticity and subcutaneous muscle density!
            </p>
          </div>
        </div>
      </div>

      {/* TOOL 2: 📊 S-Rank Body Recomposition & Macro Simulation Lab */}
      <div className={`relative bg-system-panel rounded-2xl p-6 border border-system-cyan/40 shadow-xl space-y-6 overflow-hidden transition-all ${
        !isVip ? 'opacity-80' : ''
      }`}>
        {!isVip && (
          <div className="absolute inset-0 z-20 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-system-cyan/20 border-2 border-system-cyan flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.4)]">
              <Sliders className="w-7 h-7 text-system-cyan animate-pulse" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-black text-white uppercase tracking-wider">Recomposition Lab Locked</h3>
              <p className="text-xs text-zinc-300 max-w-md">
                Simulate different weight loss speeds, daily protein intakes, and cardio sessions to project your exact transformation completion date!
              </p>
            </div>
            <button
              onClick={onUpgradeClick}
              className="px-6 py-3 rounded-xl bg-system-cyan text-black font-black uppercase text-xs tracking-widest shadow-[0_0_15px_rgba(0,240,255,0.6)] hover:scale-105 transition-all cursor-pointer"
            >
              Unlock Simulation Lab
            </button>
          </div>
        )}

        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-system-cyan/10 border border-system-cyan flex items-center justify-center">
              <Sliders className="w-5 h-5 text-system-cyan" />
            </div>
            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-system-cyan">Interactive Body Architecture Lab</div>
              <h3 className="text-lg font-black text-white uppercase tracking-wider">Target Recomposition & Timeline Simulator</h3>
            </div>
          </div>
          <span className="hidden sm:inline bg-system-cyan/20 text-system-cyan text-xs font-mono font-black px-3 py-1 rounded-full border border-system-cyan/30">
            Live Recomposing Engine
          </span>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono">
          
          {/* Slider 1: Loss Rate */}
          <div className="bg-system-dark/80 p-4 rounded-xl border border-white/10 space-y-3">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-zinc-300 uppercase">Target Loss Pace</span>
              <span className="text-system-cyan font-black">{weeklyLossRate} LBS / WK</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2.5"
              step="0.1"
              value={weeklyLossRate}
              onChange={(e) => setWeeklyLossRate(parseFloat(e.target.value))}
              disabled={!isVip}
              className="w-full accent-system-cyan cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-zinc-500 font-bold">
              <span>0.5 LBS (Slow)</span>
              <span>1.0 LBS (Gold)</span>
              <span>2.5 LBS (Rapid)</span>
            </div>
          </div>

          {/* Slider 2: Daily Protein */}
          <div className="bg-system-dark/80 p-4 rounded-xl border border-white/10 space-y-3">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-zinc-300 uppercase">Daily Protein Target</span>
              <span className="text-system-gold font-black">{simulatedProtein}g / DAY</span>
            </div>
            <input
              type="range"
              min="150"
              max="260"
              step="2"
              value={simulatedProtein}
              onChange={(e) => setSimulatedProtein(parseInt(e.target.value))}
              disabled={!isVip}
              className="w-full accent-system-gold cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-zinc-500 font-bold">
              <span>150g (Min)</span>
              <span>178g (Puerto Rican Goal)</span>
              <span>260g (Max)</span>
            </div>
          </div>

          {/* Slider 3: Cardio Frequency */}
          <div className="bg-system-dark/80 p-4 rounded-xl border border-white/10 space-y-3">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-zinc-300 uppercase">Weekly Cardio (Dojo/PF)</span>
              <span className="text-system-purple font-black">{cardioDays} DAYS / WK</span>
            </div>
            <input
              type="range"
              min="0"
              max="6"
              step="1"
              value={cardioDays}
              onChange={(e) => setCardioDays(parseInt(e.target.value))}
              disabled={!isVip}
              className="w-full accent-system-purple cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-zinc-500 font-bold">
              <span>0 Days</span>
              <span>3 Days (Optimal)</span>
              <span>6 Days</span>
            </div>
          </div>
        </div>

        {/* Live Simulated Outputs Box */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-gradient-to-r from-system-dark via-system-panel to-system-card p-5 rounded-2xl border-2 border-system-cyan/50 shadow-lg">
          <div className="text-center sm:text-left space-y-1 border-b sm:border-b-0 sm:border-r border-white/10 pb-3 sm:pb-0 sm:pr-4">
            <div className="text-[10px] font-mono font-bold uppercase text-zinc-400 flex items-center justify-center sm:justify-start gap-1">
              <Calendar className="w-3.5 h-3.5 text-system-cyan" /> Projected Completion
            </div>
            <div className="text-xl sm:text-2xl font-black text-white font-mono text-glow">
              {formattedProjectedDate}
            </div>
            <div className="text-[11px] font-mono text-system-cyan">({weeksNeeded} Weeks remaining)</div>
          </div>

          <div className="text-center sm:text-left space-y-1 border-b sm:border-b-0 sm:border-r border-white/10 pb-3 sm:pb-0 sm:pr-4">
            <div className="text-[10px] font-mono font-bold uppercase text-zinc-400 flex items-center justify-center sm:justify-start gap-1">
              <Utensils className="w-3.5 h-3.5 text-system-gold" /> Required Daily Cal
            </div>
            <div className="text-xl sm:text-2xl font-black text-system-gold font-mono">
              {simulatedCalories} kcal
            </div>
            <div className="text-[11px] font-mono text-zinc-400">Includes +{Math.round(cardioBurn/7)} daily cardio burn</div>
          </div>

          <div className="text-center sm:text-left space-y-1">
            <div className="text-[10px] font-mono font-bold uppercase text-zinc-400 flex items-center justify-center sm:justify-start gap-1">
              <Award className="w-3.5 h-3.5 text-green-400" /> Lean Mass Retained
            </div>
            <div className="text-xl sm:text-2xl font-black text-green-400 font-mono">
              {musclePreservation}%
            </div>
            <div className="text-[11px] font-mono text-green-300">Optimal skin elasticity score</div>
          </div>
        </div>
      </div>

      {/* TOOL 3: 🏆 VIP Guild Exclusive Golden Trophies (+1,500 XP) */}
      <div className="bg-system-panel rounded-2xl p-6 border border-system-gold/50 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-system-gold/10 border border-system-gold flex items-center justify-center">
              <Award className="w-5 h-5 text-system-gold animate-bounce" />
            </div>
            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-system-gold">Exclusive Guild Rewards</div>
              <h3 className="text-lg font-black text-white uppercase tracking-wider">S-Rank VIP Golden Trophies (+1,500 XP)</h3>
            </div>
          </div>
          <span className="text-xs font-mono text-zinc-400 hidden sm:inline">
            Claimable by active VIP members
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {vipTrophies.map((trophy) => {
            const isClaimed = claimedTrophies[trophy.id];
            return (
              <div
                key={trophy.id}
                onClick={() => handleClaimVipTrophy(trophy.id, trophy.name, trophy.xp)}
                className={`p-4 rounded-xl border flex flex-col justify-between gap-3 transition-all transform hover:scale-[1.02] cursor-pointer ${
                  isClaimed
                    ? 'bg-green-500/10 border-green-500/40 text-green-300 shadow-[0_0_15px_rgba(34,197,94,0.15)]'
                    : isVip
                    ? 'bg-gradient-to-br from-system-dark to-system-panel border-system-gold/60 hover:border-system-gold shadow-glow-gold text-white'
                    : 'bg-system-dark/80 border-white/10 text-zinc-400 opacity-70 hover:opacity-100'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{trophy.icon}</span>
                    <span className="text-xs font-mono font-black text-system-gold bg-system-gold/10 px-2.5 py-0.5 rounded border border-system-gold/30">
                      +{trophy.xp} XP
                    </span>
                  </div>
                  <h4 className="text-sm font-black text-white uppercase line-clamp-1">{trophy.name}</h4>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed line-clamp-2">{trophy.desc}</p>
                </div>

                <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                  {isClaimed ? (
                    <span className="text-xs font-bold text-green-400 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Claimed Reward
                    </span>
                  ) : isVip ? (
                    <span className="text-xs font-bold text-system-gold flex items-center gap-1 animate-pulse">
                      <Sparkles className="w-3.5 h-3.5" /> Click to Claim
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-zinc-500 flex items-center gap-1">
                      <Lock className="w-3.5 h-3.5" /> VIP Unlock Req.
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* TOOL 4: 🎨 Shadow Monarch Art & Manhua Vault (Cloud Gallery) */}
      <div className={`relative bg-system-panel rounded-2xl p-6 border border-system-purple/50 shadow-xl space-y-4 overflow-hidden transition-all ${
        !isVip ? 'opacity-80' : ''
      }`}>
        {!isVip && (
          <div className="absolute inset-0 z-20 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-system-purple/20 border-2 border-system-purple flex items-center justify-center shadow-glow-purple">
              <Lock className="w-7 h-7 text-system-purple animate-pulse" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-black text-white uppercase tracking-wider">Art & Manhua Vault Locked</h3>
              <p className="text-xs text-zinc-300 max-w-md">
                S-Rank VIP Guild members get exclusive access to view high-res artwork, read manhua chapters, and leave likes, dislikes, and comments!
              </p>
            </div>
            <button
              onClick={onUpgradeClick}
              className="px-6 py-3 rounded-xl bg-system-purple text-white font-black uppercase text-xs tracking-widest shadow-glow-purple hover:scale-105 transition-all cursor-pointer"
            >
              Unlock Art Vault ($9.99/mo)
            </button>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-system-purple/10 border border-system-purple flex items-center justify-center">
              <Palette className="w-5 h-5 text-system-purple animate-spin-slow" />
            </div>
            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-system-purple">Cloud Storage Powered Gallery</div>
              <h3 className="text-lg font-black text-white uppercase tracking-wider">Shadow Monarch Art & Manhua Vault</h3>
            </div>
          </div>
          {isVip && (
            <span className="bg-system-purple/20 text-system-purple text-xs font-mono font-black px-3 py-1 rounded-full border border-system-purple/30">
              VIP Access Unlocked
            </span>
          )}
        </div>

        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
          As a VIP Hunter or Creator, access our Cloud Storage Art Vault. High-resolution art and manhua chapters are uploaded directly by the creator (<span className="text-system-gold font-mono">nickcrossonofficial@outlook.com</span>). Like your favorite chapters and discuss in the guild comments!
        </p>
      </div>

    </div>
  );
}
