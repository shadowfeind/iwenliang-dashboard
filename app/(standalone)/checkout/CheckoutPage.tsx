"use client";

import { useEffect, useState } from "react";
import { Stepper, Step } from "./components/Stepper";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useMainStore } from "@/config/store/useMainStore";
import CheckoutCart from "./components/CheckoutCart";
import CheckoutForm from "./components/CheckoutForm";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";

const steps: Step[] = [
  { id: "shipping", name: "Shipping" },
  { id: "payment", name: "Payment" },
  { id: "confirmation", name: "Confirmation" },
];

const CheckoutPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [mounted, setMounted] = useState(false);
  const cart = useMainStore((state) => state.cart);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="container mx-auto py-10">
      <Stepper steps={steps} currentStep={currentStep} className="mb-4" />
      <Separator className="my-8 md:my-12" />
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/4">
          <CheckoutForm />
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
                  onClick={() => router.push("/checkout")}
                  className="bg-zinc-800 hover:bg-zinc-900"
                >
                  Place order
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
