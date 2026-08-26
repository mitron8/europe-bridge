import { notFound } from 'next/navigation';

// ponytail: YAGNI. We handle all 5 empty dashboard sub-routes via one dynamic route 
// instead of duplicating 5 folders with identical placeholder files.
const VALID_SECTIONS = [
  'leads', 'students', 'deadlines', 'notices', 'account'
];

export default async function CounsellorSectionPage({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;

  if (!VALID_SECTIONS.includes(section)) {
    notFound();
  }

  const title = section.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-gray-500 mb-8">Manage your {title.toLowerCase()}</p>
      
      <div className="border-2 border-dashed border-gray-300 rounded-lg h-96 flex items-center justify-center text-gray-400">
        Content will be added here.
      </div>
    </div>
  );
}
