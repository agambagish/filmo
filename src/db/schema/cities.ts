import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const cities = pgTable("cities", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  label: text().notNull().unique(),
  slug: text().notNull().unique(),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});
