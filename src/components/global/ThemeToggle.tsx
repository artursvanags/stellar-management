"use client"

import * as React from "react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { setTheme } = useTheme()
  const { Sun, Moon, System } = {
    Sun: "fa-fw fa-regular fa-sun-bright",
    Moon: "fa-fw fa-regular fa-moon-stars",
    System: "fa-fw fa-regular fa-laptop",
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
            <div className={`${"rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"} ${Sun}`} />
            <div className={`${"absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"} ${Moon}`}/>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <div className={`${Sun} mr-2`}></div>Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
        <div className={`${Moon} mr-2`}></div>Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
        <div className={`${System} mr-2`}></div>System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
