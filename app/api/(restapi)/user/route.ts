import connectDB from "@/config/db/connect";
import User from "@/features/users/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userName = searchParams.get("userName");

  if (!userName)
    return NextResponse.json(
      { success: false, error: "Username is required" },
      { status: 400 }
    );

  try {
    await connectDB();

    const user = await User.findOne({ userName }).lean();

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
