"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontalIcon } from "lucide-react";
import { toast } from "sonner";

import { deleteNowPlaying } from "@/actions/delete-now-playing";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { movies } from "@/db/schema";
import { formatDate, formatPGTime } from "@/lib/utils";

type Movie = Pick<
  typeof movies.$inferSelect,
  "title" | "slug" | "certificate" | "duration" | "releaseDate"
> & { language: string };

const handleRemove = async (movieSlug: string) => {
  toast.loading("Removing movie...");

  const { movie, error } = await deleteNowPlaying(movieSlug);

  if (error) {
    toast.error(error);
    return;
  }

  if (movie) {
    toast.info("Movie removed.");
    window.location.reload();
  }
};

export const columns: ColumnDef<Movie>[] = [
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
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "certificate",
    header: "Certificate",
  },
  {
    accessorKey: "language",
    header: "Language",
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => {
      const duration: string = row.getValue("duration");
      return formatPGTime(duration);
    },
  },
  {
    accessorKey: "releaseDate",
    header: "Release Date",
    cell: ({ row }) => {
      const date: Date = row.getValue("releaseDate");
      return formatDate(date);
    },
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
          <DropdownMenuItem
            onClick={() => navigator.clipboard.writeText("Hello World!")}
          >
            Open in new tab
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleRemove(row.getValue("slug"))}>
            Remove
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
