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
import { serializeDocument } from "@/lib/utils";



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

    const response = serializeDocument({
      featured,
      products: products?.slice(0, 8),
    });
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
    console.log("hit");

    const products = await Product.find()
      .sort({ createdAt: -1 })
      .populate("color")
      .populate("material")
      .populate("category")
      .populate("beadSize")
      .lean<ProductType[]>();

    if (!products) return { error: "No products found" };

    return serializeDocument(products);
  },
  [PRODUCT_TAG],
  {
    tags: [PRODUCT_TAG],
  }
);

export const getProductBySlugQuery = cache(
  async (slug: string): Promise<ProductType | { error: string }> => {
    await connectDB();

    const product = await Product.findOne({ slug }).lean<ProductType>();

    if (!product) return { error: "Product not found" };

    return serializeDocument(product);
  },
  [PRODUCT_TAG],
  {
    tags: [PRODUCT_TAG],
  }
);

export const getFiltersForProduct = cache(
  async (): Promise<{
    colors: ColorType[];
    materials: MaterialType[];
    categories: CategoryType[];
    beadSizes: BeadType[];
  }> => {
    await connectDB(); // Missing connectDB was causing the timeout!
    try {
      const [colorData, materialData, categoryData, beadSizeData] =
        await Promise.all([
          Color.find().sort({ createdAt: -1 }).lean<ColorType[]>(),
          Material.find().sort({ createdAt: -1 }).lean<MaterialType[]>(),
          Category.find().sort({ createdAt: -1 }).lean<CategoryType[]>(),
          BeadSize.find().sort({ createdAt: -1 }).lean<BeadType[]>(),
        ]);

      const response = serializeDocument({
        colors: colorData,
        materials: materialData,
        categories: categoryData,
        beadSizes: beadSizeData,
      });

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

// removed unused API queries
