'use client';

import { DotsHorizontalIcon } from '@radix-ui/react-icons';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Filaments } from '@/types/database';
import { useState } from 'react';
import { AlertModal } from '@/components/modals/alertModal';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

import { ActionsIcons } from '@/config/assets/icons';

interface CellActionProps {
  data: Filaments;
}

export function DataTableRowActions({ data }: CellActionProps) {
  const router = useRouter();
  const { toast } = useToast();

  const [openAlertModal, setAlertModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    setLoading(true);
    try {
      await fetch(`/api/filaments/${data.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error(error);
    }
    setAlertModalOpen(false);
    setLoading(false);
    router.refresh();
    toast({
      variant: 'default',
      description: `Filament deleted successfully!`,
    });
  };

  const setArchive = async () => {
    const newStatus = data.status === 'archived' ? 'used' : 'archived';
    try {
      await fetch(`/api/filaments/${data.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });
    } catch (error) {
      console.error(error);
    }
    setAlertModalOpen(false);
    router.refresh();
    toast({
      variant: 'default',
      description: `You have successfully ${
        newStatus === 'archived' ? 'archived' : 'un-archived'
      } filament!`,
    });
  };

  const toggleFavorite = async () => {
    try {
      await fetch(`/api/filaments/${data.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          isFavorite: !data.isFavorite,
        }),
      });
    } catch (error) {
      console.error(error);
    }
    setAlertModalOpen(false);
    router.refresh();
    toast({
      variant: 'default',
      description: `You have successfully ${
        data.isFavorite ? 'favorited' : 'un-favorited'
      } filament!`,
    });
  };

  return (
    <>
      <AlertModal
        isOpen={openAlertModal}
        onClose={() => setAlertModalOpen(false)}
        onConfirm={onDelete}
        loading={loading}
        description={`You are about to delete the following:`}
      >
        <div className="flex max-h-48 flex-col overflow-auto rounded-sm bg-stone-100 p-4 font-mono text-xs dark:bg-stone-900 dark:text-amber-200">
          <span>{data.id}</span>
          <span>
            {data.manufacturer} - {data.material} - {data.color} -{' '}
          </span>

          <span>
            Remaining weight {data.remainingWeight} g ( Net weight {data.weight}{' '}
            g )
          </span>
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
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              router.push(`filaments/${data.id}`);
            }}
          >
            <ActionsIcons.Edit className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={toggleFavorite} className="cursor-pointer">
            {data.isFavorite ? (
              <>
                <ActionsIcons.Unfavorite className="mr-2 h-4 w-4" />
                Un-favorite
              </>
            ) : (
              <>
                <ActionsIcons.Favorite className="mr-2 h-4 w-4" />
                Favorite
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={setArchive}
            disabled={data.status === 'archived'}
            className="cursor-pointer"
          >
            <ActionsIcons.Archive className="mr-2 h-4 w-4" />
            Archive
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setAlertModalOpen(true)}
            className="cursor-pointer text-red-500"
          >
            <ActionsIcons.Delete className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
