import type { Metadata } from "next";
import { Outfit } from "next/font/google";

import { Providers } from "@/providers";

import "./globals.css";

export const metadata: Metadata = {
  title: "Filmo",
  description: "Generated by create next app",
};

const font = Outfit({ subsets: ["latin"] });

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        <Providers
          toastProps={{
            toastOptions: { className: font.className },
          }}
        >
          {children}
        </Providers>
      </body>
    </html>
  );
};

export default Layout;