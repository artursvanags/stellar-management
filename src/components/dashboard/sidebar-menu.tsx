'use client';

import { Filaments } from '@/types/database';
import { User } from '@prisma/client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import DefaultLogo from '@/config/logo';
import { CheckActive } from '@/lib/utils';
import MyAccountDropdown from '@/components/dashboard/my-account/myAccountDropdown';
import { SideBarNavigation as nav } from '@/config/dashboard';

interface SideBarProps {
  data?: {
    userData: User | null;
    filamentData: Filaments[];
  };
}

export default function SideBar({ data }: SideBarProps) {
  return (
    <div className="flex h-screen flex-col p-4">
      <Link href={'/dashboard'} className="mb-4 p-2">
        <DefaultLogo className="w-32" />
      </Link>
      <div className="pb-2 font-medium text-muted-foreground">Main Menu</div>
      <nav className="flex flex-col gap-2">
        {nav.mainNav.map((item, index) => (
          <Button
            key={index}
            variant={CheckActive({ href: item.href }) ? 'secondary' : 'outline'}
            className="w-full justify-start"
            asChild
          >
            <Link href={item.href}>
              {item.icon}
              {item.title}
              {index === 0 && (
                <span className="ml-auto">
                  {data &&
                    data.filamentData.length > 0 &&
                    data.filamentData.length}
                </span>
              )}
            </Link>
          </Button>
        ))}
      </nav>

      {/* Bottom */}
      <div className="mt-auto">
        <MyAccountDropdown user={data?.userData} />
      </div>
    </div>
  );
}
