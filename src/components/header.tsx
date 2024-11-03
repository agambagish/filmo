import Link from "next/link";

import { currentUser } from "@clerk/nextjs/server";
import { GithubIcon, MenuIcon } from "lucide-react";

import { AuthDropdown } from "@/components/auth-dropdown";
import { MainNav } from "@/components/main-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { Search } from "@/components/search";
import { Button, buttonVariants } from "@/components/ui/button";
import { NestedProps } from "@/lib/types";

export const Header = async ({ city }: NestedProps) => {
  const user = await currentUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container mx-auto flex h-16 items-center">
        <MainNav city={city} />
        <Button
          variant="ghost"
          size="icon"
          className="size-5 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
        >
          <MenuIcon />
        </Button>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Search />
            <Link
              href="https://github.com/agambagish/filmo"
              target="_blank"
              className={buttonVariants({
                variant: "outline",
                size: "icon",
              })}
            >
              <GithubIcon className="size-4" />
            </Link>
            <ModeToggle />
            <AuthDropdown user={user} />
          </nav>
        </div>
      </div>
    </header>
  );
};
