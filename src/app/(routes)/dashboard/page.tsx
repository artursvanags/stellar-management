import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Next.js',
};

export default function DashboardPage() {
  return (
    <div className="flex flex-col items-center justify-center py-2">
      <h1 className="text-6xl font-bold">Dashboard Home</h1>
    </div>
  );
}
