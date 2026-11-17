"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import { CATEGORY_SHORTCUTS } from "@/data/shopCatalog";

function CategoryItem({ category }) {
  return (
    <motion.div
      data-category
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 380, damping: 26 }}
      className="flex h-full w-[132px] shrink-0 flex-col items-center sm:w-auto sm:min-w-0"
    >
      <Link
        href={category.href}
        className="group flex w-full flex-1 flex-col items-center focus:outline-none"
      >
        <span className="relative mx-auto mb-3.5 block aspect-square w-[104px] sm:w-[112px] md:w-[120px] lg:w-[128px]">
          <span className="absolute inset-0 rounded-full border-[1.5px] border-ink transition-shadow duration-300 group-hover:shadow-[0_8px_22px_rgba(201,52,46,0.12)]" />
          <span className="absolute inset-[3px] rounded-full border border-brand/80 bg-white" />
          <span className="absolute inset-[7px] overflow-hidden rounded-full bg-white sm:inset-[8px]">
            <Image
              src={category.image}
              alt={category.label}
              fill
              sizes="128px"
              className="object-contain p-1.5 transition-transform duration-500 ease-out group-hover:scale-110"
            />
          </span>
        </span>

        <h3 className="line-clamp-2 min-h-[2.6em] px-1 text-center text-[15px] font-semibold leading-snug tracking-[-0.01em] text-ink transition-colors duration-200 group-hover:text-brand sm:text-[16px]">
          {category.label}
        </h3>
      </Link>

      <Link
        href={category.href}
        className="cursor-target btn-shine mt-3 inline-flex h-8 w-[6.5rem] shrink-0 items-center justify-center rounded-full bg-ink text-[13px] font-semibold text-white transition-colors duration-200 hover:bg-brand sm:h-9 sm:w-28 sm:text-[14px]"
      >
        Buy Now
      </Link>
    </motion.div>
  );
}

export default function ShopByCategory() {
  const rootRef = useRef(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-category]", {
        y: 20,
        opacity: 0,
        scale: 0.96,
        duration: 0.5,
        stagger: 0.06,
        ease: "power3.out",
        delay: 0.05,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="shop-by-category"
      ref={rootRef}
      className="relative overflow-hidden bg-white py-14 sm:py-16 lg:py-20"
      aria-labelledby="shop-category-heading"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-5 lg:px-6 xl:px-8">
        <div className="mb-10 text-center sm:mb-12">
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-brand">
            Browse products
          </p>
          <h2
            id="shop-category-heading"
            className="mt-2 text-[clamp(1.6rem,3vw,2.25rem)] font-bold tracking-[-0.03em] text-ink"
          >
            Shop By Category
          </h2>
          <p className="mx-auto mt-3 max-w-md text-[16px] leading-relaxed text-ink/55">
            Mortars, guns, capsules, studs, mechanical, foam, and nylon, shop by type.
          </p>
        </div>

        <div className="-mx-4 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
          <div className="mx-auto flex w-max items-stretch justify-center gap-5 sm:grid sm:w-full sm:max-w-6xl sm:grid-cols-4 sm:justify-items-center sm:gap-3 md:grid-cols-7 md:gap-3 lg:gap-4 xl:gap-5">
            {CATEGORY_SHORTCUTS.map((category) => (
              <CategoryItem key={category.id} category={category} />
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/shop"
            className="cursor-target btn-shine inline-flex h-11 items-center rounded-full border border-ink bg-transparent px-7 text-[15px] font-semibold text-ink transition hover:border-brand hover:bg-brand hover:text-white"
          >
            Open full shop
          </Link>
        </div>
      </div>
    </section>
  );
}
