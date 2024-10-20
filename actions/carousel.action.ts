import { CAROUSEL_ROUTE } from "@/config/constant/routes";
import connectDB from "@/config/db/connect";
import { carouselSchema, CarouselType } from "@/config/schemas/carousel.schema";
import { auth } from "@/lib/auth";
import Carousel from "@/models/carousel.model";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function createCarousel(
  values: CarouselType[]
): Promise<void | { error: string }> {
  await connectDB();

  const { session, user } = await auth();

  if (!session || user?.role !== "Admin") return { error: "Unauthorized" };

  const validateFields = z.array(carouselSchema).safeParse(values);
  if (!validateFields.success) return { error: "Validation Error" };

  try {
    await Carousel.insertMany(validateFields.data);
    revalidatePath(CAROUSEL_ROUTE);
  } catch (error) {
    console.log("Error from createCategory", error);
    return { error: "Something went wrong" };
  }
}
