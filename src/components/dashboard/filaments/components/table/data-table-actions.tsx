'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { deleteFilamentAction } from '@/components/dashboard/filaments/actions/delete-filament-action';
import { updateFilamentAction } from '@/components/dashboard/filaments/actions/update-filament-action';
import { FilamentDTO } from '@/types/database';

import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { ActionsIcons } from '@/config/assets/icons';

import { useToast } from '@/components/ui/use-toast';

import { AlertModal } from '@/components/modals/alertModal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { filamentStatus } from '@/config/filament';

interface CellActionProps {
  data: FilamentDTO;
}

export function DataTableRowActions({ data }: CellActionProps) {
  const router = useRouter();
  const { toast } = useToast();

  const [openAlertModal, setAlertModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);
      await deleteFilamentAction(data.id);
      toast({
        title: 'Success',
        description: `Deleted filament from your list.`,
      });
    } catch (error) {
      const errorMessage = error instanceof Error && error.message;
      toast({
        title: 'Error',
        variant: 'destructive',
        description: errorMessage,
      });
    } finally {
      setAlertModalOpen(false);
      setLoading(false);
    }
  };

  const onFavorite = async () => {
    const favorite = { isFavorite: !data.isFavorite };
    try {
      setLoading(true);
      await updateFilamentAction(data.id, favorite);
      toast({
        title: 'Success',
        description: `You have ${data.isFavorite ? 'un-favorited' : 'favorited'} the filament.`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: error instanceof Error && error.message,
      });
    } finally {
      setAlertModalOpen(false);
      setLoading(false);
    }
  };

  const onArchive = async () => {
    const archive = { status: filamentStatus.archived.value };
    try {
      setLoading(true);
      await updateFilamentAction(data.id, archive);
      toast({
        title: 'Success',
        description: `You have archived the filament.`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        variant: 'destructive',
        description: error instanceof Error && error.message,
      });
    } finally {
      setAlertModalOpen(false);
      setLoading(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={openAlertModal}
        onClose={() => setAlertModalOpen(false)}
        onConfirm={onDelete}
        loading={loading}
        description={"You are about to delete this filament."}
      >
        <div className="flex max-h-48 flex-col overflow-auto rounded-sm bg-stone-100 p-4 font-mono text-xs dark:bg-stone-900 dark:text-amber-200">
          <span>{data.id}</span>
          <span>
            {data.manufacturer} - {data.material} - {data.color}
          </span>

          <span>
            Remaining weight {data.remainingWeight} g ( Net weight {data.weight} g )
          </span>
        </div>
      </AlertModal>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
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
          <DropdownMenuItem onClick={onFavorite} className="cursor-pointer">
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
          <DropdownMenuItem onClick={onArchive} disabled={data.status === 'archived'} className="cursor-pointer">
            <ActionsIcons.Archive className="mr-2 h-4 w-4" />
            Archive
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setAlertModalOpen(true)} className="cursor-pointer text-red-500">
            <ActionsIcons.Delete className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
