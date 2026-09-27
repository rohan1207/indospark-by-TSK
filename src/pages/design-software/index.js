import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SeoHead from "@/components/seo/SeoHead";
import DesignSoftwareHub from "@/components/software/DesignSoftwareHub";

export default function DesignSoftwarePage() {
  return (
    <>
      <SeoHead
        title="Design Software — ICFS & IndoExperts Anchor Tools"
        description="ICFS Chemical Anchor / Rebar Design, Chemical Anchor Calculation Software, and IndoExpert Professional — design and calculate chemical and mechanical anchors."
        path="/design-software"
      />
      <Navbar />
      <main>
        <DesignSoftwareHub />
      </main>
      <Footer />
    </>
  );
}
