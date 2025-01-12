import { getAllShippingPrice } from "@/features/shipping-price/shippingPrice.query";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await getAllShippingPrice();
  if ("error" in data) {
    return NextResponse.json(
      { success: false, error: data.error },
      { status: 500 }
    );
  }
  return NextResponse.json({ success: true, data }, { status: 200 });
}
