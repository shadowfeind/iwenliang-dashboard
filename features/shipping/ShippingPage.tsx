import { UserTypes } from "../users/users.types";
import { DataTable } from "./components/DataTable";
import { getAllShipping } from "./shipping.query";

type AuthUser = Omit<UserTypes, "password" | "createdAt" | "updatedAt">;

type Props = {
  user: AuthUser;
};
export const ShippingPage = async ({ user }: Props) => {
  const data = await getAllShipping();

  if ("error" in data) {
    return <h1 className="text-red-600">{data.error}</h1>;
  }

  return <DataTable data={data} role={user.role} />;
};
