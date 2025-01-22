import { BlogTYpe } from "@/features/blog/blog.schema";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  blog: BlogTYpe;
};

const SingleBlogPage = ({ blog }: Props) => {
  return (
    <article className="container mx-auto px-4 py-8 max-w-3xl">
      <Link
        href="/blog"
        className="flex items-center text-black hover:underline mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Blog
      </Link>
      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
      <div className="text-gray-600 mb-4">
        Published on {new Date(blog.createdAt).toLocaleDateString()}
        {blog.updatedAt !== blog.createdAt &&
          ` (Updated on ${new Date(blog.updatedAt).toLocaleDateString()})`}
      </div>
      <Image
        src={blog.image || "/placeholder.svg"}
        alt={blog.title}
        width={800}
        height={400}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </article>
  );
};

export default SingleBlogPage;
