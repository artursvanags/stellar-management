'use client';

import { UserAuthForm } from './user-auth-form';

export default function LoginComponent() {

  return (
    <div className="flex w-96 flex-col justify-center">
      <div className="flex flex-col">
        <div>
          <h1 className="font-heading text-4xl">Hello there, </h1>
          <p className="text-sm font-normal">
            Please sign-in to access your account
          </p>
        </div>
        <UserAuthForm />
      </div>
    </div>
  );
}
