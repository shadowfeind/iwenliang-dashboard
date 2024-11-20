import { getAllUsers } from "@/features/users/user.action";
import { DataTable } from "./components/DataTable";

const UserPage = async () => {
  const data = await getAllUsers();

  if ("error" in data) {
    return <h1 className="text-red-600">{data.error}</h1>;
  }

  return <DataTable data={data} />;
};

export default UserPage;
