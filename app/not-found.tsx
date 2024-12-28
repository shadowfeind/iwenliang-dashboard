"use client";

import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-4">
      <div className="w-full max-w-md text-center">
        <div className="mb-8 animate-pulse">
          <AlertCircle className="h-24 w-24 mx-auto text-gray-400" />
        </div>
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-6">Page Not Found</h2>
        <p className="text-gray-400 mb-8">
          Oops! The page you're looking for seems to have vanished into the
          digital void.
        </p>
        <div className="space-y-4">
          <Link href="/" passHref>
            <Button
              variant="outline"
              className="w-full bg-white text-black hover:bg-gray-200 transition-colors duration-300"
            >
              Return Home
            </Button>
          </Link>

          <Button
            onClick={() => router.back()}
            variant="ghost"
            className="w-full border border-gray-700 hover:bg-gray-800 transition-colors duration-300"
          >
            Go Back
          </Button>
        </div>
      </div>
      <div className="mt-16 text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} Iwenliang. All rights reserved.</p>
      </div>
    </div>
  );
}
