"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Dashboard', path: '/dashboard/super-admin' },
  { name: 'Students', path: '/dashboard/super-admin/students' },
  { name: 'Counsellors', path: '/dashboard/super-admin/counsellors' },
  { name: 'Admins', path: '/dashboard/super-admin/admins' },
  { name: 'Marketing', path: '/dashboard/super-admin/marketing' },
  { name: 'Finance', path: '/dashboard/super-admin/finance' },
  { name: 'Content', path: '/dashboard/super-admin/content' },
  { name: 'Reports & Analytics', path: '/dashboard/super-admin/reports' },
  { name: 'University Database & Listings', path: '/dashboard/super-admin/universities' },
  { name: 'Important Notices', path: '/dashboard/super-admin/notices' },
];

export function SuperAdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 border-r border-black h-screen flex flex-col bg-white">
      <div className="p-6 border-b border-black">
        <h2 className="font-bold text-xl text-black">EuropeBridge</h2>
        <p className="text-sm text-gray-500">Super Admin Portal</p>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`block p-2 rounded ${isActive ? 'bg-black text-white font-bold' : 'text-black hover:bg-gray-100'}`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-black">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center border border-black">
            <span className="text-black font-bold">SA</span>
          </div>
          <div>
            <div className="font-bold text-sm text-black">Super Admin Name</div>
          </div>
        </div>
        <Link href="/dashboard/super-admin/account" className="block text-center text-sm border border-black rounded py-1 hover:bg-gray-100 text-black mb-2">
          Account
        </Link>
        <Link href="/login" className="block text-center text-sm bg-black text-white rounded py-1 hover:bg-gray-800">
          Logout
        </Link>
      </div>
    </div>
  );
}
