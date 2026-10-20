"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { SERVICES } from "./servicesData";

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

export default function ServicesHub() {
  return (
    <>
      <section className="relative overflow-hidden bg-white">
        <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-5 sm:py-12 lg:px-6 lg:py-14 xl:px-8">
          <div className="grid items-end gap-6 lg:grid-cols-2 lg:gap-12">
            <div>
              <span className="inline-flex rounded-full border border-brand/40 px-3.5 py-1 text-[12px] font-bold uppercase tracking-[0.16em] text-brand">
                Site services
              </span>
              <h1 className="mt-4 max-w-xl text-[clamp(1.85rem,4.2vw,3.35rem)] font-bold uppercase leading-[1.05] tracking-[-0.03em] text-ink">
                Pull Out Test
                <br />
                &amp; Installation
              </h1>
            </div>
            <div className="lg:pb-1">
              <p className="max-w-md text-[16px] leading-relaxed text-ink/55">
                Two focused services from ICFS — prove anchor hold on site with calibrated pull-out
                testing, and install chemical and mechanical fasteners correctly.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/contact"
                  className="cursor-target btn-shine inline-flex h-11 items-center rounded-full bg-brand px-6 text-[14px] font-bold uppercase tracking-[0.06em] text-white transition hover:bg-brand-deep"
                >
                  Request service
                </Link>
                <a
                  href="#service-lines"
                  className="cursor-target inline-flex h-11 items-center rounded-full border border-black/10 bg-white px-5 text-[14px] font-semibold text-ink transition hover:border-brand/40 hover:text-brand"
                >
                  View services
                </a>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:gap-5">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="cursor-target group relative min-h-[280px] overflow-hidden rounded-[1.5rem] sm:min-h-[320px]"
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
                  <div className="flex flex-wrap gap-1.5">
                    {service.highlights.slice(0, 3).map((h) => (
                      <span
                        key={h}
                        className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-white/85 ring-1 ring-white/20"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                  <h2 className="mt-3 text-[clamp(1.35rem,2.5vw,1.85rem)] font-bold tracking-[-0.03em] text-white">
                    {service.title}
                  </h2>
                  <p className="mt-2 max-w-md text-[15px] leading-relaxed text-white/70">
                    {service.short}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-white">
                    Learn more <span aria-hidden>→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="service-lines" className="scroll-mt-28 bg-[#f7f6f4] py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-5 lg:px-6 xl:px-8">
          <FadeIn>
            <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-brand">
              Our services
            </p>
            <h2 className="mt-2 max-w-xl text-[clamp(1.55rem,3vw,2.35rem)] font-bold tracking-[-0.03em] text-ink">
              Two services. Clear scope.
            </h2>
            <p className="mt-2 max-w-lg text-[16px] text-ink/55">
              Open either card for full details, equipment specs, and how we work on site.
            </p>
          </FadeIn>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {SERVICES.map((service, i) => (
              <FadeIn key={service.slug} delay={i * 0.06}>
                <article className="flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-white ring-1 ring-black/[0.06]">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[12px] font-bold tracking-wide text-ink/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <h3 className="text-[20px] font-bold tracking-[-0.02em] text-ink">
                      {service.title}
                    </h3>
                    <p className="mt-2 flex-1 text-[16px] leading-relaxed text-ink/55">
                      {service.short}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {service.capabilities.slice(0, 4).map((item) => (
                        <li key={item} className="flex gap-2.5 text-[15px] text-ink/65">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/services/${service.slug}`}
                      className="cursor-target btn-shine mt-6 inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-full bg-ink text-[15px] font-semibold text-white transition hover:bg-brand"
                    >
                      Read more
                      <span aria-hidden>→</span>
                    </Link>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="mt-14 overflow-hidden rounded-[1.75rem] bg-steel px-6 py-10 text-center text-white sm:rounded-[2rem] sm:px-10">
            <h3 className="text-[clamp(1.25rem,2.4vw,1.75rem)] font-bold tracking-[-0.03em]">
              Need a pull-out test or installation crew?
            </h3>
            <p className="mx-auto mt-3 max-w-md text-[15px] text-white/60">
              Call toll free 1800 123 500 023 or email email@icfs.in — we serve sites across India.
            </p>
            <Link
              href="/contact"
              className="cursor-target btn-shine mt-6 inline-flex h-11 items-center rounded-full bg-brand px-6 text-[14px] font-semibold text-white transition hover:bg-brand-deep"
            >
              Contact us
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
