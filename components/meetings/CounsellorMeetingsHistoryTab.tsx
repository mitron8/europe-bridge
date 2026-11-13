"use client";

import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface CounsellorMeetingsHistoryTabProps {
  meetingsData: any;
}

export function CounsellorMeetingsHistoryTab({
  meetingsData,
}: CounsellorMeetingsHistoryTabProps) {
  return (
    <div className="space-y-4">
      <div className="p-4 bg-white dark:bg-[#111622] rounded-2xl border border-gray-200/80 dark:border-gray-800 flex items-center justify-between">
        <div>
          <h4 className="font-display font-extrabold text-sm text-germany-black dark:text-white">
            Counselling Activity Logs & Historical Audit
          </h4>
          <p className="text-xs text-gray-500">
            Chronological record of bookings, reschedule proposals, acceptances, and deletions for your consultations.
          </p>
        </div>
        <span className="text-xs font-black text-gray-400 uppercase">
          {meetingsData?.logs?.length || 0} Events Logged
        </span>
      </div>

      {(!meetingsData?.logs || meetingsData.logs.length === 0) ? (
        <div className="p-12 bg-white dark:bg-[#111622] rounded-2xl border border-gray-200/80 dark:border-gray-800 text-center space-y-2">
          <CheckCircle2 className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto" />
          <h4 className="font-display font-extrabold text-sm text-germany-black dark:text-white">
            No Activity Logs Yet
          </h4>
          <p className="text-xs text-gray-500">Meeting actions, rescheduling events, and cancellations will appear here.</p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {meetingsData.logs.map((log: any) => {
            const isDeclineOrDelete = log.event_type.includes('DECLINED') || log.event_type.includes('DELETED') || log.event_type === 'CANCELLED';
            const isReschedule = log.event_type.includes('RESCHEDULE');
            const isAccepted = log.event_type.includes('ACCEPTED') || log.event_type === 'BOOKED';

            return (
              <div
                key={log.id}
                className="p-4 bg-white dark:bg-[#111622] rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${
                      isDeclineOrDelete
                        ? 'bg-red-100 text-red-800 border-red-300 dark:bg-red-950/60 dark:text-red-300'
                        : isAccepted
                        ? 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300'
                        : isReschedule
                        ? 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300'
                        : 'bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-800 dark:text-gray-300'
                    }`}>
                      {log.event_type.replace(/_/g, ' ')}
                    </span>
                    <span className="font-extrabold text-germany-black dark:text-white">
                      Student: {log.studentName}
                    </span>
                    {log.studentEmail && (
                      <span className="text-[11px] text-gray-400">({log.studentEmail})</span>
                    )}
                  </div>

                  <div className="text-[11px] text-gray-600 dark:text-gray-300">
                    {log.details?.reason && (
                      <span className="italic font-medium">Reason: &ldquo;{log.details.reason}&rdquo; • </span>
                    )}
                    {log.details?.message && (
                      <span className="font-medium">{log.details.message} • </span>
                    )}
                    <span className="text-gray-400">
                      Triggered by: <strong>{log.actorName}</strong> ({log.actor_role})
                    </span>
                  </div>
                </div>

                <div className="text-[11px] font-bold text-gray-400 shrink-0">
                  {log.humanCreatedAt}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
