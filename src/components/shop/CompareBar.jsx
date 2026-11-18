"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { COMPARE_MAX, useCartWishlist } from "./CartWishlistContext";

export default function CompareBar() {
  const router = useRouter();
  const { compareProducts, compareCount, removeFromCompare, clearCompare, hydrated } =
    useCartWishlist();

  if (!hydrated) return null;
  if (compareCount === 0) return null;
  if (router.pathname === "/compare") return null;

  const ready = compareCount >= 2;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ type: "spring", stiffness: 380, damping: 34 }}
        className="fixed inset-x-0 bottom-0 z-[95] px-3 pb-3 sm:px-5 sm:pb-4"
      >
        <div className="mx-auto flex max-w-3xl items-center gap-3 rounded-2xl border border-black/10 bg-white/95 p-2.5 shadow-[0_16px_50px_rgba(0,0,0,0.14)] backdrop-blur-md sm:gap-4 sm:p-3">
          <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {compareProducts.map((p) => (
              <div
                key={p.id}
                className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-[#fafafa] ring-1 ring-black/10"
              >
                <Image src={p.image} alt="" fill sizes="44px" className="object-contain p-1" />
                <button
                  type="button"
                  onClick={() => removeFromCompare(p.id)}
                  className="cursor-target absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-ink text-[9px] text-white"
                  aria-label={`Remove ${p.shortName || p.name}`}
                >
                  ✕
                </button>
              </div>
            ))}
            {Array.from({ length: Math.max(0, COMPARE_MAX - compareCount) }).map((_, i) => (
              <div
                key={`slot-${i}`}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-dashed border-black/15 text-[12px] text-ink/30"
                aria-hidden
              >
                +
              </div>
            ))}
            <p className="ml-1 shrink-0 text-[13px] font-semibold text-ink/60 sm:text-[14px]">
              {ready ? "Ready to compare" : "Add 1 more to compare"}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={clearCompare}
              className="cursor-target hidden h-9 items-center rounded-full px-3 text-[13px] font-semibold text-ink/45 transition hover:text-brand sm:inline-flex"
            >
              Clear
            </button>
            <Link
              href="/compare"
              className={`cursor-target btn-shine inline-flex h-10 items-center rounded-full px-4 text-[13px] font-semibold text-white transition sm:px-5 sm:text-[14px] ${
                ready ? "bg-brand hover:bg-brand-deep" : "bg-ink hover:bg-brand"
              }`}
            >
              {ready ? "Compare now" : "View list"}
            </Link>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
