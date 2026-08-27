import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// server component — wraps role-specific dashboard layouts
export async function AuthGuard({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: string[] }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  if (!token) {
    redirect('/login');
  }

  const apiUrl = process.env.API_URL || 'http://localhost:3001';

  try {
    const res = await fetch(`${apiUrl}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });

    if (!res.ok) {
      redirect('/login');
    }

    const data = await res.json();
    const userRole = data.user?.role;

    // if they're trying to open another role's dashboard, send them to their own
    if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
      redirect(`/dashboard/${userRole}`);
    }
  } catch (err) {
    redirect('/login');
  }

  return <>{children}</>;
}
