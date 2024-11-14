"use server";

import { auth } from "@clerk/nextjs/server";
import { eq, notInArray } from "drizzle-orm";

import { makeDataNonNullable } from "@/actions/utils";
import { db } from "@/db";
import { movies as _movies, cinemas, moviesToCinemas } from "@/db/schema";

export const getAvailableNowPlaying = async () => {
  try {
    const { userId } = await auth();

    const cinema = await db.query.cinemas.findFirst({
      columns: { id: true },
      where: eq(cinemas.ownerId, userId ?? ""),
    });

    const alreadyPlaying = await db.query.moviesToCinemas.findMany({
      columns: { movieSlug: true },
      where: eq(moviesToCinemas.cinemaId, cinema?.id ?? NaN),
    });

    const alreadyPlayingSlugs = alreadyPlaying.map(
      ({ movieSlug }) => movieSlug
    );

    const movies = await db
      .select({
        title: _movies.title,
        slug: _movies.slug,
      })
      .from(_movies)
      .where(notInArray(_movies.slug, alreadyPlayingSlugs));

    return { movies: makeDataNonNullable(movies) };
  } catch {
    return { movies: [] };
  }
};
