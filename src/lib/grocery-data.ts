export interface GroceryItem {
  id: string;
  upc: string; // Barcode code for instant scan matching
  name: string;
  store: 'Walmart Supercenter (Auburn, ME)' | "Shaw's (Auburn/Lewiston)" | 'Hannaford (Lewiston/Auburn)' | 'All Stores';
  brand: string;
  category: 'Protein' | 'Carbs' | 'Fats' | 'Produce' | 'Essentials';
  priceEst: string;
  calories: number;
  protein: number; // in grams
  carbs: number; // in grams
  fat: number; // in grams
  servingSize: string;
  coachNote: string;
}

export interface MealPrepPlan {
  id: string;
  title: string;
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
    upc: "078742371195", // Great Value Chicken
    name: "Great Value Boneless Skinless Chicken Breast",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Protein",
    priceEst: "$2.98 / lb ($9.94 for 3 lb bag)",
    calories: 120,
    protein: 26,
    carbs: 0,
    fat: 1.5,
    servingSize: "4 oz (112g)",
    coachNote: "The ultimate lean protein staple for your 190g daily target. Highly affordable at Auburn Walmart."
  },
  {
    id: "g-2",
    upc: "078742136039", // Great Value Greek Yogurt
    name: "Great Value Plain Nonfat Greek Yogurt",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Protein",
    priceEst: "$3.54 (32 oz tub)",
    calories: 90,
    protein: 16,
    carbs: 6,
    fat: 0,
    servingSize: "3/4 cup (170g)",
    coachNote: "Incredible protein-to-calorie ratio. Mix with a scoop of whey protein or frozen berries for a dessert-like anabolic snack."
  },
  {
    id: "g-3",
    upc: "078742221612", // Great Value Eggs
    name: "Great Value Large Grade A White Eggs",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Protein",
    priceEst: "$2.48 (18 count)",
    calories: 70,
    protein: 6,
    carbs: 0,
    fat: 5,
    servingSize: "1 Egg (50g)",
    coachNote: "Bioavailable whole protein with essential healthy fats. Eat 2 whole eggs + 1 cup egg whites for a massive protein breakfast."
  },
  {
    id: "g-4",
    upc: "078742232427", // Great Value Old Fashioned Oats
    name: "Great Value Old Fashioned Oats",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Carbs",
    priceEst: "$3.98 (42 oz canister)",
    calories: 150,
    protein: 5,
    carbs: 27,
    fat: 2.5,
    servingSize: "1/2 cup dry (40g)",
    coachNote: "Slow-digesting complex carbohydrates. Essential pre-workout fuel before heading to Planet Fitness Lewiston."
  },
  {
    id: "g-5",
    upc: "078742301819", // Great Value Broccoli Florets
    name: "Great Value Frozen Broccoli Florets",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Produce",
    priceEst: "$1.16 (12 oz bag)",
    calories: 30,
    protein: 2,
    carbs: 5,
    fat: 0,
    servingSize: "85g",
    coachNote: "Zero-prep micronutrients and fiber. Keeps you full during your calorie deficit without adding noticeable calories."
  },
  {
    id: "g-6",
    upc: "021130081033", // Lucerne Cottage Cheese
    name: "Lucerne Low Fat 2% Cottage Cheese",
    store: "Shaw's (Auburn/Lewiston)",
    brand: "Lucerne / Signature Select",
    category: "Protein",
    priceEst: "$2.99 (24 oz tub)",
    calories: 90,
    protein: 13,
    carbs: 5,
    fat: 2.5,
    servingSize: "1/2 cup (113g)",
    coachNote: "Rich in casein protein which digests slowly over 6-8 hours. Perfect pre-sleep snack for nighttime muscle repair."
  },
  {
    id: "g-7",
    upc: "021130070761", // Signature Select Ground Turkey
    name: "Signature Select 93% Lean Ground Turkey",
    store: "Shaw's (Auburn/Lewiston)",
    brand: "Signature Select",
    category: "Protein",
    priceEst: "$4.49 / lb",
    calories: 160,
    protein: 22,
    carbs: 0,
    fat: 8,
    servingSize: "4 oz (112g raw)",
    coachNote: "Great alternative to chicken for taco bowls or pasta prep. High protein with healthy monounsaturated fat."
  },
  {
    id: "g-8",
    upc: "072543000104", // Nature's Promise Organic Spinach
    name: "Nature's Promise Organic Baby Spinach",
    store: "Hannaford (Lewiston/Auburn)",
    brand: "Nature's Promise",
    category: "Produce",
    priceEst: "$3.49 (16 oz clam shell)",
    calories: 20,
    protein: 2,
    carbs: 3,
    fat: 0,
    servingSize: "2 cups (85g)",
    coachNote: "Packed with nitrates and iron which enhance muscle endurance and blood flow during heavy lifting."
  },
  {
    id: "g-9",
    upc: "072543311231", // Taste of Inspirations Marinade
    name: "Taste of Inspirations Garlic & Herb Marinade",
    store: "Hannaford (Lewiston/Auburn)",
    brand: "Taste of Inspirations",
    category: "Essentials",
    priceEst: "$2.89 (12 oz bottle)",
    calories: 15,
    protein: 0,
    carbs: 3,
    fat: 0,
    servingSize: "1 Tbsp (15ml)",
    coachNote: "Low-calorie flavor hack. Use this to marinate your chicken breast so meal prep never gets boring."
  },
  {
    id: "g-10",
    upc: "078742352217", // Great Value Jasmine Rice
    name: "Great Value Jasmine Rice",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Carbs",
    priceEst: "$3.48 (5 lb bag)",
    calories: 160,
    protein: 3,
    carbs: 36,
    fat: 0,
    servingSize: "1/4 cup dry (45g)",
    coachNote: "Fast-digesting clean carbohydrates. Pair with chicken breast 90 minutes before your workout for maximum pump and energy."
  }
];

export const MEAL_PREP_PLANS: MealPrepPlan[] = [
  {
    id: "plan-1",
    title: "The Shadow Monarch Cutting Blueprint (~2,650 kcal)",
    targetDailyCalories: 2650,
    targetDailyProtein: 195,
    estCostPerWeek: "$48.50 at Auburn Walmart",
    description: "Designed specifically for your 242 lb -> 170 lb goal. High volume, high satiety, zero hunger cravings, and effortless Sunday meal prep.",
    meals: [
      {
        name: "Breakfast: Hunter's Power Bowl",
        time: "8:00 AM",
        ingredients: [
          "1 cup Great Value Old Fashioned Oats (300 kcal, 10g p)",
          "1 scoop Whey Protein Powder mixed in (120 kcal, 24g p)",
          "1/2 cup frozen blueberries (40 kcal)",
          "2 Great Value Large Eggs scrambled on side (140 kcal, 12g p)"
        ],
        calories: 600,
        protein: 46,
        carbs: 65,
        fat: 14
      },
      {
        name: "Lunch: Lewiston Gym Fuel Bowl",
        time: "12:30 PM",
        ingredients: [
          "8 oz grilled Great Value Chicken Breast (240 kcal, 52g p)",
          "1.5 cups cooked Jasmine Rice (300 kcal, 68g c)",
          "1.5 cups steamed Broccoli Florets with low-sodium soy sauce (50 kcal, 4g p)"
        ],
        calories: 590,
        protein: 56,
        carbs: 75,
        fat: 3
      },
      {
        name: "Pre / Post Workout Snack: Anabolic Yogurt",
        time: "4:30 PM",
        ingredients: [
          "1.5 cups Great Value Plain Nonfat Greek Yogurt (180 kcal, 32g p)",
          "1 Tbsp honey or sugar-free syrup (60 kcal, 15g c)",
          "1 oz almonds or walnuts (170 kcal, 6g p, 14g f)"
        ],
        calories: 410,
        protein: 38,
        carbs: 25,
        fat: 14
      },
      {
        name: "Dinner: Recovery Feast",
        time: "7:30 PM",
        ingredients: [
          "8 oz Signature Select Lean Ground Turkey or Chicken (320 kcal, 44g p)",
          "1 large baked sweet potato or 1 cup rice (200 kcal, 45g c)",
          "2 cups Nature's Promise Spinach salad with olive oil & vinegar (180 kcal, 14g f)"
        ],
        calories: 700,
        protein: 46,
        carbs: 55,
        fat: 22
      },
      {
        name: "Nighttime Recovery: Casein Snack",
        time: "10:30 PM",
        ingredients: [
          "1 cup Lucerne 2% Cottage Cheese or 1 Casein Protein Shake (180 kcal, 26g p)"
        ],
        calories: 350,
        protein: 26,
        carbs: 10,
        fat: 5
      }
    ]
  }
];
