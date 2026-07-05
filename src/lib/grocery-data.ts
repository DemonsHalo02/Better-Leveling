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
    priceEst: "$9.94 (3 lb family pack - $3.31/lb)",
    calories: 120,
    protein: 26,
    carbs: 0,
    fat: 1.5,
    servingSize: "4 oz (112g)",
    coachNote: "Your primary lean muscle builder. Marinate with Adobo, Sazón, and garlic for mouthwatering Puerto Rican Pollo Guisado."
  },
  {
    id: "g-2",
    upc: "078742123459", // Ground Turkey / Pork
    name: "Great Value 93% Lean Ground Turkey",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Protein",
    priceEst: "$4.48 (1 lb pack)",
    calories: 160,
    protein: 22,
    carbs: 0,
    fat: 8,
    servingSize: "4 oz (112g raw)",
    coachNote: "Make high-protein, lean Picadillo estilo boricua! Sauté with onions, peppers, and tomato sauce over medium heat using 0-cal spray."
  },
  {
    id: "g-3",
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
    coachNote: "Make breakfast Revoltillo al estilo boricua! Scramble with peppers, onions, and Adobo in zero-calorie cooking spray."
  },
  {
    id: "g-4",
    upc: "078742352217", // Great Value Rice
    name: "Great Value Long Grain White or Jasmine Rice",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Carbs",
    priceEst: "$3.48 (5 lb bag)",
    calories: 160,
    protein: 3,
    carbs: 36,
    fat: 0,
    servingSize: "1/4 cup dry (45g)",
    coachNote: "Clean, fast-digesting carbohydrates. Pair with Pollo Guisado and Habichuelas 90 minutes before your workout for maximum pump."
  },
  {
    id: "g-5",
    upc: "078742370129", // Red Kidney Beans (3 cans)
    name: "Great Value Dark Red Kidney Beans (Habichuelas - 3 Cans)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Carbs",
    priceEst: "$2.64 ($0.88 per 15 oz can x 3)",
    calories: 110,
    protein: 7,
    carbs: 20,
    fat: 0.5,
    servingSize: "1/2 cup (130g)",
    coachNote: "Essential for Habichuelas Guisadas! Packed with fiber and slow-digesting complex carbs that keep you full and energized."
  },
  {
    id: "g-6",
    upc: "078742098764", // Sweet / Green Plantains
    name: "Great Value Sweet Plantains (Maduros) or Green Plantains",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value / Goya",
    category: "Carbs",
    priceEst: "$2.48 (11 oz bag or fresh)",
    calories: 140,
    protein: 1,
    carbs: 32,
    fat: 2,
    servingSize: "1/2 cup (85g)",
    coachNote: "Authentic Puerto Rican staple! Air fry or bake using zero-calorie spray instead of deep frying to enjoy Tostones or Maduros guilt-free."
  },
  {
    id: "g-7",
    upc: "078742136039", // Greek Yogurt / Milk
    name: "Great Value Plain Nonfat Greek Yogurt or Low-Fat Milk",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Protein",
    priceEst: "$3.54 (32 oz tub)",
    calories: 90,
    protein: 16,
    carbs: 6,
    fat: 0,
    servingSize: "3/4 cup (170g)",
    coachNote: "High-protein anabolic hack! Use as a creamy base for your morning Café con Leche smoothie or as a high-protein dip for maduros."
  },
  {
    id: "g-8",
    upc: "078742232427", // Oats
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
    coachNote: "Make Avena Estilo Boricua! Cook with cinnamon, vanilla extract, and protein powder for an authentic, anabolic Puerto Rican breakfast."
  },
  {
    id: "g-9",
    upc: "074471000501", // Café Bustelo
    name: "Café Bustelo Dark Roast Espresso Ground Coffee",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Café Bustelo / Great Value",
    category: "Essentials",
    priceEst: "$3.98 (10 oz brick)",
    calories: 5,
    protein: 0,
    carbs: 1,
    fat: 0,
    servingSize: "1 tbsp ground (6g)",
    coachNote: "Authentic Puerto Rican espresso! Prepare Café con Leche style using low-fat milk or whey protein and zero-calorie sweetener for clean morning energy."
  },
  {
    id: "g-10",
    upc: "078742010834", // Zero Cal Cooking Spray
    name: "Great Value Canola Zero Calorie Cooking Spray",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Essentials",
    priceEst: "$2.24 (8 oz aerosol can)",
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    servingSize: "1 spray (0.25G)",
    coachNote: "Essential 0-calorie hack for frying Tostones, sautéing sofrito, and searing chicken or turkey without adding unnecessary oil calories."
  },
  {
    id: "g-11",
    upc: "041331031307", // Adobo Goya
    name: "Goya Adobo All-Purpose Seasoning with Cumin",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Goya",
    category: "Essentials",
    priceEst: "$1.98 (8 oz bottle)",
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    servingSize: "1/4 tsp (1g)",
    coachNote: "The foundation of Puerto Rican flavor! Zero calories, zero sugar. Generously season your meats, eggs, and habichuelas."
  },
  {
    id: "g-12",
    upc: "041331030010", // Sazón Goya
    name: "Goya Sazón with Coriander & Annatto (Culantro y Achiote)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Goya",
    category: "Essentials",
    priceEst: "$1.68 (8 packet box)",
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    servingSize: "1 packet (5g)",
    coachNote: "Gives your Pollo Guisado, Picadillo, and yellow rice that vibrant Puerto Rican color and authentic savory taste for zero calories."
  },
  {
    id: "g-13",
    upc: "078742088884", // Peppers & Onions Sofrito base
    name: "Great Value Frozen Peppers & Onions Blend (Sofrito Base)",
    store: "Walmart Supercenter (Auburn, ME)",
    brand: "Great Value",
    category: "Produce",
    priceEst: "$2.48 (16 oz bag)",
    calories: 25,
    protein: 1,
    carbs: 5,
    fat: 0,
    servingSize: "3/4 cup (85g)",
    coachNote: "Zero-prep instant sofrito base! Sauté with garlic and Sazón using 0-cal spray to build rich flavor for all your stews and beans."
  }
];

export const MEAL_PREP_PLANS: MealPrepPlan[] = [
  {
    id: "plan-1",
    title: "Puerto Rican High-Protein Cutting Blueprint (~2,650 kcal)",
    targetDailyCalories: 2650,
    targetDailyProtein: 195,
    estCostPerWeek: "$45.38 total at Auburn Walmart",
    description: "Designed specifically for your 242 lb -> 170 lb goal. Enjoy authentic Puerto Rican flavors (Pollo Guisado, Picadillo, Habichuelas, and Café con Leche) prepared with zero-calorie spray and budget staples under $50!",
    meals: [
      {
        name: "Breakfast: Avena Boricua & Café con Leche",
        time: "8:00 AM",
        ingredients: [
          "1 cup Great Value Old Fashioned Oats cooked with cinnamon & vanilla (300 kcal, 10g p)",
          "1 scoop Whey Protein Powder mixed into oats (120 kcal, 24g p)",
          "1 large mug Café Bustelo Espresso with 1/2 cup low-fat milk/yogurt & zero-cal sweetener (60 kcal, 6g p)",
          "2 Great Value Large Eggs scrambled (Revoltillo) using zero-cal cooking spray (140 kcal, 12g p)"
        ],
        calories: 620,
        protein: 52,
        carbs: 64,
        fat: 14
      },
      {
        name: "Lunch: Pollo Guisado con Arroz y Habichuelas",
        time: "12:30 PM",
        ingredients: [
          "8 oz Great Value Chicken Breast stewed with Sazón, Adobo & garlic (240 kcal, 52g p)",
          "1.5 cups cooked Great Value White or Jasmine Rice (300 kcal, 68g c)",
          "3/4 cup Great Value Habichuelas Guisadas (seasoned red kidney beans) (150 kcal, 9g p)",
          "Sautéed with Great Value Peppers & Onions sofrito in 0-cal cooking spray (25 kcal, 1g p)"
        ],
        calories: 715,
        protein: 64,
        carbs: 98,
        fat: 4
      },
      {
        name: "Pre / Post Workout Snack: Maduros con Dip Anabólico",
        time: "4:30 PM",
        ingredients: [
          "1 cup Sweet Plantains (Maduros or Tostones) air-fried with zero-cal spray (280 kcal, 2g p, 64g c)",
          "1 cup Great Value Nonfat Greek Yogurt mixed with vanilla/cinnamon (120 kcal, 22g p)",
          "1 oz almonds or walnuts on the side (170 kcal, 6g p, 14g f)"
        ],
        calories: 570,
        protein: 30,
        carbs: 70,
        fat: 16
      },
      {
        name: "Dinner: Picadillo de Pavo al Estilo Boricua",
        time: "7:30 PM",
        ingredients: [
          "7 oz Great Value 93% Lean Ground Turkey cooked with Sazón, Adobo & sofrito (280 kcal, 38g p)",
          "1 cup cooked Great Value White or Jasmine Rice (200 kcal, 45g c)",
          "1/2 cup Habichuelas Coloradas (red kidney beans) (100 kcal, 6g p)",
          "Side salad or extra peppers & onions sautéed in 0-cal spray (30 kcal, 1g p)"
        ],
        calories: 610,
        protein: 45,
        carbs: 68,
        fat: 12
      },
      {
        name: "Nighttime Recovery: Revoltillo Ligero o Yogurt Proteico",
        time: "10:30 PM",
        ingredients: [
          "3/4 cup Great Value Greek Yogurt topped with cinnamon or 1 Casein Shake (90 kcal, 16g p)",
          "Optional: Decaf Café Bustelo or herbal tea with zero-cal sweetener (5 kcal)"
        ],
        calories: 95,
        protein: 16,
        carbs: 6,
        fat: 0
      }
    ]
  }
];
