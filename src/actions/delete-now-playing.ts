"use server";

import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { cinemas, moviesToCinemas } from "@/db/schema";

export const deleteNowPlaying = async (movieSlug: string) => {
  try {
    const { userId } = await auth();

    const cinema = await db.query.cinemas.findFirst({
      columns: { id: true, citySlug: true },
      where: eq(cinemas.ownerId, userId ?? ""),
    });

    const deletedNowPlaying = await db
      .delete(moviesToCinemas)
      .where(
        and(
          eq(moviesToCinemas.movieSlug, movieSlug),
          eq(moviesToCinemas.citySlug, cinema?.citySlug ?? ""),
          eq(moviesToCinemas.cinemaId, cinema?.id ?? NaN)
        )
      )
      .returning({
        slug: moviesToCinemas.movieSlug,
      });

    return {
      movie: deletedNowPlaying,
      error: null,
    };
  } catch {
    return {
      movie: null,
      error: "Something went wrong! Please try again.",
    };
  }
};
