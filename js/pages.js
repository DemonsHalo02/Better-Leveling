// ============================================
// PAGES.JS — MANUAL INPUT VERSION
// ============================================

const PAGES = {
  dashboard: () => {
    const el = document.getElementById('page-dashboard');
    el.innerHTML = `
      <div class="section-head">DASHBOARD</div>
      <div class="sys-card">
        <div>Welcome to HUNTER!</div>
        <div>Total Foods Logged: ${HUNTER.nutrition ? HUNTER.nutrition.length : 0}</div>
        <div>Total Workouts Logged: ${HUNTER.workouts ? HUNTER.workouts.length : 0}</div>
      </div>
    `;
  },

  nutrition: () => {
    const el = document.getElementById('page-nutrition');
    el.innerHTML = `
      <div class="section-head">MANUAL NUTRITION LOG</div>
      <div class="sys-card">
        <label>Food Name</label>
        <input type="text" id="manual-food-name" placeholder="e.g., Chicken Breast" />

        <label>Calories (kcal)</label>
        <input type="number" id="manual-calories" placeholder="e.g., 200" />

        <label>Protein (g)</label>
        <input type="number" id="manual-protein" placeholder="e.g., 30" />

        <label>Carbs (g)</label>
        <input type="number" id="manual-carbs" placeholder="e.g., 0" />

        <label>Fat (g)</label>
        <input type="number" id="manual-fat" placeholder="e.g., 5" />

        <button class="btn-primary" onclick="logManualFood()">Log Food</button>
      </div>

      <div class="section-head" style="margin-top:12px">FOOD HISTORY</div>
      <div class="sys-card" id="manual-food-history" style="min-height:100px">
        No foods logged yet
      </div>
    `;
    renderManualFoodHistory();
  },

  workouts: () => {
    const el = document.getElementById('page-workouts');
    el.innerHTML = `
      <div class="section-head">MANUAL WORKOUT LOG</div>
      <div class="sys-card">
        <label>Workout Name</label>
        <input type="text" id="manual-workout-name" placeholder="e.g., Chest & Triceps" />

        <label>Duration (minutes)</label>
        <input type="number" id="manual-workout-duration" placeholder="e.g., 45" />

        <button class="btn-primary" onclick="logManualWorkout()">Log Workout</button>
      </div>

      <div class="section-head" style="margin-top:12px">WORKOUT HISTORY</div>
      <div class="sys-card" id="manual-workout-history" style="min-height:100px">
        No workouts logged yet
      </div>
    `;
    renderManualWorkoutHistory();
  },
};

// ============================================
// MANUAL LOGGING FUNCTIONS
// ============================================

function logManualFood() {
  const name = document.getElementById('manual-food-name').value.trim();
  const calories = parseInt(document.getElementById('manual-calories').value);
  const protein = parseInt(document.getElementById('manual-protein').value);
  const carbs = parseInt(document.getElementById('manual-carbs').value);
  const fat = parseInt(document.getElementById('manual-fat').value);

  if (!name || isNaN(calories)) return showNotif('Please enter a food name and calories', 'red');

  HUNTER.nutrition = HUNTER.nutrition || [];
  HUNTER.nutrition.push({
    name,
    calories,
    protein: isNaN(protein) ? 0 : protein,
    carbs: isNaN(carbs) ? 0 : carbs,
    fat: isNaN(fat) ? 0 : fat,
    date: new Date().toLocaleDateString(),
  });

  showNotif(`Logged ${name} +${calories} kcal`, 'green');
  clearFoodInputs();
  renderManualFoodHistory();
}

function renderManualFoodHistory() {
  const el = document.getElementById('manual-food-history');
  if (!HUNTER.nutrition || HUNTER.nutrition.length === 0) {
    el.textContent = 'No foods logged yet';
    return;
  }

  el.innerHTML = HUNTER.nutrition
    .map(f => `${f.date} — ${f.name}: ${f.calories} kcal | P${f.protein} C${f.carbs} F${f.fat}`)
    .join('<br>');
}

function clearFoodInputs() {
  document.getElementById('manual-food-name').value = '';
  document.getElementById('manual-calories').value = '';
  document.getElementById('manual-protein').value = '';
  document.getElementById('manual-carbs').value = '';
  document.getElementById('manual-fat').value = '';
}

// ===== WORKOUT LOGGING =====
function logManualWorkout() {
  const name = document.getElementById('manual-workout-name').value.trim();
  const duration = parseInt(document.getElementById('manual-workout-duration').value);

  if (!name || isNaN(duration)) return showNotif('Please enter workout name and duration', 'red');

  HUNTER.workouts = HUNTER.workouts || [];
  HUNTER.workouts.push({
    name,
    duration,
    date: new Date().toLocaleDateString(),
  });

  showNotif(`Logged workout: ${name} (${duration} min)`, 'green');
  clearWorkoutInputs();
  renderManualWorkoutHistory();
}

function renderManualWorkoutHistory() {
  const el = document.getElementById('manual-workout-history');
  if (!HUNTER.workouts || HUNTER.workouts.length === 0) {
    el.textContent = 'No workouts logged yet';
    return;
  }

  el.innerHTML = HUNTER.workouts
    .map(w => `${w.date} — ${w.name}: ${w.duration} min`)
    .join('<br>');
}

function clearWorkoutInputs() {
  document.getElementById('manual-workout-name').value = '';
  document.getElementById('manual-workout-duration').value = '';
}
