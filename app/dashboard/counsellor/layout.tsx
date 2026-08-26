import { CounsellorSidebar } from '@/components/CounsellorSidebar';

export default function CounsellorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-white">
      <CounsellorSidebar />
      <main className="flex-1 overflow-y-auto p-8 text-black">
        {children}
      </main>
    </div>
  );
}
