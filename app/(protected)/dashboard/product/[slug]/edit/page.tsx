import { ErrorComponent } from "@/components/ErrorComponent";
import MainContainer from "@/components/layout/MainContainer";
import { PRODUCT_ROUTE } from "@/config/constant/routes";
import { CategoryType } from "@/features/categories/category.types";
import { getAllCategories } from "@/features/categories/category.query";
import { getProductBySlug } from "@/features/products/product.query";
import BreadCrumbsComponent from "@/components/layout/BreadCrumsComponent";
import ProductEditPage from "@/features/products/productEditPage";

const breadcrumbs = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Products", link: PRODUCT_ROUTE },
  { title: "Edit" },
];

type Props = {
  params: Promise<{ slug: string }>;
};

const Page = async (props: Props) => {
  const params = await props.params;
  const [productData, categoryData] = await Promise.all([
    getProductBySlug(params.slug),
    getAllCategories(),
  ]);

  if ("error" in productData) {
    return (
      <MainContainer>
        <BreadCrumbsComponent items={breadcrumbs} />
        <ErrorComponent message={productData.error} />
      </MainContainer>
    );
  }

  const categories: CategoryType[] =
    "error" in categoryData ? [] : categoryData;
  const categoriesName = categories.map((cat) => ({
    value: cat._id,
    label: cat.name,
  }));

  return (
    <MainContainer>
      <BreadCrumbsComponent items={breadcrumbs} />
      <ProductEditPage data={productData} categoriesName={categoriesName} />
    </MainContainer>
  );
};

export default Page;
