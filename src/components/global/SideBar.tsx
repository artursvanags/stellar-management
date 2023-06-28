'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link';

import { Button } from "@/components/ui/button"
import { LuDatabase, LuMoon } from "react-icons/lu"

type LinkItem = {
  href: string;
  title: string;
  icon: JSX.Element;
}

const links: LinkItem[] = [
  { href: "/dashboard/filaments", title: "Filaments", icon: <LuDatabase className="text-lg mr-2" /> },
  { href: "/dashboard/colors", title: "Colors", icon: <LuMoon className="text-lg mr-2" /> },
];

const CheckActive = ({ href }: { href: string }) => {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);
  return isActive;
}

const SideBar = () => {
  return (
    <div className="primary-background">
      <div className="space-y-4 py-2">
        <div className="px-4">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Main Menu
          </h2>
          <ul className="space-y-1">
            {links.map((link) => (
              <Button
                key={link.href}
                asChild
                variant={CheckActive({ href: link.href }) ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                <Link href={link.href}>
                  {link.icon}
                  {link.title}
                </Link>
              </Button>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
