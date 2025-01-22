import connectDB from "@/config/db/connect";
import PromoHeader from "@/features/promo-header/promoHeader.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;

  try {
    await connectDB();

    const promoHeader = await PromoHeader.findById(params.id).lean();

    if (!promoHeader) {
      return NextResponse.json(
        { success: false, error: "PromoHeader not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: promoHeader },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching promoHeader:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
