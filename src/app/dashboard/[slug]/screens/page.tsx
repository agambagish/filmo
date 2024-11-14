import { AlarmClockIcon } from "lucide-react";

const Page = () => {
  return (
    <main className="flex h-[80vh] flex-col items-center justify-center space-y-2 text-muted-foreground">
      <AlarmClockIcon className="size-8" />
      <p className="text-sm font-semibold">Coming Soon</p>
    </main>
  );
};

export default Page;
