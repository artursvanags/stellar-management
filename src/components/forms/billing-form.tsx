'use client';

import * as z from 'zod';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { Billing, User } from '@prisma/client';
import { billingAddressSchema } from '@/lib/validations/auth';
import {
  addBilling,
  deleteBilling,
  updateBilling,
} from '@/lib/utils/user-actions';

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

type FormData = z.infer<typeof billingAddressSchema>;

interface BillingFormData {
  initialData: {
    user: User;
    billing: Billing | null;
  };
}

const BillingForm = ({ initialData }: BillingFormData) => {
  const [loading, setLoading] = useState(false);

  const { user, billing } = initialData;

  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(billingAddressSchema),
    defaultValues: {
      address: billing?.address,
      state: billing?.state,
      city: billing?.city,
      zip: billing?.zip,
      country: billing?.country,
      phone: billing?.phone,
    },
  });

  const onSubmit = form.handleSubmit(async (data: FormData) => {
    try {
      setLoading(true);
      if (billing === null) {
        await addBilling(user!.id, data);
      } else {
        await updateBilling(user!.id, data);
      }
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
    <>
      <Form {...form}>
        <form onSubmit={onSubmit} className="flex flex-col space-y-2">
          <FormField
            control={form.control}
            name={'address'}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="address">Address</FormLabel>
                <FormControl>
                  <Input placeholder="Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={'state'}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="state">State</FormLabel>
                <FormControl>
                  <Input placeholder="State" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={'city'}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="city">City</FormLabel>
                <FormControl>
                  <Input placeholder="City" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={'zip'}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="zip">Postal Code</FormLabel>
                <FormControl>
                  <Input placeholder="Postal Code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={'country'}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="country">Country</FormLabel>
                <FormControl>
                  <Input placeholder="Country" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
        <Button type="submit" disabled={loading} onClick={onSubmit}>
          Update
        </Button>
      </Form>
      <Button variant={'destructive'} onClick={() => deleteBilling(user.id)}>
        Delete
      </Button>
    </>
  );
};

export default BillingForm;
