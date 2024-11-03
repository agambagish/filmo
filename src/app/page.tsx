"use client";

import { useEffect } from "react";

import { useSelectCityModal } from "@/components/modals/select-city-modal/store";
import { Skeleton } from "@/components/ui/skeleton";

const Page = () => {
  const onOpen = useSelectCityModal((state) => state.onOpen);
  const isOpen = useSelectCityModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return (
    <div className="w-full space-y-10">
      <header className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center gap-8">
          <Skeleton className="hidden h-8 w-24 md:block" />
          <Skeleton className="hidden h-4 w-16 md:block" />
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </header>
      <div className="container mx-auto space-y-8 py-10">
        <div className="flex justify-center">
          <Skeleton className="h-8 w-40 rounded-full" />
        </div>
        <div className="space-y-4 text-center">
          <Skeleton className="mx-auto h-16 w-3/4" />
          <Skeleton className="mx-auto h-16 w-3/4" />
          <Skeleton className="mx-auto h-4 w-96" />
          <Skeleton className="mx-auto h-4 w-80" />
        </div>
        <div className="flex justify-center gap-4">
          <Skeleton className="h-12 w-32" />
          <Skeleton className="h-12 w-32" />
        </div>
        <div className="flex justify-center gap-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-8" />
          ))}
        </div>
      </div>
      <div className="container mx-auto space-y-6">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-5" />
          <Skeleton className="h-6 w-32" />
        </div>
        <div className="relative">
          <div className="flex gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="w-72 space-y-3">
                <Skeleton className="h-96 w-full rounded-lg" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-9 w-24" />
              </div>
            ))}
          </div>
          <div className="absolute -left-4 top-1/2 -translate-y-1/2">
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
          <div className="absolute -right-4 top-1/2 -translate-y-1/2">
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
