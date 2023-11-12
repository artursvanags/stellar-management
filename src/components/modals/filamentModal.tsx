'use client';

import { Button } from '@/components/ui/button';
import FilamentForm from '../dashboard/filaments/components/FilamentForm';
import { Modal } from '@/components/ui/modal';
import React, { useState } from 'react';


interface FilamentModalButtonProps {
  props?:any;
}

export function FilamentModalButton(props: any) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Button {...props} className={props.className} onClick={handleOpen} variant="outline">
        Add Filament
      </Button>
      <Modal
        title="Filament Form"
        description="Add new filaments to your collrection."
        isOpen={isOpen}
        onClose={handleClose}
        className="overflow-auto sm:max-h-[80vh] sm:max-w-screen-xl"
      >
        <FilamentForm closeModal={handleClose}/>
      </Modal>
    </>
  );
}
