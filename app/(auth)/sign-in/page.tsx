import { auth } from "@/auth";
import SignInForm from "@/components/auth/SignInForm";
import { redirect } from "next/navigation";

const SignIn = async () => {
  const session = await auth();
  if (session) redirect("/");
  return (
    <div className="w-full h-screen flex items-center justify-center bg-black">
      <SignInForm />
    </div>
  );
};

export default SignIn;
