'use client';

import * as z from 'zod';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { User } from '@prisma/client';
import { setupAuthSchema } from '@/lib/validations/auth';
import { updateUser } from '@/hooks/userActions';

import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';

type FormData = z.infer<typeof setupAuthSchema>;


const MyAccountForm: React.FC<User> = ( user ) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(setupAuthSchema),
    defaultValues: {
      name: user.name || '',
    },
  });

  const onSubmit = form.handleSubmit(async (data: FormData) => {
    try {
      setLoading(true);
      await updateUser(user.id, data);
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
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="name">Full Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Full Name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
      <Button
        type="submit"
        disabled={loading}
        onClick={onSubmit}>Update</Button>
    </Form>
  );
};

export default MyAccountForm;
