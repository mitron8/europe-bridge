import React from 'react';
import { StudentSidebar } from '@/components/StudentSidebar';
import { AuthGuard } from '@/components/AuthGuard';
import DashboardLayoutWrapper from '@/components/DashboardLayoutWrapper';
import ProfileCompletionModal from '@/components/ProfileCompletionModal';

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard allowedRoles={['student']}>
      <DashboardLayoutWrapper Sidebar={StudentSidebar}>
        {children}
        <ProfileCompletionModal />
      </DashboardLayoutWrapper>
    </AuthGuard>
  );
}

