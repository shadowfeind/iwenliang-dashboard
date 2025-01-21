import { auth } from "@/auth";
import Unauthorized from "@/components/auth/Unauthorized";
import BreadCrumbsComponent from "@/components/layout/BreadCrumsComponent";
import MainContainer from "@/components/layout/MainContainer";
import { allowedRoles } from "@/config/constant/allowedRoles";
import { BLOG_ROUTE } from "@/config/constant/routes";
import AddOrEdit from "@/features/blog/components/AddOrEdit";

const breadcrumbs = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Blog", link: BLOG_ROUTE },
  { title: "Add new blog" },
];

const page = async () => {
  const session = await auth();

  if (!session || !allowedRoles.includes(session.user.role)) {
    return <Unauthorized />;
  }
  return (
    <MainContainer>
      <BreadCrumbsComponent items={breadcrumbs} />
      <AddOrEdit mode="create" />
    </MainContainer>
  );
};

export default page;
