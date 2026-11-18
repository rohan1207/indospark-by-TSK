"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/shop/ProductCard";
import { ALL_PRODUCTS } from "@/data/shopCatalog";
import {
  buildProductComparison,
  getCompareSuggestions,
} from "@/lib/buildProductComparison";
import { COMPARE_MAX, formatMoney, useCartWishlist } from "./CartWishlistContext";

function toneClass(tone) {
  if (tone === "good") return "bg-emerald-50 text-emerald-800 ring-emerald-100";
  if (tone === "warn") return "bg-amber-50 text-amber-900 ring-amber-100";
  return "bg-black/[0.03] text-ink/70 ring-black/[0.05]";
}

function CellValue({ value }) {
  const v = String(value ?? "—");
  if (v === "Yes") {
    return (
      <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-700">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden />
        Yes
      </span>
    );
  }
  if (v === "No") {
    return <span className="font-medium text-ink/35">No</span>;
  }
  return <span className="font-medium text-ink">{v}</span>;
}

export default function ComparePage() {
  const {
    compareProducts,
    compareCount,
    removeFromCompare,
    clearCompare,
    addToCart,
    hydrated,
  } = useCartWishlist();
  const [diffOnly, setDiffOnly] = useState(true);

  const comparison = useMemo(
    () => buildProductComparison(compareProducts),
    [compareProducts]
  );

  const suggestions = useMemo(
    () => getCompareSuggestions(compareProducts, ALL_PRODUCTS, 6),
    [compareProducts]
  );

  const visibleRows = diffOnly ? comparison.differenceRows : comparison.rows;
  const grouped = useMemo(() => {
    const map = new Map();
    for (const group of comparison.groups) map.set(group.id, []);
    for (const r of visibleRows) {
      if (!map.has(r.group)) map.set(r.group, []);
      map.get(r.group).push(r);
    }
    return comparison.groups
      .map((g) => ({ ...g, rows: map.get(g.id) || [] }))
      .filter((g) => g.rows.length > 0);
  }, [comparison.groups, visibleRows]);

  const colCount = Math.max(compareProducts.length, 1);

  if (!hydrated) {
    return (
      <div className="bg-[#fafafa]">
        <div className="mx-auto max-w-[1440px] px-4 py-20 text-center text-ink/45 sm:px-5">
          Loading compare…
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fafafa]">
      <section className="border-b border-black/[0.06] bg-white">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-4 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-5 sm:py-12 lg:px-6 xl:px-8">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-brand">
              Compare
            </p>
            <h1 className="mt-2 text-[clamp(1.85rem,4vw,2.85rem)] font-bold tracking-[-0.035em] text-ink">
              Side-by-side product compare
            </h1>
            <p className="mt-2 max-w-xl text-[16px] text-ink/55">
              Add up to {COMPARE_MAX} ICFS products, then scan a clear difference table before you
              specify or order.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="rounded-full bg-brand/10 px-3 py-1.5 text-[13px] font-semibold text-brand">
              {compareCount} / {COMPARE_MAX} selected
            </span>
            {compareCount > 0 && (
              <button
                type="button"
                onClick={clearCompare}
                className="cursor-target rounded-full border border-black/10 px-3.5 py-1.5 text-[13px] font-semibold text-ink/55 transition hover:border-brand hover:text-brand"
              >
                Clear all
              </button>
            )}
            <Link
              href="/shop"
              className="cursor-target rounded-full border border-black/10 px-3.5 py-1.5 text-[13px] font-semibold text-ink/55 transition hover:border-brand hover:text-brand"
            >
              Browse shop
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-5 sm:py-10 lg:px-6 xl:px-8">
        {/* Empty */}
        {compareCount === 0 && (
          <div className="rounded-[1.5rem] border border-dashed border-black/10 bg-white px-6 py-16 text-center">
            <p className="text-[16px] font-bold text-ink">Nothing to compare yet</p>
            <p className="mx-auto mt-2 max-w-md text-[16px] text-ink/50">
              Open a product and tap <span className="font-semibold text-ink/70">Compare</span>, or
              pick from the shop below. You need at least two products for a difference table.
            </p>
            <Link
              href="/shop"
              className="cursor-target btn-shine mt-6 inline-flex h-11 items-center rounded-full bg-ink px-6 text-[15px] font-semibold text-white transition hover:bg-brand"
            >
              Browse products
            </Link>
          </div>
        )}

        {/* Selected strip */}
        {compareCount > 0 && (
          <div
            className={`grid gap-3 sm:gap-4 ${
              colCount === 1
                ? "sm:grid-cols-2 lg:grid-cols-3"
                : colCount === 2
                  ? "sm:grid-cols-2"
                  : "sm:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {compareProducts.map((product) => (
              <article
                key={product.id}
                className="relative overflow-hidden rounded-[1.35rem] bg-white ring-1 ring-black/[0.06]"
              >
                <button
                  type="button"
                  onClick={() => removeFromCompare(product.id)}
                  className="cursor-target absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-ink/45 shadow-sm ring-1 ring-black/10 transition hover:text-brand"
                  aria-label={`Remove ${product.shortName || product.name}`}
                >
                  ✕
                </button>
                <div className="relative mx-auto aspect-[5/4] max-w-[14rem]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="280px"
                    className="object-contain p-5"
                  />
                </div>
                <div className="border-t border-black/[0.05] px-4 py-4">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-brand">
                    {product.categoryLabel}
                  </p>
                  <h2 className="mt-1 line-clamp-2 text-[15px] font-bold leading-snug text-ink">
                    {product.shortName || product.name}
                  </h2>
                  <p className="mt-2 text-[17px] font-bold text-brand">{product.priceLabel}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Link
                      href={product.href}
                      className="cursor-target inline-flex h-9 items-center rounded-full border border-black/10 px-3.5 text-[13px] font-semibold text-ink/65 transition hover:border-brand hover:text-brand"
                    >
                      View
                    </Link>
                    <button
                      type="button"
                      onClick={() => addToCart(product.id, 1, { open: true })}
                      className="cursor-target btn-shine inline-flex h-9 items-center rounded-full bg-brand px-3.5 text-[13px] font-semibold text-white transition hover:bg-brand-deep"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </article>
            ))}

            {compareCount < COMPARE_MAX && (
              <Link
                href="/shop"
                className="cursor-target flex min-h-[16rem] flex-col items-center justify-center rounded-[1.35rem] border border-dashed border-black/15 bg-white/70 px-6 text-center transition hover:border-brand/40 hover:bg-white"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand/10 text-[22px] font-semibold text-brand">
                  +
                </span>
                <p className="mt-3 text-[15px] font-bold text-ink">Add another product</p>
                <p className="mt-1 text-[14px] text-ink/45">
                  {COMPARE_MAX - compareCount} slot
                  {COMPARE_MAX - compareCount === 1 ? "" : "s"} left
                </p>
              </Link>
            )}
          </div>
        )}

        {/* Only one product */}
        {compareCount === 1 && (
          <div className="mt-8 overflow-hidden rounded-[1.5rem] bg-white ring-1 ring-black/[0.06]">
            <div className="border-b border-black/[0.06] bg-amber-50/80 px-5 py-4 sm:px-6">
              <p className="text-[15px] font-bold text-ink">Nothing to compare with yet</p>
              <p className="mt-1 text-[15px] text-ink/55">
                Add one more product to unlock the difference table. Same-category options are
                listed first.
              </p>
            </div>
            {suggestions.length > 0 ? (
              <div className="p-5 sm:p-6">
                <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-ink/35">
                  Suggested to compare
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
                  {suggestions.map((product) => (
                    <ProductCard key={product.id} product={product} showCategory />
                  ))}
                </div>
              </div>
            ) : (
              <div className="px-6 py-10 text-center">
                <p className="text-[15px] text-ink/50">No other catalog products available yet.</p>
                <Link href="/shop" className="mt-3 inline-block font-semibold text-brand">
                  Browse shop →
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Full comparison */}
        {compareCount >= 2 && (
          <div className="mt-8 space-y-5">
            {comparison.insights.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {comparison.insights.map((insight) => (
                  <p
                    key={insight.id}
                    className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium ring-1 ${toneClass(insight.tone)}`}
                  >
                    {insight.text}
                  </p>
                ))}
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-[clamp(1.25rem,2.2vw,1.55rem)] font-bold tracking-[-0.03em] text-ink">
                  Difference table
                </h2>
                <p className="mt-1 text-[14px] text-ink/50">
                  {diffOnly
                    ? `Showing ${comparison.differenceRows.length} differences`
                    : `Showing all ${comparison.rows.length} compared points`}
                </p>
              </div>
              <div
                className="inline-flex rounded-full bg-white p-1 ring-1 ring-black/[0.08]"
                role="group"
                aria-label="Table filter"
              >
                <button
                  type="button"
                  onClick={() => setDiffOnly(true)}
                  className={`cursor-target rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition ${
                    diffOnly ? "bg-ink text-white" : "text-ink/50 hover:text-ink"
                  }`}
                >
                  Differences only
                </button>
                <button
                  type="button"
                  onClick={() => setDiffOnly(false)}
                  className={`cursor-target rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition ${
                    !diffOnly ? "bg-ink text-white" : "text-ink/50 hover:text-ink"
                  }`}
                >
                  All points
                </button>
              </div>
            </div>

            <div className="overflow-hidden rounded-[1.35rem] bg-white ring-1 ring-black/[0.06]">
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b border-black/[0.06] bg-[#fafafa]">
                      <th className="sticky left-0 z-10 min-w-[10rem] bg-[#fafafa] px-4 py-3.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-ink/40 sm:min-w-[12rem] sm:px-5">
                        Point
                      </th>
                      {compareProducts.map((p) => (
                        <th
                          key={p.id}
                          className="min-w-[11rem] px-4 py-3.5 text-[13px] font-bold text-ink sm:min-w-[13rem] sm:px-5"
                        >
                          <span className="line-clamp-2">{p.shortName || p.name}</span>
                          <span className="mt-1 block text-[12px] font-semibold text-brand">
                            {p.priceLabel || formatMoney(p.price)}
                          </span>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {grouped.length === 0 ? (
                      <tr>
                        <td
                          colSpan={compareProducts.length + 1}
                          className="px-5 py-10 text-center text-[15px] text-ink/50"
                        >
                          No differences in this filter. Switch to “All points” to review the full
                          table.
                        </td>
                      </tr>
                    ) : (
                      grouped.map((group) => (
                        <GroupRows
                          key={group.id}
                          group={group}
                          productCount={compareProducts.length}
                        />
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-[13px] leading-relaxed text-ink/40">
              Comparison is generated from live catalog fields (price, specs, features, applications,
              and documents). Always confirm load data and ETA documents for structural installs.
            </p>
          </div>
        )}

        {/* Suggestions when 2+ and room remains */}
        {compareCount >= 2 && compareCount < COMPARE_MAX && suggestions.length > 0 && (
          <div className="mt-12">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-brand">
                  Optional
                </p>
                <h2 className="mt-1 text-[clamp(1.25rem,2.2vw,1.55rem)] font-bold tracking-[-0.03em] text-ink">
                  Add a third product
                </h2>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {suggestions.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} showCategory />
              ))}
            </div>
          </div>
        )}

        {/* Empty-state suggestions */}
        {compareCount === 0 && ALL_PRODUCTS.length > 0 && (
          <div className="mt-10">
            <h2 className="text-[clamp(1.25rem,2.2vw,1.55rem)] font-bold tracking-[-0.03em] text-ink">
              Start with these
            </h2>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {ALL_PRODUCTS.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} showCategory />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function GroupRows({ group, productCount }) {
  return (
    <>
      <tr className="border-b border-black/[0.05] bg-brand/[0.04]">
        <td
          colSpan={productCount + 1}
          className="px-4 py-2.5 text-[12px] font-bold uppercase tracking-[0.16em] text-brand sm:px-5"
        >
          {group.label}
        </td>
      </tr>
      {group.rows.map((r) => (
        <tr
          key={r.id}
          className={`border-b border-black/[0.05] last:border-0 ${
            r.highlight ? "bg-brand/[0.03]" : ""
          }`}
        >
          <th
            scope="row"
            className="sticky left-0 z-10 bg-white px-4 py-3.5 align-top text-[13px] font-semibold leading-snug text-ink/70 sm:px-5 sm:text-[14px]"
          >
            <span className="inline-flex items-start gap-2">
              {r.highlight ? (
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                  aria-hidden
                  title="Differs"
                />
              ) : (
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-black/15" aria-hidden />
              )}
              {r.label}
            </span>
          </th>
          {r.values.map((value, i) => (
            <td
              key={`${r.id}-${i}`}
              className="px-4 py-3.5 align-top text-[14px] leading-snug text-ink/80 sm:px-5 sm:text-[15px]"
            >
              <CellValue value={value} />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
