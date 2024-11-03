import { relations } from "drizzle-orm";
import { integer, pgTable, timestamp } from "drizzle-orm/pg-core";

import { moviesToCinemas } from "./movies-to-cinemas";

export const showtimes = pgTable("showtimes", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  timestamp: timestamp({ withTimezone: true }).notNull(),
  moviesToCinemasUid: integer().notNull(),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const showtimesRelations = relations(showtimes, ({ one }) => ({
  moviesToCinemas: one(moviesToCinemas, {
    fields: [showtimes.moviesToCinemasUid],
    references: [moviesToCinemas.uid],
  }),
}));
