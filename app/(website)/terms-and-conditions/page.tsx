import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import BreadCrumbsComponent from "@/components/layout/BreadCrumsComponent";
import Container from "@/components/website/Container";
import StaticContentContainer from "@/components/website/StaticContentContainer";

const breadcrumbs = [
  { title: "Home", link: "/" },
  { title: "Terms & Conditions" },
];

const Page = () => {
  return (
    <>
      <Container style="p-3">
        <BreadCrumbsComponent items={breadcrumbs} />
      </Container>
      <StaticContentContainer>
        <Tabs defaultValue="privacy" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
            <TabsTrigger value="terms">Terms and Conditions</TabsTrigger>
          </TabsList>
          <TabsContent value="privacy">
            <Card>
              <CardHeader>
                <CardTitle>Web User's Privacy Policy</CardTitle>
                <CardDescription>
                  This privacy policy will help you understand how
                  www.iwenleng.com uses and protects the data you provide to us
                  when you visit and use our website.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="data-collection">
                    <AccordionTrigger>
                      What User Data We Collect
                    </AccordionTrigger>
                    <AccordionContent>
                      <p>
                        When you visit the website, we may collect the following
                        data:
                      </p>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Your IP address.</li>
                        <li>Your contact information and email address.</li>
                        <li>
                          Other information such as interests and preferences.
                        </li>
                        <li>
                          Data profile regarding your online behaviour on our
                          website.
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="data-usage">
                    <AccordionTrigger>
                      Why We Collect Your Data
                    </AccordionTrigger>
                    <AccordionContent>
                      <p>We are collecting your data for several reasons:</p>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>To better understand your needs.</li>
                        <li>To improve our services and products.</li>
                        <li>
                          To send you promotional emails containing information
                          we think you will find interesting.
                        </li>
                        <li>
                          To contact you to fill out surveys and participate in
                          other types of market research.
                        </li>
                        <li>
                          To customize our website according to your online
                          behaviour and personal preferences.
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="data-security">
                    <AccordionTrigger>
                      Safeguarding and Securing the Data
                    </AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Iwenliang is committed to securing your data and keeping
                        it confidential. We have done all in our power to
                        prevent data theft, unauthorized access, and disclosure
                        by implementing the latest technologies and software,
                        which help us safeguard all the information we collect
                        online.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="cookie-policy">
                    <AccordionTrigger>Our Cookie Policy</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Once you agree to allow our website to use cookies, you
                        also agree to use the data it collects regarding your
                        online behaviour (analyse web traffic, web pages you
                        spend the most time on, and websites you visit).
                      </p>
                      <p className="mt-2">
                        The data we collect by using cookies is used to
                        customize our website to your needs. After we use the
                        data for statistical analysis, the data is completely
                        removed from our systems.
                      </p>
                      <p className="mt-2">
                        Please note that cookies don't allow us to gain control
                        of your computer in any way. They are strictly used to
                        monitor which pages you find useful and which you do not
                        so that we can provide a better experience for you.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="external-links">
                    <AccordionTrigger>Links to Other Websites</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Our website contains links that lead to other websites.
                        If you click on these links, Iwenliang is not held
                        responsible for your data and privacy protection.
                        Visiting those websites is not governed by this privacy
                        policy agreement. Make sure to read the privacy policy
                        documentation of the website you go to from our website.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="data-restriction">
                    <AccordionTrigger>
                      Restricting the Collection of your Personal Data
                    </AccordionTrigger>
                    <AccordionContent>
                      <p>
                        At some point, you might wish to restrict the use and
                        collection of your personal data. You can achieve this
                        by doing the following:
                      </p>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>
                          When filling forms on the website, check if there is a
                          box which you can leave unchecked if you don't want to
                          disclose your personal information.
                        </li>
                        <li>
                          If you have already agreed to share your information
                          with us, feel free to contact us via email and we will
                          be more than happy to change this for you.
                        </li>
                      </ul>
                      <p className="mt-2">
                        www.iwenliang.com will not lease, sell or distribute
                        your personal information to any third parties, unless
                        we have your permission. We might do so if the law
                        forces us. Your personal information will be used when
                        we need to send you promotional materials if you agree
                        to this privacy policy.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="terms">
            <Card>
              <CardHeader>
                <CardTitle>Terms and Conditions</CardTitle>
                <CardDescription>
                  Please read these terms and conditions carefully before using
                  our website.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  We reserve the right to change this policy at any given time,
                  of which you will be promptly updated. If you want to make
                  sure that you are up to date with the latest changes, we
                  advise you to frequently visit this page.
                </p>
                <p className="mt-4">
                  For full terms and conditions, please contact our customer
                  service.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </StaticContentContainer>
    </>
  );
};

export default Page;
