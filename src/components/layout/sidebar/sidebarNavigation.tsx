'use client';

import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

import { CheckActive, cn } from '@/lib/utils';
import { NavItem } from '@/types';

interface SideBarNavigationProps extends React.HTMLAttributes<HTMLElement> {
  items: NavItem[];
}

export default function SideBarNavigation({
  className,
  items,
  ...props
}: SideBarNavigationProps) {
  return (
    <nav
      className={cn(
        'flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1',
        className,
      )}
      {...props}
    >
      {items.map((item, index) => (
        <div key={index}>
          <Link
            href={item.href}
            className={cn(
              buttonVariants({
                variant: CheckActive(item.href) ? 'secondary' : 'ghost',
              }),
              'w-full justify-start',
            )}
          >
            {item.icon}
            {item.title}
          </Link>
          {item.subMenu && (
            <div key={index} className="flex flex-col gap-2 pt-2">
              {item.subMenu.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    buttonVariants({ variant: 'outline' }),
                    'h-6 w-full justify-start',
                  )}
                >
                  {item.icon}
                  {item.title}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}
