import { z } from "zod";

export const subscriberSchema = z.object({
  email: z.string().email(),
});

export type SubscriberSchemaType = z.infer<typeof subscriberSchema>;
