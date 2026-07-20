const AUTH_KEY = 'hf_logged_in';
const USER_KEY = 'hf_user_id';

export function isLoggedIn() {
  return localStorage.getItem(AUTH_KEY) === 'true';
}

export function login(userId) {
  localStorage.setItem(AUTH_KEY, 'true');
  localStorage.setItem(USER_KEY, String(userId));
}

export function logout() {
  localStorage.removeItem(AUTH_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getCurrentUserId() {
  const id = localStorage.getItem(USER_KEY);
  return id ? Number(id) : null;
}
