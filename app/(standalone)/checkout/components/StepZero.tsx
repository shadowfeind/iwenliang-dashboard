import React, {
  Dispatch,
  Ref,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import CheckoutForm, { SubmitRef } from "./CheckoutForm";
import { Card, CardContent } from "@/components/ui/card";
import CheckoutCart from "./CheckoutCart";
import { Button } from "@/components/ui/button";
import { ShippingSchemaType } from "@/features/orders/order.schema";
import { CartType } from "@/config/store/useCartSlice";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { checkCoupon } from "@/features/coupon/coupon.action";
import { CouponType } from "@/features/coupon/coupon.schema";
import ZeroStepFormLoading from "./loading/ZeroStepFormLoading";
import { GEO_LOCATION } from "@/config/constant/geoLocation";
import { ShippingPriceType } from "@/features/shipping-price/shippingPrice.schema";

type Props = {
  formRef: Ref<SubmitRef>;
  handleFormSubmit: (values: ShippingSchemaType) => void;
  handleShippingPrice: (price: number) => void;
  shippingPrice: number;
  cart: CartType[];
  handleProceedToPayment: () => void;
  isPending: boolean;
  coupon: CouponType | null;
  setCoupon: Dispatch<SetStateAction<CouponType | null>>;
};

export type GeoLocationType = {
  iso_code: string;
  dial_code: string;
};
const StepZero = ({
  formRef,
  handleFormSubmit,
  handleShippingPrice,
  shippingPrice: shipping,
  cart,
  handleProceedToPayment,
  isPending,
  coupon,
  setCoupon,
}: Props) => {
  const [couponError, setCouponError] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [shippingPrice, setShippingPrice] = useState<
    ShippingPriceType[] | null
  >(null);
  const [geoLocation, setGeoLocation] = useState<GeoLocationType>({
    iso_code: "",
    dial_code: "",
  });
  const router = useRouter();
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTotal(cart.reduce((acc, i) => acc + i.product.price * i.quantity, 0));
  }, [cart]);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const [shippingPriceResponse, geoLocationResponse] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_REST_URL}shipping-price`, {
            method: "GET",
            credentials: "include",
          }),
          fetch(GEO_LOCATION),
        ]);

        if (!shippingPriceResponse.ok || !geoLocationResponse.ok) {
          throw new Error("One or more API requests failed");
        }

        const [shippingPriceData, geoLocationData] = await Promise.all([
          shippingPriceResponse.json(),
          geoLocationResponse.json(),
        ]);

        if (isMounted) {
          setShippingPrice(shippingPriceData.data);
          setGeoLocation({
            iso_code: geoLocationData.country.iso_code,
            dial_code: geoLocationData.country.phone_code,
          });
        }
      } catch (error) {
        if (isMounted) {
          setError("An error occurred");
        }
        console.error("Error fetching data:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleCouponCheck = async () => {
    const code = ref.current?.value ?? "";
    if (!code) {
      setCouponError("Coupon code is required");
      return;
    }
    const coupon = await checkCoupon(code);
    if ("error" in coupon) {
      setCouponError(coupon.error);
      setCoupon(null);
    } else {
      setCouponError("");
      setCoupon(coupon);
      const total = cart.reduce(
        (acc, i) => acc + i.product.price * i.quantity,
        0
      );
      setTotal((prev) => {
        if (coupon.discountType === "FIXED") {
          return total - coupon.discountValue;
        } else {
          return Number(
            (total - (total * coupon.discountValue) / 100).toFixed(2)
          );
        }
      });
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-2/4">
        {loading ? (
          <ZeroStepFormLoading />
        ) : (
          <CheckoutForm
            ref={formRef}
            onSubmitForm={handleFormSubmit}
            handleShippingPrice={handleShippingPrice}
            shippingPrice={shippingPrice}
            geoLocation={geoLocation}
          />
        )}
      </div>
      <div className="w-full lg:w-2/4">
        <Card>
          <CardContent>
            {cart.map((c) => (
              <CheckoutCart cart={c} key={c.product._id} />
            ))}
          </CardContent>
          <Separator />
          <div className="flex space-x-2 p-4">
            <Input placeholder="Coupon code" ref={ref} />

            <Button
              type="button"
              variant={"secondary"}
              onClick={handleCouponCheck}
            >
              Apply Coupon
            </Button>
          </div>
          {couponError && <div className="p-4 text-red-500">{couponError}</div>}
          <Separator />
          <div className="mt-2 space-y-4 p-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Total:</span>
              <span className="text-sm font-semibold">
                USD{" "}
                {cart.reduce((acc, i) => acc + i.product.price * i.quantity, 0)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Shipping:</span>
              <span className="text-sm font-medium">USD {shipping}</span>
            </div>
            {coupon && (
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Coupon Discount:</span>
                <span className="text-sm font-semibold">
                  {coupon.discountType === "FIXED"
                    ? `- USD ${coupon.discountValue}`
                    : `${coupon.discountValue}%`}
                </span>
              </div>
            )}

            <div className="flex justify-between items-center">
              <span className="text-md font-medium">Grand Total:</span>
              <span className="text-md font-semibold">
                USD {total + shipping}
              </span>
            </div>

            <div className="flex justify-end items-center gap-4">
              <Button
                disabled={isPending}
                onClick={() => router.push("/cart")}
                variant="outline"
              >
                Back to cart
              </Button>
              <span className="text-muted-foreground">OR</span>
              <Button
                variant="default"
                onClick={handleProceedToPayment}
                className="bg-zinc-800 hover:bg-zinc-900"
                disabled={isPending}
              >
                Proceed to payment
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StepZero;
