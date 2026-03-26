// ============================================
// SYSTEM — PAGES MODULE (Clean Version)
// ============================================

// --------------------
// Quests Page
// --------------------
function renderQuestsPage() {
  const container = document.getElementById('page-quests');
  if (!container) return;
  container.innerHTML = `
    <h2>Quests</h2>
    <p>Complete these quests to gain experience and rewards!</p>
    <ul id="quest-list"></ul>
  `;

  const questList = document.getElementById('quest-list');
  const quests = HUNTER?.quests || [
    { name: "Tutorial Quest", progress: 0, goal: 1 },
    { name: "Daily Challenge", progress: 0, goal: 1 }
  ];

  quests.forEach((q, idx) => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${q.name} — ${q.progress}/${q.goal}
      <button onclick="completeQuest(${idx})">Complete</button>
    `;
    questList.appendChild(li);
  });
}

function completeQuest(index) {
  if (!HUNTER || !HUNTER.quests) return;
  const quest = HUNTER.quests[index];
  if (!quest) return;
  quest.progress = quest.goal; // mark as complete
  saveHunter(HUNTER);
  renderQuestsPage();
}

// --------------------
// Train Page
// --------------------
function renderTrainPage() {
  const container = document.getElementById('page-train');
  if (!container) return;

  container.innerHTML = `
    <h2>Training Grounds</h2>
    <p>Increase your stats manually here!</p>
    <div id="training-options"></div>
  `;

  const options = document.getElementById('training-options');
  const stats = HUNTER?.stats || { strength: 5, agility: 5, intelligence: 5 };

  for (let stat in stats) {
    const div = document.createElement('div');
    div.innerHTML = `
      ${stat.toUpperCase()}: ${stats[stat]}
      <button onclick="trainStat('${stat}')">Train +1</button>
    `;
    options.appendChild(div);
  }
}

function trainStat(stat) {
  if (!HUNTER || !HUNTER.stats) return;
  HUNTER.stats[stat] += 1;
  saveHunter(HUNTER);
  renderTrainPage();
}

// --------------------
// Nutrition Page
// --------------------
function renderNutritionPage() {
  const container = document.getElementById('page-nutrition');
  if (!container) return;

  container.innerHTML = `
    <h2>Nutrition</h2>
    <p>Track your meals and calories manually.</p>
  `;
}

// --------------------
// Workout Page
// --------------------
function renderWorkoutPage() {
  const container = document.getElementById('page-workout');
  if (!container) return;

  container.innerHTML = `
    <h2>Workout</h2>
    <p>Log your exercises manually.</p>
  `;
}

// --------------------
// Status Page
// --------------------
function renderStatusPage() {
  const container = document.getElementById('page-status');
  if (!container) return;

  const stats = HUNTER?.stats || { strength: 5, agility: 5, intelligence: 5 };
  container.innerHTML = `
    <h2>Status</h2>
    <ul>
      ${Object.entries(stats).map(([k, v]) => `<li>${k.toUpperCase()}: ${v}</li>`).join('')}
    </ul>
  `;
}

// --------------------
// Other Pages (stubs)
// --------------------
function renderBossPage() { document.getElementById('page-boss').innerHTML = `<h2>Boss Battle</h2>`; }
function renderSkillTree() { document.getElementById('page-skills').innerHTML = `<h2>Skills</h2>`; }
function renderShadowArmy() { document.getElementById('page-army').innerHTML = `<h2>Shadow Army</h2>`; }
function renderInventory() { document.getElementById('page-inventory').innerHTML = `<h2>Inventory</h2>`; }
function renderGuildPage() { document.getElementById('page-guild').innerHTML = `<h2>Guild</h2>`; }
function renderSelfImprovePage() { document.getElementById('page-improve').innerHTML = `<h2>Self Improvement</h2>`; }
function renderSettingsPage() { Settings.init(); }
