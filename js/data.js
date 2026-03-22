// ============================================
// SYSTEM — DATA DEFINITIONS
// ============================================

const CLASS_BONUSES = {
  fighter:  { str: 5, vit: 2, agi: 1, int: 0, sense: 0 },
  mage:     { str: 0, vit: 0, agi: 1, int: 6, sense: 1 },
  assassin: { str: 2, vit: 0, agi: 6, int: 0, sense: 2 },
  tank:     { str: 2, vit: 6, agi: 0, int: 0, sense: 0 },
  ranger:   { str: 1, vit: 1, agi: 3, int: 1, sense: 4 },
};

const RANKS = [
  { lvl: 1,  name: 'E-RANK HUNTER',    color: '#7aa0cc' },
  { lvl: 5,  name: 'D-RANK HUNTER',    color: '#4ade80' },
  { lvl: 10, name: 'C-RANK HUNTER',    color: '#60a5fa' },
  { lvl: 20, name: 'B-RANK HUNTER',    color: '#a78bfa' },
  { lvl: 30, name: 'A-RANK HUNTER',    color: '#f59e0b' },
  { lvl: 50, name: 'S-RANK HUNTER',    color: '#f0c040' },
  { lvl: 75, name: 'NATIONAL HUNTER',  color: '#ff6b35' },
  { lvl: 99, name: 'SHADOW MONARCH',   color: '#a855f7' },
];

const QUEST_POOL = [
  // Strength
  { id: 'pushups',   name: 'Complete 100 push-ups',     xp: 35, stat: 'str',   category: 'strength',  icon: '💪' },
  { id: 'pullups',   name: 'Do 50 pull-ups',            xp: 40, stat: 'str',   category: 'strength',  icon: '🏋️' },
  { id: 'squats',    name: 'Complete 150 squats',        xp: 35, stat: 'str',   category: 'strength',  icon: '🦵' },
  { id: 'plank',     name: 'Hold plank for 3 minutes',  xp: 25, stat: 'vit',   category: 'strength',  icon: '🧱' },
  { id: 'dips',      name: 'Do 60 tricep dips',         xp: 30, stat: 'str',   category: 'strength',  icon: '💪' },
  // Cardio
  { id: 'run3k',     name: 'Run 3 km',                  xp: 40, stat: 'agi',   category: 'cardio',    icon: '🏃' },
  { id: 'run5k',     name: 'Run 5 km',                  xp: 60, stat: 'agi',   category: 'cardio',    icon: '🏃' },
  { id: 'jump',      name: '500 jump rope reps',        xp: 30, stat: 'agi',   category: 'cardio',    icon: '⚡' },
  { id: 'bike',      name: 'Cycle 10 km',               xp: 45, stat: 'agi',   category: 'cardio',    icon: '🚴' },
  { id: 'stairs',    name: 'Climb 30 flights of stairs',xp: 35, stat: 'vit',   category: 'cardio',    icon: '🪜' },
  // Nutrition
  { id: 'protein',   name: 'Hit 150g protein goal',     xp: 30, stat: 'vit',   category: 'nutrition', icon: '🥩' },
  { id: 'water',     name: 'Drink 2.5L of water',       xp: 20, stat: 'vit',   category: 'nutrition', icon: '💧' },
  { id: 'veggies',   name: 'Eat 5 servings of vegetables', xp: 25, stat: 'vit', category: 'nutrition', icon: '🥦' },
  { id: 'nosugar',   name: 'Zero added sugar today',    xp: 35, stat: 'vit',   category: 'nutrition', icon: '🚫' },
  { id: 'meal_prep', name: 'Prep meals for tomorrow',   xp: 25, stat: 'int',   category: 'nutrition', icon: '🍱' },
  // Mental
  { id: 'meditate',  name: 'Meditate for 15 minutes',   xp: 25, stat: 'int',   category: 'mental',    icon: '🧘' },
  { id: 'journal',   name: 'Write in your journal',     xp: 20, stat: 'int',   category: 'mental',    icon: '📓' },
  { id: 'read',      name: 'Read for 30 minutes',       xp: 25, stat: 'int',   category: 'mental',    icon: '📖' },
  { id: 'gratitude', name: 'List 5 things you\'re grateful for', xp: 15, stat: 'int', category: 'mental', icon: '✨' },
  { id: 'nophone',   name: 'No phone for 2 hours',      xp: 30, stat: 'sense', category: 'mental',    icon: '📵' },
  // Lifestyle
  { id: 'sleep',     name: 'Sleep by 10 PM',            xp: 30, stat: 'vit',   category: 'lifestyle', icon: '🌙' },
  { id: 'morning',   name: 'Wake up before 6 AM',       xp: 35, stat: 'sense', category: 'lifestyle', icon: '🌅' },
  { id: 'cold',      name: 'Take a cold shower',        xp: 25, stat: 'vit',   category: 'lifestyle', icon: '🚿' },
  { id: 'steps',     name: 'Walk 10,000 steps',         xp: 35, stat: 'agi',   category: 'lifestyle', icon: '👟' },
  { id: 'stretch',   name: 'Stretch for 20 minutes',    xp: 20, stat: 'agi',   category: 'lifestyle', icon: '🤸' },
];

const FOOD_DB = [
  // Proteins
  { name: 'Chicken Breast (100g)',  cal: 165, protein: 31, carbs: 0,  fat: 4  },
  { name: 'Ground Beef 90% (100g)',  cal: 215, protein: 26, carbs: 0,  fat: 12 },
  { name: 'Salmon (100g)',           cal: 208, protein: 20, carbs: 0,  fat: 13 },
  { name: 'Tuna Can (140g)',         cal: 130, protein: 28, carbs: 0,  fat: 1  },
  { name: 'Egg (1 large)',           cal: 78,  protein: 6,  carbs: 0,  fat: 5  },
  { name: 'Egg Whites (3)',          cal: 51,  protein: 11, carbs: 1,  fat: 0  },
  { name: 'Protein Shake',          cal: 130, protein: 25, carbs: 5,  fat: 2  },
  { name: 'Greek Yogurt (150g)',     cal: 100, protein: 17, carbs: 6,  fat: 0  },
  { name: 'Cottage Cheese (100g)',   cal: 98,  protein: 11, carbs: 3,  fat: 4  },
  { name: 'Beef Steak (150g)',       cal: 280, protein: 40, carbs: 0,  fat: 12 },
  // Carbs
  { name: 'White Rice (100g cooked)',cal: 130, protein: 3,  carbs: 28, fat: 0  },
  { name: 'Brown Rice (100g cooked)',cal: 111, protein: 3,  carbs: 23, fat: 1  },
  { name: 'Oats (50g dry)',          cal: 189, protein: 7,  carbs: 32, fat: 4  },
  { name: 'Sweet Potato (100g)',     cal: 86,  protein: 2,  carbs: 20, fat: 0  },
  { name: 'Whole Wheat Bread (1sl)', cal: 80,  protein: 4,  carbs: 15, fat: 1  },
  { name: 'Pasta (100g cooked)',     cal: 158, protein: 6,  carbs: 31, fat: 1  },
  { name: 'Banana',                 cal: 89,  protein: 1,  carbs: 23, fat: 0  },
  { name: 'Apple',                  cal: 52,  protein: 0,  carbs: 14, fat: 0  },
  { name: 'Orange',                 cal: 47,  protein: 1,  carbs: 12, fat: 0  },
  // Vegetables
  { name: 'Broccoli (100g)',         cal: 34,  protein: 3,  carbs: 7,  fat: 0  },
  { name: 'Spinach (100g)',          cal: 23,  protein: 3,  carbs: 4,  fat: 0  },
  { name: 'Mixed Greens (100g)',     cal: 20,  protein: 2,  carbs: 3,  fat: 0  },
  // Fats
  { name: 'Almonds (28g)',           cal: 164, protein: 6,  carbs: 6,  fat: 14 },
  { name: 'Peanut Butter (2 tbsp)', cal: 188, protein: 8,  carbs: 7,  fat: 16 },
  { name: 'Avocado (half)',          cal: 120, protein: 2,  carbs: 6,  fat: 11 },
  { name: 'Olive Oil (1 tbsp)',      cal: 119, protein: 0,  carbs: 0,  fat: 14 },
  // Dairy
  { name: 'Milk 2% (240ml)',         cal: 122, protein: 8,  carbs: 12, fat: 5  },
  { name: 'Cheddar Cheese (30g)',    cal: 114, protein: 7,  carbs: 0,  fat: 9  },
];

const WORKOUT_TYPES = [
  { id: 'strength',  name: 'Strength',   icon: '🏋️', color: '#00b4ff', xpPerMin: 1.5 },
  { id: 'cardio',    name: 'Cardio',     icon: '🏃', color: '#00e5a0', xpPerMin: 1.2 },
  { id: 'hiit',      name: 'HIIT',       icon: '⚡', color: '#f0c040', xpPerMin: 2.0 },
  { id: 'yoga',      name: 'Yoga/Flex',  icon: '🧘', color: '#a855f7', xpPerMin: 0.8 },
  { id: 'sports',    name: 'Sports',     icon: '⚽', color: '#ff6b35', xpPerMin: 1.3 },
  { id: 'walk',      name: 'Walking',    icon: '👟', color: '#60a5fa', xpPerMin: 0.6 },
];

function getRank(level) {
  let rank = RANKS[0];
  for (const r of RANKS) {
    if (level >= r.lvl) rank = r;
  }
  return rank;
}

function xpForLevel(level) {
  return Math.round(100 * Math.pow(1.45, level - 1));
}

function getDailyQuests() {
  // Deterministic daily selection based on date
  const today = new Date().toDateString();
  let seed = today.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  const shuffled = [...QUEST_POOL].sort(() => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return (seed % 3) - 1;
  });
  // Pick 2 strength/cardio, 1 nutrition, 1 mental, 1 lifestyle
  const picks = [];
  const cats = { strength: 0, cardio: 0, nutrition: 0, mental: 0, lifestyle: 0 };
  const want  = { strength: 1, cardio: 1, nutrition: 1, mental: 1, lifestyle: 1 };
  for (const q of shuffled) {
    if ((cats[q.category] || 0) < (want[q.category] || 0)) {
      picks.push({ ...q, done: false });
      cats[q.category] = (cats[q.category] || 0) + 1;
    }
    if (picks.length === 5) break;
  }
  return picks;
}
