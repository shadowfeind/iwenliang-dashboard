import connectDB from "@/config/db/connect";
import Product from "@/models/product.model";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const products = await Product.find({ isActive: true })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(
      { success: true, data: products },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { sccess: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
