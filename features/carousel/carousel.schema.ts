import { z } from "zod";

export const carouselSchema = z.object({
  image: z.string(),
});
