"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateUserSchema } from "@/features/users/user.schema";
import { useEffect, useMemo, useState, useTransition } from "react";
import { ErrorComponent } from "@/components/ErrorComponent";
import { updateUser } from "@/features/users/user.action";
import { z } from "zod";
import { UserTypes } from "@/features/users/users.types";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: UserTypes;
};

const Edit = ({ isOpen, setIsOpen, user }: Props) => {
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
  });

  const handleSubmit = (values: z.infer<typeof updateUserSchema>) => {
    setError("");
    startTransition(() => {
      const updateValues = values as z.infer<typeof updateUserSchema>;
      console.log(updateValues);
      updateUser(updateValues, user._id).then((data) => {
        if (data?.error) {
          setError(data.error);
        } else {
          form.reset();
          setIsOpen(false);
        }
      });
    });
  };

  useEffect(() => {
    form.setValue("fullName", user.fullName ?? "");
    form.setValue("email", user.email ?? "");
    form.setValue("userName", user.userName ?? "");
    form.setValue("role", user.role ?? "User");
  }, [user]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="p-8">
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <ErrorComponent message={error} />
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="flex flex-col space-y-1.5 pb-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>FullName</FormLabel>
                    <FormControl>
                      <Input placeholder="FullName" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col space-y-1.5 pb-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="email@gmail.com"
                        {...field}
                        disabled={true}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col space-y-1.5 pb-6">
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>UserName</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="username"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button disabled={isPending} className="mt-8" type="submit">
              {isPending ? "Loading...." : "Update Profile"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default Edit;
