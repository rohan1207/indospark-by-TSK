import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AboutPage from "@/components/about/AboutPage";
import SeoHead from "@/components/seo/SeoHead";

export default function About() {
  return (
    <>
      <SeoHead
        title="About ICFS: Anchor Fasteners Since 1978"
        description="ICFS makes chemical and mechanical anchor fasteners for construction. Learn our story, product range, and the team behind reliable hold on site."
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
