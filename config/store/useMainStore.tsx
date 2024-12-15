import { create } from "zustand";
import { createSidebarSlice, CreateSidebarSliceType } from "./sidebarSlice";
import { CreateIsMobilerSliceType, createIsMobileSlice } from "./isMobileSlice";
import { createCartSlice, CreateCartSliceType } from "./useCartSlice";

type MainStore = CreateSidebarSliceType &
  CreateIsMobilerSliceType &
  CreateCartSliceType;

export const useMainStore = create<MainStore>((set) => ({
  ...createSidebarSlice(set),
  ...createIsMobileSlice(set),
  ...createCartSlice(set),
}));
