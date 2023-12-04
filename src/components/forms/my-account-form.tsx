'use client';

import * as z from 'zod';
import { Suspense, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { User } from '@prisma/client';
import { setupAuthSchema } from '@/lib/validations/auth';
import { updateUser } from '@/lib/utils/user-actions';

import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';

type FormData = z.infer<typeof setupAuthSchema>;

interface FormProps {
  data: User;
}

const MyAccountForm: React.FC<FormProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(setupAuthSchema),
    defaultValues: {
      name: data.name || '',
    },
  });

  const onSubmit = form.handleSubmit(async (formData: FormData) => {
    try {
      setLoading(true);
      await updateUser(data.id, formData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      toast({
        title: 'Account updated!',
        description: 'Your account has been updated.',
      });
      router.refresh();
    }
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex flex-col space-y-2">
        <FormField
          name="id"
          render={() => (
            <FormItem>
              <FormLabel htmlFor="id">Your ID</FormLabel>
              <Input placeholder={data.id} disabled />
              <FormDescription>
                This is your unique ID, that we use to identify you. It cannot
                be changed.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name">Display Name</FormLabel>
              <FormControl>
                <Input placeholder="Display Name" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name. It can be your real name or a
                pseudonym.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
      <Button type="submit" disabled={loading} onClick={onSubmit}>
        Update
      </Button>
    </Form>
  );
};

export default MyAccountForm;
