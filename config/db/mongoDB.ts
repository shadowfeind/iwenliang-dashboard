import { MongoClient } from "mongodb";
const uri: string = process.env.MONGO_URI!;
const options = {};
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable to preserve the client across module reloads
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri, options);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}
export default clientPromise;
