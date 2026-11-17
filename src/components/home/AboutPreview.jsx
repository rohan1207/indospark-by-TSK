"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const YOUTUBE_ID = "BmEwjzdobek";

const IMAGES = [
  {
    src: "/images/about-preview/chemical-injection.jpg",
    alt: "ICFS chemical injection mortar application on site",
    fit: "cover",
  },
  {
    src: "/images/about-preview/mechanical-anchor.png",
    alt: "ICFS mechanical wedge anchor",
    fit: "contain",
  },
  {
    src: "/images/about-preview/indoexpert-software.png",
    alt: "IndoExpert professional anchor design software",
    fit: "cover",
  },
];

export default function AboutPreview() {
  const [playing, setPlaying] = useState(false);

  return (
    <section
      id="about-preview"
      className="flex min-h-[100svh] items-center bg-paper py-10 sm:py-12 lg:py-14"
      aria-labelledby="about-preview-heading"
    >
      <div className="mx-auto grid w-full max-w-[1440px] items-center gap-8 px-4 sm:px-5 lg:grid-cols-12 lg:gap-10 lg:px-6 xl:gap-12 xl:px-8">
        <div className="lg:col-span-5">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[13px] font-semibold tracking-wide text-ink ring-1 ring-black/8">
            Since 1978
          </span>

          <h2
            id="about-preview-heading"
            className="mt-4 max-w-md text-[clamp(1.6rem,3vw,2.4rem)] font-bold leading-[1.12] tracking-[-0.03em] text-ink sm:mt-5"
          >
            Anchor fasteners built for real sites
          </h2>

          <p className="mt-3 max-w-md text-[16px] leading-relaxed text-ink/55 sm:mt-4">
            ICFS supplies chemical and mechanical anchors that hold when the load matters.
            Clear specs, steady stock, and support when you need to choose the right fixing.
          </p>

          <ul className="mt-4 flex max-w-md flex-wrap gap-2" aria-label="Product lines">
            {["Chemical anchors", "Mechanical anchors", "Design tools"].map((label) => (
              <li
                key={label}
                className="rounded-full bg-white/80 px-3 py-1 text-[13px] font-medium text-ink/60 ring-1 ring-black/[0.06]"
              >
                {label}
              </li>
            ))}
          </ul>

          <blockquote className="relative mt-5 max-w-md overflow-hidden rounded-2xl bg-white p-5 ring-1 ring-black/[0.06] sm:mt-6 sm:p-6">
            <p className="text-[16px] leading-snug text-ink/80 sm:text-[16px]">
              Many companies talk about service. We deliver the right fastener, and let results
              speak.
            </p>
            <footer className="mt-4 flex items-center gap-2.5">
              <span className="h-px w-7 bg-brand/40" aria-hidden />
              <cite className="not-italic text-[13px] font-semibold uppercase tracking-[0.14em] text-ink/40">
                ICFS promise
              </cite>
            </footer>
          </blockquote>

          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink/45">
            From Kolhapur to sites across India, the same goal: the right product, on time.
          </p>

          <Link
            href="/about"
            className="cursor-target btn-shine mt-6 inline-flex h-11 items-center rounded-full bg-ink px-6 text-[15px] font-semibold text-white transition hover:bg-brand"
          >
            About ICFS
          </Link>
        </div>

        <div className="lg:col-span-7">
          <div className="grid h-[min(72svh,560px)] grid-cols-3 grid-rows-[1.15fr_0.85fr] gap-2.5 sm:gap-3 lg:h-[min(78svh,620px)]">
            <div className="relative col-span-3 overflow-hidden rounded-2xl bg-stone">
              {playing ? (
                <iframe
                  className="absolute inset-0 h-full w-full border-0"
                  src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0`}
                  title="ICFS introduction"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  className="group absolute inset-0 block h-full w-full cursor-pointer"
                  aria-label="Play ICFS introduction video"
                >
                  <Image
                    src="/images/about-preview/youtube-thumb.jpg"
                    alt="ICFS introduction video"
                    fill
                    priority
                    quality={90}
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="object-cover"
                  />
                  <span className="absolute inset-0 bg-black/25 transition group-hover:bg-black/35" aria-hidden />
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white shadow-[0_10px_28px_rgba(0,0,0,0.35)] transition group-hover:scale-105 sm:h-16 sm:w-16">
                      <svg viewBox="0 0 24 24" className="h-5 w-5 translate-x-px sm:h-6 sm:w-6" fill="currentColor" aria-hidden>
                        <path d="M8 5.5v13l11-6.5L8 5.5z" />
                      </svg>
                    </span>
                  </span>
                </button>
              )}
            </div>
            {IMAGES.map((img) => (
              <div
                key={img.src}
                className="relative overflow-hidden rounded-2xl bg-white ring-1 ring-black/[0.06]"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 1024px) 33vw, 18vw"
                  className={`transition-transform duration-500 hover:scale-105 ${
                    img.fit === "contain" ? "object-contain p-3" : "object-cover"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
