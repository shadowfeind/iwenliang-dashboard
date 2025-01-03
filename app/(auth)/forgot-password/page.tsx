import { auth } from "@/auth";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import SignInForm from "@/components/auth/SignInForm";
import { redirect } from "next/navigation";

const ForgotPassword = async () => {
  const session = await auth();
  if (session) redirect("/");
  return (
    <div className="w-full h-screen flex items-center justify-center bg-black">
      <ForgotPasswordForm />
    </div>
  );
};

export default ForgotPassword;
