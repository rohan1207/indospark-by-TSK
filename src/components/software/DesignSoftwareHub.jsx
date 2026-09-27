"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { SOFTWARE_PLATFORMS, SOFTWARE_PRODUCTS } from "./designSoftwareData";

function FadeIn({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6% 0px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function DesignSoftwareHub() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-black/[0.06] bg-[#f4f4f4]">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.045) 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-24 top-1/4 h-[320px] w-[320px] rounded-full bg-brand/[0.07] blur-[90px]"
          aria-hidden
        />

        <div className="relative mx-auto grid max-w-[1440px] items-center gap-10 px-4 py-14 sm:px-5 sm:py-16 lg:grid-cols-12 lg:gap-12 lg:px-6 lg:py-20 xl:px-8">
          <div className="lg:col-span-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
              Design software
            </p>
            <h1 className="mt-3 max-w-xl text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.04em] text-ink">
              Size the fixing.
              <br />
              <span className="text-brand">Order with confidence.</span>
            </h1>
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-ink/55 sm:text-[16px]">
              ICFS and IndoExperts tools for chemical and mechanical anchor design — from on-site
              mobile checks to desktop calculation suites for installation.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#suite"
                className="cursor-target btn-shine inline-flex h-11 items-center rounded-full bg-ink px-6 text-[13px] font-semibold text-white transition hover:bg-brand"
              >
                Browse the suite
              </a>
              <Link
                href="/contact?intent=software"
                className="cursor-target inline-flex h-11 items-center rounded-full border border-black/10 bg-white px-6 text-[13px] font-semibold text-ink transition hover:border-brand/40 hover:text-brand"
              >
                Request download
              </Link>
            </div>
          </div>

          <FadeIn className="relative aspect-[16/10] overflow-hidden rounded-[1.5rem] lg:col-span-6 sm:rounded-[2rem]">
            <Image
              src="/images/software/suite-overview.png"
              alt="ICFS and IndoExperts design software suite"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-top"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-ink/25 via-transparent to-transparent"
              aria-hidden
            />
          </FadeIn>
        </div>
      </section>

      <section className="border-b border-black/[0.06] bg-white">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 divide-y divide-black/[0.06] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {SOFTWARE_PLATFORMS.map((p) => (
            <div key={p.label} className="px-4 py-6 sm:px-8 sm:py-8">
              <p className="font-display text-[22px] text-ink sm:text-[26px]">{p.label}</p>
              <p className="mt-1 text-[13px] text-ink/45">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="suite" className="scroll-mt-28 bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-5 lg:px-6 xl:px-8">
          <FadeIn className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
              The suite
            </p>
            <h2 className="mt-3 text-[clamp(1.75rem,3.2vw,2.75rem)] font-bold tracking-[-0.035em] text-ink">
              Three tools. One fastening house.
            </h2>
            <p className="mt-3 text-[14px] leading-relaxed text-ink/55 sm:text-[15px]">
              Mobile chemical design, desktop chemical calculation, and professional mechanical
              design — pick the workspace that matches the job.
            </p>
          </FadeIn>

          <div className="mt-12 space-y-16 lg:mt-16 lg:space-y-24">
            {SOFTWARE_PRODUCTS.map((product, index) => {
              const reverse = index % 2 === 1;
              return (
                <FadeIn
                  key={product.slug}
                  delay={index * 0.04}
                  className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12"
                >
                  <div
                    className={`relative aspect-[16/10] overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] lg:col-span-7 ${
                      reverse ? "lg:order-2" : ""
                    }`}
                  >
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      className="object-cover object-top"
                    />
                  </div>

                  <div className={`lg:col-span-5 ${reverse ? "lg:order-1" : ""}`}>
                    <span className="font-display text-[28px] text-brand/65 sm:text-[34px]">
                      {product.code}
                    </span>
                    <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/35">
                      {product.eyebrow}
                    </p>
                    <h3 className="mt-2 text-[clamp(1.35rem,2.4vw,1.85rem)] font-bold leading-snug tracking-[-0.03em] text-ink">
                      {product.title}
                    </h3>
                    <p className="mt-3 text-[14px] leading-relaxed text-ink/55 sm:text-[15px]">
                      {product.short}
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {product.highlights.map((h) => (
                        <li
                          key={h}
                          className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink/40"
                        >
                          <span className="text-brand">·</span> {h}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-7 flex flex-wrap gap-3">
                      <Link
                        href={`/design-software/${product.slug}`}
                        className="cursor-target btn-shine inline-flex h-11 items-center rounded-full bg-ink px-6 text-[13px] font-semibold text-white transition hover:bg-brand"
                      >
                        View details
                      </Link>
                      <Link
                        href={`/contact?intent=software-download&product=${product.slug}`}
                        className="cursor-target inline-flex h-11 items-center rounded-full border border-black/10 px-6 text-[13px] font-semibold text-ink transition hover:border-brand/40 hover:text-brand"
                      >
                        {product.downloadLabel}
                      </Link>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-black/[0.06] bg-paper py-16 sm:py-20">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-5 lg:px-6 xl:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <FadeIn className="lg:col-span-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
                Why use it
              </p>
              <h2 className="mt-3 text-[clamp(1.6rem,3vw,2.4rem)] font-bold tracking-[-0.035em] text-ink">
                From load case to cartridge count — without the guesswork.
              </h2>
            </FadeIn>
            <FadeIn delay={0.06} className="lg:col-span-5">
              <p className="text-[14px] leading-relaxed text-ink/55 sm:text-[15px]">
                Pair the software with ICFS ETA-backed products and IndoSpark site support — so
                design, procurement, and installation stay in the same language.
              </p>
            </FadeIn>
          </div>

          <div className="mt-10 grid gap-8 border-t border-black/[0.08] pt-10 sm:grid-cols-3">
            {[
              {
                title: "Faster site answers",
                text: "Mobile modules for chemical sizing, layered substrates, and cutting volume when the crew is already on the pour.",
              },
              {
                title: "Desktop depth",
                text: "IndoExperts suites for chemical and mechanical calculation when drawings and load combinations need a fuller pass.",
              },
              {
                title: "ICFS-aligned",
                text: "Recommendations stay inside the product families your warehouse, training, and pull-out tests already use.",
              },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.05}>
                <p className="font-display text-[20px] text-ink sm:text-[22px]">{item.title}</p>
                <p className="mt-2 text-[13px] leading-relaxed text-ink/55 sm:text-[14px]">
                  {item.text}
                </p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink py-14 text-white sm:py-16">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-5 lg:px-6 xl:px-8">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">
              Get the installer
            </p>
            <h2 className="mt-2 text-[clamp(1.4rem,2.5vw,2rem)] font-bold tracking-[-0.03em]">
              Need a licence key or the latest build?
            </h2>
          </div>
          <Link
            href="/contact?intent=software"
            className="cursor-target btn-shine inline-flex h-11 shrink-0 items-center rounded-full bg-brand px-6 text-[13px] font-semibold text-white transition hover:bg-white hover:text-ink"
          >
            Talk to technical sales
          </Link>
        </div>
      </section>
    </>
  );
}
