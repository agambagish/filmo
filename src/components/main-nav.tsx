"use client";

import Image from "next/image";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

interface Props {
  city: string;
}

export const MainNav = ({ city }: Props) => {
  return (
    <div className="hidden gap-6 lg:flex">
      <Link href={`/${city}`} className="hidden items-center space-x-2 lg:flex">
        <Image
          src="/icon.png"
          alt="icon"
          height={256}
          width={256}
          className="size-6"
        />
        <span className="hidden font-bold tracking-wide lg:inline-block">
          Filmo
        </span>
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/movies"
              className={cn(navigationMenuTriggerStyle(), "h-auto")}
            >
              Movies
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};
