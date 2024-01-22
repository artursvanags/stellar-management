'use client';

import { useEffect, useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { DialogContentProps } from '@radix-ui/react-dialog';

interface FilamentModalProps extends DialogContentProps{
  title: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  loading?: boolean;
  children?: React.ReactNode;
}

export const FilamentModal: React.FC<FilamentModalProps> = ({
  isOpen,
  onClose,
  children,
  description,
  title,
  ...props
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title={title}
      description={description ? description : 'Filament Form'}
      isOpen={isOpen}
      onClose={onClose}
      className="lg:min-w-[1200px]"
      {...props}
    >
      {children}
    </Modal>
  );
};
