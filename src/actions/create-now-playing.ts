"use server";

import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { cinemas, movies, moviesToCinemas } from "@/db/schema";

interface ReturnType {
  movie: Pick<typeof movies.$inferSelect, "slug"> | null;
  error: string | null;
}

export const createNowPlaying = async (
  movieSlug: string
): Promise<ReturnType> => {
  try {
    const { userId } = await auth();

    const cinema = await db.query.cinemas.findFirst({
      columns: { id: true, citySlug: true },
      where: eq(cinemas.ownerId, userId ?? ""),
    });

    const [newNowPlaying] = await db
      .insert(moviesToCinemas)
      .values({
        cinemaId: cinema?.id ?? NaN,
        citySlug: cinema?.citySlug ?? "",
        movieSlug,
      })
      .returning({
        slug: moviesToCinemas.movieSlug,
      });

    return {
      movie: newNowPlaying,
      error: null,
    };
  } catch {
    return {
      movie: null,
      error: "Something went wrong! Please try again.",
    };
  }
};
