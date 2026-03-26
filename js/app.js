// ==============================
// BETTER LEVELING APP.JS
// ==============================

// ====== LOGIN HANDLER ======
function handleGateLogin() {
  const username = document.getElementById('gate-pass').value.trim();
  if (!username) {
    alert("Please enter your name!"); // You can replace this with styled error messages
    return;
  }

  // Save username in localStorage
  localStorage.setItem('bl_username', username);

  // Hide login, show app
  document.getElementById('login-screen').classList.add('hidden');
  document.getElementById('app-screen').classList.remove('hidden');

  // Initialize app
  initSettings();
  launchApp();
}

// ====== SESSION CHECK ======
function hasValidSession() {
  const storedUser = localStorage.getItem('bl_username');
  return storedUser && storedUser.length > 0;
}

// ====== PAGE SWITCHING ======
function showPage(pageId, btnEl) {
  const pages = document.querySelectorAll('.page');
  pages.forEach(p => p.classList.remove('active'));
  const page = document.getElementById(`page-${pageId}`);
  if (page) page.classList.add('active');

  const tabs = document.querySelectorAll('.nav-tab');
  tabs.forEach(t => t.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');
}

// ====== INIT SETTINGS (placeholder) ======
function initSettings() {
  // Here you can load user preferences, dark mode, notifications, etc.
  console.log("Settings initialized");
}

// ====== LAUNCH APP ======
function launchApp() {
  const username = localStorage.getItem('bl_username') || "Hunter";
  console.log("Welcome,", username);

  // Show default page
  const firstTab = document.querySelector('.nav-tab');
  if (firstTab) firstTab.click();
}

// ====== PAGE LOAD ======
window.addEventListener('DOMContentLoaded', () => {
  if (hasValidSession()) {
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('app-screen').classList.remove('hidden');
    initSettings();
    launchApp();
  }
});
