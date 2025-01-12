import { z } from "zod";

export const createShippingPriceSchema = z.object({
  name: z.string().min(3),
  price: z.coerce.number().min(0),
  dial_code: z.string().optional(),
  code: z.string(),
});

const shipingSchema = createShippingPriceSchema.extend({
  _id: z.string(),
});

export type createShippingPriceSchemaType = z.infer<
  typeof createShippingPriceSchema
>;
export type ShippingPriceType = z.infer<typeof shipingSchema>;
