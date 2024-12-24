import { OrderType } from "@/features/orders/order.types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import CheckoutCart from "./CheckoutCart";
import { Button } from "@/components/ui/button";

type Props = {
  order: OrderType;
};

const StepOne = ({ order }: Props) => {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-2/4">
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Shipping Details</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid gap-4 text-sm">
              <div className="grid grid-cols-[120px_1fr] items-center">
                <dt className="font-medium text-muted-foreground">Country</dt>
                <dd>{order.shippingAddress.country}</dd>
              </div>
              <div className="grid grid-cols-[120px_1fr] items-center">
                <dt className="font-medium text-muted-foreground">Email</dt>
                <dd>{order.shippingAddress.email}</dd>
              </div>
              <div className="grid grid-cols-[120px_1fr] items-center">
                <dt className="font-medium text-muted-foreground">Full Name</dt>
                <dd>{order.shippingAddress.fullName}</dd>
              </div>
              <div className="grid grid-cols-[120px_1fr] items-center">
                <dt className="font-medium text-muted-foreground">Address</dt>
                <dd>{order.shippingAddress.address}</dd>
              </div>
              <div className="grid grid-cols-[120px_1fr] items-center">
                <dt className="font-medium text-muted-foreground">
                  Postal Code
                </dt>
                <dd>{order.shippingAddress.postalCode}</dd>
              </div>
              <div className="grid grid-cols-[120px_1fr] items-center">
                <dt className="font-medium text-muted-foreground">City</dt>
                <dd>{order.shippingAddress.city}</dd>
              </div>
              {order.shippingAddress.phone && (
                <div className="grid grid-cols-[120px_1fr] items-center">
                  <dt className="font-medium text-muted-foreground">Phone</dt>
                  <dd>{order.shippingAddress.phone}</dd>
                </div>
              )}
            </dl>
          </CardContent>
        </Card>
      </div>
      <div className="w-full lg:w-2/4">
        <Card>
          <CardContent>
            {order.orderItems.map((c) => (
              <CheckoutCart cart={c} key={c.name} />
            ))}
          </CardContent>
          <Separator />
          <div className="mt-2 space-y-4 p-4">
            <div className="flex justify-end items-baseline gap-2">
              <span className="text-lg font-medium">Total:</span>
              <span className="text-md font-semibold">
                USD{" "}
                {order.orderItems.reduce(
                  (acc, i) => acc + i.price * i.quantity,
                  0
                )}
              </span>
            </div>

            <div className="flex justify-end items-center gap-4">
              <Button
                variant="default"
                className="bg-zinc-800 hover:bg-zinc-900"
              >
                Paypal
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StepOne;
