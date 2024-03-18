'use client';

import Link from 'next/link';
import React from 'react';

import { LogoIcon } from '@/assets/logo';
import { SideBarNavigation as nav } from '@/config/navigation';
import { SidebarIcons } from '@/assets/icons';

import MyAccountDropdown from '@/components/dashboard/components/my-account-dropdown';
import DashboardNavigation from '@/components/navigation/dashboard-navigation';

import { Button } from '@/components/ui/button';

interface SideBarProps {
  setSidebarCollapsed: (collapsed: boolean) => void;
  isCollapsed: boolean;
  className?: string;
  props?: React.HTMLProps<HTMLDivElement>;
}

const SideBar = ({ setSidebarCollapsed, isCollapsed, className, props }: SideBarProps) => {
  return (
    <div className={className} {...props}>
      <Button
        onClick={() => setSidebarCollapsed(!isCollapsed)}
        className="absolute -right-10 top-2 h-8 w-8 rounded-md text-muted-foreground"
        size="icon"
        variant={'ghost'}
        aria-label="Toggle Sidebar"
      >
        {!isCollapsed ? (
          <SidebarIcons.SidebarOpen className="h-6 w-6" />
        ) : (
          <SidebarIcons.SidebarClose className="h-6 w-6" />
        )}
      </Button>
      <div className="flex h-screen flex-col p-2">
        <div className="flex h-20 items-center border-b">
          <Link href={`/dashboard`} className="inline-flex h-9 w-full items-center">
            <LogoIcon className="p-2" />
            {!isCollapsed && <p className="font-semi align-middle">Stelpine</p>}
          </Link>
        </div>
        <div>
          <DashboardNavigation items={nav.mainNav} isCollapsed={isCollapsed} />
        </div>
        <div className="mt-auto">
          <MyAccountDropdown isCollapsed={isCollapsed} />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
