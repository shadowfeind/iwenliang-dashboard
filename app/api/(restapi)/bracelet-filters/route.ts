import connectDB from "@/config/db/connect";
import Category from "@/features/categories/category.model";
import Color from "@/features/colors/color.model";
import Material from "@/features/materials/material.model";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  try {
    const colors = Color.find().sort({ createdAt: -1 }).lean();
    const materials = Material.find().sort({ createdAt: -1 }).lean();
    const categories = Category.find().sort({ createdAt: -1 }).lean();

    const [colorData, materialData, categoryData] = await Promise.all([
      colors,
      materials,
      categories,
    ]);

    return NextResponse.json(
      { success: true, colorData, materialData, categoryData },
      { status: 200 }
    );
  } catch (error) {
    console.log("/api/color/get", error);
    return NextResponse.json(
      { success: false, error: "Invetnal Server Error" },
      { status: 500 }
    );
  }
}
