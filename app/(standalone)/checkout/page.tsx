import Image from "next/image";
import Logo from "../../../public/images/mainlogo.png";
import CheckoutPage from "./CheckoutPage";

const page = () => {
  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 flex flex-col justify-center items-center">
      <Image height={43} width={262} src={Logo} alt="iwenliang" />
      <CheckoutPage />
    </div>
  );
};

export default page;
