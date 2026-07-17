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
    upc: "078742371195", // Fresh Chicken Breast Family Pack (~4.7 lb)
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
    cuisine: ["China", "Korea", "Japan", "Puerto Rico", "Mexico"]
  },
  {
    id: "g-2",
    upc: "074471014309", // Cafe Bustelo Espresso Roast
    name: "Café Bustelo Espresso Instant Coffee / K-Cups (4 oz jar / box)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Café Bustelo",
    category: "Essentials",
    priceEst: "$3.48 (4 oz jar / box)",
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    servingSize: "1 tbsp ground (8 fl oz brewed)",
    coachNote: "Authentic Puerto Rican dark roast espresso! Brew and combine with milk and sweetener for a sweet, traditional Café con Leche.",
    cuisine: ["Puerto Rico"]
  },
  {
    id: "g-3",
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
    coachNote: "100% dairy-free & lactose-free! High protein (8g/cup) creamy base for making Café con Leche, Dirty Matcha Lattes, and Dirty Chai Lattes without stomach discomfort!",
    cuisine: ["China", "Korea", "Japan", "Puerto Rico", "Mexico"]
  },
  {
    id: "g-4",
    upc: "078742351999", // Zero Calorie Sweetener / Sugar Packets
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
    coachNote: "The secret to getting traditional sweet lattes and teas without adding unwanted sugar calories! Restock item for Korean Dirty Chai Lattes.",
    cuisine: ["China", "Korea", "Japan", "Puerto Rico", "Mexico"]
  },
  {
    id: "g-5",
    upc: "041331031301", // Goya Sazon
    name: "Goya Sazón with Coriander & Annatto (Culantro y Achiote, 8 ct)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Goya",
    category: "Essentials",
    priceEst: "$1.88 (8 Packet Box, 1.41 oz)",
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    servingSize: "1/4 Packet (1g)",
    coachNote: "The essential Puerto Rican seasoning secret! Adds golden color and savory garlic/annatto flavor to rice, beans, and chicken with zero calories.",
    cuisine: ["Puerto Rico"]
  },
  {
    id: "g-6",
    upc: "041331039802", // Goya Adobo
    name: "Goya Adobo All-Purpose Seasoning with Pepper (8 oz jar)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Goya",
    category: "Essentials",
    priceEst: "$2.18 (8 oz jar)",
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    servingSize: "1/4 tsp (1g)",
    coachNote: "The #1 Boricua all-purpose seasoning! Garlic, oregano, and black pepper blend that flavors Chuletas and Pollo Guisado with zero calories.",
    cuisine: ["Puerto Rico"]
  },
  {
    id: "g-7",
    upc: "078742351234", // 0 Calorie Cooking Spray
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
    coachNote: "Zero-calorie non-stick cooking spray for searing Chuletas (pork chops), chicken, and eggs without adding hidden liquid oil calories! Restock item for Korean meal prep.",
    cuisine: ["China", "Korea", "Japan", "Puerto Rico", "Mexico"]
  },
  {
    id: "g-8",
    upc: "078742211234", // Bone-In Pork Chops (Chuletas)
    name: "All Natural Bone-In Assorted Pork Chops (Chuletas, ~1.3 lb tray)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "All Natural / Walmart",
    category: "Protein",
    priceEst: "$4.44 (~1.3 lb tray at $3.48/lb)",
    calories: 170,
    protein: 23,
    carbs: 0,
    fat: 8,
    servingSize: "4 oz (112g raw)",
    coachNote: "Traditional Puerto Rican Chuletas! Season with Adobo and Sazón, then pan-sear using 0-calorie cooking spray for a mouthwatering high-protein dinner.",
    cuisine: ["Puerto Rico"]
  },
  {
    id: "g-9",
    upc: "078742351883", // Great Value Black Beans
    name: "Great Value Black Beans / Habichuelas Negras (Two 15.25 oz cans)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Carbs",
    priceEst: "$1.68 (Two 15.25 oz cans at $0.84 ea)",
    calories: 110,
    protein: 7,
    carbs: 20,
    fat: 0.5,
    servingSize: "1/2 cup (130g)",
    coachNote: "Classic Habichuelas Negras! Simmered with Sazón and Adobo. Universally stocked at Auburn Walmart and loaded with fiber and plant protein.",
    cuisine: ["Puerto Rico", "Mexico"]
  },
  {
    id: "g-10",
    upc: "078742352217", // Great Value White Rice 2 lb
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
    coachNote: "Convenient 2 lb bag! Clean fast-digesting carbohydrates to fuel your heavy lifting sessions at Planet Fitness Lewiston.",
    cuisine: ["China", "Korea", "Japan", "Puerto Rico", "Mexico"]
  },
  {
    id: "g-11",
    upc: "078742221612", // Great Value Eggs
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
    coachNote: "36 eggs guaranteed! Provides 3 eggs a day for all 7 days (21 eggs) plus 15 bonus eggs for meal prep and snacks! Scramble in 0-cal cooking spray.",
    cuisine: ["China", "Korea", "Japan", "Puerto Rico", "Mexico"]
  },
  {
    id: "g-12",
    upc: "078742136039", // Great Value Greek Yogurt
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
    coachNote: "FOUR tubs (128 oz / 1 full Gallon / 16 cups total) guaranteed! Provides 100% enough Greek Yogurt for 7 full days of Afternoon bowls (1 cup / 8 oz) AND Nighttime Casein Fluff (~3/4 cup / 5.7 oz) plus nearly a full tub buffer without running out!",
    cuisine: ["China", "Korea", "Japan", "Puerto Rico", "Mexico"]
  },
  {
    id: "g-13",
    upc: "000000040659", // Fresh Green Plantains
    name: "Fresh Green Plantains / Plátanos Verdes (4 Pack / ~4 Plantains)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Fresh Produce",
    category: "Carbs",
    priceEst: "$2.32 (4 Plantains at ~$0.58 ea)",
    calories: 150,
    protein: 1,
    carbs: 38,
    fat: 0,
    servingSize: "1 Plantain (170g)",
    coachNote: "Classic Puerto Rican green plantains! Peel, slice into coins, boil slightly, smash, and pan-sear in 0-calorie cooking spray for crispy, authentic Tostones a la Plancha.",
    cuisine: ["Puerto Rico"]
  },
  {
    id: "g-14",
    upc: "078742231268", // Instant Coffee for Dirty Matcha
    name: "Classic Roast Instant Coffee (5 oz / 8 oz Jar)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value / Folgers",
    category: "Essentials",
    priceEst: "$5.48 (5 oz / 8 oz Jar)",
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    servingSize: "1 tsp (2g / 1 espresso shot equivalent)",
    coachNote: "Essential instant coffee roast! Dissolve 1 tsp in hot water to create the espresso shot required for your authentic Japanese Dirty Matcha Lattes, Korean Dirty Chai Lattes, and Chinese Dirty Matcha Lattes!",
    cuisine: ["China", "Korea", "Japan", "Mexico"]
  },
  {
    id: "g-15",
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
    coachNote: "Essential Auburn Walmart green tea staple for daily metabolism-boosting hot tea.",
    cuisine: []
  },
  {
    id: "g-16",
    upc: "078742231299",
    name: "Great Value 100% Green Tea Bags (40 ct)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Essentials",
    priceEst: "$1.98 (40 ct box)",
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    servingSize: "1 Tea Bag",
    coachNote: "Traditional Japanese 100% green tea staple! Enjoy a cup of hot or iced green tea with every non-latte meal across your 7-day plan.",
    cuisine: ["China", "Korea", "Japan"]
  },
  {
    id: "g-17",
    upc: "025293001234",
    name: "Great Value Unsweetened Almond Milk (Half Gallon / 64 fl oz)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Essentials",
    priceEst: "$2.48 (Half Gallon)",
    calories: 30,
    protein: 1,
    carbs: 1,
    fat: 2.5,
    servingSize: "1 cup (8 fl oz)",
    coachNote: "Low-calorie creamy base for mixing Dirty Matcha Lattes (optional alternative to Silk Soy Milk).",
    cuisine: []
  },
  {
    id: "g-18",
    upc: "085000010987",
    name: "Great Value Sriracha Chili Sauce or Chili Garlic Sauce (17 fl oz bottle)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Essentials",
    priceEst: "$2.98 (17 fl oz bottle)",
    calories: 25,
    protein: 1,
    carbs: 5,
    fat: 0,
    servingSize: "1 tbsp (15g)",
    coachNote: "Essential spicy metabolism-boosting chili sauce staple stocked at Auburn Walmart for Chinese stir-fries, Korean Bulgogi bowls and egg scrambles (Restock item).",
    cuisine: ["Korea"]
  },
  {
    id: "g-19",
    upc: "078742359999",
    name: "Great Value Soy Sauce (15 fl oz bottle)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Essentials",
    priceEst: "$1.48 (15 fl oz bottle)",
    calories: 15,
    protein: 1,
    carbs: 3,
    fat: 0,
    servingSize: "1 tbsp (15ml)",
    coachNote: "Essential savory seasoning staple for Chinese stir-fries, Korean Bulgogi, and Japanese rice bowls (Restock item).",
    cuisine: ["China", "Korea", "Japan"]
  },
  {
    id: "g-20",
    upc: "078742358888",
    name: "Great Value White Corn Tortillas (30 ct)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Carbs",
    priceEst: "$1.98 (30 count pack)",
    calories: 100,
    protein: 2,
    carbs: 21,
    fat: 1,
    servingSize: "2 Tortillas (50g)",
    coachNote: "Authentic Mexican street taco and fajita staple with slow-digesting corn carbohydrates.",
    cuisine: ["Mexico"]
  },
  {
    id: "g-21",
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
    coachNote: "Two bags (24 oz / ~8 cups total) guaranteed! Steamed micronutrients and fiber for 7 full days of Lunch & Dinner bowls.",
    cuisine: ["China", "Korea", "Japan"]
  },
  {
    id: "g-22",
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
    coachNote: "Quick potassium and clean pre-workout carbohydrates.",
    cuisine: []
  },
  {
    id: "g-23",
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
    coachNote: "Slow-digesting complex carbs for morning energy or mixing into afternoon Greek yogurt power bowls.",
    cuisine: ["Korea", "Mexico"]
  },
  {
    id: "g-24",
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
    coachNote: "Essential lean beef for authentic Chinese Beef & Broccoli stir-fries and Korean Bulgogi bowls! Loaded with bioavailable iron and creatine.",
    cuisine: ["China"]
  },
  {
    id: "g-25",
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
    coachNote: "Pure protein booster! Mix 1/2 cup into your morning whole egg scrambles to add 13g of clean protein without extra fat calories.",
    cuisine: ["China"]
  },
  {
    id: "g-26",
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
    coachNote: "High protein, zero-carb lean fish staple ALWAYS stocked at Auburn Walmart. Perfect for high-protein Korean and Japanese rice bowls!",
    cuisine: []
  },
  {
    id: "g-27",
    upc: "078742354444",
    name: "Great Value Chunky Salsa (16 oz jar) & Fresh Hass Avocados",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value / Fresh Produce",
    category: "Produce",
    priceEst: "$2.48 (jar / produce)",
    calories: 15,
    protein: 0,
    carbs: 3,
    fat: 0,
    servingSize: "2 tbsp (30g)",
    coachNote: "The zesty Mexican secret! Chunky Salsa for morning Huevos Rancheros and fresh avocado for citrus Pollo Asado street tacos.",
    cuisine: ["Mexico"]
  },
  {
    id: "g-28",
    upc: "025484000148",
    name: "Nasoya Authentic Korean Spicy Kimchi (14 oz cup)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Nasoya",
    category: "Produce",
    priceEst: "$4.48 (14 oz refrigerated cup)",
    calories: 15,
    protein: 1,
    carbs: 2,
    fat: 0,
    servingSize: "2 tbsp (28g)",
    coachNote: "Authentic probiotic-rich Korean kimchi! Fermented napa cabbage loaded with gut-healthy bacteria for digestion and immune support. Essential side dish for Bulgogi bowls.",
    cuisine: ["Korea"]
  },
  {
    id: "g-29",
    upc: "072310000292",
    name: "Tazo / Oregon Chai Spiced Chai Latte Liquid Concentrate (32 fl oz carton)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Tazo / Oregon Chai",
    category: "Essentials",
    priceEst: "$4.28 (32 fl oz carton ~8 lattes)",
    calories: 45,
    protein: 0,
    carbs: 11,
    fat: 0,
    servingSize: "1/2 cup (4 fl oz)",
    coachNote: "Premium spiced chai liquid tea concentrate for Korean Dirty Chai Lattes! Combine 1/2 cup concentrate with dissolved instant coffee and Silk soy milk for an authentic cafe-quality Dirty Chai Latte without lactose!",
    cuisine: ["Korea"]
  },
  {
    id: "g-30",
    upc: "078742100108",
    name: "Great Value Garlic Powder (3.4 oz bottle)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Essentials",
    priceEst: "$1.18 (3.4 oz bottle)",
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    servingSize: "1/4 tsp (0.7g)",
    coachNote: "Essential all-purpose seasoning! Used across every single meal plan for searing chicken, beef, eggs, and stir-fries with zero calories (Restock item).",
    cuisine: ["China", "Korea", "Japan", "Puerto Rico", "Mexico"]
  },
  {
    id: "g-31",
    upc: "078742100207",
    name: "Great Value Ground Ginger (1.5 oz bottle)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Essentials",
    priceEst: "$2.32 (1.5 oz bottle)",
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    servingSize: "1/4 tsp (0.5g)",
    coachNote: "Essential Asian cooking spice! Adds warming heat to Chinese stir-fries, Korean Bulgogi marinades, and Japanese teriyaki glazes (Restock item).",
    cuisine: ["China", "Korea", "Japan"]
  },
  {
    id: "g-32",
    upc: "078742100306",
    name: "Great Value Ground Cinnamon (2.5 oz bottle)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Essentials",
    priceEst: "$1.27 (2.5 oz bottle)",
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    servingSize: "1/4 tsp (0.7g)",
    coachNote: "Sweet warming spice for Dirty Chai Lattes, Café con Leche, Café de Olla, Greek Yogurt bowls, and cinnamon oatmeal with zero calories!",
    cuisine: ["Puerto Rico", "Mexico"]
  },
  {
    id: "g-33",
    upc: "078742100405",
    name: "Great Value Ground Cumin (2.5 oz bottle)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Essentials",
    priceEst: "$1.37 (2.5 oz bottle)",
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    servingSize: "1/4 tsp (0.5g)",
    coachNote: "Essential earthy Mexican spice for authentic Pollo Asado, fajita chicken, and Huevos Rancheros seasoning.",
    cuisine: ["Mexico"]
  },
  {
    id: "g-34",
    upc: "078742100504",
    name: "Great Value Chili Powder (3 oz bottle)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Essentials",
    priceEst: "$1.08 (3 oz bottle)",
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    servingSize: "1/4 tsp (0.7g)",
    coachNote: "Smoky heat and color for Mexican fajitas, Pollo Asado, and spicy stir-fries.",
    cuisine: ["Mexico"]
  },
  {
    id: "g-35",
    upc: "078742100603",
    name: "Great Value Onion Powder (3.25 oz bottle)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Essentials",
    priceEst: "$1.08 (3.25 oz bottle)",
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    servingSize: "1/4 tsp (0.7g)",
    coachNote: "Savory all-purpose onion seasoning for Korean Bulgogi marinades, Puerto Rican Adobo chicken, and Mexican fajita spice blends (Restock item).",
    cuisine: ["China", "Korea", "Puerto Rico", "Mexico"]
  },
  {
    id: "g-36",
    upc: "078742351234",
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
    cuisine: []
  },
  {
    id: "g-37",
    upc: "078742351199",
    name: "All Natural Lean Beef Stew Meat (~1.0 lb Tray)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "All Natural / Great Value",
    category: "Protein",
    priceEst: "$6.48 (~1.0 lb tray at $6.48/lb)",
    calories: 160,
    protein: 24,
    carbs: 0,
    fat: 7,
    servingSize: "4 oz (112g raw)",
    coachNote: "Tender lean beef chunks for authentic Korean Bulgogi bowls! High in bioavailable iron, zinc, and muscle-building creatine.",
    cuisine: ["Korea"]
  },
  {
    id: "g-38",
    upc: "071191010300",
    name: "Bibigo Authentic Korean BBQ Marinade & Sauce (16.9 fl oz bottle)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Bibigo",
    category: "Seasonings & Spices",
    priceEst: "$3.48 (16.9 fl oz bottle)",
    calories: 35,
    protein: 1,
    carbs: 8,
    fat: 0,
    servingSize: "1 tbsp (19g)",
    coachNote: "Authentic sweet & savory Korean BBQ marinade and glaze stocked at Auburn Maine Walmart! Perfect for glazing Bulgogi chicken breasts and lean beef stew meat (Periodic Monday Restock item).",
    cuisine: ["Korea"]
  },
  {
    id: "g-39",
    upc: "085000049999",
    name: "Jade Leaf Organic Matcha Latte Mix / Pure Matcha Powder (5.3 oz pouch)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Jade Leaf",
    category: "Essentials",
    priceEst: "$8.98 (5.3 oz pouch)",
    calories: 10,
    protein: 1,
    carbs: 2,
    fat: 0,
    servingSize: "1 tsp (4g)",
    coachNote: "High-antioxidant Jade Leaf Organic Matcha! Whisk 1 tsp with Instant Coffee and Silk Soy Milk for your morning & afternoon Dirty Matcha Lattes (Restock item).",
    cuisine: ["China", "Japan"]
  },
  {
    id: "g-40",
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
    coachNote: "Rich in plant protein and fiber to pair with your Korean Beef Bulgogi and Japanese lunch bowls.",
    cuisine: ["Japan", "Korea"]
  },
  {
    id: "g-41",
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
    coachNote: "High-antioxidant frozen berry medley! Mix into your afternoon Matcha Greek Yogurt Power Bowl and bedtime Casein Fluff.",
    cuisine: []
  },
  {
    id: "g-42",
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
    coachNote: "Fresh aromatic scallions for topping your Dojo Beef Stew Meat Teriyaki Bowl and Samurai Teriyaki Scrambles.",
    cuisine: ["Japan", "Korea"]
  },
  {
    id: "g-43",
    upc: "078742359912",
    name: "Great Value Teriyaki Marinade & Sauce (15.2 fl oz bottle)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Seasonings & Spices",
    priceEst: "$2.48 (15.2 fl oz bottle)",
    calories: 20,
    protein: 1,
    carbs: 4,
    fat: 0,
    servingSize: "1 tbsp (15ml)",
    coachNote: "Authentic savory teriyaki marinade and sauce stocked at Auburn Walmart! Glaze your Samurai chicken breasts and edamame bowls with clean teriyaki flavor (Restock item).",
    cuisine: ["Japan"]
  },
  {
    id: "g-44",
    upc: "078742359934",
    name: "Great Value Table Salt & Black Pepper Shaker Set (4 oz set)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Seasonings & Spices",
    priceEst: "$1.18 (4 oz shaker set)",
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    servingSize: "1/4 tsp (1g)",
    coachNote: "Essential table salt and black pepper seasoning set for seasoning morning omelets and seared chicken breasts (Restock item).",
    cuisine: ["Japan", "Korea", "Puerto Rico", "Mexico"]
  },
  {
    id: "g-45",
    upc: "8801073110502",
    name: "Samyang Buldak Spicy Chicken Ramen Noodles (Single 4.93 oz Pack)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Samyang",
    category: "Carbs",
    priceEst: "$1.68 (1 single pack / 140g)",
    calories: 530,
    protein: 12,
    carbs: 85,
    fat: 16,
    servingSize: "1 pack (140g)",
    coachNote: "Your once-a-week Korean treat meal! Fiery spicy chicken ramen noodles to enjoy as a reward on Friday or Saturday topped with sliced lean chicken breast and fresh green onions.",
    cuisine: ["Korea"]
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
  { name: "Equate Men's 3-in-1 Body Wash, Shampoo & Conditioner (32 fl oz)", category: "Toiletries / Non-Grocery", price: "$4.48", note: "Essential post-workout hygiene for K-Pop Idol home workout sessions." },
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
  { name: "Great Value Ground Ginger (1.5 oz bottle)", category: "Seasonings & Spices", price: "$2.32", note: "Warming Asian spice for Bulgogi and stir-fries." },
  { name: "Great Value Ground Cinnamon (2.5 oz bottle)", category: "Seasonings & Spices", price: "$1.27", note: "Sweet warming spice for Dirty Chai Lattes and oatmeal." },
  { name: "Great Value Ground Cumin (2.5 oz bottle)", category: "Seasonings & Spices", price: "$1.37", note: "Earthy Mexican spice for Pollo Asado and fajitas." },
  { name: "Great Value Chili Powder (3 oz bottle)", category: "Seasonings & Spices", price: "$1.08", note: "Smoky heat for fajitas and stir-fries." },
  { name: "Goya Sazón with Coriander & Annatto (8 ct)", category: "Seasonings & Spices", price: "$1.88", note: "Authentic Puerto Rican seasoning with zero calories." },
  { name: "Goya Adobo All-Purpose Seasoning (8 oz jar)", category: "Seasonings & Spices", price: "$2.18", note: "The #1 Boricua garlic and pepper all-purpose seasoning." },
  { name: "Great Value Soy Sauce (15 fl oz bottle)", category: "Seasonings & Spices", price: "$1.48", note: "Savory seasoning for Chinese stir-fries and Korean Bulgogi." },
  { name: "Great Value Sriracha Chili Sauce (17 fl oz bottle)", category: "Seasonings & Spices", price: "$2.98", note: "Spicy metabolism-boosting chili sauce staple." },
  { name: "Bibigo Authentic Korean BBQ Marinade & Sauce (16.9 fl oz bottle)", category: "Seasonings & Spices", price: "$4.13", note: "Authentic sweet & savory Korean BBQ marinade and glaze." },
  { name: "Nasoya Authentic Korean Spicy Kimchi (14 oz cup)", category: "Seasonings & Spices", price: "$4.98", note: "Probiotic gut health & authentic Korean Bulgogi side." },
  { name: "Great Value Classic Roast Instant Coffee (4 oz jar)", category: "Seasonings & Spices", price: "$2.48", note: "Dissolve 1 tsp for espresso shots in Dirty Matcha and Dirty Chai Lattes!" },
  { name: "Café Bustelo Dark Roast Espresso (4 oz)", category: "Seasonings & Spices", price: "$3.48", note: "Authentic Boricua espresso for Café con Leche." },
  { name: "Jade Leaf Organic Matcha Latte Mix / Pure Matcha Powder (5.3 oz pouch)", category: "Seasonings & Spices", price: "$8.98", note: "Essential pure matcha powder for Dirty Matcha Lattes and Casein Fluff!" },
  { name: "Great Value 100% Green Tea Bags (40 ct)", category: "Seasonings & Spices", price: "$1.98", note: "Traditional Chinese, Japanese, and Korean metabolism tea." },
  { name: "Great Value 0-Calorie Canola Oil Cooking Spray", category: "Seasonings & Spices", price: "$2.24", note: "Fat-free searing and egg scrambling." },
  { name: "Great Value Zero Calorie Sweetener Packets (100 ct)", category: "Seasonings & Spices", price: "$2.18", note: "Sweetens tea, lattes, and yogurt with zero sugar calories." },
  { name: "Great Value Purified Drinking Water (40 Pack, 16.9 fl oz bottles)", category: "Essentials", price: "$4.98", note: "40-pack purified water bottles from Auburn Walmart." },
  // Groceries & Protein Staples
  { name: "Fresh Chicken Breasts (~4.7 lb Family Tray)", category: "Protein", price: "$12.60", note: "Primary lean protein staple (~4.7 to 6 lb tray)." },
  { name: "All Natural Lean Beef Stew Meat (~1.0 lb Tray)", category: "Protein", price: "$6.48", note: "Tender beef chunks for Korean Bulgogi bowls." },
  { name: "Great Value Large Grade A White Eggs (36 Count Tray)", category: "Protein", price: "$6.84", note: "36 eggs guaranteed (3 eggs/day + extras!)." },
  { name: "All Natural Lean Ground Beef 93/7 (~1 lb roll)", category: "Protein", price: "$6.48", note: "Essential for Bulgogi bowls and beef stir-fries." },
  { name: "Great Value Plain Nonfat Greek Yogurt (Two 32 oz tubs / 64 oz total)", category: "Protein", price: "$7.96", note: "Two tubs (64 oz / 8+ cups total) guaranteed for 7 days of afternoon & bedtime protein snacks!" },
  { name: "Silk Original Soy Milk (Half Gallon / 64 fl oz)", category: "Essentials", price: "$3.97", note: "100% dairy-free and lactose-free! High protein (8g/cup) creamy latte base." },
  { name: "Great Value Chunk Light Tuna in Water (4 Pack)", category: "Protein", price: "$3.68", note: "High protein, zero-carb lean fish staple." },
  { name: "Great Value 100% Liquid Egg Whites (32 oz carton)", category: "Protein", price: "$3.48", note: "Pure protein booster for morning scrambles." },
  { name: "All Natural Bone-In Assorted Pork Chops (~1.3 lb tray)", category: "Protein", price: "$4.44", note: "Traditional Puerto Rican Chuletas." },
  { name: "Great Value Old Fashioned Rolled Oats (42 oz canister)", category: "Carbs", price: "$3.98", note: "Slow-digesting complex carbs for morning energy." },
  { name: "Fresh Green Plantains (4 Pack)", category: "Carbs", price: "$2.32", note: "Crispy authentic Tostones a la Plancha." },
  { name: "Great Value White Corn Tortillas (30 ct)", category: "Carbs", price: "$1.98", note: "Authentic Mexican street taco and fajita staple." },
  { name: "Great Value Black Beans (Two 15.25 oz cans)", category: "Carbs", price: "$1.68", note: "Essential fiber and slow carbs." },
  { name: "Fresh Bananas (~1 lb bunch)", category: "Produce", price: "$1.58", note: "Quick potassium and pre-workout carbohydrates." },
  { name: "Great Value Long Grain White Rice (2 lb bag)", category: "Carbs", price: "$1.48", note: "Clean fast-digesting carbohydrates." },
  { name: "Great Value Frozen Broccoli Florets (12 oz bag)", category: "Produce", price: "$1.16", note: "Easy steamed micronutrients and fiber." },
  { name: "Great Value Chunky Salsa & Fresh Avocados", category: "Produce", price: "$2.48", note: "The zesty Mexican secret for morning Huevos Rancheros." }
];

export const MEAL_PREP_PLANS: MealPrepPlan[] = [
  {
    id: "plan-china",
    title: "China: Green Tea & Dirty Matcha Shred Blueprint (~2,150 kcal)",
    country: "China",
    flag: "🇨🇳",
    badge: "⭐ #1 Main & Exclusive Blueprint",
    targetDailyCalories: 2150,
    targetDailyProtein: 170,
    estCostPerWeek: "$46.44 Weekly Consumables / $23.31 Periodic Restock ($69.75 Combined Total)",
    description: "The #1 Main & Exclusive Chinese Green Tea & Dirty Matcha Shred Blueprint! Designed for Hunter Nick's schedule: Monday Grocery Run at Auburn Walmart & Batch Meal Prep, starting eating the meal prep on Tuesdays (Tuesday through Monday 7-Day Cycle). Features traditional metabolism-boosting hot 100% Green Tea paired with every meal, plus the iconic Dirty Matcha Latte (Jade Leaf Organic Matcha Latte Powder + Instant Coffee Espresso Shot + Silk Soy Milk over ice) as your clean afternoon Pre-Workout Focus fuel before hitting Planet Fitness Lewiston! Tuned to 170g+ daily protein with your weekly consumables run at just $46.44 ($23.31 periodic restock, keeping combined cost under $70 total limit)!",
    meals: [
      {
        name: "Breakfast: Scallion Egg Scramble & Hot Green Tea",
        time: "8:00 AM",
        ingredients: [
          "5 Large Grade A White Eggs & 1/2 cup liquid egg whites scrambled in 0-Cal Cooking Spray with fresh scallions, soy sauce & ginger (320 kcal, 36g p)",
          "1 cup cooked Jasmine / White Rice seasoned with garlic & sesame (200 kcal, 4g p, 45g c)",
          "1 cup hot brewed 100% Green Tea (0 kcal, metabolism boost & morning antioxidant start)"
        ],
        calories: 520,
        protein: 40,
        carbs: 45,
        fat: 18
      },
      {
        name: "Lunch: Szechuan Honey-Soy Glazed Chicken Breast & Broccoli",
        time: "12:30 PM",
        ingredients: [
          "8 oz Fresh Chicken Breast seared in wok/skillet with garlic, soy sauce, ginger & chili flakes (260 kcal, 54g p)",
          "1.5 cups steamed Great Value Frozen Broccoli florets (45 kcal, 3g p)",
          "1 cup cooked Jasmine White Rice (from 2 lb bag!) (200 kcal, 4g p, 45g c)",
          "1 cup hot brewed 100% Green Tea (0 kcal, thermogenic fat oxidation booster)"
        ],
        calories: 505,
        protein: 61,
        carbs: 48,
        fat: 4
      },
      {
        name: "Pre-Workout Energy: Dirty Matcha Latte & Casein Bowl",
        time: "4:00 PM (Pre-Workout)",
        ingredients: [
          "1 Pre-Workout Dirty Matcha Latte over ice: Mix 1 tbsp Jade Leaf Organic Matcha Latte Powder + 1 dissolved Instant Coffee/Espresso shot + 1 cup Silk Soy Milk & 1 zero-cal sweetener packet! (85 kcal, 8g p)",
          "1.5 cups Plain Nonfat Greek Yogurt sweetened with vanilla & zero-cal sweetener (180 kcal, 32g p)",
          "1/2 cup cooked Jasmine White Rice with cinnamon & sweetener for clean pre-gym carbohydrates (110 kcal, 1g p, 25g c)",
          "1 cup hot or iced 100% Green Tea alongside (0 kcal)"
        ],
        calories: 375,
        protein: 41,
        carbs: 42,
        fat: 4
      },
      {
        name: "Post-Workout Dinner: Chinese Wok-Seared Garlic Beef & Broccoli",
        time: "7:30 PM (Post-Workout)",
        ingredients: [
          "8 oz All Natural Lean Beef / 93/7 Ground Beef wok-seared with soy sauce, garlic & ginger (340 kcal, 48g p, 16g f)",
          "1.5 cups steamed Great Value Frozen Broccoli florets (45 kcal, 3g p)",
          "1 cup cooked Jasmine White Rice (from 2 lb bag!) (200 kcal, 4g p, 45g c)",
          "1 cup hot brewed 100% Green Tea (0 kcal, post-workout recovery aid)"
        ],
        calories: 585,
        protein: 55,
        carbs: 48,
        fat: 16
      },
      {
        name: "Nighttime Recovery: Green Tea Infused Casein Snack",
        time: "10:30 PM",
        ingredients: [
          "1 cup Plain Nonfat Greek Yogurt blended with pinch of Jade Leaf Matcha Powder & zero-cal sweetener (120 kcal, 22g p)",
          "1 cup warm soothing 100% Green Tea (0 kcal, overnight metabolic support)"
        ],
        calories: 120,
        protein: 22,
        carbs: 8,
        fat: 0
      }
    ]
  }
];
