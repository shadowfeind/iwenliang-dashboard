"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useTransition } from "react";
import { ErrorComponent } from "@/components/ErrorComponent";
import { z } from "zod";
import { categorySchema } from "@/features/categories/category.schema";
import {
  createCategory,
  updateCategory,
} from "@/features/categories/category.action";
import { getCategoryById } from "@/features/categories/category.query";
import { mode } from "@/config/types/mode.types";
import ImageUpload from "@/components/ImageUpload";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mode: mode;
  categoryId?: string | null;
};

const CreateOrUpdateCategory = ({
  isOpen,
  setIsOpen,
  mode,
  categoryId,
}: Props) => {
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const [images, setImages] = useState<string[]>([]);

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
  });

  const handleSubmit = (values: z.infer<typeof categorySchema>) => {
    setError("");
    startTransition(() => {
      if (mode === "create") {
        const createValues = values;
        createValues.image = images[0];
        createCategory(createValues).then((data) => {
          if (data?.error) {
            setError(data.error);
          } else {
            form.reset();
            setIsOpen(false);
          }
        });
      }
      if (mode === "edit") {
        const updateValues = values as z.infer<typeof categorySchema>;
        updateValues.image = images[0];
        updateCategory(updateValues, categoryId ?? "").then((data) => {
          if (data?.error) {
            setError(data.error);
          } else {
            form.reset();
            setIsOpen(false);
          }
        });
      }
    });
  };

  useEffect(() => {
    if (categoryId && mode === "edit") {
      getCategoryById(categoryId).then((data) => {
        if ("error" in data) {
          setError(data.error);
        } else {
          form.setValue("name", data.name ?? "");
          if (data.image) {
            setImages([data.image]);
          } else {
            setImages([]);
          }
        }
      });
    }
    // eslint-disable-next-line
  }, [mode, categoryId]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="p-8">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Add Category" : "Update Category"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <ErrorComponent message={error} />
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="flex flex-col space-y-1.5 pb-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Category" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <ImageUpload
              size={2}
              maxFiles={1}
              mode={mode}
              images={images}
              setImages={setImages}
            />
            <Button disabled={isPending} className="mt-8" type="submit">
              {isPending
                ? "Loading...."
                : mode === "edit"
                ? "Update Category"
                : "Create Category"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateOrUpdateCategory;
