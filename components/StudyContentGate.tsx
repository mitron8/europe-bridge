"use client";

import React from 'react';

interface StudyContentGateProps {
  children: React.ReactNode;
  guideTitle?: string;
}

export function StudyContentGate({ children }: StudyContentGateProps) {
  // All study guides and pages are completely open and unrestricted with no login required
  return <>{children}</>;
}

export default StudyContentGate;
