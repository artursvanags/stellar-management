'use client';

import { Filaments } from '@/types/database';
import { useState } from 'react';
import { TagModal } from '@/components/modals/tagModal';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

import { deleteFilament, updateFilament } from '@/lib/actions/filamentActions';
import { Icons } from '@/config/icons';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface TagActionProps {
  tags: (string | null)[];
}

export function TagActions({ tags }: TagActionProps) {
  const router = useRouter();
  const { toast } = useToast();

  const [openTagModal, setTagModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  if (tags.length === 0) {
    return (
      <>
        <TagModal
          isOpen={openTagModal}
          onClose={() => setTagModalOpen(false)}
          onAction={() => setTagModalOpen(false)}
          loading={loading}
        >
          test
        </TagModal>
        <div className="flex items-center">
          <Badge
            variant="gray"
            onClick={() => setTagModalOpen(true)}
            className=" flex cursor-pointer border border-dashed px-1"
          >
            Add <Icons.plus className="ml-2 h-4 w-4" />
          </Badge>
        </div>
      </>
    );
  }
  return (
    <div className="flex space-x-2">
      <Badge variant="secondary" className="font-medium cursor-pointer">
        +{tags.length}
      </Badge>
    </div>
  );
}
