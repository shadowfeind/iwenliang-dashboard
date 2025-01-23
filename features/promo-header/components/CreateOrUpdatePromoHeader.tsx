"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useTransition } from "react";
import { ErrorComponent } from "@/components/ErrorComponent";
import { z } from "zod";
import { mode } from "@/config/types/mode.types";
import { createPromoHeaderSchema } from "../promoHeader.schema";
import { createPromoHeader, updatePromoHeader } from "../promoHeader.action";
import { getPromoHeaderById } from "../promoHeader.query";
import { Switch } from "@/components/ui/switch";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mode: mode;
  promoHeaderId?: string | null;
};

const CreateOrUpdatePromoHeader = ({
  isOpen,
  setIsOpen,
  mode,
  promoHeaderId,
}: Props) => {
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof createPromoHeaderSchema>>({
    resolver: zodResolver(createPromoHeaderSchema),
    defaultValues: {
      title: "",
      isActive: false,
    },
  });

  const handleSubmit = (values: z.infer<typeof createPromoHeaderSchema>) => {
    setError("");
    startTransition(() => {
      if (mode === "create") {
        const createValues = values;
        createPromoHeader(createValues).then((data) => {
          if (data?.error) {
            setError(data.error);
          } else {
            form.reset();
            setIsOpen(false);
          }
        });
      }
      if (mode === "edit") {
        const updateValues = values;
        updatePromoHeader(updateValues, promoHeaderId ?? "").then((data) => {
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
    if (promoHeaderId && (mode === "edit" || mode === "view")) {
      getPromoHeaderById(promoHeaderId).then((data) => {
        if ("error" in data) {
          setError(data.error);
        } else {
          form.setValue("title", data.title ?? "");
          form.setValue("isActive", data.isActive ?? "");
        }
      });
    }
    // eslint-disable-next-line
  }, [mode, promoHeaderId]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="p-8">
        <DialogHeader>
          <DialogTitle>
            {mode === "create"
              ? "Add Promo Header"
              : mode === "edit"
              ? "Update promo Header"
              : "View Promo Header"}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <ErrorComponent message={error} />
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="flex flex-col space-y-1.5 pb-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Promo Header Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Header"
                        disabled={mode === "view"}
                        {...field}
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
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Active</FormLabel>
                      <FormDescription>
                        Active or deactive Header.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        aria-readonly
                        disabled={mode === "view"}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            {mode !== "view" && (
              <Button disabled={isPending} className="mt-8" type="submit">
                {isPending
                  ? "Loading...."
                  : mode === "edit"
                  ? "Update Promo Header"
                  : "Create Promo Header"}
              </Button>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateOrUpdatePromoHeader;
