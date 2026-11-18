"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { formatMoney, useCartWishlist } from "./CartWishlistContext";
import { getRelatedProducts } from "@/data/shopCatalog";

const TABS = [
  { id: "description", label: "Description" },
  { id: "documents", label: "Documents" },
  { id: "load", label: "Load Chart / Technical Data" },
  { id: "features", label: "Features" },
  { id: "applications", label: "Applications & Advantages" },
  { id: "installation", label: "Installation" },
];

function IconCart({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M3.5 5h1.8l1.4 11.2a1.5 1.5 0 0 0 1.5 1.3h9.1a1.5 1.5 0 0 0 1.5-1.2L20.5 8H7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9.5" cy="20" r="1.2" fill="currentColor" />
      <circle cx="17" cy="20" r="1.2" fill="currentColor" />
    </svg>
  );
}

function IconHeart({ filled, className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill={filled ? "currentColor" : "none"} aria-hidden>
      <path
        d="M12 20s-7-4.4-9.2-8.2C1.2 8.6 3 5.5 6.4 5.2c1.8-.2 3.4.7 4.4 2 1-1.3 2.6-2.2 4.4-2 3.4.3 5.2 3.4 3.6 6.6C19 15.6 12 20 12 20Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconMail({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconUsers({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="9" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16" cy="9" r="2" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M3.5 18c.6-2.4 2.6-3.8 5.5-3.8s4.9 1.4 5.5 3.8M13.5 18c.4-1.6 1.6-2.6 3.5-2.6 1.7 0 2.9.9 3.5 2.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconExt({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M14 5h5v5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M10 14L19 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path
        d="M18 13.5V18a1.5 1.5 0 0 1-1.5 1.5H6A1.5 1.5 0 0 1 4.5 18V7.5A1.5 1.5 0 0 1 6 6h4.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconCompare({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M7 4v16M17 4v16M4 8h6M14 16h6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function ProductDetail({ product }) {
  const router = useRouter();
  const { addToCart, toggleWishlist, isWishlisted, toggleCompare, isInCompare } =
    useCartWishlist();
  const [qty, setQty] = useState(1);
  const [activeMedia, setActiveMedia] = useState(0);
  const [tab, setTab] = useState("description");
  const wishlisted = isWishlisted(product.id);
  const inCompare = isInCompare(product.id);
  const related = useMemo(() => getRelatedProducts(product, 4), [product]);
  const gallery = useMemo(() => {
    if (product.gallery?.length) return product.gallery;
    return [{ type: "image", src: product.image }];
  }, [product.gallery, product.image]);
  const active = gallery[activeMedia] || gallery[0];
  const technicalDatasheets = product.technicalDatasheets || [];
  const hasLoadContent =
    (product.loadCharts?.length ?? 0) > 0 || technicalDatasheets.length > 0;

  const bump = (dir) => setQty((q) => Math.max(1, Math.min(999, q + dir)));
  const prevImg = () => setActiveMedia((i) => (i - 1 + gallery.length) % gallery.length);
  const nextImg = () => setActiveMedia((i) => (i + 1) % gallery.length);

  const descriptionBlocks = Array.isArray(product.description)
    ? product.description
    : [product.description].filter(Boolean);

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
            <span className="line-clamp-1 font-medium text-ink/70">
              {product.shortName || product.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1440px] gap-10 px-4 py-10 sm:px-5 lg:grid-cols-12 lg:gap-12 lg:px-6 lg:py-14 xl:px-8">
        {/* Gallery */}
        <div className="lg:col-span-6">
          <div className="relative aspect-square overflow-hidden rounded-[1.25rem] bg-white ring-1 ring-black/[0.06] sm:rounded-[1.5rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active?.src || activeMedia}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0"
              >
                {active?.type === "video" ? (
                  <video
                    key={active.src}
                    src={active.src}
                    poster={active.poster || product.image}
                    controls
                    playsInline
                    className="h-full w-full object-contain bg-white p-2 sm:p-4"
                  >
                    Your browser does not support this video.
                  </video>
                ) : (
                  <Image
                    src={active?.src || product.image}
                    alt={product.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-contain p-6 sm:p-10"
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {gallery.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prevImg}
                  aria-label="Previous media"
                  className="cursor-target absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-brand shadow-md ring-1 ring-black/5 transition hover:bg-brand hover:text-white sm:left-4"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
                    <path d="M14.5 6.5L9 12l5.5 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={nextImg}
                  aria-label="Next media"
                  className="cursor-target absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-brand shadow-md ring-1 ring-black/5 transition hover:bg-brand hover:text-white sm:right-4"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
                    <path d="M9.5 6.5L15 12l-5.5 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </>
            )}

            {product.tag && (
              <span className="absolute left-4 top-4 z-10 rounded-full bg-ink px-3 py-1 text-[12px] font-bold uppercase tracking-[0.1em] text-white">
                {product.tag}
              </span>
            )}
          </div>

          {gallery.length > 1 && (
            <div className="mt-3 flex gap-2.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {gallery.map((item, i) => (
                <button
                  key={`${item.src}-${i}`}
                  type="button"
                  onClick={() => setActiveMedia(i)}
                  className={`relative h-[4.25rem] w-[4.25rem] shrink-0 overflow-hidden rounded-xl bg-white ring-2 transition sm:h-[4.75rem] sm:w-[4.75rem] ${
                    i === activeMedia
                      ? "ring-brand"
                      : "ring-transparent hover:ring-black/15"
                  }`}
                >
                  {item.type === "video" ? (
                    <>
                      <Image
                        src={item.poster || product.image}
                        alt=""
                        fill
                        sizes="76px"
                        className="object-cover"
                      />
                      <span className="absolute inset-0 flex items-center justify-center bg-black/35">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-brand shadow">
                          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 translate-x-px" fill="currentColor" aria-hidden>
                            <path d="M8 5.5v13l11-6.5L8 5.5Z" />
                          </svg>
                        </span>
                      </span>
                    </>
                  ) : (
                    <Image src={item.src} alt="" fill sizes="76px" className="object-contain p-1.5" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Buy column */}
        <div className="lg:col-span-6 lg:py-1">
          <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-brand">
            {product.categoryLabel}
          </p>
          <h1 className="mt-2 text-[clamp(1.45rem,2.8vw,2.1rem)] font-bold leading-[1.2] tracking-[-0.03em] text-ink">
            {product.name}
          </h1>

          <div className="mt-5 flex flex-wrap items-end gap-x-3 gap-y-2">
            <p className="text-[clamp(1.85rem,3vw,2.35rem)] font-bold tracking-[-0.04em] text-brand">
              {product.priceLabel}
            </p>
            {product.compareAtLabel && (
              <p className="mb-1.5 text-[17px] font-medium text-ink/35 line-through">
                {product.compareAtLabel}
              </p>
            )}
            <span
              className={`mb-1.5 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[13px] font-semibold ${
                product.inStock
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-black/5 text-ink/45"
              }`}
            >
              {product.inStock && (
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden>
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
              {product.inStock ? "IN STOCK" : "OUT OF STOCK"}
            </span>
          </div>

          <p className="mt-1 text-[13px] text-ink/40">SKU · {product.sku}</p>

          {/* Purchase box */}
          <div className="mt-7 rounded-2xl border border-black/[0.08] bg-[#fafafa] p-4 sm:p-5">
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-ink/40">
              Select quantity
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center overflow-hidden rounded-xl border border-black/10 bg-white">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => bump(-1)}
                  className="cursor-target h-11 w-11 text-[18px] text-ink/55 transition hover:bg-black/[0.03] hover:text-brand"
                >
                  −
                </button>
                <input
                  type="number"
                  min={1}
                  max={999}
                  value={qty}
                  onChange={(e) =>
                    setQty(Math.max(1, Math.min(999, Number(e.target.value) || 1)))
                  }
                  className="h-11 w-14 border-x border-black/10 bg-transparent text-center text-[16px] font-semibold tabular-nums text-ink outline-none"
                  aria-label="Quantity"
                />
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => bump(1)}
                  className="cursor-target h-11 w-11 text-[18px] text-ink/55 transition hover:bg-black/[0.03] hover:text-brand"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={() => addToCart(product.id, qty, { open: true })}
                className="cursor-target btn-shine inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-brand px-5 text-[15px] font-semibold text-white transition hover:bg-brand-deep sm:min-w-[10rem]"
              >
                <IconCart />
                Add To Cart
              </button>

              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById("product-details");
                  el?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="cursor-target inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-brand bg-white px-5 text-[15px] font-semibold text-brand transition hover:bg-brand hover:text-white sm:min-w-[10rem]"
              >
                <IconExt />
                View Details
              </button>
            </div>
          </div>

          {/* Bulk CTA */}
          <div className="mt-4 flex flex-col gap-3 rounded-2xl bg-brand/[0.06] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <p className="text-[15px] font-medium leading-snug text-ink/75">
              Buying 5+? Get the best offer on bulk orders.
            </p>
            <Link
              href={`/contact?interest=bulk&product=${encodeURIComponent(product.sku)}`}
              className="cursor-target btn-shine inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-brand px-4 text-[14px] font-semibold text-white transition hover:bg-brand-deep"
            >
              <IconUsers />
              Order in Bulk
            </Link>
          </div>

          {/* Secondary actions */}
          <div className="mt-4 flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => toggleCompare(product.id)}
              className={`cursor-target inline-flex h-10 items-center gap-2 rounded-xl border px-3.5 text-[14px] font-semibold transition ${
                inCompare
                  ? "border-brand bg-brand/5 text-brand"
                  : "border-black/10 text-ink/65 hover:border-brand hover:text-brand"
              }`}
            >
              <IconCompare />
              {inCompare ? "In compare" : "Compare"}
            </button>
            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              className={`cursor-target inline-flex h-10 items-center gap-2 rounded-xl border px-3.5 text-[14px] font-semibold transition ${
                wishlisted
                  ? "border-brand bg-brand/5 text-brand"
                  : "border-black/10 text-ink/65 hover:border-brand hover:text-brand"
              }`}
            >
              <IconHeart filled={wishlisted} />
              {wishlisted ? "Wishlisted" : "Add to Wish List"}
            </button>
            <Link
              href="/contact"
              className="cursor-target inline-flex h-10 items-center gap-2 rounded-xl border border-black/10 px-3.5 text-[14px] font-semibold text-ink/65 transition hover:border-brand hover:text-brand"
            >
              <IconMail />
              E-mail
            </Link>
            <button
              type="button"
              onClick={() => {
                addToCart(product.id, qty, { open: false });
                router.push("/checkout");
              }}
              className="cursor-target inline-flex h-10 items-center gap-2 rounded-xl border border-black/10 px-3.5 text-[14px] font-semibold text-ink/65 transition hover:border-brand hover:text-brand"
            >
              Buy now · {formatMoney(product.price * qty)}
            </button>
          </div>

          {/* Quick applications */}
          {product.applications?.length > 0 && (
            <div className="mt-8 border-t border-black/[0.06] pt-6">
              <h2 className="text-[15px] font-bold tracking-[-0.01em] text-ink">Applications</h2>
              <ul className="mt-3 space-y-2.5">
                {product.applications.map((app) => (
                  <li key={app} className="flex gap-2.5 text-[15px] leading-snug text-ink/60">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                    {app}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div id="product-details" className="scroll-mt-24 border-t border-black/[0.06] bg-white">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-5 lg:px-6 xl:px-8">
          <div
            role="tablist"
            className="flex gap-0 overflow-x-auto border-b border-black/[0.08] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
                className={`cursor-target relative shrink-0 px-4 py-4 text-[14px] font-semibold transition sm:px-5 sm:text-[15px] ${
                  tab === t.id ? "text-brand" : "text-ink/45 hover:text-ink/70"
                }`}
              >
                {t.label}
                {tab === t.id && (
                  <motion.span
                    layoutId="pdp-tab"
                    className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-brand"
                  />
                )}
              </button>
            ))}
          </div>

          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22 }}
            className="py-10 sm:py-12"
          >
            {tab === "description" && (
              <div className="max-w-3xl space-y-5 text-[16px] leading-relaxed text-ink/65">
                {descriptionBlocks.map((para) => (
                  <p key={para.slice(0, 40)}>{para}</p>
                ))}
                <dl className="mt-2 grid gap-3 border-t border-black/[0.06] pt-6 sm:grid-cols-2">
                  {product.variant && (
                    <div>
                      <dt className="text-[12px] font-semibold uppercase tracking-[0.12em] text-ink/35">
                        Variant
                      </dt>
                      <dd className="mt-1 font-medium text-ink">{product.variant}</dd>
                    </div>
                  )}
                  {product.material && (
                    <div>
                      <dt className="text-[12px] font-semibold uppercase tracking-[0.12em] text-ink/35">
                        Material
                      </dt>
                      <dd className="mt-1 font-medium text-ink">{product.material}</dd>
                    </div>
                  )}
                </dl>
                {product.specs?.length > 0 && (
                  <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
                    {product.specs.map((row) => (
                      <div
                        key={row.label}
                        className="rounded-xl border border-black/[0.06] bg-[#fafafa] px-4 py-3"
                      >
                        <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-ink/35">
                          {row.label}
                        </p>
                        <p className="mt-1 text-[15px] font-medium text-ink">{row.value}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {tab === "documents" && (
              <div className="max-w-2xl">
                {(product.documents?.length ?? 0) === 0 ? (
                  <p className="text-[16px] text-ink/50">Documents will be listed here.</p>
                ) : (
                  <ul className="space-y-3">
                    {product.documents.map((doc) => (
                      <li key={doc.href}>
                        <a
                          href={doc.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cursor-target flex items-center justify-between gap-4 rounded-2xl border border-black/[0.08] bg-[#fafafa] px-5 py-4 transition hover:border-brand/40 hover:bg-white"
                        >
                          <span>
                            <span className="block text-[16px] font-semibold text-ink">
                              {doc.title}
                            </span>
                            <span className="mt-0.5 block text-[13px] text-ink/40">
                              {doc.type || "File"}
                            </span>
                          </span>
                          <span className="inline-flex h-9 items-center rounded-full bg-ink px-4 text-[13px] font-semibold text-white">
                            Download
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {tab === "load" && (
              <div className="space-y-8">
                {!hasLoadContent ? (
                  <p className="text-[16px] text-ink/50">Load charts coming soon.</p>
                ) : (
                  <>
                    {(product.loadCharts || []).map((chart) => (
                      <figure
                        key={chart.src}
                        className="overflow-hidden rounded-2xl bg-white ring-1 ring-black/[0.06]"
                      >
                        <figcaption className="border-b border-black/[0.05] px-5 py-3 text-[14px] font-semibold text-ink">
                          {chart.title}
                        </figcaption>
                        <div className="relative mx-auto aspect-[4/3] w-full max-w-4xl sm:aspect-[16/10]">
                          <Image
                            src={chart.src}
                            alt={chart.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 900px"
                            className="object-contain p-4 sm:p-6"
                          />
                        </div>
                      </figure>
                    ))}

                    {technicalDatasheets.length > 0 && (
                      <div>
                        <h3 className="text-[16px] font-bold text-ink">Technical datasheets</h3>
                        <ul className="mt-4 max-w-2xl space-y-3">
                          {technicalDatasheets.map((doc) => (
                            <li key={doc.href}>
                              <a
                                href={doc.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="cursor-target flex items-center justify-between gap-4 rounded-2xl border border-black/[0.08] bg-[#fafafa] px-5 py-4 transition hover:border-brand/40 hover:bg-white"
                              >
                                <span>
                                  <span className="block text-[16px] font-semibold text-ink">
                                    {doc.title}
                                  </span>
                                  <span className="mt-0.5 block text-[13px] text-ink/40">
                                    {doc.type || "PDF"}
                                  </span>
                                </span>
                                <span className="inline-flex h-9 items-center rounded-full bg-ink px-4 text-[13px] font-semibold text-white">
                                  Download
                                </span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {tab === "features" && (
              <ul className="grid max-w-4xl gap-3 sm:grid-cols-2">
                {(product.features || []).map((f) => (
                  <li
                    key={f}
                    className="flex gap-3 rounded-2xl border border-black/[0.06] bg-[#fafafa] px-4 py-4 text-[15px] font-medium leading-snug text-ink"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
            )}

            {tab === "applications" && (
              <div className="grid gap-8 lg:grid-cols-2">
                <div>
                  <h3 className="text-[16px] font-bold text-ink">Applications</h3>
                  <ul className="mt-4 space-y-3">
                    {(product.applications || []).map((app) => (
                      <li key={app} className="flex gap-2.5 text-[15px] leading-snug text-ink/65">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                        {app}
                      </li>
                    ))}
                  </ul>
                  {(product.advantages?.length ?? 0) > 0 && (
                    <>
                      <h3 className="mt-8 text-[16px] font-bold text-ink">Advantages</h3>
                      <ul className="mt-4 space-y-3">
                        {product.advantages.map((a) => (
                          <li key={a} className="flex gap-2.5 text-[15px] leading-snug text-ink/65">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                            {a}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
                {product.applicationImage && (
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white ring-1 ring-black/[0.06]">
                    <Image
                      src={product.applicationImage}
                      alt="Applications and advantages"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-contain p-4"
                    />
                  </div>
                )}
              </div>
            )}

            {tab === "installation" && (
              <div className="grid gap-8 lg:grid-cols-2">
                <ol className="space-y-4">
                  {(product.installationSteps || []).map((step, i) => (
                    <li key={step} className="flex gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-[13px] font-bold text-white">
                        {i + 1}
                      </span>
                      <p className="pt-1 text-[15px] leading-relaxed text-ink/65">{step}</p>
                    </li>
                  ))}
                </ol>
                {product.installationImage && (
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-white ring-1 ring-black/[0.06]">
                    <Image
                      src={product.installationImage}
                      alt="Installation guide"
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-contain p-4"
                    />
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="border-t border-black/[0.06] bg-[#fafafa]">
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
