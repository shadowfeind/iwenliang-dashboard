import { z } from "zod";

const OrderItemSchema = z.object({
  name: z.string().min(1),
  quantity: z.string().min(1),
  unit_amount: z.object({
    currency_code: z.string().length(3),
    value: z.string(),
  }),
});

const amountSchema = z.object({
  currency_code: z.string().length(3), // Currency code should be a 3-letter code
  value: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid amount format"), // Validates a decimal number
  breakdown: z
    .object({
      item_total: z.object({
        currency_code: z.string().length(3), // Currency code for item total
        value: z
          .string()
          .regex(/^\d+(\.\d{1,2})?$/, "Invalid item total format"), // Validates a decimal number
      }),
      shipping: z.object({
        currency_code: z.string().length(3), // Currency code for shipping
        value: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid shipping format"), // Validates a decimal number
      }),
      discount: z
        .object({
          currency_code: z.string().length(3), // Currency code for discount
          value: z
            .string()
            .regex(/^\d+(\.\d{1,2})?$/, "Invalid discount format"), // Validates a decimal number
        })
        .optional(), // Discount is optional
    })
    .optional(), // Breakdown is optional
});

export const CreatePaypalOrderSchema = z.object({
  items: z.array(OrderItemSchema),
  amount: amountSchema,
});

export type CreatePaypalOrderSchemaType = z.infer<
  typeof CreatePaypalOrderSchema
>;
