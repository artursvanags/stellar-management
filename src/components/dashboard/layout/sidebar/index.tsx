'use client';

import Link from 'next/link';

import { User } from '@prisma/client';

import DefaultLogo from '@/config/assets/logo';
import { SideBarNavigation as nav } from '@/config/dashboard';

import MyAccountDropdown from '@/components/dashboard/components/my-account-dropdown';
import SideBarNavigation from '@/components/navigation/sidebar-navigation';

export default function SideBar({ user }: { user: User }) {
  
  return (
    <div className="flex h-screen flex-col p-4">
      <Link href={'/dashboard'} className="mb-4 p-2">
        <DefaultLogo className="w-32" />
      </Link>
      <div className="pb-2 font-medium text-muted-foreground">Main Menu</div>
      <SideBarNavigation items={nav.mainNav} className='flex-col flex' />
      <div className="mt-auto">
        <MyAccountDropdown user={user} />
      </div>
    </div>
  );
}
