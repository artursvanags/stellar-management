import '@/styles/index.css';
import '@/styles/fontawesome-pro/css/all.min.css';

import { Inter as FontSans } from "next/font/google"
import localFont from "next/font/local"

import { cn } from "@/lib/utils"
import { siteConfig } from "@/config/site"

import { Toaster } from "@/components/ui/toaster"

import { ThemeProvider } from "@/components/global/ThemeProvider"

<<<<<<< HEAD
// Added to force dynamic site generation to avoid cookie errors.
export const dynamic = 'force-dynamic';

=======
>>>>>>> d4a4b9e6e4907aa21c1ac3408ccf82f29ae72f15
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

// Font files can be colocated inside of `pages`
const fontHeading = localFont({
  src: "../assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
})


interface RootLayoutProps {
  children: React.ReactNode
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
  creator: "shadcn",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: "@shadcn",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontHeading.variable
        )}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}