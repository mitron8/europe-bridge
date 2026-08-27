'use client';
import Link from 'next/link';
import { useState } from 'react';
import { login } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await login(email, password);
      
      // Redirect based on role
      if (data.user.role === 'student') {
        router.push('/dashboard/student');
      } else {
        router.push(`/dashboard/${data.user.role}`);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm border border-black p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black">Login</h1>
          <p className="text-black mt-2">Welcome back to EuropeBridge</p>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-black mb-1">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email" className="w-full border border-black p-2 rounded focus:ring-black focus:border-black bg-white text-black" />
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-1">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Password" className="w-full border border-black p-2 rounded focus:ring-black focus:border-black bg-white text-black" />
          </div>
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center text-black">
              <input type="checkbox" className="mr-2 border-black" /> Remember me
            </label>
            <a href="#" className="text-black hover:underline font-bold">Forgot Password?</a>
          </div>
          <button className="px-4 py-2 rounded bg-black text-white font-medium w-full"  disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-black"></div></div>
          <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-black">Or continue with</span></div>
        </div>

        <div className="space-y-3">
          <button className="w-full border border-black p-2 rounded text-black hover:bg-gray-100">[ Google Login Placeholder ]</button>
          <button className="w-full border border-black p-2 rounded text-black hover:bg-gray-100">[ Phone Login Placeholder ]</button>
        </div>

        <p className="text-center text-sm text-black mt-6">
          Don't have an account? <Link href="/signup" className="text-black font-bold hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}
