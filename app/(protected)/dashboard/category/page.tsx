import BreadCrumbsComponent from "@/components/layout/BreadCrumsComponent";
import MainContainer from "@/components/layout/MainContainer";
import { TableLoading } from "@/components/loading/tableLoading";
import { Suspense } from "react";
import CategoryPage from "../../../../features/categories/categoryPage";
import { auth } from "@/auth";
import { allowedRoles } from "@/config/constant/allowedRoles";
import Unauthorized from "@/components/auth/Unauthorized";

const breadcrumbs = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Category" },
];

const page = async () => {
  const session = await auth();

  if (!session || !allowedRoles.includes(session.user.role)) {
    return <Unauthorized />;
  }
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
