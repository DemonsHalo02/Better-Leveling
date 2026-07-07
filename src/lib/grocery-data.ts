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
  },
  {
    id: "g-14",
    upc: "078742231268", // Great Value Purified Water
    name: "Great Value Purified Drinking Water (40 Pack, 16.9 fl oz bottles)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Essentials",
    priceEst: "$5.48 (40 pack)",
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    servingSize: "1 bottle (500ml)",
    coachNote: "Crucial hydration staple for Planet Fitness Lewiston lifting sessions and completing your daily water intake quest!"
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
  { name: "Great Value 13 Gallon Tall Kitchen Trash Bags (40 Pack)", category: "Toiletries / Non-Grocery", price: "$6.48", note: "Essential 40-pack 13 gallon kitchen trash bags for easy meal prep cleanup and household sanitation." },
  { name: "Hefty Ultra Strong 13 Gallon Kitchen Trash Bags (40 Pack)", category: "Toiletries / Non-Grocery", price: "$8.98", note: "Heavy-duty drawstring 13 gallon trash bags (40 count) for kitchen disposal." },
  { name: "Dawn Ultra Dishwashing Liquid Dish Soap (18 fl oz)", category: "Toiletries / Non-Grocery", price: "$3.28", note: "Degreasing formula for cleaning meal prep containers." },
  { name: "Equate Ibuprofen Pain Reliever Tablets (200 mg, 100 ct)", category: "Toiletries / Non-Grocery", price: "$2.48", note: "Post-workout muscle recovery aid." },
  { name: "Equate Complete Multivitamin Tablets for Men (100 ct)", category: "Toiletries / Non-Grocery", price: "$8.98", note: "Daily micronutrient insurance." },
  { name: "Degree Men Dry Protection Antiperspirant Deodorant (2.7 oz)", category: "Toiletries / Non-Grocery", price: "$3.48", note: "All-day sweat and odor protection for lifting sessions." },
  // Groceries & Staples
  { name: "Great Value Purified Drinking Water (40 Pack, 16.9 fl oz bottles)", category: "Essentials", price: "$5.48", note: "Crucial hydration staple for gym sessions and daily water quest." },
  { name: "Great Value Purified Drinking Water (24 Pack, 16.9 fl oz bottles)", category: "Essentials", price: "$3.98", note: "Convenient 24-pack for weekly hydration." },
  { name: "Great Value Purified Water (1 Gallon Jug)", category: "Essentials", price: "$1.28", note: "Convenient daily gallon jug to effortlessly hit your daily water quest." },
  { name: "Jade Leaf Pure Green Tea Matcha Powder (1 oz pouch)", category: "Essentials", price: "$6.98", note: "Essential Chinese & Japanese antioxidant green tea staple for making clean Dirty Matcha Lattes!" },
  { name: "Great Value 100% Green Tea / Oolong Tea Bags (40 ct)", category: "Essentials", price: "$2.48", note: "Traditional Chinese metabolism tea staple. Enjoy hot or iced with zero calories." },
  { name: "Silk Unsweetened Almond Milk (Half Gallon / 64 fl oz)", category: "Essentials", price: "$3.28", note: "Low-calorie (30 kcal/cup) creamy base for mixing Dirty Matcha Lattes and protein shakes." },
  { name: "Bibigo Gochujang Korean Hot Pepper Paste / Kimchi (16 oz)", category: "Essentials", price: "$4.98", note: "Essential Korean probiotic and metabolism-boosting spice staple." },
  { name: "Great Value Soy Sauce & Teriyaki Marinade (15 fl oz)", category: "Essentials", price: "$1.98", note: "Essential savory seasoning for Chinese, Korean, and Japanese protein bowls." },
  { name: "Great Value White Corn Tortillas (30 ct)", category: "Carbs", price: "$1.98", note: "Authentic Mexican street taco and fajita staple with slow-digesting corn carbs." },
  { name: "Great Value Black Beans / Pinto Beans (15 oz can)", category: "Carbs", price: "$0.88", note: "Essential fiber and slow carbs for Puerto Rican and Mexican meal prep." },
  { name: "Great Value Large Grade A Eggs (12 Count)", category: "Protein", price: "$2.98", note: "High-biological value breakfast protein." },
  { name: "Great Value Old Fashioned Rolled Oats (42 oz canister)", category: "Carbs", price: "$3.98", note: "Slow-digesting complex carbs for morning energy." },
  { name: "Fresh Bananas (~1 lb bunch / ~3-4 bananas)", category: "Produce", price: "$0.58", note: "Quick potassium and pre-workout carbohydrates." },
  { name: "Great Value Frozen Broccoli Florets (12 oz bag)", category: "Produce", price: "$1.18", note: "Easy steamed micronutrients and fiber." },
  { name: "Great Value Whole Milk (1 Gallon)", category: "Protein", price: "$3.88", note: "Classic calcium and protein for coffee or shakes." }
];

export const MEAL_PREP_PLANS: MealPrepPlan[] = [
  {
    id: "plan-china",
    title: "China: Green Tea & Dirty Matcha Shred Blueprint (~2,150 kcal)",
    country: "China",
    flag: "🇨🇳",
    badge: "⭐ Most Important & Featured",
    targetDailyCalories: 2150,
    targetDailyProtein: 206,
    estCostPerWeek: "$44.50 total at Auburn Walmart (Under $50 Budget!)",
    description: "High-efficiency Chinese cuisine cutting plan featuring traditional metabolism-boosting Oolong/Green Tea, plus the iconic Dirty Matcha Latte (espresso shot + pure green tea matcha + unsweetened almond milk) for clean afternoon focus without sugar crashes! SCHEDULE: Shop Auburn Walmart under $50 and prep MONDAY; eat TUESDAY!",
    meals: [
      {
        name: "Breakfast: Dirty Matcha Latte & Green Scallion Egg Scramble",
        time: "8:00 AM",
        ingredients: [
          "1 Dirty Matcha Latte: Brewed espresso shot mixed with 1 tsp Jade Leaf Matcha Powder, 1 cup Unsweetened Almond Milk & 1 0-cal sweetener packet! (45 kcal, 2g p)",
          "3 Large Eggs & 1/2 cup egg whites scrambled with fresh scallions & drops of soy sauce in 0-Cal Spray (260 kcal, 26g p)",
          "1 cup cooked Jasmine / White Rice seasoned with sesame seasoning (200 kcal, 4g p, 45g c)"
        ],
        calories: 505,
        protein: 32,
        carbs: 48,
        fat: 16
      },
      {
        name: "Lunch: Szechuan Honey-Soy Glazed Chicken Breast & Broccoli",
        time: "12:30 PM",
        ingredients: [
          "8 oz Fresh Chicken Breast seared in wok/skillet with garlic, soy sauce, ginger & chili flakes (260 kcal, 54g p)",
          "1.5 cups steamed Great Value Frozen Broccoli florets (45 kcal, 3g p)",
          "1 cup cooked Jasmine White Rice (from 5 lb bag!) (200 kcal, 4g p, 45g c)",
          "1 cup hot Oolong or Green Tea (0 kcal, metabolism boost)"
        ],
        calories: 505,
        protein: 61,
        carbs: 52,
        fat: 4
      },
      {
        name: "Afternoon Tea & Energy: 2nd Dirty Matcha Latte & Protein Bowl",
        time: "4:00 PM",
        ingredients: [
          "2nd Dirty Matcha Latte over ice: Pure green tea matcha + espresso + unsweetened almond milk (45 kcal, 2g p)",
          "1.5 cups Plain Nonfat Greek Yogurt sweetened with vanilla & sweetener (180 kcal, 32g p)",
          "1/2 cup oats or rice crispy cereal mixed in for clean pre-workout carbs (150 kcal, 4g p, 30g c)"
        ],
        calories: 375,
        protein: 38,
        carbs: 35,
        fat: 3
      },
      {
        name: "Dinner: Beef & Broccoli Stir-Fry over Steamed Rice",
        time: "7:30 PM",
        ingredients: [
          "7 oz Lean Flank Steak or Ground Lean Beef seared with soy sauce, garlic & ginger (320 kcal, 48g p, 12g f)",
          "1 cup steamed broccoli florets (30 kcal, 2g p)",
          "1 cup cooked Jasmine White Rice (200 kcal, 4g p, 45g c)",
          "Hot Jasmine Green Tea cup (0 kcal)"
        ],
        calories: 550,
        protein: 54,
        carbs: 50,
        fat: 13
      },
      {
        name: "Nighttime Recovery: Green Tea Infused Casein Snack",
        time: "10:30 PM",
        ingredients: [
          "1 cup Plain Greek Yogurt or Whey/Casein Shake blended with pinch of matcha powder & sweetener (215 kcal, 21g p)"
        ],
        calories: 215,
        protein: 21,
        carbs: 10,
        fat: 2
      }
    ]
  },
  {
    id: "plan-1",
    title: "Puerto Rico: The Boricua Cutting Blueprint (~2,150 kcal)",
    country: "Puerto Rico",
    flag: "🇵🇷",
    badge: "Boricua Authentic",
    targetDailyCalories: 2150,
    targetDailyProtein: 206,
    estCostPerWeek: "$46.80 total at Auburn Walmart (Under $50 Budget!)",
    description: "Authentic Puerto Rican style cutting plan with upgraded 5 lb fresh chicken, 5 lb rice, and crispy green Tostones a la Plancha! Optimized with bulk staples so your entire cart stays well under $50! Shop MONDAY; eat TUESDAY!",
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
          "1 cup Plain Greek Yogurt or Protein Shake with cinnamon & vanilla (135 kcal, 27g p)"
        ],
        calories: 135,
        protein: 27,
        carbs: 6,
        fat: 0
      }
    ]
  },
  {
    id: "plan-korea",
    title: "Korea: K-Fit Bulgogi & Kimchi Shred Blueprint (~2,150 kcal)",
    country: "Korea",
    flag: "🇰🇷",
    badge: "K-Fit High Protein",
    targetDailyCalories: 2150,
    targetDailyProtein: 206,
    estCostPerWeek: "$48.20 total at Auburn Walmart (Under $50 Budget!)",
    description: "Korean K-Fit style recomposition plan utilizing probiotic-rich kimchi, spicy gochujang, and tender bulgogi marinades. Designed for extreme muscle definition and gut health while keeping your Walmart cart strictly under $50!",
    meals: [
      {
        name: "Breakfast: Seoul Black Coffee & Soy-Glazed Egg Scramble",
        time: "8:00 AM",
        ingredients: [
          "1 Hot Americano / Black Coffee (0 kcal)",
          "3 Large Eggs & 3 oz tofu scrambled with scallions & sesame-soy drops (280 kcal, 24g p)",
          "1 cup cooked White Rice with spicy kimchi on the side (220 kcal, 4g p, 48g c)"
        ],
        calories: 500,
        protein: 28,
        carbs: 48,
        fat: 16
      },
      {
        name: "Lunch: Lean Chicken / Beef Bulgogi Bowl with Kimchi",
        time: "12:30 PM",
        ingredients: [
          "8 oz Fresh Chicken Breast seared in Korean soy-garlic-gochujang marinade (260 kcal, 54g p)",
          "1/2 cup Bibigo Spicy Kimchi for gut health & probiotics (25 kcal, 2g p)",
          "1 cup cooked White Rice (200 kcal, 4g p, 45g c)",
          "1 cup steamed broccoli / spinach (30 kcal, 2g p)"
        ],
        calories: 515,
        protein: 62,
        carbs: 52,
        fat: 4
      },
      {
        name: "Afternoon Snack: Iced Green Tea & Gochujang Protein Bowl",
        time: "4:00 PM",
        ingredients: [
          "1 Iced Green Tea with lemon (0 kcal)",
          "1.5 cups Plain Greek Yogurt with honey & cinnamon (190 kcal, 32g p)",
          "1/2 cup rolled oats or rice cereal (150 kcal, 4g p, 30g c)"
        ],
        calories: 340,
        protein: 36,
        carbs: 35,
        fat: 3
      },
      {
        name: "Dinner: Korean BBQ Spiced Chicken Thighs & Breasts",
        time: "7:30 PM",
        ingredients: [
          "8 oz Chicken Breast/Thigh blend grilled with Korean BBQ seasonings (280 kcal, 52g p, 6g f)",
          "1 cup cooked White Rice (200 kcal, 4g p, 45g c)",
          "1/2 cup spicy kimchi & steamed veggies (50 kcal, 2g p)"
        ],
        calories: 530,
        protein: 58,
        carbs: 52,
        fat: 8
      },
      {
        name: "Nighttime Recovery: Seoul Anabolic Cinnamon Snack",
        time: "10:30 PM",
        ingredients: [
          "1.5 cups Greek Yogurt or Protein Pudding with cinnamon (265 kcal, 22g p)"
        ],
        calories: 265,
        protein: 22,
        carbs: 12,
        fat: 2
      }
    ]
  },
  {
    id: "plan-japan",
    title: "Japan: Samurai Teriyaki & Matcha Clean Shred (~2,150 kcal)",
    country: "Japan",
    flag: "🇯🇵",
    badge: "Clean Samurai Shred",
    targetDailyCalories: 2150,
    targetDailyProtein: 206,
    estCostPerWeek: "$47.90 total at Auburn Walmart (Under $50 Budget!)",
    description: "Ultra-clean Japanese cuisine blueprint emphasizing ginger-teriyaki seared proteins, edamame fiber, and antioxidant green tea. Engineered for rapid body fat loss and peak physical recovery under $50 total!",
    meals: [
      {
        name: "Breakfast: Hot Japanese Green Tea & Soy-Marinated Eggs",
        time: "8:00 AM",
        ingredients: [
          "1 Hot Japanese Green / Sencha Tea cup (0 kcal)",
          "3 Large Eggs soft-boiled and marinated in light soy sauce & ginger (220 kcal, 18g p)",
          "1 cup cooked Jasmine Rice with furikake/sesame seasoning (210 kcal, 4g p, 46g c)"
        ],
        calories: 430,
        protein: 22,
        carbs: 46,
        fat: 15
      },
      {
        name: "Lunch: Teriyaki Glazed Chicken Breast & Edamame Bowl",
        time: "12:30 PM",
        ingredients: [
          "8 oz Chicken Breast seared with clean low-sodium Teriyaki glaze (260 kcal, 54g p)",
          "1/2 cup steamed edamame soybeans (100 kcal, 9g p, 8g c)",
          "1 cup cooked Jasmine Rice (200 kcal, 4g p, 45g c)",
          "1 cup steamed broccoli florets (30 kcal, 2g p)"
        ],
        calories: 590,
        protein: 69,
        carbs: 58,
        fat: 5
      },
      {
        name: "Afternoon Snack: Iced Matcha Latte & Protein Bowl",
        time: "4:00 PM",
        ingredients: [
          "1 Iced Matcha Green Tea Latte made with almond milk & zero-cal sweetener (35 kcal, 1g p)",
          "1.5 cups Plain Greek Yogurt with vanilla extract (180 kcal, 32g p)",
          "1/2 cup rice crispy cereal (130 kcal, 2g p, 28g c)"
        ],
        calories: 345,
        protein: 35,
        carbs: 32,
        fat: 2
      },
      {
        name: "Dinner: Miso-Ginger Seared Chicken & Steamed Veggies",
        time: "7:30 PM",
        ingredients: [
          "8 oz Fresh Chicken Breast seared with ginger & soy-miso broth (250 kcal, 54g p)",
          "1 cup cooked Jasmine Rice (200 kcal, 4g p, 45g c)",
          "1.5 cups steamed broccoli & greens (45 kcal, 3g p)"
        ],
        calories: 495,
        protein: 61,
        carbs: 50,
        fat: 4
      },
      {
        name: "Nighttime Recovery: Matcha Greek Yogurt Bowl",
        time: "10:30 PM",
        ingredients: [
          "1.5 cups Greek Yogurt blended with Jade Leaf matcha powder & sweetener (290 kcal, 19g p)"
        ],
        calories: 290,
        protein: 19,
        carbs: 14,
        fat: 2
      }
    ]
  },
  {
    id: "plan-mexico",
    title: "Mexico: Street-Style Pollo Asado & Fajita Plan (~2,150 kcal)",
    country: "Mexico",
    flag: "🇲🇽",
    badge: "Street Style Shred",
    targetDailyCalories: 2150,
    targetDailyProtein: 206,
    estCostPerWeek: "$45.60 total at Auburn Walmart (Under $50 Budget!)",
    description: "Vibrant Mexican street-style cutting plan featuring citrus-lime Pollo Asado, black beans, corn tortillas, and spiced Café de Olla! Maximum flavor and protein satisfaction while keeping your budget comfortably under $50!",
    meals: [
      {
        name: "Breakfast: Spiced Café de Olla & Huevos Rancheros Scramble",
        time: "8:00 AM",
        ingredients: [
          "1 Café de Olla: Coffee brewed with cinnamon and zero-cal sweetener (5 kcal, 0g p)",
          "3 Large Eggs scrambled with salsa & lime juice (220 kcal, 18g p)",
          "2 Warm White Corn Tortillas toasted on griddle (100 kcal, 3g p, 20g c)"
        ],
        calories: 325,
        protein: 21,
        carbs: 22,
        fat: 15
      },
      {
        name: "Lunch: Citrus Pollo Asado Street Tacos / Rice Bowl",
        time: "12:30 PM",
        ingredients: [
          "8 oz Fresh Chicken Breast marinated in lime juice, garlic, cumin & chili powder (250 kcal, 54g p)",
          "3 White Corn Tortillas or 1 cup cooked White Rice (150 kcal, 4g p, 30g c)",
          "1/2 cup Great Value Black Beans with lime & cilantro (110 kcal, 7g p, 20g c)",
          "1/4 sliced avocado or pico de gallo (60 kcal, 1g p, 5g f)"
        ],
        calories: 570,
        protein: 66,
        carbs: 54,
        fat: 9
      },
      {
        name: "Afternoon Snack: Spiced Horchata-Style Protein Bowl",
        time: "4:00 PM",
        ingredients: [
          "1 Iced Coffee with splash of almond milk & cinnamon (20 kcal, 1g p)",
          "1.5 cups Plain Greek Yogurt sweetened with cinnamon & vanilla (180 kcal, 32g p)",
          "1/2 cup rolled oats (150 kcal, 4g p, 27g c)"
        ],
        calories: 350,
        protein: 37,
        carbs: 30,
        fat: 3
      },
      {
        name: "Dinner: Sizzling Chicken Fajita Bowl with Beans & Rice",
        time: "7:30 PM",
        ingredients: [
          "8 oz Chicken Breast strips seared with fajita seasoning, bell peppers & onions (260 kcal, 54g p)",
          "1 cup cooked White Rice (200 kcal, 4g p, 45g c)",
          "1/2 cup Great Value Black Beans (110 kcal, 7g p, 20g c)"
        ],
        calories: 570,
        protein: 65,
        carbs: 68,
        fat: 5
      },
      {
        name: "Nighttime Recovery: Cinnamon Mexican Hot Chocolate Casein",
        time: "10:30 PM",
        ingredients: [
          "1 cup Greek Yogurt or Protein Shake with cocoa powder & cinnamon (335 kcal, 17g p)"
        ],
        calories: 335,
        protein: 17,
        carbs: 16,
        fat: 2
      }
    ]
  }
];

