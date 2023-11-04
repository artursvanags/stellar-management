'use client';

import { Cross2Icon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from '@/components/dashboard/filaments/table/dataTableViewOptions';
import { useEffect, useState } from 'react';

import { AlertModal } from '@/components/modals/alertModal';

import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const [selectedData, setSelectedData] = useState<string[]>([]);

  useEffect(() => {
    const selectedRows = table.getSelectedRowModel().rows;
    const data = selectedRows.map((row) => row.getValue('id') as string);
    setSelectedData(data);
  }, [table, table.getSelectedRowModel().rows.length]);

  const router = useRouter();
  const { toast } = useToast();

  const [openAlertModal, setAlertModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);
      await fetch(`/api/filaments/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedData),
      });
      table?.resetRowSelection(); 

    } catch (error) {
      console.error(
        'There has been a problem with your fetch operation:',
        error,
      );
    } finally {
      toast({
        description: `${selectedData.length} filaments have been deleted.`,
      });
      router.refresh();
      setLoading(false);
      setAlertModalOpen(false);
    }
  };

  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <>
      <AlertModal
        isOpen={openAlertModal}
        onClose={() => setAlertModalOpen(false)}
        onConfirm={onDelete}
        loading={loading}
        description="You are about to delete the following:"
      >
        <div className="max-h-48 overflow-auto rounded-sm bg-stone-100 p-4 font-mono text-xs dark:bg-stone-900 dark:text-amber-200">
          {selectedData.map((data) => (
            <div key={data} className="flex items-center space-x-2">
              {data}
            </div>
          ))}
        </div>
      </AlertModal>

      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-1 items-center space-x-2">
          <Input
            placeholder="Filter tasks..."
            value={
              (table.getColumn('manufacturer')?.getFilterValue() as string)
            }
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
          <Button
            onClick={() => setAlertModalOpen(true)}
            variant={'destructive'}
          >
            Delete {table.getSelectedRowModel().rows.length} items
          </Button>
        )}
        <DataTableViewOptions table={table} />
      </div>
    </>
  );
}
