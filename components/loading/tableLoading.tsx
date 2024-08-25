import { Skeleton } from "@/components/ui/skeleton";

export function TableLoading() {
  return (
    <div className="flex flex-col space-y-3">
      <div className="space-y-2">
        <Skeleton className="h-10 w-[350px]" />
      </div>
      <Skeleton className="h-[250px] w-full rounded-xl" />
    </div>
  );
}
