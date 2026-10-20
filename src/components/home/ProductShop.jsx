"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import ProductCard from "@/components/shop/ProductCard";
import { CATEGORY_SHORTCUTS, PRODUCTS_BY_CATEGORY } from "@/data/shopCatalog";

function CategoryCircle({ category, active, onSelect }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 380, damping: 26 }}
      className="flex h-full w-[132px] shrink-0 flex-col items-center sm:w-auto sm:min-w-0"
    >
      <button
        type="button"
        onClick={() => onSelect(category.id)}
        aria-pressed={active}
        className="group flex w-full flex-1 flex-col items-center focus:outline-none"
      >
        <span className="relative mx-auto mb-3.5 block aspect-square w-[104px] sm:w-[112px] md:w-[120px] lg:w-[128px]">
          <span
            className={`absolute inset-0 rounded-full border-[1.5px] transition-shadow duration-300 ${
              active
                ? "border-brand shadow-[0_8px_22px_rgba(201,52,46,0.18)]"
                : "border-ink group-hover:shadow-[0_8px_22px_rgba(201,52,46,0.12)]"
            }`}
          />
          <span
            className={`absolute inset-[3px] rounded-full border bg-white ${
              active ? "border-brand" : "border-brand/80"
            }`}
          />
          <span className="absolute inset-[7px] overflow-hidden rounded-full bg-[#f3f3f3] sm:inset-[8px]">
            <Image
              src={category.image}
              alt={category.label}
              fill
              sizes="128px"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
            />
          </span>
        </span>

        <h3
          className={`line-clamp-2 min-h-[2.6em] px-1 text-center text-[15px] font-semibold leading-snug tracking-[-0.01em] transition-colors duration-200 sm:text-[16px] ${
            active ? "text-brand" : "text-ink group-hover:text-brand"
          }`}
        >
          {category.label}
        </h3>
      </button>

      <Link
        href={category.href}
        className="cursor-target btn-shine mt-3 inline-flex h-8 w-[6.5rem] shrink-0 items-center justify-center rounded-full bg-ink text-[13px] font-semibold text-white transition-colors duration-200 hover:bg-brand sm:h-9 sm:w-28 sm:text-[14px]"
      >
        Buy Now
      </Link>
    </motion.div>
  );
}

export default function ProductShop() {
  const [active, setActive] = useState(CATEGORY_SHORTCUTS[0].id);

  const products = useMemo(
    () => (PRODUCTS_BY_CATEGORY[active] || []).slice(0, 8),
    [active]
  );
  const activeCategory =
    CATEGORY_SHORTCUTS.find((c) => c.id === active) || CATEGORY_SHORTCUTS[0];

  return (
    <section
      id="shop"
      className="bg-[#fafafa] py-14 sm:py-16 lg:py-20"
      aria-labelledby="shop-heading"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-5 lg:px-6 xl:px-8">
        <div className="mb-8 text-center sm:mb-10">
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-brand">
            Online store
          </p>
          <h2
            id="shop-heading"
            className="mt-2 text-[clamp(1.6rem,3vw,2.25rem)] font-bold tracking-[-0.03em] text-ink"
          >
            Shop anchor fasteners
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-[16px] leading-relaxed text-ink/55">
            Pick a category below, then browse products or buy online.
          </p>
        </div>

        <div className="mb-10 sm:mb-12">
          <div className="-mx-4 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
            <div
              role="tablist"
              aria-label="Product categories"
              className="mx-auto flex w-max items-stretch justify-center gap-5 sm:grid sm:w-full sm:grid-cols-7 sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6"
            >
              {CATEGORY_SHORTCUTS.map((category) => (
                <CategoryCircle
                  key={category.id}
                  category={category}
                  active={active === category.id}
                  onSelect={setActive}
                />
              ))}
            </div>
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
            href={activeCategory.href}
            className="cursor-target btn-shine inline-flex h-11 items-center rounded-full bg-ink px-7 text-[15px] font-semibold text-white transition hover:bg-brand"
          >
            View all {activeCategory.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
