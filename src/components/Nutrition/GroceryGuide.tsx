"use client";

import React, { useState, useEffect } from 'react';
import { AUBURN_LEWISTON_GROCERY_ITEMS, MEAL_PREP_PLANS, GroceryItem } from '@/lib/grocery-data';
import { ShoppingBag, CheckCircle2, Circle, Utensils, DollarSign, MapPin, Sparkles, Award, RotateCcw, Calendar } from 'lucide-react';

export default function GroceryGuide() {
  const [selectedStore, setSelectedStore] = useState<string>('All Stores');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<'items' | 'plans'>('items');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Calculate current week key (Monday base)
      const now = new Date();
      const day = now.getDay();
      const diff = now.getDate() - day + (day === 0 ? -6 : 1);
      const monday = new Date(now.setDate(diff));
      const currentWeekKey = `${monday.getFullYear()}-${monday.getMonth()}-${monday.getDate()}`;

      const savedWeekKey = localStorage.getItem('pf_grocery_week_key');
      if (savedWeekKey && savedWeekKey !== currentWeekKey) {
        // Auto-reset on new Monday week!
        localStorage.removeItem('pf_grocery_checked');
        localStorage.setItem('pf_grocery_week_key', currentWeekKey);
        setCheckedItems({});
      } else {
        const saved = localStorage.getItem('pf_grocery_checked');
        if (saved) setCheckedItems(JSON.parse(saved));
        if (!savedWeekKey) localStorage.setItem('pf_grocery_week_key', currentWeekKey);
      }
    }
  }, []);

  const handleToggleCheck = (id: string) => {
    setCheckedItems(prev => {
      const updated = { ...prev, [id]: !prev[id] };
      if (typeof window !== 'undefined') {
        localStorage.setItem('pf_grocery_checked', JSON.stringify(updated));
      }
      return updated;
    });
  };

  const handleManualReset = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('pf_grocery_checked');
    }
    setCheckedItems({});
  };

  const filteredItems = AUBURN_LEWISTON_GROCERY_ITEMS.filter(item => {
    const matchStore = selectedStore === 'All Stores' || item.store === selectedStore;
    const matchCat = selectedCategory === 'All' || item.category === selectedCategory;
    return matchStore && matchCat;
  });

  const totalItemsCount = AUBURN_LEWISTON_GROCERY_ITEMS.length;
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPct = totalItemsCount > 0 ? Math.round((checkedCount / totalItemsCount) * 100) : 0;

  const stores = ['All Stores', 'Walmart Supercenter (Auburn, ME)', "Shaw's (Auburn/Lewiston)", 'Hannaford (Lewiston/Auburn)'];
  const categories = ['All', 'Protein', 'Carbs', 'Produce', 'Essentials'];

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="bg-system-panel p-6 rounded-2xl border border-system-blue/30 shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-system-cyan mb-1">
            <MapPin className="w-3.5 h-3.5 text-system-blue" />
            <span>Auburn & Lewiston, Maine Budget Grocery Guide</span>
          </div>
          <h2 className="text-2xl font-black tracking-wider text-white uppercase text-glow">
            Hunter Grocery Companion
          </h2>
          <p className="text-xs text-zinc-400 mt-1 max-w-xl">
            High-protein, authentic Puerto Rican style staples priced specifically for Auburn Walmart Supercenter (plus Shaw's/Hannaford) to keep your weekly prep under budget! Includes Keurig K-Cup coffee, Sazón, Tostones, and 0-calorie cooking spray.
          </p>
        </div>

        <div className="flex bg-system-dark p-1 rounded-xl border border-white/10">
          <button
            onClick={() => setActiveTab('items')}
            className={`px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all ${
              activeTab === 'items'
                ? 'bg-system-blue text-system-dark font-black shadow-glow-blue'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Aisle Checklist
          </button>
          <button
            onClick={() => setActiveTab('plans')}
            className={`px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all ${
              activeTab === 'plans'
                ? 'bg-system-blue text-system-dark font-black shadow-glow-blue'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Meal Prep Plans
          </button>
        </div>
      </div>

      {activeTab === 'items' ? (
        <>
          {/* Monday Prep Shopping Progress Banner */}
          <div className="bg-system-card p-5 rounded-2xl border border-system-blue/30 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="bg-system-blue text-system-dark text-[10px] font-black uppercase px-2 py-0.5 rounded">
                  Weekly Monday Prep
                </span>
                <span className="text-xs text-system-cyan font-mono flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Shop Monday | Eat Tuesday
                </span>
              </div>
              <h3 className="text-lg font-black text-white uppercase tracking-wide">
                Auburn Walmart Shopping Cart ({checkedCount}/{totalItemsCount} Checked)
              </h3>
              <p className="text-xs text-zinc-400">
                Check off items as you put them in your cart! List automatically resets every Monday morning for your weekly prep.
              </p>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
              <div className="w-32 bg-black/50 p-2 rounded-xl border border-white/10 hidden sm:block">
                <div className="flex justify-between text-[10px] font-mono font-bold mb-1">
                  <span className="text-zinc-400">Cart Progress</span>
                  <span className="text-system-cyan">{progressPct}%</span>
                </div>
                <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-system-blue to-system-cyan rounded-full transition-all duration-300" style={{ width: `${progressPct}%` }} />
                </div>
              </div>

              <button
                onClick={handleManualReset}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-system-dark hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 transition-all text-xs font-bold uppercase tracking-wider whitespace-nowrap"
              >
                <RotateCcw className="w-3.5 h-3.5 text-system-gold" />
                <span>Reset List for Monday</span>
              </button>
            </div>
          </div>

          {/* Store & Category Filters */}
          <div className="space-y-3 bg-system-panel p-5 rounded-2xl border border-white/10">
            {/* Store Filter */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-zinc-400 uppercase mr-2">Store:</span>
              {stores.map((store) => (
                <button
                  key={store}
                  onClick={() => setSelectedStore(store)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    selectedStore === store
                      ? 'bg-system-blue/20 text-system-cyan border border-system-blue shadow-glow-blue'
                      : 'bg-system-dark text-zinc-400 border border-white/5 hover:border-white/20 hover:text-white'
                  }`}
                >
                  {store}
                </button>
              ))}
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/5">
              <span className="text-xs font-bold text-zinc-400 uppercase mr-2">Category:</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    selectedCategory === cat
                      ? 'bg-system-cyan text-system-dark font-black'
                      : 'bg-system-dark text-zinc-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grocery Items List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredItems.map((item) => {
              const isChecked = checkedItems[item.id] || false;
              return (
                <div
                  key={item.id}
                  onClick={() => handleToggleCheck(item.id)}
                  className={`cursor-pointer rounded-2xl p-5 border transition-all duration-200 flex items-start justify-between gap-4 ${
                    isChecked
                      ? 'bg-system-panel/40 border-green-500/40 opacity-75'
                      : 'bg-system-panel border-system-blue/30 hover:border-system-blue shadow-md'
                  }`}
                >
                  <div className="flex items-start gap-3.5 flex-1">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleCheck(item.id);
                      }}
                      className={`mt-0.5 transition-colors ${isChecked ? 'text-green-400' : 'text-zinc-500 hover:text-system-cyan'}`}
                    >
                      {isChecked ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                    </button>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded ${
                          item.store.includes('Walmart') ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40' :
                          item.store.includes("Shaw's") ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' :
                          'bg-green-500/20 text-green-300 border border-green-500/40'
                        }`}>
                          {item.brand}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-400">{item.store}</span>
                      </div>

                      <h4 className={`text-base font-bold ${isChecked ? 'line-through text-zinc-400' : 'text-white'}`}>
                        {item.name}
                      </h4>

                      <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 pt-1">
                        <span className="text-system-gold font-bold">{item.priceEst}</span>
                        <span>|</span>
                        <span className="text-system-cyan font-bold">{item.protein}g Protein</span>
                        <span>|</span>
                        <span>{item.calories} kcal</span>
                      </div>

                      <p className="text-xs text-zinc-400 leading-relaxed pt-1.5 border-t border-white/5 mt-2">
                        <strong className="text-system-cyan">Why Buy:</strong> {item.coachNote}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-system-dark text-zinc-300 border border-white/10 whitespace-nowrap">
                    {item.category}
                  </span>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        /* Meal Prep Plans Tab */
        <div className="space-y-6">
          {MEAL_PREP_PLANS.map((plan) => (
            <div key={plan.id} className="bg-system-panel p-6 rounded-2xl border border-system-blue/40 shadow-glow-blue space-y-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <div className="flex items-center gap-2 text-xs font-mono text-system-gold uppercase font-bold mb-1">
                    <DollarSign className="w-4 h-4 text-system-gold" />
                    <span>Est. Cost: {plan.estCostPerWeek}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase">
                    {plan.title}
                  </h3>
                  <p className="text-xs text-zinc-300 mt-1 max-w-2xl">{plan.description}</p>
                </div>

                <div className="flex items-center gap-3 bg-system-dark px-4 py-2.5 rounded-xl border border-system-cyan/30">
                  <Award className="w-6 h-6 text-system-cyan" />
                  <div>
                    <div className="text-[10px] text-zinc-400 uppercase font-bold">Daily Macro Target</div>
                    <div className="text-sm font-black text-system-cyan font-mono">{plan.targetDailyCalories} kcal | {plan.targetDailyProtein}g Protein</div>
                  </div>
                </div>
              </div>

              {/* Meals Timeline */}
              <div className="space-y-4">
                {plan.meals.map((meal, idx) => (
                  <div key={idx} className="bg-system-dark p-5 rounded-xl border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-system-blue/20 text-system-cyan">
                          {meal.time}
                        </span>
                        <h4 className="text-base font-bold text-white">{meal.name}</h4>
                      </div>
                      <ul className="text-xs text-zinc-300 space-y-1 pl-4 list-disc pt-1">
                        {meal.ingredients.map((ing, i) => (
                          <li key={i}>{ing}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center gap-4 bg-system-panel px-4 py-3 rounded-xl border border-white/5 text-xs font-mono whitespace-nowrap">
                      <div>
                        <div className="text-[10px] text-zinc-500 uppercase">Calories</div>
                        <div className="text-sm font-bold text-white">{meal.calories} kcal</div>
                      </div>
                      <div className="border-l border-white/10 pl-4">
                        <div className="text-[10px] text-zinc-500 uppercase">Protein</div>
                        <div className="text-sm font-bold text-system-cyan">{meal.protein}g</div>
                      </div>
                      <div className="border-l border-white/10 pl-4">
                        <div className="text-[10px] text-zinc-500 uppercase">Carbs / Fat</div>
                        <div className="text-sm text-zinc-400">{meal.carbs}g / {meal.fat}g</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
