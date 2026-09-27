"use client";

import Link from "next/link";
import ProductCard from "@/components/shop/ProductCard";
import { useCartWishlist } from "@/components/shop/CartWishlistContext";

export default function WishlistPage() {
  const { wishlistProducts, wishlistCount } = useCartWishlist();

  return (
    <div className="bg-[#fafafa]">
      <section className="border-b border-black/[0.06] bg-white">
        <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-5 sm:py-12 lg:px-6 xl:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">Saved</p>
          <h1 className="mt-2 text-[clamp(1.85rem,4vw,2.85rem)] font-bold tracking-[-0.035em] text-ink">
            Wishlist
          </h1>
          <p className="mt-2 text-[14px] text-ink/55">
            {wishlistCount} {wishlistCount === 1 ? "product" : "products"} saved for later.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-5 lg:px-6 xl:px-8">
        {wishlistProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4 lg:gap-5">
            {wishlistProducts.map((product) => (
              <ProductCard key={product.id} product={product} showCategory />
            ))}
          </div>
        ) : (
          <div className="rounded-[1.5rem] border border-dashed border-black/10 bg-white px-6 py-16 text-center">
            <p className="text-[16px] font-bold text-ink">Your wishlist is empty</p>
            <p className="mx-auto mt-2 max-w-sm text-[14px] text-ink/50">
              Tap the heart on any product from the shop or product page to save it here.
            </p>
            <Link
              href="/shop"
              className="cursor-target btn-shine mt-6 inline-flex h-11 items-center rounded-full bg-ink px-6 text-[13px] font-semibold text-white transition hover:bg-brand"
            >
              Browse shop
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
