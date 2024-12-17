import connectDB from "@/config/db/connect";
import { ProductType } from "./product.types";
import Product from "./product.model";
import { unstable_cache as cache } from "next/cache";
import { PRODUCT_FILTER, PRODUCT_TAG } from "@/config/constant/tags";
import Color from "../colors/color.model";
import Material from "../materials/material.model";
import Category from "../categories/category.model";
import { ColorType } from "../colors/color.types";
import { MaterialType } from "../materials/material.types";
import { CategoryType } from "../categories/category.types";
import { BeadType } from "../beadSize/beadSize.type";
import BeadSize from "../beadSize/beadSize.model";

//testing api will remove in future
export async function getAllProducts(): Promise<
  ProductType[] | { error: any }
> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_REST_URL}product`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    return { error: response.statusText };
  }
  const { data } = await response.json();
  return data;
}

//testing api will remove in future
export async function getProductBySlug(
  slug: string
): Promise<ProductType | { error: any }> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_REST_URL}product/${slug}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  if (!response.ok) {
    return { error: response.statusText };
  }

  const { data } = await response.json();
  return data;
}

type ProductForFrontPageType = {
  featured: ProductType[];
  products: ProductType[];
};

export const getProductsForFrontPage = cache(
  async (): Promise<ProductForFrontPageType | { error: string }> => {
    await connectDB();

    const products = await Product.find()
      .sort({ createdAt: -1 })
      .lean<ProductType[]>();
    if (!products) return { error: "No products found" };
    const featured = products.filter((product) => product.featured);

    const response = JSON.parse(
      JSON.stringify({ featured, products: products?.slice(0, 8) })
    );
    return response;
  },
  [PRODUCT_TAG],
  {
    tags: [PRODUCT_TAG],
    revalidate: false,
  }
);

export const getAllProductsQuery = cache(
  async (): Promise<ProductType[] | { error: string }> => {
    await connectDB();

    const products = await Product.find()
      .sort({ createdAt: -1 })
      .populate("color")
      .populate("material")
      .populate("category")
      .populate("beadSize")
      .lean<ProductType[]>();

    if (!products) return { error: "No products found" };

    return JSON.parse(JSON.stringify(products));
  },
  [PRODUCT_TAG],
  {
    tags: [PRODUCT_TAG],
    revalidate: false,
  }
);

export const getProductBySlugQuery = async (
  slug: string
): Promise<ProductType | { error: string }> => {
  await connectDB();

  const product = await Product.findOne({ slug }).lean<ProductType>();

  if (!product) return { error: "Product not found" };

  return JSON.parse(JSON.stringify(product));
};

export const getFiltersForProduct = cache(
  async (): Promise<{
    colors: ColorType[];
    materials: MaterialType[];
    categories: CategoryType[];
    beadSizes: BeadType[];
  }> => {
    try {
      const [colorData, materialData, categoryData, beadSizeData] =
        await Promise.all([
          Color.find().sort({ createdAt: -1 }).lean().exec(),
          Material.find().sort({ createdAt: -1 }).lean().exec(),
          Category.find().sort({ createdAt: -1 }).lean().exec(),
          BeadSize.find().sort({ createdAt: -1 }).lean().exec(),
        ]);

      const response = JSON.parse(
        JSON.stringify({
          colors: colorData,
          materials: materialData,
          categories: categoryData,
          beadSizes: beadSizeData,
        })
      );

      return {
        ...response,
      };
    } catch (error) {
      console.error("Error fetching product filters:", error);

      return {
        colors: [],
        materials: [],
        categories: [],
        beadSizes: [],
      };
    }
  },
  [PRODUCT_FILTER],
  {
    tags: [PRODUCT_FILTER],
  }
);

// i created a api route as vercel serverless function was timing out
// i will remove this api route in future if i use vps
export const getAllFiltersForProductApiQuery = async (): Promise<{
  colors: ColorType[];
  materials: MaterialType[];
  categories: CategoryType[];
  beadSizes: BeadType[];
}> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_REST_URL}bracelet-filters`,
    {
      method: "GET",
      credentials: "include",
    }
  );
  if (!response.ok) {
    return { colors: [], materials: [], categories: [], beadSizes: [] };
  }
  const data = await response.json();

  return data;
};
