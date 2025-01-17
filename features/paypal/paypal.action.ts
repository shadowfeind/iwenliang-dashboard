"use server";

import { revalidatePath } from "next/cache";
import {
  CreatePaypalOrderSchema,
  CreatePaypalOrderSchemaType,
} from "./paypa.schema";
import { getPaypalAccessToken } from "./paypal.query";

export async function createPaypalOrder(
  data: CreatePaypalOrderSchemaType
): Promise<{ orderId: string } | { error: string }> {
  const validateFields = CreatePaypalOrderSchema.safeParse(data);
  if (!validateFields.success) return { error: "Validation Error" };
  const { items, amount } = validateFields.data;

  const accessToken = await getPaypalAccessToken();

  if ("error" in accessToken) return { error: accessToken.error };

  try {
    const body = JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount,
          items,
        },
      ],
    });

    console.log(body);
    const order = await fetch(
      `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken.access_token}`,
        },
        body,
      }
    );

    if (!order.ok) {
      return { error: "Failed to create PayPal order" };
    }

    const orderData = await order.json();
    return { orderId: orderData.id };
  } catch (error) {
    console.error("Create order error:", error);
    return { error: "something went wrong" };
  }
}

export async function captureOrder(
  paypalOrderId: string
  // orderId: string
): Promise<void | { error: string }> {
  try {
    const accessToken = await getPaypalAccessToken();

    if ("error" in accessToken) return { error: "Failed to get access token" };

    const response = await fetch(
      `${process.env.PAYPAL_BASE_URL}/v2/checkout/orders/${paypalOrderId}/capture`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken.access_token}`,
        },
      }
    );

    if (!response.ok) {
      return { error: "Failed to capture PayPal order" };
    }

    const captureData = await response.json();

    console.log({ captureData });

    //todo save order to database
    //   await saveOrderToDatabase(captureData);

    //   revalidatePath('/orders');
  } catch (error) {
    console.error("Capture order error:", error);
    return { error: "something went wrong" };
  }
}
