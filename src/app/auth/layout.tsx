import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account',
};

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <div className="min-h-screen">{children}</div>;
}
