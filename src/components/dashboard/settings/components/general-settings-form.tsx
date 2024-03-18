'use client';

import * as z from 'zod';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { userSettingsSchema } from '@/lib/validations/auth';

import { useToast } from '@/components/ui/use-toast';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/assets/icons';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { UseUserData } from '@/lib/context/userContext';

type FormData = z.infer<typeof userSettingsSchema>;

const thresholdOptions = [10, 25, 50, 75, 100];

const GeneralSettingsForm: React.FC = () => {
  const userData = UseUserData();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(userSettingsSchema),
    defaultValues: {
      weight_threshold: userData?.settings.weight_threshold,
      auto_archive: userData?.settings.auto_archive,
      auto_sort_archive: userData?.settings.auto_sort_archive,
    },
  });

  const [isDirty, setIsDirty] = useState(false);

  const onChange = () => {
    setIsDirty(true);
  };

  const onSubmit = form.handleSubmit(async (formData: FormData) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/account/${userData?.id}/general`, {
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
            control={form.control}
            name="weight_threshold"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Low Weight Threshold</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value.toString()} disabled={loading}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {thresholdOptions.map((option) => (
                      <SelectItem key={option} value={option.toString()}>
                        {option.toString() === userData?.settings.weight_threshold.toString() ? (
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
                  Set your low weight threshold, in order to see a warning sign in your filaments.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="auto_archive"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel>Auto archive</FormLabel>
                  <FormDescription>Automatically archive your filaments when they reach the threshold.</FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} disabled={loading} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="auto_sort_archive"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel>Sort archived filaments</FormLabel>
                  <FormDescription>Automatically move archived filaments to the bottom of the list.</FormDescription>
                </div>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} disabled={loading} />
                </FormControl>
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

export default GeneralSettingsForm;
