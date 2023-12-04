'use client';
import { useState } from 'react';

import { AlertModal } from '@/components/modals/alertModal';
import { Button } from '@/components/ui/button';
import { User } from '@prisma/client';
import { Input } from '@/components/ui/input';
import { deleteUser } from '@/lib/utils/user-actions';
import { signOut } from 'next-auth/react';
import { useToast } from '@/components/ui/use-toast';

interface DeleteAccountProps {
  user: User;
}

const DeleteAccount: React.FC<DeleteAccountProps> = ({ user }) => {
  const keyword = user.id.slice(0, 8);

  const [open, openModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState('');
  const { toast } = useToast();

  const onConfirm = async () => {
    if (confirm !== keyword) {
      toast({
        title: 'Error',
        description: `Type your first ID ${keyword} to confirm`,
      });
      return;
    }
    setLoading(true);
    try {
      await deleteUser(user.id);
    } catch (err) {
      console.log(err);
    } finally {
      await signOut({
        callbackUrl: `${window.location.origin}/`,
      });
      toast({
        title: 'Success',
        description: 'Your account has been deleted',
      });
      setLoading(false);
    }
  };

  return (
    <div>
      <AlertModal
        isOpen={open}
        loading={loading}
        onClose={() => openModal(false)}
        onConfirm={onConfirm}
      >
        <div className="space-y-3">
          <div className="flex max-h-48 flex-col overflow-auto rounded-sm bg-stone-100 p-4 font-mono text-xs dark:bg-stone-900 dark:text-amber-200">
            <span>
              Type your first ID <span className="font-bold">{keyword}</span> to
              confirm deletion of your account
            </span>
          </div>
          <Input
            placeholder={`${keyword}`}
            type="text"
            onChange={(e) => setConfirm(e.target.value.trim())}
          />
        </div>
      </AlertModal>
      <h3 className="pb-2 text-lg font-semibold">Danger zone</h3>
      <div className="rounded border border-dashed p-4">
        <div className="flex">
          <div className="w-[70%]">
            <p className="text-sm text-muted-foreground">
              Once you delete your account, there is no going back. All your
              data will be lost. Please be certain.
            </p>
          </div>
          <div className="ml-auto flex items-center">
            <Button onClick={() => openModal(true)} variant="destructive">
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccount;
