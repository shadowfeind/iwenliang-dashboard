import { DataTable } from "./components/DataTable";
import { getAllUsers } from "./user.query";

const UserPage = async () => {
  const user = await getAllUsers();

  if ("error" in user) {
    return <p className="text-red-500">{user.error}</p>;
  }

  return <DataTable data={user} />;
};

export default UserPage;
