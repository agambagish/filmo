import { User } from "@clerk/nextjs/server";
import { type ClassValue, clsx } from "clsx";
import { format, parse } from "date-fns";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const formatDate = (
  date: Date | string | number,
  opts: Intl.DateTimeFormatOptions = {}
) => {
  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    return "Invalid Date";
  }

  return new Intl.DateTimeFormat("en-IN", {
    month: opts.month ?? "long",
    day: opts.day ?? "numeric",
    year: opts.year ?? "numeric",
    ...opts,
  }).format(parsedDate);
};

export const getUserEmail = (user: User | null) => {
  const email =
    user?.emailAddresses?.find((e) => e.id === user.primaryEmailAddressId)
      ?.emailAddress ?? "";

  return email;
};

export const formatPGTime = (time: string) => {
  const timeAsDate = parse(time, "HH:mm:ss", new Date());
  const formattedTime = format(timeAsDate, "H'h' m'm'");

  return formattedTime;
};
