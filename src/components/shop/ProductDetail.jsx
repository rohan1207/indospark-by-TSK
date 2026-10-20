"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { formatMoney, useCartWishlist } from "./CartWishlistContext";
import { getRelatedProducts } from "@/data/shopCatalog";

const TABS = [
  { id: "description", label: "Description" },
  { id: "specs", label: "Specifications" },
  { id: "applications", label: "Applications" },
];

export default function ProductDetail({ product }) {
  const router = useRouter();
  const { addToCart, toggleWishlist, isWishlisted } = useCartWishlist();
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [tab, setTab] = useState("description");
  const wishlisted = isWishlisted(product.id);
  const related = useMemo(() => getRelatedProducts(product, 4), [product]);
  const gallery = product.gallery?.length ? product.gallery : [product.image];

  const bump = (dir) => setQty((q) => Math.max(1, Math.min(99, q + dir)));

  const buyNow = () => {
    addToCart(product.id, qty, { open: false });
    router.push("/checkout");
  };

  return (
    <article className="bg-white">
      <div className="border-b border-black/[0.06] bg-[#fafafa]">
        <div className="mx-auto max-w-[1440px] px-4 py-4 sm:px-5 lg:px-6 xl:px-8">
          <nav className="flex flex-wrap items-center gap-1.5 text-[14px] text-ink/45" aria-label="Breadcrumb">
            <Link href="/shop" className="transition hover:text-brand">
              Shop
            </Link>
            <span aria-hidden>/</span>
            <Link
              href={`/shop?category=${product.categoryId}`}
              className="transition hover:text-brand"
            >
              {product.categoryLabel}
            </Link>
            <span aria-hidden>/</span>
            <span className="line-clamp-1 font-medium text-ink/70">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-10 sm:px-5 lg:grid-cols-12 lg:gap-12 lg:px-6 lg:py-14 xl:px-8">
        {/* Gallery */}
        <div className="lg:col-span-6">
          <div className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-[#f5f5f5] sm:rounded-[1.75rem]">
            <Image
              src={gallery[activeImage]}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-8 sm:p-12"
            />
            {product.tag && (
              <span className="absolute left-4 top-4 rounded-full bg-brand px-3 py-1 text-[12px] font-bold uppercase tracking-[0.1em] text-white">
                {product.tag}
              </span>
            )}
          </div>
          {gallery.length > 1 && (
            <div className="mt-3 flex gap-2.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {gallery.map((src, i) => (
                <button
                  key={`${src}-${i}`}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  className={`relative h-[4.5rem] w-[4.5rem] shrink-0 overflow-hidden rounded-xl border-2 bg-[#f5f5f5] transition sm:h-20 sm:w-20 ${
                    i === activeImage ? "border-brand" : "border-transparent hover:border-black/15"
                  }`}
                >
                  <Image src={src} alt="" fill sizes="80px" className="object-contain p-2" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Buy box */}
        <div className="lg:col-span-6 lg:py-2">
          <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-brand">
            {product.categoryLabel}
          </p>
          <h1 className="mt-2 text-[clamp(1.65rem,3.2vw,2.45rem)] font-bold leading-[1.12] tracking-[-0.035em] text-ink">
            {product.name}
          </h1>
          <p className="mt-2 text-[14px] text-ink/40">SKU: {product.sku}</p>

          <div className="mt-5 flex flex-wrap items-end gap-3">
            <p className="text-[clamp(1.75rem,3vw,2.15rem)] font-bold tracking-[-0.04em] text-ink">
              {product.priceLabel}
            </p>
            <span
              className={`mb-1 rounded-full px-2.5 py-1 text-[13px] font-semibold ${
                product.inStock
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-black/5 text-ink/45"
              }`}
            >
              {product.inStock ? "In stock" : "Out of stock"}
            </span>
          </div>

          <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-ink/60 sm:text-[16px]">
            {product.shortDescription}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center rounded-full border border-black/10 bg-[#f7f6f4]">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => bump(-1)}
                className="cursor-target h-12 w-11 text-[18px] text-ink/60 transition hover:text-brand"
              >
                −
              </button>
              <input
                type="number"
                min={1}
                max={99}
                value={qty}
                onChange={(e) =>
                  setQty(Math.max(1, Math.min(99, Number(e.target.value) || 1)))
                }
                className="h-12 w-12 border-x border-black/10 bg-transparent text-center text-[16px] font-semibold tabular-nums text-ink outline-none"
                aria-label="Quantity"
              />
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => bump(1)}
                className="cursor-target h-12 w-11 text-[18px] text-ink/60 transition hover:text-brand"
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              className={`cursor-target inline-flex h-12 items-center gap-2 rounded-full border px-5 text-[15px] font-semibold transition ${
                wishlisted
                  ? "border-brand bg-brand/5 text-brand"
                  : "border-black/10 text-ink/70 hover:border-brand hover:text-brand"
              }`}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill={wishlisted ? "currentColor" : "none"} aria-hidden>
                <path
                  d="M12 20s-7-4.4-9.2-8.2C1.2 8.6 3 5.5 6.4 5.2c1.8-.2 3.4.7 4.4 2 1-1.3 2.6-2.2 4.4-2 3.4.3 5.2 3.4 3.6 6.6C19 15.6 12 20 12 20Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
              </svg>
              {wishlisted ? "Wishlisted" : "Wishlist"}
            </button>
          </div>

          <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => addToCart(product.id, qty, { open: true })}
              className="cursor-target btn-shine inline-flex h-12 items-center justify-center rounded-full bg-ink text-[15px] font-semibold text-white transition hover:bg-brand"
            >
              Add to cart
            </button>
            <button
              type="button"
              onClick={buyNow}
              className="cursor-target btn-shine inline-flex h-12 items-center justify-center rounded-full bg-brand text-[15px] font-semibold text-white transition hover:bg-brand-deep"
            >
              Buy now · {formatMoney(product.price * qty)}
            </button>
          </div>

          <ul className="mt-8 grid gap-2.5 border-t border-black/[0.06] pt-6 text-[15px] text-ink/55 sm:grid-cols-2">
            {[
              "Site-ready packaging",
              "Technical support available",
              "Ships across India",
              "Bulk / project quotes on request",
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Detail tabs */}
      <div className="border-t border-black/[0.06] bg-[#fafafa]">
        <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-5 lg:px-6 lg:py-14 xl:px-8">
          <div
            role="tablist"
            className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
                className={`cursor-target shrink-0 rounded-full px-4 py-2.5 text-[14px] font-semibold transition sm:text-[15px] ${
                  tab === t.id
                    ? "bg-ink text-white"
                    : "border border-black/10 bg-white text-ink/60 hover:text-ink"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-8 rounded-[1.5rem] bg-white p-6 ring-1 ring-black/[0.05] sm:rounded-[1.75rem] sm:p-8"
          >
            {tab === "description" && (
              <div className="max-w-3xl space-y-4 text-[16px] leading-relaxed text-ink/65 sm:text-[16px]">
                <p>{product.description}</p>
                <p>
                  Need a datasheet, ETA certificate, or project quantity? Contact ICFS with your
                  site requirements — we support contractors and distributors nationwide.
                </p>
              </div>
            )}

            {tab === "specs" && (
              <dl className="grid gap-3 sm:grid-cols-2">
                {product.specs.map((row) => (
                  <div
                    key={row.label}
                    className="rounded-2xl border border-black/[0.06] bg-[#fafafa] px-4 py-3"
                  >
                    <dt className="text-[13px] font-semibold uppercase tracking-[0.12em] text-ink/40">
                      {row.label}
                    </dt>
                    <dd className="mt-1 text-[16px] font-medium text-ink">{row.value}</dd>
                  </div>
                ))}
              </dl>
            )}

            {tab === "applications" && (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {product.applications.map((app) => (
                  <div
                    key={app}
                    className="rounded-2xl border border-black/[0.06] bg-[#fafafa] px-4 py-5 text-[16px] font-semibold text-ink"
                  >
                    {app}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="border-t border-black/[0.06] bg-white">
          <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-5 lg:px-6 lg:py-14 xl:px-8">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-brand">
                  Related
                </p>
                <h2 className="mt-1 text-[clamp(1.35rem,2.4vw,1.85rem)] font-bold tracking-[-0.03em] text-ink">
                  More in {product.categoryLabel}
                </h2>
              </div>
              <Link
                href={`/shop?category=${product.categoryId}`}
                className="cursor-target text-[15px] font-semibold text-ink/55 transition hover:text-brand"
              >
                View all →
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
