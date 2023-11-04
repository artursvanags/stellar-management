'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { MyAccount } from '@/config/icons';
import { DashboardNavigation as nav } from '@/config/dashboard';

import { signOut } from 'next-auth/react';

export default function MyAccountButton() {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={'outline'}>My Account</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={'end'} className="w-48">
          <DropdownMenuLabel className="flex flex-1 items-center align-middle">
            <span>My Account</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div>
            {nav.accountDropdown.map((i, index) => (
              <DropdownMenuItem
                key={index} // You had an extra closing curly brace here
                className="cursor-pointer"
              >
                {i.icon}
                {i.title}
                <DropdownMenuShortcut>{i.shortcut}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer text-red-500"
            onSelect={(event) => {
              event.preventDefault();
              signOut({
                callbackUrl: `${window.location.origin}/auth/login`,
              });
            }}
          >
            <MyAccount.Logout className="mr-3 h-4 w-4" />
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
