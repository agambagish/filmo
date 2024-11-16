import { notFound } from "next/navigation";

import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";

import { DataTable } from "@/components/data-table";
import { db } from "@/db";
import { showtimes as _showtimes, cinemas, moviesToCinemas } from "@/db/schema";

import { AddButton } from "./add-button";
import { columns } from "./columns";

interface Props {
  params: {
    movieSlug: string;
  };
}

const Page = async ({ params }: Props) => {
  const { movieSlug } = await params;
  const { userId } = await auth();

  const cinema = await db.query.cinemas.findFirst({
    columns: { citySlug: true, id: true },
    where: eq(cinemas.ownerId, userId ?? ""),
  });

  const movie = await db.query.moviesToCinemas.findFirst({
    columns: { uid: true },
    where: and(
      eq(moviesToCinemas.cinemaId, cinema?.id ?? NaN),
      eq(moviesToCinemas.citySlug, cinema?.citySlug ?? ""),
      eq(moviesToCinemas.movieSlug, movieSlug)
    ),
  });

  if (!movie) {
    notFound();
  }

  const showtimes = await db
    .select({
      id: _showtimes.id,
      date: _showtimes.timestamp,
      time: _showtimes.timestamp,
    })
    .from(_showtimes)
    .where(eq(_showtimes.moviesToCinemasUid, movie.uid));

  return (
    <main className="lg:px-24">
      {showtimes.length === 0 && (
        <p className="flex h-[80vh] items-center justify-center text-sm text-muted-foreground">
          No showtimes available
        </p>
      )}
      <DataTable
        columns={columns}
        data={showtimes.map((showtime) => ({
          ...showtime,
          screen: "Default",
          amenities: "Food & Beverage",
        }))}
        filterableColumn="date"
        actionMenuChildren={<AddButton />}
      />
    </main>
  );
};

export default Page;
