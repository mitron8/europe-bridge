import { SuperAdminSidebar } from '@/components/SuperAdminSidebar';

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-white">
      <SuperAdminSidebar />
      <main className="flex-1 overflow-y-auto p-8 text-black">
        {children}
      </main>
    </div>
  );
}
