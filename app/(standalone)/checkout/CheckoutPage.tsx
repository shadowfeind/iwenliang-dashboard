"use client";

import { useState } from "react";
import { Stepper, Step } from "./components/Stepper";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useMainStore } from "@/config/store/useMainStore";
import CheckoutCart from "./components/CheckoutCart";
import CheckoutForm from "./components/CheckoutForm";

const steps: Step[] = [
  { id: "shipping", name: "Shipping" },
  { id: "payment", name: "Payment" },
  { id: "confirmation", name: "Confirmation" },
];

const CheckoutPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const cart = useMainStore((state) => state.cart);

  return (
    <div className="container mx-auto py-10">
      <Stepper steps={steps} currentStep={currentStep} className="mb-4" />
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
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
