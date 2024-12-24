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
import StepZero from "./components/StepZero";

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

    setCurrentStep(1);
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
      {currentStep === 0 && (
        <StepZero
          formRef={formRef}
          handleFormSubmit={handleFormSubmit}
          handleShippingPrice={handleShippingPrice}
          cart={cart}
          handleProceedToPayment={handleProceedToPayment}
        />
      )}
      {currentStep === 1 && "nicela nicela nicela"}
    </div>
  );
};

export default CheckoutPage;
