export type ThankyouSliceType = {
  thankyouData: {
    orderId: string;
    total: number;
    estimatedDelivery: string;
  };
  setThankyouData: (data: {
    orderId: string;
    total: number;
    estimatedDelivery: string;
  }) => void;
};

export const thankyouSlice = (set: any): ThankyouSliceType => ({
  thankyouData: {
    orderId: "",
    total: 0,
    estimatedDelivery: "",
  },
  setThankyouData: (data: {
    orderId: string;
    total: number;
    estimatedDelivery: string;
  }) => set(() => ({ thankyouData: data })),
});
