"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartWishlist } from "./CartWishlistContext";

function IconHeart({ filled = false, className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill={filled ? "currentColor" : "none"}>
      <path
        d="M12 20s-7-4.4-9.2-8.2C1.2 8.6 3 5.5 6.4 5.2c1.8-.2 3.4.7 4.4 2 1-1.3 2.6-2.2 4.4-2 3.4.3 5.2 3.4 3.6 6.6C19 15.6 12 20 12 20Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconBag({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M3.5 5h1.8l1.4 11.2a1.5 1.5 0 0 0 1.5 1.3h9.1a1.5 1.5 0 0 0 1.5-1.2L20.5 8H7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9.5" cy="20" r="1.2" fill="currentColor" />
      <circle cx="17" cy="20" r="1.2" fill="currentColor" />
    </svg>
  );
}

function IconCompare({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M7 4v16M17 4v16M4 8h6M14 16h6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function ProductCard({ product, showCategory = false }) {
  const { addToCart, toggleWishlist, isWishlisted, toggleCompare, isInCompare } =
    useCartWishlist();
  const wishlisted = isWishlisted(product.id);
  const inCompare = isInCompare(product.id);
  const price = product.priceLabel || product.price;
  const href = product.href || (product.slug ? `/shop/${product.slug}` : "/shop");
  const title = product.shortName || product.name;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.25rem] bg-white ring-1 ring-black/[0.06] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)] hover:ring-black/10">
      <div className="relative aspect-[5/4] overflow-hidden bg-white">
        <Link href={href} className="absolute inset-0 block">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-contain p-6 transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          />
        </Link>

        {product.tag && (
          <span className="pointer-events-none absolute left-3 top-3 z-10 rounded-full bg-ink/90 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-white">
            {product.tag}
          </span>
        )}

        <div className="absolute right-3 top-3 z-10 flex flex-col gap-2">
          <button
            type="button"
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product.id);
            }}
            className={`cursor-target inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-sm ring-1 transition hover:text-brand ${
              wishlisted ? "text-brand ring-brand/30" : "text-ink/50 ring-black/5"
            }`}
          >
            <IconHeart filled={wishlisted} />
          </button>
          <button
            type="button"
            aria-label={inCompare ? "Remove from compare" : "Add to compare"}
            onClick={(e) => {
              e.preventDefault();
              toggleCompare(product.id);
            }}
            className={`cursor-target inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-sm ring-1 transition hover:text-brand ${
              inCompare ? "text-brand ring-brand/30" : "text-ink/50 ring-black/5"
            }`}
          >
            <IconCompare />
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-3.5 sm:px-5 sm:pb-5">
        {showCategory && product.categoryLabel && (
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
            {product.categoryLabel}
          </p>
        )}
        <Link href={href}>
          <h3 className="line-clamp-2 min-h-[2.7em] text-[15px] font-semibold leading-snug tracking-[-0.015em] text-ink transition hover:text-brand sm:text-[16px]">
            {title}
          </h3>
        </Link>

        <div className="mt-3 flex flex-wrap items-baseline gap-2">
          <p className="text-[17px] font-bold tracking-[-0.02em] text-brand sm:text-[18px]">
            {price}
          </p>
          {product.compareAtLabel && (
            <p className="text-[13px] font-medium text-ink/35 line-through">
              {product.compareAtLabel}
            </p>
          )}
        </div>

        <div className="mt-auto flex items-center gap-2 pt-4">
          <button
            type="button"
            onClick={() => addToCart(product.id, 1, { open: true })}
            className="cursor-target btn-shine inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-full bg-brand text-[13px] font-semibold text-white transition hover:bg-brand-deep sm:text-[14px]"
          >
            <IconBag className="h-3.5 w-3.5" />
            Add to cart
          </button>
          <Link
            href={href}
            className="cursor-target inline-flex h-10 items-center justify-center rounded-full border border-black/10 px-3.5 text-[13px] font-semibold text-ink/70 transition hover:border-brand hover:text-brand sm:text-[14px]"
          >
            View
          </Link>
        </div>
      </div>
    </article>
  );
}
