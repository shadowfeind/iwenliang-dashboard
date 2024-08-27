import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";
import connectDB from "@/config/db/connect";
import mongoose from "mongoose";

connectDB();

export const adapter = new MongodbAdapter(
  mongoose.connection.collection("sessions"),
  mongoose.connection.collection("users")
);
