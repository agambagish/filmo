"use server";

import { and, eq, gte, lte, sql } from "drizzle-orm";

import { db } from "@/db";
import { cinemas, moviesToCinemas, showtimes } from "@/db/schema";
import { ONE_DAY_IN_MILLISECONDS } from "@/lib/constants";

import { makeDataNonNullable } from "./utils";

interface Args {
  slug: string;
  city: string;
}

interface Options {
  perPageLimit: number;
  date: Date;
}

type Showtime = Pick<typeof showtimes.$inferSelect, "id" | "timestamp">;

interface ReturnType {
  cinemas: (Pick<typeof cinemas.$inferSelect, "name" | "slug"> & {
    showtimes: Showtime[];
  })[];
  pageCount: number;
}

export const getCinemasByMovieSlug = async (
  { slug, city }: Args,
  { perPageLimit, date }: Options
): Promise<ReturnType> => {
  try {
    const now = new Date();

    if (
      Date.parse(date.toString()) <
      Date.parse(now.toString()) - ONE_DAY_IN_MILLISECONDS
    ) {
      return {
        cinemas: [],
        pageCount: 0,
      };
    }

    const today = now.toDateString() === date.toDateString();

    const from = today
      ? new Date(now.getTime() - 30 * 60 * 1000)
      : new Date(date);

    const to = new Date(date.setHours(23, 59, 59, 999));

    const transaction = await db.transaction(async (tx) => {
      const data = await tx
        .selectDistinctOn([cinemas.slug], {
          name: cinemas.name,
          slug: cinemas.slug,
          showtimes: sql<
            Showtime[]
          >`json_agg(json_build_object('id', ${showtimes.id}, 'timestamp', ${showtimes.timestamp}) ORDER BY ${showtimes.timestamp} ASC )`,
        })
        .from(moviesToCinemas)
        .leftJoin(cinemas, eq(cinemas.id, moviesToCinemas.cinemaId))
        .rightJoin(
          showtimes,
          eq(showtimes.moviesToCinemasUid, moviesToCinemas.uid)
        )
        .where(
          and(
            eq(moviesToCinemas.movieSlug, slug),
            eq(moviesToCinemas.citySlug, city),
            and(gte(showtimes.timestamp, from), lte(showtimes.timestamp, to))
          )
        )
        .groupBy(cinemas.name, cinemas.slug);

      //   const [total] = await tx
      //     .select({
      //       count: countDistinct(moviesToCinemaHalls.cinemaHallSlug),
      //     })
      //     .from(moviesToCinemaHalls)
      //     .rightJoin(
      //       movieShowtimes,
      //       eq(movieShowtimes.moviesToCinemaHallsId, moviesToCinemaHalls.id)
      //     )
      //     .where(
      //       and(
      //         eq(moviesToCinemaHalls.movieSlug, slug),
      //         eq(moviesToCinemaHalls.citySlug, city)
      //       )
      //     );

      return {
        cinemas: makeDataNonNullable(data),
        pageCount: Math.ceil(/*total.count*/ 0 / perPageLimit),
      };
    });

    return transaction;
  } catch {
    return {
      cinemas: [],
      pageCount: 0,
    };
  }
};
