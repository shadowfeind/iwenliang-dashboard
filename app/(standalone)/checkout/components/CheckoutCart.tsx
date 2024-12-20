import { CartType } from "@/config/store/useCartSlice";

import Image from "next/image";
import React from "react";

type Props = {
  cart: CartType;
};

const CheckoutCart = ({ cart }: Props) => {
  return (
    <div key={cart.product._id} className="w-full p-4">
      <div className="flex justify-between items-center pb-2">
        <div>
          <Image
            src={cart.product.images[0]}
            width={120}
            height={120}
            alt={cart.product.name}
            className="rounded-md"
          />
          <p className="text-sm text-center">{cart.product.name}</p>
        </div>
        <p className="text-sm px-2">{cart.quantity} X</p>
        <p className="text-sm px-2">USD {cart.product.price * cart.quantity}</p>
      </div>
    </div>
  );
};

export default CheckoutCart;
