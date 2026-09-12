import React from 'react';
import { MarketingSidebar } from '@/components/MarketingSidebar';
import { AuthGuard } from '@/components/AuthGuard';
import DashboardLayoutWrapper from '@/components/DashboardLayoutWrapper';

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard allowedRoles={['marketing']}>
      <DashboardLayoutWrapper Sidebar={MarketingSidebar}>
        {children}
      </DashboardLayoutWrapper>
    </AuthGuard>
  );
}
