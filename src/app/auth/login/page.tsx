import LoginComponent from '@/components/auth/login-component';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth/options';
import { redirect } from 'next/navigation';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account',
};

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  if (session) {
    return redirect('/dashboard');
  }
  return (
    <div className="flex h-screen items-center justify-center">
      <LoginComponent />
    </div>
  );
}
