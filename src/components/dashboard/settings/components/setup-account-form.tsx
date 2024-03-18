'use client';

import * as z from 'zod';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { setupAuthSchema } from '@/lib/validations/auth';

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
import { UserData } from '@/types/database';

type FormData = z.infer<typeof setupAuthSchema>;

interface SetupAccountFormProps {
  user: UserData | null;
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
  if (!user) return null;
  const onSubmit = form.handleSubmit(async (data: FormData) => {
    try {
      setLoading(true);
      await fetch(`/api/account/${user.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
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
