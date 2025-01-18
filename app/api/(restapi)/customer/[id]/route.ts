import { auth } from "@/auth";
import { allowedRoles } from "@/config/constant/allowedRoles";
import User from "@/features/users/user.model";
import { UserTypes } from "@/features/users/users.types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  props: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const params = await props.params;
    const { id } = params;
    const session = await auth();

    if (!session)
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );

    const customer = await User.findById<UserTypes>(id).lean();

    if (!customer) {
      return NextResponse.json(
        { success: false, error: "Customer not found" },
        { status: 404 }
      );
    }

    if (customer.role !== "Customer") {
      return NextResponse.json(
        { success: false, error: "Customer not found" },
        { status: 404 }
      );
    }

    if (allowedRoles.includes(session?.user.role)) {
      return NextResponse.json(
        { success: true, data: customer },
        { status: 200 }
      );
    } else if (session?.user._id.toString() === customer._id?.toString()) {
      return NextResponse.json(
        { success: true, data: customer },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }
}
