'use client';

import { Icons } from '@/assets/icons';
import { Badge } from '@/components/ui/badge';

import { FilamentDTO } from '@/types/database';

interface StatusColumnProps {
  status: FilamentDTO['status'];
}

const statusBadge = {
  new: {
    label: 'New',
    color: 'bg-emerald-400 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-500',
  },
  used: {
    label: 'Used',
    color: 'bg-yellow-400 text-yellow-900 dark:bg-yellow-950 dark:text-yellow-500',
  },
  archived: {
    label: 'Archived',
    color: 'bg-neutral-200 text-neutral-500 dark:bg-neutral-900 dark:text-neutral-500',
  },
  in_use: {
    label: 'In Use',
    color: 'bg-orange-400 text-orange-900 dark:bg-orange-950 dark:text-orange-500',
  },
};

export function StatusColumn({ status }: StatusColumnProps) {
  const { label, color } = statusBadge[status as keyof typeof statusBadge];
  const isStatusInUse = status === 'in_use';

  return (
    <Badge variant="outline" className={`border-transparent text-xs font-medium ${color}`}>
      {isStatusInUse ? (
        <div className="relative h-4 w-4">
          <Icons.Dot strokeWidth={4} className="absolute h-4 w-4 animate-ping" />
          <Icons.Dot strokeWidth={4} className="h-4 w-4" />
        </div>
      ) : (
        <Icons.Dot strokeWidth={4} className="h-4 w-4" />
      )}
      {label}
    </Badge>
  );
}
