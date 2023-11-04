'use client';

import ThemeToggleButton from '@/components/global/ThemeToggleButton';

export default function DashboardFooter() {
  return (
    <div className=" container flex h-16 w-full items-center justify-center">
      Version 1.0
      <div className="ml-auto flex flex-1 justify-end space-x-2">
        <ThemeToggleButton />
      </div>
    </div>
  );
}
