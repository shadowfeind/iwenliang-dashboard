import BreadCrumbsComponent from "@/components/layout/BreadCrumsComponent";
import Container from "@/components/website/Container";
import StaticContentContainer from "@/components/website/StaticContentContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

const breadcrumbs = [{ title: "Home", link: "/" }, { title: "Refund Policy" }];

const page = () => {
  return (
    <>
      <Container style="p-3">
        <BreadCrumbsComponent items={breadcrumbs} />
      </Container>
      <StaticContentContainer>
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Return Policy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-3">
                30-Day Money Back Guarantee
              </h2>
              <p>
                All products purchased from our site come with a 30-Day Money
                Back Guarantee, with some exceptions:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>
                  Products other than regular price items that fall under
                  special offers are not eligible for return.
                </li>
                <li>
                  The return period starts from the order date and lasts for 30
                  days.
                </li>
                <li>
                  We will accept all our products which have labels intact in
                  the box packaging.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Refund Process</h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  We will issue a full refund, less a $10 restocking fee per
                  bracelet.
                </li>
                <li>
                  Your refund will be credited to the same payment method you
                  used for the purchase.
                </li>
                <li>
                  The refund will be processed as soon as the package arrives at
                  our facility.
                </li>
              </ul>
            </section>

            <Alert>
              <InfoIcon className="h-4 w-4" />
              <AlertTitle>Important Note</AlertTitle>
              <AlertDescription>
                Items purchased with a discount or discount coupon will not be
                accepted for money back return.
              </AlertDescription>
            </Alert>

            <section>
              <h2 className="text-2xl font-semibold mb-3">Return Address</h2>
              <p>
                All return parcels should be sent back to the following address
                for replacement, exchange, or refund:
              </p>
              {/* <address className="mt-2 not-italic">
                [Your Company Name]
                <br />
                [Street Address]
                <br />
                [City, State/Province, ZIP/Postal Code]
                <br />
                [Country]
              </address> */}
            </section>
          </CardContent>
        </Card>
      </StaticContentContainer>
    </>
  );
};

export default page;
