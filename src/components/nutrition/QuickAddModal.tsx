import React, { useState } from 'react';
import { MealType } from '../../types';
import { X, Zap } from 'lucide-react';

interface QuickAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (mealType: MealType, name: string, cal: number, prot: number, carbs: number, fat: number) => void;
  defaultMealType?: MealType;
}

export const QuickAddModal: React.FC<QuickAddModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  defaultMealType = 'breakfast',
}) => {
  const [mealType, setMealType] = useState<MealType>(defaultMealType);
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cal = parseFloat(calories) || 0;
    const prot = parseFloat(protein) || 0;
    const carb = parseFloat(carbs) || 0;
    const f = parseFloat(fat) || 0;

    if (cal === 0 && prot === 0 && carb === 0 && f === 0) return;

    onAdd(mealType, name || 'Quick Entry', cal, prot, carb, f);
    onClose();
    // reset
    setName('');
    setCalories('');
    setProtein('');
    setCarbs('');
    setFat('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-dark-900 border border-dark-750 w-full max-w-md rounded-2xl p-5 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-dark-800">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
              <Zap size={18} />
            </div>
            <h3 className="font-bold text-dark-50 text-base">Quick Macro Add</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-dark-400 hover:text-dark-50 hover:bg-dark-800 transition"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {/* Meal Slot Selector */}
          <div>
            <label className="block text-xs font-medium text-dark-400 mb-1.5">Meal Slot</label>
            <div className="grid grid-cols-4 gap-1.5">
              {(['breakfast', 'lunch', 'dinner', 'snack'] as MealType[]).map((type) => (
                <button
                  type="button"
                  key={type}
                  onClick={() => setMealType(type)}
                  className={`py-1.5 px-2 text-xs font-medium capitalize rounded-lg border transition ${
                    mealType === type
                      ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                      : 'border-dark-750 text-dark-400 hover:text-dark-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-medium text-dark-400 mb-1">Description (optional)</label>
            <input
              type="text"
              placeholder="e.g. Afternoon Snack, Protein Shake"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-dark-850 border border-dark-750 rounded-lg px-3 py-2 text-sm text-dark-50 placeholder:text-dark-600 focus:outline-none focus:border-amber-500/50"
            />
          </div>

          {/* Calories Input */}
          <div>
            <label className="block text-xs font-medium text-amber-400 mb-1">Energy (Calories / kcal)</label>
            <input
              type="number"
              placeholder="0"
              min="0"
              step="any"
              required
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              className="w-full bg-dark-850 border border-amber-500/30 rounded-lg px-3 py-2 text-base font-mono font-bold text-dark-50 placeholder:text-dark-600 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Macro Inputs */}
          <div className="grid grid-cols-3 gap-2.5">
            <div>
              <label className="block text-xs font-medium text-cyan-400 mb-1">Protein (g)</label>
              <input
                type="number"
                placeholder="0"
                min="0"
                step="any"
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
                className="w-full bg-dark-850 border border-dark-750 rounded-lg px-2.5 py-2 text-sm font-mono text-dark-50 focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-emerald-400 mb-1">Carbs (g)</label>
              <input
                type="number"
                placeholder="0"
                min="0"
                step="any"
                value={carbs}
                onChange={(e) => setCarbs(e.target.value)}
                className="w-full bg-dark-850 border border-dark-750 rounded-lg px-2.5 py-2 text-sm font-mono text-dark-50 focus:outline-none focus:border-emerald-400"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-purple-400 mb-1">Fat (g)</label>
              <input
                type="number"
                placeholder="0"
                min="0"
                step="any"
                value={fat}
                onChange={(e) => setFat(e.target.value)}
                className="w-full bg-dark-850 border border-dark-750 rounded-lg px-2.5 py-2 text-sm font-mono text-dark-50 focus:outline-none focus:border-purple-400"
              />
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 rounded-lg border border-dark-750 text-dark-400 hover:text-dark-200 hover:bg-dark-800 transition text-sm font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-dark-950 font-bold transition text-sm shadow-md shadow-amber-500/20"
            >
              Add to Log
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
