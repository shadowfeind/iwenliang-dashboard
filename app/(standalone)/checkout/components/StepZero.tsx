import React, { Ref, useRef, useState } from "react";
import CheckoutForm, { SubmitRef } from "./CheckoutForm";
import { Card, CardContent } from "@/components/ui/card";
import CheckoutCart from "./CheckoutCart";
import { Button } from "@/components/ui/button";
import { ShippingSchemaType } from "@/features/orders/order.schema";
import { CartType } from "@/config/store/useCartSlice";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { CouponType } from "@/features/coupon/coupon.schema";
import { checkCoupon } from "@/features/coupon/coupon.action";

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
  const [coupon, setCoupon] = useState<CouponType | null>(null);
  const [couponError, setCouponError] = useState("");
  const router = useRouter();
  const ref = useRef<HTMLInputElement>(null);
  const handleCouponCheck = async () => {
    const code = ref.current?.value ?? "";
    if (!code) {
      setCouponError("Coupon code is required");
      return;
    }
    const coupon = await checkCoupon(code);
    if ("error" in coupon) {
      setCouponError(coupon.error);
      setCoupon(null);
    } else {
      setCouponError("");
      setCoupon(coupon);
    }
  };

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
          <div className="flex space-x-2 p-4">
            <Input placeholder="Coupon code" ref={ref} />

            <Button
              type="button"
              variant={"secondary"}
              onClick={handleCouponCheck}
            >
              Apply Coupon
            </Button>
          </div>
          {couponError && <div className="p-4 text-red-500">{couponError}</div>}
          <Separator />
          <div className="mt-2 space-y-4 p-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Total:</span>
              <span className="text-sm font-semibold">
                USD{" "}
                {cart.reduce((acc, i) => acc + i.product.price * i.quantity, 0)}
              </span>
            </div>
            {coupon && (
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Coupon Discount:</span>
                <span className="text-sm font-semibold">
                  {coupon.discountType === "FIXED"
                    ? `- USD ${coupon.discountValue}`
                    : `${coupon.discountValue}%`}
                </span>
              </div>
            )}

            <div className="flex justify-between items-center">
              <span className="text-md font-medium">Grand Total:</span>
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
