"use client";

import { useEffect } from "react";
import { XCircle } from "lucide-react";
import Link from "next/link";
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-md text-center">
            <div className="mb-8 animate-pulse">
              <XCircle className="h-24 w-24 mx-auto text-gray-400" />
            </div>
            <h1 className="text-6xl font-bold mb-4">Oops!</h1>
            <h2 className="text-3xl font-semibold mb-6">
              A critical error occurred
            </h2>
            <p className="text-gray-400 mb-8">
              We apologize for the inconvenience. Our team has been notified and
              is working on a fix.
            </p>
            <div className="space-y-4">
              <button
                onClick={() => reset()}
                className="w-full bg-white text-black hover:bg-gray-200 transition-colors duration-300 py-2 px-4 rounded font-semibold"
              >
                Try Again
              </button>
              <Link
                href="/"
                className="block w-full border border-gray-700 hover:bg-gray-800 transition-colors duration-300 py-2 px-4 rounded font-semibold"
              >
                Return Home
              </Link>
            </div>
          </div>
          <div className="mt-16 text-gray-600 text-sm">
            <p>Error ID: {error.digest}</p>
            <p className="mt-2">
              &copy; {new Date().getFullYear()} Iwenliang. All rights reserved.
            </p>
          </div>
        </div>
      </body>
    </html>
  );
}
