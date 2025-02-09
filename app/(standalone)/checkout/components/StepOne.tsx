"use client";

import { OrderType } from "@/features/orders/order.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import CheckoutCart from "./CheckoutCart";
import PaypalButton from "@/features/paypal/Paypal";
import { useEffect, useState } from "react";
import { UserTypes } from "@/features/users/users.types";
import CustomerFetchLoading from "./CustomerFetchLoading";
import { OrderStatus } from "@/features/orders/order.model";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

type Props = {
  order: OrderType;
  fromDashboard?: boolean;
  userId?: string;
};

const StepOne = ({ order, fromDashboard = false }: Props) => {
  const [customer, setCustomer] = useState<UserTypes | null>(null);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const isCustomer = session?.user.role === "Customer" || null;

  const showCoupon = order.coupon.discountValue > 0;

  useEffect(() => {
    if (typeof order.user === "string") {
      const fetchCustomer = async () => {
        console.log({ order: order.user });
        if (order?.user) {
          try {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_REST_URL}customer/${order.user}`
            );
            if (!response.ok) {
              setCustomer(null);
              return;
            }
            const data = await response.json();
            setCustomer(data.data);
          } catch (error) {
            console.error(error);
          } finally {
            setLoading(false);
          }
        } else {
          setLoading(false);
        }
      };

      fetchCustomer();
    } else {
      // @ts-ignore
      setCustomer(order.user as UserTypes);
    }
  }, [order?.user]);
  return (
    <div className="flex flex-col w-full lg:flex-row gap-4">
      <div className="w-full">
        <Card>
          <CardHeader>
            <CardTitle>Shipping Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 text-sm">
              <div className="grid grid-cols-2 items-center">
                <div className="font-medium text-muted-foreground">Country</div>
                <div className="text-right">
                  {order.shippingAddress.country}
                </div>
              </div>
              <div className="grid grid-cols-2 items-center">
                <div className="font-medium text-muted-foreground">Email</div>
                <div className="text-right">{order.shippingAddress.email}</div>
              </div>
              <div className="grid grid-cols-2 items-center">
                <div className="font-medium text-muted-foreground">
                  Full Name
                </div>
                <div className="text-right">
                  {order.shippingAddress.fullName}
                </div>
              </div>
              <div className="grid grid-cols-2 items-center">
                <div className="font-medium text-muted-foreground">Address</div>
                <div className="text-right">
                  {order.shippingAddress.address}
                </div>
              </div>
              <div className="grid grid-cols-2 items-center">
                <div className="font-medium text-muted-foreground">
                  Postal Code
                </div>
                <div className="text-right">
                  {order.shippingAddress.postalCode}
                </div>
              </div>
              <div className="grid grid-cols-2 items-center">
                <div className="font-medium text-muted-foreground">City</div>
                <div className="text-right">{order.shippingAddress.city}</div>
              </div>
              {order.shippingAddress.phone && (
                <div className="grid grid-cols-2 items-center">
                  <div className="font-medium text-muted-foreground">Phone</div>
                  <div className="text-right">
                    {order.shippingAddress.phone}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        <Card className="mt-4">
          <CardContent>
            <div className="flex justify-between items-center pt-5">
              <dt className="font-medium text-muted-foreground">Status</dt>
              <div className="text-right">{order.status}</div>
            </div>
            {order.paymentMethod && (
              <div className="flex justify-between items-center pt-5">
                <dt className="font-medium text-muted-foreground">
                  Payment method
                </dt>
                <div className="text-right">{order.paymentMethod}</div>
              </div>
            )}
          </CardContent>
        </Card>
        {loading && <CustomerFetchLoading />}
        {customer && (
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Customer Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center pt-5">
                <dt className="font-medium text-muted-foreground">Fullname</dt>
                <div className="text-right">{customer.fullName}</div>
              </div>
              <div className="flex justify-between items-center pt-5">
                <dt className="font-medium text-muted-foreground">Email</dt>
                <div className="text-right">{customer.email}</div>
              </div>
              <div className="flex justify-between items-center pt-5">
                <dt className="font-medium text-muted-foreground">Phone</dt>
                <div className="text-right">{customer.phone || "-"}</div>
              </div>
              <div className="flex justify-between items-center pt-5">
                <dt className="font-medium text-muted-foreground">Username</dt>
                <div className="text-right">{customer.userName || "-"}</div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      <div className="w-full">
        <Card>
          <CardContent>
            {order.orderItems.map((c, i) => (
              <CheckoutCart cart={c} key={i} />
            ))}
          </CardContent>

          <Separator />

          {showCoupon && (
            <>
              <div className="flex justify-between items-center p-4 my-2">
                <span className="text-sm font-medium">Coupon Code:</span>
                <span className="text-sm font-medium">{order.coupon.code}</span>
              </div>
              <div className="flex justify-between items-center p-4 my-2">
                <span className="text-sm font-medium">Coupon Discount:</span>
                <span className="text-sm font-medium">
                  {order.coupon.discountType === "FIXED"
                    ? `- USD ${order.coupon.discountValue}`
                    : `${order.coupon.discountValue}%`}
                </span>
              </div>
              <Separator />
            </>
          )}
          <div className="space-y-3 py-4">
            <div className="flex justify-between items-center  px-4 ">
              <span className="text-sm font-medium">Shipping:</span>
              <span className="text-sm font-medium">
                USD {order.shippingPrice}
              </span>
            </div>
            <div className="mt-2 space-y-4 px-4 ">
              <div className="flex justify-between items-center">
                <span className="text-md font-medium">Grand Total:</span>
                <span className="text-md font-semibold">
                  USD {order.totalPrice}
                </span>
              </div>
            </div>
          </div>
          {order.status === OrderStatus.Pending && !fromDashboard && (
            <>
              <Separator />
              <div className="w-full p-4">
                <PaypalButton order={order} />
              </div>
            </>
          )}

          {order.status === OrderStatus.Paid && !isCustomer && (
            <div className="flex justify-between items-center p-4 my-2">
              <Button
                onClick={() =>
                  redirect(
                    `/dashboard/shipping/add?customerId=${customer?._id}&orderId=${order._id}`
                  )
                }
                className="w-full"
              >
                Start Shipping
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default StepOne;
