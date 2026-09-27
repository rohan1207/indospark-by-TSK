import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SeoHead from "@/components/seo/SeoHead";
import ContactPage from "@/components/contact/ContactPage";

export default function Contact() {
  return (
    <>
      <SeoHead
        title="Contact Us — IndoSpark & ICFS"
        description="Contact IndoSpark Head Office Kolhapur, Pune & Mumbai branches. Email email@indospark.com or call toll-free 1800 1235 00023. We deliver worldwide."
        path="/contact"
      />
      <Navbar />
      <main>
        <ContactPage />
      </main>
      <Footer />
    </>
  );
}
