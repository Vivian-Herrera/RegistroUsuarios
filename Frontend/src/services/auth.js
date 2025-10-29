const API = 'http://backend-api:3000';

export async function register(name, email, password) {
  const res = await fetch(`${API}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });
  return res.json();
}

export async function login(email, password) {
  const res = await fetch(`${API}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (data.token) localStorage.setItem('token', data.token);
  return data;
}

export async function getProfile() {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API}/profile`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.json();
}
export function logout() {
  localStorage.removeItem('token');
}