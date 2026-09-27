import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ServicesHub from "@/components/services/ServicesHub";
import SeoHead from "@/components/seo/SeoHead";

export default function ServicesPage() {
  return (
    <>
      <SeoHead
        title="Construction Services — Shutdown Demolition & Cutting"
        description="IndoSpark construction services: vibration-free concrete and metal cutting, drilling, underwater demolition, rebar scanning, rock anchoring — plus technology and project case studies."
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
