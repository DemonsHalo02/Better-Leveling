"use client";

import React, { useState, useEffect } from 'react';
import { loadHunterState, saveHunterState, awardXp, triggerLevelUpCelebration } from '@/lib/hunter-system';
import { Utensils, Plus, Trash2, CheckCircle2, Flame, Award, ArrowRight, ShieldCheck, Sparkles, Printer } from 'lucide-react';
import { TabType } from '../Navigation/SystemSidebar';
import { MEAL_PREP_PLANS } from '@/lib/grocery-data';

interface LoggedMeal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  time: string;
}

interface NutritionTrackerProps {
  onNavigate: (tab: TabType) => void;
}

export default function NutritionTracker({ onNavigate }: NutritionTrackerProps) {
  const [meals, setMeals] = useState<LoggedMeal[]>([]);
  const [selectedDeckCountry, setSelectedDeckCountry] = useState<string>('Japan');
  const [showManualModal, setShowManualModal] = useState(false);
  const [manualName, setManualName] = useState('');
  const [manualCals, setManualCals] = useState('');
  const [manualProt, setManualProt] = useState('');
  const [manualCarbs, setManualCarbs] = useState('');
  const [manualFat, setManualFat] = useState('');

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(`pf_meals_${today}`);
      if (saved) setMeals(JSON.parse(saved));
      else setMeals([]);

      const savedCountry = localStorage.getItem('pf_selected_aisle_template');
      if (savedCountry && savedCountry !== 'All') {
        setSelectedDeckCountry(savedCountry);
      }
    }
  }, [today]);

  const saveMealsToStorage = (updated: LoggedMeal[]) => {
    setMeals(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem(`pf_meals_${today}`, JSON.stringify(updated));
    }
  };

  const handleManualAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualName.trim() || !manualCals) return;

    const newMeal: LoggedMeal = {
      id: Date.now().toString(),
      name: manualName.trim(),
      calories: parseInt(manualCals) || 0,
      protein: parseInt(manualProt) || 0,
      carbs: parseInt(manualCarbs) || 0,
      fat: parseInt(manualFat) || 0,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updated = [...meals, newMeal];
    saveMealsToStorage(updated);

    // Award XP
    const state = loadHunterState();
    if (!state.completedQuestsToday.calories) state.completedQuestsToday.calories = true;
    saveHunterState(state);
    awardXp(50, 'int', state);

    setShowManualModal(false);
    setManualName('');
    setManualCals('');
    setManualProt('');
    setManualCarbs('');
    setManualFat('');
  };

  const handleRemoveMeal = (id: string) => {
    const updated = meals.filter(m => m.id !== id);
    saveMealsToStorage(updated);
  };

  const totalCals = meals.reduce((acc, m) => acc + m.calories, 0);
  const totalProt = meals.reduce((acc, m) => acc + m.protein, 0);
  const totalCarbs = meals.reduce((acc, m) => acc + m.carbs, 0);
  const totalFat = meals.reduce((acc, m) => acc + m.fat, 0);

  const activePlan = MEAL_PREP_PLANS.find(p => p.country === selectedDeckCountry) || MEAL_PREP_PLANS[0];

  const calGoal = activePlan.targetDailyCalories || 2080;
  const protGoal = activePlan.targetDailyProtein || 178;
  const carbGoal = selectedDeckCountry === 'Japan Bulking' ? 370 : 200;
  const fatGoal = selectedDeckCountry === 'Japan Bulking' ? 65 : 60;

  const handleSelectDeckCountry = (country: string) => {
    setSelectedDeckCountry(country);
    if (typeof window !== 'undefined') {
      localStorage.setItem('pf_selected_aisle_template', country);
    }
  };

  const handleQuickLog = (item: { name: string; calories: number; protein: number; carbs: number; fat: number; time: string; }) => {
    const newMeal: LoggedMeal = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 5),
      name: item.name,
      calories: item.calories,
      protein: item.protein,
      carbs: item.carbs,
      fat: item.fat,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    const updated = [...meals, newMeal];
    saveMealsToStorage(updated);

    const state = loadHunterState();
    if (!state.completedQuestsToday.calories) state.completedQuestsToday.calories = true;
    if (!state.completedQuestsToday.protein) state.completedQuestsToday.protein = true;
    saveHunterState(state);
    awardXp(75, 'int', state);
    triggerLevelUpCelebration();
  };

  const calPct = Math.min(100, Math.floor((totalCals / calGoal) * 100));
  const protPct = Math.min(100, Math.floor((totalProt / protGoal) * 100));

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="bg-system-panel p-6 rounded-2xl border border-system-blue/30 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-system-cyan mb-1">
            <Flame className="w-3.5 h-3.5 text-system-blue" />
            <span>Daily Nutrition Directive | Target Weight: 160 lbs</span>
          </div>
          <h2 className="text-2xl font-black tracking-wider text-white uppercase text-glow">
            Calorie & Macro Quest
          </h2>
          <p className="text-xs text-zinc-400 mt-1 max-w-xl">
            Hit your 178g protein target to stay anabolic and preserve muscle mass while cutting at a safe ~1 lb/week pace.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <button
            onClick={() => onNavigate('scanner')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-system-blue to-system-cyan text-black font-black uppercase text-xs sm:text-sm tracking-wider shadow-glow-blue hover:bg-white transition-all min-h-[44px]"
          >
            <span>Scan Barcode</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowManualModal(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-system-card border border-system-cyan/40 text-system-cyan font-bold uppercase text-xs sm:text-sm tracking-wider hover:bg-system-blue/20 transition-all min-h-[44px]"
          >
            <Plus className="w-4 h-4" />
            <span>Manual Entry</span>
          </button>
        </div>
      </div>

      {/* 1-Click Template-Synced Meal Prep Quick-Log Deck */}
      <div className="bg-system-panel p-6 rounded-2xl border border-system-blue/40 shadow-glow-blue space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
          <div>
            <h3 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-system-gold animate-pulse" /> ⚡ 1-Click Meal Prep Quick-Log Deck ({activePlan.flag} {activePlan.country})
            </h3>
            <p className="text-xs text-zinc-400">Instantly log your prepped {activePlan.country} blueprint meals with 1 click to fill your HP & Mana bars!</p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={activePlan.country === 'Japan Bulking' ? '/Japanese_Bulking_Meal_Plan_Under_50.html' : '/Japanese_Meal_Plan_Under_50.html'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-system-dark hover:bg-system-gold text-system-gold hover:text-black px-3 py-1 rounded-lg text-xs font-black font-mono border border-system-gold/40 hover:shadow-glow-gold transition-all cursor-pointer no-underline"
              title="Print or Save as PDF the selected Japanese Meal Prep Blueprint"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>🖨️ Print {activePlan.country === 'Japan Bulking' ? 'Phase 2 Bulking' : 'Phase 1 Cutting'} PDF</span>
            </a>
            <span className="text-[10px] bg-system-blue/20 text-system-cyan border border-system-blue/40 px-2.5 py-1 rounded font-mono font-bold whitespace-nowrap">
              +75 INT XP Per Meal
            </span>
          </div>
        </div>

        {/* Cuisine Template Selector Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {MEAL_PREP_PLANS.map((plan) => {
            const isSelected = selectedDeckCountry === plan.country;
            return (
              <button
                key={plan.id}
                onClick={() => handleSelectDeckCountry(plan.country)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-all ${
                  isSelected
                    ? 'bg-system-cyan text-black shadow-glow-blue'
                    : 'bg-system-dark hover:bg-system-card text-zinc-300 hover:text-white border border-white/10'
                }`}
              >
                <span>{plan.flag}</span>
                <span>{plan.country === 'Japan' ? 'Phase 1: Japan Cutting ($45.38)' : plan.country === 'Japan Bulking' ? 'Phase 2: Japan Bulking ($43.76)' : plan.country}</span>
                {plan.country === 'Japan' && <span className="text-[9px] bg-system-gold text-black px-1.5 py-0.2 rounded font-black ml-0.5">#1 Main</span>}
                {plan.country === 'Japan Bulking' && <span className="text-[9px] bg-red-500 text-white px-1.5 py-0.2 rounded font-black ml-0.5">Post-160 Lb</span>}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
          {activePlan.meals.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleQuickLog(item)}
              className="bg-system-dark hover:bg-system-card p-4 rounded-xl border border-white/10 hover:border-system-cyan transition-all text-left flex items-start justify-between gap-3 group shadow-md hover:shadow-glow-blue/30"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{activePlan.flag}</span>
                  <span className="text-xs font-mono text-system-gold">{item.time}</span>
                </div>
                <h4 className="text-xs font-bold text-white group-hover:text-system-cyan transition-colors line-clamp-1">
                  {item.name}
                </h4>
                <div className="text-[11px] font-mono text-zinc-400 flex items-center gap-2">
                  <span className="text-white font-bold">{item.calories} kcal</span>
                  <span>|</span>
                  <span className="text-system-cyan font-bold">{item.protein}g P</span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-system-blue/10 group-hover:bg-system-blue text-system-cyan group-hover:text-black flex items-center justify-center transition-all flex-shrink-0 mt-1">
                <Plus className="w-4 h-4" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Macro Rings Grid - 2x2 on mobile, 4x1 on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        
        {/* Calories Card (Mana Bar) */}
        <div className="bg-system-panel p-5 rounded-2xl border border-system-blue/30 space-y-3">
          <div className="flex justify-between items-center text-xs font-bold uppercase text-zinc-400">
            <span>⚡ Mana Fuel (Cals)</span>
            <span className="text-system-cyan font-mono">{calPct}%</span>
          </div>
          <div className="text-2xl font-black text-white font-mono text-glow">
            {totalCals} <span className="text-xs font-normal text-zinc-400">/ {calGoal} kcal</span>
          </div>
          <div className="w-full h-2.5 bg-black/60 rounded-full overflow-hidden border border-white/10">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                totalCals > calGoal ? 'bg-red-500' : 'bg-gradient-to-r from-system-blue to-system-cyan shadow-glow-blue'
              }`}
              style={{ width: `${calPct}%` }}
            />
          </div>
          <div className="text-[11px] text-zinc-400">
            {totalCals > calGoal ? '⚠️ Exceeded cutting goal!' : `${calGoal - totalCals} kcal remaining for today.`}
          </div>
        </div>

        {/* Protein Card (HP Armor Bar) */}
        <div className="bg-system-panel p-5 rounded-2xl border border-green-500/40 space-y-3 shadow-glow-blue/20">
          <div className="flex justify-between items-center text-xs font-bold uppercase text-zinc-400">
            <span className="text-green-400">💖 HP Armor (Prot)</span>
            <span className="text-green-400 font-mono">{protPct}%</span>
          </div>
          <div className="text-2xl font-black text-green-400 font-mono">
            {totalProt}g <span className="text-xs font-normal text-zinc-400">/ {protGoal}g</span>
          </div>
          <div className="w-full h-2.5 bg-black/60 rounded-full overflow-hidden border border-white/10">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-500 shadow-glow-blue"
              style={{ width: `${protPct}%` }}
            />
          </div>
          <div className="text-[11px] text-zinc-400">
            {totalProt >= protGoal ? '✅ Muscle armor maximized!' : `${protGoal - totalProt}g left to hit anabolic goal.`}
          </div>
        </div>

        {/* Carbs Card */}
        <div className="bg-system-panel p-5 rounded-2xl border border-white/10 space-y-3">
          <div className="flex justify-between items-center text-xs font-bold uppercase text-zinc-400">
            <span>Carbs</span>
            <span className="text-zinc-400 font-mono">{totalCarbs}g</span>
          </div>
          <div className="text-2xl font-black text-white font-mono">
            {totalCarbs}g <span className="text-xs font-normal text-zinc-400">/ {carbGoal}g</span>
          </div>
          <div className="w-full h-2.5 bg-black/60 rounded-full overflow-hidden border border-white/10">
            <div 
              className="h-full bg-zinc-400 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (totalCarbs / carbGoal) * 100)}%` }}
            />
          </div>
          <div className="text-[11px] text-zinc-400">Primary fuel for Quiet Apartment Bodyweight Dojo workouts.</div>
        </div>

        {/* Fat Card */}
        <div className="bg-system-panel p-5 rounded-2xl border border-white/10 space-y-3">
          <div className="flex justify-between items-center text-xs font-bold uppercase text-zinc-400">
            <span>Fat</span>
            <span className="text-zinc-400 font-mono">{totalFat}g</span>
          </div>
          <div className="text-2xl font-black text-white font-mono">
            {totalFat}g <span className="text-xs font-normal text-zinc-400">/ {fatGoal}g</span>
          </div>
          <div className="w-full h-2.5 bg-black/60 rounded-full overflow-hidden border border-white/10">
            <div 
              className="h-full bg-zinc-400 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (totalFat / fatGoal) * 100)}%` }}
            />
          </div>
          <div className="text-[11px] text-zinc-400">Essential for hormone production & joint lubrication.</div>
        </div>

      </div>

      {/* Today's Meal Log */}
      <div className="bg-system-panel p-6 rounded-2xl border border-white/10 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h3 className="text-base font-black text-white uppercase tracking-widest flex items-center gap-2">
            <Utensils className="w-5 h-5 text-system-blue" /> Today's Logged Meals
          </h3>
          <span className="text-xs font-mono text-zinc-400">{meals.length} Items Logged Today</span>
        </div>

        {meals.length === 0 ? (
          <div className="text-center py-12 space-y-3 bg-system-dark/50 rounded-xl border border-dashed border-white/10">
            <Utensils className="w-8 h-8 text-zinc-600 mx-auto" />
            <div className="text-sm font-bold text-zinc-400">No meals logged yet today.</div>
            <p className="text-xs text-zinc-500 max-w-sm mx-auto">Use the Barcode Scanner or Manual Entry to log your high-protein meals from Walmart, Shaw's, or Hannaford!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {meals.map((meal) => (
              <div key={meal.id} className="bg-system-dark p-4 rounded-xl border border-white/5 flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white">{meal.name}</h4>
                    <span className="text-[10px] font-mono text-zinc-500">{meal.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 mt-1">
                    <span className="text-system-cyan font-bold">{meal.calories} kcal</span>
                    <span>|</span>
                    <span className="text-system-cyan font-bold">{meal.protein}g Protein</span>
                    <span>|</span>
                    <span>{meal.carbs}g Carbs</span>
                    <span>|</span>
                    <span>{meal.fat}g Fat</span>
                  </div>
                </div>

                <button
                  onClick={() => handleRemoveMeal(meal.id)}
                  className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-all"
                  title="Remove Meal"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Manual Entry Modal */}
      {showManualModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-system-panel border border-system-blue rounded-2xl p-6 max-w-md w-full space-y-4 shadow-glow-blue animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-white uppercase">Manual Meal Entry</h3>
              <button onClick={() => setShowManualModal(false)} className="text-zinc-400 hover:text-white text-sm font-bold">✕</button>
            </div>
            
            <form onSubmit={handleManualAdd} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-zinc-400 uppercase">Meal / Food Name</label>
                <input
                  type="text"
                  placeholder="e.g. Grilled Chicken Breast & Jasmine Rice"
                  value={manualName}
                  onChange={(e) => setManualName(e.target.value)}
                  className="w-full bg-system-dark border border-system-blue/40 rounded-xl px-4 py-2.5 mt-1 text-sm text-white focus:outline-none focus:border-system-blue"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-zinc-400 uppercase">Calories (kcal)</label>
                  <input
                    type="number"
                    inputMode="decimal"
                    placeholder="e.g. 550"
                    value={manualCals}
                    onChange={(e) => setManualCals(e.target.value)}
                    className="w-full bg-system-dark border border-system-blue/40 rounded-xl px-4 py-3 mt-1 text-sm font-mono font-bold text-white focus:outline-none focus:border-system-blue shadow-inner"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-system-cyan uppercase">Protein (g)</label>
                  <input
                    type="number"
                    inputMode="decimal"
                    placeholder="e.g. 50"
                    value={manualProt}
                    onChange={(e) => setManualProt(e.target.value)}
                    className="w-full bg-system-dark border border-system-cyan/40 rounded-xl px-4 py-3 mt-1 text-sm font-mono font-bold text-system-cyan focus:outline-none focus:border-system-cyan shadow-inner"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-zinc-400 uppercase">Carbs (g)</label>
                  <input
                    type="number"
                    inputMode="decimal"
                    placeholder="e.g. 60"
                    value={manualCarbs}
                    onChange={(e) => setManualCarbs(e.target.value)}
                    className="w-full bg-system-dark border border-white/10 rounded-xl px-4 py-3 mt-1 text-sm font-mono text-white focus:outline-none shadow-inner"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-zinc-400 uppercase">Fat (g)</label>
                  <input
                    type="number"
                    inputMode="decimal"
                    placeholder="e.g. 10"
                    value={manualFat}
                    onChange={(e) => setManualFat(e.target.value)}
                    className="w-full bg-system-dark border border-white/10 rounded-xl px-4 py-3 mt-1 text-sm font-mono text-white focus:outline-none shadow-inner"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowManualModal(false)}
                  className="flex-1 py-3.5 rounded-xl bg-system-card text-zinc-400 hover:text-white font-bold text-xs sm:text-sm uppercase min-h-[44px] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-system-blue to-system-cyan text-black hover:bg-white font-black text-xs sm:text-sm uppercase shadow-glow-blue transition-all min-h-[44px]"
                >
                  Add Meal (+50 XP)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
