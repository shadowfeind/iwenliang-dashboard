import { Skeleton } from "@/components/ui/skeleton";

const BraceletPageLoading = () => {
  return (
    <div className="flex flex-col space-y-3">
      <div className="grid grid-cols-1 md:grid-cols-4 pt-4  gap-6">
        <Skeleton className="h-40 md:h-60 w-full rounded-xl" />
        <Skeleton className="h-40 md:h-60 w-full rounded-xl" />
        <Skeleton className="h-40 md:h-60 w-full rounded-xl" />
        <Skeleton className="h-40 md:h-60 w-full rounded-xl" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 pt-4  gap-6">
        <Skeleton className="h-40 md:h-60 w-full rounded-xl" />
        <Skeleton className="h-40 md:h-60 w-full rounded-xl" />
        <Skeleton className="h-40 md:h-60 w-full rounded-xl" />
        <Skeleton className="h-40 md:h-60 w-full rounded-xl" />
      </div>
    </div>
  );
};

export default BraceletPageLoading;
