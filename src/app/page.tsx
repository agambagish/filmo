import Image from "next/image";
import Link from "next/link";

import { ChevronRightIcon, ClapperboardIcon } from "lucide-react";

import { getNowPlayingByCity } from "@/actions/get-now-playing-by-city";
import { TechStack } from "@/components/tech-stack";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const Page = async () => {
  const { movies } = await getNowPlayingByCity("kolkata");

  return (
    <main className="container mx-auto px-4 py-8">
      <section className="relative h-full overflow-hidden py-5 md:py-14">
        <div className="z-10 flex flex-col">
          <div className="mt-10 grid grid-cols-1 md:mt-20">
            <div className="flex flex-col items-start gap-6 px-7 pb-8 text-center md:items-center md:px-10">
              <Link
                href="https://github.com/agambagish/filmo"
                target="_blank"
                className={cn(
                  buttonVariants({
                    variant: "outline",
                    size: "sm",
                  }),
                  "rounded-full"
                )}
              >
                🚀 <Separator className="mx-2 h-4" orientation="vertical" />
                Proudly Open Source
                <ChevronRightIcon className="ml-1 h-4 w-4 text-muted-foreground" />
              </Link>
              <div className="relative flex flex-col gap-4 md:items-center lg:flex-row">
                <h1
                  className={cn(
                    "relative mx-0 max-w-[43.5rem] pt-5 md:mx-auto md:px-4 md:py-2",
                    "text-balance text-left font-semibold tracking-tighter md:text-center",
                    "text-5xl sm:text-7xl md:text-7xl lg:text-7xl"
                  )}
                >
                  Lorem ipsum dolor sit amet consectetur.
                </h1>
              </div>
              <p className="max-w-xl text-balance text-left text-base tracking-tight text-muted-foreground md:text-center md:text-lg">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Molestiae totam beatae sit facilis ipsa reprehenderit?
              </p>
              <div className="mx-0 flex w-full max-w-full flex-col gap-4 py-1 sm:max-w-lg sm:flex-row md:mx-auto">
                <div className="flex w-full flex-col gap-2 sm:flex-row sm:gap-4">
                  <Link
                    href="/movies"
                    className={cn(
                      buttonVariants({
                        variant: "default",
                        size: "lg",
                      }),
                      "w-full"
                    )}
                  >
                    Book Tickets
                    <ChevronRightIcon className="size-4" />
                  </Link>
                  <Link
                    href="#"
                    className={cn(
                      buttonVariants({
                        size: "lg",
                        variant: "secondary",
                      }),
                      "w-full"
                    )}
                  >
                    Explore
                    <ChevronRightIcon className="size-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="relative mx-auto flex w-full max-w-56 items-center justify-center">
            <TechStack />
          </div>
        </div>
      </section>
      <section className="mt-8">
        <div className="mb-4 flex items-center">
          <Button size="icon" variant="secondary" className="mr-2 rounded-full">
            <ClapperboardIcon className="size-6" />
          </Button>
          <h2 className="text-lg font-semibold">Now Playing</h2>
        </div>
        <Carousel>
          <CarouselContent>
            {movies.map((movie) => (
              <CarouselItem
                key={movie.slug}
                className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/5"
              >
                <Card className="group relative overflow-hidden">
                  <CardContent className="p-0">
                    <Image
                      width={1080}
                      height={1280}
                      src={movie.bannerUrl}
                      alt={`${movie.title} banner`}
                      className="aspect-[4/5] w-full object-cover"
                      priority
                      quality={100}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/45 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="absolute bottom-0 left-0 right-0 flex flex-col items-start p-4">
                      <h3 className="mb-2 text-lg font-semibold text-white">
                        {movie.title}
                      </h3>
                      <Link
                        href="#"
                        className={buttonVariants({
                          size: "sm",
                          variant: "secondary",
                        })}
                      >
                        Book Now
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
    </main>
  );
};

export default Page;
