"use server";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { showtimes } from "@/db/schema";

export const deleteShowtime = async (id: number) => {
  try {
    const [deletedShowtime] = await db
      .delete(showtimes)
      .where(eq(showtimes.id, id))
      .returning({ id: showtimes.id });

    return {
      showtime: deletedShowtime,
      error: null,
    };
  } catch {
    return {
      showtime: null,
      error: "Something went wrong! Please try again.",
    };
  }
};
