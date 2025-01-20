import Footer from "@/components/website/footer/Footer";
import SiteHeader from "@/components/website/SiteHeader";

type Props = {
  children: React.ReactNode;
};

const WebsiteLayout = ({ children }: Props) => {
  return (
    <>
      <SiteHeader />
      {children}
      <Footer />
    </>
  );
};

export default WebsiteLayout;
