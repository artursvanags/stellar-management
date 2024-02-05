'use client';
import { DataTableViewOptions } from '@/components/dashboard/filaments/components/table/dataTableViewOptions';
import { DataTableFacetedFilter } from '@/components/dashboard/filaments/components/table/dataTableFilter';

import { Icons } from '@/config/assets/icons';
import { Table } from '@tanstack/react-table';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

import { DeleteAlertModal } from '@/components/modals/deleteAlertModal';

import React, { useState, useEffect } from 'react';

import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

import { Filaments } from '@/types/database';
import { filamentStatus } from '@/config/filament';
import { getUserTags } from '@/lib/actions/tags-data-actions';


interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const router = useRouter();
  const { toast } = useToast();
  const [tags, setTags] = useState<Filaments['tags']>();

  useEffect(() => {
    const fetchData = async () => {
      const tagsData = await getUserTags();
      setTags(tagsData);
    };
    fetchData();
  }, []);
  const [data, setData] = useState<Filaments[]>([]);
  const [openAlertModal, setAlertModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const allFavorite = data.every((item) => item.isFavorite);

  const selectedRowModel = table.getSelectedRowModel();
  const selectedRowIDs = selectedRowModel.rows.map((row) => row.original);

  useEffect(() => {
    setData(selectedRowIDs as Filaments[]);
  }, [table, table.getSelectedRowModel().rows.length]);

  const onDelete = async () => {
    setLoading(true);
    try {
      await fetch(`/api/filaments/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data.map((item) => item.id)),
      });
    } catch (error) {
      console.error(error);
    }
    table?.resetRowSelection();
    setAlertModalOpen(false);
    setLoading(false);
    router.refresh();
    toast({
      description: `You have deleted ${data.length} filaments.`,
    });
  };

  const onArchive = async () => {
    setLoading(true);
    try {
      await fetch(`/api/filaments/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ids: data.map((item) => item.id),
          data: { status: filamentStatus.archived },
        }),
      });
    } catch (error) {
      console.error(error);
    }

    table?.resetRowSelection();

    setAlertModalOpen(false);
    setLoading(false);
    router.refresh();
    toast({
      description: `You have archived ${data.length} filaments.`,
    });
  };

  const toggleFavorite = async () => {
    try {
      await fetch(`/api/filaments/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ids: data.map((item) => item.id),
          data: { isFavorite: !allFavorite },
        }),
      });
    } catch (error) {
      console.error(error);
    }
    table?.resetRowSelection();

    setAlertModalOpen(false);
    setLoading(false);
    router.refresh();
    toast({
      description: `You have favorited ${data.length} filaments.`,
    });
  };

  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <>
      <DeleteAlertModal
        data={data}
        isOpen={openAlertModal}
        onClose={() => setAlertModalOpen(false)}
        onAction={onDelete}
        loading={loading}
      />

      <div className="flex items-center gap-2 ">
        {table.getSelectedRowModel().rows.length > 0 && (
          <div className="flex items-center gap-2 ">
            <Button
              variant={'outline'}
              className="border border-dashed"
              onClick={() => table.toggleAllRowsSelected()}
              disabled={table?.getIsAllRowsSelected()}
            >
              Select all
            </Button>
            <Button
              variant={'outline'}
              className="border border-dashed"
              onClick={() => table?.resetRowSelection()}
            >
              Clear selection
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={'outline'} className="border border-dashed">
                  Bulk Action
                  <Icons.sortAsc className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={toggleFavorite}
                  className="cursor-pointer"
                >
                  {allFavorite ? 'Un-favorite' : 'Favorite'}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={onArchive}
                  className="cursor-pointer"
                >
                  Archive
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setAlertModalOpen(true)}
                  className="cursor-pointer text-red-500"
                >
                  Delete
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>
                  {table.getSelectedRowModel().rows.length} selected
                </DropdownMenuLabel>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
        {table.getSelectedRowModel().rows.length > 0 && (
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{' '}
            <span>
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </span>
          </div>
        )}
        <div className="ml-auto flex gap-2">
          {table.getColumn('status') && (
            <DataTableFacetedFilter
              column={table.getColumn('status')}
              title="Status"
              options={Object.values(filamentStatus)}
            />
          )}
          {table.getColumn('tags') && (
            <DataTableFacetedFilter
              column={table.getColumn('tags')}
              title="Tags"
              options={
                tags
                  ? tags.map((tag) => ({
                      label: tag.name,
                      value: tag.name,
                    }))
                  : tags
                    ? [{ label: 'Loading...', value: 'Loading...' }]
                    : []
              }
            />
          )}
        </div>

        <DataTableViewOptions table={table} />
      </div>
    </>
  );
}
