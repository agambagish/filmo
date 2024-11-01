import { ClerkProvider } from "@clerk/nextjs";

import { Toaster } from "@/components/ui/sonner";

interface Props extends React.PropsWithChildren {
  toastProps?: {
    theme?: "light" | "dark" | "system";
    toastOptions?: {
      className?: string;
    };
  };
}

export const Providers = ({ children, toastProps }: Props) => {
  return (
    <ClerkProvider>
      {children}
      <Toaster richColors {...toastProps} />
    </ClerkProvider>
  );
};
