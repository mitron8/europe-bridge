"use client";

import React from 'react';
import {
  Check,
  CheckSquare,
  FileText,
  Loader2,
  Plus,
  Save,
  Square,
  Trash2,
} from 'lucide-react';
import type { ConsultationTask } from '../StudentDetailModal';

interface StudentNotesTasksTabProps {
  note: string;
  readOnly?: boolean;
  isSavingNote: boolean;
  noteSaved: boolean;
  lastNoteUpdated?: string | null;
  tasks: ConsultationTask[];
  newTaskText: string;
  newTaskDueDate: string;
  isAddingTask: boolean;
  onNoteChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onNoteFocus: () => void;
  onNoteBlur: () => void;
  onSaveNote: () => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onNewTaskTextChange: (val: string) => void;
  onNewTaskDueDateChange: (val: string) => void;
  onAddTask: (e: React.FormEvent) => void;
}

export function StudentNotesTasksTab({
  note,
  readOnly,
  isSavingNote,
  noteSaved,
  lastNoteUpdated,
  tasks,
  newTaskText,
  newTaskDueDate,
  isAddingTask,
  onNoteChange,
  onNoteFocus,
  onNoteBlur,
  onSaveNote,
  onToggleTask,
  onDeleteTask,
  onNewTaskTextChange,
  onNewTaskDueDateChange,
  onAddTask,
}: StudentNotesTasksTabProps) {
  return (
    <div className="space-y-4">
      {/* Notes Editor */}
      <div className="p-5 bg-white dark:bg-[#0E121A] rounded-2xl border border-gray-200/80 dark:border-gray-800/80 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-germany-black dark:text-white" />
            <h3 className="text-xs sm:text-sm font-extrabold text-germany-black dark:text-white uppercase tracking-wider">
              Private Counsellor Remarks &amp; Strategy
            </h3>
          </div>
          <div className="flex items-center gap-2">
            {isSavingNote ? (
              <span className="text-[11px] font-extrabold text-amber-600 dark:text-amber-400 flex items-center gap-1 animate-pulse">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Saving in real time...</span>
              </span>
            ) : noteSaved ? (
              <span className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 animate-in fade-in">
                <Check className="w-3.5 h-3.5" />
                <span>Saved to server!</span>
              </span>
            ) : lastNoteUpdated ? (
              <span className="text-[10px] font-bold text-gray-400">
                Live sync active
              </span>
            ) : null}
          </div>
        </div>

        <textarea
          value={note}
          readOnly={readOnly}
          onChange={onNoteChange}
          onFocus={onNoteFocus}
          onBlur={onNoteBlur}
          placeholder={readOnly ? "No counsellor notes recorded yet." : "Document consultation takeaways (e.g. Target TUM Data Engineering, advised to re-take German A2 Goethe exam in October, notarization complete for APS Delhi)..."}
          rows={4}
          className="w-full p-3 bg-white dark:bg-[#151B27] border border-gray-200/80 dark:border-gray-800/80 rounded-xl text-xs font-bold text-gray-900 dark:text-white placeholder:text-gray-400 placeholder:font-normal resize-none focus:outline-none focus:border-germany-red shadow-xs"
        />

        <div className="flex items-center justify-between pt-1">
          <p className="text-[10px] font-bold text-gray-400">
            {readOnly ? 'Viewing counsellor consultation notes (Supervisor Mode).' : 'Notes are kept private to counsellors and automatically saved in real time.'}
          </p>
          {!readOnly && (
            <button
              type="button"
              onClick={onSaveNote}
              disabled={isSavingNote}
              className="py-1.5 px-3.5 text-xs font-extrabold flex items-center gap-1.5 text-germany-black dark:text-white hover:text-germany-red dark:hover:text-germany-red bg-white dark:bg-[#151B27] border border-gray-200/80 dark:border-gray-800/80 rounded-xl cursor-pointer shadow-xs transition-colors disabled:opacity-50"
            >
              {isSavingNote ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              <span>Save Notes</span>
            </button>
          )}
        </div>
      </div>

      {/* Consultation Follow-Up Checklist */}
      <div className="p-5 bg-white dark:bg-[#0E121A] rounded-2xl border border-gray-200/80 dark:border-gray-800/80 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs sm:text-sm font-extrabold text-germany-black dark:text-white uppercase tracking-wider">
            Advising Checklist &amp; Action Items
          </h3>
          {tasks.length > 0 && (
            <span className="text-[10px] font-bold text-gray-400">
              {tasks.filter((t) => t.completed).length} of {tasks.length} completed
            </span>
          )}
        </div>

        <div className="space-y-2">
          {tasks.length === 0 ? (
            <div className="p-5 text-center text-xs font-bold text-gray-400 bg-gray-50/70 dark:bg-[#151B27]/50 rounded-xl border border-dashed border-gray-200 dark:border-gray-800">
              No advising action items yet. Add a follow-up item below.
            </div>
          ) : (
            tasks.map((t) => (
              <div
                key={t.id}
                onClick={readOnly ? undefined : () => onToggleTask(t.id)}
                className={`group p-2.5 rounded-xl border flex items-center justify-between gap-3 text-xs font-bold transition-colors ${readOnly ? 'cursor-default' : 'cursor-pointer'} ${t.completed
                  ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/40 text-gray-500 dark:text-gray-400 line-through'
                  : 'bg-[#FDFBF7] dark:bg-[#151B27] border-[#EBE7E0] dark:border-gray-800/80 text-germany-black dark:text-white hover:bg-white dark:hover:bg-[#1A2130]'
                  }`}
              >
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  {t.completed ? (
                    <CheckSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  ) : (
                    <Square className="w-4 h-4 text-gray-400 shrink-0" />
                  )}
                  <span className="truncate">{t.text}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[10px] text-gray-400 font-extrabold">Due {t.dueDate || 'Upcoming'}</span>
                  {!readOnly && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteTask(t.id);
                      }}
                      className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors cursor-pointer"
                      title="Delete task"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {!readOnly && (
          <form onSubmit={onAddTask} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-2">
            <input
              type="text"
              placeholder="Add an advising follow-up item..."
              value={newTaskText}
              onChange={(e) => onNewTaskTextChange(e.target.value)}
              className="flex-1 p-2 bg-white dark:bg-[#151B27] border border-gray-200/80 dark:border-gray-800/80 rounded-xl text-xs font-bold text-gray-900 dark:text-white focus:outline-none focus:border-germany-red shadow-xs"
            />
            <input
              type="text"
              placeholder="Due date (optional)"
              value={newTaskDueDate}
              onChange={(e) => onNewTaskDueDateChange(e.target.value)}
              className="w-full sm:w-36 p-2 bg-white dark:bg-[#151B27] border border-gray-200/80 dark:border-gray-800/80 rounded-xl text-xs font-bold text-gray-900 dark:text-white focus:outline-none focus:border-germany-red shadow-xs"
            />
            <button
              type="submit"
              disabled={isAddingTask || !newTaskText.trim()}
              className="py-2 px-3.5 text-xs font-extrabold flex items-center justify-center gap-1.5 shrink-0 bg-germany-red text-white hover:bg-germany-red/90 rounded-xl disabled:opacity-50 shadow-xs cursor-pointer transition-colors"
            >
              {isAddingTask ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Plus className="w-3.5 h-3.5" />
              )}
              <span>Add Task</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
