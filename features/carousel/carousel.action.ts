"use server";

import { z } from "zod";
import { carouselSchema } from "./carousel.schema";
import connectDB from "@/config/db/connect";
import Carousel from "./carousel.model";
import { revalidateTag } from "next/cache";
import { auth } from "@/auth";
import { CarouselType } from "./carousel.type";
import { CAROUSEL_TAG } from "@/config/constant/tags";
import { allowedRoles } from "@/config/constant/allowedRoles";

export async function createCarousel(
  values: z.infer<typeof carouselSchema>
): Promise<void | { error: string }> {
  const validateFields = carouselSchema.safeParse(values);
  if (!validateFields.success) return { error: "Validation Error" };

  await connectDB();
  const session = await auth();

  if (!session || !allowedRoles.includes(session?.user.role))
    return { error: "Unauthorized" };

  const { image } = validateFields.data;

  try {
    await Carousel.create({ image });
    revalidateTag(CAROUSEL_TAG);
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

  if (!session || !allowedRoles.includes(session?.user.role))
    return { error: "Unauthorized" };

  const { image } = validateFields.data;

  try {
    await Carousel.findByIdAndUpdate(id, { image });
    revalidateTag(CAROUSEL_TAG);
  } catch (error) {
    console.log("Error from updateCarousel", error);
    return { error: "Something went wrong" };
  }
}

export async function getCarouselById(
  id: string
): Promise<CarouselType | { error: string }> {
  await connectDB();

  const carousel = await Carousel.findById(id).lean<CarouselType>();

  if (!carousel) {
    return { error: "Carousel not found" };
  }

  return JSON.parse(JSON.stringify(carousel));
}

export async function deleteCarousel(
  id: string
): Promise<void | { error: string }> {
  await connectDB();

  const session = await auth();

  if (!session || !allowedRoles.includes(session?.user.role))
    return { error: "Unauthorized" };

  try {
    await Carousel.findByIdAndDelete(id);
    revalidateTag(CAROUSEL_TAG);
  } catch (error) {
    console.log("Error from deleteCarousel", error);
    return { error: "Something went wrong" };
  }
}
