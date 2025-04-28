"use client";
import BreadCrumbsComponent from "@/components/layout/BreadCrumsComponent";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Container from "@/components/website/Container";
import StaticContentContainer from "@/components/website/StaticContentContainer";
import { faqs } from "./faqData";
import { FadeIn } from "@/components/animation/FadeIn";

const breadcrumbs = [{ title: "Home", link: "/" }, { title: "Faq" }];
const page = () => {
  return (
    <FadeIn>
      <Container style="p-3">
        <BreadCrumbsComponent items={breadcrumbs} />
      </Container>
      <StaticContentContainer>
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">
              Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </StaticContentContainer>
    </FadeIn>
  );
};

export default page;
