import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);

  // If the database is already connected, don't connect again
  if (connected) {
    console.log("MongoDB is already connected...");
    return;
  }

  // Ensure that MONGO_URI is defined
  const mongoUri = process.env.MONGO_URI;
  if (!mongoUri) {
    throw new Error("MONGO_URI is not defined in the environment variables.");
  }

  // Connect to MongoDB
  try {
    await mongoose.connect(mongoUri);
    connected = true;
    console.log("MongoDB connected...");
  } catch (error) {
    console.log(error);
    throw new Error("MongoDB connection failed");
  }
};

export default connectDB;
