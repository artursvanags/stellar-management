'use client';

import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row, RowSelection } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Filaments } from '@/types/database';
import { useState } from 'react';
import { AlertModal } from '@/components/modals/alertModal';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { filamentDiameter } from '@/config/filament';

interface DataTableRowActionsProps<TData> {
  row: Row<TData & Filaments>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const data = row.original;

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
        body: JSON.stringify(data),
      });
      row.toggleSelected(false);
    } catch (error) {
      console.error(
        'There has been a problem with your fetch operation:',
        error,
      );
    } finally {
      toast({
        description: `${data.manufacturer} has been deleted.`,
      });
      router.refresh();
      setLoading(false);
      setAlertModalOpen(false);
    }
  };

  const getDiameter = (data: Filaments) => {
    for (const key in filamentDiameter) {
      const object = filamentDiameter[key as keyof typeof filamentDiameter];
      if (object.value === data.diameter) {
        return object.label;
      }
    }
    return data.diameter;
  };

  return (
    <>
      <AlertModal
        isOpen={openAlertModal}
        onClose={() => setAlertModalOpen(false)}
        onConfirm={onDelete}
        loading={loading}
        description="You are about to delete the following:"
      >
        <div className="rounded-sm bg-stone-100 p-4 font-mono text-xs dark:bg-stone-900 dark:text-amber-200">
          ID: {data.id}
          <br />
          Filament: {data.manufacturer} - {data.material} - {getDiameter(data)}
          <br />
          Weight: {data.weight} g ( Remaining {data.remainingWeight} g )
        </div>
      </AlertModal>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Make a copy</DropdownMenuItem>
          <DropdownMenuItem>Favorite</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setAlertModalOpen(true)}>
            Delete
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
