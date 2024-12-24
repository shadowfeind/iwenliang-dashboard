import React, { Ref } from "react";
import CheckoutForm, { SubmitRef } from "./CheckoutForm";
import { Card, CardContent } from "@/components/ui/card";
import CheckoutCart from "./CheckoutCart";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { ShippingSchemaType } from "@/features/orders/order.schema";
import { CartType } from "@/config/store/useCartSlice";
import { useRouter } from "next/navigation";

type Props = {
  formRef: Ref<SubmitRef>;
  handleFormSubmit: (values: ShippingSchemaType) => void;
  handleShippingPrice: (price: number) => void;
  cart: CartType[];
  handleProceedToPayment: () => void;
  isPending: boolean;
};

const StepZero = ({
  formRef,
  handleFormSubmit,
  handleShippingPrice,
  cart,
  handleProceedToPayment,
  isPending,
}: Props) => {
  const router = useRouter();
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-2/4">
        <CheckoutForm
          ref={formRef}
          onSubmitForm={handleFormSubmit}
          handleShippingPrice={handleShippingPrice}
        />
      </div>
      <div className="w-full lg:w-2/4">
        <Card>
          <CardContent>
            {cart.map((c) => (
              <CheckoutCart cart={c} key={c.product._id} />
            ))}
          </CardContent>
          <Separator />
          <div className="mt-2 space-y-4 p-4">
            <div className="flex justify-end items-baseline gap-2">
              <span className="text-lg font-medium">Total:</span>
              <span className="text-md font-semibold">
                USD{" "}
                {cart.reduce((acc, i) => acc + i.product.price * i.quantity, 0)}
              </span>
            </div>

            <div className="flex justify-end items-center gap-4">
              <Button
                disabled={isPending}
                onClick={() => router.push("/cart")}
                variant="outline"
              >
                Back to cart
              </Button>
              <span className="text-muted-foreground">OR</span>
              <Button
                variant="default"
                onClick={handleProceedToPayment}
                className="bg-zinc-800 hover:bg-zinc-900"
                disabled={isPending}
              >
                Proceed to payment
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StepZero;
