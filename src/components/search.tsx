"use client";

import { useState } from "react";

import { SearchIcon, TvMinimalPlayIcon } from "lucide-react";

import { Kbd } from "@/components/kbd";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export const Search = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [isLoading] = useState<boolean>(false);

  return (
    <>
      <Button
        variant="outline"
        className="relative size-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2"
        onClick={() => setOpen(true)}
      >
        <SearchIcon className="size-4 xl:mr-2" />
        <span className="hidden font-normal text-muted-foreground xl:inline-flex">
          Search movies...
        </span>
        <Kbd
          title="Control"
          className="pointer-events-none absolute right-1.5 top-1.5 hidden xl:block"
        >
          Ctrl K
        </Kbd>
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={(open) => {
          setOpen(open);
          if (!open) {
            setQuery("");
          }
        }}
      >
        <CommandInput
          placeholder="Search movies..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty
            className={cn(isLoading ? "hidden" : "py-6 text-center text-sm")}
          >
            No movies found.
          </CommandEmpty>
          {isLoading ? (
            <div className="space-y-1 overflow-hidden px-1 py-2">
              <Skeleton className="h-4 w-10" />
              <Skeleton className="h-8" />
              <Skeleton className="h-8" />
            </div>
          ) : (
            <CommandGroup className="capitalize" heading="Movies">
              <CommandItem
                className="h-9"
                value="jawan"
                //   onSelect={() =>
                //     onSelect(() => router.push(`/product/${item.id}`))
                //   }
              >
                <TvMinimalPlayIcon className="mr-2.5 size-3 text-muted-foreground" />
                <span className="truncate">Jawan</span>
              </CommandItem>
              <CommandItem
                className="h-9"
                value="bohurupi"
                //   onSelect={() =>
                //     onSelect(() => router.push(`/product/${item.id}`))
                //   }
              >
                <TvMinimalPlayIcon className="mr-2.5 size-3 text-muted-foreground" />
                <span className="truncate">Bohurupi</span>
              </CommandItem>
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};
