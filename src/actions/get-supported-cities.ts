"use server";

import { db } from "@/db";

export const getSupportedCities = async () => {
  try {
    const cities = await db.query.cities.findMany({
      columns: {
        id: true,
        label: true,
        slug: true,
      },
    });

    return cities;
  } catch {
    return [];
  }
};
