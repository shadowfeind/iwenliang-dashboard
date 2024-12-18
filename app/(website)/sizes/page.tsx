import BreadCrumbsComponent from "@/components/layout/BreadCrumsComponent";
import Container from "@/components/website/Container";
import StaticContentContainer from "@/components/website/StaticContentContainer";
import Image from "next/image";
import measurement from "../../../public/images/measurement.png";

const breadcrumbs = [{ title: "Home", link: "/" }, { title: "Sizes" }];

const SizePage = () => {
  return (
    <>
      <Container style="mt-3">
        <BreadCrumbsComponent items={breadcrumbs} />
        {/* <div className="video-container relative mx-auto aspect-video w-full translate-y-8 overflow-hidden">
          <div className="video-foreground">
            <iframe src="https://youtube.com/embed/AqdMEgo-_F8?autoplay=1&mute=1&loop=1&controls=0&disablekb=1&playlist=AqdMEgo-_F8" />
          </div>
        </div> */}
      </Container>
      <StaticContentContainer>
        <Image src={measurement} alt="wrist measurement" />
      </StaticContentContainer>
    </>
  );
};

export default SizePage;
