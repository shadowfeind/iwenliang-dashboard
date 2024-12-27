import StepOne from "@/app/(standalone)/checkout/components/StepOne";
import BreadCrumbsComponent from "@/components/layout/BreadCrumsComponent";
import MainContainer from "@/components/layout/MainContainer";
import { getOrderByIdQuery } from "@/features/orders/order.query";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

const breadcrumbs = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Order", link: "/dashboard/order" },
  { title: "Order Details" },
];

const SingleOrderPage = async (props: Props) => {
  const params = await props.params;
  const data = await getOrderByIdQuery(params.id);
  if ("error" in data) {
    return <h1 className="text-red-600">{data.error}</h1>;
  }
  return (
    <MainContainer>
      <BreadCrumbsComponent items={breadcrumbs} />
      <div className="max-w-5xl mx-auto p-4 md:p-8 flex flex-col justify-center items-center">
        {" "}
        <StepOne order={data} />
      </div>
    </MainContainer>
  );
};

export default SingleOrderPage;
