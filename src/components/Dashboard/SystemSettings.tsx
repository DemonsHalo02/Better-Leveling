"use client";

import React, { useState, useEffect } from 'react';
import { loadHunterState, updateUserProfile, HunterState, UserProfile } from '@/lib/hunter-system';
import { Shield, Settings, User, Dumbbell, Utensils, Scale, ShoppingBag, Sparkles, Save, RotateCcw, CheckCircle2, ArrowRight, Flame, Trophy, Calendar } from 'lucide-react';
import { TabType } from '../Navigation/SystemSidebar';
import confetti from 'canvas-confetti';

interface SystemSettingsProps {
  onNavigate?: (tab: TabType) => void;
}

export default function SystemSettings({ onNavigate }: SystemSettingsProps) {
  const [state, setState] = useState<HunterState | null>(null);
  const [showSavedToast, setShowSavedToast] = useState(false);

  // Form State
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [gymName, setGymName] = useState('');
  const [dietName, setDietName] = useState('');

  const [startWeight, setStartWeight] = useState<number>(242);
  const [currentWeight, setCurrentWeight] = useState<number>(242);
  const [targetWeight, setTargetWeight] = useState<number>(160);
  const [targetDate, setTargetDate] = useState<string>('2027-12-31');

  const [dailyCalorieGoal, setDailyCalorieGoal] = useState<number>(2080);
  const [dailyProteinGoal, setDailyProteinGoal] = useState<number>(178);
  const [dailyCarbGoal, setDailyCarbGoal] = useState<number>(190);
  const [dailyFatGoal, setDailyFatGoal] = useState<number>(60);

  const [primaryStore, setPrimaryStore] = useState<string>('Walmart Supercenter (Auburn, ME)');

  useEffect(() => {
    const loaded = loadHunterState();
    setState(loaded);
    if (loaded.profile) {
      setName(loaded.profile.name || 'Nick Crosson');
      setTitle(loaded.title || 'Awakened Hunter');
      setGymName(loaded.profile.gymName || 'Home Bodyweight Dojo vs Planet Fitness Gym (Dual Choice + 45m Cardio)');
      setDietName(loaded.profile.dietName || "S-Rank Shred Blueprint: High-Protein Cutting Plan (~2,080 kcal)");

      setStartWeight(loaded.profile.startWeight || 242);
      setCurrentWeight(loaded.profile.currentWeight || 242);
      setTargetWeight(loaded.profile.targetWeight || 160);
      setTargetDate(loaded.profile.targetDate || '2027-12-31');

      setDailyCalorieGoal(loaded.profile.dailyCalorieGoal || 2080);
      setDailyProteinGoal(loaded.profile.dailyProteinGoal || 178);
      setDailyCarbGoal(loaded.profile.dailyCarbGoal || 190);
      setDailyFatGoal(loaded.profile.dailyFatGoal || 60);
    }
    if (typeof window !== 'undefined') {
      const savedStore = localStorage.getItem('pf_primary_store');
      if (savedStore) setPrimaryStore(savedStore);
    }
  }, []);

  if (!state) return null;

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    const updates: Partial<UserProfile> = {
      name: name.trim() || 'Nick Crosson',
      startWeight: Number(startWeight) || 242,
      currentWeight: Number(currentWeight) || 242,
      targetWeight: Number(targetWeight) || 160,
      targetDate: targetDate || '2027-12-31',
      dailyCalorieGoal: Number(dailyCalorieGoal) || 2080,
      dailyProteinGoal: Number(dailyProteinGoal) || 178,
      dailyCarbGoal: Number(dailyCarbGoal) || 190,
      dailyFatGoal: Number(dailyFatGoal) || 60,
      gymName: gymName.trim() || 'Home Bodyweight Dojo vs Planet Fitness Gym (Dual Choice + 45m Cardio)',
      dietName: dietName.trim() || "S-Rank Shred Blueprint: High-Protein Cutting Plan (~2,080 kcal)",
    };

    const nextState = updateUserProfile(updates);
    nextState.title = title.trim() || nextState.title;
    if (typeof window !== 'undefined') {
      localStorage.setItem('pf_primary_store', primaryStore.trim() || 'Walmart Supercenter (Auburn, ME)');
    }

    setState({ ...nextState });

    // Celebration
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00f0ff', '#ffd700', '#7000ff']
      });
    } catch {}

    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 4000);
  };

  const handleResetGroceryStaples = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('pf_custom_grocery_items');
      localStorage.removeItem('pf_grocery_checked');
      alert("Custom grocery items and checked items have been reset to default staples!");
    }
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-300 max-w-5xl mx-auto">
      
      {/* Toast Notification */}
      {showSavedToast && (
        <div className="fixed top-20 right-4 z-50 bg-gradient-to-r from-system-gold to-yellow-500 text-black px-6 py-3.5 rounded-xl font-black uppercase text-sm tracking-wider shadow-glow-gold flex items-center gap-3 animate-in fade-in slide-in-from-top duration-300">
          <CheckCircle2 className="w-5 h-5 fill-black text-system-gold" />
          <span>System Directives & Hunter Goals Saved Successfully!</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-system-card via-system-panel to-system-dark p-6 border border-system-blue/40 shadow-glow-blue flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-system-blue/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-system-blue/10 border border-system-blue text-system-cyan text-xs font-mono uppercase tracking-widest font-bold">
            <Settings className="w-3.5 h-3.5 text-system-blue animate-spin-slow" />
            System Control Panel & Customization
          </div>
          <h2 className="text-2xl md:text-3xl font-black tracking-wider text-white uppercase text-glow flex items-center gap-2.5">
            <span>HUNTER PROFILE & GOALS</span>
          </h2>
          <p className="text-zinc-300 text-sm max-w-2xl leading-relaxed">
            Customize your Hunter identity, workout sector, macro targets, and body recomposition countdown. Your system directives will adapt instantly across all dashboards, tracking tools, and quests!
          </p>
        </div>
        <button
          onClick={handleSaveAll}
          className="relative z-10 flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-system-gold via-yellow-400 to-system-gold text-black font-black uppercase text-sm tracking-widest shadow-glow-gold hover:scale-105 transition-all w-full md:w-auto justify-center cursor-pointer"
        >
          <Save className="w-4 h-4 fill-black" />
          <span>Save All Settings</span>
        </button>
      </div>

      <form onSubmit={handleSaveAll} className="space-y-6">
        
        {/* Section 1: Hunter Identity & Training Sector */}
        <div className="bg-system-panel rounded-2xl p-6 border border-system-blue/30 space-y-6 shadow-lg">
          <div className="flex items-center gap-2.5 border-b border-system-blue/20 pb-4">
            <div className="w-9 h-9 rounded-xl bg-system-blue/10 border border-system-blue flex items-center justify-center">
              <User className="w-5 h-5 text-system-blue" />
            </div>
            <div>
              <h3 className="text-base font-black tracking-widest uppercase text-white">1. Hunter Identity & Training Sector</h3>
              <p className="text-xs text-zinc-400 font-mono">Personalize your name, system title, and gym sector</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-zinc-300">Hunter Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Nick Crosson"
                className="w-full bg-system-dark border border-system-blue/40 rounded-xl px-4 py-2.5 text-white font-bold text-sm focus:outline-none focus:border-system-cyan transition-all"
              />
              <p className="text-[11px] text-zinc-500">Displayed on awakening banner and quest alerts.</p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-zinc-300">System Title / Rank Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., S-Rank Raid Captain"
                className="w-full bg-system-dark border border-system-blue/40 rounded-xl px-4 py-2.5 text-system-gold font-bold text-sm focus:outline-none focus:border-system-cyan transition-all"
              />
              <p className="text-[11px] text-zinc-500">Appears in your top Hunter status bar.</p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-zinc-300">Primary Gym / Training Sector</label>
              <input
                type="text"
                value={gymName}
                onChange={(e) => setGymName(e.target.value)}
                placeholder="e.g., Quiet Apartment Bodyweight Dojo"
                className="w-full bg-system-dark border border-system-blue/40 rounded-xl px-4 py-2.5 text-system-cyan font-bold text-sm focus:outline-none focus:border-system-cyan transition-all"
              />
              <p className="text-[11px] text-zinc-500">Used in 6-day bodyweight workout quest descriptions.</p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-zinc-300">Diet & Nutrition Protocol</label>
              <input
                type="text"
                value={dietName}
                onChange={(e) => setDietName(e.target.value)}
                placeholder="e.g., S-Rank High-Protein Shred Blueprint"
                className="w-full bg-system-dark border border-system-blue/40 rounded-xl px-4 py-2.5 text-white font-bold text-sm focus:outline-none focus:border-system-cyan transition-all"
              />
              <p className="text-[11px] text-zinc-500">Customizes nutrition coaching and meal prep advice.</p>
            </div>
          </div>
        </div>

        {/* Section 2: Boss Raid Recomposition & Weight Goals */}
        <div className="bg-system-panel rounded-2xl p-6 border border-system-gold/40 space-y-6 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-system-gold/5 to-transparent pointer-events-none" />
          
          <div className="flex items-center gap-2.5 border-b border-system-gold/20 pb-4">
            <div className="w-9 h-9 rounded-xl bg-system-gold/10 border border-system-gold flex items-center justify-center">
              <Trophy className="w-5 h-5 text-system-gold" />
            </div>
            <div>
              <h3 className="text-base font-black tracking-widest uppercase text-white">2. Boss Raid Transformation Goals</h3>
              <p className="text-xs text-zinc-400 font-mono">Set your start weight, current weight, target weight, and target date</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-zinc-300">Starting Weight (lbs)</label>
              <input
                type="number"
                step="0.1"
                value={startWeight}
                onChange={(e) => setStartWeight(parseFloat(e.target.value) || 0)}
                className="w-full bg-system-dark border border-system-gold/40 rounded-xl px-4 py-2.5 text-white font-black text-base focus:outline-none focus:border-system-gold transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-zinc-300">Current Weight (lbs)</label>
              <input
                type="number"
                step="0.1"
                value={currentWeight}
                onChange={(e) => setCurrentWeight(parseFloat(e.target.value) || 0)}
                className="w-full bg-system-dark border border-system-gold/40 rounded-xl px-4 py-2.5 text-system-gold font-black text-base focus:outline-none focus:border-system-gold transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-zinc-300">Target Weight (lbs)</label>
              <input
                type="number"
                step="0.1"
                value={targetWeight}
                onChange={(e) => setTargetWeight(parseFloat(e.target.value) || 0)}
                className="w-full bg-system-dark border border-system-gold/40 rounded-xl px-4 py-2.5 text-system-cyan font-black text-base focus:outline-none focus:border-system-gold transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-zinc-300">Target Goal Date</label>
              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full bg-system-dark border border-system-gold/40 rounded-xl px-4 py-2.5 text-white font-bold text-sm focus:outline-none focus:border-system-gold transition-all"
              />
            </div>
          </div>
          <p className="text-xs text-zinc-400 font-mono bg-system-dark/80 p-3 rounded-xl border border-white/5">
            💡 <strong className="text-system-gold">System Note:</strong> Your Boss Raid progress bar and countdown on the Daily Quests tab will dynamically calculate total pounds lost and days remaining based on these numbers!
          </p>
        </div>

        {/* Section 3: Daily Nutrition & Macro Targets */}
        <div className="bg-system-panel rounded-2xl p-6 border border-system-purple/30 space-y-6 shadow-lg">
          <div className="flex items-center gap-2.5 border-b border-system-purple/20 pb-4">
            <div className="w-9 h-9 rounded-xl bg-system-purple/10 border border-system-purple flex items-center justify-center">
              <Utensils className="w-5 h-5 text-system-purple" />
            </div>
            <div>
              <h3 className="text-base font-black tracking-widest uppercase text-white">3. Daily Macro & Calorie Targets</h3>
              <p className="text-xs text-zinc-400 font-mono">Configure your cutting blueprint macros</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-zinc-300">Daily Calories (kcal)</label>
              <input
                type="number"
                value={dailyCalorieGoal}
                onChange={(e) => setDailyCalorieGoal(parseInt(e.target.value) || 0)}
                className="w-full bg-system-dark border border-system-purple/40 rounded-xl px-4 py-2.5 text-white font-black text-base focus:outline-none focus:border-system-purple transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-zinc-300">Daily Protein (g)</label>
              <input
                type="number"
                value={dailyProteinGoal}
                onChange={(e) => setDailyProteinGoal(parseInt(e.target.value) || 0)}
                className="w-full bg-system-dark border border-system-purple/40 rounded-xl px-4 py-2.5 text-system-gold font-black text-base focus:outline-none focus:border-system-purple transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-zinc-300">Daily Carbs (g)</label>
              <input
                type="number"
                value={dailyCarbGoal}
                onChange={(e) => setDailyCarbGoal(parseInt(e.target.value) || 0)}
                className="w-full bg-system-dark border border-system-purple/40 rounded-xl px-4 py-2.5 text-system-cyan font-black text-base focus:outline-none focus:border-system-purple transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase text-zinc-300">Daily Fat (g)</label>
              <input
                type="number"
                value={dailyFatGoal}
                onChange={(e) => setDailyFatGoal(parseInt(e.target.value) || 0)}
                className="w-full bg-system-dark border border-system-purple/40 rounded-xl px-4 py-2.5 text-white font-black text-base focus:outline-none focus:border-system-purple transition-all"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Grocery Guide & Store Customization */}
        <div className="bg-system-panel rounded-2xl p-6 border border-system-cyan/30 space-y-6 shadow-lg">
          <div className="flex items-center gap-2.5 border-b border-system-cyan/20 pb-4">
            <div className="w-9 h-9 rounded-xl bg-system-cyan/10 border border-system-cyan flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-system-cyan" />
            </div>
            <div>
              <h3 className="text-base font-black tracking-widest uppercase text-white">4. Grocery Store & Staples Customization</h3>
              <p className="text-xs text-zinc-400 font-mono">Customize your local supermarket & manage custom items</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase text-zinc-300">Primary Supermarket Location / Name</label>
              <input
                type="text"
                value={primaryStore}
                onChange={(e) => setPrimaryStore(e.target.value)}
                placeholder="e.g., Walmart Supercenter (Auburn, ME)"
                className="w-full bg-system-dark border border-system-cyan/40 rounded-xl px-4 py-2.5 text-system-cyan font-bold text-sm focus:outline-none focus:border-system-cyan transition-all"
              />
              <p className="text-[11px] text-zinc-500">Default location applied when adding custom grocery items.</p>
            </div>

            <div className="flex flex-col justify-between space-y-3 bg-system-dark/80 p-4 rounded-xl border border-white/5">
              <div>
                <div className="text-xs font-bold uppercase text-white">Custom Grocery Staples Management</div>
                <p className="text-[11px] text-zinc-400 mt-0.5">
                  You can add unlimited custom items directly on the <strong>ME Grocery Guide</strong> tab, or reset your personal additions back to the clean default weekly staples.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => onNavigate?.('grocery')}
                  className="px-4 py-2 rounded-lg bg-system-cyan/20 hover:bg-system-cyan text-system-cyan hover:text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5"
                >
                  <span>Go to Grocery Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleResetGroceryStaples}
                  className="px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Custom Items</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: Save Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-system-dark/90 p-6 rounded-2xl border border-system-gold/40 shadow-xl">
          <div className="text-xs text-zinc-400 font-mono">
            <span className="text-system-gold font-bold">⚡ Hunter System Note:</span> Changes take effect instantly and are stored safely in your browser profile.
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-system-gold via-yellow-400 to-system-gold text-black font-black uppercase tracking-widest text-base shadow-glow-gold hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Save className="w-5 h-5 fill-black" />
            <span>SAVE ALL SETTINGS & GOALS</span>
          </button>
        </div>

      </form>
    </div>
  );
}
