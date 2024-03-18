'use client';

import { CheckActive } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { NavigationInterface } from '@/types';
import { Icons } from '@/assets/icons';

type AuthButtonProps = {
  href: string;
  title: string;
  icon?: React.ReactNode;
};

function AuthButton({ href, title, icon }: AuthButtonProps) {
  return (
    <Button variant={'outline'} icon={icon} asChild>
      <Link href={href}>{title}</Link>
    </Button>
  );
}

export default function Navigation({ items, session }: NavigationInterface) {
  return (
    <div className="flex h-16 w-full items-center justify-center">
      <div className="flex gap-6 md:gap-10">
        <Link href="/" className="hidden items-center space-x-2 md:flex">
          <Icons.logo />
        </Link>

        <nav className="mr-auto flex flex-1 space-x-3 text-sm font-medium">
          {items.map((i, index) => (
            <Button key={index} asChild variant={CheckActive(i.href) ? 'secondary' : 'ghost'}>
              <Link href={i.href}>{i.title}</Link>
            </Button>
          ))}
        </nav>
      </div>

      <div className="ml-auto flex flex-1 justify-end space-x-2">
        <AuthButton href="/dashboard" title="Dashboard" icon={<Icons.dashboard className="mr-2 h-4 w-4" />} />
      </div>
    </div>
  );
}
