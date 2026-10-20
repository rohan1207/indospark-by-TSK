"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import ProductCard from "@/components/shop/ProductCard";
import {
  SHOP_CATEGORIES,
  SORT_OPTIONS,
  filterShopProducts,
} from "@/data/shopCatalog";

function IconSearch({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
      <path d="M20 20l-3.5-3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export default function ShopPage() {
  const router = useRouter();
  const [categoryId, setCategoryId] = useState("all");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");
  const [taggedOnly, setTaggedOnly] = useState(false);

  // Sync category + search from query string
  useEffect(() => {
    if (!router.isReady) return;
    const raw = typeof router.query.category === "string" ? router.query.category : "all";
    const valid = SHOP_CATEGORIES.some((c) => c.id === raw) ? raw : "all";
    setCategoryId(valid);
    if (typeof router.query.q === "string") setQuery(router.query.q);
  }, [router.isReady, router.query.category, router.query.q]);

  const activeCategory = SHOP_CATEGORIES.find((c) => c.id === categoryId) || SHOP_CATEGORIES[0];

  const products = useMemo(
    () => filterShopProducts({ categoryId, query, sort, taggedOnly }),
    [categoryId, query, sort, taggedOnly]
  );

  const selectCategory = (id) => {
    setCategoryId(id);
    const href = id === "all" ? "/shop" : `/shop?category=${id}`;
    router.push(href, undefined, { shallow: true });
  };

  const clearFilters = () => {
    setQuery("");
    setSort("featured");
    setTaggedOnly(false);
    selectCategory("all");
  };

  return (
    <div className="bg-[#fafafa]">
      {/* Header */}
      <section className="border-b border-black/[0.06] bg-white">
        <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-5 sm:py-12 lg:px-6 xl:px-8">
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-brand">
            Anchor fasteners
          </p>
          <div className="mt-2 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-[clamp(1.85rem,4vw,2.85rem)] font-bold tracking-[-0.035em] text-ink">
                Shop
              </h1>
              <p className="mt-2 max-w-lg text-[16px] leading-relaxed text-ink/55 sm:text-[16px]">
                Chemical mortars, guns, capsules, studs, mechanical anchors, foam, and nylon —
                order online for sites across India.
              </p>
            </div>

            <label className="relative w-full max-w-md lg:mb-1">
              <span className="sr-only">Search products</span>
              <IconSearch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, categories, tags…"
                className="h-12 w-full rounded-full border border-black/[0.08] bg-[#f7f6f4] pl-11 pr-4 text-[16px] text-ink outline-none transition placeholder:text-ink/35 focus:border-brand/40 focus:bg-white focus:ring-2 focus:ring-brand/15"
              />
            </label>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-5 sm:py-10 lg:px-6 xl:px-8">
        {/* Category tabs */}
        <div
          role="tablist"
          aria-label="Product categories"
          className="-mx-1 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {SHOP_CATEGORIES.map((cat) => {
            const active = cat.id === categoryId;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => selectCategory(cat.id)}
                className={`cursor-target shrink-0 rounded-full px-4 py-2.5 text-[14px] font-semibold tracking-[-0.01em] transition sm:text-[15px] ${
                  active
                    ? "bg-brand text-white shadow-[0_8px_20px_rgba(201,52,46,0.28)]"
                    : "border border-black/10 bg-white text-ink/70 hover:border-brand/30 hover:text-brand"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Filters bar */}
        <div className="mt-6 flex flex-col gap-4 rounded-[1.25rem] border border-black/[0.06] bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:rounded-[1.35rem] sm:px-5">
          <p className="text-[15px] text-ink/55">
            <span className="font-semibold text-ink">{products.length}</span>
            {products.length === 1 ? " product" : " products"}
            {categoryId !== "all" ? (
              <>
                {" "}
                in <span className="font-semibold text-ink">{activeCategory.label}</span>
              </>
            ) : null}
            {query.trim() ? (
              <>
                {" "}
                for &ldquo;<span className="font-semibold text-ink">{query.trim()}</span>&rdquo;
              </>
            ) : null}
          </p>

          <div className="flex flex-wrap items-center gap-2.5">
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-black/10 bg-[#f7f6f4] px-3.5 py-2 text-[14px] font-medium text-ink/70 transition hover:border-brand/25">
              <input
                type="checkbox"
                checked={taggedOnly}
                onChange={(e) => setTaggedOnly(e.target.checked)}
                className="h-3.5 w-3.5 accent-[#c9342e]"
              />
              Featured tags only
            </label>

            <label className="inline-flex items-center gap-2 text-[14px] font-medium text-ink/50">
              <span className="sr-only sm:not-sr-only">Sort</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="h-10 cursor-pointer rounded-full border border-black/10 bg-white px-3.5 pr-8 text-[14px] font-semibold text-ink outline-none transition hover:border-brand/30 focus:border-brand/40 focus:ring-2 focus:ring-brand/15"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>

            {(query || sort !== "featured" || taggedOnly || categoryId !== "all") && (
              <button
                type="button"
                onClick={clearFilters}
                className="cursor-target rounded-full px-3.5 py-2 text-[14px] font-semibold text-brand transition hover:bg-brand/5"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${categoryId}-${sort}-${taggedOnly}-${query}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8"
          >
            {products.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4 lg:gap-5">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    showCategory={categoryId === "all"}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-[1.5rem] border border-dashed border-black/10 bg-white px-6 py-16 text-center">
                <p className="text-[16px] font-bold text-ink">No products found</p>
                <p className="mx-auto mt-2 max-w-sm text-[16px] text-ink/50">
                  Try another category, clear search, or turn off the featured-tags filter.
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="cursor-target btn-shine mt-6 inline-flex h-11 items-center rounded-full bg-ink px-6 text-[15px] font-semibold text-white transition hover:bg-brand"
                >
                  Reset shop
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
