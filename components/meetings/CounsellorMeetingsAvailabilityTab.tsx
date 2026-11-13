"use client";

import React from 'react';
import { Plus } from 'lucide-react';

interface CounsellorMeetingsAvailabilityTabProps {
  availability: any;
  onOpenBlockModal: () => void;
}

export function CounsellorMeetingsAvailabilityTab({
  availability,
  onOpenBlockModal,
}: CounsellorMeetingsAvailabilityTabProps) {
  return (
    <div className="space-y-6">
      <div className="p-5 bg-white dark:bg-[#111622] rounded-2xl border border-gray-200/80 dark:border-gray-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display font-extrabold text-base text-germany-black dark:text-white">
              Rolling 3-Day Window Slots (Live Preview)
            </h3>
            <p className="text-xs text-gray-500">
              <strong className="text-emerald-600">Green = Confirmed</strong> • <strong className="text-amber-600">Yellow = Pending Acceptance</strong> • White = Available.
            </p>
          </div>
          <button
            onClick={onOpenBlockModal}
            className="neu-btn-primary px-3.5 py-2 text-xs font-black inline-flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Availability Block</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {availability?.days?.map((day: any) => (
            <div
              key={day.dateString}
              className="p-4 rounded-2xl border border-gray-200/80 dark:border-gray-800 bg-gray-50/50 dark:bg-[#0E121A] space-y-3"
            >
              <div className="flex items-center justify-between border-b border-gray-200/80 dark:border-gray-800 pb-2">
                <span className="font-display font-extrabold text-xs text-germany-black dark:text-white">
                  {day.displayLabel}
                </span>
                {day.isSunday ? (
                  <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-gray-200 text-gray-600">
                    Sunday Closed
                  </span>
                ) : (
                  <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Bookable
                  </span>
                )}
              </div>

              <div className="space-y-1.5">
                {day.allSlots?.map((slot: any) => {
                  const isConfirmed = slot.meetingStatus === 'CONFIRMED';
                  const isPending = slot.meetingStatus === 'PENDING';

                  return (
                    <div
                      key={slot.slotId}
                      className={`p-2.5 rounded-xl border text-xs flex items-center justify-between transition-all ${
                        isConfirmed
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-400 dark:border-emerald-600 text-emerald-950 dark:text-emerald-200 shadow-xs'
                          : isPending
                          ? 'bg-amber-50 dark:bg-amber-950/60 border-amber-400 dark:border-amber-600 text-amber-950 dark:text-amber-200 shadow-xs'
                          : slot.isAvailable
                          ? 'bg-white dark:bg-[#111622] border-emerald-300 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400'
                          : 'bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/5 text-gray-400'
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="font-extrabold text-[11px]">{slot.label.split('–')[0]}</span>
                        {(isConfirmed || isPending) && slot.studentName && (
                          <span className="text-[10px] font-bold opacity-90 truncate max-w-[120px]">
                            • {slot.studentName}
                          </span>
                        )}
                      </div>
                      <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border ${
                        isConfirmed
                          ? 'bg-emerald-200 text-emerald-900 border-emerald-400 dark:bg-emerald-900/80 dark:text-emerald-100'
                          : isPending
                          ? 'bg-amber-200 text-amber-900 border-amber-400 dark:bg-amber-900/80 dark:text-amber-100'
                          : slot.isAvailable
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300'
                          : 'bg-gray-200 dark:bg-gray-800 text-gray-500 border-transparent'
                      }`}>
                        {isConfirmed
                          ? 'Confirmed'
                          : isPending
                          ? 'Pending Acceptance'
                          : slot.isAvailable
                          ? 'Available'
                          : slot.unavailableReason || 'Unavailable'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
