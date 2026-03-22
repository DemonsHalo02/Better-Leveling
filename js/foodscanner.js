// ============================================
// SYSTEM — FOOD SCANNER
// AI Photo Scan + Text Search + Manual Entry
// Uses Claude Vision API to identify food
// ============================================

// ===== MAIN NUTRITION PAGE RENDERER =====
function renderNutritionPage() {
  const el = document.getElementById('page-nutrition');
  const log = HUNTER.foodLog || [];

  let totals = { cal: 0, protein: 0, carbs: 0, fat: 0 };
  log.forEach(f => { totals.cal += f.cal; totals.protein += f.protein; totals.carbs += f.carbs; totals.fat += f.fat; });

  const goals = { cal: 2000, protein: 150, carbs: 250, fat: 65 };
  const macros = [
    { label: 'CALORIES', val: totals.cal,     goal: goals.cal,     unit: 'kcal', color: '#00b4ff' },
    { label: 'PROTEIN',  val: totals.protein, goal: goals.protein, unit: 'g',    color: '#00e5a0' },
    { label: 'CARBS',    val: totals.carbs,   goal: goals.carbs,   unit: 'g',    color: '#f0c040' },
    { label: 'FAT',      val: totals.fat,     goal: goals.fat,     unit: 'g',    color: '#ff6b35' },
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
        <button class="food-mode-btn active" id="mode-scan"   onclick="switchFoodMode('scan')"   style="flex:1;padding:7px 4px;background:rgba(0,180,255,0.15);border:none;border-radius:4px;color:var(--accent);font-family:var(--font-hud);font-size:10px;font-weight:600;letter-spacing:1px;cursor:pointer">📷 SCAN</button>
        <button class="food-mode-btn"        id="mode-search" onclick="switchFoodMode('search')" style="flex:1;padding:7px 4px;background:transparent;border:none;border-radius:4px;color:var(--text3);font-family:var(--font-hud);font-size:10px;font-weight:600;letter-spacing:1px;cursor:pointer">🔍 SEARCH</button>
        <button class="food-mode-btn"        id="mode-manual" onclick="switchFoodMode('manual')" style="flex:1;padding:7px 4px;background:transparent;border:none;border-radius:4px;color:var(--text3);font-family:var(--font-hud);font-size:10px;font-weight:600;letter-spacing:1px;cursor:pointer">✏️ MANUAL</button>
        <button class="food-mode-btn"        id="mode-list"   onclick="switchFoodMode('list')"   style="flex:1;padding:7px 4px;background:transparent;border:none;border-radius:4px;color:var(--text3);font-family:var(--font-hud);font-size:10px;font-weight:600;letter-spacing:1px;cursor:pointer">📋 LIST</button>
      </div>

      <!-- SCAN MODE -->
      <div id="food-mode-scan">
        <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:2px;margin-bottom:8px">TAKE OR UPLOAD A PHOTO OF YOUR FOOD</div>

        <!-- Camera preview area -->
        <div id="scan-preview-wrap" style="
          width:100%;aspect-ratio:4/3;background:rgba(0,0,0,0.4);
          border:1px dashed var(--border2);border-radius:8px;
          display:flex;flex-direction:column;align-items:center;justify-content:center;
          margin-bottom:10px;overflow:hidden;position:relative;cursor:pointer
        " onclick="document.getElementById('food-file-input').click()">
          <img id="scan-preview-img" style="display:none;width:100%;height:100%;object-fit:cover;border-radius:8px" />
          <div id="scan-placeholder" style="text-align:center;padding:20px">
            <div style="font-size:36px;margin-bottom:8px">📷</div>
            <div style="font-family:var(--font-hud);font-size:11px;color:var(--accent);letter-spacing:2px">TAP TO TAKE PHOTO</div>
            <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-top:4px">or upload from gallery</div>
          </div>
          <div id="scan-analyzing" style="display:none;position:absolute;inset:0;background:rgba(0,0,0,0.7);align-items:center;justify-content:center;flex-direction:column;gap:8px">
            <div class="scan-spinner"></div>
            <div style="font-family:var(--font-mono);font-size:10px;color:var(--accent);letter-spacing:2px" id="scan-status-text">ANALYZING FOOD...</div>
          </div>
        </div>

        <!-- Hidden file input — accepts camera + gallery on mobile -->
        <input type="file" id="food-file-input" accept="image/*" capture="environment"
          style="display:none" onchange="handleFoodPhoto(this)" />

        <div style="display:flex;gap:8px;margin-bottom:10px">
          <button class="btn-primary" style="flex:1" onclick="document.getElementById('food-file-input').click()">
            <span>📷 OPEN CAMERA</span>
          </button>
          <button class="btn-secondary" onclick="openGallery()">GALLERY</button>
        </div>

        <!-- AI result card (hidden until scan) -->
        <div id="scan-result" style="display:none"></div>
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
  ['scan','search','manual','list'].forEach(m => {
    const panel = document.getElementById('food-mode-' + m);
    const btn   = document.getElementById('mode-' + m);
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

// ===== FOOD PHOTO HANDLER =====
async function handleFoodPhoto(input) {
  const file = input.files[0];
  if (!file) return;

  // Show preview
  const reader = new FileReader();
  reader.onload = async (e) => {
    const base64 = e.target.result;

    // Show image preview
    const img = document.getElementById('scan-preview-img');
    const placeholder = document.getElementById('scan-placeholder');
    const analyzing = document.getElementById('scan-analyzing');
    if (img) { img.src = base64; img.style.display = 'block'; }
    if (placeholder) placeholder.style.display = 'none';
    if (analyzing) analyzing.style.display = 'flex';

    // Extract base64 data (remove prefix)
    const base64Data = base64.split(',')[1];
    const mimeType = file.type || 'image/jpeg';

    try {
      await scanFoodWithAI(base64Data, mimeType);
    } catch (err) {
      if (analyzing) analyzing.style.display = 'none';
      showScanError('Could not analyze image. Try manual entry.');
    }
  };
  reader.readAsDataURL(file);
  input.value = '';
}

// ===== AI FOOD SCAN =====
async function scanFoodWithAI(base64Data, mimeType) {
  const statusEl = document.getElementById('scan-status-text');
  if (statusEl) statusEl.textContent = 'IDENTIFYING FOOD...';

  const prompt = `You are a nutrition expert AI inside a fitness tracking app.
Look at this food image and identify what food(s) you can see.
For EACH food item visible, estimate the nutritional values for a typical serving size.

Return ONLY a valid JSON array — no extra text, no markdown, no explanation.
Format:
[
  {
    "name": "Food Name (serving size)",
    "cal": 350,
    "protein": 28,
    "carbs": 35,
    "fat": 8,
    "confidence": "high"
  }
]

Rules:
- If multiple foods are visible (e.g. a plate with rice, chicken, and beans), list each separately
- Use realistic portion estimates (what's visible in the image)
- confidence can be "high", "medium", or "low"
- If you cannot identify the food at all, return: [{"name":"Unknown Food","cal":300,"protein":10,"carbs":35,"fat":10,"confidence":"low"}]
- Do NOT include any text outside the JSON array`;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      messages: [{
        role: 'user',
        content: [
          {
            type: 'image',
            source: { type: 'base64', media_type: mimeType, data: base64Data }
          },
          { type: 'text', text: prompt }
        ]
      }]
    })
  });

  if (!response.ok) throw new Error('API error ' + response.status);

  const data = await response.json();
  const text = data.content?.map(c => c.text || '').join('') || '';

  // Parse JSON response
  let foods;
  try {
    const clean = text.replace(/```json|```/g, '').trim();
    foods = JSON.parse(clean);
    if (!Array.isArray(foods)) throw new Error('Not an array');
  } catch {
    throw new Error('Could not parse AI response');
  }

  // Hide analyzing overlay
  const analyzing = document.getElementById('scan-analyzing');
  if (analyzing) analyzing.style.display = 'none';

  showScanResults(foods);
}

// ===== SHOW SCAN RESULTS =====
function showScanResults(foods) {
  const resultEl = document.getElementById('scan-result');
  if (!resultEl) return;

  const confColor = { high: 'var(--green)', medium: 'var(--gold)', low: 'var(--red)' };

  let html = `
    <div style="font-family:var(--font-mono);font-size:9px;color:var(--purple);letter-spacing:2px;margin-bottom:8px">
      ◈ AI IDENTIFIED ${foods.length} ITEM${foods.length !== 1 ? 'S' : ''}
    </div>
  `;

  foods.forEach((food, i) => {
    html += `
      <div style="background:rgba(168,85,247,0.08);border:1px solid rgba(168,85,247,0.3);border-radius:8px;padding:12px;margin-bottom:8px">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px">
          <div style="flex:1">
            <div style="font-size:14px;font-weight:600;color:var(--text)">${food.name}</div>
            <div style="font-family:var(--font-mono);font-size:9px;color:${confColor[food.confidence] || 'var(--text3)'};margin-top:2px">
              ${food.confidence?.toUpperCase() || 'MEDIUM'} CONFIDENCE
            </div>
          </div>
          <div style="font-family:var(--font-hud);font-size:18px;color:var(--gold);margin-left:10px">${food.cal}<span style="font-size:9px;color:var(--text3)">kcal</span></div>
        </div>
        <div style="display:flex;gap:8px;margin-bottom:10px">
          <span class="stat-pill pill-green">P: ${food.protein}g</span>
          <span class="stat-pill pill-gold">C: ${food.carbs}g</span>
          <span class="stat-pill pill-red">F: ${food.fat}g</span>
        </div>
        <div style="display:flex;gap:6px">
          <button class="btn-primary" style="flex:1;padding:8px" onclick="confirmAIFood(${i})">
            <span>ADD TO LOG</span><div class="btn-arrow">▶</div>
          </button>
          <button class="btn-secondary" onclick="editAIFood(${i})" style="padding:8px 12px">EDIT</button>
        </div>
      </div>
    `;
  });

  html += `
    <button class="btn-secondary" style="width:100%;margin-top:4px" onclick="resetScanner()">
      SCAN ANOTHER FOOD
    </button>
  `;

  resultEl.style.display = 'block';
  resultEl.innerHTML = html;

  // Store results globally for confirm/edit
  window._scanResults = foods;
}

function confirmAIFood(index) {
  const food = window._scanResults?.[index];
  if (!food) return;
  addFoodEntry({ ...food, source: 'ai' });
  showNotif(`[ FOOD LOGGED ] ${food.name} · ${food.cal}kcal`);
  resetScanner();
}

function editAIFood(index) {
  const food = window._scanResults?.[index];
  if (!food) return;
  // Switch to manual mode and prefill
  switchFoodMode('manual');
  document.getElementById('manual-name').value    = food.name;
  document.getElementById('manual-cal').value     = food.cal;
  document.getElementById('manual-protein').value = food.protein;
  document.getElementById('manual-carbs').value   = food.carbs;
  document.getElementById('manual-fat').value     = food.fat;
  showNotif('[ SYSTEM ] Edit values then tap LOG FOOD');
}

function resetScanner() {
  const img = document.getElementById('scan-preview-img');
  const placeholder = document.getElementById('scan-placeholder');
  const result = document.getElementById('scan-result');
  const analyzing = document.getElementById('scan-analyzing');
  if (img) { img.style.display = 'none'; img.src = ''; }
  if (placeholder) placeholder.style.display = 'block';
  if (result) { result.style.display = 'none'; result.innerHTML = ''; }
  if (analyzing) analyzing.style.display = 'none';
  window._scanResults = null;
}

function showScanError(msg) {
  const resultEl = document.getElementById('scan-result');
  if (!resultEl) return;
  resultEl.style.display = 'block';
  resultEl.innerHTML = `
    <div style="padding:12px;background:rgba(255,51,85,0.08);border:1px solid rgba(255,51,85,0.3);border-radius:6px;text-align:center">
      <div style="font-family:var(--font-mono);font-size:10px;color:var(--red);margin-bottom:8px">⚠ ${msg}</div>
      <div style="display:flex;gap:8px;justify-content:center">
        <button class="btn-secondary" onclick="resetScanner()">TRY AGAIN</button>
        <button class="btn-secondary" onclick="switchFoodMode('manual')">MANUAL ENTRY</button>
      </div>
    </div>
  `;
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
  const name    = document.getElementById('manual-name')?.value.trim();
  const cal     = parseInt(document.getElementById('manual-cal')?.value)     || 0;
  const protein = parseInt(document.getElementById('manual-protein')?.value) || 0;
  const carbs   = parseInt(document.getElementById('manual-carbs')?.value)   || 0;
  const fat     = parseInt(document.getElementById('manual-fat')?.value)     || 0;

  if (!name) { showNotif('[ ERROR ] Enter a food name'); return; }
  if (cal < 1) { showNotif('[ ERROR ] Enter calories'); return; }

  addFoodEntry({ name, cal, protein, carbs, fat, source: 'manual' });
  showNotif(`[ FOOD LOGGED ] ${name} · ${cal}kcal`);

  // Clear fields
  ['manual-name','manual-cal','manual-protein','manual-carbs','manual-fat']
    .forEach(id => { const el = document.getElementById(id); if(el) el.value = ''; });
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
