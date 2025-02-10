import React from "react";
import { UserTypes } from "../users/users.types";
import { getShipingForCustomer } from "../shipping/shipping.query";
import { DataTable } from "../shipping/components/DataTable";

type AuthUser = Omit<UserTypes, "password" | "createdAt" | "updatedAt">;

type Props = {
  user: AuthUser;
};

const MyShipping = async ({ user }: Props) => {
  const data = await getShipingForCustomer(user._id);
  if ("error" in data) {
    return <h1 className="text-red-600">{data.error}</h1>;
  }
  return <DataTable data={data} role={user.role} />;
};

export default MyShipping;
