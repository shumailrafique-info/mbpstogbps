import { Skeleton } from "@/components/ui/skeleton";

/**
 * Mirrors the dashboard's layout so the page does not jump when the stats
 * arrive - same header, same four cards, same two-column split.
 */
export default function Loading() {
  return (
    <div className="w-full">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 px-6 py-6 sm:px-8">
        <div className="space-y-2">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-4 w-56" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-28" />
          <Skeleton className="h-9 w-32" />
        </div>
      </div>

      <div className="space-y-8 px-6 py-6 sm:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3].map((card) => (
            <div
              key={card}
              className="flex flex-col gap-3 rounded-lg border border-slate-200 p-5"
            >
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="size-5 rounded" />
              </div>
              <Skeleton className="h-9 w-20" />
              <Skeleton className="h-3 w-32" />
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Skeleton className="mb-3 h-4 w-44" />
            <div className="divide-y divide-slate-100 rounded-lg border border-slate-200">
              {[0, 1, 2, 3, 4].map((row) => (
                <div
                  key={row}
                  className="flex items-center justify-between gap-4 px-4 py-3"
                >
                  <div className="min-w-0 flex-1 space-y-2">
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-3 w-1/4" />
                  </div>
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <Skeleton className="mb-3 h-4 w-32" />
            <div className="space-y-3 rounded-lg border border-slate-200 p-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-3 w-3/4" />
              <Skeleton className="h-3 w-2/3" />
              <Skeleton className="h-9 w-full" />
            </div>
            <div className="mt-4 space-y-2 rounded-lg border border-slate-200 p-4">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
