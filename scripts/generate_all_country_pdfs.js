const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const publicDir = path.join(__dirname, '..', 'public');
const tsPath = path.join(__dirname, '..', 'src', 'lib', 'grocery-data.ts');

console.log("Loading and compiling src/lib/grocery-data.ts in memory...");
const tsCode = fs.readFileSync(tsPath, 'utf8');
const jsCode = ts.transpileModule(tsCode, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
}).outputText;

const m = { exports: {} };
const fn = new Function('module', 'exports', 'require', jsCode);
fn(m, m.exports, require);

const { MEAL_PREP_PLANS, AUBURN_LEWISTON_GROCERY_ITEMS, NATIONAL_CUISINES_LIST, getPlanHtmlFilename } = m.exports;

console.log(`Loaded ${MEAL_PREP_PLANS.length} meal prep blueprints and ${AUBURN_LEWISTON_GROCERY_ITEMS.length} grocery items.`);

function isPeriodicRestock(item) {
  if (item.category === 'Seasonings & Spices') return true;
  const lowerName = item.name.toLowerCase();
  const lowerNote = item.coachNote.toLowerCase();
  if (
    lowerName.includes('coffee') ||
    lowerName.includes('cooking spray') ||
    lowerName.includes('sweetener') ||
    lowerName.includes('corn starch') ||
    lowerName.includes('reward') ||
    lowerName.includes('treat') ||
    lowerName.includes('tostones') ||
    lowerName.includes('ramen') ||
    lowerName.includes('matcha') ||
    lowerName.includes('teriyaki') ||
    lowerName.includes('soy sauce') ||
    lowerName.includes('adobo') ||
    lowerName.includes('sazón') ||
    lowerName.includes('sofrito') ||
    lowerName.includes('gochujang') ||
    lowerName.includes('sesame oil') ||
    lowerName.includes('chimichurri') ||
    lowerName.includes('arepa') ||
    lowerName.includes('yerba mate') ||
    lowerName.includes('salsa') ||
    lowerNote.includes('periodic') ||
    lowerNote.includes('restock') ||
    lowerNote.includes('once-a-week') ||
    lowerNote.includes('reward treat') ||
    lowerNote.includes('last between')
  ) {
    return true;
  }
  return false;
}

function generatePlanHtml(plan) {
  const isBulking = plan.country.includes('Bulking');
  const baseCountry = isBulking ? plan.country.replace(' Bulking', '') : plan.country;
  
  const title = `${plan.flag} ${plan.title} (${plan.estCostPerWeek.split(' ')[0]})`;
  const subtitle = isBulking ? `🔥 Phase 2: Post-160 Lb Lean Bulk Blueprint (${plan.estCostPerWeek})` : `⭐ Phase 1: S-Rank Cutting Blueprint (${plan.estCostPerWeek})`;
  
  const dailyCals = `${plan.targetDailyCalories} kcal`;
  const dailyProtein = `${plan.targetDailyProtein}g Protein`;
  const weeklyCost = plan.estCostPerWeek;
  const restockCost = "~$25.00 Periodic Restock Range";
  
  // Find matching items from AUBURN_LEWISTON_GROCERY_ITEMS
  const planItems = AUBURN_LEWISTON_GROCERY_ITEMS.filter(item => item.cuisine && item.cuisine.includes(plan.country));
  
  const weeklyConsumables = planItems.filter(item => !isPeriodicRestock(item));
  const periodicRestocks = planItems.filter(item => isPeriodicRestock(item));

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - Printable PDF</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&family=JetBrains+Mono:wght@500;700&display=swap');

    :root {
      --primary: #00f0ff;
      --gold: #ffd700;
      --dark: #0a0e17;
      --card: #131b2e;
      --text: #f1f5f9;
      --muted: #94a3b8;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      background-color: var(--dark);
      color: var(--text);
      margin: 0;
      padding: 40px 20px;
      line-height: 1.6;
    }

    .container {
      max-width: 880px;
      margin: 0 auto;
      background: linear-gradient(135deg, #131b2e 0%, #0d1322 100%);
      border: 2px solid rgba(0, 240, 255, 0.3);
      border-radius: 20px;
      padding: 40px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 240, 255, 0.1);
    }

    .header {
      border-bottom: 2px solid rgba(255, 255, 255, 0.1);
      padding-bottom: 25px;
      margin-bottom: 30px;
      position: relative;
    }

    .sub-badge {
      display: inline-block;
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: var(--gold);
      background: rgba(255, 215, 0, 0.1);
      border: 1px solid rgba(255, 215, 0, 0.3);
      padding: 4px 12px;
      border-radius: 6px;
      margin-bottom: 12px;
    }

    h1 {
      font-size: 28px;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin: 0 0 15px 0;
      color: #fff;
      text-shadow: 0 0 20px rgba(0, 240, 255, 0.4);
    }

    .stats-bar {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
      margin-top: 20px;
    }

    .stat-pill {
      background: rgba(0, 0, 0, 0.4);
      border: 1px solid rgba(0, 240, 255, 0.3);
      padding: 10px 18px;
      border-radius: 10px;
      font-family: 'JetBrains Mono', monospace;
    }

    .stat-label {
      font-size: 10px;
      text-transform: uppercase;
      color: var(--muted);
      font-weight: 700;
      letter-spacing: 1px;
    }

    .stat-value {
      font-size: 14px;
      font-weight: 700;
      color: var(--primary);
    }

    .stat-pill.cost {
      border-color: rgba(255, 215, 0, 0.5);
    }
    .stat-pill.cost .stat-value {
      color: var(--gold);
    }

    .description {
      font-size: 14px;
      color: #cbd5e1;
      background: rgba(0, 240, 255, 0.05);
      border-left: 4px solid var(--primary);
      padding: 15px 20px;
      border-radius: 0 8px 8px 0;
      margin-bottom: 35px;
    }

    h2 {
      font-size: 19px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #fff;
      margin-top: 35px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .meal-card {
      background: rgba(0, 0, 0, 0.35);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 14px;
      padding: 22px;
      margin-bottom: 18px;
      transition: border-color 0.2s;
    }

    .meal-card:hover {
      border-color: rgba(0, 240, 255, 0.4);
    }

    .meal-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 12px;
      flex-wrap: wrap;
      gap: 10px;
    }

    .meal-title {
      font-size: 17px;
      font-weight: 800;
      color: #fff;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .meal-time {
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px;
      font-weight: 700;
      color: var(--primary);
      background: rgba(0, 240, 255, 0.1);
      padding: 4px 10px;
      border-radius: 6px;
      border: 1px solid rgba(0, 240, 255, 0.2);
    }

    .meal-macros {
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px;
      color: var(--gold);
      margin-bottom: 15px;
      background: rgba(255, 255, 255, 0.03);
      padding: 8px 14px;
      border-radius: 8px;
      font-weight: 700;
    }

    ul.ingredients {
      margin: 0;
      padding-left: 20px;
      color: #cbd5e1;
      font-size: 13.5px;
    }

    ul.ingredients li {
      margin-bottom: 8px;
    }

    ul.ingredients li strong {
      color: #fff;
    }

    .grocery-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 12px;
      margin-top: 15px;
    }

    .grocery-item {
      display: flex;
      align-items: flex-start;
      gap: 14px;
      background: rgba(0, 0, 0, 0.3);
      border: 1px solid rgba(255, 255, 255, 0.07);
      padding: 14px 18px;
      border-radius: 10px;
    }

    .checkbox {
      width: 20px;
      height: 20px;
      border: 2px solid var(--primary);
      border-radius: 6px;
      margin-top: 2px;
      flex-shrink: 0;
    }

    .item-name {
      font-weight: 700;
      color: #fff;
      font-size: 14.5px;
    }

    .item-price {
      font-family: 'JetBrains Mono', monospace;
      font-size: 13px;
      color: var(--gold);
      margin-top: 2px;
    }

    .item-note {
      font-size: 12.5px;
      color: var(--muted);
      margin-top: 4px;
    }

    .footer {
      margin-top: 50px;
      padding-top: 25px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      text-align: center;
      font-size: 12px;
      color: var(--muted);
      font-family: 'JetBrains Mono', monospace;
    }

    @media print {
      body {
        background-color: #fff;
        color: #000;
        padding: 0;
      }
      .container {
        border: none;
        box-shadow: none;
        background: #fff;
        padding: 20px;
        max-width: 100%;
      }
      h1, .meal-title, h2, .item-name {
        color: #000;
        text-shadow: none;
      }
      .sub-badge, .meal-time, .meal-macros, .stat-pill, .description, .meal-card, .grocery-item {
        background: #f8fafc !important;
        border: 1px solid #cbd5e1 !important;
        color: #0f172a !important;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      .stat-value, .item-price {
        color: #0284c7 !important;
      }
      ul.ingredients li strong, .item-name {
        color: #000 !important;
      }
      .checkbox {
        border-color: #334155;
      }
    }
  </style>
</head>
<body>

  <div class="container">
    <div class="header">
      <div class="sub-badge">⚡ HUNTER NICK CROSSON • S-RANK NUTRITION BLUEPRINT</div>
      <h1>${title}</h1>
      
      <div class="stats-bar">
        <div class="stat-pill">
          <div class="stat-label">Target Calories</div>
          <div class="stat-value">${dailyCals}</div>
        </div>
        <div class="stat-pill">
          <div class="stat-label">Daily Protein</div>
          <div class="stat-value">${dailyProtein}</div>
        </div>
        <div class="stat-pill cost">
          <div class="stat-label">Est. Weekly Cost</div>
          <div class="stat-value">${weeklyCost}</div>
        </div>
        <div class="stat-pill cost">
          <div class="stat-label">Periodic Restock</div>
          <div class="stat-value">${restockCost}</div>
        </div>
      </div>
    </div>

    <div class="description">
      <strong>${subtitle}:</strong> ${plan.description} All groceries validated and priced specifically for Auburn Maine Walmart Supercenter ($50 regular budget target). Follow this exact daily checklist to maintain 100% ingredient parity across your weekly batch prep!
    </div>

    <h2>📋 Daily Meal Timeline & Recipes</h2>
    ${plan.meals.map(meal => `
    <div class="meal-card">
      <div class="meal-header">
        <div class="meal-title">🍽️ ${meal.name}</div>
        <div class="meal-time">🕒 ${meal.time}</div>
      </div>
      <div class="meal-macros">
        🔥 Calories: ${meal.calories} kcal | 💪 Protein: ${meal.protein}g | 🥖 Carbs: ${meal.carbs}g | 🥑 Fat: ${meal.fat}g
      </div>
      <ul class="ingredients">
        ${meal.ingredients.map(ing => `<li>• ${ing}</li>`).join('\n        ')}
      </ul>
    </div>`).join('\n    ')}

    <h2>🛒 Section 1: Weekly Core Replenishment List (${weeklyCost})</h2>
    <p style="font-size: 13px; color: var(--muted); margin-top: -10px; margin-bottom: 20px;">
      Pick up these core fresh proteins, eggs, dairy, and produce items every Monday at Auburn Maine Walmart Supercenter.
    </p>

    <div class="grocery-grid">
      ${weeklyConsumables.map(item => `
      <div class="grocery-item">
        <div class="checkbox"></div>
        <div>
          <div class="item-name">${item.name}</div>
          <div class="item-price">${item.priceEst}</div>
          <div class="item-note">${item.coachNote}</div>
        </div>
      </div>`).join('\n      ')}
    </div>

    <h2>🧂 Section 2: Periodic Monday Pantry & Restock List (${restockCost})</h2>
    <p style="font-size: 13px; color: var(--muted); margin-top: -10px; margin-bottom: 20px;">
      These shelf-stable spices, coffee, cooking sprays, and reward treats last multiple weeks. Check your kitchen pantry every Sunday and only pick up what is low during your Auburn Walmart trip!
    </p>

    <div class="grocery-grid">
      ${periodicRestocks.map(item => `
      <div class="grocery-item">
        <div class="checkbox"></div>
        <div>
          <div class="item-name">${item.name}</div>
          <div class="item-price">${item.priceEst}</div>
          <div class="item-note">${item.coachNote}</div>
        </div>
      </div>`).join('\n      ')}
    </div>

    <div class="footer">
      <strong>BETTER LEVELING V2 - S-RANK HUNTER SYSTEM</strong><br>
      Created for Hunter Nick Crosson (ncrossonofficial06@gmail.com)<br>
      Target Weight: 160 LBS • ${baseCountry} National Cuisine Directive
    </div>
  </div>

</body>
</html>`;
}

function run() {
  console.log(`Generating ${MEAL_PREP_PLANS.length} standalone printable HTML blueprints in ${publicDir}...`);
  
  MEAL_PREP_PLANS.forEach(plan => {
    const filename = getPlanHtmlFilename(plan.country).replace(/^\//, '');
    const filepath = path.join(publicDir, filename);
    const htmlContent = generatePlanHtml(plan);
    fs.writeFileSync(filepath, htmlContent, 'utf8');
    console.log(`✓ Generated: ${filename}`);

    // Backwards compatibility aliases for Puerto Rico
    if (plan.country === 'Puerto Rico') {
      fs.writeFileSync(path.join(publicDir, 'Puerto_Rican_Meal_Plan_Under_50.html'), htmlContent, 'utf8');
    } else if (plan.country === 'Puerto Rico Bulking') {
      fs.writeFileSync(path.join(publicDir, 'Puerto_Rican_Bulking_Meal_Plan_Under_50.html'), htmlContent, 'utf8');
    }
  });

  console.log(`\n🎉 Successfully generated all ${MEAL_PREP_PLANS.length} national cuisine blueprints!`);
}

run();
