import { getAllBlogs } from "@/features/blog/blog.query";
import BlogCard from "@/components/website/blog/BlogCard";

const page = async () => {
  const data = await getAllBlogs();
  if ("error" in data) {
    return <h1 className="text-red-600">{data.error}</h1>;
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Blog</h1>
      {data.map((blog) => (
        <BlogCard key={blog._id} blog={blog} />
      ))}
    </div>
  );
};

export default page;
