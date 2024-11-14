import { Loader2Icon } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex h-[80vh] items-center justify-center">
      <Loader2Icon className="size-9 animate-spin text-muted-foreground" />
    </div>
  );
};

export default Loading;
