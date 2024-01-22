'use client';

import * as z from 'zod';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { TagModal } from '@/components/modals/tagModal';
import { useToast } from '@/components/ui/use-toast';
import { Icons } from '@/config/assets/icons';
import { Badge } from '@/components/ui/badge';
import { Tag, TagInput } from '@/components/ui/tag-input';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { tagsSchema } from '@/lib/validations/auth';
import { Filaments } from '@/types/database';

interface TagColumnProps {
  data: Filaments;
}

type FormData = z.infer<typeof tagsSchema>;

export function TagColumn({ data }: TagColumnProps) {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(tagsSchema),
  });

  const [tags, setTags] = useState<Tag[]>(data.tags);
  const [initialTags, setInitialTags] = useState<Tag[]>(data.tags);
  const [openTagModal, setTagModalOpen] = useState(false);

  useEffect(() => {
    console.log(data.tags,   "DATA TAGS")
    setTags(data.tags);
    setInitialTags(data.tags);
  }, [data.tags]);


  const [loading, setLoading] = useState(false);

  const onClose = () => {
    setTags(initialTags);
    setTagModalOpen(false);
  };

  const onSubmit = form.handleSubmit(async (formData: FormData) => {
    if (tags === initialTags) {
      return setTagModalOpen(false);
    }
    setLoading(true);
    try {
      await axios.put(`/api/filaments/${data.id}`, formData);
    } catch (err) {
      throw new Error(String(err));
    } finally {
      setTagModalOpen(false);
      setLoading(false);
      toast({
        title: 'Success',
        description: 'Your tags has been updated',
      });
      router.refresh();
    }
  });

  return (
    <div className="group/tags">
      <TagModal
        isOpen={openTagModal}
        onConfirm={() => onSubmit()}
        loading={loading}
        onClose={() => onClose()}
      >
        <Form {...form}>
          <form onSubmit={onSubmit}>
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <TagInput
                      {...field}
                      placeholder="Enter a tag"
                      tags={tags}
                      className="sm:min-w-[450px]"
                      setTags={(newTags) => {
                        setTags(newTags);
                        form.setValue('tags', newTags as [Tag, ...Tag[]]);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter up to 8 tags to this filament.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </TagModal>

      {tags.length > 0 ? (
        <Badge
          variant={'outline'}
          className="cursor-pointer border-secondary text-xs font-medium text-secondary-foreground"
          onClick={() => setTagModalOpen(true)}
        >
          <Icons.Tag className="mr-1 h-3 w-3" />
          {tags.length > 3 ? <>{tags.length}+</> : <>{tags.length}</>}
        </Badge>
      ) : (
        <Badge
          variant={'outline'}
          className="cursor-pointer border-secondary text-xs font-medium text-secondary-foreground opacity-30 transition-all hover:bg-secondary group-hover/tags:opacity-100"
          onClick={() => setTagModalOpen(true)}
        >
          <Icons.Tag className="mr-1 h-3 w-3" />
          Add
        </Badge>
      )}
    </div>
  );
}
