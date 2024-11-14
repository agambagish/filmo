"use client";

import { use, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, ChevronsUpDownIcon, Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { createNowPlaying } from "@/actions/create-now-playing";
import { getAvailableNowPlaying } from "@/actions/get-available-now-playing";
import { Modal } from "@/components/modal";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import { useAddNowPlayingModal } from "./store";

interface Props {
  availableNowPlayingPromise: ReturnType<typeof getAvailableNowPlaying>;
}

export const AddNowPlayingModal = ({ availableNowPlayingPromise }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const modal = useAddNowPlayingModal();
  const { movies } = use(availableNowPlayingPromise);

  const formSchema = z.object({
    movieSlug: z.string().min(1),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      movieSlug: "",
    },
  });

  const onSubmit = async (payload: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    toast.loading("Listing movie...");

    const { movie, error } = await createNowPlaying(payload.movieSlug);

    if (error) {
      form.reset();
      toast.error(error);
      setIsLoading(false);
      return;
    }

    if (movie) {
      toast.success("Movie listed successfully.");
      setIsLoading(false);
      modal.onClose();
      window.location.reload();
    }
  };

  return (
    <Modal
      title="Add now playing"
      description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
      isOpen={modal.isOpen}
      onClose={modal.onClose}
    >
      <div className="py-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="movieSlug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Movie</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          disabled={isLoading}
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? movies.find((movie) => movie.slug === field.value)
                                ?.title
                            : "Select movie"}
                          <ChevronsUpDownIcon className="size-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[350px] p-0">
                      <Command>
                        <CommandInput placeholder="Search movie..." />
                        <CommandList>
                          <CommandEmpty>No movie found.</CommandEmpty>
                          <CommandGroup>
                            {movies.map((movie) => (
                              <CommandItem
                                value={movie.title}
                                key={movie.slug}
                                onSelect={() => {
                                  form.setValue("movieSlug", movie.slug);
                                }}
                              >
                                <CheckIcon
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    movie.slug === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {movie.title}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end pt-6">
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2Icon className="size-4 animate-spin" />}
                Add
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};
