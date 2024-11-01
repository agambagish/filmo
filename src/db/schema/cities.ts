import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

const cities = pgTable("cities", {
  id: serial().primaryKey(),
  label: text().notNull(),
  slug: text().notNull().unique(),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp()
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export default cities;
