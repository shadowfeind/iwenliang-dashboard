import BreadCrumbsComponent from "@/components/layout/BreadCrumsComponent";
import MainContainer from "@/components/layout/MainContainer";
import { TableLoading } from "@/components/loading/tableLoading";
import { SubscriberPage } from "@/features/subscriber/SubscriberPage";
import React, { Suspense } from "react";

const breadcrumbs = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Subscriber" },
];

const page = () => {
  return (
    <MainContainer>
      <BreadCrumbsComponent items={breadcrumbs} />
      <Suspense fallback={<TableLoading />}>
        <SubscriberPage />
      </Suspense>
    </MainContainer>
  );
};

export default page;