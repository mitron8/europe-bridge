"use client";

import React, { useState } from 'react';
import { ShieldAlert, Search, Plus, X, UserCheck, AlertCircle, Loader2 } from 'lucide-react';
import { usePaginatedList } from '../../../../hooks/usePaginatedList';

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://europebridge.onrender.com';

type Admin = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};

export default function SuperAdminAdminsPage() {
  const {
    data: admins,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    bottomSentinelRef,
    hasMore,
    refetch,
  } = usePaginatedList<Admin>('/admin/admins', 25);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch(`${NEXT_PUBLIC_API_URL}/admin/admins`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        credentials: 'include',
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        let errorMsg = data.message;
        if (Array.isArray(data.message)) {
          errorMsg = data.message.join(', ');
        }
        throw new Error(errorMsg || 'Failed to create admin');
      }

      setIsModalOpen(false);
      setFormData({ firstName: '', lastName: '', email: '', password: '' });
      refetch();
    } catch (err: any) {
      setSubmitError(err.message || 'An error occurred');
    } finally {
      setIsSubmitting(false);
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
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-germany-black text-white rounded-full font-extrabold text-[11px]">
              <ShieldAlert className="w-3.5 h-3.5 text-germany-gold" />
              <span>Super Admin Management</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-display text-germany-black">
              Administrators
            </h1>
            <p className="text-xs md:text-sm font-bold text-gray-500">
              Manage platform administrator accounts.
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
              placeholder="Search administrators..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 neu-input text-xs font-bold"
            />
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="neu-btn-primary py-2 px-4 text-xs font-extrabold flex items-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Administrator</span>
          </button>
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-lg text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <span>{error}</span>
          </div>
        )}

        {isLoading ? (
          <div className="p-8 border-2 border-dashed border-[#EBE7E0] rounded-2xl text-center text-gray-400 text-xs font-bold">
            Loading administrators...
          </div>
        ) : admins.length === 0 ? (
          <div className="p-8 border-2 border-dashed border-[#EBE7E0] rounded-2xl text-center text-gray-400 text-xs font-bold flex flex-col items-center gap-2">
            <UserCheck className="w-8 h-8 text-gray-300" />
            <span>No administrators found.</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#EBE7E0] text-gray-400 font-extrabold uppercase text-[10px]">
                  <th className="pb-3">Name</th>
                  <th className="pb-3">Email</th>
                  <th className="pb-3">Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EBE7E0] font-bold text-germany-black">
                {admins.map((admin) => (
                  <tr key={admin.id} className="hover:bg-[#FDFBF7] relative">
                    <td className="py-3.5">{admin.firstName} {admin.lastName}</td>
                    <td className="py-3.5 text-gray-500">{admin.email}</td>
                    <td className="py-3.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-red-100 text-red-800 capitalize">
                        {admin.role}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {hasMore && (
              <div ref={bottomSentinelRef} className="py-6 flex justify-center">
                <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-sm">
          <div className="bg-[#FDFBF7] neu-card w-full max-w-md p-6 relative border-none animate-in fade-in duration-200">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-germany-black hover:bg-[#EBE7E0] rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            
            <h2 className="text-xl font-display font-extrabold text-germany-black mb-6">Create Administrator</h2>
            
            {submitError && (
              <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-xs font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{submitError}</span>
              </div>
            )}
            
            <form onSubmit={handleCreateAdmin} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-gray-500 uppercase tracking-wider ml-1">First Name</label>
                  <input
                    required
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="w-full px-4 py-2.5 neu-input text-xs font-bold"
                    placeholder="Jane"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-gray-500 uppercase tracking-wider ml-1">Last Name</label>
                  <input
                    required
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="w-full px-4 py-2.5 neu-input text-xs font-bold"
                    placeholder="Smith"
                  />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-gray-500 uppercase tracking-wider ml-1">Email</label>
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-2.5 neu-input text-xs font-bold"
                  placeholder="jane.smith@example.com"
                />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-gray-500 uppercase tracking-wider ml-1">Password</label>
                <input
                  required
                  minLength={6}
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full px-4 py-2.5 neu-input text-xs font-bold"
                  placeholder="••••••••"
                />
              </div>
              
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full neu-btn-primary py-3 text-sm font-extrabold disabled:opacity-50"
                >
                  {isSubmitting ? 'Creating...' : 'Create Administrator'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
