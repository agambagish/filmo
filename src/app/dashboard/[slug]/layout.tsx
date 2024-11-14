import { Outfit } from "next/font/google";
import { notFound } from "next/navigation";

import { currentUser } from "@clerk/nextjs/server";

import { getCinemaBySlug } from "@/actions/get-cinema-by-slug";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { Providers } from "@/providers";

interface Props extends React.PropsWithChildren {
  params: {
    slug: string;
  };
}

const font = Outfit({ subsets: ["latin"] });

const Layout = async ({ children, params }: Props) => {
  const { slug } = await params;
  const { cinema } = await getCinemaBySlug(slug);
  const user = await currentUser();

  if (!cinema) {
    notFound();
  }

  return (
    <Providers
      toastProps={{
        toastOptions: { className: font.className },
      }}
    >
      <DashboardSidebar cinema={cinema} user={JSON.parse(JSON.stringify(user))}>
        {children}
      </DashboardSidebar>
    </Providers>
  );
};

export default Layout;
