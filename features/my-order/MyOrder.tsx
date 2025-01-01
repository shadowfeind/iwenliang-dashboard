import React from "react";
import { UserTypes } from "../users/users.types";
import { getOrderByCustomerId } from "./my-order.query";
import { DataTable } from "../orders/components/DataTable";

type AuthUser = Omit<UserTypes, "password" | "createdAt" | "updatedAt">;

type Props = {
  user: AuthUser;
};

const MyOrder = async ({ user }: Props) => {
  const data = await getOrderByCustomerId(user._id);

  if ("error" in data) {
    return <h1 className="text-red-600">{data.error}</h1>;
  }
  return <DataTable data={data} role={user.role} />;
};

export default MyOrder;
