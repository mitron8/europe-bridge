export interface CounsellorServiceOrder {
  id: string;
  student_user_id: string;
  student_name: string;
  student_email: string;
  service_type: string;
  plan_tier: string;
  amount_inr: number;
  status: string;
  payment_status?: string;
  target_deadline: string | null;
  student_inputs: Record<string, any>;
  deliverables: Array<{ title: string; url: string }>;
  revisions_used: number;
  max_revisions: number;
  counsellor_notes: string | null;
  created_at: string;
  updated_at?: string;
}

export type TabType = 'unattended' | 'attended' | 'completed' | 'all';
export type SortOption = 'oldest' | 'urgent' | 'newest';
