import BreadCrumbsComponent from "@/components/layout/BreadCrumsComponent";
import { Separator } from "@/components/ui/separator";
import Container from "@/components/website/Container";
import SingleProduct from "@/components/website/products/singleProduct/SingleProduct";
import SingleProductLoading from "@/components/website/products/singleProduct/SingleProductLoading";
import { Suspense } from "react";

type Props = {
  params: Promise<{ slug: string }>;
};

const page = async (prop: Props) => {
  const params = await prop.params;
  const breadcrumbs = [
    { title: "Home", link: "/" },
    { title: "Bracelets", link: "/bracelets" },
    { title: params.slug },
  ];
  return (
    <>
      <Container style="mt-3">
        <BreadCrumbsComponent items={breadcrumbs} />
        <Suspense fallback={<SingleProductLoading />}>
          <SingleProduct slug={params.slug} />
        </Suspense>
      </Container>
    </>
  );
};

export default page;
