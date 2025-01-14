import { OrderType } from "@/features/orders/order.types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import CheckoutCart from "./CheckoutCart";
import { Button } from "@/components/ui/button";

type Props = {
  order: OrderType;
  detailView?: boolean;
};

const StepOne = ({ order }: Props) => {
  const showCoupon = order.coupon.discountValue > 0;
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
          </CardContent>
        </Card>
      </div>
      <div className="w-full">
        <Card>
          <CardContent>
            {order.orderItems.map((c) => (
              <CheckoutCart cart={c} key={c.name} />
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
          {order.status === "Pending" && (
            <>
              <Separator />
              <div className="flex justify-end items-center gap-4 p-4 my-2">
                <Button
                  variant="default"
                  className="bg-zinc-800 hover:bg-zinc-900 w-full"
                >
                  Pay now
                </Button>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default StepOne;
