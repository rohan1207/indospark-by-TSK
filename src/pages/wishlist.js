import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SeoHead from "@/components/seo/SeoHead";
import WishlistPage from "@/components/shop/WishlistPage";

export default function Wishlist() {
  return (
    <>
      <SeoHead
        title="Wishlist | ICFS Shop"
        description="Saved ICFS fastening products, mortars, guns, capsules, anchors, foam, and more."
        path="/wishlist"
      />
      <Navbar />
      <main>
        <WishlistPage />
      </main>
      <Footer />
    </>
  );
}
