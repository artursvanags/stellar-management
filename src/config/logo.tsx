'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Image from 'next/image';
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
  //useEffect only runs on the client, so now we can safely show the UI
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

export default DefaultLogo;
