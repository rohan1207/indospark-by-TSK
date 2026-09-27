import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AboutPage from "@/components/about/AboutPage";
import SeoHead from "@/components/seo/SeoHead";

export default function About() {
  return (
    <>
      <SeoHead
        title="About Us — 43 Years of IndoSpark & ICFS"
        description="IndoSpark Construction Services — from a 1978 workshop to ICFS fastening systems, vibration-free cutting, and Anchor Designer. Explore our history, verticals, and leadership."
        path="/about"
      />
      <Navbar />
      <main>
        <AboutPage />
      </main>
      <Footer />
    </>
  );
}
