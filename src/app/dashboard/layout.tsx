import DashboardFooter from '@/components/dashboard/footer';
import DashboardHeader from '@/components/dashboard/header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <DashboardHeader />
      </header>

      <main className="container flex flex-1 py-2">{children}</main>

      <footer className="border-t">
        <DashboardFooter />
      </footer>
    </div>
  );
}
