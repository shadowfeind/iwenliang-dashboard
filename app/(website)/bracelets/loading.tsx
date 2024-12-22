import { Skeleton } from "@/components/ui/skeleton";
import BraceletPageLoading from "@/components/website/bracelets/BraceletPageLoading";
import Container from "@/components/website/Container";
import SpacedContainer from "@/components/website/SpacedContainer";

const loading = () => {
  return (
    <>
      <Container style="mt-3">
        <Skeleton className="h-[30] w-[500]" />
      </Container>
      <SpacedContainer>
        <Skeleton className="h-[40] w-[500]" />
        <BraceletPageLoading />
      </SpacedContainer>
    </>
  );
};

export default loading;
