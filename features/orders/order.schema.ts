import { z } from "zod";
import { OrderStatus } from "./order.model";

export const createOrderSchema = z.object({
  orderItems: z.array(
    z.object({
      name: z.string(),
      quantity: z.number(),
      price: z.number(),
      product: z.string(),
    })
  ),
  shippingAddress: z.object({
    address: z.string(),
    city: z.string(),
    postalCode: z.string(),
    country: z.string(),
    email: z.string().email(),
    fullName: z.string(),
    phone: z.string().optional(),
  }),
  paymentMethod: z.string(),
  itemsPrice: z.number(),
  discountPrice: z.number().optional(),
  discountCode: z.string().optional(),
  discountPercentage: z.number().optional(),
  shippingPrice: z.number().optional(),
  discountType: z.string().optional(),
  taxPrice: z.number().optional(),
  totalPrice: z.number(),
  user: z.string(),
  status: z.nativeEnum(OrderStatus),
  paidAt: z.string().optional(),
});

export type CreateOrderSchemaType = z.infer<typeof createOrderSchema>;
