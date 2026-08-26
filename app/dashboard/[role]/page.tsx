import { Sidebar } from '@/components/Sidebar';
import { notFound } from 'next/navigation';

// ponytail: YAGNI. We can use a single dynamic route for all 10 dashboard pages 
// rather than duplicating boilerplate across 10 folders. 
// Valid roles are hardcoded to match the user's requested routes.
const VALID_ROLES = [
  'financial',
  'marketing', 'application-specialist', 'visa-specialist', 'support', 'content'
];

export default async function DashboardPage({ params }: { params: Promise<{ role: string }> }) {
  const { role } = await params;
  
  if (!VALID_ROLES.includes(role)) {
    notFound();
  }

  // Format the role for display (e.g. "super-admin" -> "Super Admin")
  const roleName = role.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar role={role} />
      
      <main className="flex-1 p-8 overflow-auto">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-500">{roleName} View</p>
        </div>
        
        <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center text-gray-400">
          Main content placeholder for {roleName}
        </div>
      </main>
    </div>
  );
}
