import { notFound } from 'next/navigation';

const VALID_SECTIONS = [
  'students', 'counsellors', 'admins', 'marketing', 'finance', 
  'content', 'reports', 'universities', 'notices', 'account'
];

export default async function SuperAdminSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;

  if (!VALID_SECTIONS.includes(section)) {
    notFound();
  }

  let title = section.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
  if (section === 'universities') {
    title = 'University Database & Listings';
  } else if (section === 'reports') {
    title = 'Reports & Analytics';
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-gray-500 mb-8">{title.toLowerCase()} functionality will be added here.</p>
      
      <div className="border-2 border-dashed border-gray-300 rounded-lg h-96 flex items-center justify-center text-gray-400">
        Content will be added here.
      </div>
    </div>
  );
}
