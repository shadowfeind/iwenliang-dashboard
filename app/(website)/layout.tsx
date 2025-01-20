import Footer from "@/components/website/footer/Footer";
import SiteHeader from "@/components/website/SiteHeader";
import { GoogleAnalytics } from "@next/third-parties/google";

type Props = {
  children: React.ReactNode;
};

const WebsiteLayout = ({ children }: Props) => {
  return (
    <>
      <SiteHeader />
      {children}
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS!} />
      <Footer />
    </>
  );
};

export default WebsiteLayout;
