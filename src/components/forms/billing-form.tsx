'use client';

import * as z from 'zod';
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { Billing, User } from '@prisma/client';
import { billingAddressSchema } from '@/lib/validations/auth';
import { updateBilling } from '@/hooks/userActions';

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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';

type FormData = z.infer<typeof billingAddressSchema>;

interface BillingFormProps {
  data: {
    user: User | null;
    billing: Billing | null;
  };
}

const BillingForm = ({ data }: BillingFormProps) => {
  const { user, billing } = data;

  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({});

  useEffect(() => {
    fetch(
      "https://valid.layercode.workers.dev/list/countries?format=select&value=code"
    )
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.countries);
        setSelectedCountry(data.userSelectValue);
      });
  }, []);
  const form = useForm<FormData>({
    resolver: zodResolver(billingAddressSchema),
    defaultValues: {
      address: billing?.address,
      address2: billing?.address2 || '',
      city: billing?.city,
      state: billing?.state || '',
      zip: billing?.zip,
      country: billing?.country,
    },
  });

const onSubmit = form.handleSubmit(async (data: FormData) => {
    try {
        setLoading(true);
        if (user !== null) {
            await updateBilling(user.id, data as Partial<User>);
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
          name={'address2'}
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="address2">Address 2</FormLabel>
              <FormControl>
                <Input placeholder="Address 2" {...field} />
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
  );
};

export default BillingForm;
