// ============================================
// SYSTEM — APP BOOTSTRAP v3 + WATER REMINDERS
// ============================================

// ====== BACKGROUND CANVAS ======
(function initCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }

  function createParticles() {
    particles = [];
    const count = Math.floor((W * H) / 14000);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.2 + 0.3,
        vx: (Math.random() - 0.5) * 0.15, vy: (Math.random() - 0.5) * 0.15,
        alpha: Math.random() * 0.4 + 0.1, blue: Math.random() > 0.7
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.strokeStyle = 'rgba(15,48,96,0.25)'; ctx.lineWidth = 0.5;
    const sp = 60;
    for (let x = 0; x < W; x += sp) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
    for (let y = 0; y < H; y += sp) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.blue ? `rgba(0,180,255,${p.alpha})` : `rgba(100,160,220,${p.alpha * 0.5})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); createParticles(); });
  resize(); createParticles(); draw();
})();

// ====== PAGE NAVIGATION ======
function showPage(name, btn) {
  const pageEl = document.getElementById('page-' + name);
  if (!pageEl) return console.warn(`Page '${name}' not found`);

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(b => b.classList.remove('active'));

  pageEl.classList.add('active');
  if (btn) btn.classList.add('active');

  // Render page functions
  if (name === 'quests' && typeof renderQuestsPage === 'function') renderQuestsPage();
  if (name === 'train' && typeof renderTrainPage === 'function') renderTrainPage();
  if (name === 'nutrition' && typeof renderNutritionPage === 'function') renderNutritionPage();
  if (name === 'workout' && typeof renderWorkoutPage === 'function') renderWorkoutPage();
  if (name === 'status' && typeof renderStatusPage === 'function') renderStatusPage();
  if (name === 'boss' && typeof renderBossPage === 'function') renderBossPage();
  if (name === 'skills' && typeof renderSkillTree === 'function') renderSkillTree();
  if (name === 'army' && typeof renderShadowArmy === 'function') renderShadowArmy();
  if (name === 'inventory' && typeof renderInventory === 'function') renderInventory();
  if (name === 'guild' && typeof renderGuildPage === 'function') renderGuildPage();
  if (name === 'improve' && typeof renderSelfImprovePage === 'function') renderSelfImprovePage();
  if (name === 'settings') Settings.init();
}

// ====== APP LAUNCH ======
function launchApp(hunterData) {
  const hunter = loadHunter ? loadHunter(hunterData) : { name: 'Player' };
  window.HUNTER = hunter;

  const loginScreen = document.getElementById('login-screen');
  const appScreen = document.getElementById('app-screen');
  if (loginScreen) loginScreen.style.display = 'none';
  if (appScreen) appScreen.classList.remove('hidden');

  // Init settings
  Settings.init();

  // Render default page
  showPage('quests');

  // Water reminders
  if (typeof initWaterReminders === 'function') initWaterReminders();
}

// ====== DOM READY ======
window.addEventListener('DOMContentLoaded', () => {
  const gateInput = document.getElementById('gate-pass');
  if (gateInput) {
    gateInput.addEventListener('keydown', e => { if (e.key === 'Enter') handleGateLogin(); });
    setTimeout(() => gateInput.focus(), 400);
  }

  if (hasValidSession && hasValidSession()) {
    launchApp(getHunterProfile ? getHunterProfile() : {});
  }
});
