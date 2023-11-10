import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-sm border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80',
        outline: 'text-foreground',
        lime: 'bg-lime-200 dark:bg-lime-950/50 text-lime-700 dark:text-lime-400 border-lime-400 dark:border-lime-600',
        amber:
          'bg-amber-200 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border-amber-400 dark:border-amber-600',
        stone:
          'bg-gray-200 dark:bg-stone-950/50 text-gray-700 dark:text-stone-400 border-gray-400 dark:border-stone-600',
        gray: 'text-muted-foreground hover:bg-secondary hover:text-primary',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
