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
import { CouponType, createCouponSchema } from "../coupon.schema";
import { createCoupon, updateCoupon } from "../coupon.action";
import { getCouponById } from "../coupon.query";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DISCOUNT_TYPE_OPTIONS } from "@/config/constant/discountTypes";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mode: mode;
  couponId?: string | null;
};

const CreateOrUpdateCoupon = ({ isOpen, setIsOpen, mode, couponId }: Props) => {
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<CouponType>({
    resolver: zodResolver(createCouponSchema),
    defaultValues: {
      code: "",
      validTill: new Date(),
      isActive: true,
      discountType: undefined,
      discountValue: 0,
    },
  });

  const handleSubmit = (values: z.infer<typeof createCouponSchema>) => {
    setError("");
    startTransition(() => {
      if (mode === "create") {
        createCoupon(values).then((data) => {
          if (data?.error) {
            setError(data.error);
          } else {
            form.reset();
            setIsOpen(false);
          }
        });
      }
      if (mode === "edit") {
        updateCoupon(values, couponId ?? "").then((data) => {
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
    if (couponId && mode === "edit") {
      getCouponById(couponId).then((data) => {
        if ("error" in data) {
          setError(data.error);
        } else {
          form.setValue("code", data.code ?? "");
          form.setValue("validTill", new Date(data.validTill ?? ""));
          form.setValue("isActive", data.isActive ?? "");
          form.setValue("discountType", data.discountType ?? "");
          form.setValue("discountValue", data.discountValue ?? "");
        }
      });
    }
    // eslint-disable-next-line
  }, [mode, couponId]);

  const generateCoupon = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    form.setValue("code", result);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="p-8">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Add BeadSize" : "Update beadSize"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <ErrorComponent message={error} />
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="flex flex-col space-y-3 pb-6">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Coupon Code</FormLabel>
                    <div className="flex space-x-2">
                      <FormControl>
                        <Input
                          placeholder="code"
                          {...field}
                          disabled={isPending}
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e);
                          }}
                        />
                      </FormControl>
                      <Button
                        type="button"
                        onClick={generateCoupon}
                        disabled={isPending}
                        variant={"secondary"}
                      >
                        Generate Coupon
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="validTill"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valid Till</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        value={
                          field.value instanceof Date
                            ? field.value.toISOString().split("T")[0]
                            : ""
                        }
                        onChange={(e) =>
                          field.onChange(new Date(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="discountType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Please select discount type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {DISCOUNT_TYPE_OPTIONS.map((discount) => (
                          <SelectItem
                            value={discount.value}
                            key={discount.value}
                          >
                            {discount.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="discountValue"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discount Value</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="value"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Active</FormLabel>
                      <FormDescription>Coupon will be active</FormDescription>
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

            <Button disabled={isPending} className="mt-8" type="submit">
              {isPending
                ? "Loading...."
                : mode === "edit"
                ? "Update Coupon"
                : "Create Coupon"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateOrUpdateCoupon;
