import { notFound } from "next/navigation";

import { getCinemaBySlug } from "@/actions/get-cinema-by-slug";
import { DashboardSidebar } from "@/components/dashboard-sidebar";

interface Props extends React.PropsWithChildren {
  params: {
    slug: string;
  };
}

const Layout = async ({ children, params }: Props) => {
  const { slug } = await params;
  const { cinema } = await getCinemaBySlug(slug);

  if (!cinema) {
    notFound();
  }

  return <DashboardSidebar cinema={cinema}>{children}</DashboardSidebar>;
};

export default Layout;
