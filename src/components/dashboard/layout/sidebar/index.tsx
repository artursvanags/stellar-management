import Link from 'next/link';

import Logo from '@/config/assets/logo';
import { SideBarNavigation as nav } from '@/config/dashboard';

import MyAccountDropdown from '@/components/dashboard/components/my-account-dropdown';
import SideBarNavigation from '@/components/navigation/sidebar-navigation';
import { getData } from '@/lib/utils/get-data';

const SideBar = async () => {
  const { user } = await getData();
  if (!user) return null;

  return (
    <div className="flex h-screen flex-col gap-4 p-4">
      <div className="flex h-20 items-center border-b">
        <Link href={'/dashboard'}>
          <Logo className="w-24" />
        </Link>
      </div>
      <div>
        <div className="pb-2 text-sm font-medium text-muted-foreground">
          MAIN
        </div>
        <SideBarNavigation items={nav.mainNav} className="flex flex-col" />
      </div>
      <div className="mt-auto">
      <SideBarNavigation items={nav.bottomNav} className="flex flex-col" />
        <MyAccountDropdown user={user} />
      </div>
    </div>
  );
};

export default SideBar;
