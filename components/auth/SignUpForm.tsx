"use client";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import { FaFacebookSquare, FaGoogle } from "react-icons/fa";

const SignUpForm = () => {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Register</CardTitle>
        <CardDescription>Choose one to register</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button variant="outline" className="w-full">
          <FaGoogle className="mr-2 size-4" />
          Register with Google
        </Button>
        <Button variant="outline" className="w-full">
          <FaFacebookSquare className="mr-2 size-4" />
          Register with Facebook
        </Button>

        <div className="mt-4 text-center text-sm">
          Alrady have an account?{" "}
          <Link href="/sign-in" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignUpForm;
