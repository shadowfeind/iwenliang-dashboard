import connectDB from "@/config/db/connect";
import { CarouselType } from "./carousel.type";
import Carousel from "./carousel.model";
import { unstable_cache as cache } from "next/cache";
import { CAROUSEL_TAG } from "@/config/constant/tags";

export const getAllCarousel = cache(async (): Promise<
  CarouselType[] | { error: string }
> => {
  await connectDB();

  const carousels = await Carousel.find().lean<CarouselType[]>();

  if (!carousels) {
    return { error: "No Carousels Found" };
  }

  return JSON.parse(JSON.stringify(carousels));
}, [CAROUSEL_TAG]);
