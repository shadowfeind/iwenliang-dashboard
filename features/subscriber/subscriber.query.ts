import connectDB from "@/config/db/connect";
import Subscriber from "./subscriber.model";
import { SubscriberType } from "./subscriber.type";
import clientPromise from "@/config/db/mongoDB";
import { Db } from "mongodb";

// export const getAllSubscriberQuery = async (): Promise<
//   SubscriberType[] | { error: string }
// > => {
//   try {
//     await connectDB();
//     const response = await Subscriber.find().lean();
//     if (!response) {
//       return { error: "No data found" };
//     }
//     return JSON.parse(JSON.stringify(response));
//   } catch (error) {
//     console.log("getAllSubscriberQuery error: ", error);
//     return { error: "Error fetching data" };
//   }
// };

export const getAllSubscriberQuery = async (): Promise<
  SubscriberType[] | { error: string }
> => {
  try {
    const client = await clientPromise;
    const db: Db = client.db();
    const collection = db.collection<SubscriberType>("subscribers"); // Use the Subscriber type

    const subscribers = await collection.find({}).toArray();

    if (!subscribers) {
      return { error: "No data found" };
    }

    // Convert MongoDB ObjectId to string for easier use in the frontend
    return subscribers.map((subscriber) => ({
      ...subscriber,
      _id: subscriber._id.toString(),
    }));
  } catch (error) {
    console.error("getAllSubscribers error:", error);
    return { error: "Error fetching data" };
  }
};
