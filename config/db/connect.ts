import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI;

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Explicitly initialize the global mongoose cache
const globalWithMongoose = global as typeof globalThis & {
  mongoose?: MongooseCache;
};

// Ensure the cache is always initialized
if (!globalWithMongoose.mongoose) {
  globalWithMongoose.mongoose = {
    conn: null,
    promise: null,
  };
}

async function connectDB() {
  // Ensure we have a cache, using a non-null assertion
  const cached = globalWithMongoose.mongoose!;

  // If already connected, return existing connection
  if (cached.conn) {
    return cached.conn;
  }

  // If no existing promise, create a new connection
  if (!cached.promise) {
    const opts = {
      bufferCommands: true,
      // Add any other connection options you need
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      return mongoose;
    });
  }

  // Wait for the connection to be established
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
