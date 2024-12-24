"use client";

import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { Stepper, Step } from "./components/Stepper";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useMainStore } from "@/config/store/useMainStore";
import CheckoutCart from "./components/CheckoutCart";
import CheckoutForm, { SubmitRef } from "./components/CheckoutForm";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { ShippingSchemaType } from "@/features/orders/order.schema";

const steps: Step[] = [
  { id: "shipping", name: "Shipping" },
  { id: "payment", name: "Payment" },
  { id: "confirmation", name: "Confirmation" },
];

const CheckoutPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [mounted, setMounted] = useState(false);
  const cart = useMainStore((state) => state.cart);
  const router = useRouter();
  const formRef = useRef<SubmitRef>(null);
  const { data: session } = useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!session) {
      router.push("/sign-in?redirect=/cart");
    }
  }, [session]);

  const handleFormSubmit = (values: ShippingSchemaType) => {
    const itemsPrice = cart.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
    const taxPrice = 0;
    const order = {
      orderItems: cart.map((item) => ({
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        product: item.product._id,
      })),
      shippingAddress: values,
      paymentMethod: "paypal",
      itemsPrice,
      discountPrice: 0,
      discountCode: "",
      discountPercentage: 0,
      discountType: "",
      shippingPrice: shippingPrice,
      taxPrice,
      totalPrice: itemsPrice + taxPrice + shippingPrice,
    };

    // setCurrentStep(2);
    console.log("Form values in parent:", order);
  };

  const handleProceedToPayment = () => {
    const test = formRef?.current?.submit();
    console.log("test", test);
  };

  // doing this as we are using ref and imperative handler
  const handleShippingPrice = (price: number) => {
    setShippingPrice(price);
  };

  if (!mounted) return null;

  if (cart.length === 0) {
    return (
      <div className="h-4/5 flex justify-center items-center">
        <p> your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <Stepper steps={steps} currentStep={currentStep} className="mb-4" />
      <Separator className="my-8 md:my-12" />
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
                  {cart.reduce(
                    (acc, i) => acc + i.product.price * i.quantity,
                    0
                  )}
                </span>
              </div>

              <div className="flex justify-end items-center gap-4">
                <Button onClick={() => router.push("/cart")} variant="outline">
                  Back to cart
                </Button>
                <span className="text-muted-foreground">OR</span>
                <Button
                  variant="default"
                  onClick={handleProceedToPayment}
                  className="bg-zinc-800 hover:bg-zinc-900"
                >
                  Proceed to payment
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
