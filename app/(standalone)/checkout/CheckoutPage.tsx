"use client";

import { useEffect, useRef, useState, useTransition } from "react";
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
import { CouponType } from "@/features/coupon/coupon.schema";
import Cancelled from "./components/Cancelled";

const steps: Step[] = [
  { id: "shipping", name: "Shipping" },
  { id: "payment", name: "Payment" },
  { id: "confirmation", name: "Confirmation" },
];

const CheckoutPage = ({ session }: { session: any }) => {
  const [currentStep, setCurrentStep] = useQueryState(
    "currentStep",
    parseAsInteger.withDefault(0)
  );
  const [coupon, setCoupon] = useState<CouponType | null>(null);

  const [error, setError] = useState("");
  const [order, setOrder] = useState<OrderType | null>(null);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const cart = useMainStore((state) => state.cart);
  const emptyCart = useMainStore((state) => state.emptyCart);
  const router = useRouter();
  const formRef = useRef<SubmitRef>(null);
  const thankyouData = useMainStore((state) => state.thankyouData);

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
    const couponToSet = { code: "", discountType: "", discountValue: 0 };
    if (coupon) {
      couponToSet.code = coupon.code;
      couponToSet.discountType = coupon.discountType;
      couponToSet.discountValue = coupon.discountValue;
    }

    const couponDiscount =
      couponToSet.discountType === "PERCENT"
        ? (itemsPrice * couponToSet.discountValue) / 100
        : couponToSet.discountValue;

    const globalDiscountToSet = {
      name: "",
      discountType: "",
      discountValue: 0,
    };

    const globalDiscount = 0;

    const totalPrice =
      itemsPrice + taxPrice + shippingPrice - couponDiscount - globalDiscount;

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
      coupon: couponToSet,
      globalDiscount: globalDiscountToSet,
      shippingPrice: shippingPrice,
      taxPrice,
      totalPrice: Number(totalPrice?.toFixed(2)),
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

  if (currentStep === 2 && !thankyouData.orderId) {
    setCurrentStep(0);
  }

  return (
    <div className="container mx-auto py-10">
      <Stepper steps={steps} currentStep={currentStep} className="mb-4" />
      <Separator className="my-8 md:my-12" />
      <ErrorComponent message={error} />
      {currentStep === 0 && (
        <StepZero
          coupon={coupon}
          setCoupon={setCoupon}
          formRef={formRef}
          handleFormSubmit={handleShippingFormSubmitForStepZero}
          handleShippingPrice={handleShippingPrice}
          shippingPrice={shippingPrice}
          cart={cart}
          handleProceedToPayment={handleProceedToPayment}
          isPending={isPending}
        />
      )}
      {currentStep === 1 && <StepOne order={order!} />}
      {currentStep === 2 && <Thankyou />}
      {/* {currentStep === 0 && <Cancelled />} */}
    </div>
  );
};

export default CheckoutPage;
