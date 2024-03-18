'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/checkbox';

import { DataTableColumnHeader } from '@/components/dashboard/filaments/components/table/data-table-header';
import { DataTableRowActions } from '@/components/dashboard/filaments/components/table/data-table-actions';

import { FilamentDTO } from '@/types/database';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Icons } from '@/assets/icons';

import { TagColumn } from '@/components/dashboard/filaments/components/table/columns/tag-column';
import { StatusColumn } from '@/components/dashboard/filaments/components/table/columns/status-column';
import { Tags } from '@prisma/client';
import { UseUserData } from '@/lib/context/userContext';

export const columns: ColumnDef<FilamentDTO>[] = [
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
    header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
    cell: ({ row }) => {
      const value = row.getValue('id') as string;
      const showFirst = value.slice(0, 8);

      return (
        <div className=" flex items-center text-muted-foreground">
          {row.original.isFavorite && <Icons.Heart className="mr-2 h-4 w-4" />} {showFirst}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'manufacturer',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Manufacturer" />,
    cell: ({ row }) => {
      return <div>{row.original.manufacturer}</div>;
    },
  },
  {
    accessorKey: 'material',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Material" />,
    cell: ({ row }) => {
      return <div>{row.original.material}</div>;
    },
  },
  {
    accessorKey: 'color',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Color" />,
    cell: ({ row }) => {
      return <div>{row.original.color}</div>;
    },
  },
  {
    accessorKey: 'remainingWeight',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Remaining" />,
    cell: ({ row }) => {
      const userData = UseUserData();
      const netWeight = row.original.weight;
      const remainingWeight = row.original.remainingWeight;
      const weightThreshold = userData?.settings ? parseFloat(userData.settings.weight_threshold) : 0;
      const percentage = parseFloat(((remainingWeight / netWeight) * 100).toFixed(2));
      const color =
        remainingWeight < weightThreshold && row.original.status !== 'archived'
          ? 'text-red-400 group-hover/weight:text-red-400'
          : 'text-muted-foreground/10 group-hover/weight:text-muted-foreground';
      return (
        <div className="group/weight">
          <TooltipProvider delayDuration={200}>
            <Tooltip>
              <TooltipTrigger className="flex items-center">
                <Icons.Info className={`mr-2 h-4 w-4 text-muted-foreground/10 transition ${color}`} />
                {remainingWeight} g{' '}
              </TooltipTrigger>
              <TooltipContent side="left" align="center" sideOffset={20} className="bg-secondary">
                <div>
                  {netWeight} g - <span className="text-sm text-muted-foreground">( {percentage} % ) Remaining</span>
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
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => <StatusColumn status={row.original.status} />,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    sortingFn: (rowA, rowB) => {
      const statusA = rowA.original.status === 'archived';
      const statusB = rowB.original.status === 'archived';
      const statusC = rowA.original.status === 'in_use';
      const statusD = rowB.original.status === 'in_use';
      const userData = UseUserData();
      const autoArchiveSort = userData?.settings.auto_sort_archive;

      if (autoArchiveSort && statusA !== statusB) {
        return statusA ? 1 : -1;
      } else if (statusC !== statusD) {
        // sort by in_use status
        return statusC ? -1 : 1;
      } else {
        // If both rows have the same status, sort by 'createdAt'
        return new Date(rowB.original.createdAt).getTime() - new Date(rowA.original.createdAt).getTime();
      }
    },
  },
  {
    accessorKey: 'tags',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tags" />,
    cell: ({ row }) => <TagColumn data={row.original} />,
    filterFn: (row, id, value) => {
      const rowTags: Tags[] = row.getValue(id);
      return rowTags.some((tag) => value.includes(tag.name));
    },
    sortingFn: (rowA, rowB) => {
      return rowA.original.tags.length - rowB.original.tags.length;
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Date Created" />,
    cell: ({ row }) => {
      const userData = UseUserData();
      const date = new Date(row.original.createdAt).toLocaleDateString(userData?.settings.timezone_format);
      return <div>{date}</div>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions data={row.original} />,
  },
];
