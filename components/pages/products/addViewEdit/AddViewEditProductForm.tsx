"use client";

import ImageUpload from "@/components/ImageUpload";
import { MultiSelect } from "@/components/MultiSelect";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { productSchema, ProductType } from "@/config/schemas/product.schema";
import { CategoryType } from "@/config/types/category-types";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

type Props = {
  mode: "view" | "edit" | "add";
  categories: CategoryType[];
  categoriesName: string[];
};

const AddViewEditProductForm = ({
  mode,
  categories,
  categoriesName,
}: Props) => {
  const form = useForm<ProductType>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      price: 0,
      salePrice: 0,
      stock: 0,
    },
  });

  const handleSubmit = (values: ProductType) => {
    console.log(values);
  };
  return (
    <>
      {mode === "view" ? null : (
        <div className="my-4">
          <ImageUpload size={2} maxFiles={4} />
        </div>
      )}
      <Form {...form}>
        <form className="w-full" onSubmit={form.handleSubmit(handleSubmit)}>
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
                    <Input placeholder="60" {...field} />
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
                    <Input placeholder="80" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3  gap-6">
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
            {/* <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frameworks</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={categoriesName}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      placeholder="Select categories"
                      variant="inverted"
                      animation={2}
                      maxCount={3}
                    />
                  </FormControl>
                  <FormDescription>
                    Choose the categories this produt will be included in.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          </div>
        </form>
      </Form>
    </>
  );
};

export default AddViewEditProductForm;
