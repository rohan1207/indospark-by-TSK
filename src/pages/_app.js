import { Barlow_Condensed, Instrument_Serif, Outfit } from "next/font/google";
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

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-barlow",
  display: "swap",
});

export default function App({ Component, pageProps }) {
  return (
    <div
      className={`${outfit.variable} ${instrument.variable} ${barlowCondensed.variable} font-sans`}
    >
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
