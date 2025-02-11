import { auth } from "@/auth";
import connectDB from "@/config/db/connect";
import { unstable_cache as cache } from "next/cache";
import Shipping from "./shipping.model";
import { allowedRoles } from "@/config/constant/allowedRoles";
import { ShippingType } from "./shipping.schema";
import { SHIPPING_TAG } from "@/config/constant/tags";

export const getAllShipping = cache(
  async (): Promise<ShippingType[] | { error: string }> => {
    try {
      await connectDB();
      const shipping = await Shipping.find({})
        .sort({ createdAt: -1 })
        .lean<ShippingType[]>();
      return JSON.parse(JSON.stringify(shipping));
    } catch (error) {
      console.error("Error fetching shipping:", error);
      return { error: "Failed to retrieve shipping" };
    }
  },
  [SHIPPING_TAG],
  {
    tags: [SHIPPING_TAG],
  }
);

export const getShippingById = async (
  id: string
): Promise<ShippingType | { error: string }> => {
  try {
    const session = await auth();

    if (!session || !allowedRoles.includes(session?.user.role))
      return { error: "Unauthorized" };

    await connectDB();
    const shipping = await Shipping.findById(id)
      .populate("orderId")
      .lean<ShippingType>();
    return JSON.parse(JSON.stringify(shipping));
  } catch (error) {
    console.error("Error fetching shipping:", error);
    return { error: "Failed to retrieve shipping" };
  }
};

export const getShipingForCustomer = async (
  id: string
): Promise<ShippingType[] | { error: string }> => {
  try {
    const session = await auth();
    if (!session || session?.user._id?.toString() !== id.toString())
      return { error: "Unauthorized" };
    await connectDB();
    const shipping = await Shipping.find({ customerId: id }).lean<
      ShippingType[]
    >();
    return JSON.parse(JSON.stringify(shipping));
  } catch (error) {
    console.error("Error fetching shipping:", error);
    return { error: "Failed to retrieve shipping" };
  }
};

export const getShippingByCustomerId = async (
  id: string
): Promise<ShippingType | { error: string }> => {
  try {
    const session = await auth();
    if (!session || session?.user.role !== "Customer")
      return { error: "Unauthorized" };
    await connectDB();
    const shipping = await Shipping.findById(id).lean<ShippingType>();
    if (!shipping) return { error: "Shipping not found" };
    if (shipping?.customerId.toString() !== session.user._id.toString())
      return { error: "Unauthorized" };
    return JSON.parse(JSON.stringify(shipping));
  } catch (error) {
    console.error("Error fetching shipping:", error);
    return { error: "Failed to retrieve shipping" };
  }
};
