import { CategoryType } from "./category.types";
import { ColorType } from "./color.types";
import { MaterialType } from "./material.types";

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
