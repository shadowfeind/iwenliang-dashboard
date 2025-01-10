import {
  Coupon,
  GlobalDiscount,
  IOrderItem,
  IShippingAddress,
  OrderStatus,
} from "./order.model";

export type OrderType = {
  _id: string;
  orderItems: IOrderItem[];
  shippingAddress: IShippingAddress;
  paymentMethod: string;
  itemsPrice: number;
  coupon: Coupon;
  globalDiscount: GlobalDiscount;
  shippingPrice?: number;
  taxPrice?: number;
  totalPrice: number;
  user: string;
  status: OrderStatus;
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
};
