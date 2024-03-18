'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { NavItem } from '@/types';

interface DashboardNavigationProps extends React.HTMLAttributes<HTMLElement> {
  items: NavItem[];
  isCollapsed?: boolean;
}

export default function DashboardNavigation({
  className,
  items,
  isCollapsed = false,
  ...props
}: DashboardNavigationProps) {
  const path = usePathname();

  return (
    <div data-collapsed={isCollapsed} className="group flex flex-col gap-4 py-2" {...props}>
      <nav className="flex flex-col gap-2">
        {items.map((item, index) => (
          <div key={index}>
            {isCollapsed ? (
              <Link
                href={item.href}
                className={cn(
                  buttonVariants({ variant: path === item.href ? 'default' : 'ghost', size: 'icon' }),
                  'h-9 w-full',
                )}
              >
                {item.icon && <item.icon className="h-4 w-4" />}
                <span className="sr-only">{item.title}</span>
              </Link>
            ) : (
              <Link
                href={item.href}
                className={cn(
                  buttonVariants({ variant: path === item.href ? 'default' : 'ghost', size: 'sm' }),
                  path === item.href && 'bg-primary text-primary-foreground',
                  'w-full justify-start',
                )}
              >
                {item.icon && <item.icon className="mr-3 h-4 w-4" />}
                {item.title}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
}
