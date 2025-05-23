import { auth } from "@/auth";
import Unauthorized from "@/components/auth/Unauthorized";
import BreadCrumbsComponent from "@/components/layout/BreadCrumsComponent";
import MainContainer from "@/components/layout/MainContainer";
import { TableLoading } from "@/components/loading/tableLoading";
import MyOrder from "@/features/my-order/MyOrder";
import { Suspense } from "react";

const breadcrumbs = [{ title: "Dashboard" }, { title: "My Orders" }];

const page = async () => {
  const session = await auth();

  if (!session) {
    return <Unauthorized />;
  }
  return (
    <MainContainer>
      <BreadCrumbsComponent items={breadcrumbs} />
      <Suspense fallback={<TableLoading />}>
        <MyOrder user={session.user} />
      </Suspense>
    </MainContainer>
  );
};

export default page;
