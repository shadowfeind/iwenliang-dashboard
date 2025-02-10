"use client";

import { useEffect, useState, useTransition } from "react";
import {
  createShippingSchema,
  CreateShippingType,
  ShippingType,
} from "../shipping.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ErrorComponent } from "@/components/ErrorComponent";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { updateShipping } from "../shipping.action";
import { redirect, useRouter } from "next/navigation";
import { SHIPPING_ROUTE } from "@/config/constant/routes";

type Props = {
  data: ShippingType;
};

const ShippingEditPage = ({ data }: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const form = useForm<CreateShippingType>({
    defaultValues: {
      customerId: "",
      orderId: "",
      dispatchedTo: "Fed Ex",
      dispatchedBy: "",
      dispatchedDate: "",
      arrivalDate: "",
      trackingNo: "",
      link: "",
      remarks: "",
    },
    resolver: zodResolver(createShippingSchema),
  });

  useEffect(() => {
    const dispatchFormattedDate = data.dispatchedDate
      ? new Date(data.dispatchedDate).toISOString().split("T")[0]
      : "";
    const arrivalFormattedDate = data.arrivalDate
      ? new Date(data.arrivalDate).toISOString().split("T")[0]
      : "";
    form.reset({
      ...data,
      customerId: data.customerId.toString(),
      orderId: data.orderId.toString(),
      dispatchedDate: dispatchFormattedDate,
      arrivalDate: arrivalFormattedDate,
    });
  }, [data]);

  const handleSubmit = (values: CreateShippingType) => {
    startTransition(() => {
      updateShipping(data._id, values).then((res) => {
        if (res?.error) {
          setError(res.error);
        } else {
          form.reset();
          router.push(SHIPPING_ROUTE);
        }
      });
    });
  };

  return (
    <div className="pb-8">
      <Form {...form}>
        <form
          className="w-full space-y-4"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <ErrorComponent message={error} />
          <div className="grid grid-cols-1 md:grid-cols-3  gap-6">
            <FormField
              control={form.control}
              name="dispatchedTo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dispatched To</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="trackingNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tracking No.</FormLabel>
                  <FormControl>
                    <Input placeholder="tracking no." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Link <small>(Link to track)</small>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
            <FormField
              control={form.control}
              name="dispatchedDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dispatched Date</FormLabel>
                  <FormControl>
                    <Input {...field} type="date" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="arrivalDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Arrival Date</FormLabel>
                  <FormControl>
                    <Input {...field} type="date" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1">
            <FormField
              control={form.control}
              name="remarks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Remarks</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="pt-4">
            <Button disabled={isPending} type="submit">
              {isPending ? "Updating ...." : "Update"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ShippingEditPage;
