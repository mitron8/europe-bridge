import { SuperAdminSidebar } from '@/components/SuperAdminSidebar';
import { AuthGuard } from '@/components/AuthGuard';

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard allowedRoles={['super-admin']}>
      <div className="flex h-screen w-full neu-bg overflow-hidden relative">
        <div className="absolute top-10 left-80 w-96 h-96 bg-germany-red/5 rounded-full blur-3xl pointer-events-none z-0"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-germany-gold/10 rounded-full blur-3xl pointer-events-none z-0"></div>

        <SuperAdminSidebar />
        
        <main className="flex-1 overflow-y-auto p-6 md:p-8 lg:p-10 relative z-10 custom-scrollbar">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
