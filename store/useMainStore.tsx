import { create } from "zustand";
import { createSidebarSlice, CreateSidebarSliceType } from "./sidebarSlice";
import { CreateIsMobilerSliceType, createIsMobileSlice } from "./isMobileSlice";

type MainStore = CreateSidebarSliceType & CreateIsMobilerSliceType;

export const useMainStore = create<MainStore>((set) => ({
  ...createSidebarSlice(set),
  ...createIsMobileSlice(set),
}));
