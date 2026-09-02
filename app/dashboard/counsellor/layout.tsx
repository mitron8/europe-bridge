import React from 'react';
import { CounsellorSidebar } from '@/components/CounsellorSidebar';
import { AuthGuard } from '@/components/AuthGuard';
import DashboardLayoutWrapper from '@/components/DashboardLayoutWrapper';

export default function CounsellorLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard allowedRoles={['counsellor']}>
      <DashboardLayoutWrapper Sidebar={CounsellorSidebar}>
        {children}
      </DashboardLayoutWrapper>
    </AuthGuard>
  );
}
