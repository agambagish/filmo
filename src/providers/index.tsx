import { ClerkProvider } from "@clerk/nextjs";

import { Toaster } from "@/components/ui/sonner";
import { ModalProvider } from "@/providers/modal-provider";
import { ThemeProvider } from "@/providers/theme-provider";

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
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ClerkProvider>
        {children}
        <ModalProvider />
        <Toaster richColors {...toastProps} />
      </ClerkProvider>
    </ThemeProvider>
  );
};
