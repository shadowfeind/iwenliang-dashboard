import { z } from "zod";

export const carouselSchema = z.object({
  image: z.string(),
});

export type CarouselType = z.infer<typeof carouselSchema>;
