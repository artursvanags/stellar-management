'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Database } from '@/types/db';

import { Badge, badgeVariants } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import Link from 'next/link';
import { Icons } from '@/config/icons';

import { DataTableColumnHeader } from '@/components/dashboard/table/dataTableColumnHeader';
import { DataTableRowActions } from '@/components/dashboard/table/dataTableActions';
import { cn } from '@/lib/utils';

const weight: { threshold: { low: number; medium: number } } = {
  threshold: {
    low: 100,
    medium: 300,
  },
};

const columnLabels = [
  {
    label: 'Task',
  },
];

export const columns: ColumnDef<Database>[] = [
  {
    accessorKey: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => {
      const value = row.getValue('id') as string;
      const showFirst = value.slice(0, 8);

      return <div className=" text-muted-foreground">{showFirst}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'manufacturer',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Manufacturer" />
    ),
  },
  {
    accessorKey: 'material',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Material" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[80px] truncate">
            {row.getValue('material')}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'color',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Color" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[80px] truncate">{row.getValue('color')}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'leftover_weight',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Color" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[80px] truncate">
            {row.getValue('leftover_weight')}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'stock_weight',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Weight" />
    ),
    cell: ({ row }) => {
      const stock_weight = parseFloat(row.getValue('stock_weight'));
      const leftover_weight = parseFloat(row.getValue('leftover_weight'));
      const leftover_percent = (leftover_weight / stock_weight) * 100;

      const formatWeight = (weight: number): string => {
        return new Intl.NumberFormat('en-US', {
          style: 'unit',
          unit: weight >= 1000 ? 'kilogram' : 'gram',
          unitDisplay: 'short',
        }).format(weight >= 1000 ? weight / 1000 : weight);
      };
      // Check if leftover_weight is available, and if not, display only the stock_weight
      if (!isNaN(leftover_weight)) {
        let leftoverClass = 'text-muted-foreground';
        if (
          leftover_weight <= weight.threshold.medium &&
          leftover_weight > weight.threshold.low
        ) {
          leftoverClass = 'text-orange-500';
        } else if (leftover_weight <= weight.threshold.low) {
          leftoverClass = 'text-red-500';
        }
        return (
          <div>
            {formatWeight(stock_weight)}
            {' / '}
            <span className={leftoverClass}>
              {formatWeight(leftover_weight)} ({leftover_percent.toFixed(2)}%)
            </span>{' '}
          </div>
        );
      } else {
        return <div>{formatWeight(stock_weight)}</div>;
      }
    },
  },
  {
    accessorKey: 'tags',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tags" />
    ),
    cell: ({ row }) => {
      const tags = row.getValue('tags');
      if (typeof tags === 'string') {
        const tagList = tags.split(',').map((tag: string) => (
          <Badge key={tag} variant="outline">
            {tag.trim()}
          </Badge>
        ));
        return <div className="flex space-x-1">{tagList}</div>;
      } else {
        return (
          <>
            <Link href="/" className={badgeVariants({ variant: 'secondary' })}>
              <Icons.plus className="" /> Add
            </Link>
          </>
        );
      }
    },
  },

  {
    accessorKey: 'state',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="State" />
    ),
    cell: ({ row }) => {
      const filament_state: string = row.getValue('state');
      const state_color =
        filament_state.toLowerCase() === 'new'
          ? 'bg-badge-greenForeground border-badge-green'
          : filament_state.toLowerCase() === 'used'
          ? 'bg-badge-amberForeground border-badge-amber'
          : 'bg-badge-grayForeground border-badge-gray';
      const className = cn(`${state_color}`);
      return (
        <Badge variant="outline" className={className}>
          {filament_state}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date Created" />
    ),
    cell: ({ row }) => {
      const date = row.getValue('created_at');
      const formatted = new Date(date as string).toLocaleString();
      return <div>{formatted}</div>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
