import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { allowedRoles } from "@/config/constant/allowedRoles";
import User from "@/features/users/user.model";
import Order from "@/features/orders/order.model";
import Product from "@/features/products/product.model";

export async function GET() {
  try {
    const session = await auth();

    if (
      !session ||
      !session.user ||
      !allowedRoles.includes(session.user.role)
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const customerCount = User.countDocuments({ role: "Customer" });
    const saleCount = Order.aggregate([
      {
        $group: {
          _id: null,
          totalOrderPrice: { $sum: "$totalPrice" },
        },
      },
    ]);
    const productCount = Product.countDocuments({ isActive: true });
    const orderCount = Order.countDocuments({});

    const [totalCustomers, totalSales, totalProducts, totalOrders] =
      await Promise.all([customerCount, saleCount, productCount, orderCount]);

    return NextResponse.json({
      totalSales: totalSales[0]?.totalOrderPrice || 0,
      totalOrders,
      totalProducts,
      totalCustomers,
    });
  } catch (error) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
