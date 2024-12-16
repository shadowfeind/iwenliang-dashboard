import BreadCrumbsComponent from "@/components/layout/BreadCrumsComponent";
import BraceletPage from "@/components/website/bracelets/BraceletPage";
import BraceletPageLoading from "@/components/website/bracelets/BraceletPageLoading";
import Container from "@/components/website/Container";
import SpacedContainer from "@/components/website/SpacedContainer";
import { Suspense } from "react";

const breadcrumbs = [{ title: "Home", link: "/" }, { title: "Bracelets" }];

const BraceletsPage = () => {
  return (
    <>
      <Container style="mt-3">
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
