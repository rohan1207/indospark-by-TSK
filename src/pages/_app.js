import { Outfit } from "next/font/google";
import SiteCursor from "@/components/effects/SiteCursor";
import DesktopOnlyGate from "@/components/layout/DesktopOnlyGate";
import { CartWishlistProvider } from "@/components/shop/CartWishlistContext";
import CartDrawer, { ShopToast } from "@/components/shop/CartDrawer";
import "@/styles/globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export default function App({ Component, pageProps }) {
  return (
    <div className={`${outfit.variable} font-sans`}>
      <DesktopOnlyGate>
        <CartWishlistProvider>
          <SiteCursor />
          <Component {...pageProps} />
          <CartDrawer />
          <ShopToast />
        </CartWishlistProvider>
      </DesktopOnlyGate>
    </div>
  );
}
