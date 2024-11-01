"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

const Page = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-4">
      <p className="text-muted-foreground">Lorem, ipsum.</p>
      <Button onClick={() => toast.info("Lorem ipsum dolor sit amet.")}>
        Click Me
      </Button>
    </div>
  );
};

export default Page;
