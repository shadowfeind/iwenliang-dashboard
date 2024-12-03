import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getAllCarousel } from "@/features/carousel/carousel.query";
import { CarouselType } from "@/features/carousel/carousel.type";
import Image from "next/image";

const MainCarousel = async () => {
  const data = await getAllCarousel();
  if ("error" in data) {
    return <h1 className="text-red-600">{data.error}</h1>;
  }
  return (
    <Carousel>
      <CarouselContent>
        {data.map((caro: CarouselType) => (
          <CarouselItem key={caro._id}>
            <div className="w-full h-screen min-h-[600px] max-h-[1080px] relative">
              <Image
                alt={caro.image}
                src={caro.image}
                fill
                className="object-cover"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext className="right-4 md:right-8" />
      <CarouselPrevious className="left-4 md:left-8" />
    </Carousel>
  );
};

export default MainCarousel;
