'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/checkbox';

import { DataTableColumnHeader } from '@/components/dashboard/filaments/table/dataTableColumnHeader';
import { DataTableRowActions } from '@/components/dashboard/filaments/table/dataTableActions';
import { Filaments } from '@/types/database';

const manufacturerTitle = "Manufacturer";

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
    accessorKey: 'weight',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Weight" />
    ),
    cell: ({ row }) => {
      const currentWeight = row.original.weight;
      const remainingWeight = row.original.remainingWeight;
      const percentage = ((remainingWeight / currentWeight) * 100).toFixed(2);
      return (
        <div>
          {currentWeight} /{' '}
          <span className=" text-sm text-muted-foreground">
            {remainingWeight} ( {percentage} % )
          </span>
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
      return <div>{row.original.status}</div>;
    },
  },
  {
    accessorKey: 'tags',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tags" />
    ),
    cell: ({ row }) => {
      const tags = row.original.tags;
      if (tags.length > 3) {
        const remainingTagsCount = tags.length - 2;
        return (
          <div className="flex space-x-2">
            <span
              key={tags[0]}
              className="rounded-sm border bg-secondary/50 px-1 py-[1px] text-xs font-medium"
            >
              {tags[0]}
            </span>
            <span
              key={tags[1]}
              className="rounded-sm border bg-secondary/50 px-1 py-[1px] text-xs font-medium"
            >
              {tags[1]}
            </span>
            <span className="rounded-sm border bg-secondary/50 px-1 py-[1px] text-xs font-medium">
              +{remainingTagsCount}
            </span>
          </div>
        );
      }
      return (
        <div className="flex space-x-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-sm border bg-secondary/50 px-1 py-[1px] text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: 'Date Created',
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
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
