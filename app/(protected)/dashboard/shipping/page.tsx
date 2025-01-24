import { auth } from "@/auth";
import Unauthorized from "@/components/auth/Unauthorized";
import BreadCrumbsComponent from "@/components/layout/BreadCrumsComponent";
import MainContainer from "@/components/layout/MainContainer";
import { TableLoading } from "@/components/loading/tableLoading";
import { allowedRoles } from "@/config/constant/allowedRoles";
import { Suspense } from "react";

const breadcrumbs = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Shipping" },
];

const page = async () => {
  const session = await auth();

  if (!session || !allowedRoles.includes(session.user.role)) {
    return <Unauthorized />;
  }
  return (
    <MainContainer>
      <BreadCrumbsComponent items={breadcrumbs} />
      Shipping Page
      {/* <Suspense fallback={<TableLoading />}>
        <PromotionPage />
      </Suspense> */}
    </MainContainer>
  );
};

export default page;
