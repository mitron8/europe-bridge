import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// runs on the server for every /dashboard/* route
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies(); // async in next 15+
  const token = cookieStore.get('accessToken')?.value;

  if (!token) {
    redirect('/login');
  }

  const apiUrl = process.env.API_URL || 'http://localhost:3001';

  try {
    // ask the backend if this token is still good
    const res = await fetch(`${apiUrl}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      redirect('/login');
    }
  } catch (err) {
    // backend down or something, just kick them to login
    redirect('/login');
  }

  return <>{children}</>;
}
