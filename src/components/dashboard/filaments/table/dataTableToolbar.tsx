'use client';
import { DataTableViewOptions } from '@/components/dashboard/filaments/table/dataTableViewOptions';

import { Cross2Icon } from '@radix-ui/react-icons';
import { Icons } from '@/config/icons';
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
import { Input } from '@/components/ui/input';

import { DeleteAlertModal } from '@/components/modals/deleteAlertModal';

import { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

import {
  deleteFilaments,
  updateFilaments,
} from '@/lib/actions/filamentActions';
import { Filaments } from '@/types/database';

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

  useEffect(() => {
    const selectedRows = table.getSelectedRowModel().rows;
    const selectedRowIDs = selectedRows.map((row) => row.original);
    setData(selectedRowIDs as Filaments[]);
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

      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-1 items-center space-x-2">
          <Input
            placeholder="Filter tasks..."
            value={table.getColumn('manufacturer')?.getFilterValue() as string}
            onChange={(event) =>
              table
                .getColumn('manufacturer')
                ?.setFilterValue(event.target.value)
            }
            className="h-10 w-[150px] lg:w-[250px]"
          />
          {isFiltered && (
            <Button variant="ghost" onClick={() => table.resetColumnFilters()}>
              Reset
              <Cross2Icon className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>

        {table.getSelectedRowModel().rows.length > 0 && (
          <>
            <Button variant={'ghost'} onClick={()=>table?.resetRowSelection()}>
              Clear selection

            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={'ghost'} className=" border border-dashed">
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
          </>
        )}
        <DataTableViewOptions table={table} />
      </div>
    </>
  );
}
