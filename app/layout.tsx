import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/config/providers/Providers";
import SiteHeader from "@/components/website/SiteHeader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Iwenliang | Dashboard",
  description: "Iwenliang admin panel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* i was using theme switcher but not any more. might remove it future */}
        <SiteHeader />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
