import connectDB from "@/config/db/connect";
import User from "@/features/users/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { UserTypes } from "@/features/users/users.types";
import { authSchema } from "@/config/schemas/auth.schema";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    const validated = authSchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        { success: false, error: "Validation Error" },
        { status: 400 }
      );
    }

    const { email, password } = validated.data;

    const emailExists = await User.findOne({ email }).lean<UserTypes>();

    if (!emailExists) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.compare(password, emailExists.password);

    if (!hashedPassword) {
      return NextResponse.json(
        { success: false, error: "Credential error" },
        { status: 400 }
      );
    }

    const user = { ...emailExists, password: "" };

    return NextResponse.json({ data: user }, { status: 200 });
  } catch (error) {
    // console.error("Error creating user:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
