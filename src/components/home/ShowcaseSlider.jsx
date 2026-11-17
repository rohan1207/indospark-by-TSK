"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const SLIDES = [
  {
    id: "mortars",
    eyebrow: "Chemical Mortars",
    title: "ICFS Chemical Mortars",
    description:
      "Injectable mortars for rebaring, façades, and heavy fixing in concrete and masonry.",
    cta: "Shop chemical mortars",
    href: "/shop?category=mortars",
    image: "/images/categories/mortars-cm350vesf.png",
    alt: "ICFS CM350VESF vinyl ester styrene-free injection resin",
    fit: "contain",
  },
  {
    id: "studs",
    eyebrow: "Chemical Anchor Studs",
    title: "Threaded Rod Studs",
    description:
      "Anchor studs with nuts and washers matched to ICFS chemical systems.",
    cta: "Shop anchor studs",
    href: "/shop?category=studs",
    image: "/images/categories/studs.png",
    alt: "ICFS chemical anchor studs",
  },
  {
    id: "mechanical",
    eyebrow: "Mechanical Anchors",
    title: "ICFS Mechanical Anchors",
    description:
      "Wedge anchors and related hardware for reliable hold in concrete and masonry.",
    cta: "Shop mechanical anchors",
    href: "/shop?category=mechanical",
    image: "/images/categories/mechanical.png",
    alt: "ICFS mechanical anchors",
  },
  {
    id: "guns",
    eyebrow: "Chemical Guns",
    title: "ICFS Chemical Guns",
    description:
      "Dispenser and rebaring caulking guns for clean, consistent mortar application.",
    cta: "Shop chemical guns",
    href: "/shop?category=guns",
    image: "/images/categories/guns.png",
    alt: "ICFS chemical guns",
  },
];

const AUTO_MS = 2800;

const slideVariants = {
  enter: (dir) => ({
    x: dir > 0 ? "100%" : "-100%",
    opacity: 1,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir) => ({
    x: dir > 0 ? "-100%" : "100%",
    opacity: 1,
  }),
};

function IconChevron({ dir = "left", className = "h-4 w-4" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      {dir === "left" ? (
        <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}

export default function ShowcaseSlider() {
  const [[index, direction], setPage] = useState([0, 0]);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(null);
  const lock = useRef(false);

  const slide = SLIDES[index];
  const count = SLIDES.length;

  const goTo = useCallback(
    (next, dir) => {
      if (lock.current) return;
      lock.current = true;
      const normalized = ((next % count) + count) % count;
      setPage([normalized, dir]);
      window.setTimeout(() => {
        lock.current = false;
      }, 650);
    },
    [count]
  );

  const next = useCallback(() => goTo(index + 1, 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1, -1), [goTo, index]);

  useEffect(() => {
    if (paused) return undefined;
    const id = window.setInterval(() => {
      setPage(([i]) => [((i + 1) % count + count) % count, 1]);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [paused, count]);

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    if (touchStartX.current == null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 48) return;
    if (delta < 0) next();
    else prev();
  };

  return (
    <section
      id="showcase"
      className="bg-white"
      aria-roledescription="carousel"
      aria-label="Featured products and design tools"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-[1440px] px-4 pt-10 sm:px-5 sm:pt-12 lg:px-6 xl:px-8">
        <div className="mb-6 flex items-end justify-between gap-4 sm:mb-7">
          <div>
            <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-brand">
              Spotlight
            </p>
            <h2 className="mt-1.5 text-[clamp(1.45rem,2.8vw,2rem)] font-bold tracking-[-0.03em] text-ink">
              Products &amp; design tools
            </h2>
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous slide"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-ink transition hover:border-brand hover:text-brand"
            >
              <IconChevron dir="left" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next slide"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-ink transition hover:border-brand hover:text-brand"
            >
              <IconChevron dir="right" />
            </button>
          </div>
        </div>
      </div>

      {/* Full-bleed banner track */}
      <div
        className="relative mx-auto w-full max-w-[1440px] overflow-hidden px-4 sm:px-5 lg:px-6 xl:px-8"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[1.25rem] bg-white ring-1 ring-black/[0.06] sm:aspect-[21/9] sm:rounded-[1.5rem] lg:h-[min(28rem,52vw)] lg:aspect-auto">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={slide.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "tween", duration: 0.7, ease: [0.22, 1, 0.36, 1] },
              }}
              className="absolute inset-0"
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={index === 0}
                sizes="(max-width: 1440px) 100vw, 1440px"
                className={
                  slide.fit === "contain"
                    ? "object-contain object-right p-4 sm:p-6 lg:p-8"
                    : "object-cover"
                }
              />

              {/* Readable gradient, softer on product-contain slides */}
              <div
                className={
                  slide.fit === "contain"
                    ? "absolute inset-0 bg-gradient-to-r from-black/78 via-black/45 to-transparent sm:from-black/70 sm:via-black/35"
                    : "absolute inset-0 bg-gradient-to-r from-black/72 via-black/40 to-black/15"
                }
                aria-hidden
              />

              <div className="absolute inset-0 flex items-end p-5 sm:items-center sm:p-8 lg:p-12">
                <div className="max-w-xl">
                  <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-white/70">
                    {slide.eyebrow}
                  </p>
                  <h3 className="mt-2 text-[clamp(1.45rem,3.2vw,2.35rem)] font-bold leading-[1.12] tracking-[-0.03em] text-white">
                    {slide.title}
                  </h3>
                  <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/75 sm:text-[16px]">
                    {slide.description}
                  </p>
                  <Link
                    href={slide.href}
                    className="cursor-target btn-shine mt-5 inline-flex h-11 items-center rounded-full bg-white px-5 text-[15px] font-semibold text-ink transition hover:bg-brand hover:text-white sm:mt-6"
                  >
                    {slide.cta}
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Mobile arrows */}
          <div className="absolute bottom-4 right-4 z-10 flex gap-2 sm:hidden">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous slide"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-ink"
            >
              <IconChevron dir="left" className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next slide"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-ink"
            >
              <IconChevron dir="right" className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Dots */}
        <div className="mt-4 flex items-center justify-center gap-2 pb-10 sm:pb-12">
          {SLIDES.map((item, i) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              onClick={() => goTo(i, i > index ? 1 : -1)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-7 bg-brand" : "w-1.5 bg-ink/20 hover:bg-ink/35"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
