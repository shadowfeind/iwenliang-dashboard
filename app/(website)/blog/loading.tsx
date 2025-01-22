import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center mb-16 w-full">
        <Skeleton className="w-80 h-12 " />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-96 w-full rounded-xl" />
        ))}
      </div>
    </div>
  );
};

export default loading;
