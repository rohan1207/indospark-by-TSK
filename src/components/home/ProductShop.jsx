"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import ProductCard from "@/components/shop/ProductCard";
import { HOME_SHOP_TABS, PRODUCTS_BY_CATEGORY } from "@/data/shopCatalog";

export default function ProductShop() {
  const [active, setActive] = useState(HOME_SHOP_TABS[0].id);

  const products = useMemo(
    () => (PRODUCTS_BY_CATEGORY[active] || []).slice(0, 8),
    [active]
  );
  const activeTab = HOME_SHOP_TABS.find((t) => t.id === active) || HOME_SHOP_TABS[0];

  return (
    <section
      id="shop"
      className="bg-[#fafafa] py-14 sm:py-16 lg:py-20"
      aria-labelledby="shop-heading"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-5 lg:px-6 xl:px-8">
        <div className="mb-8 text-center sm:mb-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">
            Online store
          </p>
          <h2
            id="shop-heading"
            className="mt-2 text-[clamp(1.6rem,3vw,2.25rem)] font-bold tracking-[-0.03em] text-ink"
          >
            Shop ICFS products
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-[14px] leading-relaxed text-ink/55">
            Switch categories below to browse mortars, guns, capsules, anchors, foam, and more.
          </p>
        </div>

        <div className="mb-8 sm:mb-10">
          <p className="mb-3 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-ink/40">
            Shop by category
          </p>
          <div
            role="tablist"
            aria-label="Product categories"
            className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] sm:flex-wrap sm:justify-center sm:overflow-visible [&::-webkit-scrollbar]:hidden"
          >
            {HOME_SHOP_TABS.map((tab) => {
              const isActive = tab.id === active;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(tab.id)}
                  className={`cursor-target shrink-0 rounded-full px-4 py-2.5 text-[12px] font-semibold tracking-[-0.01em] transition-all sm:text-[13px] ${
                    isActive
                      ? "bg-brand text-white shadow-[0_8px_20px_rgba(201,52,46,0.28)]"
                      : "border border-black/10 bg-white text-ink/70 hover:border-brand/30 hover:text-brand"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            role="tabpanel"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5"
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex justify-center sm:mt-12">
          <Link
            href={activeTab.href}
            className="cursor-target btn-shine inline-flex h-11 items-center rounded-full bg-ink px-7 text-[13px] font-semibold text-white transition hover:bg-brand"
          >
            View all {activeTab.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
