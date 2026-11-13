export type Counsellor = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  assignedStudentCount: number;
};

export type CounsellorPerformance = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isActive: boolean;
  assignedStudentCount: number;
  totalMeetingsCount: number;
  completedMeetingsCount: number;
  upcomingMeetingsCount: number;
  cancelledMeetingsCount: number;
  totalTicketsCount: number;
  resolvedTicketsCount: number;
  openTicketsCount: number;
};

export type Student = {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string | null;
  counsellorId: string | null;
  counsellorFirstName: string | null;
  counsellorLastName: string | null;
};
