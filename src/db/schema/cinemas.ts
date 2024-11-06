import { relations } from "drizzle-orm";
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

import { cities } from "./cities";
import { moviesToCinemas } from "./movies-to-cinemas";

export const cinemas = pgTable("cinemas", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  slug: text().notNull().unique(),
  location: text().notNull(),
  citySlug: text().notNull(),
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
    fields: [cinemas.citySlug],
    references: [cities.slug],
  }),
}));

export const insertCinemaSchema = createInsertSchema(cinemas, {
  name: (s) =>
    s.name.min(3, { message: "Name must be longer than 3 characters." }),
  location: (s) =>
    s.location.min(5, {
      message: "Location must be longer than 5 characters.",
    }),
})
  .required({
    citySlug: true,
  })
  .omit({
    id: true,
    slug: true,
    ownerId: true,
    createdAt: true,
    updatedAt: true,
  });
