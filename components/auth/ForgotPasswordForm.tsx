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
import { useState, useTransition } from "react";
import { ErrorComponent } from "../ErrorComponent";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { forgotPassword } from "@/actions/auth.action";

const ForgotPasswordForm = () => {
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState("");

  const form = useForm({
    resolver: zodResolver(z.object({ email: z.string().email() })),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = (values: { email: string }) => {
    startTransition(() => {
      forgotPassword(values.email).then((data) => {
        if (data?.error) {
          setError(data.error);
        } else {
          setMessage("Successfull. Please check your email");
        }
      });
    });
  };

  return (
    <Card className="mx-auto  min-w-[400px]">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Enter your email</CardDescription>
        {message && <p className="text-green-500">{message}</p>}
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

            <Button disabled={isPending} type="submit" className="w-full">
              {isPending ? "Searching..." : "Reset password"}
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          <Link href="/sign-in" className="underline">
            Go back
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ForgotPasswordForm;
