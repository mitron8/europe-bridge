import { create } from 'zustand';
import { getChatSocket } from '@/lib/socket';

export interface ChatNotificationAlert {
  type: 'student_message' | 'counsellor_message' | 'admin_message' | 'escalation_alert' | 'escalated_message';
  title: string;
  preview: string;
  ticketNumber?: string;
  ticketId?: string;
  senderName?: string;
  reason?: string;
  isEscalation?: boolean;
  createdAt: string;
}

interface ChatNotificationState {
  unreadCount: number;
  escalatedCount: number;
  hasEscalations: boolean;
  activeNotification: ChatNotificationAlert | null;
  isInitialized: boolean;
  
  // Actions
  init: () => void;
  setCounts: (counts: { unreadCount: number; escalatedCount?: number; hasEscalations?: boolean }) => void;
  clearNotification: () => void;
  markTicketAsRead: (ticketId: string) => Promise<void>;
  refreshCounts: () => Promise<void>;
}

export const useChatNotificationStore = create<ChatNotificationState>((set, get) => ({
  unreadCount: 0,
  escalatedCount: 0,
  hasEscalations: false,
  activeNotification: null,
  isInitialized: false,

  setCounts: ({ unreadCount, escalatedCount = 0, hasEscalations = false }) => {
    set({
      unreadCount: Math.max(0, unreadCount),
      escalatedCount: Math.max(0, escalatedCount),
      hasEscalations,
    });
  },

  clearNotification: () => {
    set({ activeNotification: null });
  },

  refreshCounts: async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';
      const res = await fetch(`${API_URL}/help/unread-counts`, {
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        set({
          unreadCount: data.unreadCount || 0,
          escalatedCount: data.escalatedCount || 0,
          hasEscalations: Boolean(data.hasEscalations),
        });
      }
    } catch {
      // Quiet fail if network/auth issues
    }
  },

  markTicketAsRead: async (ticketId: string) => {
    try {
      const socket = getChatSocket();
      socket.emit('join_ticket', { ticketId });

      const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';
      await fetch(`${API_URL}/help/queries/${ticketId}/read`, {
        method: 'POST',
        credentials: 'include',
      }).catch(() => {});

      // Optimistic decrement
      set((state) => ({
        unreadCount: Math.max(0, state.unreadCount - 1),
      }));
    } catch {
      // Ignore
    }
  },

  init: () => {
    if (get().isInitialized || typeof window === 'undefined') return;
    set({ isInitialized: true });

    // Fetch initial counts
    get().refreshCounts();

    const socket = getChatSocket();

    // Listen for live unread counts
    socket.on('unread_counts_updated', (counts: any) => {
      if (counts) {
        set({
          unreadCount: counts.unreadCount || 0,
          escalatedCount: counts.escalatedCount || 0,
          hasEscalations: Boolean(counts.hasEscalations),
        });
      }
    });

    // Listen for incoming message notifications
    socket.on('new_notification', (notif: ChatNotificationAlert) => {
      set({ activeNotification: notif });

      // Automatically auto-dismiss toast after 6 seconds
      setTimeout(() => {
        if (get().activeNotification === notif) {
          set({ activeNotification: null });
        }
      }, 6000);
    });

    // Listen for admin escalation updates
    socket.on('admin_escalations_updated', () => {
      get().refreshCounts();
    });

    // Listen for ticket updates across dashboards
    socket.on('ticket_list_updated', () => {
      get().refreshCounts();
    });
  },
}));

