import { relations } from "drizzle-orm";
import { integer, jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { cinemas } from "./cinemas";

export const screens = pgTable("screens", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  cinemaSlug: text().notNull(),
  seatSections: jsonb()
    .$type<
      {
        label: string;
        price: string;
        rows: {
          name: string;
          seats: {
            start: number;
            end: number;
            unavailable?: number[];
            aisleAfter?: {
              seatNumber: number;
              aisleAmount?: number;
            }[];
            aisleBefore?: {
              seatNumber: number;
              aisleAmount?: number;
            }[];
          };
        }[];
      }[]
    >()
    .notNull()
    .default([]),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const screensRelations = relations(screens, ({ one }) => ({
  cinema: one(cinemas, {
    fields: [screens.cinemaSlug],
    references: [cinemas.slug],
  }),
}));
