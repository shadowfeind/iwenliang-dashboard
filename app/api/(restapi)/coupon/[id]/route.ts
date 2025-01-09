import { auth } from "@/auth";
import { allowedRoles } from "@/config/constant/allowedRoles";
import connectDB from "@/config/db/connect";
import Coupon from "@/features/coupon/coupon.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session || !allowedRoles.includes(session?.user.role)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }
  const params = await props.params;
  try {
    await connectDB();

    const coupon = await Coupon.findById(params.id).lean();

    if (!coupon) {
      return NextResponse.json(
        { success: false, error: "Coupon not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: coupon }, { status: 200 });
  } catch (error) {
    console.error("Error fetching coupon:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
