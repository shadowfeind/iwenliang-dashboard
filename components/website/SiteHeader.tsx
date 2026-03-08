import { getSinglePromoHeaerForWebsite } from "@/features/promo-header/promoHeader.query";
import Menu from "./menu/Menu";

const SiteHeader = async () => {
  const data = await getSinglePromoHeaerForWebsite();

  return (
    <>
      {data && (
        <h6 className="w-full py-1.5 md:py-2 text-sm bg-red-800 text-center text-white">
          {data.title}
        </h6>
      )}
      <h6 className="w-full py-1.5 md:py-2 text-xs bg-neutral-800  text-center text-white">
        IN LOVING MEMORY OF THE PERSON WHO SAW IT FIRST
      </h6>
      <Menu />
    </>
  );
};

export default SiteHeader;
