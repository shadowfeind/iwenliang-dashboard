/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "localhost",
      "iwenliangv3.s3.ap-southeast-1.amazonaws.com",
      "https://www.sandbox.paypal.com",
    ],
  },
};

export default nextConfig;
