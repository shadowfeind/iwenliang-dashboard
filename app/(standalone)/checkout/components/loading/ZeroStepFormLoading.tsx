import { Skeleton } from "@/components/ui/skeleton";

const ZeroStepFormLoading = () => {
  return (
    <>
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index}>
          <Skeleton className="h-15 w-100 mt-4" />
          <Skeleton className="h-43 w-full mt-4" />
        </div>
      ))}
    </>
  );
};

export default ZeroStepFormLoading;
