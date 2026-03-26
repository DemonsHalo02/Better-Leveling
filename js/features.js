// ============================================
// FEATURES.JS — SELF-IMPROVEMENT & CALORIE/MACRO
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initSelfImprovePage();
});

function initSelfImprovePage() {
  initHydrationTracker();
  initHabitTracker();
  initPRTracker();
  initCalorieMacroCalculator();
  initSupplementTracker();
  initWeeklyReview();
}

// -----------------------------
// HYDRATION TRACKER
// -----------------------------
function initHydrationTracker() {
  const container = document.getElementById('hydration-tracker');
  container.innerHTML = `
    <h4>💧 Hydration Tracker</h4>
    <input type="number" id="hydration-input" placeholder="Glasses today" min="0" style="width:80px"/>
    <button onclick="saveHydration()">Save</button>
    <div id="hydration-log"></div>
  `;

  loadHydrationLog();
}

function saveHydration() {
  const val = parseInt(document.getElementById('hydration-input').value) || 0;
  const today = new Date().toISOString().split('T')[0];
  const log = JSON.parse(localStorage.getItem('hydrationLog') || '{}');
  log[today] = val;
  localStorage.setItem('hydrationLog', JSON.stringify(log));
  loadHydrationLog();
}

function loadHydrationLog() {
  const log = JSON.parse(localStorage.getItem('hydrationLog') || '{}');
  const logContainer = document.getElementById('hydration-log');
  logContainer.innerHTML = Object.entries(log).map(([day, val]) => `${day}: ${val} glasses`).join('<br>') || 'No data';
}

// -----------------------------
// HABIT TRACKER
// -----------------------------
function initHabitTracker() {
  const container = document.getElementById('habit-tracker');
  container.innerHTML = `
    <h4>📋 Habit Tracker</h4>
    <input type="text" id="habit-input" placeholder="New habit"/>
    <button onclick="addHabit()">Add</button>
    <ul id="habit-list"></ul>
  `;
  loadHabits();
}

function addHabit() {
  const habit = document.getElementById('habit-input').value.trim();
  if (!habit) return;
  const habits = JSON.parse(localStorage.getItem('habits') || '[]');
  habits.push({ name: habit, done: false });
  localStorage.setItem('habits', JSON.stringify(habits));
  document.getElementById('habit-input').value = '';
  loadHabits();
}

function toggleHabit(index) {
  const habits = JSON.parse(localStorage.getItem('habits') || '[]');
  habits[index].done = !habits[index].done;
  localStorage.setItem('habits', JSON.stringify(habits));
  loadHabits();
}

function loadHabits() {
  const habits = JSON.parse(localStorage.getItem('habits') || '[]');
  const list = document.getElementById('habit-list');
  list.innerHTML = '';
  habits.forEach((h, i) => {
    const li = document.createElement('li');
    li.innerHTML = `<input type="checkbox" ${h.done ? 'checked' : ''} onclick="toggleHabit(${i})"/> ${h.name}`;
    list.appendChild(li);
  });
}

// -----------------------------
// PERSONAL RECORDS (PR) TRACKER
// -----------------------------
function initPRTracker() {
  const container = document.getElementById('pr-tracker');
  container.innerHTML = `
    <h4>🏋️ Personal Records</h4>
    <input type="text" id="pr-exercise" placeholder="Exercise"/>
    <input type="number" id="pr-weight" placeholder="Weight" style="width:80px"/>
    <button onclick="addPR()">Add</button>
    <ul id="pr-list"></ul>
  `;
  loadPRs();
}

function addPR() {
  const exercise = document.getElementById('pr-exercise').value.trim();
  const weight = parseFloat(document.getElementById('pr-weight').value) || 0;
  if (!exercise || weight <= 0) return;
  const prs = JSON.parse(localStorage.getItem('prs') || '[]');
  prs.push({ exercise, weight });
  localStorage.setItem('prs', JSON.stringify(prs));
  document.getElementById('pr-exercise').value = '';
  document.getElementById('pr-weight').value = '';
  loadPRs();
}

function loadPRs() {
  const prs = JSON.parse(localStorage.getItem('prs') || '[]');
  const list = document.getElementById('pr-list');
  list.innerHTML = prs.map(p => `<li>${p.exercise}: ${p.weight} lbs</li>`).join('') || 'No PRs yet';
}

// -----------------------------
// CALORIE & MACRO CALCULATOR
// -----------------------------
function initCalorieMacroCalculator() {
  const weightSlider = document.getElementById('calc-weight');
  const heightSlider = document.getElementById('calc-height');
  const ageSlider = document.getElementById('calc-age');

  const weightVal = document.getElementById('weight-val');
  const heightVal = document.getElementById('height-val');
  const ageVal = document.getElementById('age-val');

  const proteinSlider = document.getElementById('protein-ratio');
  const fatSlider = document.getElementById('fat-ratio');
  const carbSlider = document.getElementById('carb-ratio');

  const proteinVal = document.getElementById('protein-val');
  const fatVal = document.getElementById('fat-val');
  const carbVal = document.getElementById('carb-val');

  // Update displayed values for sliders
  const sliders = [
    [weightSlider, weightVal],
    [heightSlider, heightVal],
    [ageSlider, ageVal],
    [proteinSlider, proteinVal],
    [fatSlider, fatVal],
    [carbSlider, carbVal]
  ];

  sliders.forEach(([slider, display]) => {
    slider.addEventListener('input', () => {
      display.textContent = slider.value;
      calculateMacros();
    });
  });

  ['calc-gender', 'calc-activity', 'calc-goal'].forEach(id => {
    document.getElementById(id).addEventListener('change', calculateMacros);
  });

  // Initial calculation
  calculateMacros();
}

function calculateMacros() {
  const w = parseFloat(document.getElementById('calc-weight').value);
  const h = parseFloat(document.getElementById('calc-height').value);
  const a = parseInt(document.getElementById('calc-age').value);
  const g = document.getElementById('calc-gender').value;
  const activity = parseFloat(document.getElementById('calc-activity').value);
  const goal = parseInt(document.getElementById('calc-goal').value);

  const proteinRatio = parseFloat(document.getElementById('protein-ratio').value) / 100;
  const fatRatio = parseFloat(document.getElementById('fat-ratio').value) / 100;
  const carbRatio = parseFloat(document.getElementById('carb-ratio').value) / 100;

  // Validate total ratio
  const totalRatio = proteinRatio + fatRatio + carbRatio;
  if (totalRatio !== 1) {
    document.getElementById('calc-results').innerHTML = `<p style="color:#ff4d4d;">Macro ratios must sum to 100%</p>`;
    return;
  }

  // BMR using Mifflin-St Jeor
  let bmr = g === 'male'
    ? 66 + 6.23 * w + 12.7 * h - 6.8 * a
    : 655 + 4.35 * w + 4.7 * h - 4.7 * a;

  const tdee = Math.round(bmr * activity);
  const targetCalories = tdee + goal;

  // Macros
  const protein = Math.round((targetCalories * proteinRatio) / 4);
  const fat = Math.round((targetCalories * fatRatio) / 9);
  const carbs = Math.round((targetCalories * carbRatio) / 4);

  document.getElementById('calc-results').innerHTML = `
    <p>Calories needed: <b>${targetCalories}</b> kcal/day</p>
    <p>Macros: Protein <b>${protein}g</b>, Carbs <b>${carbs}g</b>, Fat <b>${fat}g</b></p>
  `;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initCalorieMacroCalculator);

// -----------------------------
// SUPPLEMENT TRACKER
// -----------------------------
function initSupplementTracker() {
  const container = document.getElementById('supplement-tracker');
  container.innerHTML = `
    <h4>💊 Supplement Tracker</h4>
    <input type="text" id="supplement-input" placeholder="Supplement"/>
    <button onclick="addSupplement()">Add</button>
    <ul id="supplement-list"></ul>
  `;
  loadSupplements();
}

function addSupplement() {
  const name = document.getElementById('supplement-input').value.trim();
  if (!name) return;
  const supps = JSON.parse(localStorage.getItem('supplements') || '[]');
  supps.push(name);
  localStorage.setItem('supplements', JSON.stringify(supps));
  document.getElementById('supplement-input').value = '';
  loadSupplements();
}

function loadSupplements() {
  const supps = JSON.parse(localStorage.getItem('supplements') || '[]');
  const list = document.getElementById('supplement-list');
  list.innerHTML = supps.map(s => `<li>${s}</li>`).join('') || 'No supplements added';
}

// -----------------------------
// WEEKLY REVIEW
// -----------------------------
function initWeeklyReview() {
  const container = document.getElementById('weekly-review');
  container.innerHTML = `
    <h4>📝 Weekly Review</h4>
    <textarea id="weekly-notes" placeholder="Write your weekly thoughts..." style="width:100%;height:100px"></textarea>
    <button onclick="saveWeeklyReview()">Save Review</button>
    <div id="weekly-log"></div>
  `;
  loadWeeklyReview();
}

function saveWeeklyReview() {
  const text = document.getElementById('weekly-notes').value;
  const today = new Date().toISOString().split('T')[0];
  const log = JSON.parse(localStorage.getItem('weeklyReview') || '{}');
  log[today] = text;
  localStorage.setItem('weeklyReview', JSON.stringify(log));
  loadWeeklyReview();
}

function loadWeeklyReview() {
  const log = JSON.parse(localStorage.getItem('weeklyReview') || '{}');
  const logContainer = document.getElementById('weekly-log');
  logContainer.innerHTML = Object.entries(log).map(([day, note]) => `<b>${day}</b>: ${note}`).join('<br>') || 'No reviews yet';
}
