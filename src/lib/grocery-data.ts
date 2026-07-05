export interface GroceryItem {
  id: string;
  upc: string; // Barcode code for instant scan matching
  name: string;
  store: 'Walmart Supercenter (Auburn, ME)' | "Shaw's (Auburn/Lewiston)" | 'Hannaford (Lewiston/Auburn)' | 'All Stores';
  brand: string;
  category: 'Protein' | 'Carbs' | 'Fats' | 'Produce' | 'Essentials' | 'Toiletries / Non-Grocery';
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
    upc: "078742371195", // Fresh Chicken Breast Family Pack (5 lb)
    name: "Freshness Guaranteed Fresh Boneless Skinless Chicken Breasts (~5 lb Family Pack)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Freshness Guaranteed",
    category: "Protein",
    priceEst: "$12.40 (~5 lb family pack tray at $2.48/lb)",
    calories: 120,
    protein: 26,
    carbs: 0,
    fat: 1.5,
    servingSize: "4 oz (112g)",
    coachNote: "Upgraded 5 lb fresh family pack for maximum protein! Fresh chicken cooks tender and fast. Season with Adobo & Sazón for authentic Pollo Guisado."
  },
  {
    id: "g-2",
    upc: "074471014309", // Cafe Bustelo K-Cups 12ct
    name: "Café Bustelo Espresso Style Coffee K-Cup Pods (10/12 Count Box)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Café Bustelo",
    category: "Essentials",
    priceEst: "$8.98 (10-12 Count Box)",
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    servingSize: "1 K-Cup Pod (8 fl oz)",
    coachNote: "Authentic Puerto Rican dark roast espresso in Keurig K-Cups! Combine with milk and sweetener for a sweet, traditional Café con Leche."
  },
  {
    id: "g-3",
    upc: "078742351888", // Great Value Milk
    name: "Great Value Milk (Half Gallon / 64 fl oz)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Essentials",
    priceEst: "$1.72 (Half Gallon)",
    calories: 130,
    protein: 8,
    carbs: 12,
    fat: 5,
    servingSize: "1 cup (8 fl oz)",
    coachNote: "Essential for making authentic, creamy Puerto Rican Café con Leche every morning and afternoon!"
  },
  {
    id: "g-4",
    upc: "078742351999", // Zero Calorie Sweetener / Sugar Packets
    name: "Great Value Zero Calorie Sweetener or Sugar Packets (100 Count Box)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Essentials",
    priceEst: "$1.98 (100 Count Box)",
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    servingSize: "1 Packet (1g)",
    coachNote: "The secret to getting that traditional sweet Puerto Rican Café con Leche taste without adding unwanted sugar calories!"
  },
  {
    id: "g-5",
    upc: "041331031301", // Goya Sazon
    name: "Goya Sazón with Coriander & Annatto (Culantro y Achiote, 8 ct)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Goya",
    category: "Essentials",
    priceEst: "$1.98 (8 Packet Box, 1.41 oz)",
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    servingSize: "1/4 Packet (1g)",
    coachNote: "The essential Puerto Rican seasoning secret! Adds golden color and savory garlic/annatto flavor to rice, beans, and chicken with zero calories."
  },
  {
    id: "g-6",
    upc: "041331039802", // Goya Adobo
    name: "Goya Adobo All-Purpose Seasoning with Pepper (8 oz jar)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Goya",
    category: "Essentials",
    priceEst: "$2.48 (8 oz jar)",
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    servingSize: "1/4 tsp (1g)",
    coachNote: "The #1 Boricua all-purpose seasoning! Garlic, oregano, and black pepper blend that flavors Chuletas and Pollo Guisado with zero calories."
  },
  {
    id: "g-7",
    upc: "078742351234", // 0 Calorie Cooking Spray
    name: "Great Value Canola Oil 0 Calorie Cooking Spray (8 oz can)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Essentials",
    priceEst: "$2.52 (8 oz aerosol can)",
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    servingSize: "0.25 sec spray (0.25g)",
    coachNote: "Zero-calorie non-stick cooking spray for searing Chuletas (pork chops), chicken, and eggs without adding hidden liquid oil calories!"
  },
  {
    id: "g-8",
    upc: "078742211234", // Bone-In Pork Chops (Chuletas)
    name: "All Natural Bone-In Assorted Pork Chops (Chuletas, ~2 lb tray)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "All Natural / Walmart",
    category: "Protein",
    priceEst: "$5.96 (~2 lb tray at $2.98/lb)",
    calories: 170,
    protein: 23,
    carbs: 0,
    fat: 8,
    servingSize: "4 oz (112g raw)",
    coachNote: "Traditional Puerto Rican Chuletas! Season with Adobo and Sazón, then pan-sear using 0-calorie cooking spray for a mouthwatering high-protein dinner."
  },
  {
    id: "g-9",
    upc: "078742351883", // Great Value Black Beans
    name: "Great Value Black Beans / Habichuelas Negras (Two 15.25 oz cans)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Carbs",
    priceEst: "$1.76 (Two 15.25 oz cans at $0.88 ea)",
    calories: 110,
    protein: 7,
    carbs: 20,
    fat: 0.5,
    servingSize: "1/2 cup (130g)",
    coachNote: "Classic Puerto Rican Habichuelas Negras! Simmered with Sazón and Adobo. Universally stocked at Auburn Walmart and loaded with fiber and plant protein."
  },
  {
    id: "g-10",
    upc: "078742352217", // Great Value White Rice 5 lb
    name: "Great Value Long Grain White Rice (5 lb bag)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Carbs",
    priceEst: "$3.34 (5 lb bag)",
    calories: 160,
    protein: 3,
    carbs: 36,
    fat: 0,
    servingSize: "1/4 cup dry (45g)",
    coachNote: "Upgraded 5 lb bag! The base for Arroz con Habichuelas. Fast-digesting clean carbohydrates to fuel your heavy lifting sessions at Planet Fitness Lewiston."
  },
  {
    id: "g-11",
    upc: "078742221612", // Great Value Eggs
    name: "Great Value Large Grade A White Eggs (18 Count Carton)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Protein",
    priceEst: "$2.48 (18 count carton)",
    calories: 70,
    protein: 6,
    carbs: 0,
    fat: 5,
    servingSize: "1 Egg (50g)",
    coachNote: "Bioavailable whole protein with essential healthy fats. Scramble with Adobo and 0-calorie cooking spray for a Boricua spiced breakfast!"
  },
  {
    id: "g-12",
    upc: "078742136039", // Great Value Greek Yogurt
    name: "Great Value Plain Nonfat Greek Yogurt (32 oz tub)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Protein",
    priceEst: "$3.54 (32 oz tub)",
    calories: 90,
    protein: 16,
    carbs: 6,
    fat: 0,
    servingSize: "3/4 cup (170g)",
    coachNote: "Incredible protein-to-calorie ratio. Mix with a dash of cinnamon or sweetener for a high-protein anabolic snack to hit your protein targets."
  },
  {
    id: "g-13",
    upc: "000000040659", // Fresh Green Plantains
    name: "Fresh Green Plantains / Plátanos Verdes (4 Pack / ~4 Plantains)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Fresh Produce",
    category: "Carbs",
    priceEst: "$2.72 (4 Plantains at ~$0.68 ea)",
    calories: 150,
    protein: 1,
    carbs: 38,
    fat: 0,
    servingSize: "1 Plantain (170g)",
    coachNote: "Classic Puerto Rican green plantains! Peel, slice into coins, boil slightly, smash, and pan-sear in 0-calorie cooking spray for crispy, authentic Tostones a la Plancha."
  }
];

export interface WalmartPresetItem {
  name: string;
  category: 'Protein' | 'Carbs' | 'Fats' | 'Produce' | 'Essentials' | 'Toiletries / Non-Grocery';
  price: string;
  note: string;
}

export const WALMART_QUICK_SELECT_ITEMS: WalmartPresetItem[] = [
  // Toiletries & Household
  { name: "Equate Men's 3-in-1 Body Wash, Shampoo & Conditioner (32 fl oz)", category: "Toiletries / Non-Grocery", price: "$4.48", note: "Essential post-workout hygiene for Planet Fitness Lewiston sessions." },
  { name: "Colgate Total Clean Mint Toothpaste (2-pack)", category: "Toiletries / Non-Grocery", price: "$6.98", note: "Daily oral hygiene essential from aisle A-12." },
  { name: "Great Value Ultra Gentle Toilet Paper (12 Mega Rolls)", category: "Toiletries / Non-Grocery", price: "$10.98", note: "Household budget bulk staple." },
  { name: "Equate 28 oz Protein Shaker Bottle with Wire Whisk Ball", category: "Toiletries / Non-Grocery", price: "$5.98", note: "Essential for mixing whey protein shakes smoothly after lifting." },
  { name: "Great Value Everyday Paper Towels (6 Rolls)", category: "Toiletries / Non-Grocery", price: "$6.98", note: "Kitchen cleanup and meal prep essential." },
  { name: "Great Value Tall Kitchen Trash Bags (13 Gallon, 40 ct)", category: "Toiletries / Non-Grocery", price: "$6.48", note: "Kitchen sanitation essential." },
  { name: "Dawn Ultra Dishwashing Liquid Dish Soap (18 fl oz)", category: "Toiletries / Non-Grocery", price: "$3.28", note: "Degreasing formula for cleaning meal prep containers." },
  { name: "Equate Ibuprofen Pain Reliever Tablets (200 mg, 100 ct)", category: "Toiletries / Non-Grocery", price: "$2.48", note: "Post-workout muscle recovery aid." },
  { name: "Equate Complete Multivitamin Tablets for Men (100 ct)", category: "Toiletries / Non-Grocery", price: "$8.98", note: "Daily micronutrient insurance." },
  { name: "Degree Men Dry Protection Antiperspirant Deodorant (2.7 oz)", category: "Toiletries / Non-Grocery", price: "$3.48", note: "All-day sweat and odor protection for lifting sessions." },
  // Groceries & Staples
  { name: "Great Value Large Grade A Eggs (12 Count)", category: "Protein", price: "$2.98", note: "High-biological value breakfast protein." },
  { name: "Great Value Old Fashioned Rolled Oats (42 oz canister)", category: "Carbs", price: "$3.98", note: "Slow-digesting complex carbs for morning energy." },
  { name: "Fresh Bananas (~1 lb bunch / ~3-4 bananas)", category: "Produce", price: "$0.58", note: "Quick potassium and pre-workout carbohydrates." },
  { name: "Great Value Frozen Broccoli Florets (12 oz bag)", category: "Produce", price: "$1.18", note: "Easy steamed micronutrients and fiber." },
  { name: "Great Value Whole Milk (1 Gallon)", category: "Protein", price: "$3.88", note: "Classic calcium and protein for coffee or shakes." }
];

export const MEAL_PREP_PLANS: MealPrepPlan[] = [
  {
    id: "plan-1",
    title: "The Boricua Cutting Blueprint (~2,150 kcal)",
    targetDailyCalories: 2150,
    targetDailyProtein: 206,
    estCostPerWeek: "$51.86 total at Auburn Walmart",
    description: "Authentic Puerto Rican style cutting plan with upgraded 5 lb fresh chicken, 5 lb rice, and crispy green Tostones a la Plancha! SCHEDULE NOTE: Shop your list at Auburn Walmart and cook your meal prep every MONDAY; begin eating your prepped meals on TUESDAY!",
    meals: [
      {
        name: "Breakfast: Sweet Boricua Café con Leche & Spiced Scramble",
        time: "8:00 AM",
        ingredients: [
          "1 Café Bustelo K-Cup brewed with 1/3 cup Great Value Milk & 2 zero-cal sweetener packets for sweet Café con Leche! (50 kcal, 3g p)",
          "3 Great Value Large Eggs scrambled in 0-Calorie Cooking Spray with pinch of Goya Adobo (220 kcal, 18g p)",
          "1/2 cup Great Value White Rice seasoned with pinch of Sazón (150 kcal, 3g p, 34g c)"
        ],
        calories: 420,
        protein: 24,
        carbs: 40,
        fat: 16
      },
      {
        name: "Lunch: Pollo Guisado & Crispy Tostones a la Plancha",
        time: "12:30 PM",
        ingredients: [
          "8 oz Freshness Guaranteed Fresh Chicken Breast (from upgraded 5 lb pack!) seasoned with Adobo & Sazón, seared in 0-Cal Spray (240 kcal, 52g p)",
          "1/2 Smashed Green Plantain pan-seared in 0-Calorie Spray into crispy Tostones a la Plancha (75 kcal, 19g c)",
          "1 cup cooked Great Value White Rice (from 5 lb bag!) (200 kcal, 4g p, 45g c)",
          "1/2 cup Great Value Black Beans (Habichuelas Negras) stewed with Sazón (110 kcal, 7g p, 20g c)"
        ],
        calories: 625,
        protein: 63,
        carbs: 83,
        fat: 4
      },
      {
        name: "Afternoon Perk: Sweet Iced Café con Leche & Protein Bowl",
        time: "4:00 PM",
        ingredients: [
          "1 Café Bustelo K-Cup over ice with splash of Milk & sweetener for a 2nd sweet Café con Leche (30 kcal, 2g p)",
          "1.5 cups Great Value Plain Nonfat Greek Yogurt (180 kcal, 32g p)",
          "1/2 cup cooked white rice seasoned with cinnamon & sweetener (110 kcal, 1g p, 25g c)"
        ],
        calories: 320,
        protein: 35,
        carbs: 30,
        fat: 1
      },
      {
        name: "Dinner: Chuletas A la Plancha (Seared Pork Chops) & Beans",
        time: "7:30 PM",
        ingredients: [
          "8 oz Bone-In Pork Chop (Chuleta) seasoned with Goya Adobo & Sazón, seared in 0-Calorie Cooking Spray (340 kcal, 46g p, 16g f)",
          "1 cup cooked Great Value White Rice (200 kcal, 4g p, 45g c)",
          "1/2 cup Great Value Black Beans (Habichuelas Negras) (110 kcal, 7g p, 20g c)"
        ],
        calories: 650,
        protein: 57,
        carbs: 65,
        fat: 16
      },
      {
        name: "Nighttime Recovery: Anabolic Casein Snack",
        time: "10:30 PM",
        ingredients: [
          "1 cup Plain Greek Yogurt or Protein Shake with cinnamon & vanilla (180 kcal, 25g p)"
        ],
        calories: 180,
        protein: 25,
        carbs: 8,
        fat: 0
      }
    ]
  }
];
