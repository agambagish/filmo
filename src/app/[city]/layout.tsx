import { redirect } from "next/navigation";

import { eq } from "drizzle-orm";

import { Header } from "@/components/header";
import { db } from "@/db";
import { cities } from "@/db/schema";

interface Props extends React.PropsWithChildren {
  params: {
    city: string;
  };
}

const Layout = async ({ params, children }: Props) => {
  const { city } = await params;

  const isValidCity = await db.query.cities.findFirst({
    columns: { id: true },
    where: eq(cities.slug, city),
  });

  if (!isValidCity) {
    redirect("/");
  }

  return (
    <>
      <Header city={city} />
      {children}
    </>
  );
};

export default Layout;
