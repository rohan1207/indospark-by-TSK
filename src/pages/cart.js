import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SeoHead from "@/components/seo/SeoHead";
import CartPageView from "@/components/shop/CartPageView";

export default function Cart() {
  return (
    <>
      <SeoHead title="Cart | ICFS Shop" description="Review your ICFS product cart." path="/cart" />
      <Navbar />
      <main>
        <CartPageView />
      </main>
      <Footer />
    </>
  );
}
