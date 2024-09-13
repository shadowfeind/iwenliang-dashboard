import connectDB from "@/config/db/connect";
import { CategoryType } from "@/config/types/category.types";
import Category from "@/models/category.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const categories: CategoryType[] = await Category.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      { success: true, data: categories },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
