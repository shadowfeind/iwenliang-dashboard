import connectDB from "@/config/db/connect";
import Subscriber from "./subscriber.model";
import { SubscriberType } from "./subscriber.type";
import { serializeDocument } from "@/lib/utils";

export const getAllSubscriberQuery = async (): Promise<
  SubscriberType[] | { error: string }
> => {
  try {
    await connectDB();
    const response = await Subscriber.find().lean();
    if (!response) {
      return { error: "No data found" };
    }
    return serializeDocument(response);
  } catch (error) {
    console.log("getAllSubscriberQuery error: ", error);
    return { error: "Error fetching data" };
  }
};
