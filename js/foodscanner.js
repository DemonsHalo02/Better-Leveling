// ============================================
// SYSTEM — FOOD SCANNER & NUTRITION PAGE
// ============================================

let scanner = null;
let scannedFood = null;

// ===== RENDER NUTRITION PAGE =====
function renderNutritionPage() {
  const el = document.getElementById('page-nutrition');
  let html = `
    <div class="section-head">FOOD SCANNER</div>
    <div class="sys-card" style="margin-bottom:14px">
      <div id="scanner-container" style="position:relative;width:100%;height:200px;background:#111;border-radius:8px;overflow:hidden;margin-bottom:12px">
        <video id="scanner-video" style="width:100%;height:100%;object-fit:cover"></video>
        <div id="scanner-overlay" style="position:absolute;inset:0;border:2px dashed var(--accent);border-radius:8px;pointer-events:none"></div>
      </div>
      <button class="btn-primary" onclick="startScanner()">▶ SCAN BARCODE</button>
      <button class="btn-secondary" onclick="stopScanner()" style="margin-left:6px">■ STOP SCANNER</button>
      <div id="scan-status" style="font-family:var(--font-mono);font-size:11px;color:var(--text3);margin-top:8px;min-height:16px"></div>
    </div>

    <div class="section-head">SELECTED FOOD</div>
    <div class="sys-card" id="food-details" style="min-height:80px;text-align:center;color:var(--text3);font-family:var(--font-mono)">No food scanned yet</div>
  `;
  el.innerHTML = html;
}

// ===== START SCANNER =====
async function startScanner() {
  const status = document.getElementById('scan-status');
  status.textContent = 'Initializing camera...';

  try {
    const video = document.getElementById('scanner-video');
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
    video.srcObject = stream;
    video.play();

    // Initialize barcode scanner
    if (!scanner) {
      scanner = new BarcodeDetector({ formats: ['ean_13', 'ean_8', 'upc_a', 'upc_e'] });
    }

    status.textContent = 'Point camera at a barcode...';
    scanLoop();
  } catch (err) {
    status.textContent = '[ ERROR ] Unable to access camera';
    console.error(err);
  }
}

// ===== STOP SCANNER =====
function stopScanner() {
  const video = document.getElementById('scanner-video');
  if (video.srcObject) {
    video.srcObject.getTracks().forEach(t => t.stop());
    video.srcObject = null;
  }
  document.getElementById('scan-status').textContent = 'Scanner stopped';
}

// ===== SCAN LOOP =====
async function scanLoop() {
  if (!scanner) return;
  const video = document.getElementById('scanner-video');
  const status = document.getElementById('scan-status');

  try {
    const barcodes = await scanner.detect(video);
    if (barcodes.length > 0) {
      const code = barcodes[0].rawValue;
      status.textContent = `Scanned: ${code}`;
      stopScanner();
      fetchFoodData(code);
      return;
    }
  } catch (err) {
    console.warn('Barcode detection failed', err);
  }

  requestAnimationFrame(scanLoop);
}

// ===== FETCH FOOD DATA (MOCK OR API) =====
async function fetchFoodData(barcode) {
  const details = document.getElementById('food-details');
  details.textContent = 'Fetching food info...';

  // Replace with real API if desired (USDA or OpenFoodFacts)
  // Here we use OpenFoodFacts
  try {
    const res = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
    const data = await res.json();
    if (data.status === 1) {
      const product = data.product;
      scannedFood = {
        name: product.product_name || 'Unknown',
        calories: product.nutriments['energy-kcal_100g'] || 0,
        protein: product.nutriments['proteins_100g'] || 0,
        carbs: product.nutriments['carbohydrates_100g'] || 0,
        fat: product.nutriments['fat_100g'] || 0
      };
      renderSelectedFood();
    } else {
      details.textContent = 'Food not found in database';
      scannedFood = null;
    }
  } catch (err) {
    console.error(err);
    details.textContent = '[ ERROR ] Failed to fetch food data';
    scannedFood = null;
  }
}

// ===== RENDER SELECTED FOOD =====
function renderSelectedFood() {
  const details = document.getElementById('food-details');
  if (!scannedFood) return;
  details.innerHTML = `
    <div style="font-size:14px;font-weight:600;color:var(--text);margin-bottom:4px">${scannedFood.name}</div>
    <div style="display:flex;gap:6px;justify-content:center;flex-wrap:wrap">
      <span class="stat-pill pill-gold">${scannedFood.calories} kcal</span>
      <span class="stat-pill" style="background:#00b4ff22;border:1px solid #00b4ff44;color:#00b4ff">P ${scannedFood.protein}g</span>
      <span class="stat-pill" style="background:#f0c04022;border:1px solid #f0c04044;color:#f0c040">C ${scannedFood.carbs}g</span>
      <span class="stat-pill" style="background:#ff6b3522;border:1px solid #ff6b3544;color:#ff6b35">F ${scannedFood.fat}g</span>
    </div>
    <button class="btn-gold" style="margin-top:10px" onclick="logSelectedFood()">LOG FOOD</button>
  `;
}

// ===== LOG FOOD =====
function logSelectedFood() {
  if (!scannedFood) return showNotif('[ ERROR ] No food selected');
  HUNTER.nutrition = HUNTER.nutrition || [];
  HUNTER.nutrition.push({
    ...scannedFood,
    date: new Date().toLocaleDateString()
  });
  showNotif(`[ LOGGED ] ${scannedFood.name} +${scannedFood.calories} kcal`, 'green');
  scannedFood = null;
  document.getElementById('food-details').textContent = 'No food scanned yet';
}

// ===== TEXT SEARCH (OPTIONAL) =====
async function searchFoodByName(name) {
  const details = document.getElementById('food-details');
  if (!name) return;
  details.textContent = 'Searching...';
  try {
    const res = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(name)}&search_simple=1&action=process&json=1`);
    const data = await res.json();
    if (data.products && data.products.length > 0) {
      const product = data.products[0];
      scannedFood = {
        name: product.product_name || 'Unknown',
        calories: product.nutriments['energy-kcal_100g'] || 0,
        protein: product.nutriments['proteins_100g'] || 0,
        carbs: product.nutriments['carbohydrates_100g'] || 0,
        fat: product.nutriments['fat_100g'] || 0
      };
      renderSelectedFood();
    } else {
      details.textContent = 'No results found';
      scannedFood = null;
    }
  } catch (err) {
    console.error(err);
    details.textContent = '[ ERROR ] Search failed';
    scannedFood = null;
  }
}
