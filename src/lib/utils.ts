import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { usePathname } from 'next/navigation';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const CheckActive = (href :string) => {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);
  return isActive;
};

export function getUpdateObject(name: string) {
  return name ? { update: { name } } : undefined;
  }