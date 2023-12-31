'use client';

import * as z from 'zod';
import { useState } from 'react';
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { EditCard } from '@/components/cards/edit-card';

type FormData = z.infer<typeof setupAuthSchema>;

interface SetupAccountFormProps {
  user: User;
}

const SetupAccountForm = ({ user }: SetupAccountFormProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(setupAuthSchema),
    defaultValues: {
      name: '',
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
        title: 'Account setup complete',
        description: 'Your account has been successfully setup.',
      });
      router.refresh();
    }
  });

  return (
    <EditCard
      title="Account Setup"
      description="Please complete your account setup by filling out the form below"
      loading={loading}
      onConfirm={onSubmit}
    >
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
                    autoFocus
                    placeholder="Type your full name here"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </EditCard>
  );
};

export default SetupAccountForm;
