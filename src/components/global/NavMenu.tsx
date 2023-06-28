"use client"

import * as React from "react"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { LuDatabase, LuMoon } from "react-icons/lu"

import { usePathname } from 'next/navigation'

type LinkItem = {
  href: string;
  title: string;
  icon: string;
}

const links: LinkItem[] = [
  { href: "/roadmap", title: "Roadmap", icon: "" },
];

const CheckActive = ({ href }: { href: string }) => {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);
  return isActive;
}

const NavMenu = () => {
  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <LuDatabase className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center space-x-6 text-sm font-medium">
        {links.map((link) => (
          <Link 
            key={link.href} // added key prop to fix warning
            href={link.href}
            className={cn(CheckActive({ href: link.href }) ? "text-foreground" : "text-foreground/60",
              "transition-colors hover:text-foreground/80"
            )}
          >
            <div className="flex items-center">
              {link.icon}
              <span>{link.title}</span>
            </div>
          </Link>
        ))}
      </nav>
    </div>   
  );  
}

export default NavMenu;