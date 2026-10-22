import React, { useState } from 'react';
import { FoodItem, MealType } from '../../types';
import { VERIFIED_FOODS } from '../../data/verifiedFoods';
import { ShoppingCart, Plus, Check, Sparkles, ChevronRight } from 'lucide-react';

interface WalmartStaplesBarProps {
  onAddFood: (food: FoodItem, mealType: MealType, servings: number) => void;
  defaultMealType?: MealType;
}

export const WalmartStaplesBar: React.FC<WalmartStaplesBarProps> = ({
  onAddFood,
  defaultMealType = 'lunch',
}) => {
  const [selectedMeal, setSelectedMeal] = useState<MealType>(defaultMealType);
  const [activeCategory, setActiveCategory] = useState<'all' | 'protein' | 'staples' | 'snacks'>('all');
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  // Curated list of Auburn Walmart staples from VERIFIED_FOODS
  const stapleIds = [
    'food-walmart-gv-chicken-breast',
    'food-walmart-gv-ground-beef-93',
    'food-walmart-gv-liquid-egg-whites',
    'food-walmart-gv-greek-yogurt-plain',
    'food-walmart-gv-chunk-light-tuna',
    'food-walmart-marketside-rotisserie-chicken',
    'food-walmart-equate-protein-shake',
    'food-walmart-gv-rolled-oats',
    'food-walmart-gv-triple-berry',
    'food-walmart-gv-steamed-broccoli',
    'food-walmart-gv-chewy-choc-chip-cookies',
    'food-walmart-gv-rising-crust-pepperoni-pizza',
  ];

  const staples = VERIFIED_FOODS.filter((f) => stapleIds.includes(f.id));

  const filtered = staples.filter((food) => {
    if (activeCategory === 'protein') return food.protein >= 15;
    if (activeCategory === 'staples') {
      return (
        food.id.includes('chicken') ||
        food.id.includes('beef') ||
        food.id.includes('oats') ||
        food.id.includes('yogurt') ||
        food.id.includes('egg')
      );
    }
    if (activeCategory === 'snacks') {
      return food.id.includes('cookies') || food.id.includes('pizza');
    }
    return true;
  });

  const handleQuickLog = (food: FoodItem) => {
    onAddFood(food, selectedMeal, 1);
    setJustAddedId(food.id);
    setTimeout(() => {
      setJustAddedId((curr) => (curr === food.id ? null : curr));
    }, 1500);
  };

  return (
    <div className="bg-dark-850/80 border border-dark-750/80 rounded-2xl p-4 shadow-sm space-y-3">
      {/* Header & Meal Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 border-b border-dark-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
            <ShoppingCart size={16} />
          </div>
          <div>
            <h3 className="font-bold text-xs sm:text-sm text-dark-50 flex items-center gap-1.5">
              <span>Quick Staples</span>
              <span className="text-[10px] font-mono text-blue-400 bg-blue-950/40 border border-blue-900/40 px-1.5 py-0.2 rounded">
                Auburn Walmart
              </span>
            </h3>
            <p className="text-[11px] text-dark-400">
              1-Tap fast logging for your frequent grocery staples
            </p>
          </div>
        </div>

        {/* Meal Target Selector */}
        <div className="flex items-center gap-1 font-mono text-[11px] self-start sm:self-auto bg-dark-900 p-1 rounded-xl border border-dark-800">
          <span className="text-dark-500 px-1 text-[10px]">Add to:</span>
          {(['breakfast', 'lunch', 'dinner', 'snack'] as MealType[]).map((m) => (
            <button
              key={m}
              onClick={() => setSelectedMeal(m)}
              className={`px-2 py-0.5 rounded-lg capitalize transition ${
                selectedMeal === m
                  ? 'bg-amber-500 text-dark-950 font-bold'
                  : 'text-dark-400 hover:text-dark-200'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Horizontal Carousel */}
      <div className="flex gap-2.5 overflow-x-auto pb-1.5 no-scrollbar">
        {filtered.map((food) => {
          const isJustAdded = justAddedId === food.id;

          return (
            <div
              key={food.id}
              className="min-w-[170px] max-w-[190px] flex-shrink-0 p-3 rounded-xl bg-dark-900/90 border border-dark-750/90 flex flex-col justify-between space-y-2 hover:border-dark-700 transition"
            >
              <div>
                <span className="text-[10px] font-mono text-blue-400 truncate block">
                  {food.brand || 'Great Value'}
                </span>
                <h4 className="font-bold text-xs text-dark-100 line-clamp-2 mt-0.5 leading-snug">
                  {food.name.replace('Great Value ', '').replace('Marketside ', '')}
                </h4>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-amber-400 font-bold">{food.calories} kcal</span>
                  <span className="text-rose-400 font-bold">{food.protein}g P</span>
                </div>
                <div className="text-[10px] text-dark-500 font-mono truncate">
                  {food.servingUnit || `${food.servingSizeOz} oz`}
                </div>
              </div>

              <button
                onClick={() => handleQuickLog(food)}
                className={`w-full py-1.5 px-2 rounded-lg font-bold text-xs transition flex items-center justify-center gap-1 ${
                  isJustAdded
                    ? 'bg-emerald-500 text-dark-950 shadow-sm'
                    : 'bg-dark-800 hover:bg-dark-750 text-dark-200 hover:text-dark-50 border border-dark-700'
                }`}
              >
                {isJustAdded ? (
                  <>
                    <Check size={13} />
                    <span>Added!</span>
                  </>
                ) : (
                  <>
                    <Plus size={13} />
                    <span>Log to {selectedMeal.charAt(0).toUpperCase() + selectedMeal.slice(1)}</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
