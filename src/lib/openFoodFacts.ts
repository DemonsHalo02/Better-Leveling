// OpenFoodFacts API integration for barcode lookup and food search
// Free, open database of over 3,000,000 food products worldwide

import { FoodItem } from '../types';

export interface OFFProductResponse {
  status: number;
  code: string;
  product?: {
    product_name?: string;
    brands?: string;
    serving_size?: string;
    serving_quantity?: number;
    nutriments?: {
      'energy-kcal_100g'?: number;
      'energy-kcal_serving'?: number;
      'energy-kcal'?: number;
      proteins_100g?: number;
      proteins_serving?: number;
      proteins?: number;
      carbohydrates_100g?: number;
      carbohydrates_serving?: number;
      carbohydrates?: number;
      fat_100g?: number;
      fat_serving?: number;
      fat?: number;
      fiber_100g?: number;
    };
  };
}

/**
 * Look up a product by its barcode (UPC / EAN)
 */
export async function lookupBarcode(barcode: string): Promise<FoodItem | null> {
  const cleanBarcode = barcode.trim();
  if (!cleanBarcode) return null;

  try {
    const url = `https://world.openfoodfacts.org/api/v2/product/${encodeURIComponent(cleanBarcode)}.json`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'BetterLeveling - Web/PWA Nutrition App',
      },
    });

    if (!response.ok) return null;

    const data: OFFProductResponse = await response.json();
    if (data.status !== 1 || !data.product) {
      return null;
    }

    const p = data.product;
    const n = p.nutriments || {};

    const name = p.product_name || 'Scanned Food';
    const brand = p.brands || undefined;

    // Determine serving size in grams (default to 100g if missing)
    const servingGrams = Number(p.serving_quantity) || 100;
    const servingUnit = p.serving_size || `${servingGrams}g`;

    // Extract macros per 100g or per serving
    let calories = 0;
    if (n['energy-kcal_100g'] !== undefined) {
      calories = n['energy-kcal_100g'];
    } else if (n['energy-kcal'] !== undefined) {
      calories = n['energy-kcal'];
    }

    const protein = n.proteins_100g ?? n.proteins ?? 0;
    const carbs = n.carbohydrates_100g ?? n.carbohydrates ?? 0;
    const fat = n.fat_100g ?? n.fat ?? 0;
    const fiber = n.fiber_100g;

    return {
      id: `off-${cleanBarcode}`,
      barcode: cleanBarcode,
      name,
      brand,
      servingSizeGrams: 100, // Normalized to 100g base for easy scaling
      servingUnit: servingUnit || '100g',
      calories: Math.round(calories),
      protein: Number(protein.toFixed(1)),
      carbs: Number(carbs.toFixed(1)),
      fat: Number(fat.toFixed(1)),
      fiber: fiber !== undefined ? Number(fiber.toFixed(1)) : undefined,
    };
  } catch (err) {
    console.error('OpenFoodFacts barcode lookup error:', err);
    return null;
  }
}

/**
 * Search OpenFoodFacts for food items by keyword
 */
export async function searchOpenFoodFacts(query: string, page: number = 1): Promise<FoodItem[]> {
  const cleanQuery = query.trim();
  if (!cleanQuery || cleanQuery.length < 2) return [];

  try {
    const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
      cleanQuery
    )}&search_simple=1&action=process&json=1&page=${page}&page_size=15`;

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'BetterLeveling - Web/PWA Nutrition App',
      },
    });

    if (!response.ok) return [];

    const data = await response.json();
    if (!data.products || !Array.isArray(data.products)) return [];

    const results: FoodItem[] = [];

    for (const p of data.products) {
      if (!p.product_name) continue;
      const n = p.nutriments || {};

      const cal = n['energy-kcal_100g'] ?? n['energy-kcal'] ?? 0;
      const prot = n.proteins_100g ?? n.proteins ?? 0;
      const carbs = n.carbohydrates_100g ?? n.carbohydrates ?? 0;
      const fat = n.fat_100g ?? n.fat ?? 0;

      // Skip items with zero nutritional data
      if (cal === 0 && prot === 0 && carbs === 0 && fat === 0) continue;

      results.push({
        id: `off-${p.code || Math.random().toString(36).substring(7)}`,
        barcode: p.code,
        name: p.product_name,
        brand: p.brands,
        servingSizeGrams: 100,
        servingUnit: p.serving_size || '100g',
        calories: Math.round(cal),
        protein: Number(prot.toFixed(1)),
        carbs: Number(carbs.toFixed(1)),
        fat: Number(fat.toFixed(1)),
        fiber: n.fiber_100g !== undefined ? Number(n.fiber_100g.toFixed(1)) : undefined,
      });
    }

    return results;
  } catch (err) {
    console.error('OpenFoodFacts search error:', err);
    return [];
  }
}
