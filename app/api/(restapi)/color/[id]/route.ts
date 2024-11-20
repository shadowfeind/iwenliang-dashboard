import connectDB from "@/config/db/connect";
import Color from "@/features/colors/color.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  try {
    await connectDB();

    const color = await Color.findOne({
      id: params.id,
    });

    if (!color) {
      return NextResponse.json(
        { success: false, error: "Color not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: color }, { status: 200 });
  } catch (error) {
    console.error("Error fetching color:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
