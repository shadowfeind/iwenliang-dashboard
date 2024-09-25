import connectDB from "@/config/db/connect";
import Material from "@/models/material.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const material = await Material.findOne({
      id: params.id,
    });

    if (!material) {
      return NextResponse.json(
        { success: false, error: "Material not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: material },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching material:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
