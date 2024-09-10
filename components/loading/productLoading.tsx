import { Skeleton } from "@/components/ui/skeleton";

export function ProductLoading() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-40 w-full rounded-xl" />
      <div className="grid grid-cols-1 md:grid-cols-3 pt-4  gap-6">
        <Skeleton className="h-10 w-full rounded-xl" />
        <Skeleton className="h-10 w-full rounded-xl" />
        <Skeleton className="h-10 w-full rounded-xl" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
        <Skeleton className="h-10 w-full rounded-xl" />
        <Skeleton className="h-10 w-full rounded-xl" />
      </div>
      <div className="grid grid-cols-1">
        <Skeleton className="h-40 w-full rounded-xl" />
      </div>
    </div>
  );
}
