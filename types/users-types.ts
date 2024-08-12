export type UserTypes = {
    _id: string;
    fullName: string;
    email: string;
    userName: string;
    role: "User" | "Admin";
    createdAt?: string,
    updatedAt?: string,
}