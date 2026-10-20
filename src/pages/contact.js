import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SeoHead from "@/components/seo/SeoHead";
import ContactPage from "@/components/contact/ContactPage";

export default function Contact() {
  return (
    <>
      <SeoHead
        title="Contact Us — ICFS"
        description="Contact ICFS for chemical and mechanical anchor fasteners. Head office Kolhapur, branches in Pune & Mumbai. Call 1800 123 500 023 or email email@icfs.in."
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
