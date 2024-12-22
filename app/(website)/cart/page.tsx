import BreadCrumbsComponent from "@/components/layout/BreadCrumsComponent";
import { CartPage } from "@/components/website/cart/CartPage";
import Container from "@/components/website/Container";
import SpacedContainer from "@/components/website/SpacedContainer";

const breadcrumbs = [{ title: "Home", link: "/" }, { title: "Cart" }];

const page = () => {
  return (
    <>
      <Container style="mt-3">
        <BreadCrumbsComponent items={breadcrumbs} />
      </Container>
      <SpacedContainer>
        <CartPage />
      </SpacedContainer>
    </>
  );
};

export default page;
