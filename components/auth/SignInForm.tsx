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

const SignInForm = () => {
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const form = useForm<AuthType>({
    resolver: zodResolver(authSchema),
  });

  const handleSubmit = (values: AuthType) => {
    startTransition(() => {
      singIn(values).then((data) => {
        if (data?.error) {
          setError(data.error);
        }
      });
    });
  };
  return (
    <div className="p-8 m-4 md:p-12 bg-white rounded-md w-full md:w-[400px] border">
      <h1 className="text-xl font-semibold">Sign In</h1>
      <Form {...form}>
        <ErrorComponent message={error} />
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 mt-4"
        >
          <div className="flex flex-col space-y-1.5">
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
          <div className="flex flex-col space-y-1.5">
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
          <Button disabled={isPending} className="mt-8" type="submit">
            {isPending ? "Authenticating..." : "Sign In"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignInForm;
