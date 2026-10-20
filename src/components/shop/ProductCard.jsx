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

function IconEye({ className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M2.5 12s3.5-6.5 9.5-6.5S21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="2.6" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export default function ProductCard({ product, showCategory = false }) {
  const { addToCart, toggleWishlist, isWishlisted } = useCartWishlist();
  const wishlisted = isWishlisted(product.id);
  const price = product.priceLabel || product.price;
  const href = product.href || (product.slug ? `/shop/${product.slug}` : "/shop");

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-white transition-shadow duration-300 hover:shadow-[0_14px_36px_rgba(0,0,0,0.07)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#f5f5f5]">
        <Link href={href} className="absolute inset-0 block">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-contain p-5 transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </Link>

        {product.tag && (
          <span className="pointer-events-none absolute left-3 top-3 z-10 rounded-full bg-brand px-2.5 py-1 text-[12px] font-bold uppercase tracking-[0.08em] text-white">
            {product.tag}
          </span>
        )}

        <div className="absolute right-3 top-3 z-10 flex flex-col gap-2 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
          <button
            type="button"
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product.id);
            }}
            className={`cursor-target inline-flex h-9 w-9 items-center justify-center rounded-full border bg-white shadow-sm transition hover:border-brand hover:text-brand ${
              wishlisted ? "border-brand text-brand" : "border-black/8 text-ink/60"
            }`}
          >
            <IconHeart filled={wishlisted} />
          </button>
          <Link
            href={href}
            aria-label="View product"
            className="cursor-target inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/8 bg-white text-ink/60 shadow-sm transition hover:border-brand hover:text-brand"
          >
            <IconEye />
          </Link>
          <button
            type="button"
            aria-label="Add to cart"
            onClick={(e) => {
              e.preventDefault();
              addToCart(product.id, 1, { open: true });
            }}
            className="cursor-target inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/8 bg-white text-ink/60 shadow-sm transition hover:border-brand hover:bg-brand hover:text-white"
          >
            <IconBag />
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-3.5 sm:px-5 sm:pb-5">
        {showCategory && product.categoryLabel && (
          <p className="mb-1 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink/35">
            {product.categoryLabel}
          </p>
        )}
        <Link href={href}>
          <h3 className="line-clamp-2 min-h-[2.6em] text-[15px] font-semibold leading-snug tracking-[-0.01em] text-ink transition hover:text-brand sm:text-[16px]">
            {product.name}
          </h3>
        </Link>
        <div className="mt-auto flex items-center justify-between gap-3 pt-3">
          <p className="text-[16px] font-bold text-ink sm:text-[16px]">{price}</p>
          <button
            type="button"
            onClick={() => addToCart(product.id, 1, { open: true })}
            className="cursor-target btn-shine inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1.5 text-[13px] font-semibold text-white transition hover:bg-brand sm:text-[14px]"
          >
            <IconBag className="h-3.5 w-3.5" />
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
