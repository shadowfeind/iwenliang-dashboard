import { getSinglePromoHeaerForWebsite } from "@/features/promo-header/promoHeader.query";
import Menu from "./menu/Menu";

const SiteHeader = async () => {
  const data = await getSinglePromoHeaerForWebsite();

  return (
    <>
      {data && (
        <h6 className="w-full py-2 text-sm bg-black text-center text-white font-serif tracking-widest font-medium uppercase">
          {data.title}
        </h6>
      )}
      <h6 className="w-full py-1.5 md:py-2 text-[11px] md:text-xs bg-[#D4AF37] text-black text-center font-bold tracking-[0.2em]">
        IN LOVING MEMORY OF THE PERSON WHO SAW IT FIRST
      </h6>
      <Menu />
    </>
  );
};

export default SiteHeader;
