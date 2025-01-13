"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { COUNTRIES } from "@/config/constant/countries";
import { GEO_LOCATION } from "@/config/constant/geoLocation";
import {
  shippingSchema,
  ShippingSchemaType,
} from "@/features/orders/order.schema";
import { ShippingPriceType } from "@/features/shipping-price/shippingPrice.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React, { Ref, useEffect, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { GeoLocationType } from "./StepZero";

export type SubmitRef = {
  submit: () => void;
};
type Props = {
  ref: Ref<SubmitRef>;
  onSubmitForm: (values: ShippingSchemaType) => void;
  handleShippingPrice: (price: number) => void;
  shippingPrice: ShippingPriceType[] | null;
  geoLocation: GeoLocationType;
};

const CheckoutForm = ({
  ref,
  onSubmitForm,
  handleShippingPrice,
  shippingPrice,
  geoLocation,
}: Props) => {
  const form = useForm({
    defaultValues: {
      email: "",
      country: "",
      fullName: "",
      address: "",
      postalCode: "",
      city: "",
      phone: "",
    },
    resolver: zodResolver(shippingSchema),
  });

  useEffect(() => {
    if (shippingPrice && geoLocation) {
      const country = shippingPrice?.find(
        (c) => c.code === geoLocation.iso_code
      );
      console.log(country);
      form.setValue("country", country?.name ?? "");
      form.setValue("phone", country?.dial_code ?? "");
      handleShippingPrice(country?.price ?? 0);
    }
  }, [geoLocation.dial_code, geoLocation.iso_code]);
  //TODO : fix this
  // const handleCountryChange = (country: any) => {
  //   console.log({ country });
  //   const selectedCountry = shippingPrice?.find((c) => c.name === country);
  //   form.setValue("country", country);
  //   form.setValue("phone", selectedCountry?.dial_code ?? "");
  // };

  const handleSubmit = (values: ShippingSchemaType) => {
    onSubmitForm(values);
  };

  useImperativeHandle(ref, () => ({
    submit: () => {
      form.handleSubmit(handleSubmit)();
    },
  }));

  return (
    <div>
      <Form {...form}>
        <form className="space-y-4">
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Country*{" "}
                  <span className="text-xs text-muted-foreground">
                    (you can also type the name of the country)
                  </span>
                </FormLabel>
                <Select
                  // onValueChange={(field) => handleCountryChange(field)}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Please select a country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {shippingPrice?.map((country) => (
                      <SelectItem value={country.name} key={country.name}>
                        <div className="flex items-center gap-2">
                          <Image
                            alt="flag"
                            src={`/images/icons/${country.code.toLowerCase()}.svg`}
                            width={20}
                            height={20}
                          />
                          {country.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Country to deliver too </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email*</FormLabel>
                <FormControl>
                  <Input placeholder="johndoe@gmail.com" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>FullName*</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address*</FormLabel>
                <FormControl>
                  <Input placeholder="822 E. 20th Street" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal code*</FormLabel>
                  <FormControl>
                    <Input placeholder="2653" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Los angeles hills" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Phone{" "}
                  <span className="text-xs text-muted-foreground">
                    optional
                  </span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="5556166" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default CheckoutForm;
