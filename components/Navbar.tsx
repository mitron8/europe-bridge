import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-white border-b border-black text-black">
      <div className="font-bold text-xl">
        <Link href="/">EuropeBridge</Link>
      </div>
      <div className="space-x-4 hidden md:block">
        <Link href="/">Home</Link>
        <Link href="/study-in-germany">Study in Germany</Link>
        <Link href="/services">Services</Link>
        <Link href="/tools">Tools</Link>
        <Link href="/resources">Resources</Link>
        <Link href="/pricing">Pricing</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </div>
      <div className="space-x-2">
        <Link href="/login" className="px-4 py-2 text-black font-medium">Login</Link>
        <button className="px-4 py-2 bg-black text-white rounded font-medium">Request Guidance</button>
      </div>
    </nav>
  );
}

