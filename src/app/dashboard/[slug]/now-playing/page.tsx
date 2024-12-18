import { getNowPlayingByCinemaSlug } from "@/actions/get-now-playing-by-cinema-slug";
import { DataTable } from "@/components/data-table";

import { AddButton } from "./add-button";
import { columns } from "./columns";

interface Props {
  params: {
    slug: string;
  };
}

const Page = async ({ params }: Props) => {
  const { slug } = await params;
  const { movies } = await getNowPlayingByCinemaSlug(slug);

  return (
    <main className="lg:px-24">
      <DataTable
        columns={columns}
        data={movies}
        filterableColumn="title"
        actionMenuChildren={<AddButton />}
      />
    </main>
  );
};

export default Page;
