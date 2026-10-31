"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Layers,
  Clock,
  CheckCircle2,
  Download,
  MessageSquare,
  FileText,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  RefreshCw,
} from 'lucide-react';

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || '/api/backend';

interface ServiceOrder {
  id: string;
  service_type: string;
  plan_tier: string;
  amount_inr: number;
  status: string;
  payment_status?: string;
  target_deadline: string | null;
  student_inputs: Record<string, any>;
  deliverables: Array<{ title: string; url: string; fileType?: string }>;
  revisions_used: number;
  max_revisions: number;
  counsellor_notes: string | null;
  counsellor_name: string | null;
  counsellor_email: string | null;
  created_at: string;
  updated_at: string;
}

export function StudentServicesHub() {
  const [orders, setOrders] = useState<ServiceOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Revision modal state
  const [selectedOrderForRevision, setSelectedOrderForRevision] = useState<ServiceOrder | null>(null);
  const [revisionComments, setRevisionComments] = useState('');
  const [isSubmittingRevision, setIsSubmittingRevision] = useState(false);

  const fetchOrders = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/service-orders/my-orders`, {
        credentials: 'include',
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      } else {
        setError('Unable to load your purchased services.');
      }
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleSendRevision = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrderForRevision || !revisionComments.trim()) return;

    setIsSubmittingRevision(true);
    try {
      const res = await fetch(
        `${NEXT_PUBLIC_API_URL}/service-orders/student/${selectedOrderForRevision.id}/revision`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ comments: revisionComments.trim() }),
        },
      );

      if (res.ok) {
        setSelectedOrderForRevision(null);
        setRevisionComments('');
        await fetchOrders();
      } else {
        const errJson = await res.json().catch(() => ({}));
        alert(errJson.message || 'Failed to submit revision request');
      }
    } catch {
      alert('Network error submitting revision');
    } finally {
      setIsSubmittingRevision(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'BOOKED':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#faf8f3] dark:bg-[#151B27] text-[#16161a] dark:text-gray-200 border border-[#e5e0d3] dark:border-gray-800 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#c9a35b]" />
            <span>Service Booked (In Queue)</span>
          </span>
        );
      case 'PAID':
      case 'ASSIGNED':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#faf8f3] dark:bg-[#151B27] text-[#16161a] dark:text-gray-200 border border-[#e5e0d3] dark:border-gray-800 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#c9a35b]" />
            <span>Assigned to Counselor</span>
          </span>
        );
      case 'IN_PROGRESS':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#faf8f3] dark:bg-[#151B27] text-[#16161a] dark:text-gray-200 border border-[#e5e0d3] dark:border-gray-800 flex items-center gap-1.5">
            <RefreshCw className="w-3.5 h-3.5 text-[#16161a] dark:text-gray-200 animate-spin" />
            <span>Drafting in Progress</span>
          </span>
        );
      case 'DRAFT_READY':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#16161a] dark:bg-emerald-950/40 text-white dark:text-emerald-300 border border-transparent dark:border-emerald-800/50 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#c9a35b]" />
            <span>Draft Ready for Review</span>
          </span>
        );
      case 'REVISION_REQUESTED':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#ece7dd] dark:bg-amber-950/40 text-[#16161a] dark:text-amber-300 border border-[#dcd7cb] dark:border-amber-800/50 flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-[#16161a] dark:text-amber-300" />
            <span>Revision in Queue</span>
          </span>
        );
      case 'COMPLETED':
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#16161a] dark:bg-white/10 text-white border border-transparent dark:border-white/10 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
            <span>Completed</span>
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-transparent dark:border-gray-700">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 bg-white dark:bg-[#111622] rounded-2xl border border-[#e5e0d3] dark:border-gray-800 space-y-1">
          <span className="text-xs font-bold text-[#5e5b54] dark:text-gray-400 uppercase tracking-wider">
            Total Services Purchased
          </span>
          <div className="text-3xl font-black text-[#16161a] dark:text-white font-display">
            {orders.length}
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-[#111622] rounded-2xl border border-[#e5e0d3] dark:border-gray-800 space-y-1">
          <span className="text-xs font-bold text-[#5e5b54] dark:text-gray-400 uppercase tracking-wider">
            Active in Progress
          </span>
          <div className="text-3xl font-black text-[#16161a] dark:text-white font-display">
            {orders.filter((o) => o.status !== 'COMPLETED').length}
          </div>
        </div>

        <div className="p-6 bg-white dark:bg-[#111622] rounded-2xl border border-[#e5e0d3] dark:border-gray-800 space-y-1">
          <span className="text-xs font-bold text-[#5e5b54] dark:text-gray-400 uppercase tracking-wider">
            Delivered Documents
          </span>
          <div className="text-3xl font-black text-[#16161a] dark:text-white font-display">
            {orders.filter((o) => o.deliverables && o.deliverables.length > 0).length}
          </div>
        </div>
      </div>

      {/* Main Content */}
      {isLoading ? (
        <div className="p-12 text-center bg-white dark:bg-[#111622] rounded-2xl border border-[#e5e0d3] dark:border-gray-800 space-y-3">
          <RefreshCw className="w-6 h-6 animate-spin mx-auto text-[#16161a] dark:text-white" />
          <p className="text-sm font-medium text-[#5e5b54] dark:text-gray-400">Loading your service orders...</p>
        </div>
      ) : error ? (
        <div className="p-8 text-center bg-white dark:bg-[#111622] rounded-2xl border border-red-200 dark:border-red-800/50 text-red-600 dark:text-red-400 space-y-2">
          <AlertCircle className="w-6 h-6 mx-auto" />
          <p className="text-sm font-bold">{error}</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-[#111622] rounded-2xl border border-[#e5e0d3] dark:border-gray-800 space-y-5">
          <div className="w-16 h-16 rounded-3xl bg-[#faf8f3] dark:bg-[#151B27] border border-[#e5e0d3] dark:border-gray-800 flex items-center justify-center mx-auto text-[#16161a] dark:text-white">
            <Layers className="w-8 h-8" />
          </div>
          <div className="max-w-md mx-auto space-y-2">
            <h3 className="text-xl font-bold text-[#16161a] dark:text-white">No Services Purchased Yet</h3>
            <p className="text-xs text-[#5e5b54] dark:text-gray-400 leading-relaxed">
              Accelerate your German university applications with expert SOP editing, German Europass CV drafting, LOR writing, and visa assistance.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <Link
              href="/services/sop-writing#booking"
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#16161a] text-white hover:bg-black dark:bg-white dark:text-[#16161a] dark:hover:bg-gray-100 transition-colors shadow-xs"
            >
              Order SOP Writing
            </Link>
            <Link
              href="/services/cv-preparation#booking"
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#faf8f3] dark:bg-[#151B27] text-[#16161a] dark:text-white border border-[#e5e0d3] dark:border-gray-800 hover:bg-[#f4f1ea] dark:hover:bg-[#1A2130] transition-colors"
            >
              Order German CV
            </Link>
            <Link
              href="/services/document-preparation-bundle#booking"
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#faf8f3] dark:bg-[#151B27] text-[#16161a] dark:text-white border border-[#e5e0d3] dark:border-gray-800 hover:bg-[#f4f1ea] dark:hover:bg-[#1A2130] transition-colors"
            >
              Complete 4-Doc Bundle
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <h3 className="text-lg font-black text-[#16161a] dark:text-white">Active &amp; Past Orders</h3>
          <div className="space-y-4">
            {orders.map((order) => {
              const deliverables = order.deliverables || [];
              const canRequestRevision =
                order.status === 'DRAFT_READY' && order.revisions_used < order.max_revisions;

              return (
                <div
                  key={order.id}
                  className="p-6 bg-white dark:bg-[#111622] rounded-2xl border border-[#e5e0d3] dark:border-gray-800 shadow-sm space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e5e0d3] dark:border-gray-800 pb-5">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-base font-extrabold text-[#16161a] dark:text-white">
                          {order.service_type.replace(/_/g, ' ')}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-[#ece7dd] dark:bg-[#1A2130] text-[#16161a] dark:text-gray-200 border border-[#dcd7cb] dark:border-gray-700">
                          {order.plan_tier}
                        </span>
                      </div>
                      <p className="text-xs text-[#5e5b54] dark:text-gray-400 font-medium">
                        Order #{order.id.slice(0, 8)} • Placed on {new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>

                    <div className="flex flex-col sm:items-end gap-1.5">
                      <div className="flex items-center gap-3">
                        {getStatusBadge(order.status)}
                        <span className="text-base font-black text-[#16161a] dark:text-white font-display">
                          ₹{Number(order.amount_inr).toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div className="text-[11px] font-bold">
                        {order.payment_status === 'PAID' ? (
                          <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Paid &amp; Verified
                          </span>
                        ) : (
                          <span className="text-[#c9a35b] dark:text-[#e0bb6b] flex items-center gap-1">
                            <Clock className="w-3 h-3" /> Payment on Milestone / Delivery
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Counselor & Target Delivery Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-3.5 bg-[#faf8f3] dark:bg-[#151B27] rounded-xl border border-[#e5e0d3] dark:border-gray-800 space-y-1">
                      <span className="font-bold text-[#5e5b54] dark:text-gray-400 block">Assigned Advisor:</span>
                      <p className="font-extrabold text-[#16161a] dark:text-white">
                        {order.counsellor_name ? `${order.counsellor_name} (${order.counsellor_email})` : 'Senior EuropeBridge Admissions Team'}
                      </p>
                    </div>

                    <div className="p-3.5 bg-[#faf8f3] dark:bg-[#151B27] rounded-xl border border-[#e5e0d3] dark:border-gray-800 space-y-1">
                      <span className="font-bold text-[#5e5b54] dark:text-gray-400 block">Target Delivery:</span>
                      <p className="font-extrabold text-[#16161a] dark:text-white flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#16161a] dark:text-gray-300" />
                        {order.target_deadline
                          ? new Date(order.target_deadline).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                          : 'Within guaranteed turnaround'}
                      </p>
                    </div>
                  </div>

                  {/* Deliverables Section */}
                  {deliverables.length > 0 && (
                    <div className="p-4 bg-[#faf8f3] dark:bg-[#151B27] rounded-xl border border-[#e5e0d3] dark:border-gray-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black uppercase tracking-wider text-[#16161a] dark:text-white flex items-center gap-1.5">
                          <FileText className="w-4 h-4 text-[#16161a] dark:text-gray-300" />
                          <span>Delivered Drafts &amp; Files</span>
                        </span>
                        <span className="text-[11px] font-bold text-[#5e5b54] dark:text-gray-400">
                          {deliverables.length} file{deliverables.length > 1 ? 's' : ''} available
                        </span>
                      </div>

                      <div className="space-y-2">
                        {deliverables.map((file, idx) => (
                          <div
                            key={idx}
                            className="p-3 bg-white dark:bg-[#0E121A] rounded-lg border border-[#e5e0d3] dark:border-gray-800 flex items-center justify-between text-xs"
                          >
                            <span className="font-bold text-[#16161a] dark:text-white truncate max-w-xs sm:max-w-md">
                              {file.title || `Deliverable ${idx + 1}`}
                            </span>
                            <a
                              href={file.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1 rounded-md bg-[#16161a] text-white hover:bg-black dark:bg-white dark:text-[#16161a] dark:hover:bg-gray-100 text-[11px] font-bold transition-colors flex items-center gap-1 shadow-xs"
                            >
                              <Download className="w-3 h-3" />
                              <span>Download</span>
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions & Revisions */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <span className="text-xs font-medium text-[#5e5b54] dark:text-gray-400">
                      Revisions: <strong className="text-[#16161a] dark:text-white">{order.revisions_used}</strong> / {order.max_revisions} rounds used
                    </span>

                    {canRequestRevision && (
                      <button
                        onClick={() => setSelectedOrderForRevision(order)}
                        className="px-4 py-2 rounded-xl text-xs font-bold bg-[#faf8f3] dark:bg-[#151B27] text-[#16161a] dark:text-white border border-[#dcd7cb] dark:border-gray-700 hover:bg-[#f4f1ea] dark:hover:bg-[#1A2130] transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Request Free Revision</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Revision Modal */}
      {selectedOrderForRevision && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="p-6 bg-white dark:bg-[#111622] rounded-3xl border border-[#e5e0d3] dark:border-gray-800 max-w-lg w-full space-y-5 shadow-2xl">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-[#16161a] dark:text-white font-display">Request Draft Revision</h3>
              <p className="text-xs text-[#5e5b54] dark:text-gray-400">
                Please provide detailed feedback on changes, corrections, or additional points you would like included.
              </p>
            </div>

            <form onSubmit={handleSendRevision} className="space-y-4">
              <textarea
                rows={5}
                required
                value={revisionComments}
                onChange={(e) => setRevisionComments(e.target.value)}
                placeholder="Example: Please emphasize my semester 6 robotics project more in paragraph 3, and mention that I hold German A2 certification..."
                className="w-full p-4 rounded-xl border border-[#dcd7cb] dark:border-gray-700 bg-white dark:bg-[#0A0D14] text-xs font-medium text-[#16161a] dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-hidden focus:ring-1 focus:ring-germany-red"
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedOrderForRevision(null)}
                  className="px-4 py-2 text-xs font-bold text-[#5e5b54] dark:text-gray-400 hover:text-[#16161a] dark:hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingRevision || !revisionComments.trim()}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#16161a] text-white hover:bg-black dark:bg-white dark:text-[#16161a] dark:hover:bg-gray-100 transition-colors disabled:opacity-50 cursor-pointer shadow-xs"
                >
                  {isSubmittingRevision ? 'Sending...' : 'Submit Revision'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
