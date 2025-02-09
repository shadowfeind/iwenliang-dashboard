import { auth } from "@/auth";
import Unauthorized from "@/components/auth/Unauthorized";
import BreadCrumbsComponent from "@/components/layout/BreadCrumsComponent";
import MainContainer from "@/components/layout/MainContainer";
import { allowedRoles } from "@/config/constant/allowedRoles";
import ShippingAddPage from "@/features/shipping/add/ShippingAddPage";

const breadcrumbs = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Shipping", link: "/dashboard/shipping" },
  { title: "Add shipping" },
];

const page = async () => {
  const session = await auth();

  if (!session || !allowedRoles.includes(session.user.role)) {
    return <Unauthorized />;
  }
  return (
    <MainContainer>
      <BreadCrumbsComponent items={breadcrumbs} />
      <ShippingAddPage />
    </MainContainer>
  );
};

export default page;
