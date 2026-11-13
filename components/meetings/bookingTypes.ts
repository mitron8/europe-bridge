export interface MeetingSlot {
  slotId: string;
  startHour: number;
  endHour: number;
  session: 'morning' | 'afternoon';
  label: string;
  startUtc: string;
  endUtc: string;
  isAvailable: boolean;
  unavailableReason?: string;
}

export interface BookingDay {
  dateString: string;
  displayLabel: string;
  dayName: string;
  isSunday: boolean;
  isToday: boolean;
  morningSlots: MeetingSlot[];
  afternoonSlots: MeetingSlot[];
  allSlots: MeetingSlot[];
}

export interface AvailabilityData {
  counsellor: {
    id: string;
    name: string;
    email: string;
  };
  timezone: string;
  windowDates: {
    dateString: string;
    displayLabel: string;
    dayName: string;
    isSunday: boolean;
    isToday: boolean;
  }[];
  days: BookingDay[];
}

export interface MeetingBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (meeting: any) => void;
  counsellorId?: string;
  counsellorName?: string;
  studentUserId?: string;
  studentName?: string;
  mode?: 'student_book' | 'counsellor_invite' | 'reschedule' | 'counterproposal';
  userRole?: 'student' | 'counsellor';
  existingMeetingId?: string;
  currentMeetingHumanTime?: string;
}
