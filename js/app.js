// ===============================
// SESSION / LOGIN HANDLERS
// ===============================

// Check if there is a saved session (e.g., in localStorage)
function hasValidSession() {
  const name = localStorage.getItem('playerName');
  return !!name && name.trim().length > 0;
}

// Handle the login button click
function handleGateLogin() {
  const input = document.getElementById('gate-pass');
  const name = input.value.trim();

  if (!name) {
    showError('Please enter a valid name.');
    return;
  }

  // Save player name in localStorage (or session storage)
  localStorage.setItem('playerName', name);

  // Initialize the app
  launchApp();
}

// Show error messages under the input (optional)
function showError(msg) {
  let errorEl = document.getElementById('login-error');

  if (!errorEl) {
    errorEl = document.createElement('div');
    errorEl.id = 'login-error';
    errorEl.className = 'error-msg';
    const loginCard = document.querySelector('#login-screen');
    loginCard.appendChild(errorEl);
  }

  errorEl.textContent = msg;
}

// ===============================
// APP LAUNCH
// ===============================
function launchApp() {
  const loginScreen = document.getElementById('login-screen');
  const appScreen = document.getElementById('app-screen');

  const name = localStorage.getItem('playerName');

  if (!name) {
    loginScreen.classList.remove('hidden');
    appScreen.classList.add('hidden');
    return;
  }

  // Hide login, show main app
  loginScreen.classList.add('hidden');
  appScreen.classList.remove('hidden');

  // Initialize your app settings, XP bars, etc.
  if (typeof initSettings === 'function') initSettings();
}

// ===============================
// ON PAGE LOAD
// ===============================
window.addEventListener('DOMContentLoaded', () => {
  if (hasValidSession()) {
    launchApp();
  } else {
    document.getElementById('login-screen').classList.remove('hidden');
  }

  // Optional: Enter key triggers login
  const gateInput = document.getElementById('gate-pass');
  gateInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') handleGateLogin();
  });
});
