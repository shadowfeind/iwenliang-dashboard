import { z } from "zod";

export const createShippingSchema = z.object({
  orderId: z.string(),
  dispatchedTo: z.string(),
  dispatchedBy: z.string(),
  trackingNo: z.string().optional(),
  link: z.string().optional(),
  dispatchedDate: z.string(),
  arrivalDate: z.string(),
  remarks: z.string().optional(),
});

const shippingSchema = createShippingSchema.extend({
  _id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type CreateShippingType = z.infer<typeof createShippingSchema>;
export type ShippingType = z.infer<typeof shippingSchema>;
