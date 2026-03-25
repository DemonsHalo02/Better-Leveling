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
  { lvl: 70, name: 'NATIONAL HUNTER',  color: '#ff6b35' },
  { lvl: 90, name: 'SHADOW MONARCH',   color: '#a855f7' },
];

// ── ELITE QUEST POOL (B-rank and above only) ─────────
// These are harder challenges that unlock at level 20+
const ELITE_QUEST_POOL = [
  // B-Rank (level 20+)
  { id:'b_400push',    name:'Complete 400 push-ups today',             xp:90,  stat:'str',   category:'strength',  icon:'💪', minLevel:20 },
  { id:'b_10k_run',    name:'Run 10km without stopping',               xp:100, stat:'agi',   category:'cardio',    icon:'🏃', minLevel:20 },
  { id:'b_24fast',     name:'Complete a 24-hour fast',                 xp:120, stat:'vit',   category:'nutrition', icon:'⏱️', minLevel:20 },
  { id:'b_2h_meditate',name:'Meditate for 2 hours total today',        xp:90,  stat:'int',   category:'mental',    icon:'🧘', minLevel:20 },
  { id:'b_3am',        name:'Wake up at 3AM and train',                xp:100, stat:'sense', category:'lifestyle', icon:'🌙', minLevel:20 },
  // A-Rank (level 30+)
  { id:'a_1000reps',   name:'1,000 total reps in one session',         xp:130, stat:'str',   category:'strength',  icon:'🔥', minLevel:30 },
  { id:'a_halfmarathon',name:'Run a half marathon (21km)',             xp:160, stat:'agi',   category:'cardio',    icon:'🏃', minLevel:30 },
  { id:'a_nofood_36',  name:'Fast for 36 hours',                       xp:150, stat:'vit',   category:'nutrition', icon:'⏱️', minLevel:30 },
  { id:'a_bookday',    name:'Read an entire book in one day',          xp:130, stat:'int',   category:'mental',    icon:'📖', minLevel:30 },
  { id:'a_sunrise_train', name:'Wake up before sunrise and train outdoors', xp:120, stat:'sense', category:'lifestyle', icon:'🌅', minLevel:30 },
  // S-Rank (level 50+)
  { id:'s_2000reps',   name:'2,000 total reps across the day',         xp:180, stat:'str',   category:'strength',  icon:'⚔️', minLevel:50 },
  { id:'s_marathon',   name:'Run a full marathon (42km)',               xp:220, stat:'agi',   category:'cardio',    icon:'🏃', minLevel:50 },
  { id:'s_48fast',     name:'Complete a 48-hour fast',                 xp:200, stat:'vit',   category:'nutrition', icon:'⏱️', minLevel:50 },
  { id:'s_notech',     name:'Full technology detox — 24 hours',        xp:180, stat:'sense', category:'mental',    icon:'📵', minLevel:50 },
  { id:'s_iceplunge',  name:'Take 5 ice-cold plunges in one day',      xp:160, stat:'vit',   category:'lifestyle', icon:'🧊', minLevel:50 },
  // National Hunter (level 70+)
  { id:'n_ironman',    name:'Train for 3+ hours without stopping',     xp:280, stat:'str',   category:'strength',  icon:'👑', minLevel:70 },
  { id:'n_50k',        name:'Complete a 50km run or walk',             xp:300, stat:'agi',   category:'cardio',    icon:'👑', minLevel:70 },
  { id:'n_72fast',     name:'Complete a 72-hour fast (3 days)',        xp:280, stat:'vit',   category:'nutrition', icon:'👑', minLevel:70 },
  { id:'n_masterclass', name:'Complete a full online course in one day',  xp:260, stat:'int',   category:'mental',    icon:'👑', minLevel:70 },
  { id:'n_routine',    name:'Complete your full perfect day routine',   xp:250, stat:'sense', category:'lifestyle', icon:'👑', minLevel:70 },
  // Shadow Monarch (level 90+)
  { id:'sm_godmode',   name:'1 hour workout + 10km run + 30min meditate', xp:400, stat:'str', category:'strength', icon:'🦋', minLevel:90 },
  { id:'sm_ultrafast', name:'Complete a 5-day fast (water only)',      xp:500, stat:'vit',   category:'nutrition', icon:'🦋', minLevel:90 },
  { id:'sm_ascend',    name:'Train, read, meditate, journal all in one day', xp:380, stat:'int', category:'mental', icon:'🦋', minLevel:90 },
  { id:'sm_rise',      name:'5AM wake-up, train, cold plunge 7 days straight', xp:450, stat:'sense', category:'lifestyle', icon:'🦋', minLevel:90 },
];

const QUEST_POOL = [
  // ── STRENGTH ─────────────────────────────────────────
  { id: 'pushups100',   name: 'Complete 100 push-ups',           xp: 35, stat: 'str',   category: 'strength',  icon: '💪' },
  { id: 'pushups50',    name: 'Complete 50 push-ups',            xp: 20, stat: 'str',   category: 'strength',  icon: '💪' },
  { id: 'pullups50',    name: 'Do 50 pull-ups',                  xp: 40, stat: 'str',   category: 'strength',  icon: '🏋️' },
  { id: 'pullups20',    name: 'Do 20 pull-ups',                  xp: 22, stat: 'str',   category: 'strength',  icon: '🏋️' },
  { id: 'squats150',    name: 'Complete 150 squats',             xp: 35, stat: 'str',   category: 'strength',  icon: '🦵' },
  { id: 'squats75',     name: 'Complete 75 squats',              xp: 20, stat: 'str',   category: 'strength',  icon: '🦵' },
  { id: 'plank3',       name: 'Hold plank for 3 minutes',        xp: 25, stat: 'vit',   category: 'strength',  icon: '🧱' },
  { id: 'plank5',       name: 'Hold plank for 5 minutes total',  xp: 35, stat: 'vit',   category: 'strength',  icon: '🧱' },
  { id: 'dips60',       name: 'Do 60 tricep dips',               xp: 30, stat: 'str',   category: 'strength',  icon: '💪' },
  { id: 'lunges100',    name: 'Do 100 walking lunges',           xp: 30, stat: 'str',   category: 'strength',  icon: '🦵' },
  { id: 'burpees30',    name: 'Complete 30 burpees',             xp: 35, stat: 'str',   category: 'strength',  icon: '🔥' },
  { id: 'burpees50',    name: 'Complete 50 burpees',             xp: 50, stat: 'str',   category: 'strength',  icon: '🔥' },
  { id: 'crunches200',  name: 'Do 200 crunches',                 xp: 28, stat: 'str',   category: 'strength',  icon: '💪' },
  { id: 'legpress',     name: 'Complete a full leg day workout', xp: 45, stat: 'str',   category: 'strength',  icon: '🏋️' },
  { id: 'pushvariant',  name: 'Do 3 different push-up variations',xp:30, stat: 'str',   category: 'strength',  icon: '💪' },
  { id: 'isometric',    name: 'Hold a wall sit for 3 minutes',   xp: 25, stat: 'vit',   category: 'strength',  icon: '🧱' },
  { id: 'handstand',    name: 'Practice handstand for 5 min',    xp: 30, stat: 'str',   category: 'strength',  icon: '🤸' },
  { id: 'muscleups',    name: 'Do 5 muscle-ups',                 xp: 45, stat: 'str',   category: 'strength',  icon: '🏋️' },
  { id: 'armday',       name: 'Complete a full upper body session',xp:40, stat: 'str',   category: 'strength',  icon: '💪' },

  // ── CARDIO ───────────────────────────────────────────
  { id: 'run3k',        name: 'Run 3 km',                        xp: 40, stat: 'agi',   category: 'cardio',    icon: '🏃' },
  { id: 'run5k',        name: 'Run 5 km',                        xp: 60, stat: 'agi',   category: 'cardio',    icon: '🏃' },
  { id: 'run1k',        name: 'Run 1 km without stopping',       xp: 20, stat: 'agi',   category: 'cardio',    icon: '🏃' },
  { id: 'run10k',       name: 'Run 10 km',                       xp: 90, stat: 'agi',   category: 'cardio',    icon: '🏃' },
  { id: 'jump500',      name: '500 jump rope reps',              xp: 30, stat: 'agi',   category: 'cardio',    icon: '⚡' },
  { id: 'jump1000',     name: '1,000 jump rope reps',            xp: 45, stat: 'agi',   category: 'cardio',    icon: '⚡' },
  { id: 'bike10',       name: 'Cycle 10 km',                     xp: 45, stat: 'agi',   category: 'cardio',    icon: '🚴' },
  { id: 'bike20',       name: 'Cycle 20 km',                     xp: 65, stat: 'agi',   category: 'cardio',    icon: '🚴' },
  { id: 'stairs',       name: 'Climb 30 flights of stairs',      xp: 35, stat: 'vit',   category: 'cardio',    icon: '🪜' },
  { id: 'hiit20',       name: 'Complete 20 min HIIT session',    xp: 45, stat: 'agi',   category: 'cardio',    icon: '🔥' },
  { id: 'swim',         name: 'Swim for 30 minutes',             xp: 50, stat: 'agi',   category: 'cardio',    icon: '🏊' },
  { id: 'sprint',       name: 'Do 10 x 100m sprints',           xp: 50, stat: 'agi',   category: 'cardio',    icon: '⚡' },
  { id: 'walk8k',       name: 'Walk 8,000 steps',                xp: 25, stat: 'agi',   category: 'cardio',    icon: '👟' },
  { id: 'walk12k',      name: 'Walk 12,000 steps',               xp: 40, stat: 'agi',   category: 'cardio',    icon: '👟' },
  { id: 'shadowbox',    name: 'Shadow box for 15 minutes',       xp: 35, stat: 'agi',   category: 'cardio',    icon: '🥊' },
  { id: 'dancing',      name: 'Dance for 30 minutes straight',   xp: 30, stat: 'agi',   category: 'cardio',    icon: '💃' },
  { id: 'cardio45',     name: 'Do 45 min of any cardio',         xp: 50, stat: 'agi',   category: 'cardio',    icon: '🏃' },

  // ── NUTRITION ────────────────────────────────────────
  { id: 'protein150',   name: 'Hit 150g protein goal',           xp: 30, stat: 'vit',   category: 'nutrition', icon: '🥩' },
  { id: 'protein120',   name: 'Hit 120g protein today',          xp: 22, stat: 'vit',   category: 'nutrition', icon: '🥩' },
  { id: 'water2l',      name: 'Drink 2L of water',               xp: 15, stat: 'vit',   category: 'nutrition', icon: '💧' },
  { id: 'water3l',      name: 'Drink 3L of water',               xp: 25, stat: 'vit',   category: 'nutrition', icon: '💧' },
  { id: 'veggies5',     name: 'Eat 5 servings of vegetables',    xp: 25, stat: 'vit',   category: 'nutrition', icon: '🥦' },
  { id: 'veggies3',     name: 'Eat 3 servings of vegetables',    xp: 15, stat: 'vit',   category: 'nutrition', icon: '🥦' },
  { id: 'nosugar',      name: 'Zero added sugar today',          xp: 35, stat: 'vit',   category: 'nutrition', icon: '🚫' },
  { id: 'nojunk',       name: 'No junk food or fast food today', xp: 30, stat: 'vit',   category: 'nutrition', icon: '🚫' },
  { id: 'meal_prep',    name: 'Prep meals for tomorrow',         xp: 25, stat: 'int',   category: 'nutrition', icon: '🍱' },
  { id: 'deficit',      name: 'Stay in a calorie deficit today', xp: 30, stat: 'vit',   category: 'nutrition', icon: '⚖️' },
  { id: 'breakfast',    name: 'Eat a high-protein breakfast',    xp: 20, stat: 'vit',   category: 'nutrition', icon: '🍳' },
  { id: 'noalcohol',    name: 'No alcohol today',                xp: 25, stat: 'vit',   category: 'nutrition', icon: '🚫' },
  { id: 'fruit3',       name: 'Eat 3 different fruits today',    xp: 18, stat: 'vit',   category: 'nutrition', icon: '🍎' },
  { id: 'intermittent', name: 'Fast for 16 hours (16:8)',        xp: 40, stat: 'vit',   category: 'nutrition', icon: '⏱️' },
  { id: 'homecook',     name: 'Cook every meal at home today',   xp: 30, stat: 'int',   category: 'nutrition', icon: '👨‍🍳' },
  { id: 'supplements',  name: 'Take all your supplements',       xp: 15, stat: 'vit',   category: 'nutrition', icon: '💊' },
  { id: 'greens',       name: 'Drink a greens/veggie smoothie',  xp: 20, stat: 'vit',   category: 'nutrition', icon: '🥤' },
  { id: 'omega3',       name: 'Eat an omega-3 rich meal',        xp: 18, stat: 'vit',   category: 'nutrition', icon: '🐟' },

  // ── MENTAL ───────────────────────────────────────────
  { id: 'meditate15',   name: 'Meditate for 15 minutes',         xp: 25, stat: 'int',   category: 'mental',    icon: '🧘' },
  { id: 'meditate5',    name: 'Meditate for 5 minutes',          xp: 12, stat: 'int',   category: 'mental',    icon: '🧘' },
  { id: 'meditate30',   name: 'Meditate for 30 minutes',         xp: 40, stat: 'int',   category: 'mental',    icon: '🧘' },
  { id: 'journal',      name: 'Write in your journal',           xp: 20, stat: 'int',   category: 'mental',    icon: '📓' },
  { id: 'journal3pg',   name: 'Write 3 full pages in journal',   xp: 35, stat: 'int',   category: 'mental',    icon: '📓' },
  { id: 'read30',       name: 'Read for 30 minutes',             xp: 25, stat: 'int',   category: 'mental',    icon: '📖' },
  { id: 'read60',       name: 'Read for 1 hour',                 xp: 40, stat: 'int',   category: 'mental',    icon: '📖' },
  { id: 'gratitude',    name: 'List 5 things you are grateful for', xp: 15, stat: 'int', category: 'mental',   icon: '✨' },
  { id: 'nophone2',     name: 'No phone for 2 hours',            xp: 30, stat: 'sense', category: 'mental',    icon: '📵' },
  { id: 'nophone1',     name: 'No phone for 1 hour',             xp: 18, stat: 'sense', category: 'mental',    icon: '📵' },
  { id: 'affirmations', name: 'Say 10 positive affirmations',    xp: 15, stat: 'int',   category: 'mental',    icon: '🌟' },
  { id: 'visualize',    name: 'Visualize your goals for 10 min', xp: 20, stat: 'int',   category: 'mental',    icon: '🎯' },
  { id: 'podcast',      name: 'Listen to a self-improvement podcast', xp: 20, stat: 'int', category: 'mental', icon: '🎧' },
  { id: 'newsfast',     name: 'No news or social media today',   xp: 30, stat: 'sense', category: 'mental',    icon: '📵' },
  { id: 'breathwork',   name: 'Do 10 min of breathwork',         xp: 22, stat: 'int',   category: 'mental',    icon: '💨' },
  { id: 'learnone',     name: 'Learn one new thing today',       xp: 20, stat: 'int',   category: 'mental',    icon: '🧠' },
  { id: 'reflect',      name: 'Do a 10-min evening reflection',  xp: 18, stat: 'int',   category: 'mental',    icon: '🌙' },
  { id: 'studyskill',   name: 'Study a skill for 45 minutes',    xp: 35, stat: 'int',   category: 'mental',    icon: '📚' },
  { id: 'deepwork',     name: 'Do 90 min of deep focused work',  xp: 45, stat: 'int',   category: 'mental',    icon: '🎯' },

  // ── LIFESTYLE ────────────────────────────────────────
  { id: 'sleep10',      name: 'Sleep by 10 PM',                  xp: 30, stat: 'vit',   category: 'lifestyle', icon: '🌙' },
  { id: 'sleep11',      name: 'Sleep before 11 PM',              xp: 20, stat: 'vit',   category: 'lifestyle', icon: '🌙' },
  { id: 'sleep8h',      name: 'Get 8 hours of sleep',            xp: 35, stat: 'vit',   category: 'lifestyle', icon: '💤' },
  { id: 'morning6',     name: 'Wake up before 6 AM',             xp: 35, stat: 'sense', category: 'lifestyle', icon: '🌅' },
  { id: 'morning7',     name: 'Wake up before 7 AM',             xp: 20, stat: 'sense', category: 'lifestyle', icon: '🌅' },
  { id: 'cold',         name: 'Take a cold shower',              xp: 25, stat: 'vit',   category: 'lifestyle', icon: '🚿' },
  { id: 'stretch20',    name: 'Stretch for 20 minutes',          xp: 20, stat: 'agi',   category: 'lifestyle', icon: '🤸' },
  { id: 'sunlight',     name: 'Get 20 min of sunlight',          xp: 18, stat: 'vit',   category: 'lifestyle', icon: '☀️' },
  { id: 'nap',          name: 'Take a 20-min power nap',         xp: 15, stat: 'vit',   category: 'lifestyle', icon: '💤' },
  { id: 'declutter',    name: 'Clean and declutter one room',    xp: 25, stat: 'sense', category: 'lifestyle', icon: '🧹' },
  { id: 'noscreenbeds', name: 'No screens 1 hour before bed',    xp: 25, stat: 'vit',   category: 'lifestyle', icon: '📵' },
  { id: 'morningrout',  name: 'Complete full morning routine',   xp: 30, stat: 'sense', category: 'lifestyle', icon: '🌅' },
  { id: 'outside',      name: 'Spend 30 min outside in nature',  xp: 20, stat: 'sense', category: 'lifestyle', icon: '🌿' },
  { id: 'callsomeone',  name: 'Call a friend or family member',  xp: 18, stat: 'sense', category: 'lifestyle', icon: '📱' },
  { id: 'organize',     name: 'Organize your schedule for tomorrow', xp: 20, stat: 'int', category: 'lifestyle', icon: '📅' },
  { id: 'hobbywork',    name: 'Work on a hobby for 30 minutes',  xp: 22, stat: 'sense', category: 'lifestyle', icon: '🎨' },
  { id: 'noprocessed',  name: 'Eat zero processed food today',   xp: 30, stat: 'vit',   category: 'lifestyle', icon: '🌿' },
];

// ── WEEKEND SPECIAL QUESTS (Saturday & Sunday only) ──
const WEEKEND_QUEST_POOL = [
  { id: 'wk_longrun',   name: 'Go on a long run (8km+)',         xp: 80, stat: 'agi',   category: 'weekend',   icon: '🏃' },
  { id: 'wk_hike',      name: 'Go on a hike or long walk',       xp: 60, stat: 'agi',   category: 'weekend',   icon: '🥾' },
  { id: 'wk_fullbody',  name: 'Complete a full body workout',    xp: 70, stat: 'str',   category: 'weekend',   icon: '💪' },
  { id: 'wk_mealprep',  name: 'Meal prep for the whole week',    xp: 65, stat: 'vit',   category: 'weekend',   icon: '🍱' },
  { id: 'wk_journal',   name: 'Write a full weekly review',      xp: 50, stat: 'int',   category: 'weekend',   icon: '📓' },
  { id: 'wk_detox',     name: 'Full digital detox day',          xp: 75, stat: 'sense', category: 'weekend',   icon: '📵' },
  { id: 'wk_sport',     name: 'Play a sport for 1 hour',         xp: 60, stat: 'agi',   category: 'weekend',   icon: '⚽' },
  { id: 'wk_coldplunge',name: 'Take a 5-min cold plunge/shower', xp: 55, stat: 'vit',   category: 'weekend',   icon: '🧊' },
  { id: 'wk_cook',      name: 'Cook a full healthy meal from scratch', xp: 45, stat: 'int', category: 'weekend', icon: '👨‍🍳' },
  { id: 'wk_study2h',   name: 'Study or learn for 2 solid hours',xp: 60, stat: 'int',   category: 'weekend',   icon: '📚' },
];

// ── BONUS SURPRISE QUESTS (random chance each day) ───
const SURPRISE_QUEST_POOL = [
  { id: 'sur_200push',  name: '⚡ SURPRISE: 200 push-ups today!', xp: 80,  stat: 'str',   category: 'surprise',  icon: '⚡' },
  { id: 'sur_icebath',  name: '⚡ SURPRISE: Ice bath challenge',  xp: 70,  stat: 'vit',   category: 'surprise',  icon: '🧊' },
  { id: 'sur_sunrise',  name: '⚡ SURPRISE: Watch the sunrise',   xp: 50,  stat: 'sense', category: 'surprise',  icon: '🌅' },
  { id: 'sur_nofood',   name: '⚡ SURPRISE: Fast until 2 PM',     xp: 60,  stat: 'vit',   category: 'surprise',  icon: '⏱️' },
  { id: 'sur_10k',      name: '⚡ SURPRISE: Hit 10,000 steps',    xp: 65,  stat: 'agi',   category: 'surprise',  icon: '👟' },
  { id: 'sur_nophone',  name: '⚡ SURPRISE: No phone all morning',xp: 55,  stat: 'sense', category: 'surprise',  icon: '📵' },
  { id: 'sur_recruit',  name: '⚡ SURPRISE: Recruit someone to train with you', xp: 75, stat: 'sense', category: 'surprise', icon: '🤝' },
  { id: 'sur_newexerc', name: '⚡ SURPRISE: Try a new exercise',  xp: 45,  stat: 'str',   category: 'surprise',  icon: '🏋️' },
  { id: 'sur_compliment',name:'⚡ SURPRISE: Compliment 3 people genuinely', xp: 35, stat: 'sense', category: 'surprise', icon: '✨' },
  { id: 'sur_gratlist', name: '⚡ SURPRISE: Write 10 things you are grateful for', xp: 40, stat: 'int', category: 'surprise', icon: '📓' },
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

  // ══════════════════════════════════════════
  // 🌮 MEXICAN FOODS
  // ══════════════════════════════════════════

  // Proteins
  { name: '🌮 Carne Asada (100g)',                    cal: 180, protein: 28, carbs: 0,  fat: 7  },
  { name: '🌮 Pollo Asado / Grilled Chicken (100g)',  cal: 162, protein: 30, carbs: 1,  fat: 4  },
  { name: '🌮 Carnitas Lean (100g)',                  cal: 195, protein: 27, carbs: 0,  fat: 9  },
  { name: '🌮 Shrimp al Ajillo (100g)',               cal: 112, protein: 22, carbs: 2,  fat: 2  },
  { name: '🌮 Tilapia al Mojo (100g)',                cal: 96,  protein: 20, carbs: 0,  fat: 2  },
  { name: '🌮 Ground Turkey Taco Meat (100g)',        cal: 158, protein: 24, carbs: 2,  fat: 6  },
  { name: '🌮 Barbacoa Beef (100g)',                  cal: 190, protein: 26, carbs: 0,  fat: 9  },
  { name: '🌮 Pollo en Salsa Verde (100g)',           cal: 155, protein: 28, carbs: 4,  fat: 4  },
  { name: '🌮 Chorizo (50g, cooked)',                 cal: 195, protein: 11, carbs: 1,  fat: 17 },
  { name: '🌮 Huevo con Chorizo (2 eggs + 30g)',      cal: 310, protein: 20, carbs: 2,  fat: 24 },

  // Bases & Carbs
  { name: '🌮 Corn Tortilla (1 small)',               cal: 52,  protein: 1,  carbs: 11, fat: 1  },
  { name: '🌮 Flour Tortilla Small (1)',              cal: 90,  protein: 3,  carbs: 15, fat: 2  },
  { name: '🌮 Flour Tortilla Large (1)',              cal: 140, protein: 4,  carbs: 22, fat: 4  },
  { name: '🌮 Black Beans (100g cooked)',             cal: 132, protein: 9,  carbs: 24, fat: 1  },
  { name: '🌮 Pinto Beans (100g cooked)',             cal: 143, protein: 9,  carbs: 26, fat: 1  },
  { name: '🌮 Refried Beans (100g)',                  cal: 130, protein: 7,  carbs: 20, fat: 3  },
  { name: '🌮 Mexican Rice (100g cooked)',            cal: 140, protein: 3,  carbs: 29, fat: 1  },
  { name: '🌮 Cauliflower Rice (100g)',               cal: 25,  protein: 2,  carbs: 5,  fat: 0  },
  { name: '🌮 Tortilla Chips (28g)',                  cal: 140, protein: 2,  carbs: 18, fat: 7  },
  { name: '🌮 Tostada Shell (1)',                     cal: 60,  protein: 1,  carbs: 8,  fat: 3  },

  // Salsas, Toppings & Sauces
  { name: '🌮 Pico de Gallo (50g)',                   cal: 16,  protein: 1,  carbs: 3,  fat: 0  },
  { name: '🌮 Salsa Verde (50g)',                     cal: 18,  protein: 1,  carbs: 4,  fat: 0  },
  { name: '🌮 Salsa Roja (50g)',                      cal: 20,  protein: 1,  carbs: 4,  fat: 0  },
  { name: '🌮 Guacamole (2 tbsp)',                    cal: 50,  protein: 1,  carbs: 3,  fat: 4  },
  { name: '🌮 Nopales / Cactus (100g)',               cal: 16,  protein: 1,  carbs: 3,  fat: 0  },
  { name: '🌮 Jalapeños (5 slices)',                  cal: 4,   protein: 0,  carbs: 1,  fat: 0  },
  { name: '🌮 Lime Juice (1 tbsp)',                   cal: 4,   protein: 0,  carbs: 1,  fat: 0  },
  { name: '🌮 Cotija Cheese (15g)',                   cal: 45,  protein: 3,  carbs: 0,  fat: 4  },
  { name: '🌮 Crema Mexicana (1 tbsp)',               cal: 55,  protein: 0,  carbs: 1,  fat: 6  },
  { name: '🌮 Chipotle Sauce (1 tbsp)',               cal: 25,  protein: 0,  carbs: 3,  fat: 1  },

  // Full Meals
  { name: '🍱 Chicken Burrito Bowl (rice+beans)',     cal: 520, protein: 45, carbs: 55, fat: 10 },
  { name: '🍱 Carne Asada Bowl (caulirice)',          cal: 310, protein: 35, carbs: 12, fat: 9  },
  { name: '🍱 Shrimp Tacos x2 (corn tortilla)',       cal: 290, protein: 28, carbs: 28, fat: 5  },
  { name: '🍱 Turkey Lettuce Tacos x3',              cal: 260, protein: 30, carbs: 8,  fat: 8  },
  { name: '🍱 Black Bean Veggie Bowl',               cal: 350, protein: 18, carbs: 55, fat: 5  },
  { name: '🍱 Pollo Asado + Nopales',                cal: 280, protein: 36, carbs: 10, fat: 6  },
  { name: '🍱 Fish Taco Bowl (caulirice)',            cal: 295, protein: 28, carbs: 18, fat: 6  },
  { name: '🍱 Huevos Rancheros (2 eggs)',             cal: 320, protein: 18, carbs: 28, fat: 14 },
  { name: '🍱 Enchiladas x2 (chicken, red sauce)',   cal: 440, protein: 32, carbs: 38, fat: 16 },
  { name: '🍱 Pozole Bowl (chicken, light)',          cal: 280, protein: 28, carbs: 30, fat: 4  },
  { name: '🍱 Sopa de Lima (chicken lime soup)',      cal: 220, protein: 24, carbs: 18, fat: 5  },

  // Snacks & Drinks
  { name: '🌮 Jicama Sticks (100g)',                  cal: 38,  protein: 1,  carbs: 9,  fat: 0  },
  { name: '🌮 Elote (1 ear, no mayo)',                cal: 77,  protein: 3,  carbs: 17, fat: 1  },
  { name: '🌮 Elote en Vaso (street corn cup)',       cal: 210, protein: 5,  carbs: 28, fat: 9  },
  { name: '🌮 Agua Fresca (240ml, light)',            cal: 45,  protein: 0,  carbs: 11, fat: 0  },
  { name: '🌮 Horchata Light (240ml)',                cal: 80,  protein: 1,  carbs: 18, fat: 1  },
  { name: '🌮 Chamoy Mango (100g fruit)',             cal: 65,  protein: 1,  carbs: 16, fat: 0  },

  // ══════════════════════════════════════════
  // 🇵🇷 PUERTO RICAN FOODS
  // ══════════════════════════════════════════

  // Proteins
  { name: '🇵🇷 Pernil / Roasted Pork (100g)',        cal: 220, protein: 28, carbs: 0,  fat: 12 },
  { name: '🇵🇷 Pollo Guisado / Stewed Chicken (100g)',cal: 165, protein: 26, carbs: 4,  fat: 5  },
  { name: '🇵🇷 Bistec Encebollado / Steak+Onions (150g)', cal: 280, protein: 34, carbs: 6, fat: 13 },
  { name: '🇵🇷 Bacalao Guisado / Salted Cod (100g)', cal: 145, protein: 26, carbs: 5,  fat: 3  },
  { name: '🇵🇷 Carne de Res Guisada / Beef Stew (100g)', cal: 195, protein: 22, carbs: 6, fat: 9 },
  { name: '🇵🇷 Chuleta Kan-Kan / Pork Chop (150g)',  cal: 320, protein: 34, carbs: 0,  fat: 19 },
  { name: '🇵🇷 Mofongo Relleno de Pollo (1 serving)',cal: 480, protein: 32, carbs: 48, fat: 16 },
  { name: '🇵🇷 Camarones al Ajillo / Garlic Shrimp (100g)', cal: 130, protein: 21, carbs: 3, fat: 4 },
  { name: '🇵🇷 Longaniza / PR Sausage (50g)',         cal: 175, protein: 10, carbs: 2,  fat: 15 },

  // Sides & Bases
  { name: '🇵🇷 Arroz con Gandules (100g)',            cal: 160, protein: 4,  carbs: 32, fat: 2  },
  { name: '🇵🇷 Arroz Blanco / White Rice (100g)',     cal: 130, protein: 3,  carbs: 28, fat: 0  },
  { name: '🇵🇷 Habichuelas Rosadas / Pink Beans (100g)', cal: 127, protein: 8, carbs: 23, fat: 1 },
  { name: '🇵🇷 Habichuelas Negras / Black Beans (100g)', cal: 132, protein: 9, carbs: 24, fat: 1 },
  { name: '🇵🇷 Tostones / Fried Plantain (3 pieces)', cal: 180, protein: 1,  carbs: 28, fat: 7  },
  { name: '🇵🇷 Maduros / Sweet Plantain (3 pieces)',  cal: 140, protein: 1,  carbs: 33, fat: 0  },
  { name: '🇵🇷 Mofongo (plain, 1 cup)',               cal: 300, protein: 3,  carbs: 40, fat: 14 },
  { name: '🇵🇷 Yuca / Cassava Boiled (100g)',         cal: 160, protein: 1,  carbs: 38, fat: 0  },
  { name: '🇵🇷 Pasteles (1 piece)',                   cal: 280, protein: 10, carbs: 34, fat: 12 },
  { name: '🇵🇷 Alcapurrias (1 piece)',                cal: 220, protein: 8,  carbs: 28, fat: 9  },

  // Soups & Stews
  { name: '🇵🇷 Caldo Santo / Fish Soup (1 bowl)',     cal: 210, protein: 24, carbs: 14, fat: 6  },
  { name: '🇵🇷 Sancocho (1 bowl)',                    cal: 320, protein: 26, carbs: 32, fat: 8  },
  { name: '🇵🇷 Sopa de Pollo / Chicken Soup (1 bowl)',cal: 195, protein: 20, carbs: 18, fat: 5  },
  { name: '🇵🇷 Asopao de Pollo (1 bowl)',             cal: 280, protein: 24, carbs: 28, fat: 7  },

  // Seasonings & Sauces
  { name: '🇵🇷 Sofrito (1 tbsp)',                     cal: 10,  protein: 0,  carbs: 1,  fat: 0  },
  { name: '🇵🇷 Sazón Seasoning (1 packet)',           cal: 5,   protein: 0,  carbs: 1,  fat: 0  },
  { name: '🇵🇷 Adobo Seasoning (1 tsp)',              cal: 5,   protein: 0,  carbs: 1,  fat: 0  },
  { name: '🇵🇷 Ajilimójili Sauce (1 tbsp)',           cal: 30,  protein: 0,  carbs: 2,  fat: 2  },
  { name: '🇵🇷 Recao / Culantro (1 tbsp)',            cal: 1,   protein: 0,  carbs: 0,  fat: 0  },

  // Full Meals
  { name: '🍱 PR: Arroz con Pollo (1 plate)',         cal: 480, protein: 36, carbs: 52, fat: 10 },
  { name: '🍱 PR: Pernil + Rice + Beans',             cal: 580, protein: 42, carbs: 55, fat: 16 },
  { name: '🍱 PR: Pollo Guisado + Tostones',          cal: 420, protein: 30, carbs: 38, fat: 12 },
  { name: '🍱 PR: Bacalao + Rice (light)',            cal: 360, protein: 30, carbs: 40, fat: 5  },
  { name: '🍱 PR: Bistec + Maduros + Rice',           cal: 520, protein: 36, carbs: 55, fat: 14 },
  { name: '🍱 PR: Lean Chicken Bowl (caulirice)',     cal: 295, protein: 34, carbs: 14, fat: 6  },

  // Snacks & Sweets
  { name: '🇵🇷 Pinchos / Chicken Skewer (1)',         cal: 130, protein: 16, carbs: 4,  fat: 5  },
  { name: '🇵🇷 Empanadilla de Carne (1)',             cal: 220, protein: 10, carbs: 24, fat: 9  },
  { name: '🇵🇷 Tembleque / Coconut Pudding (100g)',   cal: 180, protein: 2,  carbs: 22, fat: 9  },
  { name: '🇵🇷 Flan (1 slice)',                       cal: 220, protein: 6,  carbs: 30, fat: 9  },
  { name: '🇵🇷 Coquito (1 shot, 60ml)',               cal: 130, protein: 1,  carbs: 12, fat: 7  },
  { name: '🇵🇷 Maví / Fermented Bark Drink (240ml)', cal: 55,  protein: 0,  carbs: 13, fat: 0  },
  { name: '🇵🇷 Piragua / Shaved Ice (1)',             cal: 70,  protein: 0,  carbs: 18, fat: 0  },
  { name: '🇵🇷 Parcha / Passionfruit Juice (240ml)', cal: 60,  protein: 1,  carbs: 15, fat: 0  },
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
  const today    = new Date().toDateString();
  const dow      = new Date().getDay();
  const isWeekend = dow === 0 || dow === 6;
  const level    = (typeof HUNTER !== 'undefined' && HUNTER?.level) || 1;

  let seed = today.split('').reduce((a,c) => a + c.charCodeAt(0), 0);
  function seededRand() {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  }
  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length-1; i > 0; i--) {
      const j = Math.floor(seededRand() * (i+1));
      [a[i],a[j]] = [a[j],a[i]];
    }
    return a;
  }

  const picks = [];

  // Surprise quest (10% weekday, 20% weekend)
  if (seededRand() < (isWeekend ? 0.20 : 0.10)) {
    const surprises = shuffle(SURPRISE_QUEST_POOL);
    picks.push({ ...surprises[0], done: false });
  }

  // Weekend special quest
  if (isWeekend) {
    const wk = shuffle(WEEKEND_QUEST_POOL);
    picks.push({ ...wk[0], done: false });
  }

  // Elite quest for B-rank+ (level 20+)
  if (level >= 20) {
    const eligible = ELITE_QUEST_POOL.filter(q => level >= q.minLevel);
    if (eligible.length > 0) {
      const elite = shuffle(eligible);
      picks.push({ ...elite[0], done: false });
    }
  }

  // Fill remaining slots from main pool (always 5 base quests minimum)
  const target = 5;
  const want   = { strength:1, cardio:1, nutrition:1, mental:1, lifestyle:1 };
  const cats   = {};
  picks.forEach(p => { if (want[p.category] !== undefined) want[p.category] = Math.max(0, (want[p.category]||1)-1); });

  const shuffledMain = shuffle(QUEST_POOL);
  for (const q of shuffledMain) {
    if (picks.length >= target + (isWeekend ? 1 : 0) + (level >= 20 ? 1 : 0)) break;
    const rem = (want[q.category]||0) - (cats[q.category]||0);
    if (rem > 0) {
      picks.push({ ...q, done: false });
      cats[q.category] = (cats[q.category]||0) + 1;
    }
  }

  return picks;
}
