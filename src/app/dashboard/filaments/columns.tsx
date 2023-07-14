"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Database } from "@/types/db"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

import { DataTableColumnHeader } from "@/components/dashboard/dataTableColumnHeader"
import { DataTableRowActions } from "@/components/dashboard/dataTableActions"
import { map } from "zod"

const columnLabels = [
  {
  label: "Task"
  },
]

export const columns: ColumnDef<Database>[] = [
  {
    accessorKey: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div>{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "manufacturer",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Manufacturer" />
    ),
  },
  {
    accessorKey: "material",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Material" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[80px] truncate">
            {row.getValue("material")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "color",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Color" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[80px] truncate">
            {row.getValue("color")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "stock_weight",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Stock Weight" />
    ),
    cell: ({ row }) => {
      const weight = parseFloat(row.getValue("stock_weight"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "unit",
        unit: weight >= 1000 ? "kilogram" : "gram",
        unitDisplay: "short",
      }).format(weight >= 1000 ? weight / 1000 : weight)
 
      return <div>{formatted}</div>
    },
  },
  {
    accessorKey: "Weight",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Weight" />
    ),
    cell: ({ row }) => {
      const stock_weight = parseFloat(row.getValue("stock_weight"))
      const leftover_weight = parseFloat(row.getValue("leftover_weight"))
      const formatWeight = (weight: number): string => {
        return new Intl.NumberFormat("en-US", {
          style: "unit",
          unit: weight >= 1000 ? "kilogram" : "gram",
          unitDisplay: "short",
        }).format(weight >= 1000 ? weight / 1000 : weight);
      };
      const leftover_percent = leftover_weight / stock_weight * 100
      return <div>{formatWeight(stock_weight)} / {formatWeight(leftover_weight)} ({leftover_percent.toFixed(2)}%)</div>
    },
  },
  {
    accessorKey: "leftover_weight",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Leftover Weight" />
    ),
    cell: ({ row }) => {
      const weight = parseFloat(row.getValue("leftover_weight"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "unit",
        unit: weight >= 1000 ? "kilogram" : "gram",
        unitDisplay: "short",
      }).format(weight >= 1000 ? weight / 1000 : weight)
 
      return <div>{formatted}</div>
    },
  },
  {
    accessorKey: "tags",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tags"/>
    ),
  cell: ({ row }) => {
    const tags = row.getValue("tags")
    if (typeof tags === 'string') {
      const tagList = tags.split(",").map((tag: string) => (
        <Badge key={tag} variant="outline">{tag.trim()}</Badge>
      ))
      return (
        <div className="flex space-x-1">
          {tagList}
        </div>
      )
    } else {
      return <div>No tags</div>
    }
  },
},

  {
    accessorKey: "state",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="State"/>
    ),
      cell: ({ row }) => {
            const filament_state: string = row.getValue("state");
            const state_color = filament_state.toLowerCase() === "new" ? "bg-badge-greenForeground border-badge-green" : filament_state.toLowerCase() === "used" ? "bg-badge-amberForeground border-badge-amber" : "bg-badge-grayForeground border-badge-gray";
            const className = `${state_color}`;
            return <Badge variant="outline" className={className}>{filament_state as string}</Badge>;
          },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date Created"/>
    ),
      cell: ({ row }) => {
        const date = row.getValue("created_at")
        const formatted = new Date(date as string).toLocaleString()
        return <div>{formatted}</div>
    },
  },
    {
      id: "actions",
      cell: ({ row }) => <DataTableRowActions row={row}/>
      
    },
]
