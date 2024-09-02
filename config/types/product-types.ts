import { CategoryType } from "./category-types";

export type ProductType = {
  _id: string;
  name: string;
  slug: string;
  images?: string[];
  description?: string;
  price: Number;
  salePrice?: Number;
  stock: Number;
  category?: CategoryType[];
};
