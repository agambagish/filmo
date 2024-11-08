"use server";

import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";

import { makeDataNonNullable } from "@/actions/utils";
import { db } from "@/db";
import { cinemas as _cinemas, cities } from "@/db/schema";

export const getCinemaBySlug = async (slug: string) => {
  const { userId } = await auth();

  try {
    const cinemas = await db
      .select({
        name: _cinemas.name,
        slug: _cinemas.slug,
        city: cities.label,
      })
      .from(_cinemas)
      .leftJoin(cities, eq(_cinemas.citySlug, cities.slug))
      .where(and(eq(_cinemas.slug, slug), eq(_cinemas.ownerId, userId ?? "")));

    const nonNullableData = makeDataNonNullable(cinemas);
    return { cinema: nonNullableData[0] };
  } catch {
    return { cinema: undefined };
  }
};
