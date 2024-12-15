import connectDB from "@/config/db/connect";
import BeadSize from "@/features/beadSize/beadSize.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ id: string }> }
) {
  const params = await props.params;
  console.log(params);
  try {
    await connectDB();

    const beadSize = await BeadSize.findById(params.id).lean();

    if (!beadSize) {
      return NextResponse.json(
        { success: false, error: "BeadSize not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: beadSize },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching beadSize:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
