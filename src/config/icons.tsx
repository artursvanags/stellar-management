'use client';

import {
  ChevronsUpDown,
  Sun,
  Moon,
  Laptop,
  ArrowUp,
  ArrowDown,
  EyeOff,
  LogIn,
  User,
  Plus,
  Menu,
  Github,
  Loader2,
  Trash,
} from 'lucide-react';

import {
  IconBrandNextjs,
  IconBrandTypescript,
  IconBrandGraphql,
  IconBrandJavascript,
  IconBrandWordpress,
  IconBrandTailwind,
} from '@tabler/icons-react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const DefaultLogo = (props: React.ComponentProps<'img'>) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  let logoSrc;
  switch (resolvedTheme) {
    case 'dark':
      logoSrc = '/logo-white.svg';
      break;
    case 'light':
      logoSrc = '/logo-black.svg';
      break;
    default:
      logoSrc = '/logo-white.svg';
      break;
  }
  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <Image
        src={logoSrc}
        alt="Logo"
        width={100}
        height={100}
        className={props.className}
      />
    </>
  );
};

export const Icons = {
  logo: DefaultLogo,
  login: LogIn,
  dashboard: User,
  plus: Plus,
  arrowUp: ArrowUp,
  arrowDown: ArrowDown,
  eyeOff: EyeOff,
  sort: ChevronsUpDown,
  HamburgerMenu: Menu,
  Trash: Trash,

};

export const ThemeIcons = {
  Sun: Sun,
  Moon: Moon,
  System: Laptop,
};

export const ToolStackIcons = {
  Tailwind: IconBrandTailwind,
  Nextjs: IconBrandNextjs,
  Typescript: IconBrandTypescript,
  Javascript: IconBrandJavascript,
  Wordpress: IconBrandWordpress,
  Graphql: IconBrandGraphql,
};

export const Spinner = Loader2;

interface AuthProviderIconsProps extends React.HTMLAttributes<HTMLDivElement> {
  icon: string;
}

export const AuthProviderIcons = (props: AuthProviderIconsProps) => {
  switch (props.icon) {
    case 'GitHub':
      return <Github className={cn('h-4 w-4', props.className)} />;
    default:
      return <Github className={cn('h-4 w-4', props.className)} />;
  }
};