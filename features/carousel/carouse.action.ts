"use server";

import { z } from "zod";
import { carouselSchema } from "./carousel.schema";
import connectDB from "@/config/db/connect";
import Carousel from "./carousel.model";
import { CAROUSEL_ROUTE } from "@/config/constant/routes";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

export async function createCarousel(
  values: z.infer<typeof carouselSchema>
): Promise<void | { error: string }> {
  const validateFields = carouselSchema.safeParse(values);
  if (!validateFields.success) return { error: "Validation Error" };

  await connectDB();
  const session = await auth();

  if (!session || session.user?.role === "Customer")
    return { error: "Unauthorized" };

  const { image } = validateFields.data;

  try {
    await Carousel.create({ image });
    revalidatePath(CAROUSEL_ROUTE);
  } catch (error) {
    console.log("Error from createCarousel", error);
    return { error: "Something went wrong" };
  }
}

export async function updateCarousel(
  values: z.infer<typeof carouselSchema>,
  id: string
): Promise<void | { error: string }> {
  const validateFields = carouselSchema.safeParse(values);
  if (!validateFields.success) return { error: "Validation Error" };

  await connectDB();
  const session = await auth();

  if (!session || session.user?.role === "Customer")
    return { error: "Unauthorized" };

  const { image } = validateFields.data;

  try {
    await Carousel.findByIdAndUpdate(id, { image });
    revalidatePath(CAROUSEL_ROUTE);
  } catch (error) {
    console.log("Error from updateCarousel", error);
    return { error: "Something went wrong" };
  }
}

export async function deleteCarousel(
  id: string
): Promise<void | { error: string }> {
  await connectDB();

  const session = await auth();

  if (!session || session.user?.role === "Customer")
    return { error: "Unauthorized" };

  try {
    await Carousel.findByIdAndDelete(id);
    revalidatePath(CAROUSEL_ROUTE);
  } catch (error) {
    console.log("Error from deleteCarousel", error);
    return { error: "Something went wrong" };
  }
}
