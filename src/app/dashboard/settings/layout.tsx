import { Separator } from '@/components/ui/separator';

import DashboardNavigation from '@/components/navigation/dashboard-navigation';
import { SettingsSideBarNavigation as nav } from '@/config/navigation';

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      <div className="container space-y-6 p-10 pb-16">
        <h1 className="text-4xl font-semibold tracking-tight">Settings</h1>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="lg:w-1/6">
            <DashboardNavigation items={nav.mainNav} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  );
}
