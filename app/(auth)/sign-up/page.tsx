import { auth } from "@/auth";
import SignUpForm from "@/components/auth/SignUpForm";
import { redirect } from "next/navigation";

const RegisterPage = async () => {
  const session = await auth();
  if (session) redirect("/");

  return (
    <div className="w-full h-screen flex items-center justify-center bg-black">
      <SignUpForm />
    </div>
  );
};

export default RegisterPage;
