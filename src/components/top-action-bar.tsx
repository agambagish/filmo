import Link from "next/link";

import { ChevronLeftIcon, Share2Icon } from "lucide-react";

import { Button, buttonVariants } from "@/components/ui/button";

interface Props {
  title: string;
  backUrl: string;
}

export const TopActionBar = ({ title, backUrl }: Props) => {
  return (
    <div className="flex items-center justify-between">
      <Link
        href={backUrl}
        className={buttonVariants({
          variant: "ghost",
          size: "icon",
        })}
      >
        <ChevronLeftIcon className="size-6" />
      </Link>
      <h1 className="text-2xl font-semibold">{title}</h1>
      <Button variant="ghost" size="icon">
        <Share2Icon className="h-6 w-6" />
      </Button>
    </div>
  );
};
