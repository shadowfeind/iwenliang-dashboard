import { ProductType } from "@/features/products/product.types";

export type CartType = {
  product: ProductType;
  quantity: number;
  wristSize: string;
};

export type CreateCartSliceType = {
  cartOpen: boolean;
  setCartOpen: (cartOpen: boolean) => void;
  cart: CartType[];
  addCart: (cart: CartType) => void;
  removeCart: (id: string) => void;
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
};

export const createCartSlice = (set: any): CreateCartSliceType => {
  const savedCart = localStorage.getItem("cart");
  const initialCart = savedCart ? JSON.parse(savedCart) : [];

  return {
    cartOpen: false,
    setCartOpen: (cartOpen: boolean) => set({ cartOpen }),
    cart: initialCart,
    addCart: (cart: CartType) =>
      set((state: any) => {
        const updatedCart = [...state.cart, cart];
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return { cart: updatedCart };
      }),
    removeCart: (id: string) =>
      set((state: any) => {
        const updatedCart = state.cart.filter(
          (c: CartType) => c.product._id !== id
        );
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return { cart: updatedCart };
      }),
    incrementQuantity: (id: string) =>
      set((state: any) => {
        const updatedCart = state.cart.map((c: CartType) => {
          if (c.product._id === id) {
            if (c.product.stock < c.quantity + 1) {
              return c;
            }
            return { ...c, quantity: c.quantity + 1 };
          }
          return c;
        });
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return { cart: updatedCart };
      }),
    decrementQuantity: (id: string) =>
      set((state: any) => {
        const updatedCart = state.cart.map((c: CartType) => {
          if (c.product._id === id) {
            if (c.quantity - 1 < 1) {
              return c;
            }
            return { ...c, quantity: c.quantity - 1 };
          }
          return c;
        });
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return { cart: updatedCart };
      }),
  };
};