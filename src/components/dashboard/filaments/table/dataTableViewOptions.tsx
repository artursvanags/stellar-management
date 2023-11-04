"use client"

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { MixerHorizontalIcon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>
}

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"

          className="ml-auto hidden lg:flex"
        >
          <MixerHorizontalIcon className="mr-2 h-4 w-4" />
          View
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>View Presets</DropdownMenuLabel>
        <DropdownMenuCheckboxItem
               key='default'
               className="capitalize"
               onCheckedChange={() => {
                 table.getAllColumns().forEach((column) => {
                   column.toggleVisibility(true);
                 });
               }}
              >
                Default view
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
               key='minimal'
               className="capitalize"
               onCheckedChange={() => {
                 table.getAllColumns().forEach((column) => {
                   if (['Manufacturer', 'material', 'color', 'weight', 'tags', 'actions'].includes(column.id)) {
                     column.toggleVisibility(true);
                   } else {
                     column.toggleVisibility(false);
                   }
                 });
               }}
              >
                Minimal
              </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            (column) =>
              typeof column.accessorFn !== "undefined" && column.getCanHide()
          )
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id.replace(/([A-Z])/g, " $1").trim()}
                
              </DropdownMenuCheckboxItem>
            )
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}