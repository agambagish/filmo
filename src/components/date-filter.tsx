"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { getNext7Days } from "@/lib/utils";

export const DateFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const next7Days = getNext7Days();
  const dateParameter = searchParams.get("date");

  useEffect(() => {
    if (!dateParameter) {
      router.push(`${pathname}?date=${format(new Date(), "yyyy-MM-dd")}`, {
        scroll: false,
      });
    }
  });

  return (
    <div className="flex space-x-4">
      {next7Days.map(({ date, day, month, datetime }, i) => (
        <Button
          variant={
            dateParameter === format(datetime, "yyyy-MM-dd")
              ? "default"
              : "secondary"
          }
          key={i}
          className="flex h-24 w-16 flex-col py-2"
          onClick={() => {
            router.push(`${pathname}?date=${format(datetime, "yyyy-MM-dd")}`, {
              scroll: false,
            });
          }}
        >
          <span className="text-xs">{day}</span>
          <span className="text-lg font-bold">{date}</span>
          <span className="text-xs">{month}</span>
        </Button>
      ))}
    </div>
  );
};
