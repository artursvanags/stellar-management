'use client';
import React, { useState } from 'react';

import { DataTableViewOptions } from '@/components/dashboard/filaments/components/table/data-table-viewoptions';
import { DataTableFacetedFilter } from '@/components/dashboard/filaments/components/table/data-table-filter';

import { ActionsIcons, Icons } from '@/assets/icons';
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

import { useToast } from '@/components/ui/use-toast';

import { filamentStatus } from '@/config/constants';

import { deleteMultipleFilamentAction } from '../../actions/delete-filament-action';
import { FilamentDTO } from '@/types/database';
import { updateMultipleFilamentAction } from '../../actions/update-filament-action';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const { toast } = useToast();

  const [openAlertModal, setAlertModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const selectedRowModel = table.getSelectedRowModel();
  const selectedRowData = selectedRowModel.rows.map((row) => row.original as FilamentDTO);

  const onDelete = async () => {
    const filamentIds = selectedRowData.map((item: FilamentDTO) => item.id);
    try {
      setLoading(true);
      await deleteMultipleFilamentAction(filamentIds);
      toast({
        title: 'Success',
        description: `Deleted ${filamentIds.length} filaments from your list.`,
      });
    } catch (error) {
      const errorMessage = error instanceof Error && error.message;
      toast({
        title: 'Error',
        variant: 'destructive',
        description: errorMessage,
      });
    } finally {
      table.resetRowSelection();
      setAlertModalOpen(false);
      setLoading(false);
    }
  };

  const onFavorite = async () => {
    const filamentIds = selectedRowData.map((item: FilamentDTO) => item.id);
    const favorite = { isFavorite: !selectedRowData.every((item) => item.isFavorite) };

    try {
      setLoading(true);
      await updateMultipleFilamentAction(filamentIds, favorite);
      toast({
        title: 'Success',
        description: `Favorited ${selectedRowData.length} filaments from your list.`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: error instanceof Error && error.message,
      });
    } finally {
      table.resetRowSelection();
      setAlertModalOpen(false);
      setLoading(false);
    }
  };

  const onArchive = async () => {
    const filamentIds = selectedRowData.map((item: FilamentDTO) => item.id);
    const archive = { status: filamentStatus.archived.value };

    try {
      setLoading(true);
      await updateMultipleFilamentAction(filamentIds, archive);
      toast({
        title: 'Success',
        description: `Favorited ${selectedRowData.length} filaments from your list.`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: error instanceof Error && error.message,
      });
    } finally {
      table.resetRowSelection();
      setAlertModalOpen(false);
      setLoading(false);
    }
  };

  return (
    <>
      <DeleteAlertModal
        data={selectedRowData}
        isOpen={openAlertModal}
        onClose={() => setAlertModalOpen(false)}
        onAction={() => onDelete()}
        loading={loading}
      />
      <div className="flex items-center gap-2">
        {table.getSelectedRowModel().rows.length > 0 && (
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border border-dashed">
                  <Icons.arrowDown className="mr-2 h-4 w-4" />
                  Actions
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>Select actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={(e) => {
                    table.toggleAllRowsSelected();
                    e.preventDefault();
                  }}
                  disabled={table?.getIsAllRowsSelected()}
                >
                  <ActionsIcons.SelectAll className="mr-2 h-4 w-4" />
                  Select all
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => table?.resetRowSelection()}>
                  <ActionsIcons.Clear className="mr-2 h-4 w-4" />
                  Clear selection
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onFavorite()}>
                  <ActionsIcons.Favorite className="mr-2 h-4 w-4" />
                  Favorite
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onArchive()}>
                  <ActionsIcons.Archive className="mr-2 h-4 w-4" />
                  Archive
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setAlertModalOpen(true)} className="cursor-pointer text-red-500">
                  <ActionsIcons.Delete className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel className="flex-1 text-xs text-muted-foreground">
                  {table.getFilteredSelectedRowModel().rows.length} of{' '}
                  <span>{table.getFilteredRowModel().rows.length} row(s) selected.</span>
                </DropdownMenuLabel>
              </DropdownMenuContent>
            </DropdownMenu>
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
          {/*  {table.getColumn('tags') && (
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
          )} */}
        </div>
        <DataTableViewOptions table={table} />
      </div>
    </>
  );
}
