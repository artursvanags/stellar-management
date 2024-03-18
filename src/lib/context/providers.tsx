import { ThemeProvider } from '@/components/global/theme-provider';
import { UserDataProvider } from './userContext';
import { TooltipProvider } from '@/components/ui/tooltip';
import { getUser } from '../repositories/user-repository';
import { Toaster } from '@/components/ui/toaster';
import { TailwindIndicator } from '../helpers/tailwind-indicator';

export default async function Providers({ children }: { children: React.ReactNode }) {
  const data = await getUser();

  return (
    <UserDataProvider data={data}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <TooltipProvider delayDuration={100}>
          <Toaster />
          <TailwindIndicator />
          {children}
        </TooltipProvider>
      </ThemeProvider>
    </UserDataProvider>
  );
}
