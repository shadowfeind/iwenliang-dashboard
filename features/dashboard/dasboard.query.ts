import { auth } from "@/auth";
import { allowedRoles } from "@/config/constant/allowedRoles";
import User from "../users/user.model";
import Order from "../orders/order.model";
import Product from "../products/product.model";

export const getDashboardData = async (): Promise<
  | {
      totalSales: number;
      totalOrders: number;
      totalProducts: number;
      totalCustomers: number;
    }
  | { error: string }
> => {
  const session = await auth();
  if (!session || !allowedRoles.includes(session?.user.role))
    return { error: "Unauthorized" };

  const customerCount = User.countDocuments({ role: "customer" });
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

  return {
    totalSales: totalSales[0]?.totalOrderPrice || 0,
    totalOrders,
    totalProducts,
    totalCustomers,
  };
};
