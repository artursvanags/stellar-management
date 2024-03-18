'use client';
import SideBar from '@/components/dashboard/layout/sidebar';
import useLocalStorage from '@/lib/hooks/use-local-storage';
import { useEffect, useState } from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // Initialize state with the value from localStorage or default to false
  const [sidebarCollapsed, setSidebarCollapsed] = useLocalStorage('sidebarCollapsed', false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="flex max-h-screen min-h-screen">
      <div className="relative hidden lg:block">
        <SideBar
          className={`transition-width flex-none border-r bg-secondary/50 duration-300 ${sidebarCollapsed ? 'w-14' : 'w-[272px]'}`}
          isCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
        />
      </div>
      <div className="flex flex-1 flex-col">
        {/* <header className="border-b">
          <DashboardHeader />
        </header> */}
        <main className="flex-grow overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
