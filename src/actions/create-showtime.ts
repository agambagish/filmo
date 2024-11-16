"use server";

import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { cinemas, moviesToCinemas, showtimes } from "@/db/schema";

interface ReturnType {
  showtime: Pick<typeof showtimes.$inferSelect, "timestamp"> | null;
  error: string | null;
}

interface Payload {
  movieSlug: string;
  timestamp: Date;
}

export const createShowtime = async ({
  movieSlug,
  timestamp,
}: Payload): Promise<ReturnType> => {
  try {
    const { userId } = await auth();

    const cinema = await db.query.cinemas.findFirst({
      columns: { id: true, citySlug: true },
      where: eq(cinemas.ownerId, userId ?? ""),
    });

    const movie = await db.query.moviesToCinemas.findFirst({
      columns: { uid: true },
      where: and(
        eq(moviesToCinemas.movieSlug, movieSlug),
        eq(moviesToCinemas.cinemaId, cinema?.id ?? NaN),
        eq(moviesToCinemas.citySlug, cinema?.citySlug ?? "")
      ),
    });

    const [newShowtime] = await db
      .insert(showtimes)
      .values({
        moviesToCinemasUid: movie?.uid ?? NaN,
        timestamp,
      })
      .returning({
        timestamp: showtimes.timestamp,
      });

    return {
      showtime: newShowtime,
      error: null,
    };
  } catch {
    return {
      showtime: null,
      error: "Something went wrong! Please try again.",
    };
  }
};
