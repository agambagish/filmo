"use client";

import { use, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useSelectCityModal } from "./store";

interface Props {
  supportedCitiesPromise: ReturnType<typeof getSupportedCities>;
}

export const SelectCityModal = ({ supportedCitiesPromise }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formSchema = z.object({
    city: z.string().min(1),
  });

  const supportedCities = use(supportedCitiesPromise);
  const modal = useSelectCityModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      city: "",
    },
  });

  const handleSubmit = async (payload: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    setTimeout(() => {
      window.location.href = `/${payload.city}`;
      setIsLoading(false);
    }, 3 * 1000);
  };

  return (
    <Modal
      title="Where are you from?"
      description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
      isOpen={modal.isOpen}
      onClose={modal.onClose}
    >
      <div className="py-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="city"
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
                          <SelectItem key={city.slug} value={city.slug}>
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
            <div className="flex justify-end pt-6">
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2Icon className="size-4 animate-spin" />}
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};
