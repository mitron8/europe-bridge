"use client";

import React, { useEffect, useState } from 'react';

export interface StudentLead {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

interface CounsellorLeadsProps {
  searchQuery?: string;
}

export function CounsellorLeads({ searchQuery = '' }: CounsellorLeadsProps) {
  const [leads, setLeads] = useState<StudentLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLeads() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        const response = await fetch(`${apiUrl}/counsellor/leads`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include', // sends the HttpOnly accessToken cookie
        });

        if (!response.ok) {
          throw new Error('Failed to fetch leads');
        }

        const data = await response.json();
        setLeads(data.leads || []);
      } catch (err: any) {
        setError('Unable to load student leads.');
      } finally {
        setLoading(false);
      }
    }

    fetchLeads();
  }, []);

  const formatStatus = (status: string) => {
    return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const filteredLeads = leads.filter((lead) => {
    const fullName = `${lead.firstName} ${lead.lastName}`.toLowerCase();
    const email = lead.email.toLowerCase();
    const status = formatStatus(lead.status).toLowerCase();
    const query = searchQuery.toLowerCase();
    return fullName.includes(query) || email.includes(query) || status.includes(query);
  });

  if (loading) {
    return (
      <div className="p-8 border-2 border-dashed border-[#EBE7E0] rounded-2xl text-center text-gray-400 text-xs font-bold">
        Loading student leads...
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

  if (leads.length === 0) {
    return (
      <div className="p-8 border-2 border-dashed border-[#EBE7E0] rounded-2xl text-center text-gray-400 text-xs font-bold">
        No student leads available.
      </div>
    );
  }

  if (filteredLeads.length === 0) {
    return (
      <div className="p-8 border-2 border-dashed border-[#EBE7E0] rounded-2xl text-center text-gray-400 text-xs font-bold">
        No leads match your search query.
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
          {filteredLeads.map((lead) => (
            <tr key={lead.userId} className="border-b border-[#EBE7E0] hover:bg-[#FDFBF7] transition-colors">
              <td className="px-4 py-3 text-sm font-bold text-germany-black">
                {lead.firstName} {lead.lastName}
              </td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {lead.email}
              </td>
              <td className="px-4 py-3 text-sm font-bold text-germany-black">
                <span className="px-2 py-1 bg-germany-gold/10 text-germany-gold rounded-full text-xs">
                  {formatStatus(lead.status)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
