export type CreateIsMobilerSliceType = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const createIsMobileSlice = (
  set: (
    fn: (state: CreateIsMobilerSliceType) => Partial<CreateIsMobilerSliceType>
  ) => void
): CreateIsMobilerSliceType => ({
  isOpen: false,
  onOpen: () => set((state) => ({ ...state, isOpen: true })),
  onClose: () => set((state) => ({ ...state, isOpen: false })),
});
