import { IOrderItem, IShippingAddress, OrderStatus } from "./order.model";

export type OrderType = {
  _id: string;
  orderItems: IOrderItem[];
  shippingAddress: IShippingAddress;
  paymentMethod: string;
  itemsPrice: number;
  discountPrice?: number;
  discountCode?: string;
  discountPercentage?: number;
  shippingPrice?: number;
  discountType?: string;
  taxPrice?: number;
  totalPrice: number;
  user: string;
  status: OrderStatus;
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
};
