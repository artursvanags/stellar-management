import DashboardHeader from '@/components/dashboard/header';
import SideBar from '@/components/dashboard/sidebar-menu';
import { getData } from '@/lib/actions/getData';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getData();
  return (
    // Flex container for the entire layout
    <div className="flex max-h-screen min-h-screen">
      {/* Sidebar that takes up space but does not overlap the main content */}
      <div className="w-[280px] flex-none border-r bg-secondary/30">
        <SideBar data={data} />
      </div>

      {/* Main content area with its own scrolling */}
      <div className="flex flex-1 flex-col">
        {/* Header remains visible at the top */}
        <header className="border-b">
          <DashboardHeader />
        </header>
        {/* Main content area is only component that scrolls */}
        <main className="container flex-grow overflow-y-auto px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
