"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { formatMoney, useCartWishlist } from "./CartWishlistContext";

export default function CartDrawer() {
  const {
    cartOpen,
    closeCart,
    cartLines,
    cartCount,
    cartSubtotal,
    setQty,
    removeFromCart,
    clearCart,
  } = useCartWishlist();

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.button
            type="button"
            aria-label="Close cart"
            className="fixed inset-0 z-[80] bg-ink/40 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
            className="fixed inset-y-0 right-0 z-[90] flex w-full max-w-md flex-col bg-white shadow-[-12px_0_40px_rgba(0,0,0,0.12)]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 36 }}
          >
            <div className="flex items-center justify-between border-b border-black/[0.06] px-5 py-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
                  Your cart
                </p>
                <h2 className="text-[18px] font-bold tracking-[-0.02em] text-ink">
                  {cartCount} {cartCount === 1 ? "item" : "items"}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeCart}
                className="cursor-target flex h-9 w-9 items-center justify-center rounded-full border border-black/10 text-ink/60 transition hover:border-brand hover:text-brand"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {cartLines.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                  <p className="text-[16px] font-bold text-ink">Cart is empty</p>
                  <p className="mt-2 text-[13px] text-ink/50">
                    Browse the shop and add fastening products for your next site.
                  </p>
                  <Link
                    href="/shop"
                    onClick={closeCart}
                    className="cursor-target btn-shine mt-6 inline-flex h-11 items-center rounded-full bg-ink px-6 text-[13px] font-semibold text-white transition hover:bg-brand"
                  >
                    Continue shopping
                  </Link>
                </div>
              ) : (
                <ul className="space-y-4">
                  {cartLines.map(({ product, qty, lineTotal }) => (
                    <li
                      key={product.id}
                      className="flex gap-3 rounded-2xl border border-black/[0.06] bg-[#fafafa] p-3"
                    >
                      <Link
                        href={product.href}
                        onClick={closeCart}
                        className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-white"
                      >
                        <Image
                          src={product.image}
                          alt=""
                          fill
                          sizes="80px"
                          className="object-contain p-2"
                        />
                      </Link>
                      <div className="min-w-0 flex-1">
                        <Link
                          href={product.href}
                          onClick={closeCart}
                          className="line-clamp-2 text-[13px] font-semibold leading-snug text-ink hover:text-brand"
                        >
                          {product.name}
                        </Link>
                        <p className="mt-1 text-[12px] text-ink/45">{product.priceLabel}</p>
                        <div className="mt-2.5 flex items-center justify-between gap-2">
                          <div className="inline-flex items-center rounded-full border border-black/10 bg-white">
                            <button
                              type="button"
                              aria-label="Decrease quantity"
                              onClick={() => setQty(product.id, qty - 1)}
                              className="cursor-target h-8 w-8 text-[16px] text-ink/60 transition hover:text-brand"
                            >
                              −
                            </button>
                            <span className="w-7 text-center text-[13px] font-semibold tabular-nums">
                              {qty}
                            </span>
                            <button
                              type="button"
                              aria-label="Increase quantity"
                              onClick={() => setQty(product.id, qty + 1)}
                              className="cursor-target h-8 w-8 text-[16px] text-ink/60 transition hover:text-brand"
                            >
                              +
                            </button>
                          </div>
                          <div className="text-right">
                            <p className="text-[13px] font-bold text-ink">{formatMoney(lineTotal)}</p>
                            <button
                              type="button"
                              onClick={() => removeFromCart(product.id)}
                              className="cursor-target mt-0.5 text-[11px] font-semibold text-ink/40 transition hover:text-brand"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {cartLines.length > 0 && (
              <div className="border-t border-black/[0.06] px-5 py-4">
                <div className="flex items-center justify-between text-[14px]">
                  <span className="text-ink/55">Subtotal</span>
                  <span className="text-[18px] font-bold tracking-[-0.02em] text-ink">
                    {formatMoney(cartSubtotal)}
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-ink/40">Taxes & shipping calculated at checkout.</p>
                <div className="mt-4 grid gap-2">
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="cursor-target btn-shine inline-flex h-11 items-center justify-center rounded-full bg-brand text-[13px] font-semibold text-white transition hover:bg-brand-deep"
                  >
                    Checkout
                  </Link>
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/shop"
                      onClick={closeCart}
                      className="cursor-target inline-flex h-10 items-center justify-center rounded-full border border-black/10 text-[12px] font-semibold text-ink transition hover:border-brand hover:text-brand"
                    >
                      Keep shopping
                    </Link>
                    <button
                      type="button"
                      onClick={clearCart}
                      className="cursor-target inline-flex h-10 items-center justify-center rounded-full text-[12px] font-semibold text-ink/45 transition hover:text-brand"
                    >
                      Clear cart
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export function ShopToast() {
  const { toast } = useCartWishlist();
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          className="pointer-events-none fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 rounded-full bg-ink px-5 py-2.5 text-[12px] font-semibold text-white shadow-lg"
        >
          {toast}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
