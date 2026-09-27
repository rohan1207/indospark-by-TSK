"use client";

import Image from "next/image";
import Link from "next/link";

const IMAGES = [
  {
    src: "/images/banners/chemical-mortars.png",
    alt: "ICFS chemical fastening systems",
  },
  {
    src: "/images/banners/mechanical-anchors.png",
    alt: "ICFS mechanical anchors",
  },
  {
    src: "/images/banners/design-software.png",
    alt: "ICFS Anchor Designer app",
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
        {/* Left — copy */}
        <div className="lg:col-span-5">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[11px] font-semibold tracking-wide text-ink shadow-[0_1px_0_rgba(0,0,0,0.03)] ring-1 ring-black/8">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-brand/10 text-[9px] text-brand" aria-hidden>
              ✦
            </span>
            43 years of expertise
          </span>

          <h2
            id="about-preview-heading"
            className="mt-4 max-w-md text-[clamp(1.6rem,3vw,2.4rem)] font-bold leading-[1.12] tracking-[-0.03em] text-ink sm:mt-5"
          >
            Welcome to Indo-Spark Construction Services
          </h2>

          <p className="mt-3 max-w-md text-[13px] leading-relaxed text-ink/55 sm:mt-4 sm:text-[14px]">
            The home of Indo Construction Fastening Systems. From day one, our focus has been
            simple — the right product on time, so the job keeps moving. We serve sites worldwide,
            including Solapur, Hyderabad, Bengaluru, Chiplun, and Mumbai.
          </p>

          {/* Three verticals as quiet chips */}
          <ul className="mt-4 flex max-w-md flex-wrap gap-2" aria-label="Business verticals">
            {["ICFS Anchors", "Cutting & drilling", "Anchor Designer"].map((label) => (
              <li
                key={label}
                className="rounded-full bg-white/80 px-3 py-1 text-[11px] font-medium text-ink/60 ring-1 ring-black/[0.06]"
              >
                {label}
              </li>
            ))}
          </ul>

          {/* Quote card */}
          <blockquote className="relative mt-5 max-w-md overflow-hidden rounded-2xl bg-white p-5 shadow-[0_8px_28px_rgba(0,0,0,0.04)] ring-1 ring-black/[0.06] sm:mt-6 sm:rounded-3xl sm:p-6">
            <span
              className="pointer-events-none absolute -right-1 -top-3 font-display text-[6.5rem] leading-none text-brand/[0.08] select-none sm:text-[7.5rem]"
              aria-hidden
            >
              ”
            </span>
            <span
              className="absolute bottom-5 left-0 top-5 w-1 rounded-r-full bg-gradient-to-b from-brand to-ink"
              aria-hidden
            />
            <p className="relative pl-3 font-display text-[15px] leading-snug tracking-[-0.01em] text-ink/85 italic sm:pl-3.5 sm:text-[17px]">
              Many companies talk about service. We simply deliver the best — and let our
              customers do the talking.
            </p>
            <footer className="relative mt-4 flex items-center gap-2.5 pl-3 sm:pl-3.5">
              <span className="h-px w-7 bg-brand/40" aria-hidden />
              <cite className="not-italic text-[10px] font-semibold uppercase tracking-[0.16em] text-ink/40 sm:text-[11px]">
                Indo-Spark ethos · since day one
              </cite>
            </footer>
          </blockquote>

          <p className="mt-4 max-w-md text-[12px] leading-relaxed text-ink/45 sm:text-[13px]">
            Jobsite sales, service, and consultation — our team shows up ready, with the right
            gear and safety kit. Prefer inventory managed at your office? We handle the hex nuts
            so you can focus on the build.
          </p>

          <Link
            href="/about"
            className="cursor-target btn-shine mt-6 inline-flex h-11 items-center rounded-full bg-ink px-6 text-[13px] font-semibold text-white transition hover:bg-brand"
          >
            Learn more about us
          </Link>
        </div>

        {/* Right — video + image grid, capped to viewport */}
        <div className="lg:col-span-7">
          <div className="grid h-[min(72svh,560px)] grid-cols-3 grid-rows-[1.15fr_0.85fr] gap-2.5 sm:gap-3 lg:h-[min(78svh,620px)]">
            <div className="relative col-span-3 overflow-hidden rounded-2xl bg-stone sm:rounded-3xl">
              <iframe
                className="absolute inset-0 h-full w-full border-0"
                src="https://www.youtube.com/embed/BmEwjzdobek?si=8WmTqsks2JkbLt3j"
                title="IndoSpark / ICFS introduction"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            {IMAGES.map((img) => (
              <div
                key={img.src}
                className="relative overflow-hidden rounded-2xl sm:rounded-3xl"
              >
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
