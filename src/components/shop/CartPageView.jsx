"use client";

import Link from "next/link";
import { useCartWishlist, formatMoney } from "@/components/shop/CartWishlistContext";

export default function CartPageView() {
  const { openCart, cartLines, cartCount, cartSubtotal } = useCartWishlist();

  return (
    <div className="bg-[#fafafa]">
      <div className="mx-auto max-w-[720px] px-4 py-16 text-center sm:px-5">
        <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-brand">Cart</p>
        <h1 className="mt-2 text-[clamp(1.75rem,3vw,2.35rem)] font-bold tracking-[-0.03em] text-ink">
          {cartCount} {cartCount === 1 ? "item" : "items"} in your cart
        </h1>
        <p className="mt-2 text-[16px] text-ink/55">
          Subtotal {formatMoney(cartSubtotal)}, review in the drawer or continue to checkout.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {cartCount > 0 && (
            <Link
              href="/checkout"
              className="cursor-target btn-shine inline-flex h-11 items-center rounded-full bg-brand px-6 text-[15px] font-semibold text-white transition hover:bg-brand-deep"
            >
              Proceed to checkout
            </Link>
          )}
          <button
            type="button"
            onClick={openCart}
            className="cursor-target inline-flex h-11 items-center rounded-full border border-black/10 bg-white px-6 text-[15px] font-semibold text-ink transition hover:border-brand hover:text-brand"
          >
            Open cart drawer
          </button>
          <Link
            href="/shop"
            className="cursor-target inline-flex h-11 items-center rounded-full px-6 text-[15px] font-semibold text-ink/55 transition hover:text-brand"
          >
            Continue shopping
          </Link>
        </div>
        {cartLines.length > 0 && (
          <ul className="mt-10 space-y-2 text-left text-[15px] text-ink/60">
            {cartLines.map(({ product, qty }) => (
              <li
                key={product.id}
                className="flex justify-between gap-4 rounded-xl bg-white px-4 py-3 ring-1 ring-black/[0.05]"
              >
                <Link href={product.href} className="font-medium text-ink hover:text-brand">
                  {product.name}
                </Link>
                <span className="tabular-nums">×{qty}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
