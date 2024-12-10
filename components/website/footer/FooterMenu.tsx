import Link from "next/link";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

const FooterMenu = () => {
  return (
    <footer className="bg-black text-white py-12 px-4">
      <div className="w-10/12 mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Customer Service Column */}
        <div className="space-y-4">
          <h3 className="font-medium text-sm tracking-wider mb-6 ">
            CUSTOMER SERVICE
          </h3>
          <nav className="flex flex-col space-y-3">
            <Link href="/contact" className="text-sm hover:text-gray-300">
              Contact Us
            </Link>
            <Link href="/faqs" className="text-sm hover:text-gray-300">
              FAQs
            </Link>
            <Link href="/measurements" className="text-sm hover:text-gray-300">
              Measurements
            </Link>
            <Link href="/gift-voucher" className="text-sm hover:text-gray-300">
              Gift Voucher
            </Link>
          </nav>
        </div>

        {/* About Company Column */}
        <div className="space-y-4">
          <h3 className="font-medium text-sm tracking-wider mb-6">
            ABOUT COMPANY
          </h3>
          <nav className="flex flex-col space-y-3">
            <Link href="/about" className="text-sm hover:text-gray-300">
              About Us
            </Link>
            <Link href="/shipping" className="text-sm hover:text-gray-300">
              Shipping Guide
            </Link>
            <Link href="/returns" className="text-sm hover:text-gray-300">
              Return Policy
            </Link>
            <Link href="/terms" className="text-sm hover:text-gray-300">
              Terms & Conditions
            </Link>
          </nav>
        </div>

        {/* Follow Us Column */}
        <div className="space-y-4">
          <h3 className="font-medium text-sm tracking-wider mb-6">FOLLOW US</h3>
          <div className="flex space-x-4">
            <Link href="https://facebook.com" className="hover:text-gray-300">
              <FaFacebook className="h-5 w-5" />
            </Link>
            <Link href="https://instagram.com" className="hover:text-gray-300">
              <FaInstagram className="h-5 w-5" />
            </Link>
            <Link href="https://youtube.com" className="hover:text-gray-300">
              <FaYoutube className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="w-10/12 mx-auto mt-12">
        <p className="text-sm">©I.WENLIANG</p>
      </div>
    </footer>
  );
};

export default FooterMenu;
