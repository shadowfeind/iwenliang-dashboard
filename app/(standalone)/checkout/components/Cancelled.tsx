import { CircleX } from "lucide-react";

import BigButton from "@/components/BigButton";

const Cancelled = () => {
  return (
    <div className="bg-white rounded-lg shadow-2xl w-full max-w-3xl mx-auto overflow-hidden">
      <div className="bg-gradient-to-r from-red-800 to-red-600 p-6 text-white">
        <div className="flex items-center justify-center mb-4">
          <CircleX className="h-16 w-16" />
        </div>
        <h1 className="text-3xl font-bold text-center">Cancelled!</h1>
        <p className="text-center mt-2 text-purple-100">
          Your order has been cancelled.
        </p>
      </div>

      <div className="p-6 space-y-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-900 text-center">
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

export default Cancelled;
