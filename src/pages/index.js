import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import TrustedBy from "@/components/home/TrustedBy";
import AboutPreview from "@/components/home/AboutPreview";
import ShopByCategory from "@/components/home/ShopByCategory";
import ShowcaseSlider from "@/components/home/ShowcaseSlider";
import ProductShop from "@/components/home/ProductShop";
import WhyChoose from "@/components/home/WhyChoose";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import NewsEvents from "@/components/home/NewsEvents";
import SeoHead from "@/components/seo/SeoHead";

export default function Home() {
  return (
    <>
      <SeoHead
        title="Anchor Fastening Systems & Concrete Cutting Services"
        description="IndoSpark — India's leading construction fastening systems company. Shop ICFS chemical & mechanical anchors online, and book concrete cutting, rebaring, core drilling, and wire sawing services."
        path="/"
      />
      <Navbar />
      <main>
        <Hero />
        <TrustedBy />
        <AboutPreview />
        <ShopByCategory />
        <ProductShop />
        <ShowcaseSlider />
        <WhyChoose />
        <Testimonials />
        <FAQ />
        <NewsEvents />
      </main>
      <Footer />
    </>
  );
}
