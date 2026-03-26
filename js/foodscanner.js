// ============================================
// SYSTEM — FOOD SCANNER
// Text Search + Manual Entry
// ============================================

// ===== MAIN NUTRITION PAGE RENDERER =====
function renderNutritionPage() {
  const el = document.getElementById('page-nutrition');
  const log = HUNTER.foodLog || [];

  // Use HUNTER.settings if getSettings() doesn't exist
  const settings = (typeof HUNTER !== 'undefined' && HUNTER.settings) ? HUNTER.settings : { units: 'metric' };
  const isMetric = settings.units === 'metric';

  // Totals
  let totals = { cal: 0, protein: 0, carbs: 0, fat: 0 };
  log.forEach(f => { totals.cal += f.cal; totals.protein += f.protein; totals.carbs += f.carbs; totals.fat += f.fat; });

  // Barcode scanner button
  setTimeout(() => {
    const searchPanel = document.getElementById('food-mode-search');
    if (!searchPanel) return;
    if (!document.getElementById('barcode-btn')) {
      const btn = document.createElement('button');
      btn.id = 'barcode-btn';
      btn.className = 'btn-primary';
      btn.style.marginBottom = '8px';
      btn.innerHTML = '📷 SCAN BARCODE';
      btn.onclick = startBarcodeScanner;
      searchPanel.prepend(btn);
    }
  }, 50);

  // Macro tracker
  const goals = typeof getMacroGoals === 'function'
    ? getMacroGoals()
    : { cal: 2000, protein: 150, carbs: 250, fat: 65 };
  const macros = [
    { label: 'CALORIES', val: totals.cal, goal: goals.cal, unit: 'kcal', color: '#00b4ff' },
    { label: 'PROTEIN', val: totals.protein, goal: goals.protein, unit: isMetric ? 'g' : 'oz', color: '#00e5a0' },
    { label: 'CARBS', val: totals.carbs, goal: goals.carbs, unit: isMetric ? 'g' : 'oz', color: '#f0c040' },
    { label: 'FAT', val: totals.fat, goal: goals.fat, unit: isMetric ? 'g' : 'oz', color: '#ff6b35' },
  ];

  // Food options dropdown
  const foodOptions = FOOD_DB.map((f, i) => {
    const protein = isMetric ? f.protein : (f.protein * 0.03527396).toFixed(1);
    const carbs = isMetric ? f.carbs : (f.carbs * 0.03527396).toFixed(1);
    const fat = isMetric ? f.fat : (f.fat * 0.03527396).toFixed(1);
    const unit = isMetric ? 'g' : 'oz';
    return `<option value="${i}">${f.name} · ${f.cal} kcal · P:${protein}${unit} C:${carbs}${unit} F:${fat}${unit}</option>`;
  }).join('');

  // Start building HTML
  let html = `
    <!-- MACRO TRACKER -->
    <div class="section-head">MACRO TRACKER</div>
    <div class="sys-card">
  `;
  macros.forEach(m => {
    const val = isMetric || m.label === 'CALORIES' ? m.val : (m.val * 0.03527396).toFixed(1);
    const goal = isMetric || m.label === 'CALORIES' ? m.goal : (m.goal * 0.03527396).toFixed(1);
    const pct = Math.min(100, Math.round((val / goal) * 100));
    const over = val > goal;
    html += `
      <div class="macro-row">
        <div class="macro-label">${m.label}</div>
        <div class="macro-track"><div class="macro-fill" style="width:${pct}%;background:${over ? 'var(--red)' : m.color}"></div></div>
        <div class="macro-val">${val}/${goal}${m.unit}</div>
      </div>
    `;
  });
  html += `</div>`;

  // Food log section
  html += `
    <div class="section-head">LOG FOOD</div>
    <div class="sys-card">
      <!-- MODE TABS -->
      <div style="display:flex;gap:4px;margin-bottom:14px;background:rgba(0,0,0,0.2);padding:3px;border-radius:6px;border:1px solid var(--border)">
        <button class="food-mode-btn" id="mode-search" onclick="switchFoodMode('search')">🔍 SEARCH</button>
        <button class="food-mode-btn" id="mode-manual" onclick="switchFoodMode('manual')">✏️ MANUAL</button>
        <button class="food-mode-btn" id="mode-list" onclick="switchFoodMode('list')">📋 LIST</button>
      </div>

      <!-- SEARCH MODE -->
      <div id="food-mode-search" style="display:none">
        <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:2px;margin-bottom:8px">TYPE TO SEARCH 100+ FOODS</div>
        <input type="text" class="sys-input" id="food-search-input" placeholder="e.g. chicken, pernil, tacos..." oninput="filterFoodSearch(this.value)" style="margin-bottom:8px" />
        <div id="food-search-results" style="max-height:240px;overflow-y:auto;display:flex;flex-direction:column;gap:4px"></div>
      </div>

      <!-- MANUAL MODE -->
      <div id="food-mode-manual" style="display:none">
        <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:2px;margin-bottom:10px">ENTER FOOD DETAILS MANUALLY</div>
        <div style="margin-bottom:8px">
          <label>FOOD NAME</label>
          <input type="text" class="sys-input" id="manual-name" placeholder="e.g. Arroz con Pollo" />
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px">
          <div><label>CALORIES</label><input type="number" class="sys-input" id="manual-cal" inputmode="numeric" /></div>
          <div><label>PROTEIN (${isMetric ? 'g' : 'oz'})</label><input type="number" class="sys-input" id="manual-protein" inputmode="numeric" /></div>
          <div><label>CARBS (${isMetric ? 'g' : 'oz'})</label><input type="number" class="sys-input" id="manual-carbs" inputmode="numeric" /></div>
          <div><label>FAT (${isMetric ? 'g' : 'oz'})</label><input type="number" class="sys-input" id="manual-fat" inputmode="numeric" /></div>
        </div>
        <button class="btn-primary" onclick="logManualFood()">LOG FOOD</button>
      </div>

      <!-- LIST MODE -->
      <div id="food-mode-list" style="display:none">
        <div>BROWSE FULL DATABASE</div>
        <select class="sys-input" id="food-select" style="margin-bottom:10px; max-height:240px; overflow-y:auto;">
          <option value="">Choose food...</option>
          ${foodOptions}
        </select>
        <button class="btn-primary" onclick="logSelectedFood()">LOG FOOD</button>
      </div>
    </div>
  `;

  // Today's log
  html += `<div class="section-head">TODAY'S LOG</div>`;
  if (log.length === 0) {
    html += `<div style="text-align:center;padding:20px;color:var(--text3)">NO FOOD LOGGED YET</div>`;
  } else {
    log.slice().reverse().forEach(f => {
      const protein = isMetric ? f.protein : (f.protein * 0.03527396).toFixed(1);
      const carbs = isMetric ? f.carbs : (f.carbs * 0.03527396).toFixed(1);
      const fat = isMetric ? f.fat : (f.fat * 0.03527396).toFixed(1);
      html += `
        <div style="background:var(--panel);border:1px solid var(--border);border-radius:6px;padding:10px 12px;margin-bottom:6px;display:flex;justify-content:space-between;align-items:center">
          <div style="flex:1;min-width:0">
            <div style="font-size:13px;font-weight:600;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${f.name}</div>
            <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">${f.time} · P:${protein}${isMetric ? 'g' : 'oz'} C:${carbs}${isMetric ? 'g' : 'oz'} F:${fat}${isMetric ? 'g' : 'oz'}</div>
          </div>
          <div style="font-family:var(--font-hud);font-size:14px;color:var(--gold);flex-shrink:0;margin-left:8px">${f.cal}<span style="font-size:9px;color:var(--text3)">kcal</span></div>
        </div>
      `;
    });
  }

  el.innerHTML = html;

  // Spinner / search row CSS
  if (!document.getElementById('scanner-styles')) {
    const style = document.createElement('style');
    style.id = 'scanner-styles';
    style.textContent = `
      .scan-spinner { width:32px;height:32px;border:2px solid rgba(0,180,255,0.2);border-top-color:var(--accent);border-radius:50%;animation:spin 0.8s linear infinite; }
      @keyframes spin { to { transform: rotate(360deg); } }
      .food-result-row { display:flex;align-items:center;gap:10px;padding:9px 10px;background:var(--panel);border:1px solid var(--border);border-radius:6px;cursor:pointer;transition:border-color 0.15s; }
      .food-result-row:hover { border-color: var(--accent); }
    `;
    document.head.appendChild(style);
  }
}

// ===== BARCODE SCANNER =====
let barcodeScannerActive = false;
function startBarcodeScanner() {
  if (barcodeScannerActive) return;
  barcodeScannerActive = true;

  const overlay = document.createElement('div');
  overlay.id = 'barcode-overlay';
  overlay.style.cssText = `
    position:fixed;top:0;left:0;width:100%;height:100%;
    background:rgba(0,0,0,0.8);display:flex;justify-content:center;align-items:center;z-index:9999;
    flex-direction:column;color:#fff;
  `;
  overlay.innerHTML = `
    <div style="margin-bottom:12px">Point camera at barcode</div>
    <video id="barcode-video" autoplay playsinline style="width:90%;max-width:400px;border-radius:8px"></video>
    <button class="btn-secondary" style="margin-top:12px">CANCEL</button>
  `;
  document.body.appendChild(overlay);

  const cancelBtn = overlay.querySelector('button');
  cancelBtn.onclick = () => stopBarcodeScanner();

  const video = document.getElementById('barcode-video');

  navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
    .then(stream => {
      video.srcObject = stream;

      // Use barcode detection API if supported
      if ('BarcodeDetector' in window) {
        const detector = new BarcodeDetector({ formats: ['ean_13', 'ean_8', 'upc_e', 'upc_a'] });
        const detectLoop = () => {
          if (!barcodeScannerActive) return;
          detector.detect(video).then(barcodes => {
            if (barcodes.length > 0) {
              const code = barcodes[0].rawValue;
              showNotif(`[ BARCODE DETECTED ] ${code}`);
              lookupFoodByBarcode(code);
              stopBarcodeScanner();
            } else {
              requestAnimationFrame(detectLoop);
            }
          }).catch(() => requestAnimationFrame(detectLoop));
        };
        detectLoop();
      } else {
        showNotif('[ ERROR ] Barcode detection not supported on this device');
      }
    })
    .catch(err => {
      showNotif('[ ERROR ] Camera access denied');
      stopBarcodeScanner();
    });
}

function stopBarcodeScanner() {
  barcodeScannerActive = false;
  const overlay = document.getElementById('barcode-overlay');
  if (!overlay) return;
  const video = overlay.querySelector('video');
  if (video?.srcObject) {
    video.srcObject.getTracks().forEach(t => t.stop());
  }
  overlay.remove();
}

// ===== BARCODE FOOD LOOKUP (example logic, extendable) =====
function lookupFoodByBarcode(code) {
  // Example: map a few barcodes to foods in your FOOD_DB
  const barcodeMap = {
    '0123456789012': 'Milk 1L', // replace with real UPC
    '0987654321098': 'Eggs dozen'
  };

  const name = barcodeMap[code];
  if (!name) {
    showNotif('[ INFO ] Food not in DB, please add manually');
    switchFoodMode('manual');
    return;
  }

  const index = FOOD_DB.findIndex(f => f.name === name);
  if (index !== -1) {
    logFoodByIndex(index);
  } else {
    showNotif('[ INFO ] Food not in DB, please add manually');
    switchFoodMode('manual');
  }
}

// ===== MODE SWITCHER =====
function switchFoodMode(mode) {
  ['search', 'manual', 'list'].forEach(m => {
    const panel = document.getElementById('food-mode-' + m);
    const btn = document.getElementById('mode-' + m);
    if (!panel || !btn) return;
    const active = m === mode;
    panel.style.display = active ? 'block' : 'none';
    btn.style.background = active ? 'rgba(0,180,255,0.15)' : 'transparent';
    btn.style.color = active ? 'var(--accent)' : 'var(--text3)';
  });
  if (mode === 'search') {
    setTimeout(() => document.getElementById('food-search-input')?.focus(), 100);
    filterFoodSearch('');
  }
}

// ===== GALLERY (no capture) =====
function openGallery() {
  const input = document.getElementById('food-file-input');
  input.removeAttribute('capture');
  input.click();
  setTimeout(() => input.setAttribute('capture', 'environment'), 2000);
}

// ===== FOOD SEARCH =====
function filterFoodSearch(query) {
  const container = document.getElementById('food-search-results');
  if (!container) return;

  const q = query.trim().toLowerCase();
  const results = q.length === 0
    ? FOOD_DB.slice(0, 20)
    : FOOD_DB.filter(f => f.name.toLowerCase().includes(q)).slice(0, 30);

  if (results.length === 0) {
    container.innerHTML = `
      <div style="text-align:center;padding:16px;color:var(--text3);font-family:var(--font-mono);font-size:10px">
        NO RESULTS — <span style="color:var(--accent);cursor:pointer" onclick="switchFoodMode('manual')">ADD MANUALLY</span>
      </div>`;
    return;
  }

  container.innerHTML = results.map((f, i) => {
    const realIndex = FOOD_DB.indexOf(f);
    return `
      <div class="food-result-row" onclick="logFoodByIndex(${realIndex})">
        <div style="flex:1;min-width:0">
          <div style="font-size:13px;font-weight:600;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${f.name}</div>
          <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-top:2px">P:${f.protein}g · C:${f.carbs}g · F:${f.fat}g</div>
        </div>
        <div style="font-family:var(--font-hud);font-size:13px;color:var(--gold);flex-shrink:0">${f.cal}<span style="font-size:9px;color:var(--text3)">kcal</span></div>
      </div>
    `;
  }).join('');
}

function logFoodByIndex(index) {
  const food = FOOD_DB[index];
  if (!food) return;
  addFoodEntry({ ...food, source: 'search' });
  showNotif(`[ FOOD LOGGED ] ${food.name}`);
  document.getElementById('food-search-input').value = '';
  filterFoodSearch('');
}

// ===== MANUAL ENTRY WITH UNIT CONVERSION =====
function logManualFood() {
  const settings = getSettings();
  const isMetric = settings.units === 'metric';

  const name = document.getElementById('manual-name')?.value.trim();
  let cal = parseInt(document.getElementById('manual-cal')?.value) || 0;
  let protein = parseInt(document.getElementById('manual-protein')?.value) || 0;
  let carbs = parseInt(document.getElementById('manual-carbs')?.value) || 0;
  let fat = parseInt(document.getElementById('manual-fat')?.value) || 0;

  if (!name) { showNotif('[ ERROR ] Enter a food name'); return; }
  if (cal < 1) { showNotif('[ ERROR ] Enter calories'); return; }

  // --- Auto-convert liquids if applicable ---
  // Example: detect common liquids by name keywords
  const liquidKeywords = ['milk', 'juice', 'water', 'broth', 'soup'];
  if (liquidKeywords.some(k => name.toLowerCase().includes(k))) {
    // Assume user entered in current units, convert to base metric (ml) for storage
    if (!isMetric) {
      // Convert fl oz → ml
      // 1 fl oz ≈ 29.5735 ml, approximate to nearest whole number
      protein = Math.round(protein * 1); // protein/fat/carbs usually unchanged
      carbs = Math.round(carbs * 1);
      fat = Math.round(fat * 1);
      cal = Math.round(cal * 1); // calories unchanged
      // Optional: you could store volume in ml if you had a volume field
    }
    // Otherwise, metric assumed (ml) → no change
  }

  addFoodEntry({ name, cal, protein, carbs, fat, source: 'manual' });
  showNotif(`[ FOOD LOGGED ] ${name} · ${cal}kcal`);

  // Clear fields
  ['manual-name', 'manual-cal', 'manual-protein', 'manual-carbs', 'manual-fat']
    .forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
}

// ===== UPDATE DISPLAY UNITS FOR LOGGED FOOD =====
function renderFoodEntry(f) {
  const settings = getSettings();
  const isMetric = settings.units === 'metric';
  let name = f.name;
  let cal = f.cal;
  let protein = f.protein;
  let carbs = f.carbs;
  let fat = f.fat;

  // For liquids, you could display volume units
  const liquidKeywords = ['milk', 'juice', 'water', 'broth', 'soup'];
  if (liquidKeywords.some(k => name.toLowerCase().includes(k))) {
    if (!isMetric) {
      // Display fl oz instead of ml (if you store volume separately)
      // Example: if you had f.volumeMl, you could do:
      // volumeDisplay = Math.round(f.volumeMl / 29.5735) + ' fl oz';
    }
  }

  return `
    <div style="background:var(--panel);border:1px solid var(--border);border-radius:6px;padding:10px 12px;margin-bottom:6px;display:flex;justify-content:space-between;align-items:center">
      <div style="flex:1;min-width:0">
        <div style="display:flex;align-items:center;gap:6px">
          <div style="font-size:13px;font-weight:600;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${name}</div>
        </div>
        <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-top:2px">
          P:${protein}g C:${carbs}g F:${fat}g
        </div>
      </div>
      <div style="font-family:var(--font-hud);font-size:14px;color:var(--gold);flex-shrink:0;margin-left:8px">${cal}<span style="font-size:9px;color:var(--text3)">kcal</span></div>
    </div>
  `;
}

// ===== LIST DROPDOWN (kept for list mode) =====
function logSelectedFood() {
  const sel = document.getElementById('food-select');
  const idx = parseInt(sel?.value);
  if (isNaN(idx)) { showNotif('[ SYSTEM ] Select a food item'); return; }
  addFoodEntry({ ...FOOD_DB[idx], source: 'list' });
  showNotif(`[ FOOD LOGGED ] ${FOOD_DB[idx].name}`);
  if (sel) sel.value = '';
}
