"use server";

import { eq } from "drizzle-orm";

import { makeDataNonNullable } from "@/actions/utils";
import { db } from "@/db";
import { languages, movies } from "@/db/schema";

export const getMovieBySlug = async (slug: string) => {
  try {
    const data = await db
      .select({
        title: movies.title,
        slug: movies.slug,
        description: movies.description,
        bannerUrl: movies.bannerUrl,
        trailerUrl: movies.trailerUrl,
        language: languages.label,
        duration: movies.duration,
        // genres,
        certificate: movies.certificate,
        releaseDate: movies.releaseDate,
      })
      .from(movies)
      .leftJoin(languages, eq(movies.languageId, languages.id))
      .where(eq(movies.slug, slug));

    const nonNullableMovie = makeDataNonNullable(data);
    return nonNullableMovie[0];
  } catch {
    return undefined;
  }
};
