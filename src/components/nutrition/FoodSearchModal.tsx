import React, { useState, useMemo, useEffect } from 'react';
import { FoodItem, MealType } from '../../types';
import { VERIFIED_FOODS } from '../../data/verifiedFoods';
import { searchOpenFoodFacts } from '../../lib/openFoodFacts';
import { useNutritionStore } from '../../store/useNutritionStore';
import { X, Search, Plus, Globe, Sparkles, Loader2, ShoppingCart } from 'lucide-react';

interface FoodSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddFood: (food: FoodItem, mealType: MealType, servings: number) => void;
  defaultMealType?: MealType;
}

export const FoodSearchModal: React.FC<FoodSearchModalProps> = ({
  isOpen,
  onClose,
  onAddFood,
  defaultMealType = 'breakfast',
}) => {
  const { customFoods, recentFoods } = useNutritionStore();
  const [mealType, setMealType] = useState<MealType>(defaultMealType);
  const [query, setQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<'all' | 'walmart' | 'protein' | 'marketside' | 'snacks' | 'drinks'>('all');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [servings, setServings] = useState(1);
  const [onlineResults, setOnlineResults] = useState<FoodItem[]>([]);
  const [isSearchingOnline, setIsSearchingOnline] = useState(false);

  // Auto-debounced live search against OpenFoodFacts 3M+ products (including all Walmart products)
  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) {
      setOnlineResults([]);
      setIsSearchingOnline(false);
      return;
    }

    setIsSearchingOnline(true);
    const timer = setTimeout(async () => {
      try {
        const results = await searchOpenFoodFacts(q);
        setOnlineResults(results);
      } catch {
        setOnlineResults([]);
      } finally {
        setIsSearchingOnline(false);
      }
    }, 450);

    return () => clearTimeout(timer);
  }, [query]);

  // Local filter: verified foods + custom foods + recents
  const localFiltered = useMemo(() => {
    const q = query.toLowerCase().trim();
    let pool = [...customFoods, ...VERIFIED_FOODS];

    if (filterCategory === 'walmart') {
      pool = pool.filter(
        (item) =>
          item.brand?.toLowerCase().includes('walmart') ||
          item.brand?.toLowerCase().includes('great value') ||
          item.brand?.toLowerCase().includes('marketside') ||
          item.brand?.toLowerCase().includes('equate') ||
          item.name.toLowerCase().includes('great value')
      );
    } else if (filterCategory === 'protein') {
      pool = pool.filter((item) => item.protein >= 12);
    } else if (filterCategory === 'marketside') {
      pool = pool.filter((item) => item.brand?.toLowerCase().includes('marketside'));
    } else if (filterCategory === 'snacks') {
      pool = pool.filter(
        (item) =>
          item.name.toLowerCase().includes('cookie') ||
          item.name.toLowerCase().includes('chip') ||
          item.name.toLowerCase().includes('ice cream') ||
          item.name.toLowerCase().includes('pop-tart') ||
          item.name.toLowerCase().includes('pizza') ||
          item.name.toLowerCase().includes('dorito') ||
          item.name.toLowerCase().includes('cheeto') ||
          item.name.toLowerCase().includes('candy') ||
          item.name.toLowerCase().includes('oreo') ||
          item.name.toLowerCase().includes('waffle') ||
          item.name.toLowerCase().includes('macaroni') ||
          item.name.toLowerCase().includes('fries') ||
          item.name.toLowerCase().includes('zebra')
      );
    } else if (filterCategory === 'drinks') {
      pool = pool.filter(
        (item) =>
          item.name.toLowerCase().includes('cola') ||
          item.name.toLowerCase().includes('dew') ||
          item.name.toLowerCase().includes('soda') ||
          item.name.toLowerCase().includes('pepper') ||
          item.name.toLowerCase().includes('energy') ||
          item.name.toLowerCase().includes('shake')
      );
    }

    if (!q) {
      if (filterCategory !== 'all') {
        return pool;
      }
      return [...recentFoods, ...pool.slice(0, 15)];
    }

    const map = new Map<string, FoodItem>();
    pool.forEach((item) => map.set(item.id, item));

    return Array.from(map.values()).filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        (item.brand && item.brand.toLowerCase().includes(q))
    );
  }, [query, filterCategory, customFoods, recentFoods]);

  const handleOnlineSearch = async () => {
    if (!query.trim() || query.length < 2) return;
    setIsSearchingOnline(true);
    try {
      const results = await searchOpenFoodFacts(query);
      setOnlineResults(results);
    } catch {
      setOnlineResults([]);
    } finally {
      setIsSearchingOnline(false);
    }
  };

  const handleSelectFood = (food: FoodItem) => {
    setSelectedFood(food);
    setServings(1);
  };

  const handleConfirm = () => {
    if (!selectedFood) return;
    onAddFood(selectedFood, mealType, servings);
    onClose();
    setSelectedFood(null);
    setQuery('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/85 backdrop-blur-sm animate-fadeIn">
      <div className="bg-dark-900 border border-dark-750 w-full max-w-lg rounded-2xl p-5 shadow-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-dark-800">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Search size={18} />
            </div>
            <h3 className="font-bold text-dark-50 text-base">Search Foods</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-dark-400 hover:text-dark-50 hover:bg-dark-800 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Meal Slot Selector */}
        <div className="mt-3">
          <label className="block text-xs font-medium text-dark-400 mb-1.5">Add to Meal</label>
          <div className="grid grid-cols-4 gap-1.5">
            {(['breakfast', 'lunch', 'dinner', 'snack'] as MealType[]).map((type) => (
              <button
                type="button"
                key={type}
                onClick={() => setMealType(type)}
                className={`py-1.5 px-2 text-xs font-medium capitalize rounded-lg border transition ${
                  mealType === type
                    ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300'
                    : 'border-dark-750 text-dark-400 hover:text-dark-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Search Input */}
        <div className="mt-3 flex gap-2">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-500" />
            <input
              type="text"
              placeholder="Search chicken breast, oats, avocado..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleOnlineSearch()}
              className="w-full bg-dark-850 border border-dark-750 rounded-lg pl-9 pr-3 py-2 text-xs text-dark-50 placeholder:text-dark-600 focus:outline-none focus:border-cyan-500/50"
            />
          </div>
          <button
            type="button"
            onClick={handleOnlineSearch}
            disabled={isSearchingOnline || !query.trim()}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-dark-800 hover:bg-dark-750 text-dark-200 text-xs font-medium border border-dark-700 transition disabled:opacity-50"
            title="Search global 3M+ food database"
          >
            {isSearchingOnline ? (
              <Loader2 size={14} className="animate-spin text-cyan-400" />
            ) : (
              <Globe size={14} className="text-cyan-400" />
            )}
            <span className="hidden sm:inline">Web Search</span>
          </button>
        </div>

        {/* Quick Filter Chips */}
        <div className="mt-2.5 flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <button
            type="button"
            onClick={() => {
              setFilterCategory('all');
              setQuery('');
            }}
            className={`px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap border transition ${
              filterCategory === 'all' && !query
                ? 'bg-dark-750 text-dark-50 border-dark-600'
                : 'bg-dark-850 text-dark-400 border-dark-750 hover:text-dark-200'
            }`}
          >
            All Foods
          </button>
          <button
            type="button"
            onClick={() => {
              setFilterCategory('walmart');
              setQuery('Great Value');
            }}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap border transition ${
              filterCategory === 'walmart' || query.toLowerCase().includes('great value')
                ? 'bg-blue-950/50 text-blue-300 border-blue-700/50 shadow-sm'
                : 'bg-dark-850 text-dark-300 border-dark-750 hover:text-blue-300'
            }`}
          >
            <ShoppingCart size={11} className="text-blue-400" />
            <span>Walmart / Great Value</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setFilterCategory('protein');
              setQuery('');
            }}
            className={`px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap border transition ${
              filterCategory === 'protein'
                ? 'bg-amber-950/50 text-amber-300 border-amber-700/50 shadow-sm'
                : 'bg-dark-850 text-dark-400 border-dark-750 hover:text-dark-200'
            }`}
          >
            🍗 High Protein
          </button>
          <button
            type="button"
            onClick={() => {
              setFilterCategory('snacks');
              setQuery('');
            }}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap border transition ${
              filterCategory === 'snacks'
                ? 'bg-rose-950/50 text-rose-300 border-rose-700/50 shadow-sm'
                : 'bg-dark-850 text-dark-400 border-dark-750 hover:text-dark-200'
            }`}
          >
            🍕 Snacks & Treats
          </button>
          <button
            type="button"
            onClick={() => {
              setFilterCategory('drinks');
              setQuery('');
            }}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap border transition ${
              filterCategory === 'drinks'
                ? 'bg-purple-950/50 text-purple-300 border-purple-700/50 shadow-sm'
                : 'bg-dark-850 text-dark-400 border-dark-750 hover:text-dark-200'
            }`}
          >
            🥤 Drinks & Soda
          </button>
          <button
            type="button"
            onClick={() => {
              setFilterCategory('marketside');
              setQuery('Marketside');
            }}
            className={`px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap border transition ${
              filterCategory === 'marketside' || query.toLowerCase().includes('marketside')
                ? 'bg-emerald-950/50 text-emerald-300 border-emerald-700/50 shadow-sm'
                : 'bg-dark-850 text-dark-400 border-dark-750 hover:text-dark-200'
            }`}
          >
            🥗 Marketside Fresh
          </button>
        </div>

        {/* Results List */}
        <div className="mt-3 flex-1 overflow-y-auto min-h-[220px] max-h-[300px] space-y-1.5 pr-1">
          {selectedFood ? (
            /* Selected food customizer */
            <div className="p-4 rounded-xl bg-dark-850 border border-cyan-500/40 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold text-sm text-dark-50">{selectedFood.name}</h4>
                  {selectedFood.brand && (
                    <p className="text-xs text-dark-400">{selectedFood.brand}</p>
                  )}
                  <span className="text-[11px] text-dark-400 font-mono mt-0.5 inline-block">
                    Base: {selectedFood.servingUnit} ({selectedFood.servingSizeGrams}g)
                  </span>
                </div>
                <button
                  onClick={() => setSelectedFood(null)}
                  className="text-xs text-dark-400 hover:text-dark-200 underline"
                >
                  Change
                </button>
              </div>

              {/* Servings scale */}
              <div className="flex items-center justify-between pt-2 border-t border-dark-800">
                <span className="text-xs text-dark-300">Number of Servings:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setServings(Math.max(0.25, Number((servings - 0.25).toFixed(2))))}
                    className="w-7 h-7 rounded bg-dark-800 text-dark-200 font-bold text-xs hover:bg-dark-750"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="0.1"
                    step="0.1"
                    value={servings}
                    onChange={(e) => setServings(Math.max(0.1, parseFloat(e.target.value) || 1))}
                    className="w-16 bg-dark-900 border border-dark-700 rounded px-2 py-1 text-xs font-mono font-bold text-dark-50 text-center"
                  />
                  <button
                    onClick={() => setServings(Number((servings + 0.25).toFixed(2)))}
                    className="w-7 h-7 rounded bg-dark-800 text-dark-200 font-bold text-xs hover:bg-dark-750"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Scaled Macro preview */}
              <div className="grid grid-cols-4 gap-2 pt-2 border-t border-dark-800 text-center">
                <div className="p-1.5 rounded bg-dark-900">
                  <span className="text-[10px] text-dark-400 block">Calories</span>
                  <span className="text-xs font-mono font-bold text-amber-400">
                    {Math.round(selectedFood.calories * servings)}
                  </span>
                </div>
                <div className="p-1.5 rounded bg-dark-900">
                  <span className="text-[10px] text-dark-400 block">Protein</span>
                  <span className="text-xs font-mono font-bold text-cyan-400">
                    {(selectedFood.protein * servings).toFixed(1)}g
                  </span>
                </div>
                <div className="p-1.5 rounded bg-dark-900">
                  <span className="text-[10px] text-dark-400 block">Carbs</span>
                  <span className="text-xs font-mono font-bold text-emerald-400">
                    {(selectedFood.carbs * servings).toFixed(1)}g
                  </span>
                </div>
                <div className="p-1.5 rounded bg-dark-900">
                  <span className="text-[10px] text-dark-400 block">Fat</span>
                  <span className="text-xs font-mono font-bold text-purple-400">
                    {(selectedFood.fat * servings).toFixed(1)}g
                  </span>
                </div>
              </div>

              <button
                onClick={handleConfirm}
                className="w-full py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-dark-950 font-bold text-xs flex items-center justify-center gap-2 transition shadow-md shadow-cyan-500/20"
              >
                <Plus size={16} />
                Add to {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
              </button>
            </div>
          ) : (
            /* Items list */
            <>
              {/* Online results section */}
              {onlineResults.length > 0 && (
                <div className="mb-2">
                  <div className="flex items-center gap-1.5 px-2 py-1 text-[11px] font-mono text-cyan-400 uppercase tracking-wider">
                    <Globe size={12} />
                    <span>Global Database Results</span>
                  </div>
                  {onlineResults.map((food) => {
                    const isWalmart =
                      food.brand?.toLowerCase().includes('walmart') ||
                      food.brand?.toLowerCase().includes('great value') ||
                      food.brand?.toLowerCase().includes('marketside') ||
                      food.brand?.toLowerCase().includes('equate') ||
                      food.name.toLowerCase().includes('great value');

                    return (
                      <button
                        key={food.id}
                        onClick={() => handleSelectFood(food)}
                        className="w-full text-left p-2.5 rounded-lg bg-dark-850 hover:bg-dark-800 border border-dark-750 transition flex items-center justify-between gap-2 mb-1"
                      >
                        <div className="truncate">
                          <div className="flex items-center gap-1.5 truncate">
                            <span className="font-semibold text-xs text-dark-50 truncate">{food.name}</span>
                            {isWalmart && (
                              <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-blue-950/70 text-blue-300 border border-blue-700/40 flex-shrink-0">
                                Walmart
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-dark-400 truncate">
                            {food.brand ? `${food.brand} • ` : ''}{food.servingUnit}
                          </div>
                        </div>
                        <div className="flex items-center gap-2.5 font-mono text-xs flex-shrink-0">
                          <span className="text-amber-400 font-bold">{food.calories} cal</span>
                          <span className="text-cyan-400 text-[11px]">{food.protein}P</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Local / Verified results */}
              <div>
                {!query && (
                  <div className="flex items-center gap-1 px-2 py-1 text-[11px] font-mono text-dark-400 uppercase tracking-wider">
                    <Sparkles size={12} className="text-amber-400" />
                    <span>Verified Common Foods</span>
                  </div>
                )}
                {localFiltered.length === 0 && onlineResults.length === 0 ? (
                  <div className="text-center py-8 text-dark-400 text-xs">
                    No local foods found. Click <strong>Web Search</strong> or type to query 3M+ items online.
                  </div>
                ) : (
                  localFiltered.map((food) => {
                    const isWalmart =
                      food.brand?.toLowerCase().includes('walmart') ||
                      food.brand?.toLowerCase().includes('great value') ||
                      food.brand?.toLowerCase().includes('marketside') ||
                      food.brand?.toLowerCase().includes('equate') ||
                      food.name.toLowerCase().includes('great value');

                    return (
                      <button
                        key={food.id}
                        onClick={() => handleSelectFood(food)}
                        className="w-full text-left p-2.5 rounded-lg bg-dark-850 hover:bg-dark-800 border border-dark-750 transition flex items-center justify-between gap-2 mb-1"
                      >
                        <div className="truncate">
                          <div className="flex items-center gap-1.5 truncate">
                            <span className="font-semibold text-xs text-dark-50 truncate">{food.name}</span>
                            {isWalmart && (
                              <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-blue-950/70 text-blue-300 border border-blue-700/40 flex-shrink-0">
                                Walmart
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] text-dark-400 truncate">
                            {food.brand ? `${food.brand} • ` : ''}{food.servingUnit}
                          </div>
                        </div>
                        <div className="flex items-center gap-2.5 font-mono text-xs flex-shrink-0">
                          <span className="text-amber-400 font-bold">{food.calories} cal</span>
                          <span className="text-cyan-400 text-[11px]">{food.protein}P</span>
                          <span className="text-emerald-400 text-[11px]">{food.carbs}C</span>
                          <span className="text-purple-400 text-[11px]">{food.fat}F</span>
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer Hint */}
        <div className="pt-2 px-1 text-[11px] text-dark-400 flex items-center justify-between border-t border-dark-800">
          <div className="flex items-center gap-1.5">
            <Sparkles size={12} className="text-amber-400 flex-shrink-0" />
            <span>Search any Walmart food or scan barcodes directly with your camera</span>
          </div>
          <span className="text-[10px] text-dark-500 font-mono hidden sm:inline">3M+ items</span>
        </div>
      </div>
    </div>
  );
};
