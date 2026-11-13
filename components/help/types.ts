export const ESCALATION_REASONS = [
  'APS Certificate & Name Mismatch clearance with liaison',
  'University eligibility waiver / special partnership case',
  'Urgent Embassy Visa slot escalation',
  'Fee waiver or blocked account funding exception',
  'Technical portal bug / profile verification hold',
  'Official Institutional verification letter needed from Admin',
  'Other Administrative Intervention Required'
];

export interface AdminTicketSummary {
  id: string;
  ticketNumber: string;
  title: string;
  category: string;
  priority: string;
  status: string;
  escalatedTo: string | null;
  escalationReason: string | null;
  escalatedAt: string | null;
  resolvedAt: string | null;
  resolutionSummary: string | null;
  student: {
    id: string;
    name: string;
    email: string;
  };
  counsellor: {
    id: string;
    name: string;
    email: string;
  } | null;
  totalMessages: number;
  internalNotesCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface MessageItem {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  isInternalNote: boolean;
  content: string;
  isMe: boolean;
  createdAt: string;
}

export interface AdminTicketDetails extends AdminTicketSummary {
  isEscalated: boolean;
  canChat: boolean;
  isTextable: boolean;
  messages: MessageItem[];
}
