'use client';
import { useTheme } from 'next-themes';
import { useMemo, useEffect, useState } from 'react';
import Image from 'next/image';

const DefaultLogo = (props: React.ComponentProps<'img'>) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const logoSrc = useMemo(() => {
    return resolvedTheme === 'light' ? '/logo-black.svg' : '/logo-white.svg';
  }, [resolvedTheme]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

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
