import connectDB from "@/config/db/connect";
import { CarouselType } from "./carousel.type";
import Carousel from "./carousel.model";

export async function getAllCarousel(): Promise<
  CarouselType[] | { error: string }
> {
  await connectDB();

  const carousels = await Carousel.find().lean<CarouselType[]>();

  if (!carousels) {
    return { error: "No Carousels Found" };
  }

  return JSON.parse(JSON.stringify(carousels));
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
