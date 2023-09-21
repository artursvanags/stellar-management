import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { usePathname } from 'next/navigation';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getURL(): string {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    'http://localhost:3000/';
  // Make sure to include `https://` when not localhost.
  url = url.includes('http') ? url : `https://${url}`;
  // Make sure to include a trailing `/`.
  url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
  return url;
}

export const CheckActive = ({ href }: { href: string }) => {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);
  return isActive;
};
