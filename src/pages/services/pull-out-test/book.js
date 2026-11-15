import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SeoHead from "@/components/seo/SeoHead";
import PullOutTestBooking from "@/components/services/PullOutTestBooking";

export default function PullOutTestBookPage() {
  return (
    <>
      <SeoHead
        title="Pull Out Test Booking | ICFS"
        description="Book on-site ICFS pull out testing across India. Share project, anchor, and site details — our technical team will confirm your test schedule."
        path="/services/pull-out-test/book"
      />
      <Navbar />
      <main>
        <PullOutTestBooking />
      </main>
      <Footer />
    </>
  );
}
