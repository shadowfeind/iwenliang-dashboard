"use client";

// @ts-ignore
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { PayPalScriptOptions } from "@paypal/paypal-js/types/script-options";
import { OrderType } from "../orders/order.types";
import { captureOrder, createPaypalOrder } from "./paypal.action";
import { CreatePaypalOrderSchemaType } from "./paypa.schema";
import { useState, useTransition } from "react";
import { ErrorComponent } from "@/components/ErrorComponent";
import { Loader2 } from "lucide-react";
import { useMainStore } from "@/config/store/useMainStore";
import { redirect } from "next/navigation";

type Props = {
  order: OrderType;
};

type PayPalApproveData = {
  orderID: string;
  payerID: string;
  subscriptionID?: string;
  facilitatorAccessToken?: string;
};

const initialOptions: PayPalScriptOptions = {
  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
  currency: "USD",
  intent: "capture",
  disableFunding: ["credit", "paylater"],
};

const Paypal = ({ order }: Props) => {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [orderStatus, setOrderStatus] = useState("");
  const setThankyouData = useMainStore((state) => state.setThankyouData);

  const handleCreateOrder = async (value: OrderType) => {
    setError(null);
    const items = value.orderItems.map((item) => ({
      name: item.name,
      quantity: item.quantity?.toString(),
      image: item.image,
      unit_amount: {
        currency_code: "USD",
        value: item.price?.toFixed(2),
      },
    }));

    const breakdown = {
      item_total: {
        currency_code: "USD",
        value: value.itemsPrice?.toFixed(2),
      },
      shipping: {
        currency_code: "USD",
        value: value.shippingPrice ? value.shippingPrice.toFixed(2) : "0.00",
      },
      discount: {
        currency_code: "USD",
        value: value.coupon.discountValue?.toFixed(2),
      },
    };

    const amount = {
      currency_code: "USD",
      value: value.totalPrice?.toFixed(2),
      breakdown,
    };

    const values: CreatePaypalOrderSchemaType = {
      items,
      amount,
    };

    const order = await createPaypalOrder(values);
    if ("error" in order) {
      setError(order.error);
      return;
    }
    return order.orderId;
  };

  const handleApprove = (data: PayPalApproveData) => {
    setOrderStatus("processing");

    startTransition(async () => {
      const result = await captureOrder(data.orderID, order._id);
      if (result?.error) {
        setError(result.error);
        return;
      }
      setOrderStatus("success");
      setThankyouData({
        orderId: order._id,
        total: order.totalPrice,
        estimatedDelivery: "with in a week",
      });
      redirect("/checkout?currentStep=2");
    });
  };
  return (
    <PayPalScriptProvider options={initialOptions}>
      {error && (
        <div className="p-2">
          <ErrorComponent message={error} />
        </div>
      )}
      {orderStatus === "processing" ? (
        <div className="flex items-center justify-center">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
          Processing Payment
        </div>
      ) : (
        <PayPalButtons
          createOrder={() => handleCreateOrder(order)}
          onApprove={handleApprove}
          style={{ layout: "vertical" }}
          disabled={isPending}
        />
      )}
    </PayPalScriptProvider>
  );
};

export default Paypal;
