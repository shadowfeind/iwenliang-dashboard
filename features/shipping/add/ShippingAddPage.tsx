"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import AddForm from "./AddForm";

const ShippingAddPage = () => {
  const searchParams = useSearchParams();
  const customerId = searchParams.get("customerId");
  const orderId = searchParams.get("orderId");
  console.log(customerId, orderId);

  if (!customerId || !orderId)
    return (
      <Link href={"/dashboard/shipping"}>
        <Button className="mt-4">No data. Go back</Button>
      </Link>
    );
  return <AddForm customerId={customerId} orderId={orderId} />;
};

export default ShippingAddPage;
