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
          style="flex:1;padding:7px 4px;background:rgba(0,180,255,0.15);border:none;border-radius:4px;color:var(--accent);font-family:var(--font-hud);font-size:10px;font-weight:600;letter-spacing:1px;cursor:pointer">🔍 SEARCH</button>
        <button id="mode-barcode" onclick="switchFoodMode('barcode')"
          style="flex:1;padding:7px 4px;background:transparent;border:none;border-radius:4px;color:var(--text3);font-family:var(--font-hud);font-size:10px;font-weight:600;letter-spacing:1px;cursor:pointer">📦 BARCODE</button>
        <button id="mode-manual" onclick="switchFoodMode('manual')"
          style="flex:1;padding:7px 4px;background:transparent;border:none;border-radius:4px;color:var(--text3);font-family:var(--font-hud);font-size:10px;font-weight:600;letter-spacing:1px;cursor:pointer">✏️ MANUAL</button>
        <button id="mode-list" onclick="switchFoodMode('list')"
          style="flex:1;padding:7px 4px;background:transparent;border:none;border-radius:4px;color:var(--text3);font-family:var(--font-hud);font-size:10px;font-weight:600;letter-spacing:1px;cursor:pointer">📋 LIST</button>
      </div>

      <!-- SEARCH -->
      <div id="food-mode-search">
        <input type="text" class="sys-input" id="food-search-input"
          placeholder="Search food (chicken, sushi, pernil...)"
          oninput="filterFoodSearch(this.value)" style="margin-bottom:8px"/>
        <div id="food-search-results" style="max-height:220px;overflow-y:auto;display:flex;flex-direction:column;gap:4px"></div>
      </div>

      <!-- BARCODE -->
      <div id="food-mode-barcode" style="display:none">
        <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-bottom:10px;line-height:1.7">
          Scan any product barcode from Walmart or type it in manually. Uses the free Open Food Facts database — works with most US grocery barcodes.
        </div>

        <!-- Camera scanner -->
        <div id="barcode-camera-wrap" style="display:none;margin-bottom:10px;position:relative">
          <video id="barcode-video" style="width:100%;border-radius:8px;border:1px solid var(--border);background:#000;max-height:200px;object-fit:cover"></video>
          <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none">
            <div style="width:200px;height:80px;border:2px solid var(--accent);border-radius:4px;box-shadow:0 0 0 9999px rgba(0,0,0,0.4)"></div>
          </div>
          <button onclick="stopBarcodeCamera()" style="
            position:absolute;top:8px;right:8px;background:rgba(0,0,0,0.7);
            border:1px solid var(--border);border-radius:6px;color:var(--text);
            font-family:var(--font-mono);font-size:10px;padding:4px 8px;cursor:pointer
          ">✕ STOP</button>
        </div>

        <div id="barcode-scan-status" style="font-family:var(--font-mono);font-size:10px;color:var(--text3);text-align:center;margin-bottom:10px;min-height:16px"></div>

        <div style="display:flex;gap:8px;margin-bottom:8px">
          <button class="btn-primary" style="flex:1" onclick="startBarcodeCamera()">
            <span>📷 SCAN WITH CAMERA</span>
          </button>
        </div>

        <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);text-align:center;margin-bottom:8px">— or type barcode number —</div>

        <div style="display:flex;gap:8px">
          <input type="text" class="sys-input" id="barcode-manual-input"
            placeholder="e.g. 016000275232"
            inputmode="numeric" pattern="[0-9]*"
            style="flex:1;letter-spacing:2px;font-family:var(--font-mono)"
            onkeydown="if(event.key==='Enter') lookupBarcode()"/>
          <button class="btn-secondary" onclick="lookupBarcode()">LOOK UP</button>
        </div>

        <div id="barcode-result" style="margin-top:10px"></div>

        <div style="margin-top:10px;padding:8px 10px;background:rgba(0,180,255,0.04);border:1px solid rgba(0,180,255,0.15);border-radius:6px">
          <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-bottom:2px">TIP — AUBURN WALMART</div>
          <div style="font-size:11px;color:var(--text3);line-height:1.6">
            Scan the barcode on any Walmart product package. Works on Great Value, Equate, and all major grocery brands sold at 550 Center St, Auburn ME 04210.
          </div>
        </div>
      </div>

      <!-- MANUAL -->
      <div id="food-mode-manual" style="display:none">
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
    log.slice().reverse().forEach(f => {
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
  ['search','barcode','manual','list'].forEach(m => {
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
}

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
  addFoodEntry({ ...food, source:'search' });
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
  addFoodEntry({ name, cal, protein, carbs, fat, source:'manual' });
  showNotif(`[ FOOD ] ${name} logged`);
  ['manual-name','manual-cal','manual-protein','manual-carbs','manual-fat']
    .forEach(id => { const el=document.getElementById(id); if(el) el.value=''; });
}

function logSelectedFood() {
  const sel = document.getElementById('food-select');
  const idx = parseInt(sel?.value);
  if (isNaN(idx)) { showNotif('[ SYSTEM ] Select a food item'); return; }
  addFoodEntry({ ...FOOD_DB[idx], source:'list' });
  showNotif(`[ FOOD ] ${FOOD_DB[idx].name} logged`);
  if (sel) sel.value = '';
}

// ── BARCODE SCANNER ───────────────────────────────────
let _barcodeStream   = null;
let _barcodeInterval = null;
let _barcodeDetector = null;

async function startBarcodeCamera() {
  const statusEl = document.getElementById('barcode-scan-status');
  const cameraWrap = document.getElementById('barcode-camera-wrap');
  const video = document.getElementById('barcode-video');

  if (!video || !statusEl) return;

  // Check for BarcodeDetector API support
  if (!('BarcodeDetector' in window)) {
    if (statusEl) statusEl.textContent = 'Camera scan not supported in this browser. Type barcode below.';
    statusEl.style.color = 'var(--gold)';
    return;
  }

  try {
    if (statusEl) { statusEl.textContent = 'Requesting camera...'; statusEl.style.color = 'var(--text3)'; }
    _barcodeStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
    });
    video.srcObject = _barcodeStream;
    await video.play();
    if (cameraWrap) cameraWrap.style.display = 'block';
    if (statusEl) { statusEl.textContent = 'Point camera at a barcode...'; statusEl.style.color = 'var(--accent)'; }

    _barcodeDetector = new BarcodeDetector({ formats: ['ean_13','ean_8','upc_a','upc_e','code_128','code_39','qr_code'] });

    _barcodeInterval = setInterval(async () => {
      if (!video.readyState || video.readyState < 2) return;
      try {
        const barcodes = await _barcodeDetector.detect(video);
        if (barcodes.length > 0) {
          const code = barcodes[0].rawValue;
          stopBarcodeCamera();
          const input = document.getElementById('barcode-manual-input');
          if (input) input.value = code;
          if (statusEl) { statusEl.textContent = `Detected: ${code}`; statusEl.style.color = 'var(--green)'; }
          lookupBarcodeCode(code);
        }
      } catch {}
    }, 500);

  } catch (err) {
    if (statusEl) {
      statusEl.textContent = err.name === 'NotAllowedError'
        ? 'Camera permission denied — type barcode below instead.'
        : 'Camera error — type barcode below instead.';
      statusEl.style.color = 'var(--red)';
    }
  }
}

function stopBarcodeCamera() {
  clearInterval(_barcodeInterval);
  _barcodeInterval = null;
  if (_barcodeStream) {
    _barcodeStream.getTracks().forEach(t => t.stop());
    _barcodeStream = null;
  }
  const wrap  = document.getElementById('barcode-camera-wrap');
  const video = document.getElementById('barcode-video');
  if (wrap)  wrap.style.display = 'none';
  if (video) video.srcObject = null;
}

function lookupBarcode() {
  const input = document.getElementById('barcode-manual-input');
  const code  = input?.value.trim().replace(/\D/g, '');
  if (!code || code.length < 6) { showNotif('[ ERROR ] Enter a valid barcode number'); return; }
  lookupBarcodeCode(code);
}

async function lookupBarcodeCode(code) {
  const statusEl  = document.getElementById('barcode-scan-status');
  const resultEl  = document.getElementById('barcode-result');
  if (statusEl) { statusEl.textContent = `Looking up ${code}...`; statusEl.style.color = 'var(--text3)'; }
  if (resultEl) resultEl.innerHTML = `
    <div style="text-align:center;padding:14px;font-family:var(--font-mono);font-size:10px;color:var(--text3)">
      ⏳ Searching Open Food Facts database...
    </div>
  `;

  try {
    const res  = await fetch(`https://world.openfoodfacts.org/api/v2/product/${code}.json`);
    const data = await res.json();

    if (data.status !== 1 || !data.product) {
      if (statusEl) { statusEl.textContent = 'Product not found.'; statusEl.style.color = 'var(--red)'; }
      if (resultEl) resultEl.innerHTML = `
        <div style="padding:12px;background:rgba(255,51,85,0.06);border:1px solid rgba(255,51,85,0.25);border-radius:6px">
          <div style="font-family:var(--font-mono);font-size:10px;color:var(--red);margin-bottom:4px">PRODUCT NOT FOUND</div>
          <div style="font-size:12px;color:var(--text3);line-height:1.6">
            Barcode <strong>${code}</strong> isn't in the Open Food Facts database yet.
            Try the <span style="color:var(--accent);cursor:pointer" onclick="switchFoodMode('manual')">Manual entry</span> mode instead.
          </div>
        </div>
      `;
      return;
    }

    const p       = data.product;
    const nutr    = p.nutriments || {};
    const name    = p.product_name || p.abbreviated_product_name || 'Unknown Product';
    const brand   = p.brands || '';
    const serving = p.serving_size || '100g';

    // Per 100g values from Open Food Facts
    const cal     = Math.round(nutr['energy-kcal_100g'] || nutr['energy-kcal'] || 0);
    const protein = Math.round((nutr['proteins_100g'] || nutr['proteins'] || 0) * 10) / 10;
    const carbs   = Math.round((nutr['carbohydrates_100g'] || nutr['carbohydrates'] || 0) * 10) / 10;
    const fat     = Math.round((nutr['fat_100g'] || nutr['fat'] || 0) * 10) / 10;
    const fiber   = Math.round((nutr['fiber_100g'] || nutr['fiber'] || 0) * 10) / 10;
    const sodium  = Math.round(nutr['sodium_100g'] * 1000 || nutr['salt_100g'] * 390 || 0);

    const imgUrl = p.image_small_url || p.image_url || '';

    if (statusEl) { statusEl.textContent = `Found: ${name}`; statusEl.style.color = 'var(--green)'; }

    if (resultEl) resultEl.innerHTML = `
      <div style="background:rgba(0,229,160,0.06);border:1px solid rgba(0,229,160,0.25);border-radius:8px;padding:12px">
        <div style="display:flex;gap:10px;align-items:flex-start;margin-bottom:10px">
          ${imgUrl ? `<img src="${imgUrl}" style="width:56px;height:56px;object-fit:contain;border-radius:6px;background:#fff;flex-shrink:0"/>` : '<div style="width:56px;height:56px;background:var(--bg3);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:24px;flex-shrink:0">📦</div>'}
          <div style="flex:1;min-width:0">
            <div style="font-size:14px;font-weight:600;color:var(--text);line-height:1.3">${name}</div>
            ${brand ? `<div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-top:2px">${brand}</div>` : ''}
            <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-top:2px">per 100g · Barcode: ${code}</div>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-bottom:10px">
          <div style="text-align:center;background:var(--bg3);border-radius:6px;padding:6px">
            <div style="font-family:var(--font-hud);font-size:16px;color:var(--accent)">${cal}</div>
            <div style="font-family:var(--font-mono);font-size:8px;color:var(--text3)">kcal</div>
          </div>
          <div style="text-align:center;background:var(--bg3);border-radius:6px;padding:6px">
            <div style="font-family:var(--font-hud);font-size:16px;color:var(--green)">${protein}g</div>
            <div style="font-family:var(--font-mono);font-size:8px;color:var(--text3)">protein</div>
          </div>
          <div style="text-align:center;background:var(--bg3);border-radius:6px;padding:6px">
            <div style="font-family:var(--font-hud);font-size:16px;color:var(--gold)">${carbs}g</div>
            <div style="font-family:var(--font-mono);font-size:8px;color:var(--text3)">carbs</div>
          </div>
          <div style="text-align:center;background:var(--bg3);border-radius:6px;padding:6px">
            <div style="font-family:var(--font-hud);font-size:16px;color:var(--red)">${fat}g</div>
            <div style="font-family:var(--font-mono);font-size:8px;color:var(--text3)">fat</div>
          </div>
        </div>

        ${fiber || sodium ? `
          <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-bottom:10px">
            ${fiber ? `Fiber: ${fiber}g` : ''} ${fiber && sodium ? '·' : ''} ${sodium ? `Sodium: ${sodium}mg` : ''}
          </div>
        ` : ''}

        <!-- Serving size selector -->
        <div style="display:flex;gap:8px;margin-bottom:10px;align-items:center">
          <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);flex-shrink:0">LOG AMOUNT:</div>
          <input type="number" id="barcode-grams" value="100" min="1" max="2000"
            inputmode="numeric"
            class="sys-input" style="flex:1;text-align:center"/>
          <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);flex-shrink:0">grams</div>
        </div>

        <button class="btn-primary" style="width:100%" onclick="logBarcodeFood('${name.replace(/'/g,"\\'")} (${brand})',${cal},${protein},${carbs},${fat})">
          <span>✓ ADD TO LOG</span><div class="btn-arrow">▶</div>
        </button>
      </div>
    `;

  } catch (err) {
    if (statusEl) { statusEl.textContent = 'Network error — check your connection.'; statusEl.style.color = 'var(--red)'; }
    if (resultEl) resultEl.innerHTML = `
      <div style="font-family:var(--font-mono);font-size:10px;color:var(--red);text-align:center;padding:10px">
        Could not reach Open Food Facts. Check your internet connection.
      </div>
    `;
  }
}

function logBarcodeFood(name, calPer100, proteinPer100, carbsPer100, fatPer100) {
  const gramsEl = document.getElementById('barcode-grams');
  const grams   = parseFloat(gramsEl?.value) || 100;
  const ratio   = grams / 100;

  const food = {
    name:    `${name} (${grams}g)`,
    cal:     Math.round(calPer100 * ratio),
    protein: Math.round(proteinPer100 * ratio * 10) / 10,
    carbs:   Math.round(carbsPer100 * ratio * 10) / 10,
    fat:     Math.round(fatPer100 * ratio * 10) / 10,
    source: 'barcode',
  };

  addFoodEntry(food);
  showNotif(`[ FOOD ] ${name} (${grams}g) logged`);

  // Clear result
  const resultEl = document.getElementById('barcode-result');
  const statusEl = document.getElementById('barcode-scan-status');
  const input    = document.getElementById('barcode-manual-input');
  if (resultEl) resultEl.innerHTML = '';
  if (statusEl) { statusEl.textContent = '✓ Food logged!'; statusEl.style.color = 'var(--green)'; }
  if (input)    input.value = '';
}
