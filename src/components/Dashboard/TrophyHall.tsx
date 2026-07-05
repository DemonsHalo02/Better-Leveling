"use client";

import React, { useState, useEffect } from 'react';
import { loadHunterState, saveHunterState, triggerLevelUpCelebration, HunterState } from '@/lib/hunter-system';
import { Trophy, Crown, Award, Shield, Flame, CheckCircle2, Lock, Sparkles, Star, Dumbbell, Zap } from 'lucide-react';

interface TrophyItem {
  id: string;
  title: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  rarity: 'Legendary' | 'Epic' | 'Rare' | 'Common';
  unlocked: boolean;
  unlockCondition: string;
}

export default function TrophyHall() {
  const [hunterState, setHunterState] = useState<HunterState | null>(null);
  const [equippedTitle, setEquippedTitle] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [hasPr200, setHasPr200] = useState<boolean>(false);
  const [hasMeals, setHasMeals] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const state = loadHunterState();
      setHunterState(state);
      setEquippedTitle(state.title || 'Awakened Hunter');

      // Check user profile email
      const savedProfile = localStorage.getItem('pf_user_profile');
      if (savedProfile) {
        try {
          const parsed = JSON.parse(savedProfile);
          if (parsed.email) setUserEmail(parsed.email.toLowerCase());
        } catch {
          // ignore
        }
      }

      // Check PRs for >= 200 lbs
      const savedPrs = localStorage.getItem('pf_strength_prs');
      if (savedPrs) {
        try {
          const prList = JSON.parse(savedPrs);
          const maxWeight = Math.max(0, ...prList.map((p: { weightLbs: number }) => p.weightLbs || 0));
          if (maxWeight >= 200) setHasPr200(true);
        } catch {
          // ignore
        }
      }

      // Check logged meals today
      const today = new Date().toISOString().split('T')[0];
      const savedMeals = localStorage.getItem(`pf_meals_${today}`);
      if (savedMeals) {
        try {
          const mealList = JSON.parse(savedMeals);
          if (mealList.length > 0) setHasMeals(true);
        } catch {
          // ignore
        }
      }
    }
  }, []);

  if (!hunterState) return null;

  const isVip = userEmail === 'ncrossonofficial06@gmail.com' || true; // Permanently enabled for Nick as default S-Rank VIP

  const trophies: TrophyItem[] = [
    {
      id: 's_rank_vip',
      title: 'National Level Monarch',
      name: '👑 S-Rank VIP Hunter',
      description: 'Permanent VIP Guild Account status with unlimited access to all Shadow Monarch training directives.',
      icon: <Crown className="w-6 h-6 text-system-gold animate-pulse" />,
      rarity: 'Legendary',
      unlocked: isVip,
      unlockCondition: 'Verified S-Rank VIP Account (ncrossonofficial06@gmail.com)'
    },
    {
      id: 'boricua_shredder',
      title: 'Master of Tostones & Leche',
      name: '🍌 Boricua Shredder',
      description: 'Successfully log Puerto Rican cutting meals and hit your daily anabolic protein target.',
      icon: <Sparkles className="w-6 h-6 text-system-cyan" />,
      rarity: 'Epic',
      unlocked: hasMeals || hunterState.completedQuestsToday.calories || hunterState.completedQuestsToday.protein,
      unlockCondition: 'Log any Boricua meal prep item in the Nutrition Tracker'
    },
    {
      id: 'iron_monarch',
      title: 'Lewiston 200+ lb Beast',
      name: '⚔️ Iron Monarch',
      description: 'Conquer gravity by recording a max strength lift of 200 lbs or greater at Planet Fitness Lewiston.',
      icon: <Trophy className="w-6 h-6 text-red-400" />,
      rarity: 'Legendary',
      unlocked: hasPr200 || hunterState.stats.str >= 12,
      unlockCondition: 'Record a Strength PR of 200+ lbs in the PR Vault'
    },
    {
      id: 'popeye_veins',
      title: 'Forearm & Grip Master',
      name: '⚡ Popeye Vascularity',
      description: 'Execute high-intensity forearm and grip accessory work on Tuesday and Friday Pull days.',
      icon: <Dumbbell className="w-6 h-6 text-system-blue" />,
      rarity: 'Rare',
      unlocked: hunterState.completedQuestsToday.workout || hunterState.level >= 3,
      unlockCondition: 'Complete a Pull workout quest or reach Hunter Level 3'
    },
    {
      id: 'consistent_vanguard',
      title: 'Unstoppable Disciplinarian',
      name: '🔥 Consistent Vanguard',
      description: 'Maintain strict daily discipline without missing a check-in or workout for 3 consecutive days.',
      icon: <Flame className="w-6 h-6 text-system-gold" />,
      rarity: 'Epic',
      unlocked: hunterState.streakDays >= 3 || hunterState.level >= 10,
      unlockCondition: 'Achieve a 3+ day discipline streak'
    },
    {
      id: 'dungeon_striker',
      title: 'Awakened Raid Captain',
      name: '🦍 Dungeon Striker',
      description: 'Awaken your latent abilities and rise above the E-Rank vanguard into elite guild leadership.',
      icon: <Shield className="w-6 h-6 text-purple-400" />,
      rarity: 'Common',
      unlocked: true,
      unlockCondition: 'Awaken the System (Default Unlocked)'
    }
  ];

  const handleEquip = (trophy: TrophyItem) => {
    if (!trophy.unlocked) return;

    const state = loadHunterState();
    state.title = trophy.title;
    saveHunterState(state);
    setEquippedTitle(trophy.title);
    triggerLevelUpCelebration();
  };

  const getRarityBadge = (rarity: TrophyItem['rarity']) => {
    switch (rarity) {
      case 'Legendary':
        return 'bg-system-gold/20 text-system-gold border-system-gold/50 shadow-glow-gold';
      case 'Epic':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/50 shadow-glow-purple';
      case 'Rare':
        return 'bg-system-blue/20 text-system-cyan border-system-blue/50 shadow-glow-blue';
      default:
        return 'bg-zinc-800 text-zinc-300 border-zinc-700';
    }
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300">
      
      {/* Header Deck */}
      <div className="bg-system-panel p-6 sm:p-8 rounded-2xl border border-system-gold/40 shadow-glow-gold/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-system-gold/5 rounded-full -mr-20 -mt-20 pointer-events-none blur-2xl" />
        <div className="space-y-2 relative z-10">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-system-gold">
            <Trophy className="w-4 h-4 text-system-gold animate-bounce" />
            <span>S-Rank VIP Guild Hall | Auburn & Lewiston Sector</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-wider text-white uppercase font-display">
            Hunter Trophy Hall
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl leading-relaxed">
            Unlock legendary titles by crushing your Planet Fitness workouts and Boricua nutrition targets. Equip any unlocked title to display it across your top Hunter Status Bar!
          </p>
        </div>

        <div className="bg-system-dark/90 border border-system-gold/50 p-4 rounded-xl flex items-center gap-4 shadow-lg relative z-10 min-w-[240px]">
          <div className="w-12 h-12 rounded-xl bg-system-gold/20 border border-system-gold flex items-center justify-center text-system-gold shadow-glow-gold flex-shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] font-mono text-zinc-400 uppercase">Currently Equipped Title:</div>
            <div className="text-sm font-black text-system-gold uppercase font-mono tracking-wide">
              {equippedTitle || 'Awakened Hunter'}
            </div>
          </div>
        </div>
      </div>

      {/* Trophies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {trophies.map((trophy) => {
          const isEquipped = equippedTitle === trophy.title;

          return (
            <div
              key={trophy.id}
              className={`bg-system-panel p-6 rounded-2xl border transition-all relative overflow-hidden flex flex-col justify-between group ${
                trophy.unlocked
                  ? isEquipped
                    ? 'border-system-gold shadow-glow-gold bg-gradient-to-b from-system-panel to-system-gold/10'
                    : 'border-system-blue/40 hover:border-system-cyan shadow-lg hover:shadow-glow-blue/20'
                  : 'border-white/5 opacity-60 bg-black/40'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
                    trophy.unlocked ? 'bg-system-dark border-white/20' : 'bg-black border-white/5 text-zinc-600'
                  }`}>
                    {trophy.unlocked ? trophy.icon : <Lock className="w-5 h-5 text-zinc-600" />}
                  </div>
                  <span className={`text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded border ${getRarityBadge(trophy.rarity)}`}>
                    {trophy.rarity}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-mono text-system-cyan uppercase tracking-wider">
                    Title: "{trophy.title}"
                  </div>
                  <h3 className="text-lg font-black text-white uppercase tracking-wide flex items-center gap-2">
                    {trophy.name}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed mt-2">
                    {trophy.description}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                <div className="text-[10px] font-mono text-zinc-500 line-clamp-1 flex-1">
                  {trophy.unlocked ? '✅ Unlocked' : `🔒 ${trophy.unlockCondition}`}
                </div>

                <button
                  onClick={() => handleEquip(trophy)}
                  disabled={!trophy.unlocked || isEquipped}
                  className={`px-4 py-2 rounded-xl font-black uppercase text-xs tracking-wider transition-all min-h-[38px] flex items-center gap-1.5 ${
                    isEquipped
                      ? 'bg-system-gold text-black shadow-glow-gold cursor-default font-mono'
                      : trophy.unlocked
                      ? 'bg-gradient-to-r from-system-blue to-system-cyan text-black hover:bg-white shadow-glow-blue cursor-pointer'
                      : 'bg-zinc-800 text-zinc-600 cursor-not-allowed border border-white/5'
                  }`}
                >
                  {isEquipped ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Equipped</span>
                    </>
                  ) : trophy.unlocked ? (
                    <>
                      <Star className="w-3.5 h-3.5 fill-black" />
                      <span>Equip Title</span>
                    </>
                  ) : (
                    <span>Locked</span>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
