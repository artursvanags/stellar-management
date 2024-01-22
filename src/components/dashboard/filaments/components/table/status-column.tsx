'use client';

import { Icons } from '@/config/assets/icons';
import { Badge } from '@/components/ui/badge';

import { Filaments } from '@/types/database';

interface StatusColumnProps {
  status: Filaments['status'];

}

export function StatusColumn({ status }: StatusColumnProps) {
  let color = '';
  if (status === 'new') {
    color = 'dark:bg-emerald-950 bg-emerald-400 text-emerald-900 dark:text-emerald-500';
  } else if (status === 'used') {
    color = 'dark:bg-orange-950 bg-orange-400 text-orange-900 dark:text-orange-500';
  } else if (status === 'archived') {
    color = 'dark:bg-neutral-900 bg-neutral-200 text-neutral-500 dark:text-neutral-500';
  } else {
    color = 'text-muted-foreground';
  }
  return (
    <Badge variant={'outline'} className={`border-transparent text-xs font-medium ${color}`}>
      <Icons.Dot strokeWidth={4} className="h-4 w-4" />
      {status.slice(0, 1).toUpperCase() + status.slice(1)}
    </Badge>
  );
}
