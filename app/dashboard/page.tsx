import { auth } from "@/lib/auth";

export default async function Dashboard() {
  const test = await auth();
  return <h1>Dashboard</h1>;
}
