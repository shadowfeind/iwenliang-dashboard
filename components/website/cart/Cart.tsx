"use client";
import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useMainStore } from "@/config/store/useMainStore";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const Cart = () => {
  const router = useRouter();
  const cart = useMainStore((state) => state.cart);
  const cartOpen = useMainStore((state) => state.cartOpen);
  const setCartOpen = useMainStore((state) => state.setCartOpen);
  const removeCart = useMainStore((state) => state.removeCart);
  const incrementQuantity = useMainStore((state) => state.incrementQuantity);
  const decrementQuantity = useMainStore((state) => state.decrementQuantity);
  const handleCart = () => {
    setCartOpen(false);
    router.push("/checkout");
  };

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetTrigger asChild>
        <ShoppingCart className="size-5 font-semibold" />
      </SheetTrigger>
      <SheetContent className="p-0 overflow-scroll">
        <SheetHeader className="p-3">
          <SheetTitle>Cart</SheetTitle>
        </SheetHeader>
        <Separator />

        {cart.length === 0 ? (
          <div className="h-4/5 flex justify-center items-center">
            <p> your cart is empty</p>
          </div>
        ) : (
          <div className="p-3 relative h-5/6 overflow-y-auto ">
            {cart.map((c) => (
              <div key={c.product._id} className="">
                <div className="flex justify-between items-center pb-2">
                  <div className="flex items-center gap-2">
                    <div>
                      <Image
                        src={c.product.images[0]}
                        width={120}
                        height={120}
                        alt={c.product.name}
                        className="rounded-md"
                      />
                      <p className="text-sm px-2">{c.product.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant={"ghost"}
                      size={"sm"}
                      onClick={() => decrementQuantity(c.product._id)}
                    >
                      -
                    </Button>
                    <p>{c.quantity}</p>
                    <Button
                      variant={"ghost"}
                      size={"sm"}
                      onClick={() => incrementQuantity(c.product._id)}
                    >
                      +
                    </Button>
                  </div>
                  <p className="text-sm">USD {c.quantity * c.product.price}</p>
                  <button onClick={() => removeCart(c.product._id)}>X</button>
                </div>
                <Separator />
              </div>
            ))}
          </div>
        )}
        {cart.length > 0 && (
          <SheetFooter className="absolute bottom-0 w-full p-3 border-t-2">
            <Button className="w-full" onClick={handleCart}>
              Checkout
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};
