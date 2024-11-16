"use client";

import { AlarmClockIcon } from "lucide-react";

import { useAddShowtimeModal } from "@/components/modals/add-showtime-modal/store";
import { Button } from "@/components/ui/button";

export const AddButton = () => {
  const modal = useAddShowtimeModal();

  return (
    <Button variant="secondary" size="sm" onClick={modal.onOpen}>
      <AlarmClockIcon className="size-4" />
      Add showtime
    </Button>
  );
};
