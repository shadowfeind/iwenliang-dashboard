import { CategoryType } from "../../features/categories/category.types";
import { ColorType } from "../../features/colors/color.types";
import { MaterialType } from "../../features/materials/material.types";

export type ProductType = {
  _id: string;
  name: string;
  slug: string;
  images?: string[];
  description?: string;
  price: number;
  salePrice?: number;
  stock: number;
  color?: ColorType[];
  material?: MaterialType[];
  category?: CategoryType[];
  featured: boolean;
  isActive: boolean;
};
