"use client";

import React from 'react';
import AccountSettingsView from '@/components/AccountSettingsView';

export default function AdminAccountPage() {
  return <AccountSettingsView forcedRole="admin" />;
}

