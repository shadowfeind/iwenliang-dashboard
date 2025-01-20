import { CartType } from "@/config/store/useCartSlice";
import { IOrderItem } from "@/features/orders/order.model";

import Image from "next/image";
import React from "react";

type Props = {
  cart: CartType | IOrderItem;
};

const CheckoutCart = ({ cart }: Props) => {
  const isCartType = (cart: CartType | IOrderItem): cart is CartType => {
    return "product" in cart && typeof cart.product === "object";
  };

  const getDisplayValues = () => {
    if (isCartType(cart)) {
      return {
        name: cart.product.name,
        image: cart.product.images[0],
        price: cart.product.price * cart.quantity,
        wristSize: cart.wristSize,
        quantity: cart.quantity,
      };
    }
    return {
      name: cart.name,
      image: cart.image,
      price: cart.price * cart.quantity,
      wristSize: cart.wristSize,
      quantity: cart.quantity,
    };
  };

  const { name, image, price, quantity, wristSize } = getDisplayValues();

  return (
    <div className="w-full p-4 border-b border-gray-200 last:border-b-0">
      <div className="flex justify-between items-center gap-4">
        <div className="flex flex-col items-center space-y-2">
          <div className="relative w-[120px] h-[120px]">
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover rounded-md"
              sizes="120px"
            />
          </div>
          <p className="text-sm text-center line-clamp-2">{name}</p>
          {wristSize && (
            <p className="text-sm text-center line-clamp-2">
              Wrist Size: <strong>{wristSize}</strong>
            </p>
          )}
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm px-2">Qty: {quantity}</p>
          <p className="text-sm font-medium">
            USD{" "}
            {price.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCart;
