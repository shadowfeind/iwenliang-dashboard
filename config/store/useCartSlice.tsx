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
  emptyCart: () => void;
};

export const createCartSlice = (set: any): CreateCartSliceType => {
  return {
    cartOpen: false,
    setCartOpen: (cartOpen: boolean) => set({ cartOpen }),
    cart: [],
    addCart: (cart: CartType) =>
      set((state: any) => ({ cart: [...state.cart, cart] })),
    removeCart: (id: string) =>
      set((state: any) => ({
        cart: state.cart.filter((c: CartType) => c.product._id !== id),
      })),
    incrementQuantity: (id: string) =>
      set((state: any) => ({
        cart: state.cart.map((c: CartType) => {
          if (c.product._id === id) {
            if (c.product.stock < c.quantity + 1) {
              return c;
            }
            return { ...c, quantity: c.quantity + 1 };
          }
          return c;
        }),
      })),
    decrementQuantity: (id: string) =>
      set((state: any) => ({
        cart: state.cart.map((c: CartType) => {
          if (c.product._id === id) {
            if (c.quantity - 1 < 1) {
              return c;
            }
            return { ...c, quantity: c.quantity - 1 };
          }
          return c;
        }),
      })),
    emptyCart: () => set({ cart: [] }),
  };
};
