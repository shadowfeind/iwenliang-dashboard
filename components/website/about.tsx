"use client";
import { FadeIn } from "../animation/FadeIn";
import BreadCrumbsComponent from "@/components/layout/BreadCrumsComponent";
import Container from "@/components/website/Container";
import StaticContentContainer from "@/components/website/StaticContentContainer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
const breadcrumbs = [{ title: "Home", link: "/" }, { title: "About Us" }];

export const About = () => {
  return (
    <FadeIn>
      <Container style="p-3">
        <BreadCrumbsComponent items={breadcrumbs} />
      </Container>
      <StaticContentContainer>
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>About Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  I.Wenliang Men's Fashion Jewellery is initiated by few
                  passionate minds who have long experience in semi-precious
                  stones fashioned jewellery industry. Our skilled craftsmanship
                  and designers are investing their effort to design beautiful
                  pieces of fashioned jewellery from earthy scratch mine to
                  finish product, bringing them to the fashion jewellery market
                  and delivering to our loyal customers worldwide.
                </p>
                <p className="mt-4 text-gray-700">
                  We believe our products are completely genuine and easily
                  accessible to purchase online from any part of the world.
                  Besides, we are providing quick and convenient customer care
                  service.
                </p>
                <p className="mt-4 text-gray-700">
                  Our products represent true art, design and innovation
                  embedded with passion for the finest men's fashion jewellery
                  collection.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Our Products</CardTitle>
                <CardDescription>
                  Designer Jewellery bracelets comprised of natural
                  semi-precious stone beads
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="stones" className="w-full">
                  <TabsList>
                    <TabsTrigger value="stones">Stones</TabsTrigger>
                    <TabsTrigger value="sizes">Sizes</TabsTrigger>
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="packaging">Packaging</TabsTrigger>
                  </TabsList>
                  <TabsContent value="stones">
                    <h3 className="text-lg font-semibold mb-2">
                      Types of Stones
                    </h3>
                    <ul className="list-disc pl-5">
                      <li>Tiger Eye: Yellow/Blue/Red</li>
                      <li>Sodalite</li>
                      <li>Lapis Lazuli</li>
                      <li>Malachite</li>
                      <li>Carnelian</li>
                      <li>Onyx</li>
                    </ul>
                  </TabsContent>
                  <TabsContent value="sizes">
                    <h3 className="text-lg font-semibold mb-2">Stone Sizes</h3>
                    <p>8mm/10mm/12mm All-natural round beads</p>
                    <h3 className="text-lg font-semibold mt-4 mb-2">
                      Bracelet Sizes
                    </h3>
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Size
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Inches (In.)
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Millimeter (mm)
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            S Small
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            6.0-6.5
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            152-165
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            M Medium
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            6.5-7.0
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            165-178
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            L Large
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            7.0-7.5
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            178-190
                          </td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">
                            XL Extra Large
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            7.5-8.0
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            190-203
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </TabsContent>
                  <TabsContent value="description">
                    <p>
                      High quality AAA natural semi-precious stone beads size
                      varying from 8mm/10mm/12mm assembled with polished 925
                      sterling silver charm and spacer. Stones sizes and colour
                      may slightly vary.
                    </p>
                  </TabsContent>
                  <TabsContent value="packaging">
                    <ul className="list-disc pl-5">
                      <li>
                        Hard cover box packing with soft black colour velvet
                        insert.
                      </li>
                      <li>
                        All items have special production labelled &
                        certificate.
                      </li>
                      <li>
                        High quality kraft paper box approx. 1000 gsm of weight
                        is used with black colour velvet insert.
                      </li>
                      <li>Size of the box is 90x90x35 mm.</li>
                      <li>
                        Engraved silver colour logo printed outside the cover of
                        the box.
                      </li>
                    </ul>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </main>
      </StaticContentContainer>
    </FadeIn>
  );
};
