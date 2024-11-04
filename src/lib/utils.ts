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

export const formatTime = (
  date: Date | string | number,
  opts: Intl.DateTimeFormatOptions = {}
) =>
  new Intl.DateTimeFormat("en-IN", {
    hour: opts.hour ?? "2-digit",
    minute: opts.minute ?? "2-digit",
    hour12: opts.hour12 ?? true,
    ...opts,
  }).format(new Date(date));

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

export const getNext7Days = () => {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "2-digit",
    month: "short",
  };
  const dates = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);

    const formattedDate = date.toLocaleDateString("en-US", options);
    const [day, month, dayNum] = formattedDate.split(" ");

    dates.push({
      day: day.replace(",", "").toUpperCase(),
      date: dayNum,
      month: month.toUpperCase(),
      datetime: date,
    });
  }

  return dates;
};
