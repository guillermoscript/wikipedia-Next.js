import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ArticlePageLoading() {
  return (
    <div className="container mx-auto flex flex-col md:flex-row py-8 px-4">
      <aside className="w-full md:w-1/4 md:pr-8 relative">
        <div className="sticky top-4 space-y-2">
          <Card className="p-4">
            <CardHeader>
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-20" />
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-8" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-1">
              <div className="group relative">
                <Skeleton className="h-6 w-full" />
                <div className="absolute left-full top-0 z-10 w-48 rounded-md bg-white shadow-lg group-hover:block hidden">
                  <Skeleton className="h-16 w-full" />
                </div>
              </div>
              <div className="group relative">
                <Skeleton className="h-6 w-full" />
                <div className="absolute left-full top-0 z-10 w-48 rounded-md bg-white shadow-lg group-hover:block hidden">
                  <Skeleton className="h-16 w-full" />
                </div>
              </div>
              <div className="group relative">
                <Skeleton className="h-6 w-full" />
                <div className="absolute left-full top-0 z-10 w-48 rounded-md bg-white shadow-lg group-hover:block hidden">
                  <Skeleton className="h-16 w-full" />
                </div>
              </div>
              <div className="group relative">
                <Skeleton className="h-6 w-full" />
                <div className="absolute left-full top-0 z-10 w-48 rounded-md bg-white shadow-lg group-hover:block hidden">
                  <Skeleton className="h-16 w-full" />
                </div>
              </div>
              <div className="group relative">
                <Skeleton className="h-6 w-full" />
                <div className="absolute left-full top-0 z-10 w-48 rounded-md bg-white shadow-lg group-hover:block hidden">
                  <Skeleton className="h-16 w-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </aside>
      <main className="w-full md:w-3/4">
        <article>
          <Skeleton className="h-10 w-40 mt-4 mb-2" />
          <div className="flex items-center justify-between mb-4">
            <div className="flex space-x-2">
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
            </div>
            <div className="flex items-center space-x-2">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-8" />
            </div>
          </div>
          <Skeleton className="h-4 w-full mb-4" />
          <Skeleton className="h-48 w-full mb-4" />
          <Skeleton className="h-4 w-full mb-4" />
          <Skeleton className="h-4 w-full mb-4" />
          <Skeleton className="h-48 w-full mb-4" />
          <Skeleton className="h-4 w-full mb-4" />
        </article>
      </main>
    </div>
  );
}
