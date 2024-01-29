'use client';

import { useState } from 'react';
import { Icons } from '@/config/assets/icons';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import FilamentForm from '@/components/dashboard/filaments/components/add-filament-form';

export const AddFilamentButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInInteraction, setInInteraction] = useState(false);

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Add Filament"
        description="Add up to 25 filaments to your collection"
        isOpen={isModalOpen}
        onClose={onCloseModal}
        className="max-h-screen md:min-w-full xl:min-w-[1200px]"
        onInteractOutside={
          isInInteraction ? (e) => e.preventDefault() : undefined
        }
        onEscapeKeyDown={isInInteraction ? (e) => e.preventDefault() : undefined}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <FilamentForm
          setCloseModal={onCloseModal}
          setInteraction={setInInteraction}
        />
      </Modal>
      <Button
        icon={<Icons.plus className="mr-2 h-5 w-5" />}
        onClick={() => setIsModalOpen(true)}
      >
        Add Filament
      </Button>
    </>
  );
};
