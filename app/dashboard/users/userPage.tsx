import { DataTable } from "@/components/users/DataTable";
import connectDB from "@/db/connect";
import User from "@/models/userModels";

const UserPage = async () => {
  await connectDB();

  const users = await User.find().sort({ createdAt: 1 }).lean();

  // Serialize the users array because of _id
  const serializedUsers = JSON.parse(JSON.stringify(users));

  return <DataTable data={serializedUsers} />;
};

export default UserPage;
