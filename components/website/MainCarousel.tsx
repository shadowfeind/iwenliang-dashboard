import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getAllCarousel } from "@/features/carousel/carousel.query";
import { CarouselType } from "@/features/carousel/carousel.type";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const MainCarousel = async () => {
  const data = await getAllCarousel();
  if ("error" in data) {
    return <h1 className="text-red-600">{data.error}</h1>;
  }
  return (
    <Carousel
      className="px-4 pb-8 md:px-6"
      opts={{ loop: data.length > 1, align: "start" }}
    >
      <CarouselContent>
        {data.map((caro: CarouselType, index: number) => (
          <CarouselItem key={caro._id}>
            <div className="relative h-[72vh] min-h-[480px] max-h-[920px] overflow-hidden rounded-[36px] border border-white/10 bg-neutral-900 shadow-[0_28px_100px_-60px_rgba(15,23,42,0.8)] md:h-[calc(100vh-6.5rem)]">
              <Image
                alt={caro.image}
                src={caro.image}
                fill
                className="object-cover object-center relative z-0"
                priority
              />
              <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(7,7,7,0.82)_5%,rgba(7,7,7,0.32)_42%,rgba(7,7,7,0.18)_70%,rgba(7,7,7,0.58)_100%)] z-10 pointer-events-none" />
              <div className="absolute inset-x-0 top-0 z-20 flex items-center justify-between p-5 md:p-8">
                <div className="rounded-full border border-white/15 bg-black/25 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/80 backdrop-blur-md">
                  Iwenliang Bracelets
                </div>
                <div className="rounded-full border border-white/15 bg-black/25 px-4 py-2 text-sm text-white/80 backdrop-blur-md">
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(data.length).padStart(2, "0")}
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 z-20 p-5 md:p-8 lg:p-10">
                <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end">
                  <div className="max-w-2xl rounded-[28px] border border-white/12 bg-black/30 p-6 text-white backdrop-blur-md md:p-8">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-[#f0d47a]">
                      Natural stone. Sterling detail. Measured fit.
                    </p>
                    <h2 className="mt-4 font-serif text-4xl leading-none text-white md:text-6xl">
                      Quiet luxury for the wrist, built by hand.
                    </h2>
                    <p className="mt-4 max-w-xl text-sm leading-7 text-white/76 md:text-base">
                      Discover bracelet compositions that feel deliberate rather
                      than loud, with cleaner materials, richer texture, and a
                      custom fit based on your wrist size.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Button
                        asChild
                        size="custom"
                        className="bg-[#d4af37] text-black hover:bg-[#e1c15b]"
                      >
                        <Link href="/bracelets">Shop bracelets</Link>
                      </Button>
                      <div className="rounded-full border border-white/15 bg-white/10 px-5 py-3 text-xs font-medium uppercase tracking-[0.24em] text-white/80">
                        Handmade to order
                      </div>
                    </div>
                  </div>
                  <div className="rounded-[28px] border border-white/12 bg-white/10 p-5 text-white backdrop-blur-md">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-white/60">
                      Studio standard
                    </p>
                    <div className="mt-5 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                      <div>
                        <p className="text-3xl font-semibold text-white">925</p>
                        <p className="mt-1 text-sm text-white/68">
                          Sterling silver accents
                        </p>
                      </div>
                      <div>
                        <p className="text-3xl font-semibold text-white">
                          AA+
                        </p>
                        <p className="mt-1 text-sm text-white/68">
                          Graded natural stone selection
                        </p>
                      </div>
                      <div>
                        <p className="text-3xl font-semibold text-white">
                          1:1
                        </p>
                        <p className="mt-1 text-sm text-white/68">
                          Wrist measurement customization
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext className="right-8 top-1/2 z-30 h-12 w-12 border-white/15 bg-black/35 text-white backdrop-blur-md hover:bg-white hover:text-black disabled:bg-black/20" />
      <CarouselPrevious className="left-8 top-1/2 z-30 h-12 w-12 border-white/15 bg-black/35 text-white backdrop-blur-md hover:bg-white hover:text-black disabled:bg-black/20" />
    </Carousel>
  );
};

export default MainCarousel;
