'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { userAuthSchema } from '@/lib/validations/auth';
import { AuthProviderIcons, Spinner } from '@/assets/icons';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';

import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

type FormData = z.infer<typeof userAuthSchema>;

const providers = [
  {
    id: 'github',
    name: 'GitHub',
    icon: <AuthProviderIcons.Github className="mr-3 h-4 w-4" />,
  },
  {
    id: 'google',
    name: 'Google',
    icon: <AuthProviderIcons.Google className="mr-3 h-4 w-4" />,
  },
];

export function UserAuthForm() {
  const [isLoading, setLoading] = useState(false);
  const [isProvidersLoading, setProvidersLoading] = useState(false);
  const [selectedProviderId, setSelectedProviderId] = useState('');
  const [showEmailOption, setShowEmailOption] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const searchParams = useSearchParams();

  const form = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = form.handleSubmit(async (data: FormData) => {
    setLoading(true);
    try {
      const signInResult = await signIn('email', {
        email: data.email.toLowerCase(),
        redirect: false,
        callbackUrl: searchParams?.get('from') || '/dashboard',
      });

      if (!signInResult?.ok) {
        return toast({
          title: 'Something went wrong.',
          description: 'Your sign in request failed. Please try again.',
          variant: 'destructive',
        });
      }
      setLoading(false);
      return toast({
        title: 'Check your email',
        description: 'We sent you a login link. Be sure to check your spam too.',
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setEmailSubmitted(true);
    }
  });

  async function onProviderSelect(id: string) {
    try {
      setSelectedProviderId(id);
      setProvidersLoading(true);
      await signIn(id, {
        callbackUrl: searchParams?.get('from') || '/dashboard',
      });
    } catch (error) {
      console.log(error);
    } finally {
      setProvidersLoading(false);
    }
  }

  return (
    <>
      {!emailSubmitted ? (
        <div>
          <div className="mb-2 flex flex-col space-y-2 border-b pb-2">
            {providers.map((provider) => (
              <Button
                key={provider.id}
                className="font-normal"
                disabled={isLoading || isProvidersLoading}
                onClick={() => onProviderSelect(provider.id)}
                icon={provider.icon}
                loading={isProvidersLoading && provider.id === selectedProviderId}
              >
                Continue with {provider.name}
              </Button>
            ))}
          </div>

          <Form {...form}>
            <form onSubmit={onSubmit} className="flex flex-col space-y-2">
              {showEmailOption && (
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="E-Mail Address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <Button
                variant="outline"
                disabled={isLoading || isProvidersLoading}
                {...(!showEmailOption && {
                  type: 'button',
                  onClick: (e) => {
                    e.preventDefault();
                    setShowEmailOption(true);
                  },
                })}
                loading={isLoading}
              >
                {isLoading ? 'Sending...' : 'Continue with E-Mail'}
              </Button>
            </form>
          </Form>
        </div>
      ) : (
        <div className="text-sm text-muted-foreground">
          We have sent you a magic email link that expires in 24 hours. Please check your inbox.
        </div>
      )}
    </>
  );
}
