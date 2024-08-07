export type CreateSidebarSliceType = {
  isMinimized: Boolean;
  toggle: () => void;
};

export const createSidebarSlice = (
  set: (
    fn: (state: CreateSidebarSliceType) => Partial<CreateSidebarSliceType>
  ) => void
): CreateSidebarSliceType => ({
  isMinimized: false,
  toggle: () => set((state) => ({ isMinimized: !state.isMinimized })),
});
