"use client";

import React, { useState, useEffect } from 'react';
import { loadHunterState, saveHunterState, awardXp, triggerLevelUpCelebration, drinkWaterAmount, getHydrationOzConsumed, HYDRATION_GOAL_OZ, resetDailyHydration } from '@/lib/hunter-system';
import { Flame, Droplets, PlusCircle, Trash2, ShieldCheck } from 'lucide-react';
import { TabType } from '../Navigation/SystemSidebar';

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
  onNavigate?: (tab: TabType) => void;
}

export default function NutritionTracker({ onNavigate }: NutritionTrackerProps) {
  const [hunterState, setHunterState] = useState(() => (typeof window !== 'undefined' ? loadHunterState() : null));
  const [meals, setMeals] = useState<LoggedMeal[]>([]);
  const [showManualModal, setShowManualModal] = useState(false);
  const [manualName, setManualName] = useState('');
  const [manualCals, setManualCals] = useState('');
  const [manualProt, setManualProt] = useState('');
  const [manualCarbs, setManualCarbs] = useState('');
  const [manualFat, setManualFat] = useState('');

  const today = new Date().toISOString().split('T')[0];

  const handleDrinkWater = (oz: number) => {
    drinkWaterAmount(oz);
    setHunterState(loadHunterState());
    triggerLevelUpCelebration();
  };

  const handleResetWater = () => {
    resetDailyHydration();
    setHunterState(loadHunterState());
  };

  useEffect(() => {
    const loadMeals = () => {
      const saved = localStorage.getItem(`pf_meals_${today}`);
      if (saved) setMeals(JSON.parse(saved));
      else setMeals([]);
    };
    loadMeals();
    
    // Listen for storage changes in case BarcodeScanner updates it
    window.addEventListener('storage', loadMeals);
    return () => window.removeEventListener('storage', loadMeals);
  }, [today]);

  const saveMealsToStorage = (updated: LoggedMeal[]) => {
    setMeals(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem(`pf_meals_${today}`, JSON.stringify(updated));
      // Dispatch storage event manually for same-window updates
      window.dispatchEvent(new Event('storage'));
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

  const removeMeal = (id: string) => {
    const updated = meals.filter(m => m.id !== id);
    saveMealsToStorage(updated);
  };

  const totalCals = meals.reduce((acc, m) => acc + m.calories, 0);
  const totalProt = meals.reduce((acc, m) => acc + m.protein, 0);
  const totalCarbs = meals.reduce((acc, m) => acc + m.carbs, 0);
  const totalFat = meals.reduce((acc, m) => acc + m.fat, 0);

  const calGoal = 2500;
  const protGoal = 180;
  const carbGoal = 300;
  const fatGoal = 65;

  const waterConsumed = getHydrationOzConsumed(hunterState?.mp ?? 0);
  const waterProgress = Math.min((waterConsumed / HYDRATION_GOAL_OZ) * 100, 100);

  return (
    <div className="space-y-8 pb-12">
      <div className="bg-[#11182c]/80 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#0a3d8f] mb-1">
            <Flame className="w-3.5 h-3.5" />
            <span>Daily Macros | Auburn DB (Walmart, Hannaford, Shaws)</span>
          </div>
          <h2 className="text-2xl font-black tracking-wider text-white uppercase">
            Macro Tracker
          </h2>
          <p className="text-xs text-zinc-400 mt-1 max-w-xl">
            Hit your {protGoal}g protein target to stay anabolic.
          </p>
        </div>
        <button
          onClick={() => setShowManualModal(true)}
          className="flex items-center gap-2 bg-[#ce1126] hover:bg-[#a00d1d] text-white px-5 py-2.5 rounded-xl font-bold tracking-wide transition-all shadow-lg active:scale-95"
        >
          <PlusCircle className="w-5 h-5" />
          Quick Add
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MacroCard title="Calories" current={totalCals} goal={calGoal} unit="kcal" color="bg-[#f5a623]" border="border-[#f5a623]" />
        <MacroCard title="Protein" current={totalProt} goal={protGoal} unit="g" color="bg-[#4ade80]" border="border-[#4ade80]" />
        <MacroCard title="Carbs" current={totalCarbs} goal={carbGoal} unit="g" color="bg-[#0a3d8f]" border="border-[#0a3d8f]" />
        <MacroCard title="Fats" current={totalFat} goal={fatGoal} unit="g" color="bg-[#ce1126]" border="border-[#ce1126]" />
      </div>

      <div className="bg-[#11182c]/80 backdrop-blur-md rounded-2xl border border-white/10 p-6 shadow-xl overflow-hidden relative">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-black text-white text-lg tracking-wider flex items-center gap-2">
            <Droplets className="w-5 h-5 text-[#0a3d8f]" /> Hydration ({waterConsumed} / {HYDRATION_GOAL_OZ} oz)
          </h3>
          <button onClick={handleResetWater} className="text-xs font-mono text-zinc-500 hover:text-white uppercase">Reset</button>
        </div>
        
        <div className="h-4 bg-black/50 rounded-full overflow-hidden mb-6 border border-white/5">
          <div className="h-full bg-gradient-to-r from-[#0a3d8f] to-[#4ade80] transition-all duration-700 ease-out" style={{ width: `${waterProgress}%` }} />
        </div>
        
        <div className="flex gap-3">
          {[8, 16, 24].map((amt) => (
            <button key={amt} onClick={() => handleDrinkWater(amt)} className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl py-3 flex flex-col items-center gap-1 transition-all hover:border-[#0a3d8f]/50 hover:shadow-[0_0_15px_rgba(10,61,143,0.3)]">
              <Droplets className="w-5 h-5 text-[#0a3d8f]" />
              <span className="text-xs font-bold text-white">+{amt} oz</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-[#11182c]/80 backdrop-blur-md rounded-2xl border border-white/10 p-6 shadow-xl">
        <h3 className="font-black text-white text-lg tracking-wider mb-4 border-b border-white/10 pb-4">Today&apos;s Log</h3>
        
        {meals.length === 0 ? (
          <div className="text-center py-10 bg-black/20 rounded-xl border border-white/5">
            <ShieldCheck className="w-12 h-12 text-zinc-600 mx-auto mb-3 opacity-50" />
            <p className="text-zinc-500 font-medium">No macros tracked yet today.</p>
            <p className="text-zinc-600 text-sm mt-1">Use the Barcode Scanner or Quick Add.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {meals.map((meal) => (
              <div key={meal.id} className="bg-black/30 border border-white/5 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-white/10 transition-colors">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-white text-sm">{meal.name}</span>
                    <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-zinc-400 font-mono">{meal.time}</span>
                  </div>
                  <div className="flex gap-3 text-xs font-mono font-medium">
                    <span className="text-[#f5a623]">{meal.calories} kcal</span>
                    <span className="text-[#4ade80]">{meal.protein}g P</span>
                    <span className="text-[#0a3d8f]">{meal.carbs}g C</span>
                    <span className="text-[#ce1126]">{meal.fat}g F</span>
                  </div>
                </div>
                <button
                  onClick={() => removeMeal(meal.id)}
                  className="text-zinc-500 hover:text-[#ce1126] p-2 rounded-lg hover:bg-[#ce1126]/10 transition-colors shrink-0"
                  aria-label="Remove meal"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {showManualModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#11182c] border border-white/20 rounded-3xl p-6 w-full max-w-md shadow-2xl relative">
            <h3 className="text-xl font-black text-white mb-6">Quick Add Macros</h3>
            <form onSubmit={handleManualAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Food Name</label>
                <input required type="text" value={manualName} onChange={(e) => setManualName(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#ce1126] focus:ring-1 focus:ring-[#ce1126] transition-all" placeholder="e.g., Hannaford Greek Yogurt" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Calories</label>
                  <input required type="number" min="0" value={manualCals} onChange={(e) => setManualCals(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-[#f5a623] font-mono outline-none focus:border-[#f5a623]" placeholder="0" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Protein (g)</label>
                  <input required type="number" min="0" value={manualProt} onChange={(e) => setManualProt(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-[#4ade80] font-mono outline-none focus:border-[#4ade80]" placeholder="0" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Carbs (g)</label>
                  <input required type="number" min="0" value={manualCarbs} onChange={(e) => setManualCarbs(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-[#0a3d8f] font-mono outline-none focus:border-[#0a3d8f]" placeholder="0" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Fat (g)</label>
                  <input required type="number" min="0" value={manualFat} onChange={(e) => setManualFat(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-[#ce1126] font-mono outline-none focus:border-[#ce1126]" placeholder="0" />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setShowManualModal(false)} className="flex-1 px-4 py-3 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 transition-colors">Cancel</button>
                <button type="submit" className="flex-1 px-4 py-3 rounded-xl bg-[#ce1126] hover:bg-[#a00d1d] text-white font-bold shadow-lg transition-colors">Add Macros</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function MacroCard({ title, current, goal, unit, color, border }: { title: string, current: number, goal: number, unit: string, color: string, border: string }) {
  const percent = Math.min((current / goal) * 100, 100);
  return (
    <div className={`bg-black/30 border-t-4 ${border} rounded-xl p-4 shadow-inner relative overflow-hidden group`}>
      <div className={`absolute top-0 right-0 w-16 h-16 ${color}/10 rounded-full blur-2xl -mr-8 -mt-8 group-hover:opacity-100 opacity-50 transition-opacity`} />
      <div className="relative z-10">
        <div className="text-[10px] sm:text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider mb-1">{title}</div>
        <div className="flex items-baseline gap-1 mb-2">
          <span className="text-xl sm:text-2xl font-black text-white">{current}</span>
          <span className="text-xs text-zinc-500 font-medium">/ {goal}{unit}</span>
        </div>
        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
          <div className={`h-full ${color} transition-all duration-1000 ease-out`} style={{ width: `${percent}%` }} />
        </div>
      </div>
    </div>
  );
}
