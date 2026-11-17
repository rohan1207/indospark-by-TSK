import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SeoHead from "@/components/seo/SeoHead";
import DesignSoftwareHub from "@/components/software/DesignSoftwareHub";

export default function DesignSoftwarePage() {
  return (
    <>
      <SeoHead
        title="Anchor Design Software"
        description="Free ICFS tools to size chemical and mechanical anchors, mobile and desktop software for engineers and contractors."
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
