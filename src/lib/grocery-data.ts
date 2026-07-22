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
  // Primary Lean Protein Base (Shared by ALL countries)
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
    coachNote: "One Great Value ~5.0 lb (80 oz raw) family pack from Auburn Walmart! Guaranteed to provide 11.4 oz raw chicken per day for 7 full days of Lunch (5.7 oz/day) and Dinner (5.7 oz/day) hitting 175g+ daily high-value protein across all 13 national cuisines!",
    cuisine: [
      "Puerto Rico", "Puerto Rico Bulking",
      "Spain", "Spain Bulking",
      "Mexico", "Mexico Bulking",
      "Dominican Republic", "Dominican Republic Bulking",
      "Colombia", "Colombia Bulking",
      "Brazil", "Brazil Bulking",
      "China", "China Bulking",
      "Korea", "Korea Bulking",
      "Japan", "Japan Bulking",
      "Italy", "Italy Bulking",
      "El Salvador", "El Salvador Bulking",
      "Venezuela", "Venezuela Bulking",
      "Argentina", "Argentina Bulking"
    ]
  },
  // Eggs (Shared by ALL countries)
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
    coachNote: "36 eggs guaranteed! Provides 3 to 5 eggs every morning across all 7 days for your post-workout national egg scrambles (Sofrito, Revuelto, Perico, or Gyeran-mari) plus extra meal prep eggs.",
    cuisine: [
      "Puerto Rico", "Puerto Rico Bulking",
      "Spain", "Spain Bulking",
      "Mexico", "Mexico Bulking",
      "Dominican Republic", "Dominican Republic Bulking",
      "Colombia", "Colombia Bulking",
      "Brazil", "Brazil Bulking",
      "China", "China Bulking",
      "Korea", "Korea Bulking",
      "Japan", "Japan Bulking",
      "Italy", "Italy Bulking",
      "El Salvador", "El Salvador Bulking",
      "Venezuela", "Venezuela Bulking",
      "Argentina", "Argentina Bulking"
    ]
  },
  // Greek Yogurt - 4 Tubs for Phase 1 Cutting (Shared by ALL Phase 1 Cutting plans)
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
    coachNote: "FOUR tubs (128 oz / 1 full Gallon / 16 cups total) guaranteed for Phase 1 Cutting across all 13 countries! Provides 100% enough Greek Yogurt for 7 full days of Afternoon casein power bowls AND Nighttime Casein Fluff without running out!",
    cuisine: [
      "Puerto Rico", "Spain", "Mexico", "Dominican Republic", "Colombia",
      "Brazil", "China", "Korea", "Japan", "Italy", "El Salvador", "Venezuela", "Argentina"
    ]
  },
  // Greek Yogurt - 3 Tubs for Phase 2 Bulking (Shared by ALL Phase 2 Bulking plans)
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
    coachNote: "THREE tubs (96 oz / 12 cups total) tailored for Phase 2 Lean Bulking across all 13 countries! Provides afternoon bowls AND bedtime casein fluff while leaving budget and stomach capacity for double rice & oats!",
    cuisine: [
      "Puerto Rico Bulking", "Spain Bulking", "Mexico Bulking", "Dominican Republic Bulking", "Colombia Bulking",
      "Brazil Bulking", "China Bulking", "Korea Bulking", "Japan Bulking", "Italy Bulking", "El Salvador Bulking", "Venezuela Bulking", "Argentina Bulking"
    ]
  },
  // White Rice 2 lb bag for Phase 1 Cutting
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
    coachNote: "Clean fast-digesting carbohydrates for Phase 1 Cutting national rice dishes (Arroz con Gandules, Arroz Amarillo, Arroz Mexicano, Moro, Chao Fan, etc.).",
    cuisine: [
      "Puerto Rico", "Spain", "Mexico", "Dominican Republic", "Colombia",
      "Brazil", "China", "Korea", "Japan", "Italy", "El Salvador", "Venezuela", "Argentina"
    ]
  },
  // White Rice 5 lb bag for Phase 2 Bulking
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
    cuisine: [
      "Puerto Rico Bulking", "Spain Bulking", "Mexico Bulking", "Dominican Republic Bulking", "Colombia Bulking",
      "Brazil Bulking", "China Bulking", "Korea Bulking", "Japan Bulking", "Italy Bulking", "El Salvador Bulking", "Venezuela Bulking", "Argentina Bulking"
    ]
  },
  // Frozen Broccoli (TWO 4 lb bags / 8 lbs total - Shared across all countries)
  {
    id: "g-7",
    upc: "078742357777",
    name: "Great Value Frozen Broccoli Florets (TWO 4 lb bags / 8 lbs / 128 oz total)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Produce",
    priceEst: "$4.64 (TWO 4 lb bags at $2.32 ea)",
    calories: 30,
    protein: 2,
    carbs: 5,
    fat: 0,
    servingSize: "1 cup (85g)",
    coachNote: "Two massive 4 lb bags (8 lbs / ~32 cups total) guaranteed! Steamed micronutrients and fiber for 7 full days of national chicken and rice bowls across all 13 cuisines.",
    cuisine: [
      "Puerto Rico", "Puerto Rico Bulking",
      "Spain", "Spain Bulking",
      "Mexico", "Mexico Bulking",
      "Dominican Republic", "Dominican Republic Bulking",
      "Colombia", "Colombia Bulking",
      "Brazil", "Brazil Bulking",
      "China", "China Bulking",
      "Korea", "Korea Bulking",
      "Japan", "Japan Bulking",
      "Italy", "Italy Bulking",
      "El Salvador", "El Salvador Bulking",
      "Venezuela", "Venezuela Bulking",
      "Argentina", "Argentina Bulking"
    ]
  },
  // Bananas (Shared pre-workout energy across all countries)
  {
    id: "g-8",
    upc: "078742358888",
    name: "Fresh Bananas (~2 lb bunch / ~6-7 bananas)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Fresh Produce",
    category: "Produce",
    priceEst: "$1.16 (~2 lb bunch at $0.58/lb)",
    calories: 105,
    protein: 1,
    carbs: 27,
    fat: 0,
    servingSize: "1 Medium Banana (118g)",
    coachNote: "Quick potassium and pre-workout carbohydrates to pair with your 8:00 AM morning national coffee or tea!",
    cuisine: [
      "Puerto Rico", "Puerto Rico Bulking",
      "Spain", "Spain Bulking",
      "Mexico", "Mexico Bulking",
      "Dominican Republic", "Dominican Republic Bulking",
      "Colombia", "Colombia Bulking",
      "Brazil", "Brazil Bulking",
      "China", "China Bulking",
      "Korea", "Korea Bulking",
      "Japan", "Japan Bulking",
      "Italy", "Italy Bulking",
      "El Salvador", "El Salvador Bulking",
      "Venezuela", "Venezuela Bulking",
      "Argentina", "Argentina Bulking"
    ]
  },
  // Scallions / Green Onions (Shared aromatic base)
  {
    id: "g-9",
    upc: "078742358999",
    name: "Fresh Green Onions / Scallions / Cilantro (Two Bunches)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Fresh Produce",
    category: "Produce",
    priceEst: "$1.56 (Two bunches at $0.78 ea)",
    calories: 10,
    protein: 1,
    carbs: 2,
    fat: 0,
    servingSize: "2 tbsp (12g)",
    coachNote: "Fresh green aromatics essential for sautéing morning national scrambles and garnishing lunch/dinner bowls.",
    cuisine: [
      "Puerto Rico", "Puerto Rico Bulking",
      "Spain", "Spain Bulking",
      "Mexico", "Mexico Bulking",
      "Dominican Republic", "Dominican Republic Bulking",
      "Colombia", "Colombia Bulking",
      "Brazil", "Brazil Bulking",
      "China", "China Bulking",
      "Korea", "Korea Bulking",
      "Japan", "Japan Bulking",
      "Italy", "Italy Bulking",
      "El Salvador", "El Salvador Bulking",
      "Venezuela", "Venezuela Bulking",
      "Argentina", "Argentina Bulking"
    ]
  },
  // Liquid Egg Whites for Phase 1 Cutting
  {
    id: "g-10",
    upc: "078742359011",
    name: "Great Value 100% Liquid Egg Whites (32 oz carton)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Protein",
    priceEst: "$3.48 (32 oz carton)",
    calories: 25,
    protein: 5,
    carbs: 0,
    fat: 0,
    servingSize: "3 tbsp (46g)",
    coachNote: "Pure fat-free protein booster for morning scrambles and egg wash binder for crispy chicken across Phase 1 Cutting plans.",
    cuisine: [
      "Puerto Rico", "Spain", "Mexico", "Dominican Republic", "Colombia",
      "Brazil", "China", "Korea", "Japan", "Italy", "El Salvador", "Venezuela", "Argentina"
    ]
  },
  // Rolled Oats for Phase 2 Bulking
  {
    id: "g-11",
    upc: "078742351111",
    name: "Great Value Old Fashioned Rolled Oats (42 oz canister)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Carbs",
    priceEst: "$3.98 (42 oz canister ~30 servings)",
    calories: 150,
    protein: 5,
    carbs: 27,
    fat: 2.5,
    servingSize: "1/2 cup dry (40g)",
    coachNote: "Slow-digesting complex carbs for bulking morning energy alongside 5-egg scrambles across Phase 2 Bulking plans.",
    cuisine: [
      "Puerto Rico Bulking", "Spain Bulking", "Mexico Bulking", "Dominican Republic Bulking", "Colombia Bulking",
      "Brazil Bulking", "China Bulking", "Korea Bulking", "Japan Bulking", "Italy Bulking", "El Salvador Bulking", "Venezuela Bulking", "Argentina Bulking"
    ]
  },
  // 2% Milk / Soy Milk Base for Coffee & Tea
  {
    id: "g-13",
    upc: "078742354444",
    name: "Great Value 2% Reduced Fat Milk (64 fl oz / 1/2 Gal)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Essentials",
    priceEst: "$1.68 (64 fl oz carton)",
    calories: 120,
    protein: 8,
    carbs: 12,
    fat: 5,
    servingSize: "1 cup (240ml)",
    coachNote: "Creamy milk base whisked with morning national coffees (Café Bustelo, Spanish Cortado, Café com Leite, Matcha) across all 13 countries.",
    cuisine: [
      "Puerto Rico", "Puerto Rico Bulking",
      "Spain", "Spain Bulking",
      "Mexico", "Mexico Bulking",
      "Dominican Republic", "Dominican Republic Bulking",
      "Colombia", "Colombia Bulking",
      "Brazil", "Brazil Bulking",
      "China", "China Bulking",
      "Korea", "Korea Bulking",
      "Japan", "Japan Bulking",
      "Italy", "Italy Bulking",
      "El Salvador", "El Salvador Bulking",
      "Venezuela", "Venezuela Bulking",
      "Argentina", "Argentina Bulking"
    ]
  },
  // --- Country-Specific Legumes & Staples ---
  // Puerto Rico & Dominican Republic Pigeon Peas (Gandules)
  {
    id: "g-12",
    upc: "078742353333",
    name: "Goya Green Pigeon Peas (Gandules Verdes) (15 oz can)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Goya",
    category: "Produce",
    priceEst: "$1.58 (15 oz can)",
    calories: 80,
    protein: 5,
    carbs: 14,
    fat: 0,
    servingSize: "1/2 cup (130g)",
    coachNote: "The iconic Caribbean legume staple simmered with rice and sofrito for Arroz con Gandules / Moro de Guandules.",
    cuisine: ["Puerto Rico", "Dominican Republic"]
  },
  {
    id: "g-12-bulk",
    upc: "078742353333-bulk",
    name: "Goya Green Pigeon Peas (Gandules Verdes) (Two 15 oz cans)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Goya",
    category: "Produce",
    priceEst: "$3.16 (Two 15 oz cans at $1.58 ea)",
    calories: 80,
    protein: 5,
    carbs: 14,
    fat: 0,
    servingSize: "1/2 cup (130g)",
    coachNote: "Two cans of green pigeon peas to support double bulking rice portions for Puerto Rico & Dominican Republic.",
    cuisine: ["Puerto Rico Bulking", "Dominican Republic Bulking"]
  },
  // Spain Sweet Peas & Roasted Peppers
  {
    id: "g-spain-veggies",
    upc: "078742353334",
    name: "Great Value Frozen Sweet Peas & Roasted Red Peppers (Two 12 oz bags/jars)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value / Goya",
    category: "Produce",
    priceEst: "$2.84 (Peas + Peppers combined)",
    calories: 60,
    protein: 4,
    carbs: 11,
    fat: 0,
    servingSize: "1/2 cup (100g)",
    coachNote: "Saffron rice enhancement giving authentic golden Spanish Arroz Amarillo con Pimientos its sweetness and vibrant color.",
    cuisine: ["Spain", "Spain Bulking"]
  },
  // Mexico & Venezuela Peppers & Tomatoes
  {
    id: "g-mex-tomatoes",
    upc: "078742353335",
    name: "Fresh Roma Tomatoes, Bell Peppers & Limes (Fresh Produce Mix)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Fresh Produce",
    category: "Produce",
    priceEst: "$2.96 (Tomatoes + Peppers + Limes)",
    calories: 25,
    protein: 1,
    carbs: 5,
    fat: 0,
    servingSize: "1/2 cup chopped (100g)",
    coachNote: "Fresh tomato and lime juice base for Arroz Mexicano, Fajita veggies, and Venezuelan sofrito.",
    cuisine: ["Mexico", "Mexico Bulking", "Venezuela", "Venezuela Bulking"]
  },
  // Colombia, El Salvador & Brazil Beans
  {
    id: "g-col-beans",
    upc: "078742353336",
    name: "Goya Red/Small Red or Black Beans (15 oz can)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Goya",
    category: "Produce",
    priceEst: "$1.50 (15 oz can)",
    calories: 110,
    protein: 7,
    carbs: 20,
    fat: 0,
    servingSize: "1/2 cup (130g)",
    coachNote: "Rich iron-dense beans simmered with garlic for Colombian Frijoles Rojos, Salvadoran Casamiento, or Brazilian Feijão Preto.",
    cuisine: ["Colombia", "Brazil", "El Salvador"]
  },
  {
    id: "g-col-beans-bulk",
    upc: "078742353336-bulk",
    name: "Goya Red/Small Red or Black Beans (Two 15 oz cans)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Goya",
    category: "Produce",
    priceEst: "$3.00 (Two cans at $1.50 ea)",
    calories: 110,
    protein: 7,
    carbs: 20,
    fat: 0,
    servingSize: "1/2 cup (130g)",
    coachNote: "Two cans of Goya beans to support double bulking portions for Colombia, Brazil, and El Salvador.",
    cuisine: ["Colombia Bulking", "Brazil Bulking", "El Salvador Bulking"]
  },
  // China & Korea Veggies & Scallions
  {
    id: "g-asia-veggies",
    upc: "078742353337",
    name: "Great Value Frozen Peas & Carrots + Extra Fresh Scallions/Cabbage Mix",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value / Fresh",
    category: "Produce",
    priceEst: "$2.86 (Peas & Carrots bag + Fresh mix)",
    calories: 50,
    protein: 2,
    carbs: 10,
    fat: 0,
    servingSize: "1/2 cup (100g)",
    coachNote: "Essential stir-fry veggies for Chinese Egg Fried Rice (Chao Fan) and Korean Sesame Broccoli / Scallion bowls.",
    cuisine: ["China", "China Bulking", "Korea", "Korea Bulking", "Japan", "Japan Bulking"]
  },
  // Italy Pasta & Tomato Base
  {
    id: "g-italy-pasta",
    upc: "078742353338",
    name: "Great Value Penne Rigate Pasta & Traditional Herb Tomato Base",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Carbs",
    priceEst: "$2.78 (16 oz box pasta + Marinara base)",
    calories: 200,
    protein: 7,
    carbs: 41,
    fat: 1,
    servingSize: "2 oz dry (56g)",
    coachNote: "Classic Italian durum wheat pasta and garlic tomato base for Pollo alle Erbe bowls.",
    cuisine: ["Italy", "Italy Bulking"]
  },
  // Argentina Garlic & Zucchini/Herb enhancement
  {
    id: "g-arg-veggies",
    upc: "078742353339",
    name: "Fresh Garlic Bulbs & Zucchini/Broccoli Chimichurri Veggie Mix",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Fresh Produce",
    category: "Produce",
    priceEst: "$2.80 (Garlic + Fresh Zucchini)",
    calories: 35,
    protein: 2,
    carbs: 7,
    fat: 0,
    servingSize: "1 cup (100g)",
    coachNote: "Fresh garlic and greens to complement Argentine Pollo al Chimichurri and Garlic Bay Leaf Rice.",
    cuisine: ["Argentina", "Argentina Bulking"]
  },
  // --- Periodic Restock Seasonings & Reward Treats (Shared / Cuisine specific) ---
  {
    id: "g-14",
    upc: "078742355555",
    name: "Goya Frozen Tostones / Plátanos Maduros / Arepas / Corn Tortillas (Periodic Reward Base)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Goya / Great Value",
    category: "Carbs",
    priceEst: "$3.48 (16 oz box/bag)",
    calories: 160,
    protein: 1,
    carbs: 28,
    fat: 5,
    servingSize: "3 pieces (84g)",
    coachNote: "Your once-a-week national reward treat! Tostones for Puerto Rico/Dominican, Corn Tortillas for Mexico, Arepas for Colombia/Venezuela, Pupusas for El Salvador, Pão de Queijo for Brazil, or Milanesa/Ramen!",
    cuisine: [
      "Puerto Rico", "Puerto Rico Bulking",
      "Spain", "Spain Bulking",
      "Mexico", "Mexico Bulking",
      "Dominican Republic", "Dominican Republic Bulking",
      "Colombia", "Colombia Bulking",
      "Brazil", "Brazil Bulking",
      "China", "China Bulking",
      "Korea", "Korea Bulking",
      "Japan", "Japan Bulking",
      "Italy", "Italy Bulking",
      "El Salvador", "El Salvador Bulking",
      "Venezuela", "Venezuela Bulking",
      "Argentina", "Argentina Bulking"
    ]
  },
  {
    id: "g-15",
    upc: "078742356666",
    name: "Café Bustelo / Spanish Espresso / Oolong Tea / Yerba Mate (10 oz brick/pack)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Café Bustelo / National Tea",
    category: "Essentials",
    priceEst: "$4.88 (10 oz brick / 100 tea bags)",
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    servingSize: "1 tbsp coffee / 1 tea bag",
    coachNote: "Authentic national caffeine focus (Café Bustelo, Spanish Cortado, Café de Olla, Oolong Tea, Yerba Mate) brewed strong right before your 8:00 AM workout! (Periodic restock item).",
    cuisine: [
      "Puerto Rico", "Puerto Rico Bulking",
      "Spain", "Spain Bulking",
      "Mexico", "Mexico Bulking",
      "Dominican Republic", "Dominican Republic Bulking",
      "Colombia", "Colombia Bulking",
      "Brazil", "Brazil Bulking",
      "China", "China Bulking",
      "Korea", "Korea Bulking",
      "Japan", "Japan Bulking",
      "Italy", "Italy Bulking",
      "El Salvador", "El Salvador Bulking",
      "Venezuela", "Venezuela Bulking",
      "Argentina", "Argentina Bulking"
    ]
  },
  {
    id: "g-16",
    upc: "078742359033",
    name: "Goya Adobo / Sofrito / Sazón / Soy Sauce / Chimichurri Seasoning Base",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Goya / Kikkoman / Badia",
    category: "Seasonings & Spices",
    priceEst: "$3.28 (Shaker / Jar / Bottle)",
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    servingSize: "1 tsp (5g)",
    coachNote: "Authentic national spice and marinade bases giving your chicken and rice intense zero/low-calorie flavor across all 13 world-class cuisines (Periodic restock item).",
    cuisine: [
      "Puerto Rico", "Puerto Rico Bulking",
      "Spain", "Spain Bulking",
      "Mexico", "Mexico Bulking",
      "Dominican Republic", "Dominican Republic Bulking",
      "Colombia", "Colombia Bulking",
      "Brazil", "Brazil Bulking",
      "China", "China Bulking",
      "Korea", "Korea Bulking",
      "Japan", "Japan Bulking",
      "Italy", "Italy Bulking",
      "El Salvador", "El Salvador Bulking",
      "Venezuela", "Venezuela Bulking",
      "Argentina", "Argentina Bulking"
    ]
  },
  {
    id: "g-19",
    upc: "078742359022",
    name: "Argo 100% Pure Corn Starch / Cooking Coating (16 oz box)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Argo / Great Value",
    category: "Seasonings & Spices",
    priceEst: "$1.78 (16 oz box)",
    calories: 30,
    protein: 0,
    carbs: 7,
    fat: 0,
    servingSize: "1 tbsp (8g)",
    coachNote: "Essential coating ingredient mixed with national seasonings for getting chicken breast cubes super crispy and golden in the oven or pan (Periodic restock item).",
    cuisine: [
      "Puerto Rico", "Puerto Rico Bulking",
      "Spain", "Spain Bulking",
      "Mexico", "Mexico Bulking",
      "Dominican Republic", "Dominican Republic Bulking",
      "Colombia", "Colombia Bulking",
      "Brazil", "Brazil Bulking",
      "China", "China Bulking",
      "Korea", "Korea Bulking",
      "Japan", "Japan Bulking",
      "Italy", "Italy Bulking",
      "El Salvador", "El Salvador Bulking",
      "Venezuela", "Venezuela Bulking",
      "Argentina", "Argentina Bulking"
    ]
  },
  {
    id: "g-20",
    upc: "078742351234-spray",
    name: "Great Value Canola Oil / Olive Oil 0-Calorie Cooking Spray (8 oz can)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value / Pompeian",
    category: "Essentials",
    priceEst: "$2.24 (8 oz aerosol can)",
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    servingSize: "0.25 sec spray (0.25g)",
    coachNote: "Zero-calorie non-stick cooking spray for pan/oven crispy chicken and scrambling eggs without adding hidden liquid oil calories (Periodic restock item).",
    cuisine: [
      "Puerto Rico", "Puerto Rico Bulking",
      "Spain", "Spain Bulking",
      "Mexico", "Mexico Bulking",
      "Dominican Republic", "Dominican Republic Bulking",
      "Colombia", "Colombia Bulking",
      "Brazil", "Brazil Bulking",
      "China", "China Bulking",
      "Korea", "Korea Bulking",
      "Japan", "Japan Bulking",
      "Italy", "Italy Bulking",
      "El Salvador", "El Salvador Bulking",
      "Venezuela", "Venezuela Bulking",
      "Argentina", "Argentina Bulking"
    ]
  },
  {
    id: "g-21",
    upc: "078742100108",
    name: "Great Value Garlic Powder / Herb Seasoning (3.4 oz bottle)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Seasonings & Spices",
    priceEst: "$1.18 (3.4 oz bottle)",
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    servingSize: "1/4 tsp (0.7g)",
    coachNote: "Essential savory garlic/herb seasoning used for searing chicken breast cubes and broccoli across all cuisines (Periodic restock item).",
    cuisine: [
      "Puerto Rico", "Puerto Rico Bulking",
      "Spain", "Spain Bulking",
      "Mexico", "Mexico Bulking",
      "Dominican Republic", "Dominican Republic Bulking",
      "Colombia", "Colombia Bulking",
      "Brazil", "Brazil Bulking",
      "China", "China Bulking",
      "Korea", "Korea Bulking",
      "Japan", "Japan Bulking",
      "Italy", "Italy Bulking",
      "El Salvador", "El Salvador Bulking",
      "Venezuela", "Venezuela Bulking",
      "Argentina", "Argentina Bulking"
    ]
  },
  {
    id: "g-22",
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
    coachNote: "Sweetens your morning national coffee/tea and afternoon Greek yogurt bowls with zero added sugar calories (Periodic restock item).",
    cuisine: [
      "Puerto Rico", "Puerto Rico Bulking",
      "Spain", "Spain Bulking",
      "Mexico", "Mexico Bulking",
      "Dominican Republic", "Dominican Republic Bulking",
      "Colombia", "Colombia Bulking",
      "Brazil", "Brazil Bulking",
      "China", "China Bulking",
      "Korea", "Korea Bulking",
      "Japan", "Japan Bulking",
      "Italy", "Italy Bulking",
      "El Salvador", "El Salvador Bulking",
      "Venezuela", "Venezuela Bulking",
      "Argentina", "Argentina Bulking"
    ]
  }
];

// Helper to generate consistent daily timeline meals across our 26 plans
const createMeals = (
  countryName: string,
  preWorkoutDrink: string,
  preWorkoutDrinkCalories: number,
  breakfastScrambleName: string,
  breakfastScrambleIngredients: string,
  breakfastCalories: number,
  breakfastProtein: number,
  breakfastCarbs: number,
  breakfastFat: number,
  lunchDinnerChickenName: string,
  lunchDinnerChickenIngredients: string,
  lunchDinnerCarbName: string,
  lunchDinnerCarbIngredients: string,
  lunchDinnerCalories: number,
  lunchDinnerProtein: number,
  lunchDinnerCarbs: number,
  lunchDinnerFat: number,
  snackYogurtCount: string,
  snackYogurtCalories: number,
  snackYogurtProtein: number,
  rewardName: string,
  rewardIngredients: string,
  rewardCalories: number,
  rewardProtein: number,
  rewardCarbs: number,
  rewardFat: number,
  isBulking: boolean
) => [
  {
    name: `Pre-Workout Fuel: ${preWorkoutDrink} & Fresh Banana`,
    time: "8:00 AM (Pre-Workout)",
    ingredients: [
      `1 Pre-Workout ${preWorkoutDrink}: Brew fresh and whisk with warm or iced Great Value 2% Milk (optional: add 1 zero-cal sweetener packet). Provides clean caffeine focus right before your morning workout & cardio run! (${preWorkoutDrinkCalories} kcal, 6g p, 9g c, 3.5g f)`,
      "1 Medium Fresh Banana: Peel and eat immediately right before training for rapid-absorbing pre-workout carbohydrates & potassium! (105 kcal, 1g p, 27g c)"
    ],
    calories: preWorkoutDrinkCalories + 105,
    protein: 7,
    carbs: 36,
    fat: 3.5
  },
  {
    name: `Post-Workout Breakfast: ${breakfastScrambleName}`,
    time: "10:30 AM – 11:00 AM (Post-Workout)",
    ingredients: [
      breakfastScrambleIngredients,
      isBulking
        ? "1 cup cooked Great Value Old Fashioned Rolled Oats with cinnamon or sweetener packet for slow-digesting complex carbs! (150 kcal, 5g p, 27g c)"
        : `1 cup cooked ${lunchDinnerCarbName} (reheated warm to replenish post-workout glycogen!). (${breakfastCarbs - 15} kcal, 5g p, ${breakfastCarbs}g c)`,
      `1 fresh cup of black ${preWorkoutDrink.split(' ')[0]} or water (0 kcal, post-workout hydration & metabolic support)`
    ],
    calories: breakfastCalories,
    protein: breakfastProtein,
    carbs: breakfastCarbs,
    fat: breakfastFat
  },
  {
    name: `Lunch: ${lunchDinnerChickenName} + ${lunchDinnerCarbName} & Steamed Broccoli`,
    time: "2:00 PM – 2:30 PM",
    ingredients: [
      lunchDinnerChickenIngredients,
      lunchDinnerCarbIngredients,
      "1 cup steamed Great Value Frozen Broccoli florets seasoned with a pinch of garlic powder or national herb seasoning. (30 kcal, 2g p, 6g c)"
    ],
    calories: lunchDinnerCalories,
    protein: lunchDinnerProtein,
    carbs: lunchDinnerCarbs,
    fat: lunchDinnerFat
  },
  {
    name: "Afternoon Snack: High-Protein Casein Greek Yogurt Power Bowl",
    time: "5:30 PM",
    ingredients: [
      `1 cup (8 oz) Plain Nonfat Greek Yogurt. Stir in 1 zero-calorie sweetener packet and a pinch of cinnamon or vanilla until creamy and velvety. Slow-release casein keeps muscles fueled between training and running sessions! (${snackYogurtCalories} kcal, ${snackYogurtProtein}g p, 8g c)`
    ],
    calories: snackYogurtCalories,
    protein: snackYogurtProtein,
    carbs: 8,
    fat: 0
  },
  {
    name: `Dinner: ${lunchDinnerChickenName} + ${lunchDinnerCarbName} & Steamed Broccoli`,
    time: "7:30 PM – 8:00 PM",
    ingredients: [
      lunchDinnerChickenIngredients,
      lunchDinnerCarbIngredients,
      "1 cup steamed Great Value Frozen Broccoli florets (crisp-tender, seasoned with national herb seasoning). (30 kcal, 2g p, 6g c)"
    ],
    calories: lunchDinnerCalories,
    protein: lunchDinnerProtein,
    carbs: lunchDinnerCarbs,
    fat: lunchDinnerFat
  },
  {
    name: "Nighttime Recovery: Casein Greek Yogurt Fluff",
    time: "10:30 PM",
    ingredients: [
      "3/4 cup (6 oz) Plain Nonfat Greek Yogurt whisked with 1 Great Value Zero Calorie Sweetener Packet until airy and fluffy. Provides essential overnight amino acids to rebuild muscle fiber while you sleep. (90 kcal, 16g p, 6g c)"
    ],
    calories: 90,
    protein: 16,
    carbs: 6,
    fat: 0
  },
  {
    name: `Weekly Reward Treat Meal: ${rewardName}`,
    time: "Friday or Saturday Evening (Weekly Reward)",
    ingredients: [
      rewardIngredients
    ],
    calories: rewardCalories,
    protein: rewardProtein,
    carbs: rewardCarbs,
    fat: rewardFat
  }
];

export const MEAL_PREP_PLANS: MealPrepPlan[] = [
  // 1. Puerto Rico 🇵🇷 (Cutting & Bulking)
  {
    id: "plan-puerto-rico",
    title: "Puerto Rico: Crispy Pollo al Horno, Arroz con Gandules & Café Bustelo Shred Blueprint (~2,080 kcal)",
    country: "Puerto Rico",
    flag: "🇵🇷",
    badge: "⭐ #1 Main Phase 1 Cutting Blueprint ($51.74/Wk)",
    targetDailyCalories: 2080,
    targetDailyProtein: 178,
    estCostPerWeek: "$51.74 Weekly Consumables / $24.60 Periodic Restock ($76.34 Combined Total)",
    description: "The #1 Main Puerto Rican Crispy Pollo al Horno, Arroz con Gandules & Café Bustelo Shred Blueprint! Tailored specifically for steady, sustainable fat loss (~0.75-1.0 lb/wk) to reach your 160 lb target cleanly by 2028. Features dark roast Café Bustelo Espresso con Leche + Banana at 8:00 AM before your Home Dojo or Planet Fitness session, post-workout Sofrito & Scallion Egg White Scramble, Crispy Pollo al Horno with Arroz con Gandules & Broccoli for Lunch and Dinner, Casein Greek Yogurt bowls, and a weekly Goya Tostones reward treat!",
    meals: createMeals(
      "Puerto Rico", "Café Bustelo Espresso con Leche", 95,
      "Puerto Rican Sofrito & Scallion Egg Scramble + Arroz con Gandules",
      "3 Large White Eggs + 1/2 cup (4 oz) Liquid Egg Whites scrambled in 0-Cal Cooking Spray with 1 tbsp Goya Sofrito and chopped scallions/cilantro, seasoned with 1/4 tsp Goya Adobo. (330 kcal, 31g p, 15g f)",
      530, 36, 44, 15,
      "Crispy Puerto Rican Pollo al Horno",
      "~5.7 oz Fresh Chicken Breast cubes dipped in Liquid Egg Whites, coated with 1 tsp Corn Starch, Goya Adobo, Sazón & Garlic Powder, sprayed with 0-Cal Canola Oil and baked at 400°F (or pan crisp seared) for 10-12m. (210 kcal, 40g p, 2g f)",
      "Arroz con Gandules (Puerto Rican Rice & Pigeon Peas)",
      "1 cup cooked Arroz con Gandules (simmered with Sofrito, Sazón, White Rice, and Goya Green Pigeon Peas). (200 kcal, 5g p, 44g c)",
      440, 47, 50, 2,
      "1 cup", 120, 21,
      "Goya Tostones (Crispy Fried Green Plantains) & Garlic Pollo",
      "3 Goya Frozen Tostones (84g) air-fried at 400°F for 12 minutes topped with 4 oz Crispy Pollo al Horno and a squeeze of lime or sofrito! (360 kcal, 28g p, 32g c, 10g f)",
      360, 28, 32, 10, false
    )
  },
  {
    id: "plan-puerto-rico-bulking",
    title: "Puerto Rico Bulking: Pollo al Horno & DOUBLE Arroz con Gandules Lean Bulk (~2,680 kcal)",
    country: "Puerto Rico Bulking",
    flag: "🇵🇷🔥",
    badge: "🔥 Phase 2: Post-160 Lb Lean Bulk ($51.70/Wk)",
    targetDailyCalories: 2680,
    targetDailyProtein: 188,
    estCostPerWeek: "$51.70 Weekly Consumables / $24.60 Periodic Restock ($76.30 Combined Total)",
    description: "The #1 Puerto Rican Lean Bulking Blueprint for post-160 lb muscle gain! Swaps 4 tubs of yogurt and liquid egg whites for a 5 lb bulk bag of White Rice, Rolled Oats, 3 tubs of yogurt, and 5 whole eggs daily. Features Crispy Pollo al Horno with DOUBLE Arroz con Gandules & Broccoli, Café Bustelo con Leche, and Goya Tostones reward treat!",
    meals: createMeals(
      "Puerto Rico Bulking", "Café Bustelo Espresso con Leche", 95,
      "5-Egg Sofrito Scramble + Rolled Oats + Café Bustelo",
      "5 Large White Eggs scrambled with 1 tbsp Goya Sofrito and chopped scallions, seasoned with 1/4 tsp Goya Adobo. Provides rich amino acids and healthy fats for muscle building. (350 kcal, 30g p, 25g f)",
      500, 35, 54, 25,
      "Crispy Puerto Rican Pollo al Horno",
      "~5.7 oz Fresh Chicken Breast cubes coated with Corn Starch, Goya Adobo, Sazón & Garlic Powder, baked at 400°F until super crunchy outside & juicy inside. (210 kcal, 40g p, 2g f)",
      "DOUBLE Arroz con Gandules",
      "2 cups cooked Arroz con Gandules (high-density glycogen replenishment!). (400 kcal, 10g p, 88g c)",
      640, 52, 94, 2,
      "1 cup", 120, 21,
      "Goya Tostones & Garlic Pollo",
      "3 Goya Frozen Tostones air-fried at 400°F topped with garlic chicken and sofrito! (360 kcal, 28g p, 32g c, 10g f)",
      360, 28, 32, 10, true
    )
  },

  // 2. Spain 🇪🇸 (Cutting & Bulking)
  {
    id: "plan-spain",
    title: "Spain: Pollo al Ajillo, Arroz Amarillo con Pimientos & Café con Leche Shred Blueprint (~2,080 kcal)",
    country: "Spain",
    flag: "🇪🇸",
    badge: "🇪🇸 Authentic Spanish Phase 1 Cutting ($51.52/Wk)",
    targetDailyCalories: 2080,
    targetDailyProtein: 178,
    estCostPerWeek: "$51.52 Weekly Consumables / $24.60 Periodic Restock ($76.12 Combined Total)",
    description: "Authentic Spanish Crispy Pollo al Ajillo (Garlic, Parsley & Olive Oil seared chicken) paired with golden Arroz Amarillo con Pimientos (Saffron rice with sweet peas and roasted red peppers). Features morning Revuelto de Ajos Tiernos y Perejil (scrambled eggs with green onions and garlic notes), Spanish Café con Leche, Casein yogurt power bowls, and a weekly Tortilla Española reward treat!",
    meals: createMeals(
      "Spain", "Spanish Café con Leche Cortado", 95,
      "Revuelto de Ajos Tiernos y Perejil + Arroz Amarillo",
      "3 Large White Eggs + 1/2 cup Liquid Egg Whites scrambled with green onions, a pinch of garlic powder, and parsley in olive oil spray until creamy and fluffy. (330 kcal, 31g p, 15g f)",
      530, 36, 44, 15,
      "Crispy Spanish Pollo al Ajillo",
      "~5.7 oz Fresh Chicken Breast cubes dipped in Liquid Egg Whites, coated with 1 tsp Corn Starch, garlic powder, parsley & oregano, seared golden with Pompeian Olive Oil spray. (210 kcal, 40g p, 2g f)",
      "Arroz Amarillo con Pimientos (Golden Saffron Rice with Peas & Peppers)",
      "1 cup cooked Arroz Amarillo (White rice simmered with saffron/bijol, sweet peas, and roasted red peppers). (200 kcal, 5g p, 44g c)",
      440, 47, 50, 2,
      "1 cup", 120, 21,
      "Tortilla Española (Spanish Potato & Onion Omelette) with Pollo al Ajillo",
      "Authentic slice of Tortilla Española (golden potato and onion omelette made with egg whites/spray) served with 4 oz Pollo al Ajillo and roasted red peppers! (360 kcal, 28g p, 32g c, 10g f)",
      360, 28, 32, 10, false
    )
  },
  {
    id: "plan-spain-bulking",
    title: "Spain Bulking: Pollo al Ajillo & DOUBLE Arroz Amarillo con Pimientos Lean Bulk (~2,680 kcal)",
    country: "Spain Bulking",
    flag: "🇪🇸🔥",
    badge: "🔥 Phase 2: Spanish Lean Bulk ($51.48/Wk)",
    targetDailyCalories: 2680,
    targetDailyProtein: 188,
    estCostPerWeek: "$51.48 Weekly Consumables / $24.60 Periodic Restock ($76.08 Combined Total)",
    description: "Spanish Phase 2 Lean Bulking! Features Crispy Pollo al Ajillo with DOUBLE Arroz Amarillo con Pimientos, 5-Egg Revuelto + Rolled Oats, Spanish Café con Leche, and Tortilla Española reward treat!",
    meals: createMeals(
      "Spain Bulking", "Spanish Café con Leche Cortado", 95,
      "5-Egg Revuelto de Ajos Tiernos + Rolled Oats + Café con Leche",
      "5 Large White Eggs scrambled with green onions and parsley in olive oil spray. Rich amino acids and natural testosterone support for bulking. (350 kcal, 30g p, 25g f)",
      500, 35, 54, 25,
      "Crispy Spanish Pollo al Ajillo",
      "~5.7 oz Fresh Chicken Breast cubes seared golden with garlic, parsley, and olive oil spray. (210 kcal, 40g p, 2g f)",
      "DOUBLE Arroz Amarillo con Pimientos",
      "2 cups cooked Arroz Amarillo (saffron rice with peas and roasted peppers for maximum clean glycogen storage). (400 kcal, 10g p, 88g c)",
      640, 52, 94, 2,
      "1 cup", 120, 21,
      "Tortilla Española & Pollo al Ajillo",
      "Authentic slice of Tortilla Española paired with 4 oz garlic chicken and peppers! (360 kcal, 28g p, 32g c, 10g f)",
      360, 28, 32, 10, true
    )
  },

  // 3. Mexico 🇲🇽 (Cutting & Bulking)
  {
    id: "plan-mexico",
    title: "Mexico: Pollo Asado al Limón y Ajo, Arroz Mexicano & Café de Olla Shred Blueprint (~2,080 kcal)",
    country: "Mexico",
    flag: "🇲🇽",
    badge: "🇲🇽 Authentic Mexican Phase 1 Cutting ($51.64/Wk)",
    targetDailyCalories: 2080,
    targetDailyProtein: 178,
    estCostPerWeek: "$51.64 Weekly Consumables / $24.60 Periodic Restock ($76.24 Combined Total)",
    description: "Authentic Mexican Crispy Pollo Asado al Limón y Ajo (Garlic-Lime Chicken) paired with Arroz Mexicano (Tomato-Garlic Rice) and Sautéed Fajita Veggies. Features morning Chorizo-Spiced Scallion Egg Scramble, Café de Olla (cinnamon-infused coffee), Casein yogurt bowls, and Crispy Corn Tortilla Tacos de Pollo Asado reward treat!",
    meals: createMeals(
      "Mexico", "Café de Olla (Cinnamon Spiced Coffee)", 95,
      "Chorizo-Spiced Scallion Egg Scramble + Arroz Mexicano",
      "3 Large White Eggs + 1/2 cup Liquid Egg Whites scrambled with green onions and a pinch of taco/chorizo seasoning in 0-Cal spray. (330 kcal, 31g p, 15g f)",
      530, 36, 44, 15,
      "Crispy Mexican Pollo Asado al Limón y Ajo",
      "~5.7 oz Fresh Chicken Breast cubes coated with lime juice, garlic powder, cumin, and corn starch, seared golden. (210 kcal, 40g p, 2g f)",
      "Arroz Mexicano (Tomato & Garlic Mexican Rice)",
      "1 cup cooked Arroz Mexicano (simmered with tomato, garlic, and onions). (200 kcal, 5g p, 44g c)",
      440, 47, 50, 2,
      "1 cup", 120, 21,
      "Crispy Corn Tortilla Tacos de Pollo Asado",
      "3 Warm Great Value Yellow Corn Tortillas filled with 4 oz Pollo Asado, fresh salsa, cilantro, and a squeeze of lime! (360 kcal, 28g p, 32g c, 10g f)",
      360, 28, 32, 10, false
    )
  },
  {
    id: "plan-mexico-bulking",
    title: "Mexico Bulking: Pollo Asado & DOUBLE Arroz Mexicano Lean Bulk (~2,680 kcal)",
    country: "Mexico Bulking",
    flag: "🇲🇽🔥",
    badge: "🔥 Phase 2: Mexican Lean Bulk ($51.54/Wk)",
    targetDailyCalories: 2680,
    targetDailyProtein: 188,
    estCostPerWeek: "$51.54 Weekly Consumables / $24.60 Periodic Restock ($76.14 Combined Total)",
    description: "Mexican Phase 2 Lean Bulking! Features Crispy Pollo Asado with DOUBLE Arroz Mexicano, 5-Egg Chorizo-Spiced Scramble + Rolled Oats, Café de Olla, and Crispy Tacos de Pollo reward treat!",
    meals: createMeals(
      "Mexico Bulking", "Café de Olla (Cinnamon Spiced Coffee)", 95,
      "5-Egg Chorizo-Spiced Scramble + Rolled Oats + Café de Olla",
      "5 Large White Eggs scrambled with green onions and chorizo spices in 0-cal spray. (350 kcal, 30g p, 25g f)",
      500, 35, 54, 25,
      "Crispy Mexican Pollo Asado al Limón y Ajo",
      "~5.7 oz Fresh Chicken Breast cubes seared golden with lime, garlic, and cumin. (210 kcal, 40g p, 2g f)",
      "DOUBLE Arroz Mexicano",
      "2 cups cooked Arroz Mexicano (rich tomato-garlic rice for muscle glycogen loading). (400 kcal, 10g p, 88g c)",
      640, 52, 94, 2,
      "1 cup", 120, 21,
      "Crispy Corn Tortilla Tacos de Pollo Asado",
      "3 Warm Corn Tortillas loaded with 4 oz Pollo Asado and fresh salsa! (360 kcal, 28g p, 32g c, 10g f)",
      360, 28, 32, 10, true
    )
  },

  // 4. Dominican Republic 🇩🇴 (Cutting & Bulking)
  {
    id: "plan-dominican-republic",
    title: "Dominican Republic: Pollo Guisado, Moro de Guandules & Cortadito Shred Blueprint (~2,080 kcal)",
    country: "Dominican Republic",
    flag: "🇩🇴",
    badge: "🇩🇴 Authentic Dominican Phase 1 Cutting ($51.74/Wk)",
    targetDailyCalories: 2080,
    targetDailyProtein: 178,
    estCostPerWeek: "$51.74 Weekly Consumables / $24.60 Periodic Restock ($76.34 Combined Total)",
    description: "Authentic Dominican Pollo Guisado (Garlic-Oregano Braised Chicken) paired with savory Moro de Guandules (Rice & Pigeon Peas with Dominican sofrito notes) and Steamed Cabbage/Broccoli. Features Mangú-Inspired Scallion Scramble, Dominican Dark Roast Cortadito, Casein bowls, and Plátanos Maduros / Tostones reward treat!",
    meals: createMeals(
      "Dominican Republic", "Dominican Dark Roast Cortadito", 95,
      "Mangú-Inspired Scallion Egg Scramble + Moro de Guandules",
      "3 Large White Eggs + 1/2 cup Liquid Egg Whites scrambled with red onions and scallions in 0-Cal spray. (330 kcal, 31g p, 15g f)",
      530, 36, 44, 15,
      "Dominican Pollo Guisado (Garlic-Oregano Braised Chicken)",
      "~5.7 oz Fresh Chicken Breast cubes simmered/seared with Dominican sofrito, garlic, oregano, and a splash of tomato base. (210 kcal, 40g p, 2g f)",
      "Moro de Guandules (Dominican Rice & Pigeon Peas)",
      "1 cup cooked Moro de Guandules (savory rice cooked together with green pigeon peas and herbs). (200 kcal, 5g p, 44g c)",
      440, 47, 50, 2,
      "1 cup", 120, 21,
      "Plátanos Maduros / Tostones with Pollo Guisado",
      "3 Golden air-fried Plátanos / Tostones served with 4 oz juicy Pollo Guisado and Dominican sofrito! (360 kcal, 28g p, 32g c, 10g f)",
      360, 28, 32, 10, false
    )
  },
  {
    id: "plan-dominican-republic-bulking",
    title: "Dominican Republic Bulking: Pollo Guisado & DOUBLE Moro de Guandules Lean Bulk (~2,680 kcal)",
    country: "Dominican Republic Bulking",
    flag: "🇩🇴🔥",
    badge: "🔥 Phase 2: Dominican Lean Bulk ($51.70/Wk)",
    targetDailyCalories: 2680,
    targetDailyProtein: 188,
    estCostPerWeek: "$51.70 Weekly Consumables / $24.60 Periodic Restock ($76.30 Combined Total)",
    description: "Dominican Phase 2 Lean Bulking! Features Pollo Guisado with DOUBLE Moro de Guandules, 5-Egg Mangú-Inspired Scramble + Rolled Oats, Dominican Cortadito, and Tostones reward treat!",
    meals: createMeals(
      "Dominican Republic Bulking", "Dominican Dark Roast Cortadito", 95,
      "5-Egg Mangú-Inspired Scramble + Rolled Oats + Cortadito",
      "5 Large White Eggs scrambled with red onions and scallions in 0-cal spray. (350 kcal, 30g p, 25g f)",
      500, 35, 54, 25,
      "Dominican Pollo Guisado",
      "~5.7 oz Fresh Chicken Breast cubes simmered with Dominican sofrito, garlic, and oregano. (210 kcal, 40g p, 2g f)",
      "DOUBLE Moro de Guandules",
      "2 cups cooked Moro de Guandules (rich rice and pigeon pea loading). (400 kcal, 10g p, 88g c)",
      640, 52, 94, 2,
      "1 cup", 120, 21,
      "Plátanos Maduros / Tostones & Pollo Guisado",
      "3 Golden Tostones served with 4 oz Pollo Guisado! (360 kcal, 28g p, 32g c, 10g f)",
      360, 28, 32, 10, true
    )
  },

  // 5. Colombia 🇨🇴 (Cutting & Bulking)
  {
    id: "plan-colombia",
    title: "Colombia: Pechuga a la Plancha con Hogao, Frijoles Rojos & Café Pinto Shred Blueprint (~2,080 kcal)",
    country: "Colombia",
    flag: "🇨🇴",
    badge: "🇨🇴 Authentic Colombian Phase 1 Cutting ($51.66/Wk)",
    targetDailyCalories: 2080,
    targetDailyProtein: 178,
    estCostPerWeek: "$51.66 Weekly Consumables / $24.60 Periodic Restock ($76.26 Combined Total)",
    description: "Authentic Colombian Pechuga a la Plancha (Seared Chicken topped with Hogao garlic-scallion-tomato sauce) paired with Arroz Blanco y Frijoles Rojos (White Rice & Red Beans) and Steamed Broccoli. Features Huevos Pericos (scrambled eggs with tomatoes and scallions), Café Pinto / Cortado, Casein bowls, and Crispy Arepa de Maíz reward treat!",
    meals: createMeals(
      "Colombia", "Colombian Café Pinto / Cortado", 95,
      "Huevos Pericos (Colombian Scallion & Tomato Scramble) + Arroz y Frijoles",
      "3 Large White Eggs + 1/2 cup Liquid Egg Whites scrambled with chopped tomatoes and green onions in 0-Cal spray. (330 kcal, 31g p, 15g f)",
      530, 36, 44, 15,
      "Colombian Pechuga a la Plancha con Hogao",
      "~5.7 oz Fresh Chicken Breast seared crisp and topped with 2 tbsp Hogao (traditional Colombian sautéed tomato, scallion, and garlic sauce). (210 kcal, 40g p, 2g f)",
      "Arroz Blanco y Frijoles Rojos (White Rice & Red Beans)",
      "1 cup cooked White Rice paired with savory simmered Goya Red Beans. (200 kcal, 5g p, 44g c)",
      440, 47, 50, 2,
      "1 cup", 120, 21,
      "Arepas de Maíz Crispy with Pechuga y Hogao",
      "2 Golden toasted Arepas de Maíz topped with 4 oz Pechuga a la Plancha and Hogao sauce! (360 kcal, 28g p, 32g c, 10g f)",
      360, 28, 32, 10, false
    )
  },
  {
    id: "plan-colombia-bulking",
    title: "Colombia Bulking: Pechuga a la Plancha & DOUBLE Arroz con Frijoles Lean Bulk (~2,680 kcal)",
    country: "Colombia Bulking",
    flag: "🇨🇴🔥",
    badge: "🔥 Phase 2: Colombian Lean Bulk ($51.54/Wk)",
    targetDailyCalories: 2680,
    targetDailyProtein: 188,
    estCostPerWeek: "$51.54 Weekly Consumables / $24.60 Periodic Restock ($76.14 Combined Total)",
    description: "Colombian Phase 2 Lean Bulking! Features Pechuga a la Plancha con Hogao with DOUBLE Arroz y Frijoles Rojos, 5-Egg Huevos Pericos + Rolled Oats, Café Pinto, and Arepas de Maíz reward treat!",
    meals: createMeals(
      "Colombia Bulking", "Colombian Café Pinto / Cortado", 95,
      "5-Egg Huevos Pericos + Rolled Oats + Café Pinto",
      "5 Large White Eggs scrambled with tomatoes and scallions in 0-cal spray. (350 kcal, 30g p, 25g f)",
      500, 35, 54, 25,
      "Colombian Pechuga a la Plancha con Hogao",
      "~5.7 oz Fresh Chicken Breast seared crisp topped with savory Hogao sauce. (210 kcal, 40g p, 2g f)",
      "DOUBLE Arroz Blanco y Frijoles Rojos",
      "2 cups cooked White Rice and Red Beans (high-octane Colombian bulking fuel). (400 kcal, 10g p, 88g c)",
      640, 52, 94, 2,
      "1 cup", 120, 21,
      "Arepas de Maíz Crispy & Pechuga",
      "2 Golden Arepas topped with 4 oz chicken and Hogao! (360 kcal, 28g p, 32g c, 10g f)",
      360, 28, 32, 10, true
    )
  },

  // 6. Brazil 🇧🇷 (Cutting & Bulking)
  {
    id: "plan-brazil",
    title: "Brazil: Frango Grelhado, Arroz e Feijão Preto & Café com Leite Shred Blueprint (~2,080 kcal)",
    country: "Brazil",
    flag: "🇧🇷",
    badge: "🇧🇷 Authentic Brazilian Phase 1 Cutting ($51.66/Wk)",
    targetDailyCalories: 2080,
    targetDailyProtein: 178,
    estCostPerWeek: "$51.66 Weekly Consumables / $24.60 Periodic Restock ($76.26 Combined Total)",
    description: "Authentic Brazilian Frango Grelhado (Churrasco Garlic-Marinated seared chicken) paired with Arroz e Feijão Preto (White Rice & Black Beans seasoned with garlic and bay leaf notes). Features morning Garlic & Scallion Scramble, Brazilian Café com Leite, Casein bowls, and Pão de Queijo (Cheese Bread Bites) reward treat!",
    meals: createMeals(
      "Brazil", "Brazilian Café com Leite", 95,
      "Brazilian Scallion & Garlic Egg Scramble + Arroz e Feijão",
      "3 Large White Eggs + 1/2 cup Liquid Egg Whites scrambled with green onions and garlic in 0-Cal spray. (330 kcal, 31g p, 15g f)",
      530, 36, 44, 15,
      "Brazilian Frango Grelhado (Churrasco Garlic Chicken)",
      "~5.7 oz Fresh Chicken Breast cubes marinated with garlic, lime, and salt, seared crisp. (210 kcal, 40g p, 2g f)",
      "Arroz e Feijão Preto (Brazilian White Rice & Black Beans)",
      "1 cup cooked White Rice paired with savory Goya Black Beans simmered with garlic and bay leaf. (200 kcal, 5g p, 44g c)",
      440, 47, 50, 2,
      "1 cup", 120, 21,
      "Pão de Queijo (Crispy Brazilian Cheese Bread Bites) & Frango",
      "3 Golden Pão de Queijo (tapioca cheese bread bites) paired with 4 oz Frango Grelhado! (360 kcal, 28g p, 32g c, 10g f)",
      360, 28, 32, 10, false
    )
  },
  {
    id: "plan-brazil-bulking",
    title: "Brazil Bulking: Frango Grelhado & DOUBLE Arroz e Feijão Preto Lean Bulk (~2,680 kcal)",
    country: "Brazil Bulking",
    flag: "🇧🇷🔥",
    badge: "🔥 Phase 2: Brazilian Lean Bulk ($51.54/Wk)",
    targetDailyCalories: 2680,
    targetDailyProtein: 188,
    estCostPerWeek: "$51.54 Weekly Consumables / $24.60 Periodic Restock ($76.14 Combined Total)",
    description: "Brazilian Phase 2 Lean Bulking! Features Frango Grelhado with DOUBLE Arroz e Feijão Preto, 5-Egg Scramble + Rolled Oats, Café com Leite, and Pão de Queijo reward treat!",
    meals: createMeals(
      "Brazil Bulking", "Brazilian Café com Leite", 95,
      "5-Egg Garlic Scramble + Rolled Oats + Café com Leite",
      "5 Large White Eggs scrambled with green onions and garlic in 0-cal spray. (350 kcal, 30g p, 25g f)",
      500, 35, 54, 25,
      "Brazilian Frango Grelhado",
      "~5.7 oz Fresh Chicken Breast seared crisp with garlic and lime notes. (210 kcal, 40g p, 2g f)",
      "DOUBLE Arroz e Feijão Preto",
      "2 cups cooked White Rice and Black Beans (rich Brazilian bulking power). (400 kcal, 10g p, 88g c)",
      640, 52, 94, 2,
      "1 cup", 120, 21,
      "Pão de Queijo & Frango Grelhado",
      "3 Golden Pão de Queijo bites paired with 4 oz seared chicken! (360 kcal, 28g p, 32g c, 10g f)",
      360, 28, 32, 10, true
    )
  },

  // 7. China 🇨🇳 (Cutting & Bulking)
  {
    id: "plan-china",
    title: "China: Crispy Five-Spice Garlic Soy Chicken, Egg Fried Rice (Chao Fan) & Oolong Tea Shred (~2,080 kcal)",
    country: "China",
    flag: "🇨🇳",
    badge: "🇨🇳 Authentic Chinese Phase 1 Cutting ($51.52/Wk)",
    targetDailyCalories: 2080,
    targetDailyProtein: 178,
    estCostPerWeek: "$51.52 Weekly Consumables / $24.60 Periodic Restock ($76.12 Combined Total)",
    description: "Authentic Chinese Crispy Five-Spice Garlic Soy Chicken paired with Egg Fried Rice & Veggies (Chao Fan with peas, carrots, and scallions) and Garlic Soy Steamed Broccoli. Features morning Scallion Scramble, Oolong/Green Tea, Casein bowls, and Crispy Chicken Lo Mein reward treat!",
    meals: createMeals(
      "China", "Hot Oolong or Green Tea con Leche", 95,
      "Chinese Scallion Egg Scramble + Chao Fan (Egg Fried Rice)",
      "3 Large White Eggs + 1/2 cup Liquid Egg Whites scrambled with generous chopped scallions and a drop of soy sauce in 0-Cal spray. (330 kcal, 31g p, 15g f)",
      530, 36, 44, 15,
      "Crispy Five-Spice Garlic Soy Chicken",
      "~5.7 oz Fresh Chicken Breast cubes coated with Corn Starch, Chinese Five Spice, garlic powder & a splash of soy sauce, wok/pan seared super crispy. (210 kcal, 40g p, 2g f)",
      "Chao Fan (Egg Fried Rice with Peas & Carrots)",
      "1 cup cooked Chao Fan (White rice stir-fried with peas, carrots, scallions, and egg spray). (200 kcal, 5g p, 44g c)",
      440, 47, 50, 2,
      "1 cup", 120, 21,
      "Crispy Chicken Lo Mein or Spring Rolls",
      "Savory bowl of Chicken Lo Mein noodles tossed with 4 oz five-spice crispy chicken and scallions! (360 kcal, 28g p, 32g c, 10g f)",
      360, 28, 32, 10, false
    )
  },
  {
    id: "plan-china-bulking",
    title: "China Bulking: Five-Spice Chicken & DOUBLE Egg Fried Rice (Chao Fan) Lean Bulk (~2,680 kcal)",
    country: "China Bulking",
    flag: "🇨🇳🔥",
    badge: "🔥 Phase 2: Chinese Lean Bulk ($51.48/Wk)",
    targetDailyCalories: 2680,
    targetDailyProtein: 188,
    estCostPerWeek: "$51.48 Weekly Consumables / $24.60 Periodic Restock ($76.08 Combined Total)",
    description: "Chinese Phase 2 Lean Bulking! Features Five-Spice Chicken with DOUBLE Egg Fried Rice (Chao Fan), 5-Egg Scallion Scramble + Rolled Oats, Oolong Tea, and Lo Mein reward treat!",
    meals: createMeals(
      "China Bulking", "Hot Oolong or Green Tea con Leche", 95,
      "5-Egg Scallion Scramble + Rolled Oats + Oolong Tea",
      "5 Large White Eggs scrambled with green onions and soy notes in 0-cal spray. (350 kcal, 30g p, 25g f)",
      500, 35, 54, 25,
      "Crispy Five-Spice Garlic Soy Chicken",
      "~5.7 oz Fresh Chicken Breast seared crispy with five-spice and garlic soy glaze. (210 kcal, 40g p, 2g f)",
      "DOUBLE Chao Fan (Egg Fried Rice)",
      "2 cups cooked Egg Fried Rice with peas, carrots, and scallions (massive wok bulking fuel). (400 kcal, 10g p, 88g c)",
      640, 52, 94, 2,
      "1 cup", 120, 21,
      "Crispy Chicken Lo Mein Bowl",
      "Lo Mein noodles paired with 4 oz five-spice crispy chicken! (360 kcal, 28g p, 32g c, 10g f)",
      360, 28, 32, 10, true
    )
  },

  // 8. Korea 🇰🇷 (Cutting & Bulking)
  {
    id: "plan-korea",
    title: "Korea: Crispy Gochujang Garlic Chicken, Steamed Rice & Kimchi Broccoli Shred (~2,080 kcal)",
    country: "Korea",
    flag: "🇰🇷",
    badge: "🇰🇷 Authentic Korean Phase 1 Cutting ($51.66/Wk)",
    targetDailyCalories: 2080,
    targetDailyProtein: 178,
    estCostPerWeek: "$51.66 Weekly Consumables / $24.60 Periodic Restock ($76.26 Combined Total)",
    description: "Authentic Korean Crispy Gochujang Honey-Garlic Chicken paired with Steamed White Rice, Kimchi / Sesame Broccoli, and Gyeran-mari inspired Scallion Scramble. Features Korean Green Tea / Americano, Casein bowls, and Korean Fried Chicken Bowl reward treat!",
    meals: createMeals(
      "Korea", "Korean Green Tea or Americano con Leche", 95,
      "Gyeran-mari Inspired Scallion Egg Scramble + Steamed Rice",
      "3 Large White Eggs + 1/2 cup Liquid Egg Whites folded with chopped scallions and sesame notes in 0-Cal spray. (330 kcal, 31g p, 15g f)",
      530, 36, 44, 15,
      "Crispy Gochujang Garlic Chicken",
      "~5.7 oz Fresh Chicken Breast cubes seared super crispy with corn starch and tossed with 1 tsp Gochujang pepper glaze and garlic powder. (210 kcal, 40g p, 2g f)",
      "Steamed White Rice & Kimchi / Sesame Broccoli",
      "1 cup cooked White Rice paired with steamed broccoli and a forkful of tangy kimchi. (200 kcal, 5g p, 44g c)",
      440, 47, 50, 2,
      "1 cup", 120, 21,
      "Crispy Korean Fried Chicken Bowl with Rice",
      "4 oz super crispy Korean Gochujang fried chicken over steamed rice with sesame seeds! (360 kcal, 28g p, 32g c, 10g f)",
      360, 28, 32, 10, false
    )
  },
  {
    id: "plan-korea-bulking",
    title: "Korea Bulking: Gochujang Garlic Chicken & DOUBLE Steamed Rice & Kimchi Lean Bulk (~2,680 kcal)",
    country: "Korea Bulking",
    flag: "🇰🇷🔥",
    badge: "🔥 Phase 2: Korean Lean Bulk ($51.54/Wk)",
    targetDailyCalories: 2680,
    targetDailyProtein: 188,
    estCostPerWeek: "$51.54 Weekly Consumables / $24.60 Periodic Restock ($76.14 Combined Total)",
    description: "Korean Phase 2 Lean Bulking! Features Gochujang Chicken with DOUBLE Steamed Rice & Kimchi, 5-Egg Gyeran-mari Scramble + Rolled Oats, Green Tea, and Korean Fried Chicken reward treat!",
    meals: createMeals(
      "Korea Bulking", "Korean Green Tea or Americano con Leche", 95,
      "5-Egg Gyeran-mari Scramble + Rolled Oats + Green Tea",
      "5 Large White Eggs folded with scallions and sesame notes. (350 kcal, 30g p, 25g f)",
      500, 35, 54, 25,
      "Crispy Gochujang Garlic Chicken",
      "~5.7 oz Fresh Chicken Breast seared crispy with Gochujang and garlic. (210 kcal, 40g p, 2g f)",
      "DOUBLE Steamed Rice & Kimchi",
      "2 cups cooked White Rice paired with kimchi and broccoli (clean Korean bulking carbs). (400 kcal, 10g p, 88g c)",
      640, 52, 94, 2,
      "1 cup", 120, 21,
      "Crispy Korean Fried Chicken Bowl",
      "4 oz Gochujang crispy chicken over rice! (360 kcal, 28g p, 32g c, 10g f)",
      360, 28, 32, 10, true
    )
  },

  // 9. Japan 🇯🇵 (Restored & Refined Cutting & Bulking)
  {
    id: "plan-japan",
    title: "Japan: Pan/Oven Crispy Teriyaki Chicken, Steamed Rice & Matcha Latte Shred Blueprint (~2,080 kcal)",
    country: "Japan",
    flag: "🇯🇵",
    badge: "🇯🇵 Authentic Japanese Phase 1 Cutting ($50.96/Wk)",
    targetDailyCalories: 2080,
    targetDailyProtein: 178,
    estCostPerWeek: "$50.96 Weekly Consumables / $24.60 Periodic Restock ($75.56 Combined Total)",
    description: "Authentic Japanese Crispy Teriyaki Chicken paired with Steamed White Rice and Garlic/Ginger Steamed Broccoli. Features morning Scallion Scramble, Jade Leaf Matcha Green Tea Latte, Casein bowls, and Nissin Raoh Soy Sauce Ramen with Crispy Teriyaki Chicken reward treat!",
    meals: createMeals(
      "Japan", "Jade Leaf Matcha Green Tea Latte", 95,
      "Japanese Scallion Egg Scramble + Steamed Rice",
      "3 Large White Eggs + 1/2 cup Liquid Egg Whites folded with scallions and a dash of soy sauce in 0-Cal spray. (330 kcal, 31g p, 15g f)",
      530, 36, 44, 15,
      "Crispy Japanese Teriyaki Chicken",
      "~5.7 oz Fresh Chicken Breast cubes coated with corn starch, seared golden and glazed with 1 tsp Kikkoman Teriyaki sauce and ginger. (210 kcal, 40g p, 2g f)",
      "Steamed White Rice & Ginger Broccoli",
      "1 cup cooked White Rice paired with steamed broccoli seasoned with ginger and garlic. (200 kcal, 5g p, 44g c)",
      440, 47, 50, 2,
      "1 cup", 120, 21,
      "Nissin Raoh Umami Soy Sauce Ramen with Crispy Chicken",
      "1 Pack Nissin Raoh Umami Soy Sauce Ramen served piping hot with 4 oz Crispy Teriyaki Chicken and scallions! (360 kcal, 28g p, 32g c, 10g f)",
      360, 28, 32, 10, false
    )
  },
  {
    id: "plan-japan-bulking",
    title: "Japan Bulking: Crispy Teriyaki Chicken & DOUBLE Steamed Rice Lean Bulk (~2,680 kcal)",
    country: "Japan Bulking",
    flag: "🇯🇵🔥",
    badge: "🔥 Phase 2: Japanese Lean Bulk ($49.34/Wk)",
    targetDailyCalories: 2680,
    targetDailyProtein: 188,
    estCostPerWeek: "$49.34 Weekly Consumables / $24.60 Periodic Restock ($73.94 Combined Total)",
    description: "Japanese Phase 2 Lean Bulking! Features Crispy Teriyaki Chicken with DOUBLE Steamed Rice, 5-Egg Scallion Scramble + Rolled Oats, Matcha Latte, and Nissin Raoh Ramen reward treat!",
    meals: createMeals(
      "Japan Bulking", "Jade Leaf Matcha Green Tea Latte", 95,
      "5-Egg Scallion Scramble + Rolled Oats + Matcha Latte",
      "5 Large White Eggs folded with scallions and soy notes. (350 kcal, 30g p, 25g f)",
      500, 35, 54, 25,
      "Crispy Japanese Teriyaki Chicken",
      "~5.7 oz Fresh Chicken Breast seared golden with Teriyaki glaze. (210 kcal, 40g p, 2g f)",
      "DOUBLE Steamed White Rice",
      "2 cups cooked White Rice and ginger broccoli (clean Japanese bulking glycogen). (400 kcal, 10g p, 88g c)",
      640, 52, 94, 2,
      "1 cup", 120, 21,
      "Nissin Raoh Ramen with Crispy Chicken",
      "Nissin Raoh Umami Soy Sauce Ramen paired with 4 oz crispy chicken! (360 kcal, 28g p, 32g c, 10g f)",
      360, 28, 32, 10, true
    )
  },

  // 10. Italy 🇮🇹 (Cutting & Bulking)
  {
    id: "plan-italy",
    title: "Italy: Pollo alle Erbe, Penne / Arroz all'Aglio & Espresso Cortato Shred Blueprint (~2,080 kcal)",
    country: "Italy",
    flag: "🇮🇹",
    badge: "🇮🇹 Authentic Italian Phase 1 Cutting ($51.46/Wk)",
    targetDailyCalories: 2080,
    targetDailyProtein: 178,
    estCostPerWeek: "$51.46 Weekly Consumables / $24.60 Periodic Restock ($76.06 Combined Total)",
    description: "Authentic Italian Pollo alle Erbe (Crispy Italian Herb & Garlic Baked Chicken) paired with Penne Rigate / Arroz all'Aglio (Herb & Garlic Pasta/Rice) and Marinara Steamed Broccoli. Features morning Italian Herb Scallion Scramble, Italian Espresso Cortato, Casein bowls, and Crispy Garlic Bread with Pollo alla Marinara reward treat!",
    meals: createMeals(
      "Italy", "Italian Espresso Cortato con Leche", 95,
      "Italian Herb Scallion Egg Scramble + Penne/Arroz all'Aglio",
      "3 Large White Eggs + 1/2 cup Liquid Egg Whites scrambled with scallions, oregano, and Italian herbs in 0-Cal spray. (330 kcal, 31g p, 15g f)",
      530, 36, 44, 15,
      "Crispy Italian Pollo alle Erbe",
      "~5.7 oz Fresh Chicken Breast cubes dipped in Liquid Egg Whites, coated with corn starch, garlic powder, oregano & basil, baked crispy at 400°F. (210 kcal, 40g p, 2g f)",
      "Penne Rigate / Arroz all'Aglio (Italian Herb Pasta or Rice)",
      "1 cup cooked Penne pasta or White Rice tossed with garlic, herbs, and a spoonful of traditional marinara. (200 kcal, 5g p, 44g c)",
      440, 47, 50, 2,
      "1 cup", 120, 21,
      "Crispy Garlic Bread with Pollo alla Marinara y Queso",
      "2 slices of toasted garlic bread served with 4 oz crispy herb chicken smothered in marinara! (360 kcal, 28g p, 32g c, 10g f)",
      360, 28, 32, 10, false
    )
  },
  {
    id: "plan-italy-bulking",
    title: "Italy Bulking: Pollo alle Erbe & DOUBLE Penne/Arroz all'Aglio Lean Bulk (~2,680 kcal)",
    country: "Italy Bulking",
    flag: "🇮🇹🔥",
    badge: "🔥 Phase 2: Italian Lean Bulk ($51.44/Wk)",
    targetDailyCalories: 2680,
    targetDailyProtein: 188,
    estCostPerWeek: "$51.44 Weekly Consumables / $24.60 Periodic Restock ($76.04 Combined Total)",
    description: "Italian Phase 2 Lean Bulking! Features Pollo alle Erbe with DOUBLE Penne/Arroz all'Aglio, 5-Egg Italian Herb Scramble + Rolled Oats, Espresso Cortato, and Garlic Bread reward treat!",
    meals: createMeals(
      "Italy Bulking", "Italian Espresso Cortato con Leche", 95,
      "5-Egg Italian Herb Scramble + Rolled Oats + Espresso",
      "5 Large White Eggs scrambled with oregano, basil, and scallions in 0-cal spray. (350 kcal, 30g p, 25g f)",
      500, 35, 54, 25,
      "Crispy Italian Pollo alle Erbe",
      "~5.7 oz Fresh Chicken Breast baked crispy with Italian herbs and garlic. (210 kcal, 40g p, 2g f)",
      "DOUBLE Penne Rigate / Arroz all'Aglio",
      "2 cups cooked Penne or Rice with marinara and herbs (rich Italian bulking carbs). (400 kcal, 10g p, 88g c)",
      640, 52, 94, 2,
      "1 cup", 120, 21,
      "Crispy Garlic Bread & Pollo alla Marinara",
      "Toasted garlic bread slices paired with 4 oz herb chicken and marinara! (360 kcal, 28g p, 32g c, 10g f)",
      360, 28, 32, 10, true
    )
  },

  // 11. El Salvador 🇸🇻 (Cutting & Bulking)
  {
    id: "plan-el-salvador",
    title: "El Salvador: Pollo Encebollado, Casamiento & Dark Roast Coffee Shred Blueprint (~2,080 kcal)",
    country: "El Salvador",
    flag: "🇸🇻",
    badge: "🇸🇻 Authentic Salvadoran Phase 1 Cutting ($51.66/Wk)",
    targetDailyCalories: 2080,
    targetDailyProtein: 178,
    estCostPerWeek: "$51.66 Weekly Consumables / $24.60 Periodic Restock ($76.26 Combined Total)",
    description: "Authentic Salvadoran Pollo Encebollado (Sared Chicken with sautéed onions, tomatoes, and Worcestershire/garlic notes) paired with Casamiento (White Rice & Black/Red Beans pan-fried with garlic and onion). Features morning Salvadoran Scallion & Tomato Scramble, Salvadoran Dark Roast Coffee, Casein bowls, and Crispy Pupusas de Queso y Frijol reward treat!",
    meals: createMeals(
      "El Salvador", "Salvadoran Dark Roast Coffee con Leche", 95,
      "Salvadoran Scallion & Tomato Egg Scramble + Casamiento",
      "3 Large White Eggs + 1/2 cup Liquid Egg Whites scrambled with chopped tomatoes and scallions in 0-Cal spray. (330 kcal, 31g p, 15g f)",
      530, 36, 44, 15,
      "Salvadoran Pollo Encebollado (Sared Onion Chicken)",
      "~5.7 oz Fresh Chicken Breast seared crisp and sautéed with onions, tomatoes, garlic, and a splash of Worcestershire sauce. (210 kcal, 40g p, 2g f)",
      "Casamiento (Salvadoran Pan-Fried Rice & Beans)",
      "1 cup cooked Casamiento (White rice and red/black beans pan-fried together with garlic and onion notes). (200 kcal, 5g p, 44g c)",
      440, 47, 50, 2,
      "1 cup", 120, 21,
      "Crispy Pupusas de Queso y Frijol with Curtido",
      "2 Golden toasted Salvadoran Pupusas (corn masa stuffed with cheese/beans) paired with 4 oz Pollo Encebollado and tangy Curtido slaw! (360 kcal, 28g p, 32g c, 10g f)",
      360, 28, 32, 10, false
    )
  },
  {
    id: "plan-el-salvador-bulking",
    title: "El Salvador Bulking: Pollo Encebollado & DOUBLE Casamiento Lean Bulk (~2,680 kcal)",
    country: "El Salvador Bulking",
    flag: "🇸🇻🔥",
    badge: "🔥 Phase 2: Salvadoran Lean Bulk ($51.54/Wk)",
    targetDailyCalories: 2680,
    targetDailyProtein: 188,
    estCostPerWeek: "$51.54 Weekly Consumables / $24.60 Periodic Restock ($76.14 Combined Total)",
    description: "Salvadoran Phase 2 Lean Bulking! Features Pollo Encebollado with DOUBLE Casamiento, 5-Egg Salvadoran Scramble + Rolled Oats, Dark Roast Coffee, and Crispy Pupusas reward treat!",
    meals: createMeals(
      "El Salvador Bulking", "Salvadoran Dark Roast Coffee con Leche", 95,
      "5-Egg Salvadoran Scramble + Rolled Oats + Coffee",
      "5 Large White Eggs scrambled with tomatoes and scallions in 0-cal spray. (350 kcal, 30g p, 25g f)",
      500, 35, 54, 25,
      "Salvadoran Pollo Encebollado",
      "~5.7 oz Fresh Chicken Breast seared crisp with onions and Worcestershire notes. (210 kcal, 40g p, 2g f)",
      "DOUBLE Casamiento (Pan-Fried Rice & Beans)",
      "2 cups cooked Casamiento (savory rice and bean blend for intense bulking energy). (400 kcal, 10g p, 88g c)",
      640, 52, 94, 2,
      "1 cup", 120, 21,
      "Crispy Pupusas de Queso y Frijol & Pollo",
      "2 Golden Pupusas topped with 4 oz chicken and Curtido! (360 kcal, 28g p, 32g c, 10g f)",
      360, 28, 32, 10, true
    )
  },

  // 12. Venezuela 🇻🇪 (Cutting & Bulking)
  {
    id: "plan-venezuela",
    title: "Venezuela: Pollo Mechado, Arroz y Caraotas Negras & Guayoyo Shred Blueprint (~2,080 kcal)",
    country: "Venezuela",
    flag: "🇻🇪",
    badge: "🇻🇪 Authentic Venezuelan Phase 1 Cutting ($51.66/Wk)",
    targetDailyCalories: 2080,
    targetDailyProtein: 178,
    estCostPerWeek: "$51.66 Weekly Consumables / $24.60 Periodic Restock ($76.26 Combined Total)",
    description: "Authentic Venezuelan Pollo Mechado / Pechuga Guisada (Shredded/Sared Chicken with sweet pepper, onion, and garlic sofrito) paired with Arroz Blanco y Caraotas Negras (White Rice & Black Beans seasoned with cumin and garlic). Features morning Perico Venezolano (scrambled eggs with onions and sweet peppers), Venezuelan Café Guayoyo con Leche, Casein bowls, and Arepas Venezolanas Rellenas reward treat!",
    meals: createMeals(
      "Venezuela", "Venezuelan Café Guayoyo con Leche", 95,
      "Perico Venezolano (Scallion, Pepper & Tomato Scramble) + Arroz y Caraotas",
      "3 Large White Eggs + 1/2 cup Liquid Egg Whites scrambled with sweet peppers, onions, and tomatoes in 0-Cal spray. (330 kcal, 31g p, 15g f)",
      530, 36, 44, 15,
      "Venezuelan Pollo Mechado / Pechuga Guisada",
      "~5.7 oz Fresh Chicken Breast simmered/seared with sweet pepper, onion, garlic, cumin, and sofrito notes. (210 kcal, 40g p, 2g f)",
      "Arroz Blanco y Caraotas Negras (White Rice & Black Beans)",
      "1 cup cooked White Rice paired with Goya Black Beans (Caraotas Negras) seasoned with cumin and garlic. (200 kcal, 5g p, 44g c)",
      440, 47, 50, 2,
      "1 cup", 120, 21,
      "Arepas Venezolanas Rellenas de Pollo y Queso",
      "2 Golden toasted Venezuelan Arepas stuffed with 4 oz juicy Pollo Mechado and a pinch of cheese! (360 kcal, 28g p, 32g c, 10g f)",
      360, 28, 32, 10, false
    )
  },
  {
    id: "plan-venezuela-bulking",
    title: "Venezuela Bulking: Pollo Mechado & DOUBLE Arroz y Caraotas Negras Lean Bulk (~2,680 kcal)",
    country: "Venezuela Bulking",
    flag: "🇻🇪🔥",
    badge: "🔥 Phase 2: Venezuelan Lean Bulk ($51.54/Wk)",
    targetDailyCalories: 2680,
    targetDailyProtein: 188,
    estCostPerWeek: "$51.54 Weekly Consumables / $24.60 Periodic Restock ($76.14 Combined Total)",
    description: "Venezuelan Phase 2 Lean Bulking! Features Pollo Mechado with DOUBLE Arroz y Caraotas Negras, 5-Egg Perico Venezolano + Rolled Oats, Café Guayoyo, and Arepas Rellenas reward treat!",
    meals: createMeals(
      "Venezuela Bulking", "Venezuelan Café Guayoyo con Leche", 95,
      "5-Egg Perico Venezolano + Rolled Oats + Café Guayoyo",
      "5 Large White Eggs scrambled with sweet peppers, onions, and tomatoes in 0-cal spray. (350 kcal, 30g p, 25g f)",
      500, 35, 54, 25,
      "Venezuelan Pollo Mechado",
      "~5.7 oz Fresh Chicken Breast simmered with sweet pepper sofrito and cumin. (210 kcal, 40g p, 2g f)",
      "DOUBLE Arroz Blanco y Caraotas Negras",
      "2 cups cooked White Rice and Black Beans (rich Venezuelan bulking nutrition). (400 kcal, 10g p, 88g c)",
      640, 52, 94, 2,
      "1 cup", 120, 21,
      "Arepas Rellenas de Pollo y Queso",
      "2 Golden Arepas stuffed with 4 oz Pollo Mechado! (360 kcal, 28g p, 32g c, 10g f)",
      360, 28, 32, 10, true
    )
  },

  // 13. Argentina 🇦🇷 (Cutting & Bulking)
  {
    id: "plan-argentina",
    title: "Argentina: Pollo al Chimichurri, Arroz con Ajo y Laurel & Yerba Mate Shred (~2,080 kcal)",
    country: "Argentina",
    flag: "🇦🇷",
    badge: "🇦🇷 Authentic Argentine Phase 1 Cutting ($51.48/Wk)",
    targetDailyCalories: 2080,
    targetDailyProtein: 178,
    estCostPerWeek: "$51.48 Weekly Consumables / $24.60 Periodic Restock ($76.08 Combined Total)",
    description: "Authentic Argentine Pollo al Chimichurri (Crispy Pan-Sared Chicken smothered in garlic, parsley, oregano, red pepper flakes, and olive oil/vinegar herbs) paired with Arroz con Ajo y Laurel (Garlic & Bay Leaf White Rice) and Steamed Broccoli. Features morning Scallion & Herb Scramble, Argentine Yerba Mate / Café Cortado, Casein bowls, and Crispy Milanesa de Pollo al Horno reward treat!",
    meals: createMeals(
      "Argentina", "Argentine Yerba Mate or Cortado con Leche", 95,
      "Argentine Herb & Scallion Egg Scramble + Arroz con Ajo",
      "3 Large White Eggs + 1/2 cup Liquid Egg Whites scrambled with green onions, parsley, and garlic notes in 0-Cal spray. (330 kcal, 31g p, 15g f)",
      530, 36, 44, 15,
      "Crispy Argentine Pollo al Chimichurri",
      "~5.7 oz Fresh Chicken Breast cubes seared golden and tossed with 1 tbsp authentic Chimichurri herb blend (garlic, parsley, oregano, red pepper flakes, vinegar & olive oil spray). (210 kcal, 40g p, 2g f)",
      "Arroz con Ajo y Laurel (Garlic & Bay Leaf White Rice)",
      "1 cup cooked White Rice simmered with fresh garlic cloves and a fragrant bay leaf. (200 kcal, 5g p, 44g c)",
      440, 47, 50, 2,
      "1 cup", 120, 21,
      "Crispy Milanesa de Pollo al Horno with Garlic Rice",
      "Crispy oven-baked Argentine Milanesa de Pollo (chicken cutlet lightly breaded/coated with herbs) served over garlic rice and broccoli! (360 kcal, 28g p, 32g c, 10g f)",
      360, 28, 32, 10, false
    )
  },
  {
    id: "plan-argentina-bulking",
    title: "Argentina Bulking: Pollo al Chimichurri & DOUBLE Arroz con Ajo y Laurel Lean Bulk (~2,680 kcal)",
    country: "Argentina Bulking",
    flag: "🇦🇷🔥",
    badge: "🔥 Phase 2: Argentine Lean Bulk ($51.44/Wk)",
    targetDailyCalories: 2680,
    targetDailyProtein: 188,
    estCostPerWeek: "$51.44 Weekly Consumables / $24.60 Periodic Restock ($76.04 Combined Total)",
    description: "Argentine Phase 2 Lean Bulking! Features Pollo al Chimichurri with DOUBLE Arroz con Ajo y Laurel, 5-Egg Herb Scramble + Rolled Oats, Yerba Mate / Cortado, and Milanesa de Pollo reward treat!",
    meals: createMeals(
      "Argentina Bulking", "Argentine Yerba Mate or Cortado con Leche", 95,
      "5-Egg Herb Scramble + Rolled Oats + Yerba Mate",
      "5 Large White Eggs scrambled with parsley, garlic notes, and scallions in 0-cal spray. (350 kcal, 30g p, 25g f)",
      500, 35, 54, 25,
      "Crispy Argentine Pollo al Chimichurri",
      "~5.7 oz Fresh Chicken Breast seared golden and smothered in Chimichurri herbs and garlic. (210 kcal, 40g p, 2g f)",
      "DOUBLE Arroz con Ajo y Laurel",
      "2 cups cooked Garlic & Bay Leaf White Rice (clean Argentine bulking carbohydrates). (400 kcal, 10g p, 88g c)",
      640, 52, 94, 2,
      "1 cup", 120, 21,
      "Crispy Milanesa de Pollo al Horno",
      "Oven-baked Milanesa de Pollo paired with garlic rice and chimichurri! (360 kcal, 28g p, 32g c, 10g f)",
      360, 28, 32, 10, true
    )
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
  { name: "Goya Adobo All-Purpose Seasoning (8 oz shaker)", category: "Seasonings & Spices", price: "$2.18", note: "The #1 Puerto Rican garlic/oregano/pepper base seasoning for Pollo al Horno." },
  { name: "Goya Sazón con Culantro y Achiote (20 packets)", category: "Seasonings & Spices", price: "$3.48", note: "Gives Arroz con Gandules and chicken vibrant orange color and authentic culantro flavor." },
  { name: "Goya Sofrito Cooking Base (12 oz jar)", category: "Seasonings & Spices", price: "$3.28", note: "Essential aromatic green sofrito for sautéing rice and morning egg scrambles." },
  { name: "Café Bustelo Espresso Ground Coffee (10 oz brick)", category: "Essentials", price: "$4.88", note: "Authentic dark roast espresso brewed fresh every morning at 8:00 AM for clean pre-workout focus!" },
  { name: "Great Value 2% Reduced Fat Milk (64 fl oz / 1/2 Gal)", category: "Essentials", price: "$1.68", note: "Creamy milk whisked with national coffee/tea for your morning energy boost!" },
  { name: "Great Value Garlic Powder (3.4 oz bottle)", category: "Seasonings & Spices", price: "$1.18", note: "Essential zero-calorie savory garlic seasoning for chicken and broccoli across all cuisines." },
  { name: "Great Value 0-Calorie Canola Oil Cooking Spray", category: "Seasonings & Spices", price: "$2.24", note: "Fat-free searing for national chicken recipes and morning egg scrambling." },
  { name: "Great Value Zero Calorie Sweetener Packets (100 ct)", category: "Seasonings & Spices", price: "$2.18", note: "Sweetens morning coffee/tea and afternoon Greek yogurt with zero sugar calories." },
  { name: "Argo 100% Pure Corn Starch (16 oz box)", category: "Seasonings & Spices", price: "$1.78", note: "Lightly coat chicken cubes for super crispy national chicken recipes." },
  // Groceries & Protein Staples
  { name: "Fresh Chicken Breasts (~5.0 lb Family Tray / 80 oz raw)", category: "Protein", price: "$13.40", note: "Primary lean protein staple (~5.0 lb tray at $2.68/lb) across all 13 cuisines." },
  { name: "Great Value Large Grade A White Eggs (36 Count Tray)", category: "Protein", price: "$6.84", note: "36 eggs guaranteed (3-5 eggs/day for national scrambles plus extras!)." },
  { name: "Great Value Plain Nonfat Greek Yogurt (FOUR 32 oz tubs / 128 oz total)", category: "Protein", price: "$15.92", note: "FOUR tubs (128 oz / 1 Gallon total) for Phase 1 Cutting afternoon & bedtime snacks!" },
  { name: "Great Value Plain Nonfat Greek Yogurt (THREE 32 oz tubs / 96 oz total)", category: "Protein", price: "$11.94", note: "THREE tubs (96 oz / 12 cups total) for Phase 2 Lean Bulking afternoon & bedtime snacks!" },
  { name: "Great Value 100% Liquid Egg Whites (32 oz carton)", category: "Protein", price: "$3.48", note: "Pure protein booster for scrambles and protein egg wash binder for crispy chicken." },
  { name: "Great Value Old Fashioned Rolled Oats (42 oz canister)", category: "Carbs", price: "$3.98", note: "Slow-digesting complex carbs for bulking morning energy alongside 5-egg scrambles." },
  { name: "Fresh Bananas (~2 lb bunch / ~6-7 bananas)", category: "Produce", price: "$1.16", note: "Quick potassium and pre-workout carbohydrates right before morning training." },
  { name: "Goya Green Pigeon Peas / Beans (15 oz can)", category: "Produce", price: "$1.58", note: "National legume staples (Gandules, Black Beans, Red Beans) for rice dishes." },
  { name: "Great Value Long Grain White Rice (2 lb bag)", category: "Carbs", price: "$1.48", note: "Clean fast-digesting carbohydrates for Phase 1 Cutting national rice dishes." },
  { name: "Great Value Long Grain White Rice (5 lb bag)", category: "Carbs", price: "$3.34", note: "Huge 5 lb bulk bag of clean carbohydrates for double Phase 2 Bulking rice portions." },
  { name: "Great Value Frozen Broccoli Florets (TWO 4 lb bags / 8 lbs total)", category: "Produce", price: "$4.64", note: "Two massive 4 lb bags (8 lbs total) steamed/seasoned with herbs across all cuisines." },
  { name: "Fresh Green Onions / Scallions / Cilantro (Two Bunches)", category: "Produce", price: "$1.56", note: "Fresh aromatic garnish and sofrito enhancement for national scrambles and bowls." },
  { name: "Goya Frozen Tostones / Corn Tortillas / Arepas / Pupusas Base", category: "Carbs", price: "$3.48", note: "Your once-a-week authentic national reward treat meal base!" }
];

export const NATIONAL_CUISINES_LIST = [
  { name: 'Puerto Rico', flag: '🇵🇷', cuttingKey: '🇵🇷 Puerto Rico', bulkingKey: '🇵🇷🔥 Puerto Rico Bulking' },
  { name: 'Spain', flag: '🇪🇸', cuttingKey: '🇪🇸 Spain', bulkingKey: '🇪🇸🔥 Spain Bulking' },
  { name: 'Mexico', flag: '🇲🇽', cuttingKey: '🇲🇽 Mexico', bulkingKey: '🇲🇽🔥 Mexico Bulking' },
  { name: 'Dominican Republic', flag: '🇩🇴', cuttingKey: '🇩🇴 Dominican Republic', bulkingKey: '🇩🇴🔥 Dominican Republic Bulking' },
  { name: 'Colombia', flag: '🇨🇴', cuttingKey: '🇨🇴 Colombia', bulkingKey: '🇨🇴🔥 Colombia Bulking' },
  { name: 'Brazil', flag: '🇧🇷', cuttingKey: '🇧🇷 Brazil', bulkingKey: '🇧🇷🔥 Brazil Bulking' },
  { name: 'China', flag: '🇨🇳', cuttingKey: '🇨🇳 China', bulkingKey: '🇨🇳🔥 China Bulking' },
  { name: 'Korea', flag: '🇰🇷', cuttingKey: '🇰🇷 Korea', bulkingKey: '🇰🇷🔥 Korea Bulking' },
  { name: 'Japan', flag: '🇯🇵', cuttingKey: '🇯🇵 Japan', bulkingKey: '🇯🇵🔥 Japan Bulking' },
  { name: 'Italy', flag: '🇮🇹', cuttingKey: '🇮🇹 Italy', bulkingKey: '🇮🇹🔥 Italy Bulking' },
  { name: 'El Salvador', flag: '🇸🇻', cuttingKey: '🇸🇻 El Salvador', bulkingKey: '🇸🇻🔥 El Salvador Bulking' },
  { name: 'Venezuela', flag: '🇻🇪', cuttingKey: '🇻🇪 Venezuela', bulkingKey: '🇻🇪🔥 Venezuela Bulking' },
  { name: 'Argentina', flag: '🇦🇷', cuttingKey: '🇦🇷 Argentina', bulkingKey: '🇦🇷🔥 Argentina Bulking' }
];

export function getPlanHtmlFilename(countryOrPlan: string | { country: string; id?: string }): string {
  const country = typeof countryOrPlan === 'string' ? countryOrPlan : countryOrPlan.country;
  const map: Record<string, string> = {
    'Puerto Rico': 'Puerto_Rico_Cutting_Meal_Plan.html',
    'Puerto Rico Bulking': 'Puerto_Rico_Bulking_Meal_Plan.html',
    '🇵🇷 Puerto Rico': 'Puerto_Rico_Cutting_Meal_Plan.html',
    '🇵🇷🔥 Puerto Rico Bulking': 'Puerto_Rico_Bulking_Meal_Plan.html',
    'Spain': 'Spain_Cutting_Meal_Plan.html',
    'Spain Bulking': 'Spain_Bulking_Meal_Plan.html',
    '🇪🇸 Spain': 'Spain_Cutting_Meal_Plan.html',
    '🇪🇸🔥 Spain Bulking': 'Spain_Bulking_Meal_Plan.html',
    'Mexico': 'Mexico_Cutting_Meal_Plan.html',
    'Mexico Bulking': 'Mexico_Bulking_Meal_Plan.html',
    '🇲🇽 Mexico': 'Mexico_Cutting_Meal_Plan.html',
    '🇲🇽🔥 Mexico Bulking': 'Mexico_Bulking_Meal_Plan.html',
    'Dominican Republic': 'Dominican_Republic_Cutting_Meal_Plan.html',
    'Dominican Republic Bulking': 'Dominican_Republic_Bulking_Meal_Plan.html',
    '🇩🇴 Dominican Republic': 'Dominican_Republic_Cutting_Meal_Plan.html',
    '🇩🇴🔥 Dominican Republic Bulking': 'Dominican_Republic_Bulking_Meal_Plan.html',
    'Colombia': 'Colombia_Cutting_Meal_Plan.html',
    'Colombia Bulking': 'Colombia_Bulking_Meal_Plan.html',
    '🇨🇴 Colombia': 'Colombia_Cutting_Meal_Plan.html',
    '🇨🇴🔥 Colombia Bulking': 'Colombia_Bulking_Meal_Plan.html',
    'Brazil': 'Brazil_Cutting_Meal_Plan.html',
    'Brazil Bulking': 'Brazil_Bulking_Meal_Plan.html',
    '🇧🇷 Brazil': 'Brazil_Cutting_Meal_Plan.html',
    '🇧🇷🔥 Brazil Bulking': 'Brazil_Bulking_Meal_Plan.html',
    'China': 'China_Cutting_Meal_Plan.html',
    'China Bulking': 'China_Bulking_Meal_Plan.html',
    '🇨🇳 China': 'China_Cutting_Meal_Plan.html',
    '🇨🇳🔥 China Bulking': 'China_Bulking_Meal_Plan.html',
    'Korea': 'Korea_Cutting_Meal_Plan.html',
    'Korea Bulking': 'Korea_Bulking_Meal_Plan.html',
    '🇰🇷 Korea': 'Korea_Cutting_Meal_Plan.html',
    '🇰🇷🔥 Korea Bulking': 'Korea_Bulking_Meal_Plan.html',
    'Japan': 'Japan_Cutting_Meal_Plan.html',
    'Japan Bulking': 'Japan_Bulking_Meal_Plan.html',
    '🇯🇵 Japan': 'Japan_Cutting_Meal_Plan.html',
    '🇯🇵🔥 Japan Bulking': 'Japan_Bulking_Meal_Plan.html',
    'Italy': 'Italy_Cutting_Meal_Plan.html',
    'Italy Bulking': 'Italy_Bulking_Meal_Plan.html',
    '🇮🇹 Italy': 'Italy_Cutting_Meal_Plan.html',
    '🇮🇹🔥 Italy Bulking': 'Italy_Bulking_Meal_Plan.html',
    'El Salvador': 'El_Salvador_Cutting_Meal_Plan.html',
    'El Salvador Bulking': 'El_Salvador_Bulking_Meal_Plan.html',
    '🇸🇻 El Salvador': 'El_Salvador_Cutting_Meal_Plan.html',
    '🇸🇻🔥 El Salvador Bulking': 'El_Salvador_Bulking_Meal_Plan.html',
    'Venezuela': 'Venezuela_Cutting_Meal_Plan.html',
    'Venezuela Bulking': 'Venezuela_Bulking_Meal_Plan.html',
    '🇻🇪 Venezuela': 'Venezuela_Cutting_Meal_Plan.html',
    '🇻🇪🔥 Venezuela Bulking': 'Venezuela_Bulking_Meal_Plan.html',
    'Argentina': 'Argentina_Cutting_Meal_Plan.html',
    'Argentina Bulking': 'Argentina_Bulking_Meal_Plan.html',
    '🇦🇷 Argentina': 'Argentina_Cutting_Meal_Plan.html',
    '🇦🇷🔥 Argentina Bulking': 'Argentina_Bulking_Meal_Plan.html'
  };
  return '/' + (map[country] || 'Puerto_Rico_Cutting_Meal_Plan.html');
}

