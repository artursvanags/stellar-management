'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { NavItem } from '@/types';

interface SideBarNavigationProps extends React.HTMLAttributes<HTMLElement> {
  items: NavItem[];
}

export default function SideBarNavigation({
  className,
  items,
  ...props
}: SideBarNavigationProps) {
  const path = usePathname();
  return (
    <nav className={cn('', className)} {...props}>
      <div className="flex flex-col gap-1">
        {items.map((item, index) => (
          <div key={index}>
            <Link href={item.disabled ? '/' : item.href}>
              <span
                className={cn(
                  'group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-secondary hover:text-secondary-foreground',
                  path === item.href ? 'bg-secondary text-secondary-foreground' : 'transparent',
                  item.disabled && 'cursor-not-allowed opacity-80',
                )}
              >
                {item.icon}
                {item.title}
              </span>
            </Link>
            {item.subMenu &&
              item.subMenu.map((subItem, subIndex) => (
                <Link
                  key={subIndex}
                  href={subItem.disabled ? '/' : subItem.href}
                >
                  <span
                    className={cn(
                      'group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-secondary hover:text-accent-foreground',
                      path === subItem.href ? 'bg-secondary' : 'transparent',
                      subItem.disabled && 'cursor-not-allowed opacity-80',
                    )}
                  >
                    {subItem.icon}
                    {subItem.title}
                  </span>
                </Link>
              ))}
          </div>
        ))}
      </div>
    </nav>
  );
}
