import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SeoHead from "@/components/seo/SeoHead";
import ShopPage from "@/components/shop/ShopPage";

export default function Shop() {
  return (
    <>
      <SeoHead
        title="Shop ICFS Products"
        description="Shop ICFS — chemical mortars, guns, capsules, studs, mechanical anchors, PU foam, and nylon frame anchors. Order online across India."
        path="/shop"
      />
      <Navbar />
      <main>
        <ShopPage />
      </main>
      <Footer />
    </>
  );
}
