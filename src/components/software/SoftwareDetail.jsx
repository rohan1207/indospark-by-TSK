"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { SOFTWARE_PRODUCTS } from "./designSoftwareData";

function FadeIn({ children, className = "", delay = 0, id }) {
  return (
    <motion.div
      id={id}
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6% 0px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function SoftwareDetail({ product }) {
  const others = SOFTWARE_PRODUCTS.filter((p) => p.slug !== product.slug);

  return (
    <article>
      <header className="relative overflow-hidden bg-[#12151a] text-white">
        <div className="absolute inset-0 opacity-40">
          <Image src={product.image} alt="" fill className="object-cover object-top" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-[#12151a] via-[#12151a]/92 to-[#12151a]/55" />
        </div>
        <div className="relative mx-auto max-w-[1440px] px-4 py-14 sm:px-5 sm:py-16 lg:px-6 lg:py-20 xl:px-8">
          <Link
            href="/design-software"
            className="text-[14px] font-semibold uppercase tracking-[0.14em] text-white/45 transition hover:text-white"
          >
            ← All design software
          </Link>
          <p className="mt-5 text-[13px] font-semibold uppercase tracking-[0.2em] text-brand">
            {product.eyebrow}
          </p>
          <h1 className="mt-3 max-w-3xl text-[clamp(1.85rem,4vw,3.1rem)] font-bold leading-[1.05] tracking-[-0.035em]">
            {product.title}
          </h1>
          <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-white/65 sm:text-[16px]">
            {product.hero}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {product.platforms.map((p) => (
              <span
                key={p}
                className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[13px] font-semibold uppercase tracking-[0.1em] text-white/85"
              >
                {p}
              </span>
            ))}
            <span className="rounded-full border border-white/15 px-3 py-1 text-[13px] font-semibold uppercase tracking-[0.1em] text-white/55">
              {product.category}
            </span>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/contact?intent=software-download&product=${product.slug}`}
              className="cursor-target btn-shine inline-flex h-11 items-center rounded-full bg-brand px-6 text-[15px] font-semibold text-white transition hover:bg-white hover:text-ink"
            >
              {product.downloadLabel}
            </Link>
            <a
              href="#modules"
              className="cursor-target inline-flex h-11 items-center rounded-full border border-white/25 px-6 text-[15px] font-semibold text-white transition hover:border-white hover:bg-white/10"
            >
              Explore modules
            </a>
          </div>
        </div>
      </header>

      <div className="border-b border-black/[0.06] bg-white">
        <div className="mx-auto grid max-w-[1440px] grid-cols-3 divide-x divide-black/[0.06]">
          {product.stats.map((s) => (
            <div key={s.label} className="px-4 py-6 sm:px-8 sm:py-8">
              <p className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold tracking-[-0.04em] text-ink">
                {s.value}
              </p>
              <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.14em] text-ink/40">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-[1440px] gap-12 px-4 py-14 sm:px-5 sm:py-16 lg:grid-cols-12 lg:gap-14 lg:px-6 lg:py-20 xl:px-8">
        <div className="space-y-14 lg:col-span-7">
          <FadeIn>
            <h2 className="text-[13px] font-semibold uppercase tracking-[0.2em] text-brand">
              Overview
            </h2>
            <p className="mt-3 text-[16px] leading-relaxed text-ink/60 sm:text-[16px]">
              {product.overview}
            </p>
            <p className="mt-4 text-[18px] font-semibold leading-snug text-ink/80 sm:text-[20px]">
              {product.tagline}
            </p>
          </FadeIn>

          <FadeIn>
            <h2 className="text-[13px] font-semibold uppercase tracking-[0.2em] text-brand">
              What you get
            </h2>
            <ul className="mt-4 space-y-3">
              {product.outputs.map((item) => (
                <li key={item} className="flex gap-3 text-[16px] text-ink/70 sm:text-[16px]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn id="workflow">
            <h2 className="text-[13px] font-semibold uppercase tracking-[0.2em] text-brand">
              Typical workflow
            </h2>
            <ol className="mt-6 space-y-0 border-l border-black/[0.08]">
              {product.workflow.map((w) => (
                <li key={w.step} className="relative py-4 pl-6 sm:pl-8">
                  <span
                    className="absolute -left-[5px] top-6 h-2.5 w-2.5 rounded-full bg-brand"
                    aria-hidden
                  />
                  <p className="font-bold text-[16px] text-brand/80">{w.step}</p>
                  <p className="mt-0.5 text-[16px] font-bold tracking-[-0.02em] text-ink sm:text-[16px]">
                    {w.title}
                  </p>
                  <p className="mt-1 text-[15px] leading-relaxed text-ink/55 sm:text-[16px]">
                    {w.text}
                  </p>
                </li>
              ))}
            </ol>
          </FadeIn>

          <FadeIn>
            <h2 className="text-[13px] font-semibold uppercase tracking-[0.2em] text-brand">
              Built for
            </h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {product.audience.map((a) => (
                <li
                  key={a}
                  className="border-l-2 border-brand/40 pl-3 text-[15px] leading-snug text-ink/65 sm:text-[16px]"
                >
                  {a}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>

        <aside className="lg:col-span-5">
          <div className="sticky top-32 space-y-5">
            <div className="overflow-hidden rounded-[1.5rem] bg-paper ring-1 ring-black/[0.06] sm:rounded-[1.75rem]">
              <div className="relative aspect-[16/10]">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover object-top"
                  sizes="40vw"
                />
              </div>
              <div className="p-5 sm:p-6">
                <p className="text-[15px] leading-relaxed text-ink/55">{product.downloadNote}</p>
                <Link
                  href={`/contact?intent=software-download&product=${product.slug}`}
                  className="cursor-target btn-shine mt-4 inline-flex h-11 w-full items-center justify-center rounded-full bg-ink text-[15px] font-semibold text-white transition hover:bg-brand"
                >
                  {product.downloadLabel}
                </Link>
                <Link
                  href="/contact"
                  className="mt-2 inline-flex h-10 w-full items-center justify-center text-[14px] font-semibold text-ink/45 transition hover:text-brand"
                >
                  Ask a technical question →
                </Link>
              </div>
            </div>

            <div className="rounded-[1.25rem] bg-white p-5 ring-1 ring-black/[0.06]">
              <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-ink/35">
                System notes
              </p>
              <ul className="mt-3 space-y-2">
                {product.requirements.map((r) => (
                  <li key={r} className="text-[15px] leading-snug text-ink/60">
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[1.25rem] bg-white p-5 ring-1 ring-black/[0.06]">
              <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-ink/35">
                Other software
              </p>
              <ul className="mt-3 space-y-1">
                {others.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/design-software/${s.slug}`}
                      className="cursor-target block rounded-lg px-2 py-2.5 text-[15px] font-medium text-ink/65 transition hover:bg-paper hover:text-brand"
                    >
                      {s.shortTitle}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>

      <section id="modules" className="scroll-mt-28 border-t border-black/[0.06] bg-paper py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-5 lg:px-6 xl:px-8">
          <FadeIn className="max-w-2xl">
            <h2 className="text-[13px] font-semibold uppercase tracking-[0.2em] text-brand">
              Modules & capabilities
            </h2>
            <p className="mt-3 text-[clamp(1.5rem,2.8vw,2.25rem)] font-bold tracking-[-0.03em] text-ink">
              What&apos;s inside this product
            </p>
          </FadeIn>

          <div className="mt-10 space-y-12 lg:mt-14 lg:space-y-16">
            {product.modules.map((mod, i) => (
              <FadeIn
                key={mod.id}
                delay={i * 0.04}
                className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12"
              >
                <div
                  className={`relative aspect-[4/3] overflow-hidden rounded-[1.35rem] bg-white lg:col-span-5 ${
                    i % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  <Image
                    src={mod.image}
                    alt={mod.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
                <div className={`lg:col-span-7 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <p className="font-bold text-[22px] text-brand/70">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 text-[clamp(1.25rem,2.2vw,1.65rem)] font-bold tracking-[-0.03em] text-ink">
                    {mod.title}
                  </h3>
                  <p className="mt-2 text-[16px] font-medium text-ink/70 sm:text-[16px]">
                    {mod.summary}
                  </p>
                  <p className="mt-3 text-[16px] leading-relaxed text-ink/55 sm:text-[16px]">
                    {mod.detail}
                  </p>
                  <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                    {mod.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex gap-2 text-[15px] leading-snug text-ink/65"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-5 lg:px-6 xl:px-8">
          <div className="flex flex-col items-start justify-between gap-6 border-t border-black/[0.08] pt-10 sm:flex-row sm:items-center">
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-ink/35">
                Next step
              </p>
              <p className="mt-2 text-[clamp(1.25rem,2.2vw,1.65rem)] font-bold tracking-[-0.03em] text-ink">
                Ready to install {product.shortTitle}?
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/contact?intent=software-download&product=${product.slug}`}
                className="cursor-target btn-shine inline-flex h-11 items-center rounded-full bg-ink px-6 text-[15px] font-semibold text-white transition hover:bg-brand"
              >
                {product.downloadLabel}
              </Link>
              <Link
                href="/design-software"
                className="cursor-target inline-flex h-11 items-center rounded-full border border-black/10 px-6 text-[15px] font-semibold text-ink transition hover:border-brand/40 hover:text-brand"
              >
                Back to suite
              </Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}
