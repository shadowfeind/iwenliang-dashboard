import Image from "next/image";
import SignInForm from "./_components/SignInForm";

export default function Home() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-black">
      <SignInForm />
    </div>
  );
}
