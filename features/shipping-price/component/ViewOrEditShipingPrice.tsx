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
import { useEffect, useState, useTransition } from "react";
import { ErrorComponent } from "@/components/ErrorComponent";
import { mode } from "@/config/types/mode.types";
import {
  createShippingPriceSchema,
  ShippingPriceType,
} from "../shippingPrice.schema";
import { updateShippingPrice } from "../shippingPrice.action";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  mode: mode;
  shippingPrice?: ShippingPriceType | null;
};

const ViewOrEditShippingPrice = ({
  isOpen,
  setIsOpen,
  mode,
  shippingPrice,
}: Props) => {
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<ShippingPriceType>({
    resolver: zodResolver(createShippingPriceSchema),
    defaultValues: {
      name: "",
      price: 0,
      dial_code: "",
      code: "",
    },
  });

  const handleSubmit = (values: ShippingPriceType) => {
    setError("");
    startTransition(() => {
      if (mode === "edit") {
        updateShippingPrice(values, shippingPrice?._id ?? "").then((data) => {
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
    if (shippingPrice) {
      form.setValue("name", shippingPrice.name);
      form.setValue("price", shippingPrice.price);
      form.setValue("dial_code", shippingPrice.dial_code);
      form.setValue("code", shippingPrice.code);
    }
    // eslint-disable-next-line
  }, [shippingPrice]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="p-8">
        <DialogHeader>
          <DialogTitle>
            {mode === "view" ? "Shipping Price" : "Update Shipping Price"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <ErrorComponent message={error} />
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="flex flex-col space-y-1.5 pb-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country Name</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={true} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shipping Price</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending || mode === "view"}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dial_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Dial Code</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={true} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country Code</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={true} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {mode !== "view" && (
              <Button disabled={isPending} className="mt-8" type="submit">
                {isPending ? "Updating..." : "Update"}
              </Button>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ViewOrEditShippingPrice;
