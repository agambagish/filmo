import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import { Loader2Icon, LogOutIcon } from "lucide-react";

import { getCinemaByUserId } from "@/actions/get-cinema-by-user-id";
import { CinemaDropdownMenuItem } from "@/components/cinema-dropdown-menu-item";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, getUserEmail } from "@/lib/utils";

interface Props {
  user: User | null;
  city: string;
}

export const AuthDropdown = ({ user, city }: Props) => {
  const initials = `${user?.firstName?.charAt(0) ?? ""} ${
    user?.lastName?.charAt(0) ?? ""
  }`;

  const email = getUserEmail(user);

  return (
    <>
      <ClerkLoading>
        {user ? (
          <Button
            variant="secondary"
            size="icon"
            className="size-8 rounded-full"
          >
            <Loader2Icon className="size-6 animate-spin" />
          </Button>
        ) : (
          <Skeleton
            className={cn(
              buttonVariants({ variant: "secondary" }),
              "w-[4.5rem]"
            )}
          />
        )}
      </ClerkLoading>
      <ClerkLoaded>
        <SignedOut>
          <SignInButton
            mode="modal"
            forceRedirectUrl={`/${city}`}
            signUpForceRedirectUrl={`/${city}`}
          >
            <Button className="w-[4.5rem]">Sign In</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" className="size-8 rounded-full">
                <Avatar className="size-8">
                  <AvatarImage src={user?.imageUrl} alt={initials} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <CinemaDropdownMenuItem cinemaPromise={getCinemaByUserId()} />
              <DropdownMenuSeparator />
              <SignOutButton redirectUrl={`/${city}`}>
                <DropdownMenuItem>
                  <LogOutIcon className="mr-2 size-4" />
                  Log out
                </DropdownMenuItem>
              </SignOutButton>
            </DropdownMenuContent>
          </DropdownMenu>
        </SignedIn>
      </ClerkLoaded>
    </>
  );
};
