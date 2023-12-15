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
    <div className="flex h-screen flex-col p-4">
      <Link href={'/dashboard'} className="mb-4 p-2">
        <Logo className="w-28" />
      </Link>
      <div className="pb-2 font-medium text-muted-foreground">Main Menu</div>
      <SideBarNavigation items={nav.mainNav} className="flex flex-col" />
      <div className="mt-auto">
        <MyAccountDropdown user={user} />
      </div>
    </div>
  );
};

export default SideBar;
