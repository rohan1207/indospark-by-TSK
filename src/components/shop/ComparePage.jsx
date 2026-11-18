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
  return "bg-black/[0.04] text-ink/70 ring-black/[0.06]";
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
    return <span className="font-medium text-ink/35">—</span>;
  }
  return <span className="font-medium text-ink">{v}</span>;
}

function StepPill({ n, label, active, done }) {
  return (
    <div
      className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-[13px] font-semibold ${
        active
          ? "bg-brand text-white"
          : done
            ? "bg-brand/10 text-brand"
            : "bg-black/[0.04] text-ink/40"
      }`}
    >
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-bold ${
          active ? "bg-white/20 text-white" : done ? "bg-brand text-white" : "bg-white text-ink/35"
        }`}
      >
        {done && !active ? "✓" : n}
      </span>
      {label}
    </div>
  );
}

function SlotCard({ product, index, onRemove, onAddToCart }) {
  if (!product) {
    return (
      <Link
        href="/shop"
        className="cursor-target group flex h-full min-h-[22rem] flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-black/15 bg-[#fafafa] px-5 text-center transition hover:border-brand/45 hover:bg-white"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-[22px] font-semibold text-brand shadow-sm ring-1 ring-black/5 transition group-hover:bg-brand group-hover:text-white">
          +
        </span>
        <p className="mt-4 text-[15px] font-bold text-ink">Add product</p>
        <p className="mt-1 text-[13px] text-ink/45">Slot {index + 1} of {COMPARE_MAX}</p>
      </Link>
    );
  }

  return (
    <article className="relative flex h-full min-h-[22rem] flex-col overflow-hidden rounded-[1.5rem] bg-white ring-1 ring-black/[0.07]">
      <div className="absolute left-3 top-3 z-10 rounded-full bg-ink px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-white">
        {String(index + 1).padStart(2, "0")}
      </div>
      <button
        type="button"
        onClick={() => onRemove(product.id)}
        className="cursor-target absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white text-ink/40 shadow-sm ring-1 ring-black/10 transition hover:text-brand"
        aria-label={`Remove ${product.shortName || product.name}`}
      >
        ✕
      </button>

      <div className="relative mx-auto aspect-square w-full max-w-[13.5rem] shrink-0">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="220px"
          className="object-contain p-5"
        />
      </div>

      <div className="mt-auto flex flex-1 flex-col border-t border-black/[0.05] px-4 py-4 sm:px-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
          {product.categoryLabel}
        </p>
        <h2 className="mt-1.5 line-clamp-2 min-h-[2.6em] text-[15px] font-bold leading-snug tracking-[-0.02em] text-ink sm:text-[16px]">
          {product.shortName || product.name}
        </h2>
        {product.tag && (
          <p className="mt-2 text-[12px] font-medium text-ink/45">{product.tag}</p>
        )}
        <p className="mt-3 text-[18px] font-bold tracking-[-0.03em] text-brand">
          {product.priceLabel}
        </p>
        <div className="mt-4 flex gap-2">
          <Link
            href={product.href}
            className="cursor-target inline-flex h-10 flex-1 items-center justify-center rounded-full border border-black/10 text-[13px] font-semibold text-ink/65 transition hover:border-brand hover:text-brand"
          >
            Details
          </Link>
          <button
            type="button"
            onClick={() => onAddToCart(product.id)}
            className="cursor-target btn-shine inline-flex h-10 flex-1 items-center justify-center rounded-full bg-brand text-[13px] font-semibold text-white transition hover:bg-brand-deep"
          >
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
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

  const slots = useMemo(() => {
    const filled = [...compareProducts];
    while (filled.length < COMPARE_MAX) filled.push(null);
    return filled.slice(0, COMPARE_MAX);
  }, [compareProducts]);

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

  const step = compareCount === 0 ? 1 : compareCount === 1 ? 2 : 3;
  const status =
    compareCount === 0
      ? {
          title: "Choose products to compare",
          body: "Fill the three slots below. You need at least two products for a side-by-side difference table.",
        }
      : compareCount === 1
        ? {
            title: "Add one more to unlock compare",
            body: "Nothing to compare with yet. Pick another product from suggestions or the shop.",
          }
        : {
            title: "Ready to review differences",
            body: "Scan the table below. Toggle Differences only to focus on what actually changes.",
          };

  if (!hydrated) {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-[1440px] px-4 py-20 text-center text-ink/45 sm:px-5">
          Loading compare…
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="border-b border-black/[0.06] bg-[#fafafa]">
        <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-5 sm:py-10 lg:px-6 xl:px-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-brand">
                Compare
              </p>
              <h1 className="mt-2 text-[clamp(1.75rem,3.6vw,2.65rem)] font-bold tracking-[-0.035em] text-ink">
                Pick up to {COMPARE_MAX}, decide with clarity
              </h1>
              <p className="mt-2 text-[16px] leading-relaxed text-ink/55">
                Slot products side by side, then read a concise difference table built from live
                catalog data.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <StepPill n={1} label="Select" active={step === 1} done={step > 1} />
              <span className="hidden h-px w-4 bg-black/10 sm:block" aria-hidden />
              <StepPill n={2} label="Add pair" active={step === 2} done={step > 2} />
              <span className="hidden h-px w-4 bg-black/10 sm:block" aria-hidden />
              <StepPill n={3} label="Review" active={step === 3} done={false} />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-5 sm:py-10 lg:px-6 xl:px-8">
        {/* Status + actions */}
        <div className="mb-6 flex flex-col gap-4 rounded-[1.35rem] bg-[#fafafa] px-5 py-4 ring-1 ring-black/[0.05] sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-[16px] font-bold text-ink">{status.title}</p>
              <span className="rounded-full bg-white px-2.5 py-0.5 text-[12px] font-semibold text-ink/50 ring-1 ring-black/10">
                {compareCount} / {COMPARE_MAX}
              </span>
            </div>
            <p className="mt-1 text-[14px] leading-relaxed text-ink/50 sm:text-[15px]">
              {status.body}
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-2">
            {compareCount > 0 && (
              <button
                type="button"
                onClick={clearCompare}
                className="cursor-target inline-flex h-10 items-center rounded-full border border-black/10 px-4 text-[13px] font-semibold text-ink/55 transition hover:border-brand hover:text-brand"
              >
                Clear all
              </button>
            )}
            <Link
              href="/shop"
              className="cursor-target inline-flex h-10 items-center rounded-full bg-ink px-4 text-[13px] font-semibold text-white transition hover:bg-brand"
            >
              Browse shop
            </Link>
          </div>
        </div>

        {/* Always 3 equal slots in one row */}
        <section aria-label="Compare slots">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
            {slots.map((product, index) => (
              <SlotCard
                key={product?.id || `slot-${index}`}
                product={product}
                index={index}
                onRemove={removeFromCompare}
                onAddToCart={(id) => addToCart(id, 1, { open: true })}
              />
            ))}
          </div>
        </section>

        {/* Need one more */}
        {compareCount === 1 && (
          <section className="mt-10">
            <div className="mb-5 flex items-end justify-between gap-4">
              <div>
                <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-brand">
                  Suggested next
                </p>
                <h2 className="mt-1 text-[clamp(1.25rem,2.2vw,1.55rem)] font-bold tracking-[-0.03em] text-ink">
                  Add a second product
                </h2>
              </div>
              <Link
                href="/shop"
                className="cursor-target text-[14px] font-semibold text-ink/45 transition hover:text-brand"
              >
                View all →
              </Link>
            </div>
            {suggestions.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
                {suggestions.map((product) => (
                  <ProductCard key={product.id} product={product} showCategory />
                ))}
              </div>
            ) : (
              <div className="rounded-[1.25rem] border border-dashed border-black/10 px-6 py-10 text-center">
                <p className="text-[15px] text-ink/50">No other catalog products available yet.</p>
              </div>
            )}
          </section>
        )}

        {/* Empty: starter picks */}
        {compareCount === 0 && ALL_PRODUCTS.length > 0 && (
          <section className="mt-10">
            <div className="mb-5">
              <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-brand">
                Quick start
              </p>
              <h2 className="mt-1 text-[clamp(1.25rem,2.2vw,1.55rem)] font-bold tracking-[-0.03em] text-ink">
                Start with these
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {ALL_PRODUCTS.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} showCategory />
              ))}
            </div>
          </section>
        )}

        {/* Difference table */}
        {compareCount >= 2 && (
          <section className="mt-12">
            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-brand">
                  Results
                </p>
                <h2 className="mt-1 text-[clamp(1.3rem,2.4vw,1.7rem)] font-bold tracking-[-0.03em] text-ink">
                  Difference table
                </h2>
                <p className="mt-1 text-[14px] text-ink/50">
                  {diffOnly
                    ? `${comparison.differenceRows.length} differences highlighted`
                    : `All ${comparison.rows.length} compared points`}
                </p>
              </div>
              <div
                className="inline-flex rounded-full bg-[#fafafa] p-1 ring-1 ring-black/[0.08]"
                role="group"
                aria-label="Table filter"
              >
                <button
                  type="button"
                  onClick={() => setDiffOnly(true)}
                  className={`cursor-target rounded-full px-4 py-2 text-[13px] font-semibold transition ${
                    diffOnly ? "bg-ink text-white" : "text-ink/45 hover:text-ink"
                  }`}
                >
                  Differences only
                </button>
                <button
                  type="button"
                  onClick={() => setDiffOnly(false)}
                  className={`cursor-target rounded-full px-4 py-2 text-[13px] font-semibold transition ${
                    !diffOnly ? "bg-ink text-white" : "text-ink/45 hover:text-ink"
                  }`}
                >
                  All points
                </button>
              </div>
            </div>

            {comparison.insights.length > 0 && (
              <div className="mb-5 flex flex-wrap gap-2">
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

            <div className="overflow-hidden rounded-[1.5rem] ring-1 ring-black/[0.07]">
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b border-black/[0.06] bg-[#fafafa]">
                      <th className="sticky left-0 z-10 min-w-[9.5rem] bg-[#fafafa] px-4 py-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-ink/35 sm:min-w-[12rem] sm:px-5">
                        Compare point
                      </th>
                      {compareProducts.map((p, i) => (
                        <th
                          key={p.id}
                          className="min-w-[11rem] px-4 py-4 sm:min-w-[13rem] sm:px-5"
                        >
                          <span className="mb-1.5 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-ink px-2 text-[11px] font-bold text-white">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="mt-1 block line-clamp-2 text-[14px] font-bold leading-snug text-ink">
                            {p.shortName || p.name}
                          </span>
                          <span className="mt-1 block text-[13px] font-semibold text-brand">
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
                          className="px-5 py-12 text-center text-[15px] text-ink/50"
                        >
                          No differences in this filter. Switch to All points to review everything.
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

          </section>
        )}

        {/* Optional third when 2 filled */}
        {compareCount === 2 && suggestions.length > 0 && (
          <section className="mt-12 border-t border-black/[0.06] pt-10">
            <div className="mb-5">
              <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-brand">
                Optional
              </p>
              <h2 className="mt-1 text-[clamp(1.25rem,2.2vw,1.55rem)] font-bold tracking-[-0.03em] text-ink">
                Fill the third slot
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {suggestions.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} showCategory />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function GroupRows({ group, productCount }) {
  return (
    <>
      <tr className="border-b border-black/[0.05] bg-brand/[0.05]">
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
            r.highlight ? "bg-brand/[0.025]" : "bg-white"
          }`}
        >
          <th
            scope="row"
            className={`sticky left-0 z-10 px-4 py-3.5 align-top text-[13px] font-semibold leading-snug text-ink/70 sm:px-5 sm:text-[14px] ${
              r.highlight ? "bg-[#fdf6f5]" : "bg-white"
            }`}
          >
            <span className="inline-flex items-start gap-2">
              <span
                className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                  r.highlight ? "bg-brand" : "bg-black/15"
                }`}
                aria-hidden
              />
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
