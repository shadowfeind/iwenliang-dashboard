import { getAllBlogs } from "./blog.query";
import { DataTable } from "./components/DataTable";

const BlogPage = async () => {
  const data = await getAllBlogs();
  if ("error" in data) {
    return <h1 className="text-red-600">{data.error}</h1>;
  }
  return <DataTable data={data} />;
};

export default BlogPage;
