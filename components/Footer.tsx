import Link from 'next/link';

export function Footer() {
  return (
    <footer className="p-8 bg-gray-100 border-t mt-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <h3 className="font-bold mb-2">EuropeBridge</h3>
          <p className="text-sm text-gray-600">AI-powered Germany education and relocation platform.</p>
        </div>
        <div>
          <h3 className="font-bold mb-2">Services</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>University Matching</li>
            <li>Visa Assistance</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-2">Resources</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>Blog</li>
            <li>Tools</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-2">Legal</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>Contact</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
