"use client";

import { createProduct } from "@/actions/product.action";
import { ErrorComponent } from "@/components/ErrorComponent";
import ImageUpload from "@/components/ImageUpload";
import { MultiSelect } from "@/components/MultiSelect";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PRODUCT_ROUTE } from "@/config/constant/routes";
import { productSchema, ProductType } from "@/config/schemas/product.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

type Props = {
  mode: "view" | "edit" | "create";
  categoriesName: any[];
};

const CreateViewEditProductForm = ({ mode, categoriesName }: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const form = useForm<ProductType>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      price: 0,
      salePrice: 0,
      stock: 0,
      category: [],
      description: "",
    },
  });

  const handleSubmit = (values: ProductType) => {
    if (mode === "create") {
      const createvalues = values as ProductType;
      startTransition(() => {
        createProduct(createvalues).then((data) => {
          if ("error" in data) {
            setError(data.error);
          }
          if ("success" in data) {
            form.reset();
            router.push(PRODUCT_ROUTE);
          }
        });
      });
    }
  };

  return (
    <>
      {mode === "view" ? null : (
        <div className="my-4">
          <ImageUpload size={2} maxFiles={4} />
        </div>
      )}
      <Form {...form}>
        <form
          className="w-full space-y-4"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <ErrorComponent message={error} />
          <div className="grid grid-cols-1 md:grid-cols-3  gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Product Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Price</FormLabel>
                  <FormControl>
                    <Input placeholder="product price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="salePrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sale Price</FormLabel>
                  <FormControl>
                    <Input placeholder="sale price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Inventory</FormLabel>
                  <FormControl>
                    <Input placeholder="2" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={categoriesName}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      placeholder="Select options"
                      variant="inverted"
                      animation={2}
                      maxCount={3}
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Product description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {mode !== "view" ? (
            <div className="pt-4">
              <Button disabled={isPending} type="submit">
                {mode === "create" ? "Create Product" : "Update Product"}
              </Button>
            </div>
          ) : null}
        </form>
      </Form>
    </>
  );
};

export default CreateViewEditProductForm;
