import '@/styles/index.css';

import { Inter as FontSans } from 'next/font/google';
import localFont from 'next/font/local';

import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';

import { Toaster } from '@/components/ui/toaster';

import { ThemeProvider } from '@/components/global/ThemeProvider';

// Added to force dynamic site generation to avoid cookie errors.
export const dynamic = 'force-dynamic';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

// Font files can be colocated inside of `pages`
const fontHeading = localFont({
  src: "assets/fonts/CalSans-SemiBold.woff2",
  variable: '--font-heading',
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [siteConfig.keywords],

  authors: [
    {
      name: siteConfig.author,
      url: siteConfig.url,
    },
  ],
  creator: siteConfig.author,
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
          fontHeading.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <main className="relative">{children}</main>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
