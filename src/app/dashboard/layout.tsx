import SideBar from '@/components/dashboard/sidebar-menu';
import SiteHeader from '@/components/dashboard/page-header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col">
      <SiteHeader />

        <div className="flex h-full flex-row">
          <aside className="primary-border w-64 overflow-y-auto border-r">
            <SideBar />
          </aside>
          <main className="flex-1 p-2">{children}</main>
        </div>

    </div>
  );
}
