import Image from "next/image";
import Logo from "../../../public/images/mainlogo.png";
import CheckoutPage from "./CheckoutPage";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();
  if (!session) redirect("/sign-in?redirect=cart");

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 flex flex-col justify-center items-center">
      <Link href={"/"}>
        <Image height={43} width={262} src={Logo} alt="iwenliang" />
      </Link>
      <CheckoutPage session={session} />
    </div>
  );
};

export default page;
