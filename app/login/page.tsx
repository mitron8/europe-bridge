"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';
import { login } from '@/lib/auth';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('student');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await login(email, password);
      // route them to their specific dashboard based on what the db says
      if (data.user.role === 'student') {
        router.push('/dashboard/student');
      } else {
        // the db role is 'superadmin' but the url is 'super-admin'
        const targetDashboard = data.user.role === 'superadmin' ? 'super-admin' : data.user.role;
        router.push(`/dashboard/${targetDashboard}`);
      }
    } catch (err: any) {
      // just bubble up whatever the backend threw
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center neu-bg px-4 py-12 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-germany-red/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-germany-gold/20 rounded-full blur-3xl pointer-events-none"></div>

      {/* Back to Home Link */}
      <div className="max-w-md w-full mb-6 flex items-center justify-between z-10">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-germany-red transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
        <Link href="/" className="inline-flex items-center gap-2 font-display text-xl text-germany-black">
          <img src="/doodles/happy.png" alt="Logo" className="w-8 h-8 object-contain" />
          <span>Europe<span className="text-germany-red">Bridge</span></span>
        </Link>
      </div>

      {/* Main Login Card */}
      <div className="max-w-md w-full bg-white neu-card p-8 relative z-10 overflow-hidden shadow-[12px_12px_30px_rgba(210,205,195,0.6)]">
        {/* Tricolor Header Strip */}
        <div className="absolute top-0 left-0 w-full h-2 flex">
          <div className="flex-1 bg-germany-black"></div>
          <div className="flex-1 bg-germany-red"></div>
          <div className="flex-1 bg-germany-gold"></div>
        </div>

        <div className="text-center mt-2 mb-6">
          <h1 className="text-3xl font-display text-germany-black">Welcome Back</h1>
          <p className="text-gray-500 font-bold text-xs mt-1">Sign in to continue your German journey</p>
        </div>

        {error && (
          <div className="mb-4 bg-red-50 border-2 border-germany-red text-red-700 px-4 py-2.5 rounded-xl font-bold text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-extrabold text-germany-black mb-1 ml-1">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com" 
              className="w-full px-4 py-2.5 neu-input font-bold text-germany-black text-sm placeholder-gray-400" 
              required
            />
          </div>

          <div>
            <label className="block text-xs font-extrabold text-germany-black mb-1 ml-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              className="w-full px-4 py-2.5 neu-input font-bold text-germany-black text-sm placeholder-gray-400" 
              required
            />
          </div>

          <div>
            <label className="block text-xs font-extrabold text-germany-black mb-1 ml-1">Login As (Role)</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full px-4 py-2.5 neu-input font-bold text-germany-black text-sm bg-[#EBE7E0]"
            >
              <option value="student">Student</option>
              <option value="counsellor">Counsellor</option>
              <option value="admin">Admin</option>
              <option value="super-admin">Super Admin</option>
              <option value="marketing">Marketing</option>
              <option value="financial">Finance</option>
              <option value="content">Content</option>
            </select>
          </div>

          <div className="flex justify-between items-center text-xs font-bold pt-1">
            <label className="flex items-center text-gray-600 cursor-pointer">
              <input type="checkbox" className="mr-2 accent-germany-red rounded" /> Remember me
            </label>
            <a href="#" className="text-germany-red hover:underline">Forgot Password?</a>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full neu-btn-primary py-3 px-4 font-bold text-base cursor-pointer flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
          >
            <span>{loading ? 'Signing In...' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
          <div className="relative flex justify-center text-xs font-bold"><span className="px-3 bg-white text-gray-400">Or continue with</span></div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button 
            type="button" 
            onClick={() => router.push('/dashboard/student')}
            className="neu-btn py-2.5 px-3 text-xs font-extrabold text-germany-black hover:text-germany-red flex items-center justify-center gap-1.5"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Google</span>
          </button>
          <button 
            type="button" 
            onClick={() => router.push('/dashboard/student')}
            className="neu-btn py-2.5 px-3 text-xs font-extrabold text-germany-black hover:text-germany-red flex items-center justify-center gap-1.5"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Passkey</span>
          </button>
        </div>

        <p className="text-center text-xs font-bold text-gray-500 mt-6">
          Don't have an account?{' '}
          <Link href="/signup" className="text-germany-red font-extrabold hover:underline">
            Register
          </Link>
        </p>
      </div>

      {/* Quick Dashboard Access Panel for development and testing */}
      <div className="max-w-md w-full mt-6 bg-white/80 backdrop-blur neu-card p-5 z-10">
        <h2 className="text-xs font-extrabold text-center uppercase tracking-wider text-gray-400 mb-3">
          Direct Dashboard Previews
        </h2>
        <div className="flex flex-wrap gap-2 justify-center">
          {[
            { label: "Student", href: "/dashboard/student" },
            { label: "Counsellor", href: "/dashboard/counsellor" },
            { label: "Admin", href: "/dashboard/admin" },
            { label: "Super Admin", href: "/dashboard/super-admin" },
            { label: "Marketing", href: "/dashboard/marketing" },
            { label: "Finance", href: "/dashboard/financial" },
            { label: "Content", href: "/dashboard/content" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="px-3 py-1.5 text-xs font-extrabold bg-[#EBE7E0] hover:bg-germany-red hover:text-white rounded-xl transition-colors text-germany-black"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
