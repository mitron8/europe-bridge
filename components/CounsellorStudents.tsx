"use client";

import React, { useEffect, useState } from 'react';

export interface AssignedStudent {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string | null;
}

interface CounsellorStudentsProps {
  searchQuery?: string;
}

export function CounsellorStudents({ searchQuery = '' }: CounsellorStudentsProps) {
  const [students, setStudents] = useState<AssignedStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const response = await fetch(`${apiUrl}/counsellor/students`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch assigned students');
        }

        const data = await response.json();
        setStudents(data.students || []);
      } catch (err: any) {
        setError('Unable to load assigned students.');
      } finally {
        setLoading(false);
      }
    }

    fetchStudents();
  }, []);

  const formatStatus = (status: string | null) => {
    if (!status) return 'Unknown';
    return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const filteredStudents = students.filter((student) => {
    const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
    const email = student.email.toLowerCase();
    const status = formatStatus(student.status).toLowerCase();
    const query = searchQuery.toLowerCase();
    return fullName.includes(query) || email.includes(query) || status.includes(query);
  });

  if (loading) {
    return (
      <div className="p-8 border-2 border-dashed border-[#EBE7E0] rounded-2xl text-center text-gray-400 text-xs font-bold">
        Loading assigned students...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 border-2 border-dashed border-[#EBE7E0] rounded-2xl text-center text-red-500 text-xs font-bold bg-red-50">
        {error}
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="p-8 border-2 border-dashed border-[#EBE7E0] rounded-2xl text-center text-gray-400 text-xs font-bold">
        No students assigned yet.
      </div>
    );
  }

  if (filteredStudents.length === 0) {
    return (
      <div className="p-8 border-2 border-dashed border-[#EBE7E0] rounded-2xl text-center text-gray-400 text-xs font-bold">
        No students match your search query.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b-2 border-[#EBE7E0]">
            <th className="px-4 py-3 text-xs font-extrabold text-gray-500 uppercase tracking-wider">Student Name</th>
            <th className="px-4 py-3 text-xs font-extrabold text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-4 py-3 text-xs font-extrabold text-gray-500 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.userId} className="border-b border-[#EBE7E0] hover:bg-[#FDFBF7] transition-colors">
              <td className="px-4 py-3 text-sm font-bold text-germany-black">
                {student.firstName} {student.lastName}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {student.email}
              </td>
              <td className="px-4 py-3 text-sm font-bold text-germany-black">
                <span className="px-2 py-1 bg-germany-gold/10 text-germany-gold rounded-full text-xs">
                  {formatStatus(student.status)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
