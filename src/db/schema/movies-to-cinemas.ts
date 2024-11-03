import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  primaryKey,
  serial,
  text,
} from "drizzle-orm/pg-core";

import { cinemas } from "./cinemas";
import { cities } from "./cities";
import { movies } from "./movies";
import { showtimes } from "./showtimes";

export const moviesToCinemas = pgTable(
  "movies_to_cinemas",
  {
    uid: serial().notNull().unique(),
    movieId: integer().notNull(),
    cinemaId: integer().notNull(),
    citySlug: text().notNull(),
  },
  (t) => ({
    pk: primaryKey({
      columns: [t.uid, t.movieId, t.cinemaId, t.citySlug],
    }),
  })
);

export const moviesToCinemasRelations = relations(
  moviesToCinemas,
  ({ one, many }) => ({
    cinema: one(cinemas, {
      fields: [moviesToCinemas.cinemaId],
      references: [cinemas.id],
    }),
    movie: one(movies, {
      fields: [moviesToCinemas.movieId],
      references: [movies.id],
    }),
    city: one(cities, {
      fields: [moviesToCinemas.citySlug],
      references: [cities.slug],
    }),
    showtimes: many(showtimes),
  })
);
