"use client";

import { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  changePasswordSchema,
  ChangePasswordType,
} from "@/features/users/user.schema";
import { ErrorComponent } from "@/components/ErrorComponent";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { changePassword } from "@/features/users/user.action";

type changePasswordType = {
  isOpen: boolean;
  setIsOpenAction: React.Dispatch<React.SetStateAction<boolean>>;
  userId?: string | null;
};

export const ChangePassword = ({
  isOpen,
  setIsOpenAction,
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
          setIsOpenAction(false);
        }
      });
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpenAction}>
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
