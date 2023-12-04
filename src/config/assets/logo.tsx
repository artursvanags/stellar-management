'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';

const DefaultLogo = (props: React.ComponentProps<'img'>) => {
  const { resolvedTheme } = useTheme();
  const [isThemeResolved, setIsThemeResolved] = useState(false);

  useEffect(() => {
    if (resolvedTheme) {
      setIsThemeResolved(true);
    }
  }, [resolvedTheme]);

  const logoSrc = useMemo(() => {
    if (resolvedTheme === 'dark') {
      return '/logo-white.svg';
    } else {
      // Default to light theme logo if resolvedTheme is 'light' or undefined
      return '/logo-black.svg';
    }
  }, [resolvedTheme]);

  return (
    <div className={props.className}>
      {isThemeResolved ? (
        <Image
          src={logoSrc}
          alt="Logo"
          width={100}
          height={100}
          priority={true}
        />
      ) : (
        // Replace this with your skeleton loader
        <Skeleton className="w-32 h-4" />
      )}
    </div>
  );
};

export default DefaultLogo;