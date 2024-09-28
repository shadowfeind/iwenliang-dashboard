export type ProductType = {
  _id: string;
  name: string;
  slug: string;
  images?: string[];
  description?: string;
  price: number;
  salePrice?: number;
  stock: number;
  color?: string[];
  material?: string[];
  category?: string[];
  featured: boolean;
  isActive: boolean;
};
