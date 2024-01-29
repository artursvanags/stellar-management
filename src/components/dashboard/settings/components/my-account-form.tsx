'use client';

import * as z from 'zod';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { set, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { setupAuthSchema } from '@/lib/validations/auth';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/config/assets/icons';
import { Badge } from '@/components/ui/badge';
import { useUserData } from '@/lib/context/userContext';

type FormData = z.infer<typeof setupAuthSchema>;

const MyAccountForm: React.FC = () => {
  const { user, settings } = useUserData();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(setupAuthSchema),
    defaultValues: {
      name: user.name || '',
    },
  });

  const [isDirty, setIsDirty] = useState(false);

  const onChange = () => {
    setIsDirty(true);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(user.id);
    toast({
      title: 'Success!',
      description: `You have copied your ID to clipboard.`,
    });
  };

  const onSubmit = form.handleSubmit(async (formData: FormData) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/account/${user.id}`, {
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
      console.error(
        'There has been a problem with your fetch operation:',
        error,
      );
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
            control={form.control}
            name="weight_threshold"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Low Weight Threshold</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {thresholdOptions.map((option) => (
                      <SelectItem key={option} value={option.toString()}>
                        {option.toString() ===
                        settings.weight_threshold.toString() ? (
                          <>
                            {option}g<Badge className="ml-2">Current</Badge>
                          </>
                        ) : (
                          <>
                            {option}g
                            {option === 50 && (
                              <Badge className="ml-2" variant={'secondary'}>
                                Default
                              </Badge>
                            )}
                          </>
                        )}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormDescription>
                  Set your low weight threshold, in order to see a warning sign
                  in your filaments.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="id"
            render={() => (
              <FormItem>
                <FormLabel htmlFor="id">Your ID</FormLabel>
                <Input
                  readOnly
                  placeholder={user.id}
                  className="cursor-pointer"
                  onClick={copyToClipboard}
                />
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
                  This is your public display name. It can be your real name or
                  a pseudonym.
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
