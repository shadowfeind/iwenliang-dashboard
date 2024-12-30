import { AlertCircle, ArrowLeft, LogIn } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";

const Unauthorized = () => {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900">
            <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-300" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            401 - Unauthorized
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Oops! You don't have permission to access this page.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            This could be due to:
          </p>
          <ul className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            <li>An expired session</li>
            <li>Insufficient permissions</li>
            <li>Attempting to access a restricted area</li>
          </ul>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>
          <Button asChild>
            <Link href="/login">
              <LogIn className="mr-2 h-4 w-4" />
              Log In
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Unauthorized;
