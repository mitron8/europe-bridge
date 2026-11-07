"use client";

import React from 'react';
import AccountSettingsView from '@/components/AccountSettingsView';

export default function SuperAdminAccountPage() {
  return <AccountSettingsView forcedRole="superadmin" />;
}

