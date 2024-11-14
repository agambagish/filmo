"use server";

import { eq } from "drizzle-orm";

import { makeDataNonNullable } from "@/actions/utils";
import { db } from "@/db";
import { cinemas, languages, movies, moviesToCinemas } from "@/db/schema";

interface ReturnType {
  movies: (Pick<
    typeof movies.$inferSelect,
    "title" | "slug" | "certificate" | "duration" | "releaseDate"
  > & { language: string })[];
}

export const getNowPlayingByCinemaSlug = async (
  slug: string
): Promise<ReturnType> => {
  try {
    const transaction = await db.transaction(async (tx) => {
      const data = await tx
        .select({
          title: movies.title,
          slug: movies.slug,
          certificate: movies.certificate,
          language: languages.label,
          duration: movies.duration,
          releaseDate: movies.releaseDate,
        })
        .from(moviesToCinemas)
        .leftJoin(movies, eq(movies.slug, moviesToCinemas.movieSlug))
        .leftJoin(cinemas, eq(cinemas.id, moviesToCinemas.cinemaId))
        .leftJoin(languages, eq(movies.languageId, languages.id))
        .where(eq(cinemas.slug, slug));

      return { movies: makeDataNonNullable(data) };
    });

    return transaction;
  } catch {
    return { movies: [] };
  }
};
