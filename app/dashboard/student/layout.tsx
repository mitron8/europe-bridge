import { StudentSidebar } from '@/components/StudentSidebar';
import { AuthGuard } from '@/components/AuthGuard';

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard allowedRoles={['student']}>
      <div className="flex h-screen bg-white">
        <StudentSidebar />
        <main className="flex-1 overflow-y-auto p-8 text-black">
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}
