"use client";

import React from 'react';
import AccountSettingsView from '@/components/AccountSettingsView';

export default function StudentAccountPage() {
  return <AccountSettingsView forcedRole="student" />;
}

