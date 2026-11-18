import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SeoHead from "@/components/seo/SeoHead";
import ComparePage from "@/components/shop/ComparePage";

export default function Compare() {
  return (
    <>
      <SeoHead
        title="Compare products | ICFS Shop"
        description="Compare ICFS chemical mortars, mechanical anchors, and fastening products side by side."
        path="/compare"
      />
      <Navbar />
      <main>
        <ComparePage />
      </main>
      <Footer />
    </>
  );
}
