import BreadCrumbsComponent from "@/components/layout/BreadCrumsComponent";
import Container from "@/components/website/Container";
import SingleProduct from "@/components/website/products/singleProduct/SingleProduct";
import SingleProductLoading from "@/components/website/products/singleProduct/SingleProductLoading";
import { Suspense } from "react";

type Props = {
  params: Promise<{ slug: string }>;
};

const page = async (props: Props) => {
  const params = await props.params;
  const breadcrumbs = [
    { title: "Home", link: "/" },
    { title: "Bracelets", link: "/bracelets" },
    { title: params.slug },
  ];
  return (
    <Container style="mt-3">
      <Container style="p-3">
        <BreadCrumbsComponent items={breadcrumbs} />
      </Container>
      <Suspense fallback={<SingleProductLoading />}>
        <SingleProduct slug={params.slug} />
      </Suspense>
    </Container>
  );
};

export default page;
