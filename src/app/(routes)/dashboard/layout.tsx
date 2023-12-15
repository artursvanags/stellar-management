import SetupAccount from '@/components/auth/setup-account';
import SideBar from '@/components/dashboard/layout/sidebar';
import { getData } from '@/lib/utils/get-data';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await getData();
  if (!user) return null;
  if (user && !user.name) return <SetupAccount {...user} />;
  return (
    <div className="flex max-h-screen min-h-screen">
      <div className="hidden w-[280px] flex-none border-r bg-secondary/30 lg:block">
        <SideBar />
      </div>
      <div className="flex flex-1 flex-col">
        {/* <header className="border-b">
          <DashboardHeader />
        </header> */}
        <main className="flex-grow overflow-y-auto px-8">{children}</main>
      </div>
    </div>
  );
}
