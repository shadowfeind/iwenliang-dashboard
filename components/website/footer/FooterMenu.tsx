import Link from "next/link";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

const FooterMenu = () => {
  return (
    <footer className="bg-black text-white pb-16 pt-8 md:py-12  px-4">
      <div className="w-10/12 mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Customer Service Column */}
        <div className="space-y-4">
          <h3 className="font-serif text-[#D4AF37] text-lg tracking-[0.1em] mb-6">
            CUSTOMER SERVICE
          </h3>
          <nav className="flex flex-col space-y-3">
            <Link
              href="/contact-us"
              className="text-sm text-gray-400 transition-colors hover:text-[#D4AF37]"
            >
              Contact Us
            </Link>
            <Link
              href="/faqs"
              className="text-sm text-gray-400 transition-colors hover:text-[#D4AF37]"
            >
              FAQs
            </Link>
            <Link
              href="/measurements"
              className="text-sm text-gray-400 transition-colors hover:text-[#D4AF37]"
            >
              Measurements
            </Link>
            <Link
              href="/bracelets"
              className="text-sm text-gray-400 transition-colors hover:text-[#D4AF37]"
            >
              {/* Gift Voucher */}
              Shop
            </Link>
            <Link
              href="/blog"
              className="text-sm text-gray-400 transition-colors hover:text-[#D4AF37]"
            >
              Our Blogs
            </Link>
          </nav>
        </div>

        {/* About Company Column */}
        <div className="space-y-4">
          <h3 className="font-serif text-[#D4AF37] text-lg tracking-[0.1em] mb-6">
            ABOUT COMPANY
          </h3>
          <nav className="flex flex-col space-y-3">
            <Link
              href="/about-us"
              className="text-sm text-gray-400 transition-colors hover:text-[#D4AF37]"
            >
              About Us
            </Link>
            <Link
              href="/shipping-guide"
              className="text-sm text-gray-400 transition-colors hover:text-[#D4AF37]"
            >
              Shipping Guide
            </Link>
            <Link
              href="/return-policy"
              className="text-sm text-gray-400 transition-colors hover:text-[#D4AF37]"
            >
              Return Policy
            </Link>
            <Link
              href="/terms-and-conditions"
              className="text-sm text-gray-400 transition-colors hover:text-[#D4AF37]"
            >
              Terms & Conditions
            </Link>
          </nav>
        </div>

        {/* Follow Us Column */}
        <div className="space-y-4">
          <h3 className="font-serif text-[#D4AF37] text-lg tracking-[0.1em] mb-6">
            FOLLOW US
          </h3>
          <div className="flex space-x-6">
            <Link
              href="https://facebook.com"
              className="text-gray-400 transition-colors hover:text-[#D4AF37]"
            >
              <FaFacebook className="h-6 w-6" />
            </Link>
            <Link
              href="https://instagram.com"
              className="text-gray-400 transition-colors hover:text-[#D4AF37]"
            >
              <FaInstagram className="h-6 w-6" />
            </Link>
            <Link
              href="https://youtube.com"
              className="text-gray-400 transition-colors hover:text-[#D4AF37]"
            >
              <FaYoutube className="h-6 w-6" />
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
