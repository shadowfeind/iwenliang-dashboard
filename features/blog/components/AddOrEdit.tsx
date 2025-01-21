"use client";

import { mode } from "@/config/types/mode.types";
import React, { useEffect, useState, useTransition } from "react";
import { blogSchema, BlogTYpe, CreateBlogType } from "../blog.schema";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBlog, updateBlog } from "../blog.action";
import { BLOG_ROUTE } from "@/config/constant/routes";
import ImageUpload from "@/components/ImageUpload";
import { ErrorComponent } from "@/components/ErrorComponent";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import TiptapEditor from "@/components/TipTapEditor";

type Props = {
  mode: mode;
  blog?: BlogTYpe;
};

const AddOrEdit = ({ mode, blog }: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState("");
  const form = useForm<CreateBlogType>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      content: "",
      image: "",
      metaTitle: "",
      metaDescription: "",
    },
  });

  useEffect(() => {
    if (blog) {
      form.reset(blog);
      if (blog.image) {
        setImages([blog.image]);
      }
    }
  }, [mode, blog?._id]);

  const handleSubmit = (values: CreateBlogType) => {
    if (mode === "create") {
      const createvalues = values;
      if (images.length === 0) {
        setError("Images are required");
        return;
      }
      createvalues.image = images[0];
      startTransition(() => {
        createBlog(createvalues).then((data) => {
          if (data?.error) {
            setError(data.error);
          } else {
            form.reset();
            setError("");
            router.push(BLOG_ROUTE);
          }
        });
      });
    }
    if (mode === "edit") {
      startTransition(() => {
        const updateValues = values;
        if (images.length === 0) {
          setError("Images are required");
          return;
        }
        updateValues.image = images[0];
        updateBlog(updateValues, blog?._id ?? "").then((data) => {
          if (data?.error) {
            setError(data.error);
          } else {
            form.reset();
            setError("");
            router.push(BLOG_ROUTE);
          }
        });
      });
    }
  };
  return (
    <div className="pb-8">
      <div className="my-4">
        <ImageUpload
          size={2}
          maxFiles={1}
          mode={mode}
          images={images}
          setImages={setImages}
        />
      </div>

      <Form {...form}>
        <form
          className="w-full space-y-4"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <ErrorComponent message={error} />
          <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Title"
                      {...field}
                      disabled={mode === "view"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="metaTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title For SEO</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Meta title"
                      {...field}
                      disabled={mode === "view"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1">
            <FormField
              control={form.control}
              name="metaDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Description For SEO</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Descripton"
                      {...field}
                      disabled={mode === "view"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <TiptapEditor
                      value={field.value}
                      onChange={field.onChange}
                      disabled={mode === "view"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {mode !== "view" ? (
            <div className="pt-4">
              <Button disabled={isPending} type="submit">
                {mode === "create" ? "Create Blog" : "Update Blog"}
              </Button>
            </div>
          ) : null}
        </form>
      </Form>
    </div>
  );
};

export default AddOrEdit;
