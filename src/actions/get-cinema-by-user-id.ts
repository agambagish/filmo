"use server";

import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { cinemas as _cinemas } from "@/db/schema";

import { makeDataNonNullable } from "./utils";

export const getCinemaByUserId = async () => {
  try {
    const { userId } = await auth();
    const cinemas = await db
      .select({
        id: _cinemas.id,
        slug: _cinemas.slug,
      })
      .from(_cinemas)
      .where(eq(_cinemas.ownerId, userId ?? ""));

    const nonNullableData = makeDataNonNullable(cinemas);
    return { cinema: nonNullableData[0] };
  } catch {
    return { cinema: undefined };
  }
};
