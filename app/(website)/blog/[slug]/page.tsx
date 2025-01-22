import BreadCrumbsComponent from "@/components/layout/BreadCrumsComponent";
import { Button } from "@/components/ui/button";
import SingleBlogPage from "@/components/website/blog/SingleBlogPage";
import Container from "@/components/website/Container";
import { getBlogBySlug } from "@/features/blog/blog.query";
import Link from "next/link";
import React from "react";

type Props = {
  params: Promise<{ slug: string }>;
};
const page = async (props: Props) => {
  const params = await props.params;
  const data = await getBlogBySlug(params.slug);

  const breadcrumbs = [
    { title: "Home", link: "/" },
    { title: "Blog", link: "/blog" },
    { title: params.slug },
  ];

  if ("error" in data) {
    return (
      <div className="flex flex-col justify-center items-center mb-8">
        <div className="text-center text-red-500 text-xl mt-8 mb-8">
          {data.error}
        </div>
        <Link
          href="/blog"
          className="bg-black text-white text-sm py-2 px-4 rounded-sm "
        >
          Go to blogs
        </Link>
      </div>
    );
  }
  return (
    <Container style="mt-3">
      <BreadCrumbsComponent items={breadcrumbs} />
      <SingleBlogPage blog={data} />
    </Container>
  );
};

export default page;
