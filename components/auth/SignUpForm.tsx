"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema, AuthType } from "@/config/schemas/auth.schema";
import { useState, useTransition } from "react";
import { ErrorComponent } from "../ErrorComponent";
import { singIn } from "@/actions/auth.action";
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
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<AuthType>({
    resolver: zodResolver(authSchema),
  });

  const handleSubmit = (values: AuthType) => {
    // startTransition(() => {
    //   singIn(values).then((data) => {
    //     if (data?.error) {
    //       setError(data.error);
    //     }
    //   });
    // });
  };
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Register</CardTitle>
        <CardDescription>
          Fill up the form below to register to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <ErrorComponent message={error} />
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-3"
          >
            <div>
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username*</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Johndoe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password*</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="*****" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={isPending} type="submit" className="w-full">
              {isPending ? "Registering..." : "Register"}
            </Button>
            <Button variant="outline" className="w-full">
              <FaGoogle className="mr-2 size-4" />
              Register with Google
            </Button>
            <Button variant="outline" className="w-full">
              <FaFacebookSquare className="mr-2 size-4" />
              Register with Facebook
            </Button>
          </form>
        </Form>
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
