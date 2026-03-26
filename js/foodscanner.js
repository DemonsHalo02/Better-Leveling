// ============================================
// FOOD SYSTEM — SEARCH + MANUAL + LIST + BARCODE
// ============================================

// Track barcode scanner state
let barcodeActive = false;

// ===== MAIN PAGE RENDER =====
function renderNutritionPage() {
  const el = document.getElementById("page-nutrition");
  const log = HUNTER.foodLog || [];

  // Calculate totals
  let totals = { cal: 0, protein: 0, carbs: 0, fat: 0 };
  log.forEach(f => {
    totals.cal += f.cal;
    totals.protein += f.protein;
    totals.carbs += f.carbs;
    totals.fat += f.fat;
  });

  const goals = typeof getMacroGoals === "function"
    ? getMacroGoals()
    : { cal: 2000, protein: 150, carbs: 250, fat: 65 };

  const macros = [
    { label: "CALORIES", val: totals.cal, goal: goals.cal, unit: "kcal", color: "#00b4ff" },
    { label: "PROTEIN", val: totals.protein, goal: goals.protein, unit: "g", color: "#00e5a0" },
    { label: "CARBS", val: totals.carbs, goal: goals.carbs, unit: "g", color: "#f0c040" },
    { label: "FAT", val: totals.fat, goal: goals.fat, unit: "g", color: "#ff6b35" },
  ];

  // Food list options
  const foodOptions = FOOD_DB.map((f, i) =>
    `<option value="${i}">${f.name} · ${f.cal} kcal</option>`
  ).join("");

  // HTML structure
  let html = `
  <div class="section-head">MACRO TRACKER</div>
  <div class="sys-card macro-card">
  `;

  macros.forEach(m => {
    const pct = Math.min(100, Math.round((m.val / m.goal) * 100));
    html += `
      <div class="macro-row">
        <div class="macro-label">${m.label}</div>
        <div class="macro-track">
          <div class="macro-fill" style="width:${pct}%;background:${m.color}"></div>
        </div>
        <div class="macro-val">${m.val}/${m.goal}${m.unit}</div>
      </div>
    `;
  });

  html += `</div>

  <div class="section-head">LOG FOOD</div>
  <div class="sys-card food-card">

  <div class="food-mode-buttons">
    <button class="food-mode-btn active" id="mode-search" onclick="switchFoodMode('search')">🔍 SEARCH</button>
    <button class="food-mode-btn" id="mode-manual" onclick="switchFoodMode('manual')">✏️ MANUAL</button>
    <button class="food-mode-btn" id="mode-list" onclick="switchFoodMode('list')">📋 LIST</button>
    <button class="food-mode-btn" id="mode-barcode" onclick="switchFoodMode('barcode')">📦 BARCODE</button>
  </div>

  <!-- SEARCH -->
  <div id="food-mode-search">
    <input type="text" class="sys-input" id="food-search-input"
      placeholder="Search food..." oninput="filterFoodSearch(this.value)" />
    <div id="food-search-results" class="food-results"></div>
  </div>

  <!-- MANUAL -->
  <div id="food-mode-manual" style="display:none" class="food-manual">
    <input class="sys-input" id="manual-name" placeholder="Food name">
    <input class="sys-input" id="manual-cal" type="number" placeholder="Calories">
    <input class="sys-input" id="manual-protein" type="number" placeholder="Protein">
    <input class="sys-input" id="manual-carbs" type="number" placeholder="Carbs">
    <input class="sys-input" id="manual-fat" type="number" placeholder="Fat">
    <button class="btn-primary" onclick="logManualFood()">LOG FOOD</button>
  </div>

  <!-- LIST -->
  <div id="food-mode-list" style="display:none" class="food-list-mode">
    <select class="sys-input" id="food-select">
      <option value="">Choose food...</option>
      ${foodOptions}
    </select>
    <button class="btn-primary" onclick="logSelectedFood()">LOG FOOD</button>
  </div>

  <!-- BARCODE -->
  <div id="food-mode-barcode" style="display:none" class="food-barcode-mode">
    <div id="barcode-scanner"
      style="width:100%;height:260px;border:1px solid var(--border);border-radius:8px;margin-bottom:10px">
    </div>
    <div style="display:flex;gap:8px;">
      <button class="btn-primary" onclick="startBarcodeScanner()">START SCAN</button>
      <button class="btn-secondary" onclick="stopBarcodeScanner()">STOP SCAN</button>
    </div>
    <div style="margin-top:6px;font-size:0.9em;color:#888">Tip: Allow camera permissions</div>
  </div>

  </div>

  <div class="section-head">TODAY'S LOG</div>
  <div class="sys-card food-log-card">
  `;

  if (log.length === 0) {
    html += `<div style="text-align:center;padding:20px;color:#999">NO FOOD LOGGED</div>`;
  } else {
    log.slice().reverse().forEach(f => {
      html += `
      <div class="food-log-row">
        <div class="food-log-info">
          <div class="food-name">${f.name}</div>
          <div class="food-macros">P:${f.protein}g · C:${f.carbs}g · F:${f.fat}g</div>
        </div>
        <div class="food-cal">${f.cal} kcal</div>
      </div>
      `;
    });
  }

  html += `</div>`;

  el.innerHTML = html;
}

// ===== MODE SWITCHER =====
function switchFoodMode(mode) {
  ["search", "manual", "list", "barcode"].forEach(m => {
    const panel = document.getElementById("food-mode-" + m);
    const btn = document.getElementById("mode-" + m);
    if (!panel) return;

    panel.style.display = m === mode ? "block" : "none";
    if (btn) btn.classList.toggle("active", m === mode);
  });

  stopBarcodeScanner();
}

// ===== SEARCH =====
function filterFoodSearch(query) {
  const container = document.getElementById("food-search-results");
  if (!container) return;

  const q = query.toLowerCase();
  const results = FOOD_DB.filter(f => f.name.toLowerCase().includes(q)).slice(0, 30);

  container.innerHTML = results.map(f => {
    const index = FOOD_DB.indexOf(f);
    return `
      <div class="food-result-row" onclick="logFoodByIndex(${index})">
        <div class="food-name">${f.name}</div>
        <div class="food-cal">${f.cal} kcal</div>
      </div>
    `;
  }).join("");
}

function logFoodByIndex(index) {
  const food = FOOD_DB[index];
  addFoodEntry({ ...food, source: "search" });
  showNotif(`[ FOOD LOGGED ] ${food.name}`);
}

// ===== MANUAL =====
function logManualFood() {
  const name = document.getElementById("manual-name").value.trim();
  const cal = parseInt(document.getElementById("manual-cal").value) || 0;
  const protein = parseInt(document.getElementById("manual-protein").value) || 0;
  const carbs = parseInt(document.getElementById("manual-carbs").value) || 0;
  const fat = parseInt(document.getElementById("manual-fat").value) || 0;

  if (!name || cal <= 0) {
    showNotif("[ ENTER FOOD DATA ]");
    return;
  }

  addFoodEntry({ name, cal, protein, carbs, fat, source: "manual" });
  showNotif(`[ FOOD LOGGED ] ${name}`);
}

// ===== LIST =====
function logSelectedFood() {
  const sel = document.getElementById("food-select");
  const idx = parseInt(sel.value);

  if (isNaN(idx)) {
    showNotif("[ SELECT FOOD ]");
    return;
  }

  addFoodEntry({ ...FOOD_DB[idx], source: "list" });
  showNotif(`[ FOOD LOGGED ] ${FOOD_DB[idx].name}`);
}

// ============================================
// BARCODE SCANNER
// ============================================
function startBarcodeScanner() {
  if (barcodeActive) return;

  const scanner = document.getElementById("barcode-scanner");
  if (!scanner) return;

  barcodeActive = true;

  Quagga.init({
    inputStream: {
      type: "LiveStream",
      target: scanner,
      constraints: { facingMode: "environment" }
    },
    decoder: { readers: ["upc_reader", "ean_reader", "ean_8_reader"] }
  }, function (err) {
    if (err) {
      console.error("Quagga init error:", err);
      showNotif("[ CAMERA ERROR ]");
      barcodeActive = false;
      return;
    }
    Quagga.start();
  });

  Quagga.onDetected(function (result) {
    const code = result.codeResult.code;
    stopBarcodeScanner();
    lookupBarcode(code);
  });
}

function stopBarcodeScanner() {
  if (!barcodeActive) return;
  try { Quagga.stop(); } catch { }
  barcodeActive = false;
}

// ===== BARCODE LOOKUP =====
async function lookupBarcode(barcode) {
  showNotif("[ SCANNING PRODUCT ]");

  try {
    const res = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
    const data = await res.json();

    if (!data.product) {
      showNotif("[ PRODUCT NOT FOUND ]");
      return;
    }

    const product = data.product;
    const food = {
      name: product.product_name || "Unknown Food",
      cal: Math.round(product.nutriments?.energy_kcal_100g || 0),
      protein: Math.round(product.nutriments?.proteins_100g || 0),
      carbs: Math.round(product.nutriments?.carbohydrates_100g || 0),
      fat: Math.round(product.nutriments?.fat_100g || 0),
      source: "barcode"
    };

    addFoodEntry(food);
    showNotif(`[ FOOD LOGGED ] ${food.name}`);

  } catch (err) {
    console.error(err);
    showNotif("[ LOOKUP FAILED ]");
  }
}
