export interface GroceryItem {
  id: string;
  upc: string; // Barcode code for instant scan matching
  name: string;
  store: 'Walmart Supercenter (Auburn, ME)' | "Shaw's (Auburn/Lewiston)" | 'Hannaford (Lewiston/Auburn)' | 'All Stores';
  brand: string;
  category: 'Protein' | 'Carbs' | 'Fats' | 'Produce' | 'Essentials' | 'Toiletries / Non-Grocery' | 'Seasonings & Spices';
  priceEst: string;
  calories: number;
  protein: number; // in grams
  carbs: number; // in grams
  fat: number; // in grams
  servingSize: string;
  coachNote: string;
  cuisine?: string[];
}

export interface MealPrepPlan {
  id: string;
  title: string;
  country: string;
  flag: string;
  badge?: string;
  targetDailyCalories: number;
  targetDailyProtein: number;
  estCostPerWeek: string;
  description: string;
  meals: {
    name: string;
    time: string;
    ingredients: string[];
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  }[];
}

export const AUBURN_LEWISTON_GROCERY_ITEMS: GroceryItem[] = [
  {
    id: "g-1",
    upc: "078742371195",
    name: "Fresh Chicken Breasts (ONE Great Value ~5.0 lb Family Pack / 80 oz raw)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Freshness Guaranteed",
    category: "Protein",
    priceEst: "$13.40 (~5.0 lb family pack at $2.68/lb)",
    calories: 120,
    protein: 26,
    carbs: 0,
    fat: 1.5,
    servingSize: "4 oz (112g)",
    coachNote: "One Great Value ~5.0 lb (80 oz raw) family pack from Auburn Walmart! Guaranteed to provide 11.4 oz raw chicken per day for 7 full days of Lunch (5.7 oz/day) and Dinner (5.7 oz/day) hitting 175g+ daily high-value protein for Pan/Oven Crispy Fried Japanese Teriyaki Chicken!",
    cuisine: ["Japan", "Japan Bulking"]
  },
  {
    id: "g-2",
    upc: "078742221612",
    name: "Great Value Large Grade A White Eggs (36 Count Tray / Two 18 ct Cartons)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Protein",
    priceEst: "$6.84 (36 count tray / 2 cartons)",
    calories: 70,
    protein: 6,
    carbs: 0,
    fat: 5,
    servingSize: "1 Egg (50g)",
    coachNote: "36 eggs guaranteed! Provides 3 to 5 eggs every morning across all 7 days for post-workout Japanese Scallion scrambles plus bonus meal prep eggs. Scramble in 0-cal cooking spray.",
    cuisine: ["Japan", "Japan Bulking"]
  },
  {
    id: "g-3",
    upc: "078742136039",
    name: "Great Value Plain Nonfat Greek Yogurt (FOUR 32 oz tubs / 128 oz / 1 Gallon total)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Protein",
    priceEst: "$15.92 (FOUR 32 oz tubs / 128 oz total)",
    calories: 90,
    protein: 16,
    carbs: 6,
    fat: 0,
    servingSize: "3/4 cup (170g / 6 oz)",
    coachNote: "FOUR tubs (128 oz / 1 full Gallon / 16 cups total) guaranteed for Phase 1 Cutting! Provides 100% enough Greek Yogurt for 7 full days of Afternoon bowls AND Nighttime Casein Fluff without running out!",
    cuisine: ["Japan"]
  },
  {
    id: "g-4",
    upc: "078742136039-bulk",
    name: "Great Value Plain Nonfat Greek Yogurt (THREE 32 oz tubs / 96 oz total)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Protein",
    priceEst: "$11.94 (THREE 32 oz tubs at $3.98 ea)",
    calories: 90,
    protein: 16,
    carbs: 6,
    fat: 0,
    servingSize: "3/4 cup (170g / 6 oz)",
    coachNote: "THREE tubs (96 oz / 12 cups total) tailored for Phase 2 Lean Bulking! Provides 1 cup afternoon bowls AND 3/4 cup bedtime casein fluff every single day while leaving plenty of room for rice & oats!",
    cuisine: ["Japan Bulking"]
  },
  {
    id: "g-5",
    upc: "078742352217",
    name: "Great Value Long Grain White Rice (2 lb bag)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Carbs",
    priceEst: "$1.48 (2 lb bag ~20 servings)",
    calories: 160,
    protein: 3,
    carbs: 36,
    fat: 0,
    servingSize: "1/4 cup dry (45g)",
    coachNote: "Clean fast-digesting carbohydrates for your Phase 1 Cutting Japanese Teriyaki bowls to replenish glycogen after your daily Japanese Samurai Dojo sessions.",
    cuisine: ["Japan"]
  },
  {
    id: "g-6",
    upc: "078742359000",
    name: "Great Value Long Grain White Rice (5 lb bag / ~50 servings)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Carbs",
    priceEst: "$3.34 (5 lb bag / ~50 servings)",
    calories: 160,
    protein: 3,
    carbs: 36,
    fat: 0,
    servingSize: "1/4 cup dry (1 cup cooked)",
    coachNote: "Huge 5 lb bulk bag! Clean fast-digesting carbohydrates to fuel Phase 2 post-160 lb Japanese Samurai lean bulking with double rice portions at lunch and dinner.",
    cuisine: ["Japan Bulking"]
  },
  {
    id: "g-7",
    upc: "078742357777",
    name: "Great Value Frozen Broccoli Florets (Two 12 oz bags / 24 oz total)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Produce",
    priceEst: "$2.32 (Two 12 oz bags at $1.16 ea)",
    calories: 30,
    protein: 2,
    carbs: 5,
    fat: 0,
    servingSize: "1 cup (85g)",
    coachNote: "Two bags (24 oz / ~8 cups total) guaranteed! Steamed micronutrients and fiber for 7 full days of pan or oven crispy fried Japanese Teriyaki Chicken bowls.",
    cuisine: ["Japan", "Japan Bulking"]
  },
  {
    id: "g-8",
    upc: "000000040111",
    name: "Fresh Bananas (~1 lb bunch / ~3-4 bananas)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Fresh Produce",
    category: "Produce",
    priceEst: "$1.16 (~2 lb bunch / ~6 bananas)",
    calories: 105,
    protein: 1,
    carbs: 27,
    fat: 0,
    servingSize: "1 Medium Banana (118g)",
    coachNote: "Quick potassium and clean pre-workout carbohydrates eaten at 8:00 AM right alongside your morning Matcha Latte before your morning bodyweight workout.",
    cuisine: ["Japan", "Japan Bulking"]
  },
  {
    id: "g-9",
    upc: "000000040666",
    name: "Fresh Green Onions / Scallions (1 Bunch)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Fresh Produce",
    category: "Produce",
    priceEst: "$0.78 (1 bunch)",
    calories: 15,
    protein: 1,
    carbs: 3,
    fat: 0,
    servingSize: "2 tbsp (15g chopped)",
    coachNote: "Fresh aromatic scallions for folding into your morning egg scrambles and garnishing Japanese Teriyaki bowls & Friday Ramen.",
    cuisine: ["Japan", "Japan Bulking"]
  },
  {
    id: "g-10",
    upc: "078742352222",
    name: "Great Value 100% Liquid Egg Whites (32 oz carton)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Protein",
    priceEst: "$3.48 (32 oz carton ~20 servings)",
    calories: 25,
    protein: 5,
    carbs: 0,
    fat: 0,
    servingSize: "3 tbsp (46g)",
    coachNote: "Pure protein booster for Phase 1 Cutting! Mix 1/2 cup into your morning whole egg scrambles to add 13g of clean protein without extra fat.",
    cuisine: ["Japan"]
  },
  {
    id: "g-11",
    upc: "078742356666",
    name: "Great Value Old Fashioned Rolled Oats (42 oz canister)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Carbs",
    priceEst: "$3.98 (42 oz canister)",
    calories: 150,
    protein: 5,
    carbs: 27,
    fat: 2.5,
    servingSize: "1/2 cup dry (40g)",
    coachNote: "Slow-digesting complex carbs for Phase 2 Lean Bulking morning energy or mixing into afternoon Greek yogurt bowls.",
    cuisine: ["Japan Bulking"]
  },
  {
    id: "g-12",
    upc: "041390000508",
    name: "Kikkoman Teriyaki Marinade & Sauce (10 fl oz bottle)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Kikkoman",
    category: "Seasonings & Spices",
    priceEst: "$2.98 (10 fl oz bottle)",
    calories: 20,
    protein: 1,
    carbs: 3,
    fat: 0,
    servingSize: "1 tbsp (15ml)",
    coachNote: "Authentic sweet & savory Japanese Teriyaki glaze stocked at Auburn Maine Walmart! For Pan or Oven Crispy Fried Teriyaki Chicken: dip chicken cubes in egg white, coat lightly with cornstarch & garlic powder, crisp sear or bake at 400°F until crunchy outside & juicy inside, then toss with teriyaki glaze (Periodic Monday Restock item).",
    cuisine: ["Japan", "Japan Bulking"]
  },
  {
    id: "g-13",
    upc: "078742359002",
    name: "Great Value Original Soy Milk (64 fl oz carton / 1/2 Gallon)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Produce",
    priceEst: "$2.48 (64 fl oz carton)",
    calories: 80,
    protein: 7,
    carbs: 9,
    fat: 3.5,
    servingSize: "1 cup (240ml)",
    coachNote: "Creamy, protein-rich plant milk! Warm or pour over ice and whisk in Jade Leaf Organic Matcha powder at 8:00 AM for your morning pre-workout energy boost.",
    cuisine: ["Japan", "Japan Bulking"]
  },
  {
    id: "g-14",
    upc: "078742359003",
    name: "Nissin Raoh Umami Tonkotsu / Soy Sauce Ramen Noodles (Single Pack / Tray)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Nissin Raoh",
    category: "Carbs",
    priceEst: "$1.68 (Single pack)",
    calories: 340,
    protein: 9,
    carbs: 58,
    fat: 8,
    servingSize: "1 pack (100g)",
    coachNote: "Your once-a-week Japanese Ramen reward treat meal! Authentic non-fried ramen noodles with rich umami broth to enjoy on Friday or Saturday evening topped with sliced chicken and scallions.",
    cuisine: ["Japan", "Japan Bulking"]
  },
  {
    id: "g-15",
    upc: "078742359004",
    name: "Jade Leaf Organic Matcha Green Tea Powder Mix (1 oz pouch / ~15-20 servings)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Jade Leaf",
    category: "Essentials",
    priceEst: "$8.98 (1 oz pouch)",
    calories: 10,
    protein: 1,
    carbs: 1,
    fat: 0,
    servingSize: "1 tsp (2g)",
    coachNote: "100% pure organic ceremonial/culinary Japanese matcha! Whisk into warm or iced soy milk at 8:00 AM for clean, jitter-free pre-workout focus and antioxidants right before your Samurai Dojo session.",
    cuisine: ["Japan", "Japan Bulking"]
  },
  {
    id: "g-16",
    upc: "078742351234-spray",
    name: "Great Value Canola Oil 0-Calorie Cooking Spray (8 oz can)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Essentials",
    priceEst: "$2.24 (8 oz aerosol can)",
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    servingSize: "0.25 sec spray (0.25g)",
    coachNote: "Zero-calorie non-stick cooking spray for pan/oven crispy fried chicken cubes and scrambling scallion eggs without adding hidden liquid oil calories (Restock item).",
    cuisine: ["Japan", "Japan Bulking"]
  },
  {
    id: "g-17",
    upc: "078742359999",
    name: "Great Value Soy Sauce (15 fl oz bottle)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Seasonings & Spices",
    priceEst: "$1.48 (15 fl oz bottle)",
    calories: 15,
    protein: 1,
    carbs: 3,
    fat: 0,
    servingSize: "1 tbsp (15ml)",
    coachNote: "Essential savory seasoning staple for Japanese teriyaki stir-fries, glazes, and egg scrambles (Restock item).",
    cuisine: ["Japan", "Japan Bulking"]
  },
  {
    id: "g-18",
    upc: "078742100108",
    name: "Great Value Garlic Powder (3.4 oz bottle)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Seasonings & Spices",
    priceEst: "$1.18 (3.4 oz bottle)",
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    servingSize: "1/4 tsp (0.7g)",
    coachNote: "Essential zero-calorie savory garlic seasoning used for searing chicken breast cubes and broccoli (Restock item).",
    cuisine: ["Japan", "Japan Bulking"]
  },
  {
    id: "g-19",
    upc: "078742100207",
    name: "Great Value Ground Ginger (1.5 oz bottle)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Seasonings & Spices",
    priceEst: "$2.32 (1.5 oz bottle)",
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    servingSize: "1/4 tsp (0.5g)",
    coachNote: "Essential Asian cooking spice! Adds authentic warming heat and aroma to your Japanese Teriyaki wok glazes (Restock item).",
    cuisine: ["Japan", "Japan Bulking"]
  },
  {
    id: "g-20",
    upc: "078742351999",
    name: "Great Value Zero Calorie Sweetener Packets (100 Count Box)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Essentials",
    priceEst: "$2.18 (100 Count Box)",
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    servingSize: "1 Packet (1g)",
    coachNote: "Sweetens your homemade Japanese Teriyaki glaze, matcha latte, green tea, and Greek yogurt bowls with zero added sugar calories (Restock item).",
    cuisine: ["Japan", "Japan Bulking"]
  },
  {
    id: "g-21",
    upc: "085000040659",
    name: "Great Value 100% Pure Green Tea Bags (40 ct box)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Essentials",
    priceEst: "$1.98 (40 ct box)",
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    servingSize: "1 Tea Bag",
    coachNote: "Essential Auburn Walmart green tea staple paired with every post-workout main meal for daily metabolism-boosting hydration and thermogenesis.",
    cuisine: ["Japan", "Japan Bulking"]
  },
  {
    id: "g-22",
    upc: "078742359022",
    name: "Argo 100% Pure Corn Starch (16 oz box)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Argo / Great Value",
    category: "Seasonings & Spices",
    priceEst: "$1.78 (16 oz box)",
    calories: 30,
    protein: 0,
    carbs: 7,
    fat: 0,
    servingSize: "1 tbsp (8g)",
    coachNote: "Essential coating ingredient for Pan or Oven Crispy Fried Japanese Teriyaki Chicken (Restock item).",
    cuisine: ["Japan", "Japan Bulking"]
  }
];

export const MEAL_PREP_PLANS: MealPrepPlan[] = [
  {
    id: "plan-japan",
    title: "Japan: Japanese Teriyaki Chicken & Jade Leaf Matcha Latte Shred Blueprint (~2,080 kcal)",
    country: "Japan",
    flag: "🇯🇵",
    badge: "⭐ #1 Main Phase 1 Cutting Blueprint ($50.96/Wk)",
    targetDailyCalories: 2080,
    targetDailyProtein: 178,
    estCostPerWeek: "$50.96 Weekly Consumables / $26.80 Periodic Restock ($77.76 Combined Total)",
    description: "The #1 Main Japanese Teriyaki Chicken & Jade Leaf Matcha Latte Shred Blueprint! Tailored specifically for steady, sustainable fat loss (~0.75-1.0 lb/wk) to reach your 160 lb target cleanly by 2028 without loose skin or muscle loss. Designed around your exact schedule: Monday Grocery Run at Auburn Maine Walmart Supercenter ($50 budget limit) & Batch Meal Prep, starting eating Tuesday (7-Day Cycle). Features clean, creamy Jade Leaf Organic Matcha Latte (whisked with Great Value Soy Milk) + Banana at 8:00 AM as Pre-Workout focus before hitting your Japanese Samurai Home Bodyweight Dojo session & 45m dual cardio walk/run! Followed by a cooked-fresh Post-Workout Scallion & Liquid Egg White Scramble between 10:30-11:00 AM, authentic Pan or Oven Crispy Fried Japanese Teriyaki Chicken for Lunch and Dinner, and slow-release Casein Greek Yogurt bowls (with 4 tubs / 1 Gallon guaranteed so you never run out!). Traditional 100% Green Tea is paired with every post-workout main meal. Plus, includes your once-a-week Nissin Raoh Umami Japanese Ramen reward treat meal on Friday or Saturday evening!",
    meals: [
      {
        name: "Pre-Workout Fuel: Jade Leaf Matcha Latte with Soy Milk & Banana",
        time: "8:00 AM (Pre-Workout)",
        ingredients: [
          "1 Pre-Workout Jade Leaf Matcha Latte: Whisk 1 tsp Jade Leaf Organic Matcha Green Tea Powder into 1 cup warm or iced Great Value Soy Milk (optional: add 1 zero-cal sweetener packet for clean, zero-calorie sweetness). Clean, sustained L-theanine & caffeine energy for focus right before your morning resistance training & cardio run/walk! (90 kcal, 7g p, 10g c, 3.5g f)",
          "1 Medium Fresh Banana: Peel and eat immediately right before your morning apartment bodyweight workout & cardio for rapid-absorbing pre-workout carbohydrates & potassium! (105 kcal, 1g p, 27g c)"
        ],
        calories: 195,
        protein: 8,
        carbs: 37,
        fat: 3.5
      },
      {
        name: "Post-Workout Breakfast: Japanese Scallion & Egg White Scramble + Rice + Tea",
        time: "10:30 AM – 11:00 AM (Post-Workout)",
        ingredients: [
          "3 Large Grade A White Eggs + 1/2 cup (4 oz) Liquid Egg Whites scrambled in Great Value 0-Cal Cooking Spray. Cooking Instructions: Heat non-stick skillet over medium heat, spray liberally with canola oil spray. Whisk 3 whole eggs plus 1/2 cup liquid egg whites thoroughly. Pour in skillet and gently fold with spatula over medium heat. Fold in 1 tbsp soy sauce, 1/2 tsp garlic powder, and chopped fresh scallions until golden and fluffy! (330 kcal, 31g p, 15g f)",
          "1 cup cooked Long Grain White Rice. Cooking Instructions: Rinse rice until water runs clear. Combine 1 cup raw rice with 2 cups water in saucepan, bring to boil, cover, and simmer low for 18 minutes. Fluff with fork! (200 kcal, 4g p, 44g c)",
          "1 cup hot brewed Great Value 100% Green Tea. Cooking Instructions: Steep 1 green tea bag in boiling water for 3-5 minutes. (0 kcal, post-workout antioxidant recovery & metabolism boost)"
        ],
        calories: 530,
        protein: 35,
        carbs: 44,
        fat: 15
      },
      {
        name: "Lunch: Pan or Oven Crispy Fried Japanese Teriyaki Chicken & Steamed Broccoli + Tea",
        time: "2:00 PM – 2:30 PM",
        ingredients: [
          "~5.7 oz Fresh Chicken Breast cubes prepared Pan or Oven Crispy Fried in Japanese Teriyaki Glaze. Cooking Instructions: Cut chicken breast into bite-sized 1-inch cubes, dip lightly in whisked Great Value 100% Liquid Egg Whites, and toss with 1 tsp Argo 100% Pure Corn Starch and Great Value Garlic Powder. Spray baking sheet or non-stick skillet liberally with Great Value 0-Calorie Canola Oil Cooking Spray and bake at 400°F (or pan crisp sear) for 10–12 minutes until super crispy and crunchy outside while juicy inside! Whisk low-cal Japanese Glaze (1.5 tbsp Kikkoman Teriyaki Marinade & Sauce, 1 Great Value Zero Calorie Sweetener Packet, 1/4 tsp Great Value Ground Ginger, 1/4 tsp Great Value Garlic Powder, and 1 tbsp water). Toss crispy chicken vigorously with glaze until sticky, glossy, and caramelized! Garnished with fresh chopped green onions / scallions. (210 kcal, 40g p, 2g f)",
          "1 cup steamed Great Value Frozen Broccoli florets. Cooking Instructions: Microwave frozen broccoli in covered bowl with 2 tbsp water for 3-4 minutes until crisp-tender, drain and season with Great Value Garlic Powder. (30 kcal, 2g p, 6g c)",
          "1 cup cooked Long Grain White Rice (from batch prep, reheated with a splash of water so it stays fluffy). (200 kcal, 4g p, 44g c)",
          "1 cup hot brewed Great Value 100% Pure Green Tea (0 kcal, thermogenic fat oxidation booster)"
        ],
        calories: 440,
        protein: 46,
        carbs: 53,
        fat: 2
      },
      {
        name: "Afternoon Snack: Japanese Casein Greek Yogurt Bowl",
        time: "5:30 PM",
        ingredients: [
          "1 cup (8 oz) Plain Nonfat Greek Yogurt. Cooking Instructions: Spoon yogurt into bowl, stir in 1 zero-calorie sweetener packet and a pinch of cinnamon or vanilla until velvety and creamy. Slow-release casein protein keeps muscles fueled and satiated between workouts and cardio runs! (120 kcal, 21g p, 8g c)"
        ],
        calories: 120,
        protein: 21,
        carbs: 8,
        fat: 0
      },
      {
        name: "Dinner: Pan or Oven Crispy Fried Japanese Teriyaki Chicken & Steamed Broccoli + Tea",
        time: "7:30 PM – 8:00 PM",
        ingredients: [
          "~5.7 oz Fresh Chicken Breast cubes prepared Pan or Oven Crispy Fried in Japanese Teriyaki Glaze. Cooking Instructions: Dip cubed chicken in whisked Great Value 100% Liquid Egg Whites, coat with 1 tsp Argo 100% Pure Corn Starch & Great Value Garlic Powder, spray with Great Value 0-Calorie Canola Oil Cooking Spray, and bake at 400°F (or pan crisp sear) for 10-12 minutes until super crunchy outside & juicy inside! Whisk low-cal Teriyaki Glaze (1.5 tbsp Kikkoman Teriyaki Marinade & Sauce, 1 Great Value Zero Calorie Sweetener Packet, 1/4 tsp Great Value Ground Ginger, 1/4 tsp Great Value Garlic Powder, and 1 tbsp water). Toss crispy chicken until caramelized and glossy! Garnished with fresh chopped green onions / scallions. (210 kcal, 40g p, 2g f)",
          "1 cup steamed Great Value Frozen Broccoli florets (crisp-tender, seasoned with Great Value Garlic Powder). (30 kcal, 2g p, 6g c)",
          "1 cup cooked Long Grain White Rice (reheated warm and fluffy). (200 kcal, 4g p, 44g c)",
          "1 cup hot brewed Great Value 100% Pure Green Tea (0 kcal, evening metabolic & muscle recovery aid)"
        ],
        calories: 440,
        protein: 46,
        carbs: 53,
        fat: 2
      },
      {
        name: "Nighttime Recovery: Casein Greek Yogurt Fluff & Hot Green Tea",
        time: "10:30 PM",
        ingredients: [
          "3/4 cup (6 oz) Plain Nonfat Greek Yogurt. Cooking Instructions: Whisk yogurt in a bowl with 1 Great Value Zero Calorie Sweetener Packet until airy and fluffy. Provides essential overnight amino acids to rebuild muscle fiber while you sleep. (90 kcal, 16g p, 6g c)",
          "1 warm, soothing cup of brewed Great Value 100% Pure Green Tea (0 kcal, overnight metabolic support during deep sleep)"
        ],
        calories: 90,
        protein: 16,
        carbs: 6,
        fat: 0
      },
      {
        name: "Weekly Reward Treat Meal: Nissin Raoh Umami Japanese Ramen",
        time: "Friday or Saturday Evening (Weekly Reward)",
        ingredients: [
          "1 package (3.53 oz) Nissin Raoh Umami Tonkotsu / Soy Sauce Japanese Ramen Noodles. Cooking Instructions: Boil noodles for 4 minutes in 500ml water. Add savory umami soup base packet and stir until rich and aromatic! Garnished with fresh chopped green onions / scallions and sliced chicken breast. A satisfying weekly reward that keeps your adherence at 100% without breaking your weekly grocery budget! (340 kcal, 9g p, 58g c, 8g f)"
        ],
        calories: 340,
        protein: 9,
        carbs: 58,
        fat: 8
      }
    ]
  },
  {
    id: "plan-japan-bulking",
    title: "Japan Bulking: Japanese Teriyaki Lean Bulking Blueprint (~2,680 kcal)",
    country: "Japan Bulking",
    flag: "🇯🇵🔥",
    badge: "🔥 Phase 2: Post-160 Lb Lean Bulk ($49.34/Wk)",
    targetDailyCalories: 2680,
    targetDailyProtein: 188,
    estCostPerWeek: "$49.34 Weekly Consumables / $26.80 Periodic Restock ($76.14 Combined Total)",
    description: "The #1 Lean Bulking Blueprint designed for Hunter Nick once he conquers his 160 Lb target weight by 2028! Built around the exact same Monday Auburn ME Walmart Grocery Run & Batch Meal Prep schedule. Notice how this bulking plan is exactly $1.62 CHEAPER per week ($49.34 vs $50.96) while adding +600 clean muscle-building calories every day! We swap 4 tubs of yogurt and liquid egg whites for a massive 5 lb bag of Long Grain White Rice, 42 oz of Rolled Oats, 3 tubs of Greek Yogurt, and 35 whole eggs across the week (5 whole eggs daily to naturally boost hormone production and muscle recovery after intense bodyweight resistance training!). Features Pan or Oven Crispy Fried Japanese Teriyaki Chicken with DOUBLE White Rice & Broccoli, hot 100% Green Tea, Jade Leaf Matcha Latte with Soy Milk, and your Friday/Saturday Nissin Raoh Umami Ramen reward treat!",
    meals: [
      {
        name: "Pre-Workout Fuel: Jade Leaf Matcha Latte with Soy Milk & Banana",
        time: "8:00 AM (Pre-Workout)",
        ingredients: [
          "1 Pre-Workout Jade Leaf Matcha Latte: Whisk 1 tsp Jade Leaf Organic Matcha Green Tea Powder into 1 cup warm or iced Great Value Soy Milk (optional: add 1 zero-cal sweetener packet). Clean sustained energy for home bodyweight training & cardio volume! (90 kcal, 7g p, 10g c, 3.5g f)",
          "1 Medium Fresh Banana: Peel and eat immediately right before your morning workout for rapid-absorbing carbohydrates & potassium! (105 kcal, 1g p, 27g c)"
        ],
        calories: 195,
        protein: 8,
        carbs: 37,
        fat: 3.5
      },
      {
        name: "Post-Workout Breakfast: 5-Egg Japanese Scallion Scramble + Rolled Oats + Tea",
        time: "10:30 AM – 11:00 AM (Post-Workout)",
        ingredients: [
          "5 Large Grade A White Eggs scrambled in Great Value 0-Cal Cooking Spray. Cooking Instructions: Heat non-stick skillet over medium heat, spray liberally with canola oil spray. Whisk 5 whole eggs thoroughly. Pour in skillet and gently fold over medium heat. Fold in 1 tbsp soy sauce, 1/2 tsp garlic powder, and chopped fresh scallions until fluffy and golden! Provides rich amino acids, healthy fats, and natural cholesterol for muscle building. (350 kcal, 30g p, 25g f)",
          "1 cup cooked Great Value Old Fashioned Rolled Oats. Cooking Instructions: Combine 1/2 cup dry oats with 1 cup water in bowl, microwave 2 minutes or cook on stovetop. Stir in cinnamon or sweetener packet for slow-digesting complex carbs! (150 kcal, 5g p, 27g c)",
          "1 cup hot brewed Great Value 100% Green Tea. (0 kcal, post-workout antioxidant recovery & digestion aid)"
        ],
        calories: 500,
        protein: 35,
        carbs: 54,
        fat: 25
      },
      {
        name: "Lunch: Pan or Oven Crispy Fried Japanese Teriyaki Chicken + DOUBLE White Rice & Broccoli + Tea",
        time: "2:00 PM – 2:30 PM",
        ingredients: [
          "~5.7 oz Fresh Chicken Breast cubes prepared Pan or Oven Crispy Fried in Japanese Teriyaki Glaze. Cooking Instructions: Cut chicken breast into bite-sized cubes, dip lightly in whisked Great Value 100% Liquid Egg Whites, and toss with 1 tsp Argo 100% Pure Corn Starch and Great Value Garlic Powder. Spray baking sheet or non-stick skillet liberally with Great Value 0-Calorie Canola Oil Cooking Spray and bake at 400°F (or pan crisp sear) for 10–12 minutes until super crispy and crunchy outside while juicy inside! Whisk low-cal Teriyaki Glaze (1.5 tbsp Kikkoman Teriyaki Marinade & Sauce, 1 Great Value Zero Calorie Sweetener Packet, 1/4 tsp Great Value Ground Ginger, 1/4 tsp Great Value Garlic Powder, and 1 tbsp water), pour over chicken and toss until sticky and glossy! Garnished with fresh chopped green onions / scallions. (210 kcal, 40g p, 2g f)",
          "2 cups cooked Long Grain White Rice (from your 5 lb batch prep bag, reheated with a splash of water for fluffy, high-density bulking glycogen replenishment!). (400 kcal, 8g p, 88g c)",
          "1 cup steamed Great Value Frozen Broccoli florets seasoned with Great Value Garlic Powder. (30 kcal, 2g p, 6g c)",
          "1 cup hot brewed Great Value 100% Pure Green Tea (0 kcal, digestion & nutrient partitioning support)"
        ],
        calories: 640,
        protein: 50,
        carbs: 94,
        fat: 2
      },
      {
        name: "Afternoon Snack: High-Protein Casein Greek Yogurt Power Bowl",
        time: "5:30 PM",
        ingredients: [
          "1 cup (8 oz) Plain Nonfat Greek Yogurt mixed with 1 zero-calorie sweetener packet and cinnamon/vanilla until creamy and velvety. Slow-release casein protein keeps muscles supplied with amino acids between training and running sessions! (120 kcal, 21g p, 8g c)"
        ],
        calories: 120,
        protein: 21,
        carbs: 8,
        fat: 0
      },
      {
        name: "Dinner: Pan or Oven Crispy Fried Japanese Teriyaki Chicken + DOUBLE White Rice & Broccoli + Tea",
        time: "7:30 PM – 8:00 PM",
        ingredients: [
          "~5.7 oz Fresh Chicken Breast cubes prepared Pan or Oven Crispy Fried in Japanese Teriyaki Glaze (dipped in Great Value 100% Liquid Egg Whites, coated with 1 tsp Argo 100% Pure Corn Starch & Great Value Garlic Powder, sprayed with Great Value 0-Calorie Canola Oil Cooking Spray, baked at 400°F until super crunchy outside, and tossed with glaze consisting of Kikkoman Teriyaki Marinade & Sauce, Great Value Ground Ginger, and Great Value Zero Calorie Sweetener Packet). Garnished with fresh chopped green onions / scallions. (210 kcal, 40g p, 2g f)",
          "2 cups cooked Long Grain White Rice (warm, fluffy complex carbohydrates to fuel overnight muscle repair and top off glycogen stores). (400 kcal, 8g p, 88g c)",
          "1 cup steamed Great Value Frozen Broccoli florets seasoned with Great Value Garlic Powder. (30 kcal, 2g p, 6g c)",
          "1 cup hot brewed Great Value 100% Pure Green Tea (0 kcal, evening antioxidant hydration)"
        ],
        calories: 640,
        protein: 50,
        carbs: 94,
        fat: 2
      },
      {
        name: "Nighttime Muscle Armor: Casein Greek Yogurt Fluff & Hot Green Tea",
        time: "10:30 PM",
        ingredients: [
          "3/4 cup (6 oz) Plain Nonfat Greek Yogurt whisked with 1 Great Value Zero Calorie Sweetener Packet until airy and fluffy. Provides slow-digesting night casein protein to maximize muscle protein synthesis while sleeping. (90 kcal, 16g p, 6g c)",
          "1 warm, soothing cup of brewed Great Value 100% Pure Green Tea (0 kcal, deep sleep recovery & metabolic support)"
        ],
        calories: 90,
        protein: 16,
        carbs: 6,
        fat: 0
      },
      {
        name: "Weekly Reward Treat Meal: Nissin Raoh Umami Japanese Ramen",
        time: "Friday or Saturday Evening (Weekly Reward)",
        ingredients: [
          "1 package (3.53 oz) Nissin Raoh Umami Tonkotsu / Soy Sauce Japanese Ramen Noodles. Cooking Instructions: Boil noodles for 4 minutes in 500ml water. Add savory umami soup base packet and stir until rich and aromatic! Garnished with fresh chopped green onions / scallions and sliced chicken breast. A satisfying weekly reward that keeps your adherence at 100% without breaking your weekly grocery budget! (340 kcal, 9g p, 58g c, 8g f)"
        ],
        calories: 340,
        protein: 9,
        carbs: 58,
        fat: 8
      }
    ]
  }
];

export interface WalmartPresetItem {
  name: string;
  category: 'Protein' | 'Carbs' | 'Fats' | 'Produce' | 'Essentials' | 'Toiletries / Non-Grocery' | 'Seasonings & Spices';
  price: string;
  note: string;
}

export const WALMART_QUICK_SELECT_ITEMS: WalmartPresetItem[] = [
  // Toiletries & Household
  { name: "Equate Men's 3-in-1 Body Wash, Shampoo & Conditioner (32 fl oz)", category: "Toiletries / Non-Grocery", price: "$4.48", note: "Essential post-workout hygiene for daily training sessions." },
  { name: "Colgate Total Clean Mint Toothpaste (2-pack)", category: "Toiletries / Non-Grocery", price: "$6.98", note: "Daily oral hygiene essential from aisle A-12." },
  { name: "Great Value Ultra Gentle Toilet Paper (12 Mega Rolls)", category: "Toiletries / Non-Grocery", price: "$10.98", note: "Household budget bulk staple." },
  { name: "Equate 28 oz Protein Shaker Bottle with Wire Whisk Ball", category: "Toiletries / Non-Grocery", price: "$5.98", note: "Essential for mixing whey protein shakes smoothly after lifting." },
  { name: "Great Value Everyday Paper Towels (6 Rolls)", category: "Toiletries / Non-Grocery", price: "$6.98", note: "Kitchen cleanup and meal prep essential." },
  { name: "Great Value 13 Gallon Tall Kitchen Trash Bags (40 Pack)", category: "Toiletries / Non-Grocery", price: "$6.48", note: "Essential 40-pack 13 gallon kitchen trash bags for easy meal prep cleanup and household sanitation." },
  { name: "Hefty Ultra Strong 13 Gallon Kitchen Trash Bags (40 Pack)", category: "Toiletries / Non-Grocery", price: "$8.98", note: "Heavy-duty drawstring 13 gallon trash bags (40 count) for kitchen disposal." },
  { name: "Dawn Ultra Dishwashing Liquid Dish Soap (18 fl oz)", category: "Toiletries / Non-Grocery", price: "$3.28", note: "Degreasing formula for cleaning meal prep containers." },
  { name: "Equate Ibuprofen Pain Reliever Tablets (200 mg, 100 ct)", category: "Toiletries / Non-Grocery", price: "$2.48", note: "Post-workout muscle recovery aid." },
  { name: "Equate Complete Multivitamin Tablets for Men (100 ct)", category: "Toiletries / Non-Grocery", price: "$8.98", note: "Daily micronutrient insurance." },
  { name: "Degree Men Dry Protection Antiperspirant Deodorant (2.7 oz)", category: "Toiletries / Non-Grocery", price: "$3.48", note: "All-day sweat and odor protection for lifting sessions." },
  // Seasonings, Spices, Sauces & Beverages
  { name: "Great Value Garlic Powder (3.4 oz bottle)", category: "Seasonings & Spices", price: "$1.18", note: "Essential zero-calorie savory garlic seasoning." },
  { name: "Great Value Ground Ginger (1.5 oz bottle)", category: "Seasonings & Spices", price: "$2.32", note: "Warming Asian spice for Japanese Teriyaki wok glazes." },
  { name: "Great Value Soy Sauce (15 fl oz bottle)", category: "Seasonings & Spices", price: "$1.48", note: "Savory seasoning for Japanese Teriyaki glaze and egg scrambles." },
  { name: "Kikkoman Teriyaki Marinade & Sauce (10 fl oz bottle)", category: "Seasonings & Spices", price: "$2.98", note: "Authentic sweet & savory Japanese Teriyaki glaze." },
  { name: "Great Value Original Soy Milk (64 fl oz carton)", category: "Produce", price: "$2.48", note: "Creamy plant milk for whisking your morning Jade Leaf Matcha Latte!" },
  { name: "Jade Leaf Organic Matcha Green Tea Powder (1 oz pouch)", category: "Seasonings & Spices", price: "$8.98", note: "Whisk into warm or iced soy milk at 8:00 AM for smooth pre-workout focus!" },
  { name: "Great Value 100% Green Tea Bags (40 ct)", category: "Seasonings & Spices", price: "$1.98", note: "Traditional 100% green tea paired with post-workout meals." },
  { name: "Great Value 0-Calorie Canola Oil Cooking Spray", category: "Seasonings & Spices", price: "$2.24", note: "Fat-free searing for Japanese Teriyaki Chicken and egg scrambling." },
  { name: "Great Value Zero Calorie Sweetener Packets (100 ct)", category: "Seasonings & Spices", price: "$2.18", note: "Sweetens Japanese Teriyaki glaze, matcha, and yogurt with zero sugar calories." },
  { name: "Argo 100% Pure Corn Starch (16 oz box)", category: "Seasonings & Spices", price: "$1.78", note: "Lightly coat chicken cubes for pan/oven crispy fried texture." },
  // Groceries & Protein Staples
  { name: "Fresh Chicken Breasts (~4.7 to 5.0 lb Family Tray)", category: "Protein", price: "$13.40", note: "Primary lean protein staple (~5.0 lb tray at $2.68/lb) for Teriyaki cubes." },
  { name: "Great Value Large Grade A White Eggs (36 Count Tray)", category: "Protein", price: "$6.84", note: "36 eggs guaranteed (3-5 eggs/day for post-workout breakfast plus extras!)." },
  { name: "Great Value Plain Nonfat Greek Yogurt (FOUR 32 oz tubs / 128 oz total)", category: "Protein", price: "$15.92", note: "FOUR tubs (128 oz / 1 Gallon total) for Phase 1 Cutting afternoon & bedtime snacks!" },
  { name: "Great Value Plain Nonfat Greek Yogurt (THREE 32 oz tubs / 96 oz total)", category: "Protein", price: "$11.94", note: "THREE tubs (96 oz / 12 cups total) for Phase 2 Lean Bulking afternoon & bedtime snacks!" },
  { name: "Great Value 100% Liquid Egg Whites (32 oz carton)", category: "Protein", price: "$3.48", note: "Pure protein booster for post-workout scrambles and crispy chicken coating." },
  { name: "Great Value Old Fashioned Rolled Oats (42 oz canister)", category: "Carbs", price: "$3.98", note: "Slow-digesting complex carbs for bulking morning energy." },
  { name: "Fresh Bananas (~1 lb bunch)", category: "Produce", price: "$1.16", note: "Quick potassium and pre-workout carbohydrates (paired with 8 AM matcha latte)." },
  { name: "Great Value Long Grain White Rice (2 lb bag)", category: "Carbs", price: "$1.48", note: "Clean fast-digesting carbohydrates for post-workout cutting recovery." },
  { name: "Great Value Long Grain White Rice (5 lb bag)", category: "Carbs", price: "$3.34", note: "Huge 5 lb bulk bag of clean carbohydrates to top off bulking glycogen stores." },
  { name: "Great Value Frozen Broccoli Florets (Two 12 oz bags)", category: "Produce", price: "$2.32", note: "Steamed micronutrients and fiber for 7 full days of Lunch and Dinner." },
  { name: "Fresh Green Onions / Scallions (1 Bunch)", category: "Produce", price: "$0.78", note: "Fresh aromatic scallions for folding into scrambles and Teriyaki bowls." },
  { name: "Nissin Raoh Umami Tonkotsu / Soy Sauce Ramen Noodles (Single Pack / Tray)", category: "Carbs", price: "$1.68", note: "Your once-a-week Japanese Ramen reward treat meal!" }
];
