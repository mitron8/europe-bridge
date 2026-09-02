"use client";

import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Search, Users, AlertCircle, MoreHorizontal, X, ChevronDown } from 'lucide-react';

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

type Student = {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string | null;
  // these come from the LEFT JOIN on the assignments table — null if unassigned
  counsellorId: string | null;
  counsellorFirstName: string | null;
  counsellorLastName: string | null;
};

type Counsellor = {
  id: string;
  firstName: string;
  lastName: string;
};

export default function AdminStudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // three-dot menu state: tracks which student row has the menu open
  // gotta make sure we only have one open at a time so it doesn't look messy
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // assign modal state
  const [assignModal, setAssignModal] = useState<{ student: Student } | null>(null);
  const [counsellors, setCounsellors] = useState<Counsellor[]>([]);
  const [selectedCounsellorId, setSelectedCounsellorId] = useState('');
  const [isAssigning, setIsAssigning] = useState(false);
  const [assignError, setAssignError] = useState('');
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const fetchStudents = async () => {
    setIsLoading(true);
    setError('');
    try {
      // now hitting the proper admin endpoint that also brings back the assigned counsellor
      // so much better than stringing together 3 different api calls on the frontend
      const response = await fetch(`${NEXT_PUBLIC_API_URL}/admin/students`, {
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Unable to load students.');
      const data = await response.json();
      setStudents(data);
    } catch (err: any) {
      setError(err.message || 'Unable to load students.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // load em up on mount
    fetchStudents();
  }, []);

  // close the three-dot menu if user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // kinda hacky way to format the status strings (e.g. signed_up -> Signed Up) but it works fine for now
  // if we ever add weird statuses with numbers we'll need to rewrite this regex stuff
  const formatStatus = (status: string | null) => {
    if (!status) return 'Unknown';
    return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const openAssignModal = async (student: Student) => {
    // close the row menu so it doesn't overlap the modal
    setActiveMenu(null);
    setAssignModal({ student });
    setSelectedCounsellorId(student.counsellorId || '');
    setAssignError('');
    setIsSelectOpen(false);

    // fetch counsellors when opening the modal — reusing the existing admin endpoint
    try {
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/admin/counsellors`, { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setCounsellors(data);
      }
    } catch {
      // not fatal, the dropdown will just be empty
    }
  };

  const handleAssign = async () => {
    if (!selectedCounsellorId || !assignModal) return;
    setIsAssigning(true);
    setAssignError('');

    try {
      // reusing the same endpoint as the other page.
      // keeps everything dry and we know it handles upserts correctly
      const res = await fetch(`${NEXT_PUBLIC_API_URL}/admin/assign-counsellor`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          studentId: assignModal.student.userId,
          counsellorId: selectedCounsellorId,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to assign counsellor');
      }

      // success — close modal and refresh the list so the new assignment shows up
      setAssignModal(null);
      fetchStudents();
    } catch (err: any) {
      setAssignError(err.message || 'Failed to assign counsellor');
    } finally {
      setIsAssigning(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="neu-card p-6 md:p-8 bg-white relative overflow-hidden shadow-[12px_12px_30px_rgba(210,205,195,0.6)]">
        <div className="absolute top-0 left-0 w-full h-2 flex">
          <div className="flex-1 bg-germany-black"></div>
          <div className="flex-1 bg-germany-red"></div>
          <div className="flex-1 bg-germany-gold"></div>
        </div>

        <div className="flex items-center justify-between mt-1">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-germany-red/10 text-germany-red rounded-full font-extrabold text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin Management</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-display text-germany-black">
              Students
            </h1>
            <p className="text-xs md:text-sm font-bold text-gray-500">
              View registered student accounts and manage counsellor assignments.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="neu-card p-6 bg-white space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="w-full md:w-96 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 neu-input text-xs font-bold"
            />
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-lg text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}

        {isLoading ? (
          <div className="p-8 border-2 border-dashed border-[#EBE7E0] rounded-2xl text-center text-gray-400 text-xs font-bold">
            Loading students...
          </div>
        ) : students.length === 0 ? (
          <div className="p-8 border-2 border-dashed border-[#EBE7E0] rounded-2xl text-center text-gray-400 text-xs font-bold flex flex-col items-center gap-2">
            <Users className="w-8 h-8 text-gray-300" />
            <span>No students found.</span>
          </div>
        ) : (() => {
          const filteredStudents = students.filter((student) => {
            const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
            const email = student.email.toLowerCase();
            const status = formatStatus(student.status).toLowerCase();
            const counsellor = (student.counsellorFirstName ? `${student.counsellorFirstName} ${student.counsellorLastName}` : 'unassigned').toLowerCase();
            const query = searchQuery.toLowerCase();
            return fullName.includes(query) || email.includes(query) || status.includes(query) || counsellor.includes(query);
          });

          if (filteredStudents.length === 0) {
            return (
              <div className="p-8 border-2 border-dashed border-[#EBE7E0] rounded-2xl text-center text-gray-400 text-xs font-bold flex flex-col items-center gap-2">
                <Users className="w-8 h-8 text-gray-300" />
                <span>No students match your search.</span>
              </div>
            );
          }

          return (
            <div className="overflow-x-auto" ref={menuRef}>
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#EBE7E0] text-gray-400 font-extrabold uppercase text-[10px]">
                    <th className="pb-3">Name</th>
                    <th className="pb-3">Email</th>
                    <th className="pb-3">Counsellor</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EBE7E0] font-bold text-germany-black">
                  {filteredStudents.map((student) => {
                    const counsellorName = student.counsellorFirstName
                      ? `${student.counsellorFirstName} ${student.counsellorLastName}`
                      : null;

                    return (
                      <tr key={student.userId} className="hover:bg-[#FDFBF7] relative">
                        <td className="py-3.5">{student.firstName} {student.lastName}</td>
                        <td className="py-3.5 text-gray-500">{student.email}</td>
                        <td className="py-3.5">
                          {counsellorName ? (
                            <span className="font-bold text-germany-black">{counsellorName}</span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full text-[10px] bg-gray-100 text-gray-500 font-bold">
                              Unassigned
                            </span>
                          )}
                        </td>
                        <td className="py-3.5">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-germany-gold/10 text-germany-gold font-extrabold capitalize">
                            {formatStatus(student.status)}
                          </span>
                        </td>
                        <td className="py-3.5 text-right relative">
                          {/* three-dot menu */}
                          <button
                            onClick={() => setActiveMenu(activeMenu === student.userId ? null : student.userId)}
                            className="p-1.5 rounded-lg hover:bg-[#EBE7E0] transition-colors text-gray-400 hover:text-germany-black"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </button>

                          {activeMenu === student.userId && (
                            <div className="absolute right-0 top-full mt-1 w-48 bg-[#FDFBF7] rounded-2xl shadow-[6px_6px_20px_rgba(210,205,195,0.4)] z-30 py-1 border-none overflow-hidden">
                              <button
                                onClick={() => openAssignModal(student)}
                                className="w-full text-left px-4 py-2.5 text-xs font-bold text-germany-black hover:bg-[#EBE7E0] transition-colors"
                              >
                                Assign Counsellor
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        })()}
      </div>

      {/* Assign Counsellor Modal */}
      {assignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-sm">
          <div className="bg-[#FDFBF7] neu-card w-full max-w-md p-6 relative border-none animate-in fade-in duration-200">
            <button
              onClick={() => setAssignModal(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-germany-black hover:bg-[#EBE7E0] rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <h2 className="text-xl font-display font-extrabold text-germany-black mb-5">Assign Counsellor</h2>

            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-wider text-gray-400">Student</p>
                <p className="text-sm font-extrabold text-germany-black">
                  {assignModal.student.firstName} {assignModal.student.lastName}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-wider text-gray-400">Current Counsellor</p>
                <p className="text-sm font-bold text-gray-600">
                  {assignModal.student.counsellorFirstName
                    ? `${assignModal.student.counsellorFirstName} ${assignModal.student.counsellorLastName}`
                    : 'Unassigned'}
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-wider text-gray-400">
                  Select Counsellor
                </label>
                <div className="relative">
                  {/* Custom select trigger button */}
                  <button
                    type="button"
                    onClick={() => setIsSelectOpen(!isSelectOpen)}
                    className="w-full px-4 py-2.5 neu-input text-xs font-bold bg-[#EBE7E0] text-germany-black text-left flex items-center justify-between cursor-pointer focus:outline-none focus:ring-2 focus:ring-germany-red/30"
                  >
                    <span>
                      {selectedCounsellorId
                        ? (() => {
                            const c = counsellors.find((x) => x.id === selectedCounsellorId);
                            return c ? `${c.firstName} ${c.lastName}` : '— Choose a counsellor —';
                          })()
                        : '— Choose a counsellor —'}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isSelectOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Custom select options dropdown */}
                  {isSelectOpen && (
                    <div className="absolute left-0 right-0 mt-1 max-h-40 overflow-y-auto bg-[#FDFBF7] rounded-2xl shadow-[6px_6px_25px_rgba(210,205,195,0.45)] z-50 py-1 border border-[#EBE7E0]/40">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCounsellorId('');
                          setIsSelectOpen(false);
                        }}
                        className="w-full text-left px-4 py-2.5 text-xs font-bold text-gray-400 hover:bg-[#EBE7E0] transition-colors"
                      >
                        — Choose a counsellor —
                      </button>
                      {counsellors.map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => {
                            setSelectedCounsellorId(c.id);
                            setIsSelectOpen(false);
                          }}
                          className={`w-full text-left px-4 py-2.5 text-xs font-bold transition-colors ${
                            selectedCounsellorId === c.id
                              ? 'bg-germany-red text-white'
                              : 'text-germany-black hover:bg-[#EBE7E0]'
                          }`}
                        >
                          {c.firstName} {c.lastName}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {assignError && (
                <div className="p-3 bg-red-50 text-red-600 rounded-lg text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{assignError}</span>
                </div>
              )}

              <div className="pt-2">
                <button
                  onClick={handleAssign}
                  disabled={!selectedCounsellorId || isAssigning}
                  className="w-full neu-btn-primary py-3 text-sm font-extrabold disabled:opacity-50"
                >
                  {isAssigning ? 'Assigning...' : 'Assign'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
