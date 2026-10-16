import React, { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { useNutritionStore } from '../../store/useNutritionStore';
import { MealType, FoodItem } from '../../types';
import { MacroRings } from './MacroRings';
import { QuickAddModal } from './QuickAddModal';
import { BarcodeScannerModal } from './BarcodeScannerModal';
import { FoodSearchModal } from './FoodSearchModal';
import {
  Plus,
  Barcode,
  Search,
  Zap,
  Trash2,
  Coffee,
  Sun,
  Moon,
  Cookie,
  LucideIcon,
} from 'lucide-react';

export const NutritionView: React.FC = () => {
  const { user } = useAuthStore();
  const {
    selectedDate,
    dailyLogs,
    addFoodToLog,
    quickAddMacros,
    removeMealItem,
    getDailyTotals,
  } = useNutritionStore();

  const [activeModal, setActiveModal] = useState<'quick' | 'scan' | 'search' | null>(null);
  const [targetMealType, setTargetMealType] = useState<MealType>('breakfast');

  const consumed = getDailyTotals(selectedDate);
  const currentLogs = dailyLogs[selectedDate] || [];

  const meals: { type: MealType; title: string; icon: LucideIcon }[] = [
    { type: 'breakfast', title: 'Breakfast', icon: Coffee },
    { type: 'lunch', title: 'Lunch', icon: Sun },
    { type: 'dinner', title: 'Dinner', icon: Moon },
    { type: 'snack', title: 'Snacks & Extras', icon: Cookie },
  ];

  const handleOpenAction = (action: 'quick' | 'scan' | 'search', type: MealType) => {
    setTargetMealType(type);
    setActiveModal(action);
  };

  const handleAddFoodFromSearchOrScan = (food: FoodItem, type: MealType, servings: number) => {
    addFoodToLog(type, food, servings, selectedDate);
  };

  const handleQuickAdd = (type: MealType, name: string, cal: number, prot: number, carbs: number, fat: number) => {
    quickAddMacros(type, name, cal, prot, carbs, fat, selectedDate);
  };

  return (
    <div className="space-y-5 pb-24">
      {/* Signature Macro Rings */}
      <MacroRings goals={user.macroGoals} consumed={consumed} />

      {/* Quick Action Dock */}
      <div className="grid grid-cols-3 gap-2.5">
        <button
          onClick={() => handleOpenAction('scan', 'breakfast')}
          className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-dark-850 hover:bg-dark-800 border border-dark-750 text-dark-100 font-semibold text-xs transition group shadow-sm"
        >
          <div className="p-1 rounded-md bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition">
            <Barcode size={16} />
          </div>
          <span>Scan Barcode</span>
        </button>

        <button
          onClick={() => handleOpenAction('search', 'breakfast')}
          className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-dark-850 hover:bg-dark-800 border border-dark-750 text-dark-100 font-semibold text-xs transition group shadow-sm"
        >
          <div className="p-1 rounded-md bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition">
            <Search size={16} />
          </div>
          <span>Search Foods</span>
        </button>

        <button
          onClick={() => handleOpenAction('quick', 'breakfast')}
          className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-dark-850 hover:bg-dark-800 border border-dark-750 text-dark-100 font-semibold text-xs transition group shadow-sm"
        >
          <div className="p-1 rounded-md bg-amber-500/10 text-amber-400 group-hover:scale-110 transition">
            <Zap size={16} />
          </div>
          <span>Quick Add</span>
        </button>
      </div>

      {/* 4 Meal Slots */}
      <div className="space-y-3.5">
        {meals.map((meal) => {
          const Icon = meal.icon;
          const itemsInMeal = currentLogs.filter((item) => item.mealType === meal.type);
          const mealCalories = itemsInMeal.reduce((sum, item) => sum + item.calories, 0);
          const mealProtein = itemsInMeal.reduce((sum, item) => sum + item.protein, 0);

          return (
            <div
              key={meal.type}
              className="bg-dark-850/80 border border-dark-750/80 rounded-2xl p-4 transition shadow-sm hover:border-dark-700"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-2 border-b border-dark-800">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-dark-800 text-amber-400">
                    <Icon size={16} />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-dark-50">{meal.title}</h3>
                    <p className="text-[11px] font-mono text-dark-400">
                      {mealCalories} kcal • {mealProtein.toFixed(1)}g P
                    </p>
                  </div>
                </div>

                {/* Slot quick buttons */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenAction('search', meal.type)}
                    className="p-1.5 rounded-lg text-dark-400 hover:text-dark-200 hover:bg-dark-800 transition"
                    title="Search Food"
                  >
                    <Search size={15} />
                  </button>
                  <button
                    onClick={() => handleOpenAction('scan', meal.type)}
                    className="p-1.5 rounded-lg text-dark-400 hover:text-dark-200 hover:bg-dark-800 transition"
                    title="Scan Barcode"
                  >
                    <Barcode size={15} />
                  </button>
                  <button
                    onClick={() => handleOpenAction('quick', meal.type)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-dark-800 hover:bg-dark-750 text-dark-200 text-xs font-medium border border-dark-700 transition"
                  >
                    <Plus size={13} className="text-amber-400" />
                    <span>Add</span>
                  </button>
                </div>
              </div>

              {/* Items in Meal */}
              {itemsInMeal.length === 0 ? (
                <div className="py-4 text-center">
                  <p className="text-xs text-dark-500 font-mono">No items logged yet</p>
                </div>
              ) : (
                <div className="divide-y divide-dark-800/60 mt-1">
                  {itemsInMeal.map((item) => (
                    <div
                      key={item.id}
                      className="py-2.5 flex items-center justify-between gap-3 group"
                    >
                      <div className="truncate flex-1">
                        <div className="font-medium text-xs text-dark-100 truncate">
                          {item.name}
                        </div>
                        <div className="text-[10px] text-dark-400 font-mono flex items-center gap-2 mt-0.5">
                          <span>{item.servings} serving ({item.servingSizeGrams}g)</span>
                          {item.brand && <span>• {item.brand}</span>}
                        </div>
                      </div>

                      {/* Macros */}
                      <div className="flex items-center gap-3 font-mono text-xs flex-shrink-0">
                        <div className="text-right">
                          <div className="font-bold text-dark-50">{item.calories} <span className="text-[10px] text-amber-400">cal</span></div>
                          <div className="text-[10px] text-dark-400">
                            <span className="text-cyan-400">{item.protein}P</span> •{' '}
                            <span className="text-emerald-400">{item.carbs}C</span> •{' '}
                            <span className="text-purple-400">{item.fat}F</span>
                          </div>
                        </div>

                        {/* Delete */}
                        <button
                          onClick={() => removeMealItem(item.id, selectedDate)}
                          className="p-1 rounded text-dark-600 hover:text-rose-400 transition"
                          title="Delete item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modals */}
      <QuickAddModal
        isOpen={activeModal === 'quick'}
        onClose={() => setActiveModal(null)}
        onAdd={handleQuickAdd}
        defaultMealType={targetMealType}
      />

      <BarcodeScannerModal
        isOpen={activeModal === 'scan'}
        onClose={() => setActiveModal(null)}
        onFoodScanned={handleAddFoodFromSearchOrScan}
        defaultMealType={targetMealType}
      />

      <FoodSearchModal
        isOpen={activeModal === 'search'}
        onClose={() => setActiveModal(null)}
        onAddFood={handleAddFoodFromSearchOrScan}
        defaultMealType={targetMealType}
      />
    </div>
  );
};
