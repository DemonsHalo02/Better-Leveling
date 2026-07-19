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
    coachNote: "One Great Value ~5.0 lb (80 oz raw) family pack from Auburn Walmart! Guaranteed to provide 11.4 oz raw chicken per day for 7 full days of Lunch (5.7 oz/day) and Dinner (5.7 oz/day) hitting 170g daily protein!",
    cuisine: ["China", "China Bulking"]
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
    coachNote: "36 eggs guaranteed! Provides 3 to 5 eggs every morning across all 7 days for post-workout Chinese scallion scrambles plus bonus meal prep eggs. Scramble in 0-cal cooking spray.",
    cuisine: ["China", "China Bulking"]
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
    cuisine: ["China"]
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
    cuisine: ["China Bulking"]
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
    coachNote: "Clean fast-digesting carbohydrates for your Phase 1 Cutting meals to replenish glycogen after Planet Fitness Lewiston sessions.",
    cuisine: ["China"]
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
    coachNote: "Huge 5 lb bulk bag! Clean fast-digesting carbohydrates to fuel Phase 2 post-160 lb lean bulking with double rice portions at lunch and dinner.",
    cuisine: ["China Bulking"]
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
    coachNote: "Two bags (24 oz / ~8 cups total) guaranteed! Steamed micronutrients and fiber for 7 full days of wok-seared General Tso's chicken bowls.",
    cuisine: ["China", "China Bulking"]
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
    coachNote: "Quick potassium and clean pre-workout carbohydrates eaten at 8:00 AM right before your gym session.",
    cuisine: ["China", "China Bulking"]
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
    coachNote: "Fresh aromatic scallions for folding into your post-workout Chinese egg scrambles and garnishing General Tso's bowls.",
    cuisine: ["China", "China Bulking"]
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
    cuisine: ["China"]
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
    coachNote: "Slow-digesting complex carbs for Phase 2 Lean Bulking post-workout energy or mixing into afternoon Greek yogurt bowls.",
    cuisine: ["China Bulking"]
  },
  {
    id: "g-12",
    upc: "078742359001",
    name: "Panda Express Mandarin / General Tso's Sauce (18.75 fl oz bottle)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Panda Express",
    category: "Seasonings & Spices",
    priceEst: "$3.48 (18.75 fl oz bottle)",
    calories: 45,
    protein: 0,
    carbs: 11,
    fat: 0,
    servingSize: "1 tbsp (18g)",
    coachNote: "Authentic sweet & savory General Tso's glaze stocked at Auburn Maine Walmart! Glaze your wok-seared chicken breast cubes across both cutting and bulking plans (Periodic Monday Restock item).",
    cuisine: ["China", "China Bulking"]
  },
  {
    id: "g-13",
    upc: "078742359002",
    name: "Lee Kum Kee Chili Garlic Sauce or Hoisin Sauce (8 oz jar)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Lee Kum Kee",
    category: "Seasonings & Spices",
    priceEst: "$2.98 (8 oz jar)",
    calories: 10,
    protein: 0,
    carbs: 2,
    fat: 0,
    servingSize: "1 tsp (5g)",
    coachNote: "Spicy garlic and chili kick to pair with morning egg scrambles and wok-seared General Tso's chicken (Periodic Monday Restock item).",
    cuisine: ["China", "China Bulking"]
  },
  {
    id: "g-14",
    upc: "078742359003",
    name: "Nissin Chow Mein Teriyaki Beef / General Tso Noodles (4 oz tray)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Nissin",
    category: "Carbs",
    priceEst: "$1.48 (4 oz tray)",
    calories: 500,
    protein: 11,
    carbs: 65,
    fat: 21,
    servingSize: "1 tray (113g)",
    coachNote: "Your once-a-week Chinese reward treat meal! Savory stir-fried noodles to enjoy as a reward on Friday or Saturday topped with sliced lean chicken and green onions.",
    cuisine: ["China", "China Bulking"]
  },
  {
    id: "g-15",
    upc: "085000049999",
    name: "Death Wish Coffee Co. Espresso Roast Ground Coffee (9 oz bag)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Death Wish Coffee Co.",
    category: "Essentials",
    priceEst: "$11.76 (9 oz bag)",
    calories: 5,
    protein: 0,
    carbs: 0,
    fat: 0,
    servingSize: "2 tbsp brewed",
    coachNote: "High-octane Death Wish Espresso Roast! Brew over ice for your 8:00 AM Pre-Workout Iced Black Coffee fuel before hitting Planet Fitness Lewiston.",
    cuisine: ["China", "China Bulking"]
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
    coachNote: "Zero-calorie non-stick cooking spray for searing chicken cubes and scrambling eggs without adding hidden liquid oil calories (Restock item).",
    cuisine: ["China", "China Bulking"]
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
    coachNote: "Essential savory seasoning staple for Chinese stir-fries, General Tso's glazes, and egg scrambles (Restock item).",
    cuisine: ["China", "China Bulking"]
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
    cuisine: ["China", "China Bulking"]
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
    coachNote: "Essential Asian cooking spice! Adds authentic warming heat to your Chinese General Tso's wok glazes (Restock item).",
    cuisine: ["China", "China Bulking"]
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
    coachNote: "Sweetens your Chinese General Tso's glaze, iced coffee, green tea, and Greek yogurt bowls with zero added sugar calories (Restock item).",
    cuisine: ["China", "China Bulking"]
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
    coachNote: "Essential Auburn Walmart green tea staple paired with every post-workout main meal for daily metabolism-boosting hydration.",
    cuisine: ["China", "China Bulking"]
  },
  {
    id: "g-22",
    upc: "078742351234-water",
    name: "Great Value Purified Drinking Water (40 Pack, 16.9 fl oz bottles)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Essentials",
    priceEst: "$4.98 (40 Pack / 16.9 fl oz bottles)",
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    servingSize: "1 bottle (16.9 fl oz)",
    coachNote: "Essential 40-pack purified hydration staple from Auburn Maine Walmart! Keeps you fully hydrated during workouts and daily meal prep.",
    cuisine: ["China", "China Bulking"]
  },
  {
    id: "g-23",
    upc: "025293004136",
    name: "Silk Original Soy Milk (Half Gallon / 64 fl oz)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Silk",
    category: "Essentials",
    priceEst: "$3.97 (Half Gallon)",
    calories: 110,
    protein: 8,
    carbs: 9,
    fat: 4.5,
    servingSize: "1 cup (8 fl oz)",
    coachNote: "100% dairy-free & lactose-free! High protein (8g/cup) optional creamy base for mixing iced coffees or shakes without stomach discomfort.",
    cuisine: ["China", "China Bulking"]
  },
  {
    id: "g-24",
    upc: "078742353333",
    name: "Great Value Chunk Light Tuna in Water (Four 5 oz cans)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Protein",
    priceEst: "$3.68 (4 Pack of 5 oz cans)",
    calories: 100,
    protein: 22,
    carbs: 0,
    fat: 1,
    servingSize: "1 can (142g)",
    coachNote: "High protein, zero-carb lean fish option ALWAYS stocked at Auburn Walmart. Perfect for high-protein Chinese rice bowls!",
    cuisine: ["China", "China Bulking"]
  },
  {
    id: "g-25",
    upc: "078742351111",
    name: "All Natural Lean Ground Beef 93/7 (~1 lb roll / tray)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "All Natural / Great Value",
    category: "Protein",
    priceEst: "$6.48 (1 lb roll / tray)",
    calories: 170,
    protein: 24,
    carbs: 0,
    fat: 8,
    servingSize: "4 oz (112g raw)",
    coachNote: "Essential lean beef alternative for authentic Chinese Beef & Broccoli stir-fries! Loaded with bioavailable iron and creatine.",
    cuisine: ["China", "China Bulking"]
  },
  {
    id: "g-26",
    upc: "078742358999",
    name: "Great Value Frozen Shelled Edamame (ONE 12 oz bag)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Produce",
    priceEst: "$3.09 (12 oz bag)",
    calories: 100,
    protein: 9,
    carbs: 7,
    fat: 4,
    servingSize: "1/2 cup (75g)",
    coachNote: "Rich in plant protein and fiber to pair with your Chinese stir-fry lunch bowls.",
    cuisine: ["China", "China Bulking"]
  },
  {
    id: "g-27",
    upc: "078742359111",
    name: "Great Value Frozen Mixed Berries (12 oz bag)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Produce",
    priceEst: "$2.88 (12 oz bag)",
    calories: 70,
    protein: 1,
    carbs: 17,
    fat: 0.5,
    servingSize: "1 cup (140g)",
    coachNote: "High-antioxidant frozen berry medley! Mix into your afternoon Greek Yogurt Power Bowl and bedtime Casein Fluff.",
    cuisine: ["China", "China Bulking"]
  },
  {
    id: "g-28",
    upc: "078742351234-cornstarch",
    name: "Great Value Cornstarch (16 oz box)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Seasonings & Spices",
    priceEst: "$1.48 (16 oz box)",
    calories: 30,
    protein: 0,
    carbs: 7,
    fat: 0,
    servingSize: "1 tbsp (8g)",
    coachNote: "Lightly toss your chicken breast cubes in 1 tsp cornstarch before searing in the wok for authentic General Tso's crispiness (Restock item).",
    cuisine: ["China", "China Bulking"]
  }
];

export const MEAL_PREP_PLANS: MealPrepPlan[] = [
  {
    id: "plan-china",
    title: "China: Chinese General Tso's Chicken & Death Wish Black Coffee Shred Blueprint (~2,150 kcal)",
    country: "China",
    flag: "🇨🇳",
    badge: "⭐ #1 Main Phase 1 Cutting Blueprint ($45.38/Wk)",
    targetDailyCalories: 2150,
    targetDailyProtein: 170,
    estCostPerWeek: "$45.38 Weekly Consumables / $31.08 Periodic Restock ($76.46 Combined Total)",
    description: "The #1 Main Chinese General Tso's Chicken & Death Wish Black Coffee Shred Blueprint! Designed specifically around Hunter Nick's schedule: Monday Grocery Run at Auburn Maine Walmart Supercenter ($50 budget for regular runs, max $25 for restocking) & Batch Meal Prep, starting eating Tuesday (Tuesday-Monday 7-Day Cycle). Features high-octane Death Wish Espresso Roast Iced Black Coffee + Banana at 8:00 AM as extreme Pre-Workout focus before hitting Planet Fitness Lewiston! Followed by a cooked-fresh Post-Workout Scallion & Liquid Egg White Scramble with Chili Garlic Sauce at 10:30-11:00 AM, authentic Wok-Seared Chinese General Tso's Glazed Chicken Breast for Lunch and Dinner, and slow-release Casein Greek Yogurt bowls (with 4 tubs / 1 Gallon guaranteed so you never run out!). Traditional 100% Green Tea is paired with every post-workout main meal to maximize thermogenesis. Plus, includes Nissin Chow Mein / Lo Mein Noodles as your weekly reward treat meal on Friday or Saturday evening!",
    meals: [
      {
        name: "Pre-Workout Fuel: Death Wish Iced Black Coffee & Banana",
        time: "8:00 AM (Pre-Workout)",
        ingredients: [
          "1 Pre-Workout Death Wish Iced Black Coffee: Brew 2 tbsp Death Wish Espresso Roast ground coffee with hot water, pour over ice (optional: add 1 zero-cal sweetener packet for zero-calorie sweetness, or keep pure black). Extreme clean caffeine and focus! (5 kcal, 0g p)",
          "1 Medium Fresh Banana: Peel and eat immediately before heading to Planet Fitness Lewiston for rapid-absorbing pre-workout carbohydrates & potassium! (105 kcal, 1g p, 27g c)"
        ],
        calories: 110,
        protein: 1,
        carbs: 27,
        fat: 0
      },
      {
        name: "Post-Workout Breakfast: Chinese Scallion & Egg White Scramble + Rice & Chili Garlic Sauce + Tea",
        time: "10:30 AM – 11:00 AM (Post-Workout)",
        ingredients: [
          "3 Large Grade A White Eggs + 1/2 cup (4 oz) Liquid Egg Whites scrambled in Great Value 0-Cal Cooking Spray. Cooking Instructions: Heat non-stick skillet over medium heat, spray liberally with canola oil spray. Whisk 3 whole eggs plus 1/2 cup liquid egg whites thoroughly. Pour in skillet and gently fold with spatula over medium heat. During the last 60 seconds of cooking, fold in 1 tbsp soy sauce, 1/2 tsp garlic powder, and chopped fresh green onions until golden and fluffy! (330 kcal, 31g p, 15g f)",
          "1 cup cooked Long Grain White Rice. Cooking Instructions: Rinse rice until water runs clear. Combine 1 cup raw rice with 2 cups water in saucepan, bring to boil, cover, and simmer low for 18 minutes. Fluff with fork! (200 kcal, 4g p, 44g c)",
          "1 tsp Lee Kum Kee Chili Garlic Sauce or Hoisin Sauce (spicy garlic flavor booster with near-zero calories). (10 kcal, 0g p, 2g c)",
          "1 cup hot brewed Great Value 100% Green Tea. Cooking Instructions: Steep 1 green tea bag in boiling water for 3-5 minutes. (0 kcal, post-workout antioxidant recovery & metabolism boost)"
        ],
        calories: 550,
        protein: 36,
        carbs: 48,
        fat: 15
      },
      {
        name: "Lunch: Wok-Seared Chinese General Tso's Glazed Chicken Breast & Steamed Broccoli + Tea",
        time: "2:00 PM – 2:30 PM",
        ingredients: [
          "~5.7 oz Fresh Chicken Breast cubes wok-seared in Chinese General Tso's Glaze. Cooking Instructions: Cut chicken breast into bite-sized 1-inch cubes and toss with 1 tsp cornstarch and garlic powder. Spray non-stick wok or skillet with 0-cal canola cooking spray over medium-high heat. Sear chicken cubes for 6-8 minutes until golden brown and fully cooked (165°F internal). Whisk low-cal Chinese General Tso's Glaze (1.5 tbsp Panda Express General Tso's sauce, 1 tsp soy sauce, 1 zero-cal sweetener packet, 1/4 tsp ground ginger, 1/4 tsp garlic powder, and 1 tbsp water). Pour glaze into wok over chicken and toss vigorously for 1 minute until sticky, glossy, and caramelized! (210 kcal, 40g p, 2g f)",
          "1 cup steamed Great Value Frozen Broccoli florets. Cooking Instructions: Microwave frozen broccoli in covered bowl with 2 tbsp water for 3-4 minutes until crisp-tender, drain and season with garlic powder. (30 kcal, 2g p, 6g c)",
          "1 cup cooked Long Grain White Rice (from batch prep, reheated with a splash of water so it stays fluffy). (200 kcal, 4g p, 44g c)",
          "1 cup hot brewed 100% Green Tea (0 kcal, thermogenic fat oxidation booster)"
        ],
        calories: 440,
        protein: 46,
        carbs: 53,
        fat: 2
      },
      {
        name: "Afternoon Snack: Chinese Casein Greek Yogurt Bowl",
        time: "5:30 PM",
        ingredients: [
          "1 cup (8 oz) Plain Nonfat Greek Yogurt. Cooking Instructions: Spoon yogurt into bowl, stir in 1 zero-calorie sweetener packet and a pinch of cinnamon or vanilla until velvety and creamy. Slow-release casein protein keeps muscles fueled and satiated between meals! (120 kcal, 21g p, 8g c)"
        ],
        calories: 120,
        protein: 21,
        carbs: 8,
        fat: 0
      },
      {
        name: "Dinner: Wok-Seared Chinese General Tso's Glazed Chicken Breast & Steamed Broccoli + Tea",
        time: "7:30 PM – 8:00 PM",
        ingredients: [
          "~5.7 oz Fresh Chicken Breast cubes wok-seared in Chinese General Tso's Glaze. Cooking Instructions: Prepare chicken cubes in wok with 0-cal canola spray over medium-high heat for 6-8 minutes. Toss with low-cal General Tso's Glaze (Panda Express sauce, soy sauce, zero-cal sweetener, ginger, garlic powder, water) until caramelized and glossy! (210 kcal, 40g p, 2g f)",
          "1 cup steamed Great Value Frozen Broccoli florets (crisp-tender, seasoned with garlic powder). (30 kcal, 2g p, 6g c)",
          "1 cup cooked Long Grain White Rice (reheated warm and fluffy). (200 kcal, 4g p, 44g c)",
          "1 cup hot brewed 100% Green Tea (0 kcal, evening metabolic & muscle recovery aid)"
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
          "3/4 cup (6 oz) Plain Nonfat Greek Yogurt. Cooking Instructions: Whisk yogurt in a bowl with 1 zero-calorie sweetener packet until airy and fluffy. Provides essential overnight amino acids to rebuild muscle fiber while you sleep. (90 kcal, 16g p, 6g c)",
          "1 warm, soothing cup of brewed 100% Green Tea (0 kcal, overnight metabolic support during deep sleep)"
        ],
        calories: 90,
        protein: 16,
        carbs: 6,
        fat: 0
      }
    ]
  },
  {
    id: "plan-china-bulking",
    title: "China Bulking: Chinese General Tso's & Wok-Seared Lean Bulking Blueprint (~2,750 kcal)",
    country: "China Bulking",
    flag: "🇨🇳💪",
    badge: "🔥 Phase 2: Post-160 Lb Lean Bulk ($43.76/Wk)",
    targetDailyCalories: 2750,
    targetDailyProtein: 189,
    estCostPerWeek: "$43.76 Weekly Consumables / $31.08 Periodic Restock ($74.84 Combined Total)",
    description: "The #1 Lean Bulking Blueprint designed for Hunter Nick once he conquers his 160 Lb target weight! Built around the same Monday Auburn ME Walmart Grocery Run & Batch Meal Prep schedule. Notice how this bulking plan is exactly $1.62 CHEAPER per week ($43.76 vs $45.38) while adding +600 clean muscle-building calories every day! We swap 4 tubs of yogurt and liquid egg whites for a massive 5 lb bag of Long Grain White Rice, 42 oz of Rolled Oats, 3 tubs of Greek Yogurt, and 35 whole eggs across the week (5 whole eggs daily to naturally boost hormone production and muscle recovery after heavy compound lifts at Planet Fitness Lewiston!). Features Wok-Seared Chinese General Tso's Glazed Chicken with DOUBLE White Rice & Broccoli, hot 100% Green Tea, and your Friday/Saturday Chow Mein treat meal!",
    meals: [
      {
        name: "Pre-Workout Fuel: Death Wish Iced Black Coffee & Banana",
        time: "8:00 AM (Pre-Workout)",
        ingredients: [
          "1 Pre-Workout Death Wish Iced Black Coffee: Brew 2 tbsp Death Wish Espresso Roast ground coffee with hot water, pour over ice (optional: add 1 zero-cal sweetener packet). High-octane clean caffeine for heavy compound lifts at Planet Fitness Lewiston! (5 kcal, 0g p)",
          "1 Medium Fresh Banana: Peel and eat immediately before gym for rapid-absorbing pre-workout carbohydrates & potassium! (105 kcal, 1g p, 27g c)"
        ],
        calories: 110,
        protein: 1,
        carbs: 27,
        fat: 0
      },
      {
        name: "Post-Workout Breakfast: 5-Egg Chinese Scallion Scramble + Rolled Oats + Chili Garlic + Tea",
        time: "10:30 AM – 11:00 AM (Post-Workout)",
        ingredients: [
          "5 Large Grade A White Eggs scrambled in Great Value 0-Cal Cooking Spray. Cooking Instructions: Heat non-stick skillet over medium heat, spray liberally with canola oil spray. Whisk 5 whole eggs thoroughly. Pour in skillet and gently fold over medium heat. Fold in 1 tbsp soy sauce, 1/2 tsp garlic powder, and chopped fresh green onions until fluffy and golden! Provides rich amino acids, healthy fats, and natural cholesterol for muscle building. (350 kcal, 30g p, 25g f)",
          "1 cup cooked Great Value Old Fashioned Rolled Oats. Cooking Instructions: Combine 1/2 cup dry oats with 1 cup water in bowl, microwave 2 minutes or cook on stovetop. Stir in cinnamon or sweetener packet for slow-digesting complex carbs! (150 kcal, 5g p, 27g c)",
          "1 tsp Lee Kum Kee Chili Garlic Sauce (tangy, spicy kick with near-zero calories). (10 kcal, 0g p, 2g c)",
          "1 cup hot brewed Great Value 100% Green Tea. (0 kcal, post-workout antioxidant recovery & digestion aid)"
        ],
        calories: 515,
        protein: 36,
        carbs: 56,
        fat: 25
      },
      {
        name: "Lunch: Wok-Seared Chinese General Tso's Chicken + DOUBLE White Rice & Broccoli + Tea",
        time: "2:00 PM – 2:30 PM",
        ingredients: [
          "~5.7 oz Fresh Chicken Breast cubes wok-seared in Chinese General Tso's Glaze. Cooking Instructions: Cut chicken breast into bite-sized cubes, toss with 1 tsp cornstarch and garlic powder. Spray wok with 0-cal canola spray, sear 6-8 minutes until golden and 165°F internal. Whisk low-cal General Tso's Glaze (Panda Express sauce, soy sauce, sweetener packet, ginger, garlic powder, water), pour into wok and toss for 1 minute until sticky and glossy! (210 kcal, 40g p, 2g f)",
          "2 cups cooked Long Grain White Rice (from your 5 lb batch prep bag, reheated with a splash of water for fluffy, high-density bulking glycogen replenishment!). (400 kcal, 8g p, 88g c)",
          "1 cup steamed Great Value Frozen Broccoli florets seasoned with garlic powder. (30 kcal, 2g p, 6g c)",
          "1 cup hot brewed 100% Green Tea (0 kcal, digestion & nutrient partitioning support)"
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
          "1 cup (8 oz) Plain Nonfat Greek Yogurt mixed with 1 zero-calorie sweetener packet and cinnamon/vanilla until creamy and velvety. Slow-release casein protein keeps muscles supplied with amino acids between lifting sessions! (120 kcal, 21g p, 8g c)"
        ],
        calories: 120,
        protein: 21,
        carbs: 8,
        fat: 0
      },
      {
        name: "Dinner: Wok-Seared Chinese General Tso's Chicken + DOUBLE White Rice & Broccoli + Tea",
        time: "7:30 PM – 8:00 PM",
        ingredients: [
          "~5.7 oz Fresh Chicken Breast cubes wok-seared in Chinese General Tso's Glaze until caramelized and glossy. (210 kcal, 40g p, 2g f)",
          "2 cups cooked Long Grain White Rice (warm, fluffy complex carbohydrates to fuel overnight muscle repair and top off glycogen stores). (400 kcal, 8g p, 88g c)",
          "1 cup steamed Great Value Frozen Broccoli florets seasoned with garlic powder. (30 kcal, 2g p, 6g c)",
          "1 cup hot brewed 100% Green Tea (0 kcal, evening antioxidant hydration)"
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
          "3/4 cup (6 oz) Plain Nonfat Greek Yogurt whisked with 1 zero-calorie sweetener packet until airy and fluffy. Provides slow-digesting night casein protein to maximize muscle protein synthesis while sleeping. (90 kcal, 16g p, 6g c)",
          "1 warm, soothing cup of brewed 100% Green Tea (0 kcal, deep sleep recovery & metabolic support)"
        ],
        calories: 90,
        protein: 16,
        carbs: 6,
        fat: 0
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
  { name: "Equate Men's 3-in-1 Body Wash, Shampoo & Conditioner (32 fl oz)", category: "Toiletries / Non-Grocery", price: "$4.48", note: "Essential post-workout hygiene for Planet Fitness Lewiston gym workout sessions." },
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
  { name: "Great Value Garlic Powder (3.4 oz bottle)", category: "Seasonings & Spices", price: "$1.08", note: "Essential zero-calorie savory garlic seasoning." },
  { name: "Great Value Onion Powder (3.25 oz bottle)", category: "Seasonings & Spices", price: "$1.08", note: "Essential zero-calorie savory onion seasoning." },
  { name: "Great Value Ground Ginger (1.5 oz bottle)", category: "Seasonings & Spices", price: "$2.32", note: "Warming Asian spice for General Tso's wok glazes." },
  { name: "Great Value Ground Cinnamon (2.5 oz bottle)", category: "Seasonings & Spices", price: "$1.27", note: "Sweet warming spice for Greek yogurt bowls and oatmeal." },
  { name: "Great Value Soy Sauce (15 fl oz bottle)", category: "Seasonings & Spices", price: "$1.48", note: "Savory seasoning for Chinese General Tso's glaze and egg scrambles." },
  { name: "Panda Express Mandarin / General Tso's Sauce (18.75 fl oz bottle)", category: "Seasonings & Spices", price: "$3.48", note: "Authentic sweet & savory General Tso's glaze." },
  { name: "Lee Kum Kee Chili Garlic Sauce or Hoisin Sauce (8 oz jar)", category: "Seasonings & Spices", price: "$2.98", note: "Spicy garlic and chili kick for Chinese scrambles and stir-fries." },
  { name: "Death Wish Coffee Co. Espresso Roast Ground Coffee (9 oz bag)", category: "Seasonings & Spices", price: "$11.76", note: "Brew over ice at 8:00 AM for extreme high-octane pre-workout focus!" },
  { name: "Great Value Cornstarch (16 oz box)", category: "Seasonings & Spices", price: "$1.48", note: "Toss chicken breast cubes lightly before searing for authentic wok crispiness." },
  { name: "Great Value 100% Green Tea Bags (40 ct)", category: "Seasonings & Spices", price: "$1.98", note: "Traditional Asian 100% green tea paired with post-workout meals." },
  { name: "Great Value 0-Calorie Canola Oil Cooking Spray", category: "Seasonings & Spices", price: "$2.24", note: "Fat-free searing for Chinese General Tso's chicken and egg scrambling." },
  { name: "Great Value Zero Calorie Sweetener Packets (100 ct)", category: "Seasonings & Spices", price: "$2.18", note: "Sweetens Chinese General Tso's glaze, tea, and yogurt with zero sugar calories." },
  { name: "Great Value Purified Drinking Water (40 Pack, 16.9 fl oz bottles)", category: "Essentials", price: "$4.98", note: "40-pack purified water bottles from Auburn Walmart." },
  // Groceries & Protein Staples
  { name: "Fresh Chicken Breasts (~4.7 to 5.0 lb Family Tray)", category: "Protein", price: "$13.40", note: "Primary lean protein staple (~5.0 lb tray at $2.68/lb) for General Tso's cubes." },
  { name: "All Natural Lean Beef Stew Meat (~1.0 lb Tray)", category: "Protein", price: "$6.48", note: "Tender beef chunks for stir-fry bowls." },
  { name: "Great Value Large Grade A White Eggs (36 Count Tray)", category: "Protein", price: "$6.84", note: "36 eggs guaranteed (3-5 eggs/day for post-workout breakfast plus extras!)." },
  { name: "All Natural Lean Ground Beef 93/7 (~1 lb roll)", category: "Protein", price: "$6.48", note: "Essential lean beef for stir-fries." },
  { name: "Great Value Plain Nonfat Greek Yogurt (FOUR 32 oz tubs / 128 oz total)", category: "Protein", price: "$15.92", note: "FOUR tubs (128 oz / 1 Gallon total) for Phase 1 Cutting afternoon & bedtime snacks!" },
  { name: "Great Value Plain Nonfat Greek Yogurt (THREE 32 oz tubs / 96 oz total)", category: "Protein", price: "$11.94", note: "THREE tubs (96 oz / 12 cups total) for Phase 2 Lean Bulking afternoon & bedtime snacks!" },
  { name: "Silk Original Soy Milk (Half Gallon / 64 fl oz)", category: "Essentials", price: "$3.97", note: "100% dairy-free high protein creamy base." },
  { name: "Great Value Chunk Light Tuna in Water (4 Pack)", category: "Protein", price: "$3.68", note: "High protein, zero-carb lean fish staple." },
  { name: "Great Value 100% Liquid Egg Whites (32 oz carton)", category: "Protein", price: "$3.48", note: "Pure protein booster for post-workout scrambles." },
  { name: "Great Value Old Fashioned Rolled Oats (42 oz canister)", category: "Carbs", price: "$3.98", note: "Slow-digesting complex carbs for bulking morning energy." },
  { name: "Fresh Bananas (~1 lb bunch)", category: "Produce", price: "$1.16", note: "Quick potassium and pre-workout carbohydrates (paired with 8 AM coffee)." },
  { name: "Great Value Long Grain White Rice (2 lb bag)", category: "Carbs", price: "$1.48", note: "Clean fast-digesting carbohydrates for post-workout cutting recovery." },
  { name: "Great Value Long Grain White Rice (5 lb bag)", category: "Carbs", price: "$3.34", note: "Huge 5 lb bulk bag of clean carbohydrates to top off bulking glycogen stores." },
  { name: "Great Value Frozen Broccoli Florets (Two 12 oz bags)", category: "Produce", price: "$2.32", note: "Steamed micronutrients and fiber for 7 full days of Lunch and Dinner." },
  { name: "Fresh Green Onions / Scallions (1 Bunch)", category: "Produce", price: "$0.78", note: "Fresh aromatic scallions for folding into scrambles and General Tso's bowls." },
  { name: "Nissin Chow Mein Teriyaki Beef / General Tso Noodles (4 oz tray)", category: "Carbs", price: "$1.48", note: "Your once-a-week Chinese reward treat meal!" }
];
