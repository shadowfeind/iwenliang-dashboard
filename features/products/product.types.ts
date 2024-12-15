import { CategoryType } from "../../features/categories/category.types";
import { ColorType } from "../../features/colors/color.types";
import { MaterialType } from "../../features/materials/material.types";
import { BeadType } from "../beadSize/beadSize.type";

export type ProductType = {
  _id: string;
  name: string;
  slug: string;
  images: string[];
  description?: string;
  price: number;
  salePrice?: number;
  stock: number;
  color?: ColorType[];
  material?: MaterialType[];
  category?: CategoryType[];
  beadSize?: BeadType[];
  featured: boolean;
  isActive: boolean;
  styleId?: string;
  videoUrl?: string;
  createdAt: string;
  updatedAt: string;
};
