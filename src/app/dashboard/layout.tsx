import SetupAccount from '@/components/auth/components/SetupAccount';
import DashboardHeader from '@/components/dashboard/layout/header';
import SideBar from '@/components/dashboard/sidebar/sidebar';

import { getData } from '@/hooks/getData';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await getData();

  if (user && !user.name) {
    return <SetupAccount {...user} />;
  }
  return (
    <div className="flex max-h-screen min-h-screen">
      <div className="w-[280px] flex-none border-r bg-secondary/30">
        <SideBar user={user} />
      </div>

      <div className="flex flex-1 flex-col">
        <header className="border-b">
          <DashboardHeader />
        </header>

        <main className="flex-grow overflow-y-auto px-8">{children}</main>
      </div>
    </div>
  );
}
