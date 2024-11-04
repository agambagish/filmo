import Link from "next/link";

import {
  AsteriskIcon,
  CalendarX2Icon,
  HeartIcon,
  InfoIcon,
} from "lucide-react";

import { getCinemasByMovieSlug } from "@/actions/get-cinemas-by-movie-slug";
import { DateFilter } from "@/components/date-filter";
import { TopActionBar } from "@/components/top-action-bar";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn, formatTime } from "@/lib/utils";

interface Props {
  params: {
    slug: string;
    city: string;
  };
  searchParams: {
    [key: string]: string | undefined;
  };
}

const Page = async ({ params, searchParams }: Props) => {
  const { city, slug } = await params;
  const { date } = await searchParams;

  const { cinemas } = await getCinemasByMovieSlug(
    { city, slug },
    { date: new Date(date ?? ""), perPageLimit: 1 }
  );

  return (
    <div className="container mx-auto p-4">
      <TopActionBar
        title="Choose suitable showtime"
        backUrl={`/${city}/movies/${slug}`}
      />
      <div className="my-4">
        <DateFilter />
      </div>
      {cinemas.length === 0 && (
        <div className="flex h-36 flex-col items-center justify-center space-y-2 text-muted-foreground">
          <CalendarX2Icon className="size-8" />
          <span>No showtimes available</span>
        </div>
      )}
      <div className="grid grid-cols-1 space-y-6 lg:grid-cols-2">
        {cinemas.map((cinema, i) => (
          <Card key={i} className="border-2 border-dashed">
            <CardContent className="p-6">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-semibold">{cinema.name}</h2>
                  <div className="mt-1 flex space-x-2">
                    {["M-Ticket", "Food & Beverage"].map((amenity, i) => (
                      <span key={i} className="text-xs text-gray-500">
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon">
                    <InfoIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <HeartIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {cinema.showtimes.map((showtime, i) => (
                  <Link
                    key={i}
                    href={`/${city}/movies/${slug}/showtimes/${showtime.id}`}
                    className={cn(
                      buttonVariants({
                        variant: "outline",
                      }),
                      "border-primary uppercase text-primary hover:bg-primary/10 hover:text-primary"
                    )}
                  >
                    {formatTime(showtime.timestamp)}
                  </Link>
                ))}
              </div>
              {true && (
                <div className="mt-4 flex items-center text-xs text-muted-foreground">
                  <AsteriskIcon className="mr-1 size-3" />
                  Cancellation Available
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Page;
