// ============================================
// SYSTEM — EXTRA FEATURES
// Hydration · Habits · PRs · Calorie Calc
// Weekly Review · Supplements · Friends
// ============================================

// ============================================
// 💧 HYDRATION TRACKER + REMINDERS (UNIT-AWARE)
// ============================================
function renderHydrationTracker(container) {
  const today = new Date().toLocaleDateString();
  const data = getHydrationData(); // your saved cups
  const settings = (typeof HUNTER !== 'undefined' && HUNTER.settings) ? HUNTER.settings : { units: 'metric' };
  const isMetric = settings.units === 'metric';

  // Cups logged today
  const cups = (data.date === today) ? (data.cups || 0) : 0;

  // Goal: 8 cups (~2L)
  const goalCups = 8;

  // Convert to proper units
  const factor = isMetric ? 240 : 8; // 1 cup = 240ml metric, 8 fl oz imperial
  const unitLabel = isMetric ? 'ml' : 'oz';
  const displayCups = cups * (factor / 1); // ml or oz
  const displayGoal = goalCups * (factor / 1);

  const pct = Math.min(100, Math.round((cups / goalCups) * 100));

  container.innerHTML = `
    <div class="section-head">HYDRATION</div>
    <div class="sys-card">
      <div class="hydration-bar" style="position:relative;height:22px;background:var(--panel);border-radius:6px;overflow:hidden;border:1px solid var(--border)">
        <div class="hydration-fill" style="width:${pct}%;height:100%;background:var(--accent)"></div>
      </div>
      <div style="font-family:var(--font-mono);font-size:11px;color:var(--text3);margin-top:4px;text-align:right">
        ${displayCups.toFixed(0)} ${unitLabel} / ${displayGoal.toFixed(0)} ${unitLabel}
      </div>
    </div>
  `;
}

// Update addCup/removeCup to respect metric/imperial units
function addCup() {
  const settings = getSettings();
  const isMetric = settings.units === 'metric';
  const data = getHydrationData();
  const today = new Date().toLocaleDateString();
  let cups = data.date === today ? (data.cups || 0) : 0;

  const increment = 1; // always 1 "cup"
  cups += increment;
  saveHydrationData(cups);

  // XP logic
  const goal = 8;
  if (cups - increment < goal && cups >= goal) {
    addXP(20, 'vit');
    showNotif('[ HYDRATION ] Daily goal reached! +20 XP', 'gold');
  } else {
    showNotif(`[ HYDRATION ] ${cups} cups / ${goal}`);
  }

  renderSelfImprovePage();
}

function removeCup() {
  const data = getHydrationData();
  const today = new Date().toLocaleDateString();
  const cups = data.date === today ? Math.max(0, (data.cups || 0) - 1) : 0;
  saveHydrationData(cups);
  renderSelfImprovePage();
}

function addManualWater() {
  const input = document.getElementById('manualWaterInput');
  if (!input) return;

  const mlAdded = parseInt(input.value);
  if (!mlAdded || mlAdded <= 0) {
    showNotif('[ HYDRATION ] Enter a valid ml amount');
    return;
  }

  const cupsToAdd = mlAdded / 250;

  const data = getHydrationData();
  const today = new Date().toLocaleDateString();
  const currentCups = data.date === today ? (data.cups || 0) : 0;
  const goal = Math.max(1, Math.round((getSettings().waterGoal || 2000) / 250));
  const maxCups = goal + 10;
  const newCups = Math.min(maxCups, currentCups + cupsToAdd);

  saveHydrationData(newCups);

  if (currentCups < goal && newCups >= goal) {
    addXP(20, 'vit');
    showNotif('[ HYDRATION ] Daily goal reached! +20 XP', 'gold');
  } else {
    showNotif(`[ HYDRATION ] +${mlAdded}ml added`);
  }

  input.value = '';
  renderSelfImprovePage();
}

function startHydrationReminder() {
  // Detect iOS
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;

  if (isIOS && !isStandalone) {
    showNotif('[ INFO ] On iPhone, reminders only work if the app is added to the home screen', 'gold');
  }

  if (!('Notification' in window)) {
    showNotif('[ INFO ] Notifications not supported in this browser');
    return;
  }

  Notification.requestPermission().then(perm => {
    if (perm === 'granted') {
      const data = getHydrationData();
      data.reminderOn = true;
      localStorage.setItem('sys_hydration_' + getCurrentUser(), JSON.stringify(data));

      window._hydrationTimer = setInterval(() => {
        const d = getHydrationData();
        if ((d.cups || 0) < (getSettings().waterGoal || 2000) / 250) {
          new Notification('💧 SYSTEM', {
            body: 'Time to drink water! Stay hydrated.',
            icon: '/icon-192.png'
          });
        }
      }, 60 * 60 * 1000); // every hour

      showNotif('[ REMINDERS ] Hydration reminders on — every hour');
      renderSelfImprovePage();
    } else {
      showNotif('[ INFO ] Allow notifications to enable reminders');
    }
  });
}

function stopHydrationReminder() {
  clearInterval(window._hydrationTimer);
  const data = getHydrationData();
  data.reminderOn = false;
  localStorage.setItem('sys_hydration_' + getCurrentUser(), JSON.stringify(data));
  showNotif('[ REMINDERS ] Hydration reminders off');
  renderSelfImprovePage();
}

function getHydrationData() {
  try {
    return JSON.parse(localStorage.getItem('sys_hydration_' + getCurrentUser()) || '{}');
  } catch {
    return {};
  }
}

function saveHydrationData(cups) {
  const data = getHydrationData();
  data.date = new Date().toLocaleDateString();
  data.cups = cups;
  localStorage.setItem('sys_hydration_' + getCurrentUser(), JSON.stringify(data));
}

// ============================================
// ✅ IOS Home Screen Install
// ============================================
function promptAddToHomeScreen() {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;

  // Only show if on iOS and not already installed
  if (isIOS && !isStandalone) {
    // Check if we've already shown it
    if (localStorage.getItem('ios_a2hs_prompt_shown')) return;

    const ov = document.createElement('div');
    ov.style.cssText = `
      position:fixed;bottom:20px;left:20px;right:20px;
      background:var(--bg2);border:1px solid var(--accent);
      border-radius:12px;padding:16px;z-index:1000;
      display:flex;align-items:center;gap:12px;box-shadow:0 4px 12px rgba(0,0,0,0.3);
      font-family:var(--font-mono);font-size:13px;color:var(--text);
    `;
    ov.innerHTML = `
      <div style="flex:1">
        💧 For hydration reminders to work on iPhone, add this app to your home screen:
        <br><strong>Tap ⬆️ → Add to Home Screen</strong>
      </div>
      <button style="
        background:var(--accent);color:#fff;border:none;padding:6px 12px;
        border-radius:6px;font-weight:600;cursor:pointer;font-size:12px;
      ">Got it</button>
    `;
    const btn = ov.querySelector('button');
    btn.addEventListener('click', () => {
      ov.remove();
      localStorage.setItem('ios_a2hs_prompt_shown', '1');
    });
    document.body.appendChild(ov);
  }
}

// ============================================
// ✅ HABIT TRACKER
// ============================================
function renderHabitTracker(container) {
  const habits = getHabits();
  const today = new Date().toLocaleDateString();

  container.innerHTML += `
    <div class="section-head">HABIT TRACKER</div>
    <div class="sys-card">
      ${habits.length === 0 ? `
        <div style="text-align:center;padding:16px;font-family:var(--font-mono);font-size:10px;color:var(--text3);letter-spacing:1px">NO HABITS YET — ADD YOUR FIRST ONE</div>
      ` : habits.map((h, i) => {
    const doneToday = h.log?.includes(today);
    const streak = calcHabitStreak(h.log || []);
    return `
          <div style="display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid var(--border)">
            <div onclick="toggleHabit(${i})" style="
              width:26px;height:26px;border-radius:6px;flex-shrink:0;cursor:pointer;
              background:${doneToday ? 'rgba(0,229,160,0.2)' : 'transparent'};
              border:2px solid ${doneToday ? 'var(--green)' : 'var(--border2)'};
              display:flex;align-items:center;justify-content:center;font-size:13px;
            ">${doneToday ? '✓' : ''}</div>
            <div style="flex:1">
              <div style="font-size:13px;font-weight:600;color:${doneToday ? 'var(--text3)' : 'var(--text)'};text-decoration:${doneToday ? 'line-through' : 'none'}">${h.icon} ${h.name}</div>
              <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-top:2px">🔥 ${streak} day streak</div>
            </div>
            <div style="display:flex;gap:4px">
              ${[-3, -2, -1, 0].map(offset => {
      const d = new Date(); d.setDate(d.getDate() + offset);
      const ds = d.toLocaleDateString();
      const done = h.log?.includes(ds);
      return `<div style="width:10px;height:10px;border-radius:2px;background:${done ? 'var(--green)' : 'var(--border)'}"></div>`;
    }).join('')}
            </div>
            <button onclick="deleteHabit(${i})" style="background:transparent;border:none;color:var(--text3);font-size:14px;cursor:pointer;padding:4px">×</button>
          </div>
        `;
  }).join('')}
      <div style="margin-top:10px;display:flex;gap:8px">
        <input type="text" id="habit-name-input" class="sys-input" placeholder="New habit name..." style="flex:1" />
        <select id="habit-icon-input" class="sys-input" style="width:56px">
          <option>💪</option><option>🏃</option><option>📖</option><option>🧘</option>
          <option>💧</option><option>🌅</option><option>🥗</option><option>✍️</option>
          <option>🎯</option><option>🚿</option><option>😴</option><option>🧹</option>
        </select>
        <button class="btn-secondary" onclick="addHabit()">ADD</button>
      </div>
    </div>
  `;
}

function addHabit() {
  const name = document.getElementById('habit-name-input')?.value.trim();
  const icon = document.getElementById('habit-icon-input')?.value || '✅';
  if (!name) return;
  const habits = getHabits();
  habits.push({ name, icon, log: [], created: new Date().toLocaleDateString() });
  saveHabits(habits);
  document.getElementById('habit-name-input').value = '';
  showNotif(`[ HABIT ] "${name}" added`);
  renderSelfImprovePage();
}

function toggleHabit(i) {
  const habits = getHabits();
  const today = new Date().toLocaleDateString();
  if (!habits[i].log) habits[i].log = [];
  if (habits[i].log.includes(today)) {
    habits[i].log = habits[i].log.filter(d => d !== today);
  } else {
    habits[i].log.push(today);
    addXP(10, 'sense');
    showNotif(`[ HABIT ] ${habits[i].name} done! +10 XP`);
  }
  saveHabits(habits);
  renderSelfImprovePage();
}

function deleteHabit(i) {
  const habits = getHabits();
  habits.splice(i, 1);
  saveHabits(habits);
  renderSelfImprovePage();
}

function calcHabitStreak(log) {
  if (!log.length) return 0;
  let streak = 0, d = new Date();
  while (true) {
    if (log.includes(d.toLocaleDateString())) { streak++; d.setDate(d.getDate() - 1); }
    else break;
  }
  return streak;
}

function getHabits() { try { return JSON.parse(localStorage.getItem('sys_habits_' + getCurrentUser()) || '[]'); } catch { return []; } }
function saveHabits(h) { localStorage.setItem('sys_habits_' + getCurrentUser(), JSON.stringify(h)); }

// ============================================
// 🏆 PERSONAL RECORDS BOARD
// ============================================
function renderPRBoard(container) {
  const prs = getPRs();
  const categories = ['Strength', 'Cardio', 'Body', 'Other'];

  container.innerHTML += `
    <div class="section-head">PERSONAL RECORDS</div>
    <div class="sys-card">
      ${prs.length === 0
      ? `<div style="text-align:center;padding:16px;font-family:var(--font-mono);font-size:10px;color:var(--text3)">NO PRs YET — LOG YOUR FIRST RECORD</div>`
      : prs.map((pr, i) => `
          <div style="display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid var(--border)">
            <div style="font-size:20px">🏆</div>
            <div style="flex:1">
              <div style="font-size:13px;font-weight:600;color:var(--text)">${pr.exercise}</div>
              <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-top:1px">${pr.category} · ${pr.date}</div>
            </div>
            <div style="font-family:var(--font-hud);font-size:16px;color:var(--gold)">${pr.value}<span style="font-size:10px;color:var(--text3)">${pr.unit}</span></div>
            <button onclick="deletePR(${i})" style="background:transparent;border:none;color:var(--text3);font-size:14px;cursor:pointer">×</button>
          </div>
        `).join('')
    }
      <div style="margin-top:12px;font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:2px;margin-bottom:8px">LOG NEW PR</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px">
        <input type="text" class="sys-input" id="pr-exercise" placeholder="Exercise (e.g. Bench Press)" style="grid-column:1/-1"/>
        <input type="number" class="sys-input" id="pr-value" placeholder="Value (e.g. 100)" inputmode="decimal"/>
        <input type="text" class="sys-input" id="pr-unit" placeholder="Unit (kg, reps, min...)" />
      </div>
      <select class="sys-input" id="pr-category" style="margin-bottom:10px">
        ${categories.map(c => `<option>${c}</option>`).join('')}
      </select>
      <button class="btn-primary" onclick="addPR()"><span>🏆 SAVE PR</span><div class="btn-arrow">▶</div></button>
    </div>
  `;
}

function addPR() {
  const exercise = document.getElementById('pr-exercise')?.value.trim();
  const value = document.getElementById('pr-value')?.value.trim();
  const unit = document.getElementById('pr-unit')?.value.trim() || 'reps';
  const category = document.getElementById('pr-category')?.value;
  if (!exercise || !value) { showNotif('[ ERROR ] Fill in exercise and value'); return; }
  const prs = getPRs();
  prs.unshift({ exercise, value, unit, category, date: new Date().toLocaleDateString() });
  savePRs(prs);
  addXP(25, 'str');
  showNotif(`[ NEW PR ] ${exercise}: ${value}${unit} · +25 XP`, 'gold');
  ['pr-exercise', 'pr-value', 'pr-unit'].forEach(id => { const el = document.getElementById(id); if (el) el.value = ''; });
  renderSelfImprovePage();
}

function deletePR(i) { const prs = getPRs(); prs.splice(i, 1); savePRs(prs); renderSelfImprovePage(); }
function getPRs() { try { return JSON.parse(localStorage.getItem('sys_prs_' + getCurrentUser()) || '[]'); } catch { return []; } }
function savePRs(p) { localStorage.setItem('sys_prs_' + getCurrentUser(), JSON.stringify(p)); }

// ============================================
// ⚖️ CALORIE DEFICIT CALCULATOR
// ============================================
function renderCalorieCalculator(container) {
  const saved = getCalGoals();

  container.innerHTML += `
    <div class="section-head">CALORIE DEFICIT CALCULATOR</div>
    <div class="sys-card">
      <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:1px;margin-bottom:10px;line-height:1.7">Enter your stats to calculate your daily calorie target for weight loss.</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px">
        <div>
          <label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);display:block;margin-bottom:4px">AGE</label>
          <input type="number" class="sys-input" id="calc-age" placeholder="e.g. 25" inputmode="numeric" value="${saved.age || ''}" />
        </div>
        <div>
          <label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);display:block;margin-bottom:4px">WEIGHT (kg)</label>
          <input type="number" class="sys-input" id="calc-weight" placeholder="e.g. 85" inputmode="decimal" step="0.1" value="${saved.weight || ''}" />
        </div>
        <div>
          <label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);display:block;margin-bottom:4px">HEIGHT (cm)</label>
          <input type="number" class="sys-input" id="calc-height" placeholder="e.g. 178" inputmode="numeric" value="${saved.height || ''}" />
        </div>
        <div>
          <label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);display:block;margin-bottom:4px">SEX</label>
          <select class="sys-input" id="calc-sex">
            <option value="m" ${saved.sex === 'm' ? 'selected' : ''}>Male</option>
            <option value="f" ${saved.sex === 'f' ? 'selected' : ''}>Female</option>
          </select>
        </div>
      </div>
      <div style="margin-bottom:10px">
        <label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);display:block;margin-bottom:4px">ACTIVITY LEVEL</label>
        <select class="sys-input" id="calc-activity">
          <option value="1.2"  ${saved.activity === '1.2' ? 'selected' : ''}>Sedentary (desk job, no exercise)</option>
          <option value="1.375"${saved.activity === '1.375' ? 'selected' : ''}>Light (1-3 workouts/week)</option>
          <option value="1.55" ${saved.activity === '1.55' ? 'selected' : ''}>Moderate (4-5 workouts/week)</option>
          <option value="1.725"${saved.activity === '1.725' ? 'selected' : ''}>Active (daily intense workouts)</option>
          <option value="1.9"  ${saved.activity === '1.9' ? 'selected' : ''}>Very Active (athlete / physical job)</option>
        </select>
      </div>
      <div style="margin-bottom:12px">
        <label style="font-family:var(--font-mono);font-size:9px;color:var(--text3);display:block;margin-bottom:4px">GOAL</label>
        <select class="sys-input" id="calc-goal">
          <option value="cut"  ${saved.goal === 'cut' ? 'selected' : ''}>Lose weight (500 kcal deficit)</option>
          <option value="maint"${saved.goal === 'maint' ? 'selected' : ''}>Maintain weight</option>
          <option value="bulk" ${saved.goal === 'bulk' ? 'selected' : ''}>Build muscle (250 kcal surplus)</option>
        </select>
      </div>
      <button class="btn-primary" onclick="calculateCalories()"><span>CALCULATE</span><div class="btn-arrow">▶</div></button>
      <div id="calc-result" style="margin-top:12px"></div>
    </div>
  `;
}

function calculateCalories() {
  const age = parseInt(document.getElementById('calc-age')?.value);
  const weight = parseFloat(document.getElementById('calc-weight')?.value);
  const height = parseInt(document.getElementById('calc-height')?.value);
  const sex = document.getElementById('calc-sex')?.value;
  const activity = parseFloat(document.getElementById('calc-activity')?.value);
  const goal = document.getElementById('calc-goal')?.value;

  if (!age || !weight || !height) { showNotif('[ ERROR ] Fill in all fields'); return; }

  // Mifflin-St Jeor BMR
  const bmr = sex === 'm'
    ? (10 * weight) + (6.25 * height) - (5 * age) + 5
    : (10 * weight) + (6.25 * height) - (5 * age) - 161;

  const tdee = Math.round(bmr * activity);
  const adjust = goal === 'cut' ? -500 : goal === 'bulk' ? 250 : 0;
  const target = tdee + adjust;
  const protein = Math.round(weight * 2.2); // 1g per lb
  const fat = Math.round(target * 0.25 / 9);
  const carbs = Math.round((target - protein * 4 - fat * 9) / 4);
  const weekly = goal === 'cut' ? '~0.5kg fat loss/week' : goal === 'bulk' ? '~0.25kg muscle/week' : 'maintenance';

  // Save for prefill next time
  localStorage.setItem('sys_calgoals_' + getCurrentUser(), JSON.stringify({
    age, weight, height, sex, activity: String(activity), goal
  }));

  const result = document.getElementById('calc-result');
  if (result) result.innerHTML = `
    <div style="border-top:1px solid var(--border);padding-top:12px">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px">
        <div style="background:var(--bg3);border:1px solid var(--border);border-radius:6px;padding:10px;text-align:center">
          <div style="font-family:var(--font-hud);font-size:22px;color:var(--accent)">${tdee}</div>
          <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">TDEE (MAINTENANCE)</div>
        </div>
        <div style="background:var(--bg3);border:1px solid ${goal === 'cut' ? 'var(--green)' : goal === 'bulk' ? 'var(--gold)' : 'var(--accent)'};border-radius:6px;padding:10px;text-align:center">
          <div style="font-family:var(--font-hud);font-size:22px;color:${goal === 'cut' ? 'var(--green)' : goal === 'bulk' ? 'var(--gold)' : 'var(--accent)'}">${target}</div>
          <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">DAILY TARGET</div>
        </div>
      </div>
      <div style="display:flex;gap:8px;margin-bottom:8px">
        <span class="stat-pill pill-green" style="flex:1;justify-content:center">P: ${protein}g</span>
        <span class="stat-pill pill-gold"  style="flex:1;justify-content:center">C: ${carbs}g</span>
        <span class="stat-pill pill-red"   style="flex:1;justify-content:center">F: ${fat}g</span>
      </div>
      <div style="font-family:var(--font-mono);font-size:10px;color:var(--text3);text-align:center">${weekly}</div>
    </div>
  `;
}

function getCalGoals() { try { return JSON.parse(localStorage.getItem('sys_calgoals_' + getCurrentUser()) || '{}'); } catch { return {}; } }

// ============================================
// 💊 SUPPLEMENT TRACKER
// ============================================
const DEFAULT_SUPPLEMENTS = [
  { name: 'Creatine', dose: '5g', time: 'Any time', icon: '⚡' },
  { name: 'Protein Powder', dose: '1 scoop', time: 'Post-workout', icon: '💪' },
  { name: 'Vitamin D3', dose: '2000 IU', time: 'Morning', icon: '☀️' },
  { name: 'Omega-3', dose: '2 caps', time: 'With meal', icon: '🐟' },
  { name: 'Magnesium', dose: '400mg', time: 'Night', icon: '🌙' },
];

function renderSupplementTracker(container) {
  const supps = getSupplements();
  const today = new Date().toLocaleDateString();

  container.innerHTML += `
    <div class="section-head">SUPPLEMENTS</div>
    <div class="sys-card">
      ${supps.map((s, i) => {
    const taken = s.log?.includes(today);
    return `
          <div style="display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid var(--border)">
            <div onclick="toggleSupplement(${i})" style="
              width:26px;height:26px;border-radius:6px;flex-shrink:0;cursor:pointer;
              background:${taken ? 'rgba(168,85,247,0.2)' : 'transparent'};
              border:2px solid ${taken ? 'var(--purple)' : 'var(--border2)'};
              display:flex;align-items:center;justify-content:center;font-size:12px
            ">${taken ? '✓' : ''}</div>
            <div style="font-size:18px">${s.icon}</div>
            <div style="flex:1">
              <div style="font-size:13px;font-weight:600;color:${taken ? 'var(--text3)' : 'var(--text)'}">${s.name}</div>
              <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">${s.dose} · ${s.time}</div>
            </div>
            <button onclick="deleteSupplement(${i})" style="background:transparent;border:none;color:var(--text3);font-size:14px;cursor:pointer">×</button>
          </div>
        `;
  }).join('')}
      <div style="margin-top:10px;display:flex;gap:8px;flex-wrap:wrap">
        <input type="text" id="supp-name" class="sys-input" placeholder="Supplement name" style="flex:2;min-width:120px"/>
        <input type="text" id="supp-dose" class="sys-input" placeholder="Dose" style="flex:1;min-width:80px"/>
        <button class="btn-secondary" onclick="addSupplement()">ADD</button>
      </div>
    </div>
  `;
}

function toggleSupplement(i) {
  const supps = getSupplements();
  const today = new Date().toLocaleDateString();
  if (!supps[i].log) supps[i].log = [];
  if (supps[i].log.includes(today)) supps[i].log = supps[i].log.filter(d => d !== today);
  else { supps[i].log.push(today); addXP(5, 'vit'); showNotif(`[ SUPP ] ${supps[i].name} logged! +5 XP`); }
  saveSupplements(supps);
  renderSelfImprovePage();
}

function addSupplement() {
  const name = document.getElementById('supp-name')?.value.trim();
  const dose = document.getElementById('supp-dose')?.value.trim() || '1 serving';
  if (!name) return;
  const supps = getSupplements();
  supps.push({ name, dose, time: 'Any time', icon: '💊', log: [] });
  saveSupplements(supps);
  document.getElementById('supp-name').value = '';
  document.getElementById('supp-dose').value = '';
  renderSelfImprovePage();
}

function deleteSupplement(i) { const s = getSupplements(); s.splice(i, 1); saveSupplements(s); renderSelfImprovePage(); }
function getSupplements() {
  try {
    const saved = JSON.parse(localStorage.getItem('sys_supps_' + getCurrentUser()) || 'null');
    return saved || DEFAULT_SUPPLEMENTS.map(s => ({ ...s, log: [] }));
  } catch { return DEFAULT_SUPPLEMENTS.map(s => ({ ...s, log: [] })); }
}
function saveSupplements(s) { localStorage.setItem('sys_supps_' + getCurrentUser(), JSON.stringify(s)); }

// ============================================
// 📓 WEEKLY REVIEW
// ============================================
function renderWeeklyReview(container) {
  const reviews = getWeeklyReviews();
  const thisWeek = getWeekKey();
  const existing = reviews.find(r => r.week === thisWeek);

  container.innerHTML += `
    <div class="section-head">WEEKLY REVIEW</div>
    <div class="sys-card">
      <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:2px;margin-bottom:10px">WEEK OF ${thisWeek}</div>
      ${existing ? `
        <div style="font-family:var(--font-mono);font-size:9px;color:var(--green);margin-bottom:10px">✓ REVIEW SUBMITTED THIS WEEK</div>
        <div style="background:var(--bg3);border-radius:6px;padding:10px;font-size:12px;color:var(--text2);line-height:1.7;white-space:pre-wrap">${existing.text}</div>
        <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-top:8px">Rating: ${'⭐'.repeat(existing.rating)}</div>
      ` : `
        <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-bottom:6px">HOW WAS THIS WEEK?</div>
        <div style="display:flex;gap:6px;margin-bottom:10px">
          ${[1, 2, 3, 4, 5].map(n => `<button id="star-${n}" onclick="setWeekRating(${n})" style="flex:1;padding:8px;background:transparent;border:1px solid var(--border);border-radius:6px;font-size:18px;cursor:pointer">⭐</button>`).join('')}
        </div>
        <textarea id="weekly-review-text" style="
          width:100%;min-height:120px;background:rgba(7,20,38,0.8);
          border:1px solid var(--border);border-radius:6px;padding:10px;
          color:var(--text);font-family:var(--font-ui);font-size:13px;
          resize:vertical;outline:none;line-height:1.6
        " placeholder="What went well? What did you struggle with? What will you do differently next week?"></textarea>
        <button class="btn-primary" style="margin-top:10px" onclick="submitWeeklyReview()">
          <span>SUBMIT REVIEW</span><div class="btn-arrow">▶</div>
        </button>
      `}
    </div>
  `;
  window._weekRating = existing?.rating || 3;
}

function setWeekRating(n) {
  window._weekRating = n;
  [1, 2, 3, 4, 5].forEach(i => {
    const btn = document.getElementById('star-' + i);
    if (btn) btn.style.background = i <= n ? 'rgba(240,192,64,0.2)' : 'transparent';
  });
}

function submitWeeklyReview() {
  const text = document.getElementById('weekly-review-text')?.value.trim();
  if (!text) { showNotif('[ ERROR ] Write something first'); return; }
  const reviews = getWeeklyReviews();
  reviews.unshift({ week: getWeekKey(), text, rating: window._weekRating || 3, date: new Date().toLocaleDateString() });
  if (reviews.length > 52) reviews.length = 52;
  localStorage.setItem('sys_reviews_' + getCurrentUser(), JSON.stringify(reviews));
  addXP(40, 'int');
  showNotif('[ REVIEW ] Weekly review submitted! +40 XP', 'gold');
  renderSelfImprovePage();
}

function getWeekKey() {
  const d = new Date();
  const startOfYear = new Date(d.getFullYear(), 0, 1);
  const week = Math.ceil(((d - startOfYear) / 86400000 + startOfYear.getDay() + 1) / 7);
  return `${d.getFullYear()}-W${String(week).padStart(2, '0')}`;
}

function getWeeklyReviews() { try { return JSON.parse(localStorage.getItem('sys_reviews_' + getCurrentUser()) || '[]'); } catch { return []; } }

// ============================================
// 👥 FRIENDS / ACCOUNTABILITY
// ============================================
function renderFriendsSection(container) {
  const friends = getFriends();
  const scores = JSON.parse(localStorage.getItem('sys_guild') || '{}');

  container.innerHTML += `
    <div class="section-head">ACCOUNTABILITY PARTNERS</div>
    <div class="sys-card">
      <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);letter-spacing:1px;margin-bottom:10px;line-height:1.7">
        Add a friend's hunter name to follow their progress and compete on the leaderboard.
      </div>
      ${friends.length === 0
      ? `<div style="text-align:center;padding:12px;font-family:var(--font-mono);font-size:10px;color:var(--text3)">NO PARTNERS YET</div>`
      : friends.map((name, i) => {
        const score = scores[name.toLowerCase()];
        return `
              <div style="display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid var(--border)">
                <div style="width:34px;height:34px;border-radius:6px;background:linear-gradient(135deg,var(--accent2),var(--accent));display:flex;align-items:center;justify-content:center;font-family:var(--font-hud);font-size:12px;color:#fff">${name.slice(0, 2).toUpperCase()}</div>
                <div style="flex:1">
                  <div style="font-size:13px;font-weight:600;color:var(--text)">${name.toUpperCase()}</div>
                  ${score ? `<div style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">LV ${score.level} · ${score.rank} · ${(score.totalXP || 0).toLocaleString()} XP</div>` : `<div style="font-family:var(--font-mono);font-size:9px;color:var(--text3)">Not seen on this device yet</div>`}
                </div>
                <button onclick="removeFriend(${i})" style="background:transparent;border:none;color:var(--text3);font-size:14px;cursor:pointer">×</button>
              </div>
            `;
      }).join('')
    }
      <div style="margin-top:10px;display:flex;gap:8px">
        <input type="text" id="friend-input" class="sys-input" placeholder="Enter hunter name..." style="flex:1"/>
        <button class="btn-secondary" onclick="addFriend()">ADD</button>
      </div>
      <div style="font-family:var(--font-mono);font-size:9px;color:var(--text3);margin-top:8px;line-height:1.6">
        Share your hunter name <span style="color:var(--accent)">${HUNTER?.name?.toUpperCase() || ''}</span> with friends so they can follow you.
      </div>
    </div>
  `;
}

promptAddToHomeScreen();
