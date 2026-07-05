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
    upc: "078742371195", // Great Value Chicken Breast
    name: "Great Value Boneless Skinless Chicken Breast",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Protein",
    priceEst: "$9.94 (3 lb bag / ~48 oz)",
    calories: 120,
    protein: 26,
    carbs: 0,
    fat: 1.5,
    servingSize: "4 oz (112g)",
    coachNote: "The primary muscle-building protein staple for your Pollo Guisado (Puerto Rican chicken stew) or grilled seasoned chicken."
  },
  {
    id: "g-2",
    upc: "074471014309", // Cafe Bustelo K-Cups
    name: "Café Bustelo Espresso Style Coffee K-Cup Pods",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Café Bustelo",
    category: "Essentials",
    priceEst: "$8.98 (12 Count Box)",
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    servingSize: "1 K-Cup Pod (8 fl oz)",
    coachNote: "Authentic Puerto Rican dark roast espresso in Keurig K-Cups. Zero calories black. Perfect morning and pre-workout energy booster!"
  },
  {
    id: "g-3",
    upc: "041331031301", // Goya Sazon
    name: "Goya Sazón with Coriander & Annatto (Culantro y Achiote)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Goya",
    category: "Essentials",
    priceEst: "$3.18 (20 Packet Box)",
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    servingSize: "1/4 Packet (1g)",
    coachNote: "The essential Puerto Rican seasoning secret. Adds golden color and incredible savory flavor to rice, beans, and chicken with zero calories!"
  },
  {
    id: "g-4",
    upc: "041331039802", // Goya Sofrito
    name: "Goya Sofrito Cooking Base (Tomato, Garlic & Cilantro)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Goya",
    category: "Essentials",
    priceEst: "$2.98 (12 oz jar)",
    calories: 15,
    protein: 0,
    carbs: 3,
    fat: 0,
    servingSize: "1 Tbsp (15g)",
    coachNote: "Authentic aromatic blend of peppers, onions, garlic, and cilantro. Only 15 calories per spoonful transforms chicken and beans into a Boricua feast!"
  },
  {
    id: "g-5",
    upc: "078742351234", // 0 Calorie Cooking Spray
    name: "Great Value Canola Oil 0 Calorie Cooking Spray",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Essentials",
    priceEst: "$2.12 (8 oz aerosol can)",
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    servingSize: "0.25 sec spray (0.25g)",
    coachNote: "Zero-calorie non-stick cooking spray for searing Chuletas (pork chops), eggs, and plantains without adding hidden liquid oil calories!"
  },
  {
    id: "g-6",
    upc: "078742211234", // Bone-In Pork Chops (Chuletas)
    name: "All Natural Bone-In Assorted Pork Chops (Chuletas)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value / All Natural",
    category: "Protein",
    priceEst: "$7.48 (~2.5 lb tray)",
    calories: 170,
    protein: 23,
    carbs: 0,
    fat: 8,
    servingSize: "4 oz (112g raw)",
    coachNote: "Traditional Puerto Rican Chuletas! Marinate with Sofrito and Sazón, then pan-sear using 0-calorie cooking spray for a mouthwatering high-protein dinner."
  },
  {
    id: "g-7",
    upc: "041331102544", // Goya Pink Beans
    name: "Goya Pink Beans (Habichuelas Rosadas)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Goya",
    category: "Carbs",
    priceEst: "$2.36 (Two 15.5 oz cans)",
    calories: 110,
    protein: 7,
    carbs: 20,
    fat: 0.5,
    servingSize: "1/2 cup (130g)",
    coachNote: "Simmered with Sazón and Sofrito for classic Puerto Rican Habichuelas Guisadas. Rich in fiber and slow-digesting plant protein."
  },
  {
    id: "g-8",
    upc: "000000004068", // Fresh Plantains
    name: "Fresh Green or Yellow Plantains (Plátanos)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Fresh Produce",
    category: "Produce",
    priceEst: "$2.72 (4 whole plantains)",
    calories: 180,
    protein: 2,
    carbs: 47,
    fat: 0.5,
    servingSize: "1 medium plantain (150g)",
    coachNote: "Slice and air-fry or pan-sear with 0-calorie cooking spray to make healthy low-fat Tostones (savory green plantains) or Maduros (sweet yellow plantains)!"
  },
  {
    id: "g-9",
    upc: "078742352217", // Great Value Jasmine Rice
    name: "Great Value Long Grain Jasmine or White Rice",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Carbs",
    priceEst: "$2.48 (3 lb bag)",
    calories: 160,
    protein: 3,
    carbs: 36,
    fat: 0,
    servingSize: "1/4 cup dry (45g)",
    coachNote: "The base for Arroz con Habichuelas. Fast-digesting clean carbohydrates to fuel your heavy lifting sessions at Planet Fitness Lewiston."
  },
  {
    id: "g-10",
    upc: "078742221612", // Great Value Eggs
    name: "Great Value Large Grade A White Eggs",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Protein",
    priceEst: "$2.48 (18 count carton)",
    calories: 70,
    protein: 6,
    carbs: 0,
    fat: 5,
    servingSize: "1 Egg (50g)",
    coachNote: "Bioavailable whole protein with essential healthy fats. Scramble with Sofrito and 0-calorie spray for a Boricua spiced breakfast!"
  }
];

export const MEAL_PREP_PLANS: MealPrepPlan[] = [
  {
    id: "plan-1",
    title: "The Boricua Cutting Blueprint (~2,065 kcal)",
    targetDailyCalories: 2065,
    targetDailyProtein: 194,
    estCostPerWeek: "$44.72 total at Auburn Walmart",
    description: "Authentic Puerto Rican style cutting plan for your 242 lb -> 170 lb goal. Packed with Pollo Guisado, Chuletas, Tostones/Maduros, and Café Bustelo K-Cups—100% under your $50 budget limit using 0-cal cooking spray!",
    meals: [
      {
        name: "Breakfast: Boricua Power Scramble & Café Bustelo K-Cup",
        time: "8:00 AM",
        ingredients: [
          "1 Café Bustelo Espresso Style K-Cup brewed in Keurig (0 kcal, 0g p)",
          "Optional: splash of almond milk or milk in coffee (15 kcal)",
          "3 Great Value Large Eggs scrambled in 0-Calorie Cooking Spray with 1 tsp Goya Sofrito (220 kcal, 18g p)",
          "1/2 cup Jasmine or White Rice seasoned with pinch of Sazón (150 kcal, 3g p, 34g c)"
        ],
        calories: 385,
        protein: 21,
        carbs: 35,
        fat: 15
      },
      {
        name: "Lunch: Pollo Guisado (Puerto Rican Stewed Chicken) & Rice",
        time: "12:30 PM",
        ingredients: [
          "8 oz Great Value Chicken Breast simmered with Goya Sofrito, Sazón, and garlic (240 kcal, 52g p)",
          "1.5 cups cooked Great Value Rice (300 kcal, 6g p, 68g c)",
          "1/2 cup Goya Pink Beans (Habichuelas Rosadas) stewed with Sazón (110 kcal, 7g p, 20g c)"
        ],
        calories: 650,
        protein: 65,
        carbs: 88,
        fat: 4
      },
      {
        name: "Afternoon Perk: 2nd Café Bustelo K-Cup & Maduros Bowl",
        time: "4:00 PM",
        ingredients: [
          "1 Café Bustelo Espresso Style K-Cup brewed iced or hot (0 kcal)",
          "1.5 cups Great Value Plain Nonfat Greek Yogurt (180 kcal, 32g p)",
          "1/2 sweet yellow plantain (Maduro) sliced & pan-seared with 0-Calorie Cooking Spray and cinnamon (110 kcal, 1g p, 28g c)"
        ],
        calories: 290,
        protein: 33,
        carbs: 38,
        fat: 1
      },
      {
        name: "Dinner: Chuletas A la Plancha (Seared Pork Chops) & Tostones",
        time: "7:30 PM",
        ingredients: [
          "8 oz Lean Bone-In Pork Chop (Chuleta) marinated in Sazón & Sofrito, seared in 0-Calorie Cooking Spray (340 kcal, 46g p, 16g f)",
          "1 whole Green Plantain sliced into rounds, smashed into Tostones and air-fried with 0-Calorie Cooking Spray & sea salt (180 kcal, 2g p, 42g c)",
          "2 cups steamed side veggies or spinach salad (40 kcal, 2g p)"
        ],
        calories: 560,
        protein: 50,
        carbs: 48,
        fat: 18
      },
      {
        name: "Nighttime Recovery: Casein & Cinnamon Snack",
        time: "10:30 PM",
        ingredients: [
          "1 cup Lucerne 2% Cottage Cheese or Protein Shake with a dash of cinnamon & vanilla (180 kcal, 25g p)"
        ],
        calories: 180,
        protein: 25,
        carbs: 8,
        fat: 5
      }
    ]
  }
];
