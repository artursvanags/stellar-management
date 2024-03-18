'use client';

import * as z from 'zod';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { set, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { setupAuthSchema } from '@/lib/validations/auth';

import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/assets/icons';
import { Badge } from '@/components/ui/badge';
import { UseUserData } from '@/lib/context/userContext';

type FormData = z.infer<typeof setupAuthSchema>;

const MyAccountForm: React.FC = () => {
  const userData = UseUserData();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(setupAuthSchema),
    defaultValues: {
      name: userData?.name || '',
    },
  });

  const [isDirty, setIsDirty] = useState(false);

  const onChange = () => {
    setIsDirty(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(userData?.id || '');
    toast({
      title: 'Success!',
      description: `You have copied your ID to clipboard.`,
    });
  };

  const onSubmit = form.handleSubmit(async (formData: FormData) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/account/${userData?.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    } finally {
      setIsDirty(false);
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
      <form onChange={onChange} onSubmit={onSubmit} className="space-y-4">
        <div className="flex flex-col space-y-4">
          <FormField
            name="id"
            render={() => (
              <FormItem>
                <FormLabel htmlFor="id">Your ID</FormLabel>
                <Input readOnly placeholder={userData?.id} className="cursor-pointer" onClick={copyToClipboard} />
                <FormDescription>
                  This is your unique ID, that we use to identify you. It cannot be changed.
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
                  This is your public display name. It can be your real name or a pseudonym.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" disabled={!isDirty || loading}>
          {loading ? (
            <>
              <Spinner className="mr-2 h-4 w-4 animate-spin" /> Updating...
            </>
          ) : (
            'Update'
          )}
        </Button>
      </form>
    </Form>
  );
};

export default MyAccountForm;
