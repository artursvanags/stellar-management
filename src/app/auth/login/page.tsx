import { Metadata } from 'next';
import LoginComponent from '@/components/auth/LoginComponent';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account',
};

export default function LoginPage() {
  return (
    <div className='flex w-screen h-screen justify-center'>
      <LoginComponent />
    </div>
  );
}
