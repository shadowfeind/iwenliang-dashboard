import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 flex flex-col justify-center items-center">
      <Skeleton className="h-[43] w-[262]" />
      <Skeleton className="h-[43] w-[400] mt-4" />
      <div className="container mx-auto py-10 ">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/4">
            <Skeleton className="h-[500] w-[500]" />
          </div>
          <div className="w-full lg:w-2/4">
            <Skeleton className="h-[500] w-[500]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default loading;
