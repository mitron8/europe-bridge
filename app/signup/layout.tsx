import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function SignupLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  if (token) {
    const apiUrl = (process.env.API_URL?.startsWith('http') ? process.env.API_URL : null) || 'https://europebridge.onrender.com';
    let userRole: string | null = null;

    // nextjs implements redirect() by throwing NEXT_REDIRECT, so we cant
    // put it inside a try/catch or it gets swallowed. fetch only.
    try {
      const res = await fetch(`${apiUrl}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store',
      });
      
      if (res.ok) {
        const data = await res.json();
        userRole = data.user?.role ?? null;
      }
    } catch (err) {
      // network dead or token invalid, just let them sign up
    }

    if (userRole) {
      redirect(`/dashboard/${userRole}`);
    }
  }

  return <>{children}</>;
}
