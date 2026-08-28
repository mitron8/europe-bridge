const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

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
  return data; // { message, user } — token is in the cookie not here
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
  // backend clears the cookie, we cant do it from js since its httponly
  await fetch(`${NEXT_PUBLIC_API_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });
  window.location.href = '/login';
}
