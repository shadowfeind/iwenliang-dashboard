import connectDB from "@/config/db/connect";
import BeadSize from "@/features/beadSize/beadSize.model";
import Category from "@/features/categories/category.model";
import Color from "@/features/colors/color.model";
import Material from "@/features/materials/material.model";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  try {
    const [colorData, materialData, categoryData, beadSizeData] =
      await Promise.all([
        Color.find().sort({ createdAt: -1 }).lean(),
        Material.find().sort({ createdAt: -1 }).lean(),
        Category.find().sort({ createdAt: -1 }).lean(),
        BeadSize.find().sort({ createdAt: -1 }).lean(),
      ]);

    return NextResponse.json(
      {
        success: true,
        colors: colorData,
        materials: materialData,
        categories: categoryData,
        beadSizes: beadSizeData,
      },
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
