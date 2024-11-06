"use client";

import Link from "next/link";
import { use } from "react";

import { ClapperboardIcon } from "lucide-react";

import { getCinemaByUserId } from "@/actions/get-cinema-by-user-id";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

import { useCreateCinemaModal } from "./modals/create-cinema-modal/store";

export const CinemaDropdownMenuItem = ({
  cinemaPromise,
}: {
  cinemaPromise: ReturnType<typeof getCinemaByUserId>;
}) => {
  const { cinema } = use(cinemaPromise);
  const modal = useCreateCinemaModal();

  return (
    <DropdownMenuItem
      onClick={!cinema ? modal.onOpen : () => {}}
      asChild={!!cinema}
    >
      {cinema ? (
        <Link href={cinema && `/dashboard/${cinema.slug}`}>
          <ClapperboardIcon className="mr-1 size-4" />
          Manage Cinema
        </Link>
      ) : (
        <>
          <ClapperboardIcon className="mr-1 size-4" />
          Onboard Cinema
        </>
      )}
    </DropdownMenuItem>
  );
};
