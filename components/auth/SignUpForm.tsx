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
import {
  customerSchema,
  CustomerTypes,
} from "@/features/customers/customer.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { ErrorComponent } from "../ErrorComponent";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { registerCustomer } from "@/features/customers/customer.action";

const SignUpForm = () => {
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<CustomerTypes>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      userName: "",
      password: "",
      email: "",
      fullName: "",
      phone: "",
    },
  });

  const handleSubmit = (values: CustomerTypes) => {
    startTransition(() => {
      registerCustomer(values).then((data) => {
        if (data.success) {
          toast("Registration successfull. Please login to continue");
          router.push("/sign-in");
        }
        if (data.error) {
          setError(data.error);
        }
      });
    });
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Register</CardTitle>
        <CardDescription>
          Fill up the form or choose one to register
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <ErrorComponent message={error} />
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-3"
          >
            <div>
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>FullName*</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="John doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email*</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Johndoe@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Phone{" "}
                      <span className="text-xs  text-muted-foreground">
                        (optional)
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="661691989 " {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Username{" "}
                      <span className="text-xs  text-muted-foreground">
                        (optional)
                      </span>
                    </FormLabel>
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
            {/* <Button variant="outline" className="w-full">
              <FaGoogle className="mr-2 size-4" />
              Login with Google
            </Button>
            <Button variant="outline" className="w-full">
              <FaFacebookSquare className="mr-2 size-4" />
              Login with Facebook
            </Button> */}
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
