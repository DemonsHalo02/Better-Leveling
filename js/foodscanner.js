// ============================================
// SYSTEM — FOOD SCANNER
// Barcode Scanner + Text Search + Manual Entry
// ============================================

// ============================================
// SYSTEM — FOOD SCANNER + HYDRATION + UNITS
// ============================================

function renderNutritionPage() {
  const el = document.getElementById('page-nutrition');
  const log = HUNTER.foodLog || [];
  const settings = window.HUNTER?.settings || { units: 'metric' }; // fallback
  const isMetric = settings.units === 'metric';

  // Convert totals for display
  let totals = { cal: 0, protein: 0, carbs: 0, fat: 0 };
  log.forEach(f => { totals.cal += f.cal; totals.protein += f.protein; totals.carbs += f.carbs; totals.fat += f.fat; });

  const goals = typeof getMacroGoals === 'function'
    ? getMacroGoals()
    : { cal: 2000, protein: 150, carbs: 250, fat: 65 };

  // ===== Convert for display if imperial =====
  const displayTotals = {
    cal: totals.cal,
    protein: isMetric ? totals.protein : (totals.protein / 28.3495).toFixed(1),
    carbs: isMetric ? totals.carbs : (totals.carbs / 28.3495).toFixed(1),
    fat: isMetric ? totals.fat : (totals.fat / 28.3495).toFixed(1),
  };
  const displayGoals = {
    cal: goals.cal,
    protein: isMetric ? goals.protein : (goals.protein / 28.3495).toFixed(1),
    carbs: isMetric ? goals.carbs : (goals.carbs / 28.3495).toFixed(1),
    fat: isMetric ? goals.fat : (goals.fat / 28.3495).toFixed(1),
  };

  const macros = [
    { label: 'CALORIES', val: displayTotals.cal, goal: displayGoals.cal, unit: 'kcal', color: '#00b4ff' },
    { label: 'PROTEIN', val: displayTotals.protein, goal: displayGoals.protein, unit: isMetric ? 'g' : 'oz', color: '#00e5a0' },
    { label: 'CARBS', val: displayTotals.carbs, goal: displayGoals.carbs, unit: isMetric ? 'g' : 'oz', color: '#f0c040' },
    { label: 'FAT', val: displayTotals.fat, goal: displayGoals.fat, unit: isMetric ? 'g' : 'oz', color: '#ff6b35' },
  ];

  const foodOptions = FOOD_DB.map((f, i) => {
    const p = isMetric ? f.protein : (f.protein / 28.3495).toFixed(1);
    return `<option value="${i}">${f.name} · ${f.cal}kcal · P:${p}${isMetric ? 'g' : 'oz'}</option>`;
  }).join('');

  let html = `
    <!-- MACRO TRACKER -->
    <div class="section-head">MACRO TRACKER</div>
    <div class="sys-card">
  `;
  macros.forEach(m => {
    const pct = Math.min(100, Math.round((m.val / m.goal) * 100));
    const over = m.val > m.goal;
    html += `
      <div class="macro-row">
        <div class="macro-label">${m.label}</div>
        <div class="macro-track"><div class="macro-fill" style="width:${pct}%;background:${over ? 'var(--red)' : m.color}"></div></div>
        <div class="macro-val">${m.val}/${m.goal}${m.unit}</div>
      </div>
    `;
  });
  html += `</div>`;

  // ===== LOG FOOD SECTION =====
  html += `
    <div class="section-head">LOG FOOD</div>
    <div class="sys-card">
      <!-- MODE TABS -->
      <div style="display:flex;gap:4px;margin-bottom:14px;background:rgba(0,0,0,0.2);padding:3px;border-radius:6px;border:1px solid var(--border)">
        <button class="food-mode-btn" id="mode-search" onclick="switchFoodMode('search')" style="flex:1;padding:7px 4px;">🔍 SEARCH</button>
        <button class="food-mode-btn" id="mode-manual" onclick="switchFoodMode('manual')" style="flex:1;padding:7px 4px;">✏️ MANUAL</button>
        <button class="food-mode-btn" id="mode-list"   onclick="switchFoodMode('list')"   style="flex:1;padding:7px 4px;">📋 LIST</button>
      </div>

      <!-- SEARCH MODE -->
      <div id="food-mode-search" style="display:none">
        <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:2px;margin-bottom:8px">TYPE TO SEARCH 100+ FOODS</div>
        <input type="text" class="sys-input" id="food-search-input"
          placeholder="e.g. chicken, pernil, tacos..."
          oninput="filterFoodSearch(this.value)"
          style="margin-bottom:8px" />
        <div id="food-search-results" style="max-height:240px;overflow-y:auto;display:flex;flex-direction:column;gap:4px"></div>
      </div>

      <!-- MANUAL ENTRY MODE -->
      <div id="food-mode-manual" style="display:none">
        <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:2px;margin-bottom:10px">ENTER FOOD DETAILS MANUALLY</div>
        <div style="margin-bottom:8px">
          <label>FOOD NAME</label>
          <input type="text" class="sys-input" id="manual-name" placeholder="e.g. Arroz con Pollo" />
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px">
          <div><label>CALORIES</label><input type="number" class="sys-input" id="manual-cal" placeholder="e.g. 420" /></div>
          <div><label>PROTEIN (${isMetric ? 'g' : 'oz'})</label><input type="number" class="sys-input" id="manual-protein" placeholder="e.g. 35" /></div>
          <div><label>CARBS (${isMetric ? 'g' : 'oz'})</label><input type="number" class="sys-input" id="manual-carbs" placeholder="e.g. 45" /></div>
          <div><label>FAT (${isMetric ? 'g' : 'oz'})</label><input type="number" class="sys-input" id="manual-fat" placeholder="e.g. 10" /></div>
        </div>
        <button class="btn-primary" onclick="logManualFood()"><span>LOG FOOD</span><div class="btn-arrow">▶</div></button>
      </div>

      <!-- LIST MODE -->
      <div id="food-mode-list" style="display:none">
        <select class="sys-input" id="food-select" style="margin-bottom:10px">
          <option value="">Choose food...</option>
          ${foodOptions}
        </select>
        <button class="btn-primary" onclick="logSelectedFood()"><span>LOG FOOD</span><div class="btn-arrow">▶</div></button>
      </div>
    </div>
  `;

  // ===== TODAY'S LOG =====
  html += `<div class="section-head">TODAY'S LOG</div>`;
  if (log.length === 0) {
    html += `<div style="text-align:center;padding:20px;color:var(--text3)">NO FOOD LOGGED YET</div>`;
  } else {
    log.slice().reverse().forEach(f => {
      const isAI = f.source === 'ai';
      const displayProtein = isMetric ? f.protein : (f.protein / 28.3495).toFixed(1);
      const displayCarbs = isMetric ? f.carbs : (f.carbs / 28.3495).toFixed(1);
      const displayFat = isMetric ? f.fat : (f.fat / 28.3495).toFixed(1);
      html += `
        <div style="background:var(--panel);border:1px solid ${isAI ? 'rgba(168,85,247,0.4)' : 'var(--border)'};border-radius:6px;padding:10px 12px;margin-bottom:6px;display:flex;justify-content:space-between;align-items:center">
          <div style="flex:1;min-width:0">
            <div style="display:flex;align-items:center;gap:6px">
              <div style="font-size:13px;font-weight:600;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${f.name}</div>
              ${isAI ? `<span style="font-size:8px;color:#a855f7;background:rgba(168,85,247,0.1);border:1px solid rgba(168,85,247,0.3);padding:1px 5px;border-radius:3px;flex-shrink:0">AI</span>` : ''}
            </div>
            <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-top:2px">${f.time} · P:${displayProtein}${isMetric ? 'g' : 'oz'} C:${displayCarbs}${isMetric ? 'g' : 'oz'} F:${displayFat}${isMetric ? 'g' : 'oz'}</div>
          </div>
          <div style="font-family:var(--font-hud);font-size:14px;color:var(--gold);flex-shrink:0;margin-left:8px">${f.cal}<span style="font-size:9px;color:var(--text3)">kcal</span></div>
        </div>
      `;
    });
  }

  el.innerHTML = html;

  // Add barcode button if not present
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
