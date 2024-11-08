"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ClapperboardIcon } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { cinemas } from "@/db/schema";
import { unslugify } from "@/lib/utils";

interface Props extends React.PropsWithChildren {
  cinema: Pick<typeof cinemas.$inferSelect, "name" | "slug"> & { city: string };
}

const navItems = [
  {
    title: "Dashboard",
    slug: "",
    items: [
      {
        title: "Now Playing",
        slug: "now-playing",
      },
      {
        title: "Screens",
        slug: "screens",
      },
      {
        title: "Bookings",
        slug: "bookings",
      },
    ],
  },
];

export const DashboardSidebar = ({ children, cinema }: Props) => {
  const pathname = usePathname();
  const pathParts = pathname.split("/").filter((part) => part !== "");

  const breadcrumbs = [
    { label: "Dashboard", url: `/${pathParts.slice(0, 2).join("/")}` },
  ];

  pathParts.slice(2).forEach((part, index) => {
    const url = `/${pathParts.slice(0, index + 3).join("/")}`;
    const label = unslugify(part);

    breadcrumbs.push({ label, url });
  });

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link href={`/dashboard/${cinema.slug}`}>
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <ClapperboardIcon className="size-4" />
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none">
                    <span className="font-semibold">{cinema.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {cinema.city}
                    </span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={`/dashboard/${cinema.slug}/${item.slug}`}
                      className="font-medium"
                    >
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                  {item.items?.length ? (
                    <SidebarMenuSub>
                      {item.items.map((item) => (
                        <SidebarMenuSubItem key={item.title}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={
                              pathname ===
                              `/dashboard/${cinema.slug}/${item.slug}`
                            }
                          >
                            <Link
                              href={`/dashboard/${cinema.slug}/${item.slug}`}
                            >
                              {item.title}
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  ) : null}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b">
          <div className="flex items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((route, i) => (
                  <div key={i} className="flex items-center">
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink asChild>
                        <Link href={route.url} className="capitalize">
                          {route.label}
                        </Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    {i !== breadcrumbs.length - 1 && (
                      <BreadcrumbSeparator className="ml-2 hidden md:block" />
                    )}
                  </div>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};
