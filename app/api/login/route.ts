import { authSchema } from "@/config/schemas/auth.schema";
import User from "@/features/users/user.model";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const values = await req.json();
  const validateFields = authSchema.safeParse(values);

  if (!validateFields.success) return { error: "validation error" };

  const { userName, password } = validateFields.data;

  const user = await User.findOne({ userName });

  if (!user)
    return NextResponse.json(
      { success: false, error: "Invalid Cerwentials" },
      { status: 401 }
    );

  return NextResponse.json(user, { status: 200 });
};
