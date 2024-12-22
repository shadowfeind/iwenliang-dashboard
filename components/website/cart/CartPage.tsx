"use client";
import { useMainStore } from "@/config/store/useMainStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

export const CartPage = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const cart = useMainStore((state) => state.cart);
  const setCartOpen = useMainStore((state) => state.setCartOpen);
  const removeCart = useMainStore((state) => state.removeCart);
  const incrementQuantity = useMainStore((state) => state.incrementQuantity);
  const decrementQuantity = useMainStore((state) => state.decrementQuantity);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (cart.length === 0) {
    return (
      <div className="h-4/5 flex justify-center items-center">
        <p> your cart is empty</p>
      </div>
    );
  }
  return (
    <>
      <h1 className="text-xl font-medium mb-6">Shopping Cart</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Item</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-center">Quantity</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cart.map((c) => (
            <TableRow key={c.product._id}>
              <TableCell>
                <Image
                  src={c.product.images[0]}
                  alt={c.product.name}
                  width={200}
                  height={200}
                  className="rounded-md"
                />
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <h3 className="font-medium">{c.product.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    High quality stones
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex justify-center items-center ">
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
              </TableCell>
              <TableCell className="text-right">
                USD {c.product.price * c.quantity}
              </TableCell>
              <TableCell>
                <button
                  onClick={() => removeCart(c.product._id)}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  remove item
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-8 space-y-4">
        <div className="flex justify-end items-baseline gap-2">
          <span className="text-lg font-medium">Total:</span>
          <span className="text-2xl font-semibold">
            USD {cart.reduce((acc, i) => acc + i.product.price * i.quantity, 0)}
          </span>
        </div>
        <p className="text-sm text-muted-foreground text-right">
          (Shipping and Taxes Excluded)
        </p>
        <div className="flex justify-end items-center gap-4">
          <Button onClick={() => router.push("/bracelets")} variant="outline">
            Continue Shopping
          </Button>
          <span className="text-muted-foreground">OR</span>
          <Button
            variant="default"
            onClick={() => router.push("/checkout")}
            className="bg-zinc-800 hover:bg-zinc-900"
          >
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </>
  );
};
