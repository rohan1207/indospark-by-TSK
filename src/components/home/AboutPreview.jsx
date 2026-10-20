"use client";

import Image from "next/image";
import Link from "next/link";

const IMAGES = [
  {
    src: "/images/banners/chemical-mortars.png",
    alt: "ICFS chemical anchor mortars",
  },
  {
    src: "/images/banners/mechanical-anchors.png",
    alt: "ICFS mechanical anchors",
  },
  {
    src: "/images/banners/design-software.png",
    alt: "ICFS anchor design software",
  },
];

export default function AboutPreview() {
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
              Many companies talk about service. We deliver the right fastener — and let results
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
            From Kolhapur to sites across India — the same goal: the right product, on time.
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
              <iframe
                className="absolute inset-0 h-full w-full border-0"
                src="https://www.youtube.com/embed/BmEwjzdobek?si=8WmTqsks2JkbLt3j"
                title="ICFS introduction"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            {IMAGES.map((img) => (
              <div key={img.src} className="relative overflow-hidden rounded-2xl">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 1024px) 33vw, 18vw"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
