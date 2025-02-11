import BreadCrumbsComponent from "@/components/layout/BreadCrumsComponent";
import MainContainer from "@/components/layout/MainContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CUSTOMER_SHIPPING_ROUTE } from "@/config/constant/routes";
import { getShippingByCustomerId } from "@/features/shipping/shipping.query";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  params: Promise<{ id: string }>;
};

type InfoItemProps = {
  label: string;
  value: React.ReactNode;
  className?: string;
};

const breadcrumbs = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "My Shipping", link: CUSTOMER_SHIPPING_ROUTE },
  { title: "Shipping Details" },
];

function InfoItem({ label, value, className = "" }: InfoItemProps) {
  return (
    <div className={`${className}`}>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="mt-1 text-sm text-gray-900">{value}</p>
    </div>
  );
}

const page = async (props: Props) => {
  const { id } = await props.params;

  const data = await getShippingByCustomerId(id);

  if ("error" in data) {
    return <h1 className="text-red-600">{data.error}</h1>;
  }

  return (
    <MainContainer>
      <BreadCrumbsComponent items={breadcrumbs} />
      <h1 className="text-2xl font-bold mb-4">Order Dispatch Information</h1>
      <Card>
        <CardHeader>
          <CardTitle>Dispatch Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <InfoItem label="Dispatched To" value={data.dispatchedTo} />
            <InfoItem
              label="Dispatched By"
              value={data.dispatchedBy || "Not assigned"}
            />
            <InfoItem
              label="Dispatched Date"
              value={data.dispatchedDate || "Not dispatched"}
            />
            <InfoItem
              label="Estimated Arrival"
              value={data.arrivalDate || "Not available"}
            />
            <InfoItem
              label="Tracking Number"
              value={data.trackingNo || "Not available"}
            />
            <InfoItem
              label="Tracking Link"
              value={
                data.link ? (
                  <Link
                    href={data.link}
                    className="text-blue-500 hover:underline flex items-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Track Package <ExternalLink className="ml-1 h-4 w-4" />
                  </Link>
                ) : (
                  "Not available"
                )
              }
            />
            <InfoItem
              label="Remarks"
              value={data.remarks || "No remarks"}
              className="col-span-2"
            />
          </div>
        </CardContent>
      </Card>
    </MainContainer>
  );
};

export default page;
