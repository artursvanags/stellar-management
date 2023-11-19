'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { userAuthSchema } from '@/lib/validations/auth';
import { AuthProviderIcons, Spinner } from '@/config/assets/icons';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';

import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

type FormData = z.infer<typeof userAuthSchema>;

export function UserAuthForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
    defaultValues: {
      email: '',
    },
  });
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
  const [isLoading, setLoading] = useState(false);
  const [isProvidersLoading, setProvidersLoading] = useState<string | null>(
    null,
  );
  const searchParams = useSearchParams();

  async function onSubmit(data: FormData) {
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
        description:
          'We sent you a login link. Be sure to check your spam too.',
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function onProviderSelect(id: string) {
    setProvidersLoading(id);
    await signIn(id, {
      callbackUrl: searchParams?.get('from') || '/dashboard',
    });
    setProvidersLoading(null);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
          <Button size={'xl'} disabled={isLoading} className="w-full">
            {!isLoading ? (
              'Send Link'
            ) : (
              <>
                <Spinner className="mr-2 h-5 w-5 animate-spin" />
                Sending...
              </>
            )}
          </Button>
        </form>
      </Form>

      <div className="mt-4 flex flex-col gap-2 border-t">
        <p className="flex justify-center pt-4 text-sm font-normal">
          or sign in with
        </p>
        <div className="grid grid-cols-2 gap-4">
          {providers.map((provider, index) => (
            <Button
              key={index}
              size={'xl'}
              variant={'outline'}
              className="w-full"
              disabled={isLoading || isProvidersLoading === provider.id}
              onClick={() => onProviderSelect(provider.id)}
            >
              {isProvidersLoading === provider.id ? (
                <Spinner className="mr-2 animate-spin" />
              ) : (
                provider.icon
              )}
              {provider.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
