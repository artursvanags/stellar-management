'use client';

import ThemeToggleButton from '@/components/global/theme-toggle-button';

export default function DashboardFooter() {
  return (
    <div
      className="'\
    4125+
      flex h-16 w-full items-center justify-center"
    >
      Version 1.0
      <div className="ml-auto flex flex-1 justify-end space-x-2">
        <ThemeToggleButton />
      </div>
    </div>
  );
}
