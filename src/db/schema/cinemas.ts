import { relations } from "drizzle-orm";
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { cities } from "./cities";
import { moviesToCinemas } from "./movies-to-cinemas";

export const cinemas = pgTable("cinemas", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  slug: text().notNull().unique(),
  location: text().notNull(),
  cityId: integer().notNull(),
  ownerId: text().notNull().unique(),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const cinemasRelations = relations(cinemas, ({ many, one }) => ({
  moviesToCinemas: many(moviesToCinemas),
  city: one(cities, {
    fields: [cinemas.cityId],
    references: [cities.id],
  }),
}));
