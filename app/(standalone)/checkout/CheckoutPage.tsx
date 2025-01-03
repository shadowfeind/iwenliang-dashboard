"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useSession } from "next-auth/react";
import { Stepper, Step } from "./components/Stepper";
import { useMainStore } from "@/config/store/useMainStore";
import { SubmitRef } from "./components/CheckoutForm";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import {
  CreateOrderSchemaType,
  ShippingSchemaType,
} from "@/features/orders/order.schema";
import StepZero from "./components/StepZero";
import { createOrder } from "@/features/orders/order.action";
import { OrderType } from "@/features/orders/order.types";
import { ErrorComponent } from "@/components/ErrorComponent";
import StepOne from "./components/StepOne";
import { toast } from "sonner";
import Thankyou from "./components/Thankyou";
import { useQueryState, parseAsInteger } from "nuqs";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps: Step[] = [
  { id: "shipping", name: "Shipping" },
  { id: "payment", name: "Payment" },
  { id: "confirmation", name: "Confirmation" },
];

const CheckoutPage = () => {
  const [currentStep, setCurrentStep] = useQueryState(
    "currentStep",
    parseAsInteger.withDefault(0)
  );
  const [error, setError] = useState("");
  const [order, setOrder] = useState<OrderType | null>(null);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const cart = useMainStore((state) => state.cart);
  const emptyCart = useMainStore((state) => state.emptyCart);
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
  }, [session, router]);

  const handleShippingFormSubmitForStepZero = (values: ShippingSchemaType) => {
    const itemsPrice = cart.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
    const taxPrice = 0;
    const order: CreateOrderSchemaType = {
      orderItems: cart.map((item) => ({
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        image: item.product.images[0],
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

    setError("");
    startTransition(() => {
      createOrder(order).then((data) => {
        if ("error" in data) {
          setError(data.error);
        } else {
          toast("Product Ordered Successfully");
          emptyCart();
          setOrder(data);
          setCurrentStep(1);
        }
      });
    });
  };

  const handleProceedToPayment = () => {
    formRef?.current?.submit();
  };

  // doing this as we are using ref and imperative handler
  const handleShippingPrice = (price: number) => {
    setShippingPrice(price);
  };

  if (!mounted) return null;

  if (currentStep === 0 && cart.length === 0) {
    return (
      <div className="mt-20 md:mt-40 w-full flex flex-col justify-center items-center gap-y-6">
        <ShoppingCart className="size-10 md:size-20 font-semibold" />
        <p className="text-bold  "> your cart is empty</p>
        <Button onClick={() => router.push("/")}>back to home</Button>
      </div>
    );
  }

  if (currentStep === 1 && !order) {
    setCurrentStep(0);
  }

  return (
    <div className="container mx-auto py-10">
      <Stepper steps={steps} currentStep={currentStep} className="mb-4" />
      <Separator className="my-8 md:my-12" />
      <ErrorComponent message={error} />
      {currentStep === 0 && (
        <StepZero
          formRef={formRef}
          handleFormSubmit={handleShippingFormSubmitForStepZero}
          handleShippingPrice={handleShippingPrice}
          cart={cart}
          handleProceedToPayment={handleProceedToPayment}
          isPending={isPending}
        />
      )}
      {currentStep === 1 && <StepOne order={order!} />}
      {currentStep === 2 && <Thankyou />}
    </div>
  );
};

export default CheckoutPage;
