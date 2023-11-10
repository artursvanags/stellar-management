'use client';
import { Filaments } from '@/types/database';
import { AlertModal } from './alertModal';

interface DeleteAlertModalProps {
  data: Filaments[];
  isOpen: boolean;
  onClose: () => void;
  onAction: () => void;
  loading: boolean;
}

export const DeleteAlertModal: React.FC<DeleteAlertModalProps> = ({
  data,
  isOpen,
  onClose,
  onAction,
  loading,
}) => {
  return (
    <AlertModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onAction}
      loading={loading}
      description={`You are about to delete the following ${data.length} items:`}
    >
      <div className="max-h-48 overflow-auto rounded-sm bg-stone-100 p-4 font-mono text-xs dark:bg-stone-900 dark:text-amber-200">
        {data.map((item) => (
          <div key={item.id} className="flex items-center space-x-2">
            {item.id} {item.manufacturer}
          </div>
        ))}
      </div>
    </AlertModal>
  );
};
