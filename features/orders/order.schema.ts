import { z } from "zod";

export const shippingSchema = z.object({
  address: z.string().min(3, "Address is required"),
  city: z.string().min(3, "Address is required"),
  postalCode: z.string().min(1, "Address is required"),
  country: z.string().min(3, "Address is required"),
  email: z.string().email(),
  fullName: z.string().min(3, "Address is required"),
  phone: z.string().optional(),
});

export const createOrderSchema = z.object({
  orderItems: z.array(
    z.object({
      name: z.string(),
      quantity: z.number(),
      price: z.number(),
      image: z.string(),
      product: z.string(),
    })
  ),
  shippingAddress: shippingSchema,
  paymentMethod: z.string(),
  itemsPrice: z.number(),
  discountPrice: z.number().optional(),
  discountCode: z.string().optional(),
  discountPercentage: z.number().optional(),
  shippingPrice: z.number().optional(),
  discountType: z.string().optional(),
  taxPrice: z.number().optional(),
  totalPrice: z.number(),
});

export type CreateOrderSchemaType = z.infer<typeof createOrderSchema>;
export type ShippingSchemaType = z.infer<typeof shippingSchema>;
