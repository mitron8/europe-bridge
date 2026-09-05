import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// server component - wraps role-specific dashboard layouts
export async function AuthGuard({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: string[] }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;

  // no token? straight to jail (login)
  if (!token) {
    redirect('/login');
  }

  const apiUrl = process.env.API_URL || 'http://localhost:3001';

  let userRole: string | undefined;
  let authFailed = false;

  // we can't put redirect() inside the try block because nextjs redirect throws an error under the hood
  // and the catch block would swallow it!
  try {
    const res = await fetch(`${apiUrl}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store', // always check live
    });

    if (!res.ok) {
      authFailed = true;
    } else {
      const data = await res.json();
      userRole = data.user?.role;
    }
  } catch {
    // backend probably died
    authFailed = true;
  }

  // if the fetch failed or status was not 200, bounce them to login
  if (authFailed) {
    redirect('/login');
  }

  // if they're trying to sneak into another role's dashboard, safely bounce them back to their own
  if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
    // map the db role to the frontend route
    const targetDashboard = userRole === 'superadmin' ? 'super-admin' : userRole;
    redirect(`/dashboard/${targetDashboard}`);
  }

  // all good, let them see the page
  return <>{children}</>;
}
