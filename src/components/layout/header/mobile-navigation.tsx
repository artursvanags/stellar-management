"use client";

import { useRef } from "react";
import Link from "next/link";
import { CheckActive, cn } from "@/lib/utils";
import { Icons } from "@/config/icons";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import ModeToggle from "@/components/global/ThemeToggleButton";
import { NavigationInterface } from "@/types";

export default function MobileNavigation({items, session}:NavigationInterface) {
  const sheetCloseRef = useRef<HTMLButtonElement | null>(null);

  const handleSheetClose = () => {
    if (sheetCloseRef.current) {
      sheetCloseRef.current.click();
    }
  };

  return (
    <div className="flex border-b bg-background px-4 py-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Icons.HamburgerMenu className="h-12 w-12" />
          </Button>
        </SheetTrigger>
        <SheetContent className="flex w-[80vw] flex-col px-4 py-4" side="left">
          <p className="border-b pb-2 font-heading text-4xl lg:text-5xl">
            Main Menu
          </p>
          <nav className=" space-y-2">
            {items.map((i, index) => (
              <Button
                asChild
                key={index}
                size="lg"
                className={cn("w-full justify-start")}
                variant={CheckActive({ href: i.href }) ? "secondary" : "ghost"}
                onClick={handleSheetClose}
              >
                <Link href={i.href}>{i.title}</Link>
              </Button>
            ))}
          </nav>
          <SheetClose ref={sheetCloseRef} />
          <div className="mt-auto border-t pt-4">
            <div className="flex flex-1 items-center justify-between">
              <ModeToggle />
            </div>
          </div>
        </SheetContent>
      </Sheet>
      <div className="ml-auto flex items-center space-x-2">
        <Link href="/">
          <Icons.logo className="w-48"/>
        </Link>
      </div>
    </div>
  );
}
