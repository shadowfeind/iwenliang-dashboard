"use client";

import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  changePasswordSchema,
  ChangePasswordType,
} from "@/config/schemas/user.schema";
import { ErrorComponent } from "../../ErrorComponent";
import { Button } from "../../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import { changePassword } from "@/actions/user.action";

type changePasswordType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userId?: string | null;
};

export const ChangePassword = ({
  isOpen,
  setIsOpen,
  userId,
}: changePasswordType) => {
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<ChangePasswordType>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = (value: ChangePasswordType) => {
    startTransition(() => {
      changePassword(value.password, userId ?? "").then((data) => {
        if (data?.error) {
          setError(data.error);
        } else {
          form.reset();
          setIsOpen(false);
        }
      });
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <ErrorComponent message={error} />
            <div className="flex flex-col space-y-1.5 pb-6">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="*****" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>confirmPassword</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="*****" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button disabled={isPending} className="mt-8" type="submit">
              {isPending ? "Updating Password..." : "Updage Password"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
