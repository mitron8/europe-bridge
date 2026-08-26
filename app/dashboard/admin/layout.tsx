import { AdminSidebar } from '@/components/AdminSidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-white">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto p-8 text-black">
        {children}
      </main>
    </div>
  );
}
