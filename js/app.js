// ============================================
// SYSTEM — APP BOOTSTRAP v4 (Clean)
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
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.2 + 0.3,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        alpha: Math.random() * 0.4 + 0.1,
        blue: Math.random() > 0.7
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
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(b => b.classList.remove('active'));
  const page = document.getElementById('page-' + name);
  if (!page) return;
  page.classList.add('active');
  if (btn) btn.classList.add('active');

  // Render page content
  switch (name) {
    case 'quests': renderQuestsPage(); break;
    case 'train': renderTrainPage(); break;
    case 'nutrition': renderNutritionPage(); break;
    case 'workout': renderWorkoutPage(); break;
    case 'status': renderStatusPage(); break;
    case 'boss': renderBossPage(); break;
    case 'skills': renderSkillTree(); break;
    case 'army': renderShadowArmy(); break;
    case 'inventory': renderInventory(); break;
    case 'guild': renderGuildPage(); break;
    case 'improve': renderSelfImprovePage(); break;
    case 'settings': Settings.init(); break; // fixed
  }
}

// ====== APP LAUNCH ======
function launchApp(hunterData) {
  const hunter = loadHunter(hunterData);
  HUNTER = hunter;

  document.getElementById('login-screen').style.display = 'none';
  document.getElementById('app-screen').classList.remove('hidden');

  refreshHUD();
  Settings.init();      // replaced initSettings()
  renderQuestsPage();   // default page
  checkShadowUnlocks();
  checkLoginStreakBonus();
  if (typeof checkAllAchievements === 'function') setTimeout(checkAllAchievements, 2000);

  // No more Apple/Google or health auto-sync
  // New user intro
  const isNew = !localStorage.getItem('sys_awakened_' + hunter.name.toLowerCase());
  if (isNew) {
    setTimeout(() => playAwakeningIntro(hunter.name, () => {
      showSystemMessage([
        { text: 'WELCOME TO THE SYSTEM', color: 'var(--accent)', size: 13, delay: 0 },
        { text: hunter.name.toUpperCase(), color: 'var(--gold)', size: 28, delay: 600 },
        { text: 'YOUR JOURNEY BEGINS NOW', color: 'var(--text2)', size: 11, delay: 1400 },
      ]);
    }), 300);
  }

  initWaterReminders();
}

// ====== DOM READY ======
window.addEventListener('DOMContentLoaded', async () => {
  const gateInput = document.getElementById('gate-pass');
  if (gateInput) {
    gateInput.addEventListener('keydown', e => { if (e.key === 'Enter') handleGateLogin(); });
    setTimeout(() => gateInput.focus(), 400);
  }

  if (hasValidSession()) launchApp(getHunterProfile());
});
