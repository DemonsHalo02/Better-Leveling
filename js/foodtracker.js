// ============================================
// SYSTEM — FOOD SCANNER
//Text Search + Manual Entry
// ============================================

// ===== MAIN NUTRITION PAGE RENDERER =====
function renderNutritionPage() {
  const el = document.getElementById('page-nutrition');
  const log = HUNTER.foodLog || [];

  let totals = { cal: 0, protein: 0, carbs: 0, fat: 0 };
  log.forEach(f => { totals.cal += f.cal; totals.protein += f.protein; totals.carbs += f.carbs; totals.fat += f.fat; });

  const goals = typeof getMacroGoals === 'function'
    ? getMacroGoals()
    : { cal: 2000, protein: 150, carbs: 250, fat: 65 };
  const macros = [
    { label: 'CALORIES', val: totals.cal, goal: goals.cal, unit: 'kcal', color: '#00b4ff' },
    { label: 'PROTEIN', val: totals.protein, goal: goals.protein, unit: 'g', color: '#00e5a0' },
    { label: 'CARBS', val: totals.carbs, goal: goals.carbs, unit: 'g', color: '#f0c040' },
    { label: 'FAT', val: totals.fat, goal: goals.fat, unit: 'g', color: '#ff6b35' },
  ];

  const foodOptions = FOOD_DB.map((f, i) =>
    `<option value="${i}">${f.name} · ${f.cal}kcal · P:${f.protein}g</option>`
  ).join('');

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

  html += `</div>

    <!-- LOG FOOD SECTION -->
    <div class="section-head">LOG FOOD</div>
    <div class="sys-card">

      <!-- MODE TABS -->
      <div style="display:flex;gap:4px;margin-bottom:14px;background:rgba(0,0,0,0.2);padding:3px;border-radius:6px;border:1px solid var(--border)">
        <button class="food-mode-btn"        id="mode-search" onclick="switchFoodMode('search')" style="flex:1;padding:7px 4px;background:transparent;border:none;border-radius:4px;color:var(--text3);font-family:var(--font-hud);font-size:10px;font-weight:600;letter-spacing:1px;cursor:pointer">🔍 SEARCH</button>
        <button class="food-mode-btn"        id="mode-manual" onclick="switchFoodMode('manual')" style="flex:1;padding:7px 4px;background:transparent;border:none;border-radius:4px;color:var(--text3);font-family:var(--font-hud);font-size:10px;font-weight:600;letter-spacing:1px;cursor:pointer">✏️ MANUAL</button>
        <button class="food-mode-btn"        id="mode-list"   onclick="switchFoodMode('list')"   style="flex:1;padding:7px 4px;background:transparent;border:none;border-radius:4px;color:var(--text3);font-family:var(--font-hud);font-size:10px;font-weight:600;letter-spacing:1px;cursor:pointer">📋 LIST</button>
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
          <label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:1px;display:block;margin-bottom:4px">FOOD NAME</label>
          <input type="text" class="sys-input" id="manual-name" placeholder="e.g. Arroz con Pollo" />
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px">
          <div>
            <label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:1px;display:block;margin-bottom:4px">CALORIES</label>
            <input type="number" class="sys-input" id="manual-cal" placeholder="e.g. 420" inputmode="numeric" />
          </div>
          <div>
            <label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:1px;display:block;margin-bottom:4px">PROTEIN (g)</label>
            <input type="number" class="sys-input" id="manual-protein" placeholder="e.g. 35" inputmode="numeric" />
          </div>
          <div>
            <label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:1px;display:block;margin-bottom:4px">CARBS (g)</label>
            <input type="number" class="sys-input" id="manual-carbs" placeholder="e.g. 45" inputmode="numeric" />
          </div>
          <div>
            <label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:1px;display:block;margin-bottom:4px">FAT (g)</label>
            <input type="number" class="sys-input" id="manual-fat" placeholder="e.g. 10" inputmode="numeric" />
          </div>
        </div>
        <button class="btn-primary" onclick="logManualFood()">
          <span>LOG FOOD</span><div class="btn-arrow">▶</div>
        </button>
      </div>

      <!-- LIST MODE (original dropdown) -->
      <div id="food-mode-list" style="display:none">
        <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:2px;margin-bottom:8px">BROWSE FULL DATABASE</div>
        <select class="sys-input" id="food-select" style="margin-bottom:10px">
          <option value="">Choose food...</option>
          ${foodOptions}
        </select>
        <button class="btn-primary" onclick="logSelectedFood()">
          <span>LOG FOOD</span><div class="btn-arrow">▶</div>
        </button>
      </div>

    </div>

    <!-- TODAY'S LOG -->
    <div class="section-head">TODAY'S LOG</div>
  `;

  if (log.length === 0) {
    html += `<div style="text-align:center;padding:20px;color:var(--text3);font-family:var(--font-mono);font-size:11px;letter-spacing:2px">NO FOOD LOGGED YET</div>`;
  } else {
    log.slice().reverse().forEach((f) => {
      const isAI = f.source === 'ai';
      html += `
        <div style="background:var(--panel);border:1px solid ${isAI ? 'rgba(168,85,247,0.4)' : 'var(--border)'};border-radius:6px;padding:10px 12px;margin-bottom:6px;display:flex;justify-content:space-between;align-items:center">
          <div style="flex:1;min-width:0">
            <div style="display:flex;align-items:center;gap:6px">
              <div style="font-size:13px;font-weight:600;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${f.name}</div>
              ${isAI ? `<span style="font-family:var(--font-mono);font-size:8px;color:#a855f7;background:rgba(168,85,247,0.1);border:1px solid rgba(168,85,247,0.3);padding:1px 5px;border-radius:3px;flex-shrink:0">AI</span>` : ''}
            </div>
            <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-top:2px">${f.time} · P:${f.protein}g C:${f.carbs}g F:${f.fat}g</div>
          </div>
          <div style="font-family:var(--font-hud);font-size:14px;color:var(--gold);flex-shrink:0;margin-left:8px">${f.cal}<span style="font-size:9px;color:var(--text3)">kcal</span></div>
        </div>
      `;
    });
  }

  el.innerHTML = html;

  // Add spinner CSS
  if (!document.getElementById('scanner-styles')) {
    const style = document.createElement('style');
    style.id = 'scanner-styles';
    style.textContent = `
      .scan-spinner {
        width: 32px; height: 32px;
        border: 2px solid rgba(0,180,255,0.2);
        border-top-color: var(--accent);
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
      }
      @keyframes spin { to { transform: rotate(360deg); } }
      .food-result-row {
        display:flex;align-items:center;gap:10px;
        padding:9px 10px;
        background:var(--panel);border:1px solid var(--border);
        border-radius:6px;cursor:pointer;transition:border-color 0.15s;
      }
      .food-result-row:hover { border-color: var(--accent); }
    `;
    document.head.appendChild(style);
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

// ===== MANUAL ENTRY =====
function logManualFood() {
  const name = document.getElementById('manual-name')?.value.trim();
  const cal = parseInt(document.getElementById('manual-cal')?.value) || 0;
  const protein = parseInt(document.getElementById('manual-protein')?.value) || 0;
  const carbs = parseInt(document.getElementById('manual-carbs')?.value) || 0;
  const fat = parseInt(document.getElementById('manual-fat')?.value) || 0;

  if (!name) { showNotif('[ ERROR ] Enter a food name'); return; }
  if (cal < 1) { showNotif('[ ERROR ] Enter calories'); return; }

  addFoodEntry({ name, cal, protein, carbs, fat, source: 'manual' });
  showNotif(`[ FOOD LOGGED ] ${name} · ${cal}kcal`);

  // Clear fields
  ['manual-name', 'manual-cal', 'manual-protein', 'manual-carbs', 'manual-fat']
    .forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
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
