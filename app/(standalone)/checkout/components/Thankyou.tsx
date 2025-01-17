"use client";

import { CheckCircle, Package, Truck, CreditCard } from "lucide-react";

import BigButton from "@/components/BigButton";
import { useMainStore } from "@/config/store/useMainStore";

const Thankyou = () => {
  const thankyouData = useMainStore((state) => state.thankyouData);
  return (
    <div className="bg-white rounded-lg shadow-2xl w-full max-w-3xl mx-auto overflow-hidden">
      <div className="bg-gradient-to-r from-gray-950 to-gray-700 p-6 text-white">
        <div className="flex items-center justify-center mb-4">
          <CheckCircle className="h-16 w-16" />
        </div>
        <h1 className="text-3xl font-bold text-center">
          Thank You for Your Purchase!
        </h1>
        <p className="text-center mt-2 text-purple-100">
          Your order has been successfully placed and is being processed.
        </p>
      </div>

      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center border-b border-gray-200 pb-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              Order Summary
            </h2>
            <p className="text-gray-900">Order {thankyouData.orderId}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">
              {thankyouData.total}
            </p>
            <p className="text-sm text-gray-900">Total Amount</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <Package className="h-8 w-8 text-gray-800" />
            <div>
              <p className="font-semibold text-gray-800">Order Confirmed</p>
              <p className="text-sm text-gray-900">We've received your order</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Truck className="h-8 w-8 text-gray-800" />
            <div>
              <p className="font-semibold text-gray-800">Estimated Delivery</p>
              <p className="text-sm text-gray-900">
                {thankyouData.estimatedDelivery}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <CreditCard className="h-8 w-8 text-gray-800" />
            <div>
              <p className="font-semibold text-gray-800">Payment Successful</p>
              <p className="text-sm text-gray-900">Visa - 1234</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-900">
            We've sent a confirmation email with all the details of your order.
            If you have any questions, please don't hesitate to contact our
            customer support.
          </p>
        </div>

        <div className="flex justify-center">
          <BigButton name="Continue shopping" href="/" />
        </div>
      </div>
    </div>
  );
};

export default Thankyou;
