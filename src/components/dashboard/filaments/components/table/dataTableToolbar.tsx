'use client';
import { DataTableViewOptions } from '@/components/dashboard/filaments/components/table/dataTableViewOptions';
import { DataTableFacetedFilter } from '@/components/dashboard/filaments/components/table/dataTableFilter';

import { Icons } from '@/config/assets/icons';
import { Table, isRowSelected } from '@tanstack/react-table';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { DeleteAlertModal } from '@/components/modals/deleteAlertModal';

import React, { useRef, useState, useEffect } from 'react';

import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

import { deleteFilaments, updateFilaments } from '@/lib/utils/filament-actions';
import { Filaments } from '@/types/database';
import { filamentStatus } from '../../constants';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const router = useRouter();
  const { toast } = useToast();

  const [data, setData] = useState<Filaments[]>([]);
  const [openAlertModal, setAlertModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const allFavorite = data.every((item) => item.isFavorite);
  const selectedRows = table.getSelectedRowModel().rows;
  const selectedRowIDs = selectedRows.map((row) => row.original);

  useEffect(() => {
    setData(selectedRowIDs as Filaments[]);
    console.log([
      'Selected Rows:' + table.getSelectedRowModel().rows.length,
      'Visible Rows:' + table.getRowModel().rows.length,
    ]);
  }, [table, table.getSelectedRowModel().rows.length]);

  const onDelete = async () => {
    setLoading(true);
    try {
      await deleteFilaments(data);
    } catch (error) {
      console.error(error);
    }
    table?.resetRowSelection();
    setAlertModalOpen(false);
    setLoading(false);
    router.refresh();
    toast({
      variant: 'notice',
      description: `You have deleted ${data.length} filaments.`,
    });
  };

  const onArchive = async () => {
    setLoading(true);
    try {
      await updateFilaments(
        data.map((item) => ({
          id: item.id,
          status: 'archived',
        })),
      );
    } catch (error) {
      console.error(error);
    }

    table?.resetRowSelection();

    setAlertModalOpen(false);
    setLoading(false);
    router.refresh();
    toast({
      variant: 'notice',
      description: `You have archived ${data.length} filaments.`,
    });
  };

  const toggleFavorite = async () => {
    try {
      await updateFilaments(
        data.map((item) => ({
          id: item.id,
          isFavorite: !allFavorite,
        })),
      );
    } catch (error) {
      console.error(error);
    }
    table?.resetRowSelection();

    setAlertModalOpen(false);
    setLoading(false);
    router.refresh();
    toast({
      variant: 'notice',
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
        {table.getSelectedRowModel().rows.length > 0  && (
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            <span>
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </span>
          </div>
        )}
        <div className="ml-auto flex">
          {table.getColumn('status') && (
            <DataTableFacetedFilter
              column={table.getColumn('status')}
              title="Status"
              options={filamentStatus}
            />
          )}
        </div>

        <DataTableViewOptions table={table} />
      </div>
    </>
  );
}
