import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BlogTYpe } from "@/features/blog/blog.schema";
import Image from "next/image";
import Link from "next/link";

type Props = {
  blog: BlogTYpe;
};

const BlogCard = ({ blog }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card
        key={blog._id}
        className="flex flex-col hover:shadow-lg transition-shadow duration-300"
      >
        <CardHeader className="p-0">
          <Image
            src={blog.image ?? ""}
            alt={blog.title}
            width={400}
            height={300}
            className="w-full h-48 object-cover rounded-t-lg"
          />
        </CardHeader>
        <CardContent className="flex-grow p-4">
          <CardTitle className="mb-2">
            <Link
              href={`/blog/${blog.slug}`}
              className="text-lg font-semibold hover:underline"
            >
              {blog.title}
            </Link>
          </CardTitle>
          <p className="text-gray-600 text-sm mb-4">
            {new Date(blog.createdAt).toLocaleDateString()}
          </p>
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content?.slice(0, 100) }}
          />
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Link
            href={`/blog/${blog.slug}`}
            className="text-black-600 hover:underline"
          >
            Read more
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BlogCard;
