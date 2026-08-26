import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
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
            <Button>Request Guidance</Button>
            <Button className="bg-white text-blue-600 border border-blue-600">Explore Services</Button>
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
            <Card title="AI Matching" description="Find the perfect university and program tailored to your profile." />
            <Card title="Expert Guidance" description="Get help with applications, documents, and visas from our experts." />
            <Card title="Relocation Support" description="Settle in Germany with ease, from housing to registration." />
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
            <Card title="University Matching" description="Discover programs that fit your background and goals." />
            <Card title="Application Support" description="Guidance on requirements and submission processes." />
            <Card title="Document Generation" description="Automated templates for SOPs and CVs." />
            <Card title="APS Assistance" description="Navigate the APS certification smoothly." />
            <Card title="Visa Assistance" description="Expert help with your student visa application." />
            <Card title="Relocation Support" description="Finding accommodation and health insurance." />
          </div>
        </section>

        {/* TOOLS */}
        <section className="px-4 py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Platform Tools</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <Card title="Eligibility Calculator" description="Check if you meet the requirements for German universities." />
              <Card title="Cost Estimator" description="Calculate your living expenses and blocked account requirements." />
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="px-4 py-20 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to start your journey?</h2>
          <div className="space-x-4">
            <Button>Request Guidance</Button>
            <Button className="bg-white text-gray-800 border">Login</Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
