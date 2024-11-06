"use client";

import { Suspense, use, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { createCinema } from "@/actions/create-cinema";
import { getSupportedCities } from "@/actions/get-supported-cities";
import { Modal } from "@/components/modal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { insertCinemaSchema } from "@/db/schema/cinemas";

import { useCreateCinemaModal } from "./store";

interface Props {
  supportedCitiesPromise: ReturnType<typeof getSupportedCities>;
}

export const CreateCinemaModal = ({ supportedCitiesPromise }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const modal = useCreateCinemaModal();
  const supportedCities = use(supportedCitiesPromise);

  const form = useForm<z.infer<typeof insertCinemaSchema>>({
    resolver: zodResolver(insertCinemaSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      citySlug: "",
      location: "",
    },
  });

  const onSubmit = async (payload: z.infer<typeof insertCinemaSchema>) => {
    setIsLoading(true);
    const { cinema, error } = await createCinema(payload);

    if (error) {
      toast.error(error);
      setIsLoading(false);
      return;
    }

    if (cinema) {
      toast.success("Cinema listed successfully.");
      window.location.href = `/dashboard/${cinema.slug}`;
      setIsLoading(false);
    }

    form.reset();
  };

  return (
    <Modal
      title="List new Cinema"
      description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
      isOpen={modal.isOpen}
      onClose={modal.onClose}
    >
      <div className="py-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          placeholder="e.g. Aesthetic Multiplex"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-6">
                <Suspense
                  fallback={
                    <div className="flex flex-col space-y-4">
                      <Skeleton className="h-4 w-12" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  }
                >
                  <FormField
                    control={form.control}
                    name="citySlug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <Select
                          disabled={isLoading}
                          value={field.value}
                          onValueChange={(value) => field.onChange(value)}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select city..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup>
                              {supportedCities.map((city) => (
                                <SelectItem key={city.id} value={city.slug}>
                                  {city.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </Suspense>
              </div>
            </div>
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isLoading}
                      className="resize-none"
                      placeholder="e.g. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit at aliquid quos!"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end pt-6">
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2Icon className="size-4 animate-spin" />}
                Create
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};
