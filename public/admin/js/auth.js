const AUTH_KEY = 'lunarveil_admin_auth';
const TOKEN_KEY = 'lunarveil_admin_token';
const API_BASE = window.location.origin + '/api';

async function login(username, password) {
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (!res.ok) {
      if (res.status === 429) {
        return { success: false, error: data.error || 'Terlalu banyak percobaan. Coba lagi dalam 15 menit.' };
      }
      return { success: false, error: data.error || 'Username atau password salah.' };
    }

    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(AUTH_KEY, JSON.stringify({
      loggedIn: true,
      username: username,
      loginTime: new Date().toISOString()
    }));

    return { success: true };
  } catch {
    const existingToken = localStorage.getItem(TOKEN_KEY);
    const session = JSON.parse(localStorage.getItem(AUTH_KEY) || 'null');
    if (existingToken && session && session.loggedIn) {
      return { success: true };
    }
    return { success: false, error: 'Tidak dapat terhubung ke server. Silakan coba lagi nanti.' };
  }
}

function logout() {
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(TOKEN_KEY);
  window.location.href = 'index.html';
}

function isLoggedIn() {
  const session = JSON.parse(localStorage.getItem(AUTH_KEY) || 'null');
  return session && session.loggedIn === true;
}

function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function requireAuth() {
  if (!isLoggedIn()) {
    window.location.href = 'index.html';
    return false;
  }
  return true;
}
