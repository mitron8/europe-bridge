import React from 'react';
import { AdminSidebar } from '@/components/AdminSidebar';
import { AuthGuard } from '@/components/AuthGuard';
import DashboardLayoutWrapper from '@/components/DashboardLayoutWrapper';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard allowedRoles={['admin']}>
      <DashboardLayoutWrapper Sidebar={AdminSidebar}>
        {children}
      </DashboardLayoutWrapper>
    </AuthGuard>
  );
}
