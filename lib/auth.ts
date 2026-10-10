import { useAppStore } from '@/store/useAppStore';

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';

export async function login(email: string, password: string) {
  const response = await fetch(`${NEXT_PUBLIC_API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include', // so the browser stores the cookie from response
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Login failed');
  }
  if (data.user) {
    useAppStore.getState().setUser(data.user);
  }
  return data; // { message, user } — token is in the cookie not here
}

export async function googleAuth(idToken: string) {
  const response = await fetch(`${NEXT_PUBLIC_API_URL}/auth/google`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken }),
    credentials: 'include',
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Google authentication failed');
  }
  if (data.user) {
    useAppStore.getState().setUser(data.user);
  }
  return data;
}

export async function signup(firstName: string, lastName: string, email: string, password: string) {
  const response = await fetch(`${NEXT_PUBLIC_API_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ firstName, lastName, email, password }),
    credentials: 'include',
  });

  const data = await response.json();
  if (!response.ok) {
    let errorMessage = data.message;
    // backend sometimes returns array of validation errors
    if (Array.isArray(data.message)) {
      errorMessage = data.message.join(', ');
    }
    throw new Error(errorMessage || 'Signup failed');
  }
  return data;
}

export async function logout() {
  try {
    useAppStore.getState().setUser(null);
  } catch {}
  
  try {
    // backend clears the cookie, we cant do it from js since its httponly
    await fetch(`${NEXT_PUBLIC_API_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
  } catch {}
  
  window.location.href = '/login';
}
