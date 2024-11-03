import { relations } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  text,
  time,
  timestamp,
} from "drizzle-orm/pg-core";

import { languages } from "./languages";
import { moviesToCinemas } from "./movies-to-cinemas";

export const certificateEnum = pgEnum("certificate", ["U", "UA", "A", "S"]);

export const movies = pgTable("movies", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: text().notNull(),
  slug: text().notNull().unique(),
  description: text().notNull(),
  bannerUrl: text().notNull(),
  trailerUrl: text().notNull(),
  languageId: integer().notNull(),
  duration: time().notNull(),
  certificate: certificateEnum().notNull(),
  releaseDate: timestamp({ withTimezone: true }).notNull(),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const moviesRelations = relations(movies, ({ many, one }) => ({
  language: one(languages, {
    fields: [movies.languageId],
    references: [languages.id],
  }),
  moviesToCinemas: many(moviesToCinemas),
}));
