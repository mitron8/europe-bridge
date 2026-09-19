
export function Footer() {
  return (
    <footer className="p-8 bg-[#111111] text-white border-t border-white/10 mt-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <h3 className="font-bold mb-2 text-white">EuropeBridge</h3>
          <p className="text-sm text-gray-400">AI-powered Germany education and relocation platform.</p>
        </div>
        <div>
          <h3 className="font-bold mb-2 text-white">Services</h3>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>University Matching</li>
            <li>Visa Assistance</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-2 text-white">Resources</h3>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>Blog</li>
            <li>Tools</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold mb-2 text-white">Legal</h3>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>Contact</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
