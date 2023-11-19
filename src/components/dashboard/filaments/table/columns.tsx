'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/checkbox';

import { DataTableColumnHeader } from '@/components/dashboard/filaments/table/dataTableColumnHeader';
import { DataTableRowActions } from '@/components/dashboard/filaments/table/dataTableActions';
import { TagActions } from '@/components/dashboard/filaments/table/TagActions';

import { Filaments } from '@/types/database';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Icons } from '@/config/assets/icons';
import { Badge } from '@/components/ui/badge';

export const columns: ColumnDef<Filaments>[] = [
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

      return (
        <div className=" flex items-center text-muted-foreground">
          {row.original.isFavorite && <Icons.Heart className="mr-2 h-4 w-4" />}{' '}
          {showFirst}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'manufacturer',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Manufacturer" />
    ),
    cell: ({ row }) => {
      return <div>{row.original.manufacturer}</div>;
    },
  },
  {
    accessorKey: 'material',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Material" />
    ),
    cell: ({ row }) => {
      return <div>{row.original.material}</div>;
    },
  },
  {
    accessorKey: 'color',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Color" />
    ),
    cell: ({ row }) => {
      return <div>{row.original.color}</div>;
    },
  },
  {
    accessorKey: 'remainingWeight',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Remaining" />
    ),
    cell: ({ row }) => {
      const netWeight = row.original.weight;
      const remainingWeight = row.original.remainingWeight;
      const percentage = parseFloat(
        ((remainingWeight / netWeight) * 100).toFixed(2),
      );
      const color =
        percentage < 50 && row.original.status !== 'archived'
          ? 'text-red-400 group-hover/weight:text-red-400'
          : 'text-muted-foreground/10 group-hover/weight:text-muted-foreground';

      return (
        <div className="group/weight">
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger className="flex items-center">
                <Icons.Info
                  className={`mr-2 h-4 w-4 text-muted-foreground/10 transition ${color}`}
                />
                {remainingWeight} g{' '}
              </TooltipTrigger>
              <TooltipContent
                side="left"
                align="center"
                sideOffset={20}
                className="bg-secondary"
              >
                <div>
                  {netWeight} g -{' '}
                  <span className="text-sm text-muted-foreground">
                    ( {percentage} % ) Remaining
                  </span>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge
          variant={
            status === 'new'
              ? 'lime'
              : status === 'used'
              ? 'amber'
              : status === 'archived'
              ? 'stone'
              : 'outline'
          }
          className="text-xs font-medium"
        >
          {status.slice(0, 1).toUpperCase() + status.slice(1)}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'tags',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tags" />
    ),
    cell: ({ row }) => <TagActions tags={row.original.tags} />,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date Created" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt).toLocaleDateString('de-DE');
      return <div>{date}</div>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions data={row.original} />,
  },
];
