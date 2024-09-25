import connectDB from "@/config/db/connect";
import Material from "@/models/material.model";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  try {
    const materials = await Material.find().sort({ createdAt: -1 }).lean();

    return NextResponse.json(
      { success: true, data: materials },
      { status: 200 }
    );
  } catch (error) {
    console.log("/api/material/get", error);
    return NextResponse.json(
      { success: false, error: "Invetnal Server Error" },
      { status: 500 }
    );
  }
}
