import { auth } from "@/auth";
import Unauthorized from "@/components/auth/Unauthorized";
import { ErrorComponent } from "@/components/ErrorComponent";
import BreadCrumbsComponent from "@/components/layout/BreadCrumsComponent";
import MainContainer from "@/components/layout/MainContainer";
import { allowedRoles } from "@/config/constant/allowedRoles";
import ShippingEditPage from "@/features/shipping/edit/ShippingEditPage";
import { getShippingById } from "@/features/shipping/shipping.query";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

const breadcrumbs = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Shipping", link: "/dashboard/shipping" },
  { title: "Edit shipping" },
];

const page = async (props: Props) => {
  const session = await auth();

  if (!session || !allowedRoles.includes(session.user.role)) {
    return <Unauthorized />;
  }
  const { id } = await props.params;
  const shipping = await getShippingById(id);

  if ("error" in shipping) {
    return <ErrorComponent message={shipping.error} />;
  }

  return (
    <MainContainer>
      <BreadCrumbsComponent items={breadcrumbs} />
      <ShippingEditPage data={shipping} />
    </MainContainer>
  );
};

export default page;
