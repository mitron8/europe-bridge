import React from 'react';
import { SuperAdminSidebar } from '@/components/SuperAdminSidebar';
import { AuthGuard } from '@/components/AuthGuard';
import DashboardLayoutWrapper from '@/components/DashboardLayoutWrapper';

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard allowedRoles={['superadmin']}>
      <DashboardLayoutWrapper Sidebar={SuperAdminSidebar}>
        {children}
      </DashboardLayoutWrapper>
    </AuthGuard>
  );
}
