import Link from "next/link";
import { notFound } from "next/navigation";

import {
  CalendarIcon,
  ChevronRightIcon,
  ClockIcon,
  StarIcon,
  TagIcon,
  TicketIcon,
} from "lucide-react";

import { getMovieBySlug } from "@/actions/get-movie-by-slug";
import { TopActionBar } from "@/components/top-action-bar";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn, formatDate, formatPGTime } from "@/lib/utils";

interface Props {
  params: {
    city: string;
    slug: string;
  };
}

const Page = async ({ params }: Props) => {
  const { city, slug } = await params;
  const movie = await getMovieBySlug(slug);

  if (!movie) {
    notFound();
  }

  return (
    <main className="container mx-auto p-4">
      <TopActionBar title={movie.title} backUrl={`/${city}`} />
      <div className="mt-6 space-y-6 lg:flex lg:space-x-6 lg:space-y-0">
        <div className="lg:w-1/2">
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <iframe
              className="aspect-video h-full w-full"
              src={movie.trailerUrl}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
            <Button className="absolute bottom-4 left-4" variant="secondary">
              Watch Trailer
            </Button>
          </div>
        </div>
        <div className="space-y-6 lg:w-1/2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <StarIcon className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="font-bold">8.8/10</span>
              <span className="text-sm text-gray-500">(18.4K Votes)</span>
            </div>
            <Button variant="outline" size="sm">
              Rate now
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge>{movie.certificate}</Badge>
            <Badge>{movie.language}</Badge>
            <Badge variant="secondary" className="flex items-center">
              <ClockIcon className="mr-1 h-3 w-3" />
              {formatPGTime(movie.duration)}
            </Badge>
            <Badge variant="secondary" className="flex items-center">
              <TagIcon className="mr-1 h-3 w-3" />
              Action, Thriller
            </Badge>
            <Badge variant="secondary" className="flex items-center">
              <CalendarIcon className="mr-1 h-3 w-3" />
              {formatDate(movie.releaseDate)}
            </Badge>
          </div>
          <p className="text-sm text-gray-600">{movie.description}</p>
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Top offers for you</h2>
            <Carousel>
              <CarouselContent>
                <CarouselItem className="basis-full sm:basis-1/2">
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="mb-2 font-semibold">
                        YES Private Debit Card Offer
                      </h3>
                      <p className="text-sm text-gray-600">
                        Tap to view details
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
                <CarouselItem className="basis-full sm:basis-1/2">
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="mb-2 font-semibold">
                        IndusInd Bank Credit Card Offer
                      </h3>
                      <p className="text-sm text-gray-600">
                        Tap to view details
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
                <CarouselItem className="basis-full sm:basis-1/2">
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="mb-2 font-semibold">
                        HDFC Credit Card Offer
                      </h3>
                      <p className="text-sm text-gray-600">
                        Tap to view details
                      </p>
                    </CardContent>
                  </Card>
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </div>
          <Link
            href={`/${city}/movies/${slug}/shows`}
            className={cn(
              "mt-4 w-full",
              buttonVariants({
                size: "lg",
              })
            )}
          >
            <TicketIcon className="size-4" />
            Book tickets
          </Link>
        </div>
      </div>
      <div className="mt-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Top reviews</h2>
          <Button variant="link" className="text-sm">
            12.9K reviews
            <ChevronRightIcon className="ml-1 h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">#SuperDirection 9079</Badge>
          <Badge variant="secondary">#GreatActing 9069</Badge>
          <Badge variant="secondary">#AwesomeStory 8608</Badge>
        </div>
        <Carousel>
          <CarouselContent>
            <CarouselItem className="basis-full sm:basis-1/2 md:basis-1/3">
              <Card>
                <CardContent className="p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-semibold">User</span>
                    <div className="flex items-center">
                      <StarIcon className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1">10/10</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    This movie was absolutely fantastic! The direction and
                    acting were superb...
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>
            <CarouselItem className="basis-full sm:basis-1/2 md:basis-1/3">
              <Card>
                <CardContent className="p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-semibold">User</span>
                    <div className="flex items-center">
                      <StarIcon className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1">10/10</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    This movie was absolutely fantastic! The direction and
                    acting were superb...
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>
            <CarouselItem className="basis-full sm:basis-1/2 md:basis-1/3">
              <Card>
                <CardContent className="p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-semibold">User</span>
                    <div className="flex items-center">
                      <StarIcon className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="ml-1">10/10</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    This movie was absolutely fantastic! The direction and
                    acting were superb...
                  </p>
                </CardContent>
              </Card>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </main>
  );
};

export default Page;
