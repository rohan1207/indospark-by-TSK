import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ServicesHub from "@/components/services/ServicesHub";
import SeoHead from "@/components/seo/SeoHead";

export default function ServicesPage() {
  return (
    <>
      <SeoHead
        title="Pull Out Test & Installation Services"
        description="ICFS pull-out testing (POT) and chemical/mechanical anchor installation, on-site tests up to 75 tons, calibrated equipment, and co-signed reports across India."
        path="/services"
      />
      <Navbar />
      <main>
        <ServicesHub />
      </main>
      <Footer />
    </>
  );
}
