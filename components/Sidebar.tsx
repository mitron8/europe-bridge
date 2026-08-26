import Link from 'next/link';

export function Sidebar({ role }: { role: string }) {
  return (
    <div className="w-64 bg-white border-r border-black h-full p-4 flex flex-col">
      <div className="font-bold mb-8 text-black text-xl">Dashboard</div>
      <div className="space-y-2 flex-grow">
        <Link href={`/dashboard/${role}`} className="block p-2 bg-black text-white font-bold rounded">Overview</Link>
        <div className="p-2 text-gray-500">Settings</div>
      </div>
      <Link href="/login" className="block text-center text-sm bg-black text-white rounded py-2 hover:bg-gray-800 mt-auto">
        Logout
      </Link>
    </div>
  );
}
