import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SeoHead from "@/components/seo/SeoHead";
import CheckoutPage from "@/components/shop/CheckoutPage";

export default function Checkout() {
  return (
    <>
      <SeoHead
        title="Checkout | ICFS Shop"
        description="Complete your ICFS product order — shipping details, delivery, and payment options."
        path="/checkout"
      />
      <Navbar />
      <main>
        <CheckoutPage />
      </main>
      <Footer />
    </>
  );
}
