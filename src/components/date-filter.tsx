"use client";

import { format } from "date-fns";
import { parseAsIsoDate, useQueryState } from "nuqs";

import { Button } from "@/components/ui/button";
import { getNext7Days } from "@/lib/utils";

export const DateFilter = () => {
  const next7Days = getNext7Days();
  const [date, setDate] = useQueryState(
    "d",
    parseAsIsoDate.withDefault(new Date()).withOptions({
      shallow: false,
    })
  );

  return (
    <div className="flex space-x-4">
      {next7Days.map((day, i) => (
        <Button
          variant={
            format(date, "yyyy-MM-dd") === format(day.datetime, "yyyy-MM-dd")
              ? "default"
              : "secondary"
          }
          key={i}
          className="flex h-24 w-16 flex-col py-2"
          onClick={() => {
            setDate(day.datetime);
          }}
        >
          <span className="text-xs">{day.day}</span>
          <span className="text-lg font-bold">{day.date}</span>
          <span className="text-xs">{day.month}</span>
        </Button>
      ))}
    </div>
  );
};
