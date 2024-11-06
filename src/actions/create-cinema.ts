"use server";

import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { cinemas } from "@/db/schema";
import { insertCinemaSchema } from "@/db/schema/cinemas";
import { slugify } from "@/lib/utils";

interface ReturnType {
  cinema: Pick<typeof cinemas.$inferSelect, "slug"> | null;
  error: string | null;
}

export const createCinema = async (
  payload: z.infer<typeof insertCinemaSchema>
): Promise<ReturnType> => {
  try {
    const { userId } = await auth();

    if (!userId) {
      return {
        cinema: null,
        error: "Unauthorized",
      };
    }

    const exists = await db.query.cinemas.findFirst({
      columns: { id: true },
      where: eq(cinemas.slug, slugify(payload.name)),
    });

    if (exists) {
      return {
        cinema: null,
        error: "Cinema with same name is already exists.",
      };
    }

    const [newCinema] = await db
      .insert(cinemas)
      .values({
        ...payload,
        slug: slugify(payload.name),
        ownerId: userId,
      })
      .returning({
        slug: cinemas.slug,
      });

    return {
      cinema: newCinema,
      error: null,
    };
  } catch {
    return {
      cinema: null,
      error: "Something went wrong! Please try again.",
    };
  }
};
