import { Button } from '@/components/Button';
import Link from 'next/link';

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-lg shadow-sm border border-black p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black">Login</h1>
          <p className="text-black mt-2">Welcome back to EuropeBridge</p>
        </div>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black mb-1">Email</label>
            <input type="email" placeholder="Email" className="w-full border border-black p-2 rounded focus:ring-black focus:border-black bg-white text-black" />
          </div>
          <div>
            <label className="block text-sm font-medium text-black mb-1">Password</label>
            <input type="password" placeholder="Password" className="w-full border border-black p-2 rounded focus:ring-black focus:border-black bg-white text-black" />
          </div>
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center text-black">
              <input type="checkbox" className="mr-2 border-black" /> Remember me
            </label>
            <a href="#" className="text-black hover:underline font-bold">Forgot Password?</a>
          </div>
          <Button className="w-full">Login</Button>
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
          Don't have an account? <Link href="#" className="text-black font-bold hover:underline">Register</Link>
        </p>
      </div>

      {/* Temporary Dashboard Access Panel */}
      <div className="max-w-md w-full mt-8 bg-white rounded-lg shadow-sm border border-black p-6">
        <h2 className="text-lg font-bold text-center mb-4 text-black">Temporary Dashboard Access</h2>
        <div className="flex flex-wrap gap-2 justify-center">
          <Link href="/dashboard/student" className="px-3 py-1 text-sm border border-black rounded text-black hover:bg-gray-100">Student</Link>
          <Link href="/dashboard/admin" className="px-3 py-1 text-sm border border-black rounded text-black hover:bg-gray-100">Admin</Link>
          <Link href="/dashboard/super-admin" className="px-3 py-1 text-sm border border-black rounded text-black hover:bg-gray-100">Super Admin</Link>
          <Link href="/dashboard/marketing" className="px-3 py-1 text-sm border border-black rounded text-black hover:bg-gray-100">Marketing</Link>
          <Link href="/dashboard/financial" className="px-3 py-1 text-sm border border-black rounded text-black hover:bg-gray-100">Finance</Link>
          <Link href="/dashboard/content" className="px-3 py-1 text-sm border border-black rounded text-black hover:bg-gray-100">Content</Link>
          <Link href="/dashboard/counsellor" className="px-3 py-1 text-sm border border-black rounded text-black hover:bg-gray-100">Counsellor</Link>
        </div>
      </div>
    </div>
  );
}
