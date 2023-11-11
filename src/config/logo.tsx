'use client';
import { useTheme } from 'next-themes';
import { useMemo } from 'react';
import Image from 'next/image';

const DefaultLogo = (props: React.ComponentProps<'img'>) => {
  const { resolvedTheme } = useTheme();

  const logoSrc = useMemo(() => {
    return resolvedTheme === 'light' ? '/logo-black.svg' : '/logo-white.svg';
  }, [resolvedTheme]);

  return (
    <div className={props.className}>
      <Image
        src={logoSrc}
        alt="Logo"
        width={100}
        height={100}
        priority={true}
      />
    </div>
  );
};

export default DefaultLogo;
