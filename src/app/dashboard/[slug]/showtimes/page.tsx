import Link from "next/link";

import { AlarmClockIcon, PencilLineIcon } from "lucide-react";

import { getNowPlayingByCinemaSlug } from "@/actions/get-now-playing-by-cinema-slug";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn, formatDate } from "@/lib/utils";

interface Props {
  params: {
    slug: string;
  };
}

const Page = async ({ params }: Props) => {
  const { slug } = await params;
  const { movies } = await getNowPlayingByCinemaSlug(slug);

  return (
    <main className="grid md:grid-cols-2 lg:grid-cols-3">
      {movies.map((movie) => (
        <Card key={movie.slug}>
          <CardHeader>
            <CardTitle>{movie.title}</CardTitle>
            <CardDescription>{movie.slug}</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge>
              <AlarmClockIcon className="mr-2 size-4" />
              {formatDate(movie.releaseDate)}
            </Badge>
          </CardContent>
          <CardFooter>
            <Link
              href={`/dashboard/${slug}/showtimes/${movie.slug}`}
              className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
            >
              <PencilLineIcon className="size-4" />
              Edit showtimes
            </Link>
          </CardFooter>
        </Card>
      ))}
    </main>
  );
};

export default Page;
