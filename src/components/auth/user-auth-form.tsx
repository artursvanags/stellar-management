"use client"
// Supabase Auth
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useState } from 'react';

// Database & Schema
import { Database } from '@/types/db';
import { userAuthSchema } from '@/lib/validations/auth';

// Data Validation
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

// Components
import { buttonVariants } from '@/components/ui/button';

import { Input } from '@/components/ui/input';
import { Loader2 } from "lucide-react";
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';


interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
interface SocialAuthButtonProps {
  provider: string;
  authType: string;
  isLoading: boolean;
  onClick: () => void;
}

type FormData = z.infer<typeof userAuthSchema>;

const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    'http://localhost:3000/'
  // Make sure to include `https://` when not localhost.
  url = url.includes('http') ? url : `https://${url}`
  // Make sure to include a trailing `/`.
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`
  return url
}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const redirect_path = `${getURL()}/auth/callback/`;
  const [isLoading, setIsLoading] = useState(false);
  
  const supabase = createClientComponentClient<Database>();
  
  const router = useRouter();

  const spinnerClass = <Loader2 className="mr-2 h-4 w-4 animate-spin" />
  const socialAuthProviders = [
    { providerName: 'Github', authType: 'github' },
  ]; 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(userAuthSchema) });

  const onFormSubmit = async (data: FormData) => {
    setIsLoading(true);
    const resp = await supabase.auth.signInWithOtp({
      email: data.email.toLowerCase(),
      options: {
        emailRedirectTo: redirect_path,
      },
    });
    setIsLoading(false);

    if (resp.error) {
      return toast({
        title: 'Something went wrong.',
        description: resp.error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success!',
        description: 'A confirmation has been sent to your email.',
      });
      router.push(redirect_path);
    }
  };
  
  const handleSocialAuthClick = async (authType: string) => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: authType as any,
        options: {
          redirectTo: redirect_path,
        }
      });

      if (error) {
        throw new Error(error.message);
      }
      router.push(redirect_path);
    } catch (error: any) {
      toast({
        title: 'Something went wrong.',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const SocialAuthButton = ({ provider, isLoading, onClick }: SocialAuthButtonProps) => {
    const iconClass = `fa-brands fa-${provider?.toLowerCase()}`;

    return (
      <button
        className={`w-full ${cn(buttonVariants({ variant: 'outline' }))}`}
        onClick={onClick}
        disabled={isLoading}
      >
        {isLoading ? (
          spinnerClass
        ) : (
          <a className={`mr-2 h-4 w-4 ${iconClass}`} />
        )}{' '}
        {provider}
      </button>
    );
  };
  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...register('email')}
            />
            {errors?.email && (
              <p className="px-1 text-xs text-red-600">{errors.email.message}</p>
            )}
          </div>

          <button
            className={cn(buttonVariants())}
            disabled={isLoading}>
            {isLoading ? spinnerClass : null}
            Sign In with Email
          </button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          {getURL() + redirect_path}
        </div>
      </div>
      <div className="flex items-center justify-center gap-2">
        {socialAuthProviders.map(({ providerName, authType }) => (
          <SocialAuthButton
            key={authType}
            provider={providerName}
            authType={authType}
            isLoading={isLoading}
            onClick={() => handleSocialAuthClick(authType)}
          />
        ))}
      </div>
    </div>
  );
}