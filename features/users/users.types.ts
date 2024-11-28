export type Roles = "Admin" | "User";

export type UserTypes = {
  _id: string;
  fullName: string;
  email: string;
  userName: string;
  password: string;
  role: Roles;
  createdAt?: string;
  updatedAt?: string;
};
