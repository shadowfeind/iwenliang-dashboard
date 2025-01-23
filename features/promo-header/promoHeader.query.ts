import { unstable_cache as cache } from "next/cache";
import { PromoHeaderType } from "./promoHeader.schema";
import PromoHeader from "./promoHeader.model";
import { PROMO_HEADER_TAG } from "@/config/constant/tags";
import connectDB from "@/config/db/connect";

export const getAllPromoHeader = cache(async (): Promise<
  PromoHeaderType[] | { error: string }
> => {
  try {
    await connectDB();
    const promoHeader = await PromoHeader.find({})
      .sort({ createdAt: -1 })
      .lean<PromoHeaderType[]>();
    return JSON.parse(JSON.stringify(promoHeader));
  } catch (error) {
    console.error("Error fetching promoHeader:", error);
    return { error: "Failed to retrieve promoHeader" };
  }
}, [PROMO_HEADER_TAG]);

export const getSinglePromoHeaerForWebsite = async (): Promise<
  PromoHeaderType | undefined
> => {
  try {
    await connectDB();
    const promoHeader = await PromoHeader.find({ isActive: true })
      .sort({ createdAt: -1 })
      .lean<PromoHeaderType>();
    return JSON.parse(JSON.stringify(promoHeader));
  } catch (error) {
    console.error("Error fetching promoHeader:", error);
  }
};

export const getPromoHeaderById = async (
  id: string
): Promise<PromoHeaderType | { error: string }> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_REST_URL}promo-header/${id}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!response.ok) {
      return { error: response.statusText };
    }

    const data = await response.json();

    return JSON.parse(JSON.stringify(data.data));
  } catch (error) {
    console.error("Error fetching promoHeader:", error);
    return { error: "Failed to retrieve promoHeader" };
  }
};
