"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { createShowtime } from "@/actions/create-showtime";
import { Modal } from "@/components/modal";
import { SmartDatetimeInput } from "@/components/smart-datetime-input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useAddShowtimeModal } from "./store";

export const AddShowtimeModal = () => {
  const { movieSlug } = useParams<{ movieSlug: string }>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const modal = useAddShowtimeModal();

  const formSchema = z.object({
    timestamp: z.date(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const onSubmit = async ({ timestamp }: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    toast.loading("Adding showtime...");

    const { error, showtime } = await createShowtime({ movieSlug, timestamp });

    if (error) {
      form.reset();
      toast.error(error);
      setIsLoading(false);
      return;
    }

    if (showtime) {
      toast.success("Showtime added successfully.");
      setIsLoading(false);
      modal.onClose();
      window.location.reload();
    }
  };

  return (
    <Modal
      title="Add Showtime"
      description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
      isOpen={modal.isOpen}
      onClose={modal.onClose}
    >
      <div className="py-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="timestamp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Timestamp</FormLabel>
                  <FormControl>
                    <SmartDatetimeInput
                      disabled={isLoading}
                      value={field.value}
                      onValueChange={field.onChange}
                      placeholder="e.g. Tomorrow morning 9am"
                    />
                  </FormControl>
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
