"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logout } from '@/lib/auth';

const navItems = [
  { name: 'Dashboard', path: '/dashboard/student' },
  { name: 'Complete My Profile', path: '/dashboard/student/profile' },
  { name: 'Matching Engine', path: '/dashboard/student/matching' },
  { name: 'My Shortlist', path: '/dashboard/student/shortlist' },
  { name: 'Document Hub', path: '/dashboard/student/documents' },
  { name: 'APS Checklist', path: '/dashboard/student/aps' },
  { name: 'College Applications', path: '/dashboard/student/applications' },
  { name: 'Visa Assistance', path: '/dashboard/student/visa' },
];

export function StudentSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 border-r border-black h-screen flex flex-col bg-white">
      <div className="p-6 border-b border-black">
        <h2 className="font-bold text-xl text-black">EuropeBridge</h2>
        <p className="text-sm text-gray-500">Student Portal</p>
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
            <span className="text-black font-bold">SN</span>
          </div>
          <div>
            <div className="font-bold text-sm text-black">Student Name</div>
          </div>
        </div>
        <Link href="/dashboard/student/account" className="block text-center text-sm border border-black rounded py-1 hover:bg-gray-100 text-black mb-2">
          View Profile
        </Link>
        <button onClick={() => logout()} className="block w-full text-center text-sm bg-black text-white rounded py-1 hover:bg-gray-800">
          Logout
        </button>
      </div>
    </div>
  );
}
