"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Dashboard', path: '/dashboard/admin' },
  { name: 'Students', path: '/dashboard/admin/students' },
  { name: 'Counsellors', path: '/dashboard/admin/counsellors' },
  { name: 'University Database & Listings', path: '/dashboard/admin/universities' },
  { name: 'Reports & Analysis', path: '/dashboard/admin/reports' },
  { name: 'Important Notices', path: '/dashboard/admin/notices' },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 border-r border-black h-screen flex flex-col bg-white">
      <div className="p-6 border-b border-black">
        <Link href="/" className="font-bold text-xl text-black hover:underline block">
          EuropeBridge
        </Link>
        <p className="text-sm text-gray-500">Admin Portal</p>
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
            <span className="text-black font-bold">AN</span>
          </div>
          <div>
            <div className="font-bold text-sm text-black">Admin Name</div>
          </div>
        </div>
        <Link href="/dashboard/admin/account" className="block text-center text-sm border border-black rounded py-1 hover:bg-gray-100 text-black mb-2">
          Account
        </Link>
        <Link href="/login" className="block text-center text-sm bg-black text-white rounded py-1 hover:bg-gray-800">
          Logout
        </Link>
      </div>
    </div>
  );
}
