'use client';

interface DashboardHeaderProps {
  title: string;
  description?: string;
}

const DashboardHeader = ({ title, description }: DashboardHeaderProps) => {
  return (
    <header className="sticky top-0 z-50 lg:static">
      <div className="lg:hidden">
        {/* <MobileNavigation
          items={marketingNavigation.mainNav}
          session={session}
        /> */}
      </div>
      <div className="hidden lg:block">
        <div className="flex h-16 flex-col">
          <h1 className="text-2xl font-semibold">{title}</h1>
          <div className="text-muted-foreground ">{description}</div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
