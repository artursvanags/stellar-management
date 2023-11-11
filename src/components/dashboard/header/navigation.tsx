'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Icons } from '@/config/icons';
import { DashboardNavigation as nav } from '@/config/dashboard';

import { FilamentModalButton } from '@/components/modals/filamentModal';

import { Filaments } from '@/types/database';

interface NavigationProps {
  data: Filaments[];
}

export default function Navigation({ data }: NavigationProps) {
  return (
    <div className="flex h-16 w-full items-center justify-center">
      <div className="flex gap-6 md:gap-10">
        <Link href="/" className="hidden items-center space-x-2 md:flex">
          <Icons.logo />
        </Link>

        <nav className="mr-auto flex flex-1 space-x-3 text-sm font-medium">
          {nav.mainNav.map((i, index) => (
            <Button key={index} variant={'outline'}>
              <Link href={i.href}>
                {data && data.length > 0 && i.showDataLength ? (
                  <span className=" -ml-1 mr-2 rounded border bg-secondary/50 p-1 text-xs font-semibold text-secondary-foreground">
                    {data.length}
                  </span>
                ) : null}
                {i.title}
              </Link>
            </Button>
          ))}
        </nav>
      </div>

      <div className="ml-auto flex flex-1 justify-end space-x-2">
        <FilamentModalButton />
      </div>
    </div>
  );
}
