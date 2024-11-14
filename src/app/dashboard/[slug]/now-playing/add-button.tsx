"use client";

import { PlusCircleIcon } from "lucide-react";

import { useAddNowPlayingModal } from "@/components/modals/add-now-playing-modal/store";
import { Button } from "@/components/ui/button";

export const AddButton = () => {
  const modal = useAddNowPlayingModal();

  return (
    <Button onClick={modal.onOpen} variant="secondary" size="sm">
      <PlusCircleIcon className="size-4" />
      Add
    </Button>
  );
};
