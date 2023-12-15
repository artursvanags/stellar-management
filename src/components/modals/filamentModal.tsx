'use client';

import { Button } from '@/components/ui/button';
import FilamentForm from '../forms/add-filament-form';
import { Modal } from '@/components/ui/modal';
import React, { useState } from 'react';
import { Icons } from '@/config/assets/icons';

export const AddFilamentButton = (props: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button
        size="lg"
        icon={<Icons.plus className="mr-2 h-6 w-6" />}
        onClick={handleOpen}
        {...props}
      >
        Add Filament
      </Button>
      <Modal
        title="Filament Form"
        description="Add new filaments to your collrection."
        isOpen={isOpen}
        onClose={handleClose}
        className="overflow-auto sm:max-h-[80vh] sm:max-w-screen-xl"
      >
        <FilamentForm closeModal={handleClose} />
      </Modal>
    </>
  );
};
