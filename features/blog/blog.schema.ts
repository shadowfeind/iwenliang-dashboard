import { z } from "zod";

export const blogSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(3),
  image: z.string().optional(),
  metaTitle: z.string().min(3),
  metaDescription: z.string().min(3),
});

export type CreateBlogType = z.infer<typeof blogSchema>;
export type BlogTYpe = CreateBlogType & {
  _id: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
};
