'use client';

import { UserAuthForm } from '@/components/forms/user-auth-form';

export default function LoginComponent() {
  return (
    <div className="flex w-96 flex-col justify-center">
      <div className="flex flex-col">
        <div className="pb-6">
          <h1 className="font-heading text-4xl">Sign-In</h1>
          <p className="text-sm font-normal">
            Please enter your email address to receive a sign-in link.
          </p>
        </div>
        <UserAuthForm />
      </div>
    </div>
  );
}
