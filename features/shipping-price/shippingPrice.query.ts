import { unstable_cache as cache } from "next/cache";
import { SHIPPING_PRICE_TAG } from "@/config/constant/tags";
import connectDB from "@/config/db/connect";
import ShippingPrice from "./shippingPriceModel";
import { ShippingPriceType } from "./shippingPrice.schema";

export const getAllShippingPrice = cache(
  async (): Promise<{ error: string } | ShippingPriceType[]> => {
    try {
      await connectDB();
      const shippingPrice = await ShippingPrice.find().lean<
        ShippingPriceType[]
      >();
      return shippingPrice.map((shipping) => ({
        ...shipping,
        _id: shipping._id?.toString(),
      }));
    } catch (error) {
      console.error("Error fetching shippingPrice:", error);
      return { error: "Failed to retrieve shippingPrice" };
    }
  },
  [SHIPPING_PRICE_TAG],
  {
    tags: [SHIPPING_PRICE_TAG],
  }
);
