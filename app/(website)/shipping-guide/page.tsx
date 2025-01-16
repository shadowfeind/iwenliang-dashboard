import BreadCrumbsComponent from "@/components/layout/BreadCrumsComponent";
import Container from "@/components/website/Container";
import StaticContentContainer from "@/components/website/StaticContentContainer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const breadcrumbs = [{ title: "Home", link: "/" }, { title: "Shipping Guide" }];

const page = () => {
  return (
    <>
      <Container style="p-3">
        <BreadCrumbsComponent items={breadcrumbs} />
      </Container>
      <StaticContentContainer>
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Shipping Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="worldwide-shipping">
                <AccordionTrigger>Worldwide Shipping</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>We ship our products worldwide.</li>
                    <li>Shipping costs are borne by the buyer.</li>
                    <li>
                      We offer a 30-day returns policy on all our products.
                    </li>
                    <li>
                      For returns, products must be in their original condition
                      with labels and box packaging intact.
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="custom-orders">
                <AccordionTrigger>Custom Orders</AccordionTrigger>
                <AccordionContent>
                  <p>For custom-made bracelets:</p>
                  <ul className="list-disc pl-5">
                    <li>
                      Additional 3-4 business days are required if you've
                      provided your wrist-size measurement.
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="shipping-method">
                <AccordionTrigger>Shipping Method</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>We use FedEx International Priority Shipping.</li>
                    <li>Estimated delivery time: 1 to 5 business days.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="international-orders">
                <AccordionTrigger>
                  International Orders and Customs
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      Your order may be subject to VAT, import duties, and/or
                      taxes.
                    </li>
                    <li>
                      Due to the complexity of international laws, these fees
                      are not included in your order total.
                    </li>
                    <li>
                      You are responsible for any local customs and duties on
                      your order.
                    </li>
                    <li>
                      We are legally required to disclose the full value of the
                      package contents and cannot alter this value.
                    </li>
                    <li>
                      If an order is refused, you are responsible for:
                      <ul className="list-circle pl-5 mt-2">
                        <li>Shipping expenses</li>
                        <li>
                          Any additional duties, fees, customs, or taxes
                          incurred in shipping
                        </li>
                      </ul>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="shipping-disclaimer">
                <AccordionTrigger>Shipping Disclaimer</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      While we trust FedEx for our shipping needs, we cannot
                      guarantee their performance as it is beyond our control.
                    </li>
                    <li>
                      We do not provide shipment of our products to APO/FPO/DPO
                      addresses.
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-2">Questions?</h2>
              <p>
                If you have any questions about our shipping policies, please
                don't hesitate to contact our customer service team.
              </p>
            </div>
          </CardContent>
        </Card>
      </StaticContentContainer>
    </>
  );
};

export default page;
