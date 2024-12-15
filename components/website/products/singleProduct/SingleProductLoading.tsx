import { Skeleton } from "@/components/ui/skeleton";

const SingleProductLoading = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
        <Skeleton className="h-96 w-full rounded-xl" />
        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <Skeleton className="h-96 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
};

export default SingleProductLoading;
