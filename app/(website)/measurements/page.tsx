import BreadCrumbsComponent from "@/components/layout/BreadCrumsComponent";
import Container from "@/components/website/Container";
import StaticContentContainer from "@/components/website/StaticContentContainer";
import Image from "next/image";
import measurement from "../../../public/images/measurement.png";

const breadcrumbs = [{ title: "Home", link: "/" }, { title: "Measurements" }];

const Page = () => {
  return (
    <>
      <Container style="p-3">
        <BreadCrumbsComponent items={breadcrumbs} />
      </Container>
      <StaticContentContainer>
        <Image src={measurement} alt="wrist measurement" />
      </StaticContentContainer>
    </>
  );
};

export default Page;
