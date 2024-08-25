import { getAllUsers } from "@/actions/userActions";
import { DataTable } from "@/components/users/DataTable";

const UserPage = async () => {
  const data = await getAllUsers();

  if ("error" in data) {
    return <h1 className="text-red-600">{data.error}</h1>;
  }

  return <DataTable data={data} />;
};

export default UserPage;
