// ============================================
// BETTER LEVELING — FOOD LOGGER v4
// No AI scanner · No health tracking inputs
// Full metric/imperial · Water goal from settings
// XP only on first goal hit · Manual water entry
// Combined calorie+macro calculator
// ============================================

// ── UNIT HELPERS ──────────────────────────────────────
// settings.js (loaded first) defines the master versions of:
//   isImperial, mlToDisplay, litersToDisplay, getWaterGoalMl,
//   getWaterGoalDisplay, getCupSizeMl, getCupSizeDisplay,
//   getVolumeUnit, getWaterCupGoal, toDisplayWeight, toDisplayDistance
// These aliases keep this file working if those ever aren't defined yet.
function getIsImperial()   { return typeof isImperial       === 'function' ? isImperial()       : false; }
function kgToDisplay(kg)   { return typeof toDisplayWeight  === 'function' ? toDisplayWeight(kg)  : (kg??'—')+' kg'; }
function kmToDisplay(km)   { return typeof toDisplayDistance=== 'function' ? toDisplayDistance(km): (km??'—')+' km'; }
function cmToDisplay(cm) {
  if (cm == null) return '—';
  if (getIsImperial()) { const i=Math.round(cm/2.54); return `${Math.floor(i/12)}'${i%12}"`; }
  return cm+' cm';
}

// ── NUTRITION PAGE ────────────────────────────────────
function renderNutritionPage() {
  const el  = document.getElementById('page-nutrition');
  const log = HUNTER.foodLog || [];
  const s   = typeof getSettings === 'function' ? getSettings() : {};

  let totals = { cal:0, protein:0, carbs:0, fat:0 };
  log.forEach(f => { totals.cal+=f.cal||0; totals.protein+=f.protein||0; totals.carbs+=f.carbs||0; totals.fat+=f.fat||0; });

  const goals = typeof getMacroGoals === 'function' ? getMacroGoals()
    : { cal: s.calorieGoal||2000, protein:150, carbs:250, fat:65 };

  const macros = [
    { label:'CALORIES', val:totals.cal,     goal:goals.cal,     unit:'kcal', color:'#00b4ff' },
    { label:'PROTEIN',  val:totals.protein, goal:goals.protein, unit:'g',    color:'#00e5a0' },
    { label:'CARBS',    val:totals.carbs,   goal:goals.carbs,   unit:'g',    color:'#f0c040' },
    { label:'FAT',      val:totals.fat,     goal:goals.fat,     unit:'g',    color:'#ff6b35' },
  ];

  const foodOptions = FOOD_DB.map((f,i) =>
    `<option value="${i}">${f.name} · ${f.cal}kcal · P:${f.protein}g</option>`
  ).join('');

  // Water
  const hydData  = typeof getHydrationData === 'function' ? getHydrationData() : {};
  const today    = new Date().toLocaleDateString();
  const cups     = hydData.date === today ? (hydData.cups||0) : 0;
  const cupGoal  = getWaterCupGoal();
  const waterMl  = cups * getCupSizeMl();
  const waterPct = Math.min(100, Math.round((waterMl / getWaterGoalMl()) * 100));
  const goalHit  = waterMl >= getWaterGoalMl();

  // Calorie deficit info
  const calorieGoal  = goals.cal;
  const caloriesDiff = totals.cal - calorieGoal;
  const deficitColor = caloriesDiff <= 0 ? 'var(--green)' : 'var(--red)';
  const deficitText  = caloriesDiff <= 0
    ? `${Math.abs(caloriesDiff)} kcal under goal`
    : `${caloriesDiff} kcal over goal`;

  let html = `
    <!-- MACROS -->
    <div class="section-head">MACRO TRACKER</div>
    <div class="sys-card" style="margin-bottom:10px">
  `;

  macros.forEach(m => {
    const pct  = Math.min(100, Math.round((m.val / m.goal) * 100));
    const over = m.val > m.goal;
    html += `
      <div class="macro-row">
        <div class="macro-label">${m.label}</div>
        <div class="macro-track"><div class="macro-fill" style="width:${pct}%;background:${over?'var(--red)':m.color}"></div></div>
        <div class="macro-val">${m.val}/${m.goal}${m.unit}</div>
      </div>
    `;
  });

  html += `
      <div style="margin-top:10px;padding-top:10px;border-top:1px solid var(--border);display:flex;justify-content:space-between;align-items:center">
        <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">CALORIE BALANCE</div>
        <div style="font-family:var(--font-mono);font-size:10px;color:${deficitColor}">${deficitText}</div>
      </div>
    </div>

    <!-- WATER -->
    <div class="section-head">WATER INTAKE</div>
    <div class="sys-card" style="margin-bottom:10px">
      <div style="display:flex;align-items:center;gap:14px;margin-bottom:12px">
        <svg viewBox="0 0 56 56" style="width:52px;height:52px;flex-shrink:0">
          <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(0,180,255,0.1)" stroke-width="5"/>
          <circle cx="28" cy="28" r="24" fill="none" stroke="#00b4ff" stroke-width="5"
            stroke-dasharray="${2*Math.PI*24}" stroke-dashoffset="${2*Math.PI*24*(1-waterPct/100)}"
            stroke-linecap="round" transform="rotate(-90 28 28)" style="transition:stroke-dashoffset 0.4s"/>
          <text x="28" y="33" text-anchor="middle" font-family="Orbitron" font-size="11" font-weight="700" fill="#00b4ff">${cups}</text>
        </svg>
        <div style="flex:1">
          <div style="font-family:var(--font-hud);font-size:18px;color:var(--accent)">
            ${mlToDisplay(waterMl)} <span style="font-size:11px;color:var(--text3)">/ ${getWaterGoalDisplay()}</span>
          </div>
          <div style="font-family:var(--font-mono);font-size:9px;color:${goalHit?'var(--green)':'var(--text3)'};margin-top:2px">
            ${goalHit ? '✓ Daily water goal reached!' : `${cupGoal - cups} cups remaining · ${getCupSizeDisplay()} per cup`}
          </div>
        </div>
      </div>
      <!-- Cup bubbles -->
      <div style="display:flex;gap:4px;margin-bottom:10px;flex-wrap:wrap">
        ${Array.from({length: Math.max(8, cupGoal)}, (_,n) => `
          <div style="flex:1;min-width:20px;height:22px;background:${n<cups?'rgba(0,180,255,0.35)':'rgba(0,180,255,0.05)'};border:1px solid ${n<cups?'var(--accent)':'var(--border)'};border-radius:4px"></div>
        `).join('')}
      </div>
      <!-- Quick add buttons -->
      <div style="display:flex;gap:6px;margin-bottom:8px">
        <button class="btn-primary" style="flex:1" onclick="addWaterCup()">+ ${getCupSizeDisplay()}</button>
        <button class="btn-secondary" onclick="removeWaterCup()">−</button>
      </div>
      <!-- Manual amount input -->
      <div style="display:flex;gap:8px;align-items:center">
        <input type="number" id="water-manual-input" class="sys-input"
          placeholder="Custom ${getVolumeUnit()} amount..."
          inputmode="decimal" style="flex:1;font-size:13px"/>
        <button class="btn-secondary" onclick="addWaterManual()">ADD</button>
      </div>
      <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-top:6px">
        Enter exact amount in ${getVolumeUnit()} — e.g. ${getIsImperial()?'16':'500'} for a large bottle
      </div>
    </div>

    <!-- LOG FOOD -->
    <div class="section-head">LOG FOOD</div>
    <div class="sys-card" style="margin-bottom:10px">
      <div style="display:flex;gap:4px;margin-bottom:14px;background:rgba(0,0,0,0.2);padding:3px;border-radius:6px;border:1px solid var(--border)">
        <button id="mode-search" onclick="switchFoodMode('search')"
          style="flex:1;padding:7px 2px;background:rgba(0,180,255,0.15);border:none;border-radius:4px;color:var(--accent);font-family:var(--font-hud);font-size:9px;font-weight:600;letter-spacing:0px;cursor:pointer">🔍 SEARCH</button>
        <button id="mode-barcode" onclick="switchFoodMode('barcode')"
          style="flex:1;padding:7px 2px;background:transparent;border:none;border-radius:4px;color:var(--text3);font-family:var(--font-hud);font-size:9px;font-weight:600;letter-spacing:0px;cursor:pointer">📦 SCAN</button>
        <button id="mode-ai" onclick="switchFoodMode('ai')"
          style="flex:1;padding:7px 2px;background:transparent;border:none;border-radius:4px;color:var(--text3);font-family:var(--font-hud);font-size:9px;font-weight:600;letter-spacing:0px;cursor:pointer">🤖 AI</button>
        <button id="mode-manual" onclick="switchFoodMode('manual')"
          style="flex:1;padding:7px 2px;background:transparent;border:none;border-radius:4px;color:var(--text3);font-family:var(--font-hud);font-size:9px;font-weight:600;letter-spacing:0px;cursor:pointer">✏️ MANUAL</button>
        <button id="mode-list" onclick="switchFoodMode('list')"
          style="flex:1;padding:7px 2px;background:transparent;border:none;border-radius:4px;color:var(--text3);font-family:var(--font-hud);font-size:9px;font-weight:600;letter-spacing:0px;cursor:pointer">📋 LIST</button>
      </div>

      <!-- SEARCH -->
      <div id="food-mode-search">
        <input type="text" class="sys-input" id="food-search-input"
          placeholder="Search food (chicken, sushi, pernil...)"
          oninput="filterFoodSearch(this.value)" style="margin-bottom:8px"/>
        <div id="food-search-results" style="max-height:220px;overflow-y:auto;display:flex;flex-direction:column;gap:4px"></div>
      </div>

      <!-- BARCODE SCANNER -->
      <div id="food-mode-barcode" style="display:none">
        <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-bottom:10px;line-height:1.7">
          Scan barcodes from Walmart, Shaw's, Hannaford, or any store. Works on most phones.
        </div>

        <!-- Live camera view -->
        <div id="barcode-camera-wrap" style="display:none;margin-bottom:10px;position:relative;border-radius:10px;overflow:hidden;background:#000">
          <video id="barcode-video" autoplay playsinline muted
            style="width:100%;display:block;max-height:220px;object-fit:cover"></video>
          <!-- Targeting overlay -->
          <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none">
            <div style="width:70%;height:90px;border:2px solid var(--accent);border-radius:6px;position:relative;box-shadow:0 0 0 9999px rgba(0,0,0,0.45)">
              <div style="position:absolute;top:-1px;left:-1px;width:16px;height:16px;border-top:3px solid var(--accent);border-left:3px solid var(--accent);border-radius:2px 0 0 0"></div>
              <div style="position:absolute;top:-1px;right:-1px;width:16px;height:16px;border-top:3px solid var(--accent);border-right:3px solid var(--accent);border-radius:0 2px 0 0"></div>
              <div style="position:absolute;bottom:-1px;left:-1px;width:16px;height:16px;border-bottom:3px solid var(--accent);border-left:3px solid var(--accent);border-radius:0 0 0 2px"></div>
              <div style="position:absolute;bottom:-1px;right:-1px;width:16px;height:16px;border-bottom:3px solid var(--accent);border-right:3px solid var(--accent);border-radius:0 0 2px 0"></div>
              <!-- Scan line animation -->
              <div id="scan-line" style="position:absolute;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--accent),transparent);animation:scanline 1.8s ease-in-out infinite"></div>
            </div>
          </div>
          <button onclick="stopBarcodeCamera()" style="position:absolute;top:8px;right:8px;background:rgba(0,0,0,0.75);border:1px solid var(--border);border-radius:6px;color:#fff;font-family:var(--font-mono);font-size:10px;padding:5px 10px;cursor:pointer">✕ STOP</button>
        </div>
        <style>@keyframes scanline{0%{top:10%}50%{top:85%}100%{top:10%}}</style>

        <div id="barcode-scan-status" style="font-family:var(--font-mono);font-size:10px;color:var(--text3);text-align:center;margin-bottom:10px;min-height:16px"></div>

        <button id="barcode-start-btn" class="btn-primary" style="width:100%;margin-bottom:10px" onclick="startBarcodeCamera()">
          <span>📷 SCAN BARCODE WITH CAMERA</span>
        </button>

        <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);text-align:center;margin-bottom:8px">— or enter barcode number —</div>

        <div style="display:flex;gap:8px;margin-bottom:4px">
          <input type="text" class="sys-input" id="barcode-manual-input"
            placeholder="e.g. 016000275232"
            inputmode="numeric" pattern="[0-9]*"
            style="flex:1;letter-spacing:2px;font-family:var(--font-mono)"
            onkeydown="if(event.key==='Enter')lookupBarcode()"/>
          <button class="btn-secondary" onclick="lookupBarcode()">LOOK UP</button>
        </div>

        <div id="barcode-result" style="margin-top:10px"></div>

        <div style="margin-top:10px;padding:8px 10px;background:rgba(0,180,255,0.04);border:1px solid rgba(0,180,255,0.15);border-radius:6px">
          <div style="font-family:var(--font-mono);font-size:9px;color:var(--accent);margin-bottom:2px">SUPPORTED STORES</div>
          <div style="font-size:11px;color:var(--text3);line-height:1.6">
            Walmart Auburn · Shaw's Auburn · Hannaford Auburn · Market Basket · Any US grocery brand
          </div>
        </div>
      </div>

      <!-- AI FOOD SCANNER -->
      <div id="food-mode-ai" style="display:none">
        <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-bottom:10px;line-height:1.7">
          Take a photo of your food, meal, or nutrition label. AI estimates the macros automatically.
        </div>

        <div id="ai-camera-wrap" style="display:none;margin-bottom:10px;position:relative;border-radius:10px;overflow:hidden;background:#000">
          <video id="ai-video" autoplay playsinline muted style="width:100%;display:block;max-height:260px;object-fit:cover"></video>
          <button onclick="captureAIPhoto()" style="position:absolute;bottom:12px;left:50%;transform:translateX(-50%);width:60px;height:60px;border-radius:50%;background:rgba(255,255,255,0.15);border:3px solid #fff;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:24px">📸</button>
          <button onclick="stopAICamera()" style="position:absolute;top:8px;right:8px;background:rgba(0,0,0,0.75);border:1px solid var(--border);border-radius:6px;color:#fff;font-family:var(--font-mono);font-size:10px;padding:5px 10px;cursor:pointer">✕ STOP</button>
        </div>

        <canvas id="ai-canvas" style="display:none"></canvas>

        <div id="ai-status" style="font-family:var(--font-mono);font-size:10px;color:var(--text3);text-align:center;margin-bottom:10px;min-height:16px"></div>

        <div style="display:flex;gap:8px;margin-bottom:8px">
          <button class="btn-primary" style="flex:1" onclick="startAICamera()">
            <span>📷 TAKE FOOD PHOTO</span>
          </button>
          <button class="btn-secondary" onclick="document.getElementById('ai-file-input').click()">GALLERY</button>
        </div>
        <input type="file" id="ai-file-input" accept="image/*" style="display:none" onchange="handleAIPhotoFile(this)"/>

        <div id="ai-preview" style="margin-bottom:8px"></div>
        <div id="ai-result" style="margin-top:6px"></div>

        <div style="margin-top:10px;padding:8px 10px;background:rgba(168,85,247,0.06);border:1px solid rgba(168,85,247,0.25);border-radius:6px">
          <div style="font-family:var(--font-mono);font-size:9px;color:var(--purple);margin-bottom:2px">ℹ AI SCANNER</div>
          <div style="font-size:11px;color:var(--text3);line-height:1.6">
            Works best with a clear photo of your plate, meal, or a nutrition label. AI estimates macros — always verify for accuracy.
          </div>
        </div>
      </div>

      <!-- MANUAL -->
      <div id="food-mode-manual" style="display:none">
        <!-- Meal time selector -->
        <div style="display:flex;gap:6px;margin-bottom:10px">
          ${['🌅 Breakfast','☀️ Lunch','🌙 Dinner','🍎 Snack'].map(label => {
            const [icon, name] = label.split(' ');
            return `<button onclick="selectMealTime('${name}',this)" class="meal-time-btn" style="
              flex:1;padding:6px 2px;border-radius:6px;cursor:pointer;
              background:var(--bg3);border:1px solid var(--border);
              color:var(--text3);font-family:var(--font-mono);font-size:9px;
              display:flex;flex-direction:column;align-items:center;gap:2px;
            "><span style="font-size:14px">${icon}</span>${name}</button>`;
          }).join('')}
        </div>
        <input type="text" class="sys-input" id="manual-name" placeholder="Food name..." style="margin-bottom:8px"/>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px">
          <div>
            <label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);display:block;margin-bottom:4px">CALORIES</label>
            <input type="number" class="sys-input" id="manual-cal" placeholder="420" inputmode="numeric"/>
          </div>
          <div>
            <label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);display:block;margin-bottom:4px">PROTEIN (g)</label>
            <input type="number" class="sys-input" id="manual-protein" placeholder="35" inputmode="numeric"/>
          </div>
          <div>
            <label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);display:block;margin-bottom:4px">CARBS (g)</label>
            <input type="number" class="sys-input" id="manual-carbs" placeholder="45" inputmode="numeric"/>
          </div>
          <div>
            <label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);display:block;margin-bottom:4px">FAT (g)</label>
            <input type="number" class="sys-input" id="manual-fat" placeholder="10" inputmode="numeric"/>
          </div>
        </div>
        <button class="btn-primary" onclick="logManualFood()"><span>LOG FOOD</span><div class="btn-arrow">▶</div></button>
      </div>

      <!-- LIST -->
      <div id="food-mode-list" style="display:none">
        <select class="sys-input" id="food-select" style="margin-bottom:10px">
          <option value="">Choose food...</option>
          ${foodOptions}
        </select>
        <button class="btn-primary" onclick="logSelectedFood()"><span>LOG FOOD</span><div class="btn-arrow">▶</div></button>
      </div>
    </div>

    <!-- CALORIE & MACRO CALCULATOR -->
    <div class="section-head">CALORIE & MACRO CALCULATOR</div>
    <div class="sys-card" style="margin-bottom:10px">
      <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-bottom:10px;line-height:1.6">
        Calculate your personalized daily targets. Results auto-fill your macro goals.
      </div>
      ${renderCalMacroCalculator()}
    </div>

    <!-- TODAY'S LOG -->
    <div class="section-head">TODAY'S LOG</div>
  `;

  if (log.length === 0) {
    html += `<div style="text-align:center;padding:20px;color:var(--text3);font-family:var(--font-mono);font-size:11px">NO FOOD LOGGED YET</div>`;
  } else {
    // Group by meal time
    const mealOrder = ['Breakfast','Lunch','Dinner','Snack'];
    const grouped = {};
    log.forEach(f => {
      const meal = f.mealTime || 'Snack';
      if (!grouped[meal]) grouped[meal] = [];
      grouped[meal].push(f);
    });

    mealOrder.forEach(meal => {
      if (!grouped[meal] || grouped[meal].length === 0) return;
      const mealTotal = grouped[meal].reduce((a,f) => a + (f.cal||0), 0);
      html += `
        <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:2px;margin-bottom:6px;display:flex;align-items:center;gap:6px">
          <span>${MEAL_ICONS[meal]||'🍽️'}</span>
          <span>${meal.toUpperCase()}</span>
          <span style="color:var(--gold)">${mealTotal} kcal</span>
        </div>
      `;
      grouped[meal].forEach(f => {
        html += `
          <div style="background:var(--panel);border:1px solid var(--border);border-radius:6px;padding:10px 12px;margin-bottom:6px;display:flex;justify-content:space-between;align-items:center">
            <div style="flex:1;min-width:0">
              <div style="font-size:13px;font-weight:600;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${f.name}</div>
              <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-top:2px">${f.time||''} · P:${f.protein||0}g C:${f.carbs||0}g F:${f.fat||0}g</div>
            </div>
            <div style="display:flex;align-items:center;gap:8px;flex-shrink:0">
              <div style="font-family:var(--font-hud);font-size:14px;color:var(--gold)">${f.cal||0}<span style="font-size:9px;color:var(--text3)">kcal</span></div>
              <button onclick="removeFoodEntry('${f._id||''}')" style="background:transparent;border:none;color:var(--text3);font-size:14px;cursor:pointer;padding:2px 4px">×</button>
            </div>
          </div>
        `;
      });
      html += `<div style="margin-bottom:10px"></div>`;
    });
    html += `
      <div style="background:var(--panel);border:1px solid var(--border);border-radius:6px;padding:10px 12px;margin-top:4px">
        <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-bottom:6px">DAILY TOTALS</div>
        <div style="display:flex;justify-content:space-around;text-align:center">
          <div><div style="font-family:var(--font-hud);font-size:16px;color:var(--accent)">${totals.cal}</div><div style="font-family:var(--font-mono);font-size:8px;color:var(--text3)">kcal</div></div>
          <div><div style="font-family:var(--font-hud);font-size:16px;color:var(--green)">${totals.protein}g</div><div style="font-family:var(--font-mono);font-size:8px;color:var(--text3)">protein</div></div>
          <div><div style="font-family:var(--font-hud);font-size:16px;color:var(--gold)">${totals.carbs}g</div><div style="font-family:var(--font-mono);font-size:8px;color:var(--text3)">carbs</div></div>
          <div><div style="font-family:var(--font-hud);font-size:16px;color:var(--red)">${totals.fat}g</div><div style="font-family:var(--font-mono);font-size:8px;color:var(--text3)">fat</div></div>
        </div>
      </div>
    `;
  }

  el.innerHTML = html;
  filterFoodSearch('');
}

// ── CALORIE + MACRO CALCULATOR (combined) ─────────────
function renderCalMacroCalculator() {
  const saved = getCalGoals();
  const imp   = getIsImperial();
  const wUnit = imp ? 'lbs' : 'kg';

  return `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px">
      <div>
        <label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);display:block;margin-bottom:4px">AGE</label>
        <input type="number" class="sys-input" id="calc-age" value="${saved.age||''}" placeholder="25" inputmode="numeric"/>
      </div>
      <div>
        <label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);display:block;margin-bottom:4px">WEIGHT (${wUnit})</label>
        <input type="number" class="sys-input" id="calc-weight" value="${saved.weight||''}" placeholder="${imp?'180':'82'}" inputmode="decimal" step="0.1"/>
      </div>
      ${imp ? `
        <div>
          <label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);display:block;margin-bottom:4px">HEIGHT (feet)</label>
          <input type="number" class="sys-input" id="calc-height-ft" value="${saved.heightFt||''}" placeholder="5" inputmode="numeric" min="3" max="8"/>
        </div>
        <div>
          <label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);display:block;margin-bottom:4px">HEIGHT (inches)</label>
          <input type="number" class="sys-input" id="calc-height-in" value="${saved.heightIn||''}" placeholder="10" inputmode="numeric" min="0" max="11"/>
        </div>
      ` : `
        <div style="grid-column:span 2">
          <label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);display:block;margin-bottom:4px">HEIGHT (cm)</label>
          <input type="number" class="sys-input" id="calc-height-cm" value="${saved.heightCm||''}" placeholder="178" inputmode="numeric"/>
        </div>
      `}
    </div>
    <div style="margin-bottom:8px">
      <label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);display:block;margin-bottom:4px">SEX</label>
      <select class="sys-input" id="calc-sex">
        <option value="m" ${saved.sex==='m'?'selected':''}>Male</option>
        <option value="f" ${saved.sex==='f'?'selected':''}>Female</option>
      </select>
    </div>
    <div style="margin-bottom:8px">
      <label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);display:block;margin-bottom:4px">ACTIVITY LEVEL</label>
      <select class="sys-input" id="calc-activity">
        <option value="1.2"   ${saved.activity==='1.2'   ?'selected':''}>Sedentary — desk job, no exercise</option>
        <option value="1.375" ${saved.activity==='1.375'  ?'selected':''}>Light — 1–3 workouts/week</option>
        <option value="1.55"  ${saved.activity==='1.55'   ?'selected':''}>Moderate — 4–5 workouts/week</option>
        <option value="1.725" ${saved.activity==='1.725'  ?'selected':''}>Active — daily intense training</option>
        <option value="1.9"   ${saved.activity==='1.9'    ?'selected':''}>Very Active — athlete / physical job</option>
      </select>
    </div>
    <div style="margin-bottom:12px">
      <label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);display:block;margin-bottom:4px">GOAL</label>
      <div style="display:flex;gap:6px">
        ${[['cut','Lose Fat'],['maint','Maintain'],['bulk','Build Muscle']].map(([val,lbl])=>`
          <button onclick="document.querySelectorAll('.cgoal-btn').forEach(x=>{x.style.background='var(--bg3)';x.style.borderColor='var(--border)';x.style.color='var(--text3)'});this.style.background='rgba(0,180,255,0.18)';this.style.borderColor='var(--accent)';this.style.color='var(--accent)';window._calcGoal='${val}'"
            class="cgoal-btn" style="flex:1;padding:9px 4px;border-radius:6px;cursor:pointer;font-family:var(--font-ui);font-size:12px;font-weight:600;
            background:${(saved.goal||'cut')===val?'rgba(0,180,255,0.18)':'var(--bg3)'};
            border:1px solid ${(saved.goal||'cut')===val?'var(--accent)':'var(--border)'};
            color:${(saved.goal||'cut')===val?'var(--accent)':'var(--text3)'}">
            ${lbl}</button>
        `).join('')}
      </div>
    </div>
    <button class="btn-primary" onclick="runCalMacroCalc()"><span>CALCULATE & APPLY</span><div class="btn-arrow">▶</div></button>
    <div id="calc-result-food" style="margin-top:12px"></div>
  `;
}

function runCalMacroCalc() {
  const imp  = getIsImperial();
  const age  = parseInt(document.getElementById('calc-age')?.value);
  const wRaw = parseFloat(document.getElementById('calc-weight')?.value);
  const sex  = document.getElementById('calc-sex')?.value || 'm';
  const act  = parseFloat(document.getElementById('calc-activity')?.value) || 1.55;
  const goal = window._calcGoal || (getCalGoals().goal || 'cut');

  // Read height — separate fields for imperial, single cm field for metric
  let hCm;
  if (imp) {
    const ft = parseInt(document.getElementById('calc-height-ft')?.value) || 0;
    const inches = parseInt(document.getElementById('calc-height-in')?.value) || 0;
    if (!ft) { showNotif('[ ERROR ] Enter height in feet'); return; }
    hCm = Math.round((ft * 12 + inches) * 2.54); // total inches → cm
  } else {
    hCm = parseFloat(document.getElementById('calc-height-cm')?.value) || 0;
    if (!hCm) { showNotif('[ ERROR ] Enter height in cm'); return; }
  }

  if (!age || !wRaw || !hCm) { showNotif('[ ERROR ] Fill in all fields'); return; }

  // Always compute in metric (Mifflin-St Jeor)
  const wKg = imp ? wRaw / 2.20462 : wRaw;
  const bmr = sex === 'm'
    ? 10*wKg + 6.25*hCm - 5*age + 5
    : 10*wKg + 6.25*hCm - 5*age - 161;

  if (bmr < 800 || bmr > 5000) {
    showNotif('[ ERROR ] Check your values — result looks wrong'); return;
  }

  const tdee   = Math.round(bmr * act);
  const adj    = goal === 'cut' ? -500 : goal === 'bulk' ? 250 : 0;
  const target = Math.max(1200, tdee + adj);

  const proteinPct = goal === 'cut' ? 0.35 : 0.30;
  const protein    = Math.round((target * proteinPct) / 4);
  const fat        = Math.round((target * 0.25) / 9);
  const carbs      = Math.round((target - protein*4 - fat*9) / 4);
  const weekly     = goal === 'cut' ? '~0.5kg/week loss' : goal === 'bulk' ? '~0.25kg/week gain' : 'Maintenance';

  // Save inputs for next time
  localStorage.setItem('sys_calgoals_hunter', JSON.stringify({
    age, weight: wRaw,
    heightCm: imp ? undefined : hCm,
    heightFt: imp ? parseInt(document.getElementById('calc-height-ft')?.value)||0 : undefined,
    heightIn: imp ? parseInt(document.getElementById('calc-height-in')?.value)||0 : undefined,
    sex, activity: String(act), goal,
  }));
  // Apply to macro goals
  localStorage.setItem('sys_macro_goals', JSON.stringify({ cal: target, protein, carbs, fat }));
  if (typeof saveSettings === 'function') saveSettings({ calorieGoal: target });

  const res = document.getElementById('calc-result-food');
  if (res) res.innerHTML = `
    <div style="border-top:1px solid var(--border);padding-top:12px">
      <div style="font-family:var(--font-mono);font-size:9px;color:var(--green);letter-spacing:2px;margin-bottom:10px">✓ GOALS APPLIED TO MACRO TRACKER</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px">
        <div style="background:var(--bg3);border:1px solid var(--border);border-radius:6px;padding:10px;text-align:center">
          <div style="font-family:var(--font-hud);font-size:18px;color:var(--text3)">${tdee}</div>
          <div style="font-family:var(--font-mono);font-size:8px;color:var(--text3)">MAINTENANCE</div>
        </div>
        <div style="background:var(--bg3);border:1px solid ${goal==='cut'?'var(--green)':goal==='bulk'?'var(--gold)':'var(--accent)'};border-radius:6px;padding:10px;text-align:center">
          <div style="font-family:var(--font-hud);font-size:18px;color:${goal==='cut'?'var(--green)':goal==='bulk'?'var(--gold)':'var(--accent)'}">${target}</div>
          <div style="font-family:var(--font-mono);font-size:8px;color:var(--text3)">DAILY TARGET</div>
        </div>
      </div>
      <div style="display:flex;gap:6px;margin-bottom:8px">
        <span class="stat-pill pill-green" style="flex:1;justify-content:center">P: ${protein}g</span>
        <span class="stat-pill pill-gold" style="flex:1;justify-content:center">C: ${carbs}g</span>
        <span class="stat-pill pill-red" style="flex:1;justify-content:center">F: ${fat}g</span>
      </div>
      <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);text-align:center">${weekly} · BMR: ${Math.round(bmr)} kcal</div>
    </div>
  `;

  showNotif('[ CALCULATOR ] Targets applied to macro tracker!', 'gold');
  setTimeout(() => renderNutritionPage(), 400);
}

function getCalGoals() {
  try { return JSON.parse(localStorage.getItem('sys_calgoals_hunter')||'{}'); }
  catch { return {}; }
}

function getMacroGoals() {
  try { return JSON.parse(localStorage.getItem('sys_macro_goals')||'{"cal":2000,"protein":150,"carbs":250,"fat":65}'); }
  catch { return {cal:2000,protein:150,carbs:250,fat:65}; }
}

// ── WATER FUNCTIONS ───────────────────────────────────
function addWaterCup() {
  const today  = new Date().toLocaleDateString();
  const data   = getHydrationData();
  const prev   = data.date === today ? (data.cups||0) : 0;
  const next   = Math.min(30, prev + 1);
  const goal   = getWaterCupGoal();
  saveHydrationData(next);
  // XP ONLY when crossing the goal threshold for the first time
  if (next >= goal && prev < goal) {
    addXP(20, 'vit');
    showNotif('[ HYDRATION ] Daily goal reached! +20 XP', 'gold');
  } else {
    showNotif(`[ HYDRATION ] ${next} cups · ${mlToDisplay(next * getCupSizeMl())}`);
  }
  renderNutritionPage();
}

function removeWaterCup() {
  const today = new Date().toLocaleDateString();
  const data  = getHydrationData();
  const cups  = data.date === today ? Math.max(0, (data.cups||0) - 1) : 0;
  saveHydrationData(cups);
  // Never award or remove XP on undo
  renderNutritionPage();
}

function addWaterManual() {
  const input = document.getElementById('water-manual-input');
  const val   = parseFloat(input?.value);
  if (!val || val <= 0) { showNotif('[ ERROR ] Enter a valid amount'); return; }

  // Convert fl oz to ml if imperial
  const ml   = getIsImperial() ? val * 29.5735 : val;
  const cups = Math.max(1, Math.round(ml / getCupSizeMl()));

  const today = new Date().toLocaleDateString();
  const data  = getHydrationData();
  const prev  = data.date === today ? (data.cups||0) : 0;
  const next  = Math.min(30, prev + cups);
  const goal  = getWaterCupGoal();
  saveHydrationData(next);

  if (next >= goal && prev < goal) {
    addXP(20, 'vit');
    showNotif(`[ HYDRATION ] ${mlToDisplay(ml)} added — Goal reached! +20 XP`, 'gold');
  } else {
    showNotif(`[ HYDRATION ] +${mlToDisplay(ml)} · Total: ${mlToDisplay(next * getCupSizeMl())}`);
  }

  if (input) input.value = '';
  renderNutritionPage();
}

// Aliases for MIND tab
function addCup()    { addWaterCup();    }
function removeCup() { removeWaterCup(); }

// ── HYDRATION STORAGE ─────────────────────────────────
function getHydrationData() {
  try { return JSON.parse(localStorage.getItem('sys_hydration_hunter')||'{}'); }
  catch { return {}; }
}
function saveHydrationData(cups) {
  const d = getHydrationData();
  d.date = new Date().toLocaleDateString();
  d.cups = cups;
  localStorage.setItem('sys_hydration_hunter', JSON.stringify(d));
}

// ── REMOVE FOOD ENTRY ─────────────────────────────────
function removeFoodEntry(id) {
  if (!HUNTER.foodLog) return;
  if (id) {
    HUNTER.foodLog = HUNTER.foodLog.filter(f => f._id !== id);
  } else {
    HUNTER.foodLog.pop();
  }
  persist();
  renderNutritionPage();
}

// ── MODE SWITCHER ─────────────────────────────────────
function switchFoodMode(mode) {
  ['search','barcode','ai','manual','list'].forEach(m => {
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
  if (mode !== 'barcode') stopBarcodeCamera();
  if (mode !== 'ai') stopAICamera();
}

// ── MEAL TIME ─────────────────────────────────────────
let _currentMealTime = null;

function selectMealTime(name, btn) {
  _currentMealTime = name;
  document.querySelectorAll('.meal-time-btn').forEach(b => {
    b.style.background = 'var(--bg3)';
    b.style.borderColor = 'var(--border)';
    b.style.color = 'var(--text3)';
  });
  if (btn) {
    btn.style.background = 'rgba(0,180,255,0.15)';
    btn.style.borderColor = 'var(--accent)';
    btn.style.color = 'var(--accent)';
  }
}

function getAutoMealTime() {
  if (_currentMealTime) return _currentMealTime;
  const h = new Date().getHours();
  if (h >= 5  && h < 11) return 'Breakfast';
  if (h >= 11 && h < 15) return 'Lunch';
  if (h >= 17 && h < 21) return 'Dinner';
  return 'Snack';
}

const MEAL_ICONS = { Breakfast:'🌅', Lunch:'☀️', Dinner:'🌙', Snack:'🍎' };

// ── FOOD SEARCH ───────────────────────────────────────
function filterFoodSearch(query) {
  const container = document.getElementById('food-search-results');
  if (!container) return;
  const q = (query||'').trim().toLowerCase();
  const results = q.length===0 ? FOOD_DB.slice(0,25) : FOOD_DB.filter(f=>f.name.toLowerCase().includes(q)).slice(0,40);
  if (results.length === 0) {
    container.innerHTML = `<div style="text-align:center;padding:14px;color:var(--text3);font-family:var(--font-mono);font-size:10px">NO RESULTS — <span style="color:var(--accent);cursor:pointer" onclick="switchFoodMode('manual')">ADD MANUALLY</span></div>`;
    return;
  }
  container.innerHTML = results.map(f => {
    const idx = FOOD_DB.indexOf(f);
    return `
      <div onclick="logFoodByIndex(${idx})" style="display:flex;align-items:center;gap:10px;padding:9px 10px;background:var(--panel);border:1px solid var(--border);border-radius:6px;cursor:pointer"
        onmouseover="this.style.borderColor='var(--accent)'" onmouseout="this.style.borderColor='var(--border)'">
        <div style="flex:1;min-width:0">
          <div style="font-size:13px;font-weight:600;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${f.name}</div>
          <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-top:1px">P:${f.protein}g · C:${f.carbs}g · F:${f.fat}g</div>
        </div>
        <div style="font-family:var(--font-hud);font-size:13px;color:var(--gold);flex-shrink:0">${f.cal}<span style="font-size:9px;color:var(--text3)">kcal</span></div>
      </div>
    `;
  }).join('');
}

function logFoodByIndex(index) {
  const food = FOOD_DB[index];
  if (!food) return;
  addFoodEntry({ ...food, mealTime: getAutoMealTime(), source:'search' });
  showNotif(`[ FOOD ] ${food.name} logged`);
  const inp = document.getElementById('food-search-input');
  if (inp) inp.value = '';
  filterFoodSearch('');
}

function logManualFood() {
  const name    = document.getElementById('manual-name')?.value.trim();
  const cal     = parseInt(document.getElementById('manual-cal')?.value)     || 0;
  const protein = parseInt(document.getElementById('manual-protein')?.value) || 0;
  const carbs   = parseInt(document.getElementById('manual-carbs')?.value)   || 0;
  const fat     = parseInt(document.getElementById('manual-fat')?.value)     || 0;
  if (!name)  { showNotif('[ ERROR ] Enter a food name'); return; }
  if (cal < 1){ showNotif('[ ERROR ] Enter calories');    return; }
  addFoodEntry({ name, cal, protein, carbs, fat, mealTime: getAutoMealTime(), source:'manual' });
  showNotif(`[ FOOD ] ${name} logged`);
  ['manual-name','manual-cal','manual-protein','manual-carbs','manual-fat']
    .forEach(id => { const el=document.getElementById(id); if(el) el.value=''; });
  _currentMealTime = null;
}

function logSelectedFood() {
  const sel = document.getElementById('food-select');
  const idx = parseInt(sel?.value);
  if (isNaN(idx)) { showNotif('[ SYSTEM ] Select a food item'); return; }
  addFoodEntry({ ...FOOD_DB[idx], mealTime: getAutoMealTime(), source:'list' });
  showNotif(`[ FOOD ] ${FOOD_DB[idx].name} logged`);
  if (sel) sel.value = '';
}

// ── LOCAL MAINE STORE PRODUCT DATABASE ───────────────
// Products from Shaw's, Hannaford, Walmart Auburn ME
// Keyed by UPC barcode
const LOCAL_PRODUCTS = {
  // Shaw's & Hannaford store brands + common Auburn products
  '041498160036': { name: "Shaw's Large Eggs (1 egg)",         cal:70,  protein:6,  carbs:0,  fat:5  },
  '041498121564': { name: "Shaw's Whole Milk (1 cup)",          cal:150, protein:8,  carbs:12, fat:8  },
  '041498118052': { name: "Shaw's 2% Milk (1 cup)",             cal:120, protein:8,  carbs:12, fat:5  },
  '041498193411': { name: "Shaw's Greek Yogurt Plain (170g)",   cal:100, protein:17, carbs:6,  fat:0  },
  '041498120147': { name: "Shaw's Chicken Breast (100g)",       cal:110, protein:23, carbs:0,  fat:2  },
  '041498130290': { name: "Shaw's 93% Lean Ground Beef (100g)", cal:150, protein:22, carbs:0,  fat:7  },
  '041498170019': { name: "Shaw's Oats Old Fashioned (40g)",    cal:150, protein:5,  carbs:27, fat:3  },
  '041498140053': { name: "Shaw's Canned Tuna in Water (85g)",  cal:70,  protein:16, carbs:0,  fat:1  },
  '041498191011': { name: "Shaw's Brown Rice (45g dry)",        cal:160, protein:4,  carbs:34, fat:1  },
  '072470001047': { name: "Hannaford Chicken Breast (100g)",    cal:110, protein:23, carbs:0,  fat:2  },
  '072470003003': { name: "Hannaford 2% Milk (1 cup)",          cal:120, protein:8,  carbs:12, fat:5  },
  '072470008008': { name: "Hannaford Large Eggs (1 egg)",       cal:70,  protein:6,  carbs:0,  fat:5  },
  '072470007505': { name: "Hannaford Greek Yogurt (170g)",      cal:90,  protein:15, carbs:7,  fat:0  },
  '072470002006': { name: "Hannaford Ground Turkey 93% (100g)", cal:130, protein:20, carbs:0,  fat:5  },
  // Great Value (Walmart)
  '078742241791': { name: "Great Value Chicken Breast (100g)",  cal:110, protein:23, carbs:0,  fat:2  },
  '078742004440': { name: "Great Value Large Eggs (1 egg)",     cal:70,  protein:6,  carbs:0,  fat:5  },
  '078742001500': { name: "Great Value Whole Milk (1 cup)",     cal:150, protein:8,  carbs:12, fat:8  },
  '078742055091': { name: "Great Value Oats (40g)",             cal:150, protein:5,  carbs:27, fat:3  },
  '078742079202': { name: "Great Value Brown Rice (45g dry)",   cal:160, protein:4,  carbs:34, fat:1  },
  '078742039909': { name: "Great Value Tuna in Water (85g)",    cal:70,  protein:16, carbs:0,  fat:1  },
  '078742063270': { name: "Great Value Peanut Butter (32g)",    cal:190, protein:7,  carbs:7,  fat:16 },
  '078742047461': { name: "Great Value Olive Oil (14ml)",       cal:120, protein:0,  carbs:0,  fat:14 },
  // Common national brands sold at all 3 stores
  '049000028911': { name: "Coca-Cola 12oz can",                 cal:140, protein:0,  carbs:39, fat:0  },
  '012000001611': { name: "Pepsi 12oz can",                     cal:150, protein:0,  carbs:41, fat:0  },
  '038000138416': { name: "Kellogg's Special K (30g)",          cal:110, protein:6,  carbs:22, fat:0  },
  '016000275232': { name: "Cheerios (28g)",                     cal:100, protein:3,  carbs:20, fat:2  },
  '030000056028': { name: "Quaker Oats (40g)",                  cal:150, protein:5,  carbs:27, fat:3  },
  '013800001856': { name: "Dannon Oikos Greek Yogurt (170g)",   cal:130, protein:11, carbs:14, fat:3  },
  '021130026203': { name: "Tillamook Cheddar Cheese (28g)",     cal:110, protein:7,  carbs:0,  fat:9  },
  '070038575467': { name: "Nature Valley Granola Bar (2 bars)", cal:190, protein:4,  carbs:29, fat:7  },
  '040000529828': { name: "Reese's Peanut Butter Cup (34g)",    cal:180, protein:4,  carbs:21, fat:11 },
  '021130126095': { name: "Quest Protein Bar (60g)",            cal:190, protein:20, carbs:21, fat:8  },
  '722252303141': { name: "Premier Protein Shake (325ml)",      cal:160, protein:30, carbs:5,  fat:3  },
  '010700020006': { name: "Muscle Milk Protein Shake (330ml)",  cal:160, protein:25, carbs:9,  fat:6  },
};

// ── BARCODE SCANNER (ZXing — works all browsers) ──────
let _barcodeStream   = null;
let _zxingReader     = null;
let _barcodeRunning  = false;

async function startBarcodeCamera() {
  const statusEl   = document.getElementById('barcode-scan-status');
  const cameraWrap = document.getElementById('barcode-camera-wrap');
  const video      = document.getElementById('barcode-video');
  const startBtn   = document.getElementById('barcode-start-btn');
  if (!video) return;

  // Load ZXing from CDN
  if (!window.ZXing) {
    if (statusEl) { statusEl.textContent = 'Loading scanner library...'; statusEl.style.color = 'var(--text3)'; }
    try {
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/zxing-js/0.21.3/zxing.min.js');
    } catch {
      // Try alternate CDN
      try {
        await loadScript('https://unpkg.com/@zxing/library@0.21.3/umd/index.min.js');
      } catch {
        if (statusEl) { statusEl.textContent = 'Scanner unavailable — type barcode below.'; statusEl.style.color = 'var(--red)'; }
        return;
      }
    }
  }

  try {
    if (statusEl) { statusEl.textContent = 'Starting camera...'; statusEl.style.color = 'var(--text3)'; }
    if (startBtn) startBtn.style.display = 'none';

    _barcodeStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 }, height: { ideal: 720 } }
    });
    video.srcObject = _barcodeStream;
    await video.play();
    if (cameraWrap) cameraWrap.style.display = 'block';
    if (statusEl) { statusEl.textContent = 'Point at a barcode — keep it steady'; statusEl.style.color = 'var(--accent)'; }

    _barcodeRunning = true;

    // Use ZXing if available, otherwise fall back to native BarcodeDetector
    if (window.ZXing?.BrowserMultiFormatReader) {
      _zxingReader = new ZXing.BrowserMultiFormatReader();
      _zxingReader.decodeFromVideoElement(video, (result, err) => {
        if (!_barcodeRunning) return;
        if (result) {
          const code = result.getText();
          _barcodeRunning = false;
          stopBarcodeCamera();
          const input = document.getElementById('barcode-manual-input');
          if (input) input.value = code;
          if (statusEl) { statusEl.textContent = '✓ Barcode detected: ' + code; statusEl.style.color = 'var(--green)'; }
          lookupBarcodeCode(code);
        }
      });
    } else if ('BarcodeDetector' in window) {
      // Native fallback
      const detector = new BarcodeDetector({ formats: ['ean_13','ean_8','upc_a','upc_e','code_128','code_39','qr_code'] });
      const scan = setInterval(async () => {
        if (!_barcodeRunning) { clearInterval(scan); return; }
        if (video.readyState < 2) return;
        try {
          const results = await detector.detect(video);
          if (results.length > 0) {
            clearInterval(scan);
            const code = results[0].rawValue;
            _barcodeRunning = false;
            stopBarcodeCamera();
            const input = document.getElementById('barcode-manual-input');
            if (input) input.value = code;
            if (statusEl) { statusEl.textContent = '✓ Barcode detected: ' + code; statusEl.style.color = 'var(--green)'; }
            lookupBarcodeCode(code);
          }
        } catch {}
      }, 400);
    } else {
      // No scanner support at all
      stopBarcodeCamera();
      if (statusEl) { statusEl.textContent = 'Camera scanning not supported — type barcode below.'; statusEl.style.color = 'var(--gold)'; }
      if (startBtn) startBtn.style.display = 'block';
    }

  } catch (err) {
    if (startBtn) startBtn.style.display = 'block';
    if (statusEl) {
      statusEl.textContent = err.name === 'NotAllowedError'
        ? '⚠ Camera permission denied. Type barcode below instead.'
        : '⚠ Camera error: ' + (err.message || 'unknown');
      statusEl.style.color = 'var(--red)';
    }
  }
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector('script[src="'+src+'"]')) { resolve(); return; }
    const s = document.createElement('script');
    s.src = src; s.onload = resolve; s.onerror = reject;
    document.head.appendChild(s);
  });
}

function stopBarcodeCamera() {
  _barcodeRunning = false;
  if (_zxingReader) { try { _zxingReader.reset(); } catch {} _zxingReader = null; }
  if (_barcodeStream) { _barcodeStream.getTracks().forEach(t => t.stop()); _barcodeStream = null; }
  const wrap  = document.getElementById('barcode-camera-wrap');
  const video = document.getElementById('barcode-video');
  const btn   = document.getElementById('barcode-start-btn');
  if (wrap)  wrap.style.display  = 'none';
  if (video) video.srcObject = null;
  if (btn)   btn.style.display   = 'block';
}

function lookupBarcode() {
  const input = document.getElementById('barcode-manual-input');
  const code  = input?.value.trim().replace(/\D/g, '');
  if (!code || code.length < 6) { showNotif('[ ERROR ] Enter a valid barcode number'); return; }
  lookupBarcodeCode(code);
}

async function lookupBarcodeCode(code) {
  const statusEl = document.getElementById('barcode-scan-status');
  const resultEl = document.getElementById('barcode-result');
  if (statusEl) { statusEl.textContent = 'Looking up ' + code + '...'; statusEl.style.color = 'var(--text3)'; }
  if (resultEl) resultEl.innerHTML = '<div style="text-align:center;padding:14px;font-family:var(--font-mono);font-size:10px;color:var(--text3)">⏳ Searching database...</div>';

  // Check local store database first (instant)
  const local = LOCAL_PRODUCTS[code];
  if (local) {
    showBarcodeResult(code, local.name, '', local.cal, local.protein, local.carbs, local.fat, 0, 0, null, 100);
    if (statusEl) { statusEl.textContent = '✓ Found in local store database'; statusEl.style.color = 'var(--green)'; }
    return;
  }

  // Try Open Food Facts
  try {
    const res  = await fetch('https://world.openfoodfacts.org/api/v2/product/' + code + '.json');
    const data = await res.json();

    if (data.status !== 1 || !data.product) {
      if (statusEl) { statusEl.textContent = 'Product not found in database.'; statusEl.style.color = 'var(--red)'; }
      if (resultEl) resultEl.innerHTML = `
        <div style="padding:12px;background:rgba(255,51,85,0.06);border:1px solid rgba(255,51,85,0.25);border-radius:6px">
          <div style="font-family:var(--font-mono);font-size:10px;color:var(--red);margin-bottom:4px">PRODUCT NOT FOUND</div>
          <div style="font-size:12px;color:var(--text3);line-height:1.6">
            Barcode <strong>${code}</strong> isn't in our database yet.<br>
            <span style="color:var(--accent);cursor:pointer" onclick="switchFoodMode('manual')">→ Enter manually</span> or try a different barcode.
          </div>
        </div>
      `;
      return;
    }

    const p      = data.product;
    const nutr   = p.nutriments || {};
    const name   = p.product_name || p.abbreviated_product_name || 'Unknown Product';
    const brand  = p.brands || '';
    const cal    = Math.round(nutr['energy-kcal_100g'] || nutr['energy-kcal'] || 0);
    const protein= Math.round((nutr['proteins_100g']       || 0) * 10) / 10;
    const carbs  = Math.round((nutr['carbohydrates_100g']  || 0) * 10) / 10;
    const fat    = Math.round((nutr['fat_100g']            || 0) * 10) / 10;
    const fiber  = Math.round((nutr['fiber_100g']          || 0) * 10) / 10;
    const sodium = Math.round((nutr['sodium_100g'] || 0) * 1000);
    const img    = p.image_small_url || p.image_url || null;

    if (statusEl) { statusEl.textContent = '✓ Found: ' + name; statusEl.style.color = 'var(--green)'; }
    showBarcodeResult(code, name, brand, cal, protein, carbs, fat, fiber, sodium, img, 100);

  } catch (err) {
    if (statusEl) { statusEl.textContent = 'Network error — check your connection.'; statusEl.style.color = 'var(--red)'; }
    if (resultEl) resultEl.innerHTML = '<div style="font-family:var(--font-mono);font-size:10px;color:var(--red);text-align:center;padding:10px">Could not reach database. Check internet connection.</div>';
  }
}

function showBarcodeResult(code, name, brand, cal, protein, carbs, fat, fiber, sodium, img, grams) {
  const resultEl = document.getElementById('barcode-result');
  if (!resultEl) return;
  resultEl.innerHTML = `
    <div style="background:rgba(0,229,160,0.06);border:1px solid rgba(0,229,160,0.25);border-radius:8px;padding:12px">
      <div style="display:flex;gap:10px;align-items:flex-start;margin-bottom:10px">
        ${img ? `<img src="${img}" style="width:52px;height:52px;object-fit:contain;border-radius:6px;background:#fff;flex-shrink:0"/>` : '<div style="width:52px;height:52px;background:var(--bg3);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0">📦</div>'}
        <div style="flex:1;min-width:0">
          <div style="font-size:14px;font-weight:600;color:var(--text);line-height:1.3">${name}</div>
          ${brand ? `<div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-top:2px">${brand}</div>` : ''}
          <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-top:1px">per 100g · #${code}</div>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:5px;margin-bottom:10px">
        <div style="text-align:center;background:var(--bg3);border-radius:5px;padding:6px">
          <div style="font-family:var(--font-hud);font-size:15px;color:var(--accent)">${cal}</div>
          <div style="font-family:var(--font-mono);font-size:8px;color:var(--text3)">kcal</div>
        </div>
        <div style="text-align:center;background:var(--bg3);border-radius:5px;padding:6px">
          <div style="font-family:var(--font-hud);font-size:15px;color:var(--green)">${protein}g</div>
          <div style="font-family:var(--font-mono);font-size:8px;color:var(--text3)">protein</div>
        </div>
        <div style="text-align:center;background:var(--bg3);border-radius:5px;padding:6px">
          <div style="font-family:var(--font-hud);font-size:15px;color:var(--gold)">${carbs}g</div>
          <div style="font-family:var(--font-mono);font-size:8px;color:var(--text3)">carbs</div>
        </div>
        <div style="text-align:center;background:var(--bg3);border-radius:5px;padding:6px">
          <div style="font-family:var(--font-hud);font-size:15px;color:var(--red)">${fat}g</div>
          <div style="font-family:var(--font-mono);font-size:8px;color:var(--text3)">fat</div>
        </div>
      </div>
      <div style="display:flex;gap:8px;align-items:center;margin-bottom:10px">
        <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);flex-shrink:0">LOG AMOUNT:</div>
        <input type="number" id="barcode-grams" value="${grams}" min="1" max="2000" inputmode="numeric" class="sys-input" style="flex:1;text-align:center"/>
        <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);flex-shrink:0">grams</div>
      </div>
      <button class="btn-primary" style="width:100%" onclick="logBarcodeFood('${name.replace(/'/g,"\\'").replace(/"/g,'&quot;')}',${cal},${protein},${carbs},${fat})">
        <span>✓ ADD TO LOG</span><div class="btn-arrow">▶</div>
      </button>
    </div>
  `;
}

function logBarcodeFood(name, calPer100, proteinPer100, carbsPer100, fatPer100) {
  const grams = parseFloat(document.getElementById('barcode-grams')?.value) || 100;
  const r     = grams / 100;
  addFoodEntry({
    name:    name + ' (' + grams + 'g)',
    cal:     Math.round(calPer100 * r),
    protein: Math.round(proteinPer100 * r * 10) / 10,
    carbs:   Math.round(carbsPer100 * r * 10) / 10,
    fat:     Math.round(fatPer100 * r * 10) / 10,
    mealTime: getAutoMealTime(),
    source:  'barcode',
  });
  showNotif('[ FOOD ] ' + name + ' (' + grams + 'g) logged');
  const resultEl = document.getElementById('barcode-result');
  const statusEl = document.getElementById('barcode-scan-status');
  const input    = document.getElementById('barcode-manual-input');
  if (resultEl) resultEl.innerHTML = '';
  if (statusEl) { statusEl.textContent = '✓ Food logged!'; statusEl.style.color = 'var(--green)'; }
  if (input)    input.value = '';
}

// ── AI FOOD SCANNER ───────────────────────────────────
let _aiStream = null;

async function startAICamera() {
  const wrap    = document.getElementById('ai-camera-wrap');
  const video   = document.getElementById('ai-video');
  const statusEl = document.getElementById('ai-status');
  if (!video) return;
  try {
    if (statusEl) { statusEl.textContent = 'Starting camera...'; statusEl.style.color = 'var(--text3)'; }
    _aiStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 } }
    });
    video.srcObject = _aiStream;
    await video.play();
    if (wrap) wrap.style.display = 'block';
    if (statusEl) { statusEl.textContent = 'Point camera at your food and tap 📸'; statusEl.style.color = 'var(--accent)'; }
  } catch (err) {
    if (statusEl) {
      statusEl.textContent = err.name === 'NotAllowedError'
        ? 'Camera permission denied — use Gallery instead.'
        : 'Camera error — use Gallery button instead.';
      statusEl.style.color = 'var(--red)';
    }
  }
}

function stopAICamera() {
  if (_aiStream) { _aiStream.getTracks().forEach(t => t.stop()); _aiStream = null; }
  const wrap  = document.getElementById('ai-camera-wrap');
  const video = document.getElementById('ai-video');
  if (wrap)  wrap.style.display = 'none';
  if (video) video.srcObject = null;
}

function captureAIPhoto() {
  const video  = document.getElementById('ai-video');
  const canvas = document.getElementById('ai-canvas');
  if (!video || !canvas) return;
  canvas.width  = video.videoWidth  || 640;
  canvas.height = video.videoHeight || 480;
  canvas.getContext('2d').drawImage(video, 0, 0);
  stopAICamera();
  const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
  analyzeWithAI(dataUrl);
}

function handleAIPhotoFile(input) {
  const file = input.files[0]; if (!file) return;
  if (file.size > 10 * 1024 * 1024) { showNotif('[ ERROR ] Image too large — max 10MB'); return; }
  const reader = new FileReader();
  reader.onload = e => analyzeWithAI(e.target.result);
  reader.readAsDataURL(file);
  input.value = '';
}

async function analyzeWithAI(dataUrl) {
  const previewEl = document.getElementById('ai-preview');
  const resultEl  = document.getElementById('ai-result');
  const statusEl  = document.getElementById('ai-status');

  // Show preview
  if (previewEl) previewEl.innerHTML = `<img src="${dataUrl}" style="width:100%;max-height:180px;object-fit:contain;border-radius:8px;border:1px solid var(--border);margin-bottom:8px"/>`;

  if (statusEl) { statusEl.textContent = '🤖 AI is analyzing your food...'; statusEl.style.color = 'var(--accent)'; }
  if (resultEl) resultEl.innerHTML = `<div style="text-align:center;padding:14px;font-family:var(--font-mono);font-size:10px;color:var(--text3)">⏳ Estimating macros...</div>`;

  // Extract base64 from data URL
  const base64 = dataUrl.split(',')[1];
  const mimeType = dataUrl.split(';')[0].split(':')[1] || 'image/jpeg';

  const prompt = `You are a nutrition expert. Analyze this food image and estimate the macros.

Respond with ONLY a valid JSON object, no markdown, no explanation:
{
  "name": "Food name (be specific, e.g. '2 scrambled eggs with toast')",
  "cal": 350,
  "protein": 22,
  "carbs": 28,
  "fat": 12,
  "confidence": "high|medium|low",
  "note": "brief note about your estimate"
}

If you cannot identify food in the image, respond with:
{"error": "No food detected in this image"}

Be realistic with portion estimates for a typical serving shown in the photo.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 300,
        messages: [{
          role: 'user',
          content: [
            { type: 'image', source: { type: 'base64', media_type: mimeType, data: base64 } },
            { type: 'text', text: prompt },
          ],
        }],
      }),
    });

    if (!response.ok) {
      throw new Error('API error ' + response.status);
    }

    const data = await response.json();
    const text = data.content?.[0]?.text || '';

    // Parse JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('No JSON in response');
    const result = JSON.parse(jsonMatch[0]);

    if (result.error) {
      if (statusEl) { statusEl.textContent = result.error; statusEl.style.color = 'var(--red)'; }
      if (resultEl) resultEl.innerHTML = `<div style="font-family:var(--font-mono);font-size:10px;color:var(--red);text-align:center;padding:10px">${result.error}</div>`;
      return;
    }

    const confColor = result.confidence === 'high' ? 'var(--green)' : result.confidence === 'medium' ? 'var(--gold)' : 'var(--red)';
    if (statusEl) { statusEl.textContent = '✓ Analysis complete (' + (result.confidence || 'medium') + ' confidence)'; statusEl.style.color = confColor; }

    if (resultEl) resultEl.innerHTML = `
      <div style="background:rgba(168,85,247,0.06);border:1px solid rgba(168,85,247,0.25);border-radius:8px;padding:12px">
        <div style="font-size:14px;font-weight:600;color:var(--text);margin-bottom:4px">${result.name}</div>
        ${result.note ? `<div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-bottom:8px">${result.note}</div>` : ''}
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:5px;margin-bottom:10px">
          <div style="text-align:center;background:var(--bg3);border-radius:5px;padding:6px">
            <div style="font-family:var(--font-hud);font-size:15px;color:var(--accent)">${result.cal||0}</div>
            <div style="font-family:var(--font-mono);font-size:8px;color:var(--text3)">kcal</div>
          </div>
          <div style="text-align:center;background:var(--bg3);border-radius:5px;padding:6px">
            <div style="font-family:var(--font-hud);font-size:15px;color:var(--green)">${result.protein||0}g</div>
            <div style="font-family:var(--font-mono);font-size:8px;color:var(--text3)">protein</div>
          </div>
          <div style="text-align:center;background:var(--bg3);border-radius:5px;padding:6px">
            <div style="font-family:var(--font-hud);font-size:15px;color:var(--gold)">${result.carbs||0}g</div>
            <div style="font-family:var(--font-mono);font-size:8px;color:var(--text3)">carbs</div>
          </div>
          <div style="text-align:center;background:var(--bg3);border-radius:5px;padding:6px">
            <div style="font-family:var(--font-hud);font-size:15px;color:var(--red)">${result.fat||0}g</div>
            <div style="font-family:var(--font-mono);font-size:8px;color:var(--text3)">fat</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:10px">
          <span style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">Confidence:</span>
          <span style="font-family:var(--font-mono);font-size:9px;color:${confColor};font-weight:600">${(result.confidence||'medium').toUpperCase()}</span>
          <span style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">— verify if unsure</span>
        </div>
        <div style="display:flex;gap:8px">
          <button class="btn-primary" style="flex:1" onclick="logAIFood('${(result.name||'AI Analyzed Food').replace(/'/g,"\\'")}',${result.cal||0},${result.protein||0},${result.carbs||0},${result.fat||0})">
            <span>✓ LOG THIS FOOD</span><div class="btn-arrow">▶</div>
          </button>
          <button class="btn-secondary" onclick="document.getElementById('ai-result').innerHTML='';document.getElementById('ai-preview').innerHTML='';document.getElementById('ai-status').textContent=''">RETRY</button>
        </div>
      </div>
    `;

  } catch (err) {
    const msg = err.message || 'Unknown error';
    if (statusEl) { statusEl.textContent = 'AI error: ' + msg; statusEl.style.color = 'var(--red)'; }
    if (resultEl) resultEl.innerHTML = `
      <div style="padding:10px;background:rgba(255,51,85,0.06);border:1px solid rgba(255,51,85,0.2);border-radius:6px">
        <div style="font-family:var(--font-mono);font-size:10px;color:var(--red);margin-bottom:4px">AI SCANNER ERROR</div>
        <div style="font-size:12px;color:var(--text3);line-height:1.5">${msg}<br><br>
          <span style="color:var(--accent);cursor:pointer" onclick="switchFoodMode('manual')">→ Log manually instead</span>
        </div>
      </div>
    `;
  }
}

function logAIFood(name, cal, protein, carbs, fat) {
  addFoodEntry({ name, cal, protein, carbs, fat, mealTime: getAutoMealTime(), source: 'ai' });
  showNotif('[ AI FOOD ] ' + name + ' logged!');
  document.getElementById('ai-result').innerHTML   = '';
  document.getElementById('ai-preview').innerHTML  = '';
  document.getElementById('ai-status').textContent = '✓ Logged! Take another photo or switch modes.';
  document.getElementById('ai-status').style.color = 'var(--green)';
}
