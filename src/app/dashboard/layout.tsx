import SetupAccount from '@/components/auth/setup-account';
import SideBar from '@/components/dashboard/layout/sidebar';
import { getData } from '@/lib/actions/get-data';

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
      <div className="hidden w-[272px] flex-none border-r bg-secondary/30 lg:block">
        <SideBar />
      </div>
      <div className="flex flex-1 flex-col">
        {/* <header className="border-b">
          <DashboardHeader />
        </header> */}
        <main className="flex-grow overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
