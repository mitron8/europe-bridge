import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type QueryCategory = 
  | 'Admissions' 
  | 'APS Certificate' 
  | 'Visa & Blocked Account' 
  | 'University Shortlist' 
  | 'Documents & Translation' 
  | 'Technical Issue' 
  | 'General Inquiry';

export type QueryPriority = 'low' | 'medium' | 'high' | 'urgent';

export type QueryStatus = 
  | 'open' 
  | 'in_review_counsellor' 
  | 'escalated_to_admin' 
  | 'resolved' 
  | 'closed';

export interface QuerySender {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'counsellor' | 'admin' | 'superadmin' | 'ai';
  avatar?: string;
}

export interface QueryMessage {
  id: string;
  sender: QuerySender;
  content: string;
  timestamp: string;
  isInternalNote?: boolean;
}

export interface QueryTimelineEvent {
  id: string;
  action: string;
  performedBy: string;
  role: string;
  timestamp: string;
  details?: string;
}

export interface SupportQuery {
  id: string;
  title: string;
  description: string;
  category: QueryCategory;
  priority: QueryPriority;
  status: QueryStatus;
  raisedBy: QuerySender;
  targetRole: 'counsellor' | 'admin';
  assignedCounsellor?: { id: string; name: string; email?: string } | null;
  assignedAdmin?: { id: string; name: string } | null;
  escalationInfo?: {
    escalatedBy: string;
    escalatedAt: string;
    reason: string;
    adminNotes?: string;
  } | null;
  resolutionInfo?: {
    resolvedBy: string;
    role: string;
    resolvedAt: string;
    summary: string;
  } | null;
  messages: QueryMessage[];
  timeline: QueryTimelineEvent[];
  createdAt: string;
  updatedAt: string;
}

const INITIAL_DEMO_QUERIES: SupportQuery[] = [
  {
    id: 'TICK-101',
    title: 'APS Certificate name spelling mismatch with Class 12 marksheet',
    description: 'My Class 12 CBSE marksheet has my surname as "Sah" but passport is "Sahh". The APS portal in India is showing a verification hold. How should I proceed before my Uni-Assist submission on July 15th?',
    category: 'APS Certificate',
    priority: 'urgent',
    status: 'escalated_to_admin',
    raisedBy: {
      id: 'stu-1',
      name: 'Rohan Sharma',
      email: 'rohan.sharma@example.com',
      role: 'student',
    },
    targetRole: 'counsellor',
    assignedCounsellor: {
      id: 'coun-1',
      name: 'Priya Mehra',
      email: 'priya.mehra@europebridge.de'
    },
    assignedAdmin: {
      id: 'adm-1',
      name: 'Vikram Singh (Senior Operations Admin)'
    },
    escalationInfo: {
      escalatedBy: 'Priya Mehra (Counsellor)',
      escalatedAt: '2026-09-17 14:30',
      reason: 'Name mismatch requires official notarized affidavit template and backend document override for APS India special clearance.',
      adminNotes: 'Assigned to Admin Vikram for expediting with New Delhi APS Liaison desk.'
    },
    messages: [
      {
        id: 'msg-1',
        sender: {
          id: 'stu-1',
          name: 'Rohan Sharma',
          email: 'rohan.sharma@example.com',
          role: 'student',
        },
        content: 'Hello Ma\'am, while submitting my documents for APS India, I realized my 12th board has "Sah" whereas passport has "Sahh". Will Uni-Assist reject my winter application?',
        timestamp: '2026-09-17 10:15',
      },
      {
        id: 'msg-2',
        sender: {
          id: 'coun-1',
          name: 'Priya Mehra',
          email: 'priya.mehra@europebridge.de',
          role: 'counsellor',
        },
        content: 'Hi Rohan! Don\'t worry, this is a known edge-case. You will need a standard Annexure 1 Name Correction Affidavit. Because Uni-Assist deadline is in 3 weeks, I am escalating this ticket to our Head Office Admin team to issue an urgent verification endorsement.',
        timestamp: '2026-09-17 14:28',
      },
      {
        id: 'msg-3',
        sender: {
          id: 'adm-1',
          name: 'Vikram Singh',
          email: 'vikram.admin@europebridge.de',
          role: 'admin',
        },
        content: 'Admin review in progress. We have contacted our APS liaison in New Delhi. Please download the standard format affidavit from our Document Hub and upload the notarized copy here.',
        timestamp: '2026-09-17 16:45',
        isInternalNote: false,
      }
    ],
    timeline: [
      {
        id: 'tl-1',
        action: 'Query Created',
        performedBy: 'Rohan Sharma',
        role: 'Student',
        timestamp: '2026-09-17 10:15',
        details: 'Submitted question to Counsellor Priya Mehra'
      },
      {
        id: 'tl-2',
        action: 'Under Counsellor Review',
        performedBy: 'Priya Mehra',
        role: 'Counsellor',
        timestamp: '2026-09-17 14:28',
        details: 'Guidance provided and initial review completed'
      },
      {
        id: 'tl-3',
        action: 'Escalated to Admin',
        performedBy: 'Priya Mehra',
        role: 'Counsellor',
        timestamp: '2026-09-17 14:30',
        details: 'Escalated for official affidavit clearance and embassy coordination'
      }
    ],
    createdAt: '2026-09-17 10:15',
    updatedAt: '2026-09-17 16:45',
  },
  {
    id: 'TICK-102',
    title: 'Blocked Account requirement and provider comparison (Expatrio vs Fintiba)',
    description: 'I need guidance on the exact amount required for 2026-2027 German Student Visa blocked account. Also, which provider offers faster disbursement upon arrival in Germany?',
    category: 'Visa & Blocked Account',
    priority: 'medium',
    status: 'in_review_counsellor',
    raisedBy: {
      id: 'stu-2',
      name: 'Ananya Verma',
      email: 'ananya.verma@example.com',
      role: 'student',
    },
    targetRole: 'counsellor',
    assignedCounsellor: {
      id: 'coun-1',
      name: 'Priya Mehra',
      email: 'priya.mehra@europebridge.de'
    },
    messages: [
      {
        id: 'msg-102-1',
        sender: {
          id: 'stu-2',
          name: 'Ananya Verma',
          email: 'ananya.verma@example.com',
          role: 'student',
        },
        content: 'Hi! Could you please guide me on whether I should open Expatrio Value Package or Fintiba Plus? Is the monthly amount €934 or €992 for the upcoming winter session?',
        timestamp: '2026-09-17 11:40',
      },
      {
        id: 'msg-102-2',
        sender: {
          id: 'coun-1',
          name: 'Priya Mehra',
          email: 'priya.mehra@europebridge.de',
          role: 'counsellor',
        },
        content: 'Hello Ananya! The German Federal Foreign Office has mandated €992/month (€11,904/year) for 2026. Expatrio is currently providing our students a 10% fee waiver and includes free TK Health Insurance with incoming travel cover. I will share the EuropeBridge referral link today.',
        timestamp: '2026-09-17 12:15',
      }
    ],
    timeline: [
      {
        id: 'tl-102-1',
        action: 'Query Created',
        performedBy: 'Ananya Verma',
        role: 'Student',
        timestamp: '2026-09-17 11:40',
        details: 'Sent question to assigned counsellor'
      },
      {
        id: 'tl-102-2',
        action: 'Counsellor Replied',
        performedBy: 'Priya Mehra',
        role: 'Counsellor',
        timestamp: '2026-09-17 12:15',
        details: 'Guidance and package recommendation provided'
      }
    ],
    createdAt: '2026-09-17 11:40',
    updatedAt: '2026-09-17 12:15',
  },
  {
    id: 'TICK-103',
    title: 'TU Munich Winter 2026 intake quota for M.Sc. Informatics',
    description: 'Direct inquiry to Administration: Does TUM require GRE for Indian bachelor graduates with a CGPA above 8.5/10, or does the German Grade converter override it? Several students are seeking confirmation.',
    category: 'University Shortlist',
    priority: 'high',
    status: 'open',
    raisedBy: {
      id: 'coun-1',
      name: 'Priya Mehra',
      email: 'priya.mehra@europebridge.de',
      role: 'counsellor',
    },
    targetRole: 'admin',
    assignedAdmin: {
      id: 'adm-1',
      name: 'Platform Operations Admin'
    },
    messages: [
      {
        id: 'msg-103-1',
        sender: {
          id: 'coun-1',
          name: 'Priya Mehra',
          email: 'priya.mehra@europebridge.de',
          role: 'counsellor',
        },
        content: 'Dear Admin team, TUM recently updated their aptitude assessment criteria for Informatics. Can you confirm if our institutional partner agreement waives the Gate/GRE score for Tier-1 Indian university graduates?',
        timestamp: '2026-09-17 15:10',
      }
    ],
    timeline: [
      {
        id: 'tl-103-1',
        action: 'Query Raised to Admin',
        performedBy: 'Priya Mehra',
        role: 'Counsellor',
        timestamp: '2026-09-17 15:10',
        details: 'Counsellor submitted direct inquiry to Admin'
      }
    ],
    createdAt: '2026-09-17 15:10',
    updatedAt: '2026-09-17 15:10',
  },
  {
    id: 'TICK-104',
    title: 'Certified English translation format for Mumbai University Degree',
    description: 'Clarification needed on whether Mumbai University official transcript requires Apostille stamp before submitting for German Public University preliminary documentation (VPD).',
    category: 'Documents & Translation',
    priority: 'medium',
    status: 'resolved',
    raisedBy: {
      id: 'stu-3',
      name: 'Aditya Kulkarni',
      email: 'aditya.kulkarni@example.com',
      role: 'student',
    },
    targetRole: 'counsellor',
    assignedCounsellor: {
      id: 'coun-2',
      name: 'Kunal Deshmukh',
      email: 'kunal.d@europebridge.de'
    },
    resolutionInfo: {
      resolvedBy: 'Kunal Deshmukh',
      role: 'Counsellor',
      resolvedAt: '2026-09-16 18:20',
      summary: 'Provided official MEA Apostille checklist. Mumbai University transcripts issued in English do not require German translation, only MEA Apostille and color notarization.'
    },
    messages: [
      {
        id: 'msg-104-1',
        sender: {
          id: 'stu-3',
          name: 'Aditya Kulkarni',
          email: 'aditya.kulkarni@example.com',
          role: 'student',
        },
        content: 'Do I need sworn German translation for my engineering transcript if it is already printed in English by Mumbai University?',
        timestamp: '2026-09-16 14:10',
      },
      {
        id: 'msg-104-2',
        sender: {
          id: 'coun-2',
          name: 'Kunal Deshmukh',
          email: 'kunal.d@europebridge.de',
          role: 'counsellor',
        },
        content: 'No translation needed! If the original university marksheet is in English, German universities accept it directly. Just ensure you get a 1st class gazetted officer notary or MEA Apostille on the color copy.',
        timestamp: '2026-09-16 18:15',
      }
    ],
    timeline: [
      {
        id: 'tl-104-1',
        action: 'Query Created',
        performedBy: 'Aditya Kulkarni',
        role: 'Student',
        timestamp: '2026-09-16 14:10',
        details: 'Question dropped to Counsellor Kunal'
      },
      {
        id: 'tl-104-2',
        action: 'Resolution Provided',
        performedBy: 'Kunal Deshmukh',
        role: 'Counsellor',
        timestamp: '2026-09-16 18:20',
        details: 'Confirmed English transcript guidelines and closed ticket'
      }
    ],
    createdAt: '2026-09-16 14:10',
    updatedAt: '2026-09-16 18:20',
  }
];

interface HelpStore {
  queries: SupportQuery[];
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  
  // Actions
  createStudentQuery: (data: {
    title: string;
    description: string;
    category: QueryCategory;
    priority: QueryPriority;
    studentName?: string;
    studentEmail?: string;
  }) => SupportQuery;

  createCounsellorQuery: (data: {
    title: string;
    description: string;
    category: QueryCategory;
    priority: QueryPriority;
    counsellorName?: string;
    counsellorEmail?: string;
  }) => SupportQuery;

  addMessageToQuery: (
    queryId: string, 
    content: string, 
    sender: QuerySender, 
    isInternalNote?: boolean
  ) => void;

  escalateToAdmin: (
    queryId: string, 
    counsellorName: string, 
    reason: string, 
    adminNotes?: string
  ) => void;

  resolveQuery: (
    queryId: string, 
    resolvedBy: string, 
    role: string, 
    summary: string
  ) => void;

  updateQueryStatus: (
    queryId: string, 
    status: QueryStatus, 
    performedBy: string, 
    role: string
  ) => void;

  resetDemoData: () => void;
}

export const useHelpStore = create<HelpStore>()(
  persist(
    (set, get) => ({
      queries: INITIAL_DEMO_QUERIES,
      activeFilter: 'all',
      setActiveFilter: (filter) => set({ activeFilter: filter }),

      createStudentQuery: (data) => {
        const now = new Date();
        const dateStr = now.toISOString().replace('T', ' ').slice(0, 16);
        const newId = `TICK-${Math.floor(1000 + Math.random() * 9000)}`;

        const newQuery: SupportQuery = {
          id: newId,
          title: data.title,
          description: data.description,
          category: data.category,
          priority: data.priority,
          status: 'open',
          raisedBy: {
            id: `stu-${Date.now()}`,
            name: data.studentName || 'Student (You)',
            email: data.studentEmail || 'student@europebridge.de',
            role: 'student',
          },
          targetRole: 'counsellor',
          assignedCounsellor: {
            id: 'coun-1',
            name: 'Priya Mehra',
            email: 'priya.mehra@europebridge.de'
          },
          messages: [
            {
              id: `msg-${Date.now()}`,
              sender: {
                id: `stu-${Date.now()}`,
                name: data.studentName || 'Student (You)',
                email: data.studentEmail || 'student@europebridge.de',
                role: 'student',
              },
              content: data.description,
              timestamp: dateStr,
            }
          ],
          timeline: [
            {
              id: `tl-${Date.now()}`,
              action: 'Query Created',
              performedBy: data.studentName || 'Student',
              role: 'Student',
              timestamp: dateStr,
              details: 'Ticket dropped to Counsellor Priya Mehra'
            }
          ],
          createdAt: dateStr,
          updatedAt: dateStr,
        };

        set((state) => ({
          queries: [newQuery, ...state.queries],
        }));

        return newQuery;
      },

      createCounsellorQuery: (data) => {
        const now = new Date();
        const dateStr = now.toISOString().replace('T', ' ').slice(0, 16);
        const newId = `TICK-${Math.floor(1000 + Math.random() * 9000)}`;

        const newQuery: SupportQuery = {
          id: newId,
          title: data.title,
          description: data.description,
          category: data.category,
          priority: data.priority,
          status: 'open',
          raisedBy: {
            id: `coun-${Date.now()}`,
            name: data.counsellorName || 'Priya Mehra (Counsellor)',
            email: data.counsellorEmail || 'priya.mehra@europebridge.de',
            role: 'counsellor',
          },
          targetRole: 'admin',
          assignedAdmin: {
            id: 'adm-ops',
            name: 'Platform Operations Admin'
          },
          messages: [
            {
              id: `msg-${Date.now()}`,
              sender: {
                id: `coun-${Date.now()}`,
                name: data.counsellorName || 'Priya Mehra',
                email: data.counsellorEmail || 'priya.mehra@europebridge.de',
                role: 'counsellor',
              },
              content: data.description,
              timestamp: dateStr,
            }
          ],
          timeline: [
            {
              id: `tl-${Date.now()}`,
              action: 'Direct Inquiry Submitted to Admin',
              performedBy: data.counsellorName || 'Counsellor Priya Mehra',
              role: 'Counsellor',
              timestamp: dateStr,
              details: 'Direct Counsellor -> Admin query raised'
            }
          ],
          createdAt: dateStr,
          updatedAt: dateStr,
        };

        set((state) => ({
          queries: [newQuery, ...state.queries],
        }));

        return newQuery;
      },

      addMessageToQuery: (queryId, content, sender, isInternalNote = false) => {
        const now = new Date();
        const dateStr = now.toISOString().replace('T', ' ').slice(0, 16);

        set((state) => ({
          queries: state.queries.map((q) => {
            if (q.id !== queryId) return q;

            const newMessage: QueryMessage = {
              id: `msg-${Date.now()}`,
              sender,
              content,
              timestamp: dateStr,
              isInternalNote,
            };

            // If counsellor or admin replies, update status to in_review if it was open
            let newStatus = q.status;
            if (q.status === 'open' && (sender.role === 'counsellor' || sender.role === 'admin')) {
              newStatus = 'in_review_counsellor';
            }

            return {
              ...q,
              status: newStatus,
              updatedAt: dateStr,
              messages: [...q.messages, newMessage],
              timeline: [
                ...q.timeline,
                {
                  id: `tl-${Date.now()}`,
                  action: isInternalNote ? 'Internal Admin Note Added' : `Reply from ${sender.name}`,
                  performedBy: sender.name,
                  role: sender.role,
                  timestamp: dateStr,
                  details: isInternalNote ? 'Confidential staff note' : 'Message sent in conversation thread'
                }
              ]
            };
          })
        }));
      },

      escalateToAdmin: (queryId, counsellorName, reason, adminNotes) => {
        const now = new Date();
        const dateStr = now.toISOString().replace('T', ' ').slice(0, 16);

        set((state) => ({
          queries: state.queries.map((q) => {
            if (q.id !== queryId) return q;

            return {
              ...q,
              status: 'escalated_to_admin',
              updatedAt: dateStr,
              targetRole: 'admin',
              assignedAdmin: {
                id: 'adm-ops',
                name: 'Central Admin Team'
              },
              escalationInfo: {
                escalatedBy: counsellorName,
                escalatedAt: dateStr,
                reason,
                adminNotes,
              },
              timeline: [
                ...q.timeline,
                {
                  id: `tl-${Date.now()}`,
                  action: 'Escalated to Admin Level',
                  performedBy: counsellorName,
                  role: 'Counsellor',
                  timestamp: dateStr,
                  details: `Reason: ${reason}`
                }
              ],
              messages: [
                ...q.messages,
                {
                  id: `msg-${Date.now()}`,
                  sender: {
                    id: 'sys',
                    name: 'System Escalation Bot',
                    email: 'support@europebridge.de',
                    role: 'ai',
                  },
                  content: `🚨 Issue escalated to Central Admin by ${counsellorName}.\nEscalation Reason: ${reason}`,
                  timestamp: dateStr,
                  isInternalNote: false,
                }
              ]
            };
          })
        }));
      },

      resolveQuery: (queryId, resolvedBy, role, summary) => {
        const now = new Date();
        const dateStr = now.toISOString().replace('T', ' ').slice(0, 16);

        set((state) => ({
          queries: state.queries.map((q) => {
            if (q.id !== queryId) return q;

            return {
              ...q,
              status: 'resolved',
              updatedAt: dateStr,
              resolutionInfo: {
                resolvedBy,
                role,
                resolvedAt: dateStr,
                summary,
              },
              timeline: [
                ...q.timeline,
                {
                  id: `tl-${Date.now()}`,
                  action: 'Query Marked as Resolved',
                  performedBy: resolvedBy,
                  role,
                  timestamp: dateStr,
                  details: summary
                }
              ],
              messages: [
                ...q.messages,
                {
                  id: `msg-${Date.now()}`,
                  sender: {
                    id: 'sys',
                    name: 'Resolution Desk',
                    email: 'support@europebridge.de',
                    role: 'ai',
                  },
                  content: `✅ Issue marked as Resolved by ${resolvedBy} (${role}).\nResolution Summary: ${summary}`,
                  timestamp: dateStr,
                }
              ]
            };
          })
        }));
      },

      updateQueryStatus: (queryId, status, performedBy, role) => {
        const now = new Date();
        const dateStr = now.toISOString().replace('T', ' ').slice(0, 16);

        set((state) => ({
          queries: state.queries.map((q) => {
            if (q.id !== queryId) return q;

            return {
              ...q,
              status,
              updatedAt: dateStr,
              timeline: [
                ...q.timeline,
                {
                  id: `tl-${Date.now()}`,
                  action: `Status changed to ${status}`,
                  performedBy,
                  role,
                  timestamp: dateStr,
                }
              ]
            };
          })
        }));
      },

      resetDemoData: () => set({ queries: INITIAL_DEMO_QUERIES }),
    }),
    {
      name: 'europebridge_help_store_v1',
    }
  )
);
