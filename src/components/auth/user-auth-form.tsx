'use client';

import { Button } from '@/components/ui/button';

import { signIn } from 'next-auth/react';
import { useProviders } from '@/lib/auth/helpers';
import { AuthProviderIcons, Spinner } from '@/config/icons';
import { useState } from 'react';

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ ...props }: UserAuthFormProps) {
  const [isLoading, setLoading] = useState(false);
  const providers = useProviders();

  async function handleClick(id: string): Promise<void> {
    setLoading(true);
    try {
      const response = await signIn(id, { callbackUrl: '/dashboard' });
      console.log(response);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div {...props}>
      {/*
      <form onSubmit={handleSubmit(handleClick)}>
        <div className="grid gap-2">
          <div>
            <Label className="pb-1 text-sm font-medium" htmlFor="email">
              E-Mail Address
            </Label>
            <Input
              type="email"
              placeholder="Type your e-mail address"
              autoComplete="email"
              disabled={isSubmitting}
              {...register("email")}
            />
          </div>
          <div>
            <Label className="pb-1 text-sm font-medium" htmlFor="email">
              Password
            </Label>
            <Input
              type="password"
              placeholder="Type your password"
              autoComplete="current-password"
              disabled={isSubmitting}
              {...register("password")}
            />
          </div>
          <Button size={'xl'} disabled={isSubmitting} className="mt-4 w-full">
            {!isSubmitting ? (
              'Sign-In'
            ) : (
              <>
                <Spinner className="mr-2 h-5 w-5 animate-spin" />
                Signing you in...
              </>
            )}
          </Button>
        </div>
        {errors && <span>{errors.email}</span>}

      </form>
            */}
      <div className="mt-4 flex flex-col gap-2 border-t">
        {Object.values(providers ?? {}).map((provider) => (
          <div key={provider.name}>
            <Button
              size={'xl'}
              variant={'outline'}
              className="mt-4 w-full"
              disabled={isLoading}
              onClick={() => handleClick(provider.id)}
            >
              {isLoading ? (
                <>
                  <Spinner className="mr-2 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <AuthProviderIcons icon={provider.name} className="mr-2" />
                  Sign-in with {provider.name}
                </>
              )}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
