import { relations } from "drizzle-orm";
import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { movies } from "./movies";

export const languages = pgTable("languages", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  label: text().notNull().unique(),
  slug: text().notNull().unique(),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const languagesRelations = relations(languages, ({ many }) => ({
  movies: many(movies),
}));
