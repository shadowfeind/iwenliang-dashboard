import { auth } from "@/auth";
import BreadCrumbsComponent from "@/components/layout/BreadCrumsComponent";
import { CartPage } from "@/components/website/cart/CartPage";
import Container from "@/components/website/Container";
import SpacedContainer from "@/components/website/SpacedContainer";
import { redirect } from "next/navigation";

const breadcrumbs = [{ title: "Home", link: "/" }, { title: "Cart" }];

const page = async () => {
  const session = await auth();
  if (!session) redirect("/sign-in?redirect=cart");
  return (
    <>
      <Container style="p-3">
        <BreadCrumbsComponent items={breadcrumbs} />
      </Container>
      <SpacedContainer>
        <CartPage />
      </SpacedContainer>
    </>
  );
};

export default page;
