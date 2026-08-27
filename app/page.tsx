import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="px-4 py-20 text-center bg-blue-50">
          <h1 className="text-4xl font-bold mb-4">Welcome to EuropeBridge</h1>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Your AI-powered guide for education and relocation to Germany. We make the journey simple and stress-free.
          </p>
          <div className="space-x-4">
            <button className="px-4 py-2 rounded bg-black text-white font-medium">Request Guidance</button>
            <button className="px-4 py-2 rounded bg-black text-white font-medium bg-white text-blue-600 border border-blue-600" >Explore Services</button>
          </div>
          <div className="mt-12 h-64 bg-gray-200 border-dashed border-2 border-gray-400 flex items-center justify-center text-gray-500 rounded max-w-4xl mx-auto">
            [ Placeholder area for future visual/mascot ]
          </div>
        </section>

        {/* PLATFORM INTRODUCTION */}
        <section className="px-4 py-16 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Why Choose Us?</h2>
            <p className="text-gray-600 mt-2">Comprehensive support for every step of your journey.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="border border-black rounded p-4 bg-white shadow-sm"><h3 className="font-bold mb-2 text-black">AI Matching</h3><p className="text-black text-sm">Find the perfect university and program tailored to your profile.</p></div>
            <div className="border border-black rounded p-4 bg-white shadow-sm"><h3 className="font-bold mb-2 text-black">Expert Guidance</h3><p className="text-black text-sm">Get help with applications, documents, and visas from our experts.</p></div>
            <div className="border border-black rounded p-4 bg-white shadow-sm"><h3 className="font-bold mb-2 text-black">Relocation Support</h3><p className="text-black text-sm">Settle in Germany with ease, from housing to registration.</p></div>
          </div>
        </section>

        {/* STUDENT JOURNEY */}
        <section className="px-4 py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Your Journey</h2>
            <div className="flex flex-wrap justify-center gap-2 items-center text-sm font-medium">
              {['Register', 'Complete Profile', 'Matching Engine', 'Subscription Plan', 'My Shortlist', 'Document Hub', 'APS Checklist', 'College Applications', 'Visa Assistance', 'Admission Completed'].map((step, i, arr) => (
                <span key={step} className="flex items-center">
                  <span className="px-3 py-1 bg-white border rounded">{step}</span>
                  {i < arr.length - 1 && <span className="mx-2 text-gray-400">→</span>}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="px-4 py-16 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border border-black rounded p-4 bg-white shadow-sm"><h3 className="font-bold mb-2 text-black">University Matching</h3><p className="text-black text-sm">Discover programs that fit your background and goals.</p></div>
            <div className="border border-black rounded p-4 bg-white shadow-sm"><h3 className="font-bold mb-2 text-black">Application Support</h3><p className="text-black text-sm">Guidance on requirements and submission processes.</p></div>
            <div className="border border-black rounded p-4 bg-white shadow-sm"><h3 className="font-bold mb-2 text-black">Document Generation</h3><p className="text-black text-sm">Automated templates for SOPs and CVs.</p></div>
            <div className="border border-black rounded p-4 bg-white shadow-sm"><h3 className="font-bold mb-2 text-black">APS Assistance</h3><p className="text-black text-sm">Navigate the APS certification smoothly.</p></div>
            <div className="border border-black rounded p-4 bg-white shadow-sm"><h3 className="font-bold mb-2 text-black">Visa Assistance</h3><p className="text-black text-sm">Expert help with your student visa application.</p></div>
            <div className="border border-black rounded p-4 bg-white shadow-sm"><h3 className="font-bold mb-2 text-black">Relocation Support</h3><p className="text-black text-sm">Finding accommodation and health insurance.</p></div>
          </div>
        </section>

        {/* TOOLS */}
        <section className="px-4 py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Platform Tools</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="border border-black rounded p-4 bg-white shadow-sm"><h3 className="font-bold mb-2 text-black">Eligibility Calculator</h3><p className="text-black text-sm">Check if you meet the requirements for German universities.</p></div>
              <div className="border border-black rounded p-4 bg-white shadow-sm"><h3 className="font-bold mb-2 text-black">Cost Estimator</h3><p className="text-black text-sm">Calculate your living expenses and blocked account requirements.</p></div>
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="px-4 py-20 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to start your journey?</h2>
          <div className="space-x-4">
            <button className="px-4 py-2 rounded bg-black text-white font-medium">Request Guidance</button>
            <button className="px-4 py-2 rounded bg-black text-white font-medium bg-white text-gray-800 border" >Login</button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
