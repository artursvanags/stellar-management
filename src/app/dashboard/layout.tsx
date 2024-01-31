import SideBar from '@/components/dashboard/layout/sidebar';
import { getUser } from '@/lib/actions/get-data-actions';
import { UserDataProvider } from '@/lib/context/userContext';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getUser();
  return (
    <UserDataProvider data={data}>
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
    </UserDataProvider>
  );
}
