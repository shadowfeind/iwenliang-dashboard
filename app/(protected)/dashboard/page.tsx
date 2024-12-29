import { auth } from "@/auth";
import BreadCrumbsComponent from "@/components/layout/BreadCrumsComponent";
import MainContainer from "@/components/layout/MainContainer";
import { DashboardLoading } from "@/features/dashboard/component/DashboardLoading";
import DashboardPage from "@/features/dashboard/DashboardPage";
import { Suspense } from "react";

export default async function Dashboard() {
  const breadcrumbs = [{ title: "Dashboard" }];
  return (
    <MainContainer>
      <BreadCrumbsComponent items={breadcrumbs} />
      <Suspense fallback={<DashboardLoading />}>
        <DashboardPage />
      </Suspense>
    </MainContainer>
  );
}
