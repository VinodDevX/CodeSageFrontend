import Analysis from "@/features/marketing/components/Analysis";
import Feature from "@/features/marketing/components/Feature";
import Hero from "@/features/marketing/components/Hero";
import HowItWorks from "@/features/marketing/components/HowItWorks";
import Integrations from "@/features/marketing/components/Integrations";
import DashboardPreview from "@/features/marketing/components/DashboardPreview/DashboardPreview";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <hr style={{ border: "none", height: "2px", backgroundColor: "black" }} />
      <Feature />
      <hr style={{ border: "none", height: "2px", backgroundColor: "black" }} />
      <Analysis />
      <hr style={{ border: "none", height: "2px", backgroundColor: "black" }} />
      <HowItWorks />
      <hr style={{ border: "none", height: "2px", backgroundColor: "black" }} />
      <DashboardPreview />
      <hr style={{ border: "none", height: "2px", backgroundColor: "black" }} />
      <Integrations />
      <hr style={{ border: "none", height: "2px", backgroundColor: "black" }} />
      <Footer />
    </>
  );
}
