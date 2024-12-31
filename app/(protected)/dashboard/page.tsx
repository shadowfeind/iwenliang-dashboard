import { auth } from "@/auth";
import Unauthorized from "@/components/auth/Unauthorized";
import BreadCrumbsComponent from "@/components/layout/BreadCrumsComponent";
import MainContainer from "@/components/layout/MainContainer";
import { allowedRoles } from "@/config/constant/allowedRoles";
import { CUSTOMER_ORDER_PROFILE } from "@/config/constant/routes";
import { DashboardLoading } from "@/features/dashboard/component/DashboardLoading";
import DashboardPage from "@/features/dashboard/DashboardPage";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Dashboard() {
  const breadcrumbs = [{ title: "Dashboard" }];
  const session = await auth();

  if (session?.user.role === "Customer") {
    redirect(CUSTOMER_ORDER_PROFILE);
  }

  if (!session || !allowedRoles.includes(session.user.role)) {
    return <Unauthorized />;
  }
  return (
    <MainContainer>
      <BreadCrumbsComponent items={breadcrumbs} />
      <Suspense fallback={<DashboardLoading />}>
        <DashboardPage />
      </Suspense>
    </MainContainer>
  );
}
