import connectDB from "@/config/db/connect";
import Color from "@/features/colors/color.model";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  try {
    const colors = await Color.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: colors }, { status: 200 });
  } catch (error) {
    console.log("/api/color/get", error);
    return NextResponse.json(
      { success: false, error: "Invetnal Server Error" },
      { status: 500 }
    );
  }
}
