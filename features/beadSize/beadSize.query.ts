import connectDB from "@/config/db/connect";
import { BeadType } from "./beadSize.type";
import BeadSize from "./beadSize.model";
import { BEAS_SIZE_TAG } from "@/config/constant/tags";
import { unstable_cache as cache } from "next/cache";

export const getAllBeadSizeQuery = cache(
  async (): Promise<BeadType[] | { error: string }> => {
    try {
      await connectDB();
      const beadSize = await BeadSize.find().lean<BeadType[]>();
      return JSON.parse(JSON.stringify(beadSize));
    } catch (error) {
      console.error("Error fetching beadSize:", error);
      return { error: "Failed to retrieve beadSize" };
    }
  },
  [BEAS_SIZE_TAG],
  {
    tags: [BEAS_SIZE_TAG],
    revalidate: false,
  }
);

export const getBeadSizeByIdQuery = async (
  id: string
): Promise<BeadType | { error: string }> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_REST_URL}beadSize/${id}`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    if (!response.ok) {
      return { error: response.statusText };
    }

    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching beadSize:", error);
    return { error: "Failed to retrieve beadSize" };
  }
};
