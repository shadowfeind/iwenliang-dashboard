import { ErrorComponent } from "@/components/ErrorComponent";
import BreadCrumbsComponent from "@/components/layout/BreadCrumsComponent";
import MainContainer from "@/components/layout/MainContainer";
import { BLOG_ROUTE } from "@/config/constant/routes";
import { getBlogBySlug } from "@/features/blog/blog.query";
import AddOrEdit from "@/features/blog/components/AddOrEdit";

type Props = {
  params: Promise<{ slug: string }>;
};
const breadcrumbs = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Blog", link: BLOG_ROUTE },
  { title: "Edit" },
];

const page = async (props: Props) => {
  const params = await props.params;
  const data = await getBlogBySlug(params.slug);

  if ("error" in data) {
    return (
      <MainContainer>
        <BreadCrumbsComponent items={breadcrumbs} />
        <ErrorComponent message={data.error} />
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      <BreadCrumbsComponent items={breadcrumbs} />
      <AddOrEdit mode="edit" blog={data} />
    </MainContainer>
  );
};

export default page;
