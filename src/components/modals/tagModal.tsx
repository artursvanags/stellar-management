'use client';

import { useEffect, useState } from 'react';

import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/assets/icons';

interface TagModalProps {
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  children?: React.ReactNode;
}

export const TagModal: React.FC<TagModalProps> = ({ isOpen, onClose, onConfirm, loading, children, description }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title="Tags"
      description={!description ? 'View or edit tags' : description}
      isOpen={isOpen}
      onClose={onClose}
    >
      {children}
      <div className="flex w-full items-center justify-end space-x-2 pt-6">
        <Button type="submit" disabled={loading} variant="default" onClick={onConfirm}>
          {loading ? (
            <>
              <Spinner className="mr-2 h-4 w-4 animate-spin" /> Loading
            </>
          ) : (
            'Update'
          )}
        </Button>
      </div>
    </Modal>
  );
};
