'use client';

import { UserAuthForm } from '@/components/auth/user-auth-form';
import { siteConfig } from '@/config/site';
import Logo from '@/config/assets/logo';

export default function LoginComponent() {
  return (
    <div className="flex h-fit w-full max-w-md flex-col overflow-hidden rounded border">
      <div className="flex flex-col">
        <div className="h-1 bg-orange-foreground"></div>
        <div className="flex flex-col justify-center space-y-2 border-b border-secondary/50 bg-secondary/50 px-4 py-6 pt-6">
          <div className="flex flex-col items-center">
            <Logo className="w-24 pb-4" />
            <h1 className="font-heading text-xl">Sign in</h1>
            <p className="text-sm font-normal text-muted-foreground">
              Sign in to your {siteConfig.name} account
            </p>
          </div>
        </div>
        <div className="flex flex-col px-4 py-8 sm:px-16">
          <UserAuthForm />
        </div>
      </div>
    </div>
  );
}
