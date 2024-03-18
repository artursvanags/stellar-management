'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MyAccount, Spinner, ThemeIcons } from '@/assets/icons';
import { SideBarNavigation as nav } from '@/config/navigation';
import { cn } from '@/lib/utils';
import { signOut } from 'next-auth/react';
import { Switch } from '@/components/ui/switch';

import { useLayoutEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { UseUserData } from '@/lib/context/userContext';

const MyAccountDropdown = ({ isCollapsed }: { isCollapsed: boolean }) => {
  const userData = UseUserData();
  const { setTheme, resolvedTheme } = useTheme();

  const buttonRef = useRef<HTMLDivElement>(null);
  const [buttonWidth, setButtonWidth] = useState(0);

  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  // Use useLayoutEffect to measure the button width after DOM updates
  useLayoutEffect(() => {
    if (buttonRef.current) {
      setButtonWidth(buttonRef.current.offsetWidth);
    }
  }, [buttonRef]); // Dependency on user, since the button width could change based on the user name

  // Define toggle function to switch between light and dark mode
  const toggleTheme = () => {
    if (resolvedTheme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  async function handleSignOut() {
    setLoading(true);
    try {
      await signOut({
        callbackUrl: `${window.location.origin}/auth/login`,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
  if (!userData) return null;
  return (
    <>
      <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
        <DropdownMenuTrigger asChild>
          <div
            ref={buttonRef}
            className={cn(buttonVariants({ variant: 'ghost' }), ' h-10 w-full cursor-pointer gap-2 p-2 ')}
          >
            <Avatar className=" h-8 w-8 rounded-sm">
              <AvatarImage src={userData.image || ''} />
              <AvatarFallback>{userData.name?.split(' ').map((i) => i.slice(0, 1))}</AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <>
                <div className="flex flex-col text-xs">
                  <span className=" font-normal text-muted-foreground">My Account</span>
                  <span>{userData.name}</span>
                </div>
                <MyAccount.Chevron className="ml-auto h-4 w-4" />
              </>
            )}
          </div>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="min-w-full"
          style={{ minWidth: `${buttonWidth}px` }} // Ensures dropdown width aligns with the button
          align={`${isCollapsed ? 'end' : 'center'}`}
          side={isCollapsed ? 'left' : undefined}
          sideOffset={isCollapsed ? 20 : undefined}
        >
          <DropdownMenuLabel className="rounded-sm bg-secondary/50">
            <div className="flex flex-col text-xs">
              <span className=" font-normal text-muted-foreground">Current subscription:</span>
              <span>Free tier</span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div>
            {nav.accountDropdown.map((i, index) => (
              <Link key={index} href={i.href}>
                <DropdownMenuItem className="cursor-pointer">
                  {i.icon && <i.icon className="mr-3 h-4 w-4" />}
                  {i.title}
                  <DropdownMenuShortcut>{i.shortcut}</DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>
            ))}
          </div>
          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={(event) => {
              event.preventDefault();
              toggleTheme();
            }}
            className="w-full cursor-pointer"
          >
            <ThemeIcons.Sun className="mr-3 h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <ThemeIcons.Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            Switch to {resolvedTheme === 'light' ? 'dark' : 'light'} mode
            <Switch className="ml-auto" checked={resolvedTheme === 'dark'} />
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer text-red-500"
            onSelect={(event) => {
              event.preventDefault();
              handleSignOut();
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner className="mr-3 h-4 w-4 animate-spin" />
                Signing you out...
              </>
            ) : (
              <>
                <MyAccount.Logout className="mr-3 h-4 w-4" />
                Sign out
              </>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
export default MyAccountDropdown;
