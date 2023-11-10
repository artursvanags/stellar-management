import { Filaments } from '@/types/database';
import { AlertModal } from './alertModal';

interface TagModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAction: () => void;
  loading: boolean;
  children: React.ReactNode;
}

export const TagModal: React.FC<TagModalProps> = ({
  isOpen,
  onClose,
  onAction,
  loading,
  children,
}) => {
  return (
    <AlertModal
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onAction}
      loading={loading}
    >
      {children}
    </AlertModal>
  );
};
