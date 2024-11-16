"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontalIcon } from "lucide-react";
import { toast } from "sonner";

import { deleteShowtime } from "@/actions/delete-showtime";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDate, formatTime } from "@/lib/utils";

type Showtime = {
  id: number;
  date: Date;
  time: Date;
  screen: string;
  amenities: string;
};

const handleRemove = async (id: number) => {
  toast.loading("Removing showtime...");

  const { error, showtime } = await deleteShowtime(id);

  if (error) {
    toast.error(error);
    return;
  }

  if (showtime) {
    toast.info("Showtime removed.");
    window.location.reload();
  }
};

export const columns: ColumnDef<Showtime>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "#",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => formatDate(row.getValue("date")),
  },
  {
    accessorKey: "time",
    header: "Time",
    cell: ({ row }) => formatTime(row.getValue("time")),
  },
  {
    accessorKey: "screen",
    header: "Screen",
    cell: ({ row }) => (
      <Badge variant="secondary">{row.getValue("screen")}</Badge>
    ),
  },
  {
    accessorKey: "amenities",
    header: "Amenities",
    cell: ({ row }) => (
      <Badge variant="destructive">{row.getValue("amenities")}</Badge>
    ),
  },
  {
    id: "options",
    header: "Options",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0">
            <MoreHorizontalIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Options</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => handleRemove(row.getValue("id"))}>
            Remove
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
