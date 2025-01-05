import { MongoClient, MongoClientOptions } from "mongodb";

// Define global type for TypeScript
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

// Connection options
const options: MongoClientOptions = {
  maxPoolSize: 10, // Maximum number of connections in the pool
  retryWrites: true, // Automatically retry failed writes
  w: "majority", // Write concern: wait for writes to replicate to majority
  connectTimeoutMS: 5000, // Connection timeout
  socketTimeoutMS: 30000, // Socket timeout
};

// Connection URI with type safety
const uri = process.env.MONGO_URI;

if (!uri) {
  throw new Error(
    "Please add your MongoDB URI to .env.local\n" +
      "Example: MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database"
  );
}

// Connection management
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development, use a global variable to preserve connection across HMR
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect().catch((error) => {
      console.error("Failed to connect to MongoDB:", error);
      throw error;
    });
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, create a new connection
  client = new MongoClient(uri, options);
  clientPromise = client.connect().catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
    throw error;
  });
}

// Helper function to get database instance
export async function getDatabase(dbName?: string) {
  const client = await clientPromise;
  return client.db(dbName);
}

// Export clientPromise for reuse
export default clientPromise;
