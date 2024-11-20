import BreadCrumbsComponent from "@/components/layout/BreadCrumsComponent";
import MainContainer from "@/components/layout/MainContainer";
import { TableLoading } from "@/components/loading/tableLoading";
import { Suspense } from "react";
import CategoryPage from "../../../../features/categories/categoryPage";

const breadcrumbs = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Category" },
];

const page = () => {
  return (
    <MainContainer>
      <BreadCrumbsComponent items={breadcrumbs} />
      <div>Category</div>
      <Suspense fallback={<TableLoading />}>
        <CategoryPage />
      </Suspense>
    </MainContainer>
  );
};

export default page;
