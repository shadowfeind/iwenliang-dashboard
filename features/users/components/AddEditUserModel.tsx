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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  createUserSchema,
  CreateUserType,
  updateUserSchema,
} from "@/features/users/user.schema";
import { useEffect, useMemo, useState, useTransition } from "react";
import { ErrorComponent } from "@/components/ErrorComponent";
import {
  createUser,
  getUserByIdAction,
  updateUser,
} from "@/features/users/user.action";
import { z } from "zod";
import { mode } from "@/config/types/mode.types";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mode: mode;
  userId?: string | null;
};

const AddEditUserModel = ({ isOpen, setIsOpen, mode, userId }: Props) => {
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const formValidationSchema = useMemo(() => {
    switch (mode) {
      case "create":
        return createUserSchema;
      case "edit":
        return updateUserSchema;
      default:
        return createUserSchema;
    }
  }, [mode]);

  const form = useForm<z.infer<typeof formValidationSchema>>({
    resolver: zodResolver(formValidationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      userName: "",
      role: "User",
      password: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formValidationSchema>) => {
    setError("");
    startTransition(() => {
      if (mode === "create") {
        const createValues = values as CreateUserType;
        createUser(createValues).then((data) => {
          if (data?.error) {
            setError(data.error);
          } else {
            form.reset();
            setIsOpen(false);
          }
        });
      }
      if (mode === "edit") {
        const updateValues = values as z.infer<typeof updateUserSchema>;
        console.log(updateValues);
        updateUser(updateValues, userId ?? "").then((data) => {
          if (data?.error) {
            setError(data.error);
          } else {
            form.reset();
            setIsOpen(false);
          }
        });
      }
    });
  };

  useEffect(() => {
    if (userId && mode === "edit") {
      getUserByIdAction(userId).then((data) => {
        if ("error" in data) {
          setError(data.error);
        } else {
          form.setValue("fullName", data.fullName ?? "");
          form.setValue("email", data.email ?? "");
          form.setValue("userName", data.userName ?? "");
          form.setValue("role", data.role ?? "User");
        }
      });
    }
    // eslint-disable-next-line
  }, [mode, userId]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="p-8">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Add User" : "Update user"}
          </DialogTitle>
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
                        disabled={mode === "edit"}
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
                        disabled={mode === "edit"}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {mode === "create" && (
              <div className="flex flex-col space-y-1.5">
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
            )}
            <div className="flex flex-col space-y-1.5 mt-4">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      // disabled={mode === "view"}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Please Select A Role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="User">User</SelectItem>
                        <SelectItem value="Admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button disabled={isPending} className="mt-8" type="submit">
              {isPending
                ? "Loading...."
                : mode === "edit"
                ? "Update User"
                : "Create User"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditUserModel;
