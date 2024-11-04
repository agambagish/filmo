import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <main className="container mx-auto p-4">
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
      </div>
      <div className="mt-4 flex justify-between">
        <div className="flex space-x-4">
          {[...Array(7)].map((_, i) => (
            <Skeleton key={i} className="h-24 w-16 py-2" />
          ))}
        </div>
      </div>
      <div className="mt-4 space-y-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="border-2 border-dashed">
            <CardContent className="p-6">
              <div className="mb-4 flex items-start justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-6 w-48" />
                  <div className="flex space-x-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Skeleton className="h-8 w-8 rounded-md" />
                  <Skeleton className="h-8 w-8 rounded-md" />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {[...Array(6)].map((_, i) => (
                  <Skeleton key={i} className="h-9 w-20 rounded-md" />
                ))}
              </div>
              <Skeleton className="mt-2 h-4 w-40" />
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
};

export default Loading;
