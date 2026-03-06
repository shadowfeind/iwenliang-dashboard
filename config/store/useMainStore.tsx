import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createSidebarSlice, CreateSidebarSliceType } from "./sidebarSlice";
import { CreateIsMobilerSliceType, createIsMobileSlice } from "./isMobileSlice";
import { createCartSlice, CreateCartSliceType } from "./useCartSlice";
import { thankyouSlice, ThankyouSliceType } from "./thankyouSlice";

type MainStore = CreateSidebarSliceType &
  CreateIsMobilerSliceType &
  CreateCartSliceType &
  ThankyouSliceType;

export const useMainStore = create<MainStore>()(
  persist(
    (set) => ({
      ...createSidebarSlice(set),
      ...createIsMobileSlice(set),
      ...createCartSlice(set),
      ...thankyouSlice(set),
    }),
    {
      name: "main-store",
      partialize: (state) => ({ cart: state.cart }),
    }
  )
);
