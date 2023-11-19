'use client';

import Link from 'next/link';

import { User } from '@prisma/client';

import DefaultLogo from '@/config/assets/logo';
import { SideBarNavigation as nav } from '@/config/dashboard';

import MyAccountDropdown from '@/components/dashboard/sidebar/components/myAccountDropdown';
import SideBarNavigation from '@/components/layout/sidebar/sidebarNavigation';

export default function SideBar({ user }: { user: User | null }) {
  return (
    <div className="flex h-screen flex-col p-4">
      <Link href={'/dashboard'} className="mb-4 p-2">
        <DefaultLogo className="w-32" />
      </Link>
      <div className="pb-2 font-medium text-muted-foreground">Main Menu</div>
      <SideBarNavigation items={nav.mainNav} />
      <div className="mt-auto">
        <MyAccountDropdown user={user} />
      </div>
    </div>
  );
}
