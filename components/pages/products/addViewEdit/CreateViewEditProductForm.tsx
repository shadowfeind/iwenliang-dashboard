"use client";

import { createProduct, updateProduct } from "@/actions/product.action";
import { ErrorComponent } from "@/components/ErrorComponent";
import ImageUpload from "@/components/ImageUpload";
import { MultiSelect } from "@/components/MultiSelect";
import { Button } from "@/components/ui/button";
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { PRODUCT_ROUTE } from "@/config/constant/routes";
import {
  productSchema,
  ProductSchamaType,
} from "@/config/schemas/product.schema";
import { ProductType } from "@/config/types/product.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";

type Props = {
  mode: "view" | "edit" | "create";
  categoriesName: any[];
  productData?: ProductType;
};

const CreateViewEditProductForm = ({
  mode,
  categoriesName,
  productData,
}: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const form = useForm<ProductSchamaType>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      price: 0,
      salePrice: 0,
      stock: 0,
      category: [],
      description: "",
      isActive: true,
      featured: false,
    },
  });

  useEffect(() => {
    if (mode === "view" || (mode === "edit" && productData)) {
      //@ts-ignore i do not want to set value manually.
      form.reset(productData);
    }
  }, [mode, productData, form]);

  const handleSubmit = (values: ProductSchamaType) => {
    if (mode === "create") {
      const createvalues = values as ProductSchamaType;
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
    if (mode === "edit") {
      startTransition(() => {
        const updateValues = values as ProductSchamaType;
        updateProduct(updateValues, productData?._id ?? "").then((data) => {
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
                    <Input
                      placeholder="Product Name"
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
              name="salePrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Price <small>(Price that is crossed)</small>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="sale price"
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
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Final Price</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="product price"
                      {...field}
                      disabled={mode === "view"}
                    />
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
                    <Input
                      placeholder="2"
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Product description"
                      {...field}
                      disabled={mode === "view"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="featured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Feature Product</FormLabel>
                    <FormDescription>
                      Prodct will be showin in featured product section.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-readonly
                      disabled={mode === "view"}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Active</FormLabel>
                    <FormDescription>
                      Active or deactive product.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-readonly
                      disabled={mode === "view"}
                    />
                  </FormControl>
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