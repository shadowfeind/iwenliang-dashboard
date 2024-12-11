import BreadCrumbsComponent from "@/components/layout/BreadCrumsComponent";
import BraceletPage from "@/components/website/bracelets/BraceletPage";
import BraceletPageLoading from "@/components/website/bracelets/BraceletPageLoading";
import Container from "@/components/website/Container";
import SpacedContainer from "@/components/website/SpacedContainer";
import { Suspense } from "react";
import { Separator } from "@/components/ui/separator";

const breadcrumbs = [{ title: "Home", link: "/" }, { title: "Bracelets" }];

const BraceletsPage = () => {
  return (
    <>
      <Container>
        <Separator className="mb-2" />
        <BreadCrumbsComponent items={breadcrumbs} />
      </Container>
      <SpacedContainer>
        <Suspense fallback={<BraceletPageLoading />}>
          <BraceletPage />
        </Suspense>
      </SpacedContainer>
    </>
  );
};

export default BraceletsPage;
