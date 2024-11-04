"use server";

import { eq } from "drizzle-orm";

import { makeDataNonNullable } from "@/actions/utils";
import { db } from "@/db";
import { movies as _movies, moviesToCinemas } from "@/db/schema";

export const getNowPlayingByCity = async (citySlug: string) => {
  try {
    const movies = await db
      .selectDistinctOn([_movies.slug], {
        title: _movies.title,
        slug: _movies.slug,
        bannerUrl: _movies.bannerUrl,
      })
      .from(moviesToCinemas)
      .leftJoin(_movies, eq(moviesToCinemas.movieSlug, _movies.slug))
      .where(eq(moviesToCinemas.citySlug, citySlug));

    return { movies: makeDataNonNullable(movies) };
  } catch {
    return { movies: [] };
  }
};
