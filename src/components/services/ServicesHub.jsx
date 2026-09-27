"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CERTIFICATES, CUSTOMERS, SERVICES } from "./servicesData";

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

function scrollToServices() {
  const el = document.getElementById("service-lines");
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 110;
  window.scrollTo({ top, behavior: "smooth" });
}

export default function ServicesHub() {
  return (
    <>
      {/* Hero — bento layout */}
      <section className="relative overflow-hidden bg-white">
        <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-5 sm:py-12 lg:px-6 lg:py-14 xl:px-8">
          <div className="grid items-end gap-6 lg:grid-cols-2 lg:gap-12">
            <div>
              <span className="inline-flex rounded-full border border-brand/40 px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-brand">
                Construction services
              </span>
              <h1 className="mt-4 max-w-xl text-[clamp(1.85rem,4.2vw,3.35rem)] font-bold uppercase leading-[1.05] tracking-[-0.03em] text-ink">
                Your partner for
                <br />
                vibration-free cuts
              </h1>
            </div>
            <div className="lg:pb-1">
              <p className="max-w-md text-[14px] leading-relaxed text-ink/55 sm:text-[15px]">
                Diamond cutting, drilling, underwater demolition, and rock anchoring — engineered
                for industrial shutdowns across steel, power, nuclear, marine, and infrastructure.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="cursor-target btn-shine inline-flex h-11 items-center rounded-full bg-brand px-6 text-[12px] font-bold uppercase tracking-[0.06em] text-white transition hover:bg-brand-deep"
                >
                  Get started
                </Link>
                <a
                  href="https://www.youtube.com/watch?v=BmEwjzdobek"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-target inline-flex items-center gap-2.5 text-[13px] font-medium text-ink transition hover:text-brand"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f0f0f0]">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-3.5 w-3.5 translate-x-px text-brand"
                      fill="currentColor"
                      aria-hidden
                    >
                      <path d="M8 5.5v13l11-6.5L8 5.5z" />
                    </svg>
                  </span>
                  <span>
                    <span className="font-semibold text-brand">Video</span>
                    <span className="text-ink/60"> How we work on site</span>
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-3.5 lg:grid-cols-12 lg:grid-rows-[minmax(140px,auto)_minmax(160px,auto)]">
            <Link
              href="/services/vibration-free-concrete-cutting"
              className="cursor-target group relative min-h-[280px] overflow-hidden rounded-[1.35rem] sm:rounded-[1.5rem] lg:col-span-3 lg:row-span-2 lg:min-h-0"
            >
              <Image
                src="/images/demolition/hero.jpg"
                alt="Vibration-free concrete cutting"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 25vw"
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
              <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink transition group-hover:bg-brand group-hover:text-white">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden>
                  <path
                    d="M7 17L17 7M9 7h8v8"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <p className="absolute bottom-4 left-4 max-w-[12rem] text-[15px] font-bold leading-snug text-white sm:bottom-5 sm:left-5 sm:text-[16px]">
                Vibration-free creativity on site
              </p>
            </Link>

            <div className="relative flex min-h-[140px] flex-col justify-between overflow-hidden rounded-[1.35rem] bg-brand p-5 sm:rounded-[1.5rem] sm:p-6 lg:col-span-3">
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.12]"
                style={{
                  backgroundImage:
                    "linear-gradient(45deg, #fff 25%, transparent 25%), linear-gradient(-45deg, #fff 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #fff 75%), linear-gradient(-45deg, transparent 75%, #fff 75%)",
                  backgroundSize: "16px 16px",
                  backgroundPosition: "0 0, 0 8px, 8px -8px, -8px 0",
                }}
                aria-hidden
              />
              <p className="relative z-10 max-w-[11rem] text-[clamp(1.15rem,2vw,1.45rem)] font-bold leading-snug tracking-[-0.03em] text-white">
                High quality site results
              </p>
              <Link
                href="/services/vibration-free-concrete-cutting"
                className="cursor-target relative z-10 ml-auto flex h-9 w-9 items-center justify-center rounded-full bg-white text-brand transition hover:bg-ink hover:text-white"
                aria-label="Open concrete cutting service"
              >
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden>
                  <path
                    d="M7 17L17 7M9 7h8v8"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>

            <div className="flex min-h-[140px] flex-col justify-between rounded-[1.35rem] bg-[#f0f0f0] p-5 sm:rounded-[1.5rem] sm:p-6 lg:col-span-2">
              <p className="text-[clamp(2rem,3.5vw,2.75rem)] font-bold leading-none tracking-[-0.05em] text-ink">
                29<span className="text-brand">+</span>
              </p>
              <p className="text-[13px] font-medium leading-snug text-ink/55">
                Years cutting &amp; fixing
              </p>
            </div>

            <div className="cursor-target group relative min-h-[200px] overflow-hidden rounded-[1.35rem] sm:min-h-[220px] sm:rounded-[1.5rem] lg:col-span-4 lg:row-span-2 lg:min-h-0">
              <Image
                src="/images/demolition/wire-saw.jpg"
                alt="Industrial cutting exhibition and site work"
                fill
                sizes="(max-width: 1024px) 100vw, 35vw"
                className="object-cover transition duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 flex gap-1.5" aria-hidden>
                {[0, 1, 2, 3].map((i) => (
                  <span
                    key={i}
                    className="h-2 w-2 rounded-[2px] bg-white/80"
                    style={{ opacity: 1 - i * 0.18 }}
                  />
                ))}
              </div>
              <div className="absolute bottom-4 right-4 flex flex-col gap-2 sm:bottom-5 sm:right-5">
                <Link
                  href="/services/underwater-core-demolition"
                  className="cursor-target flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink transition hover:bg-brand hover:text-white"
                  aria-label="Open underwater demolition"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
                    <path
                      d="M7 17L17 7M9 7h8v8"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
                <Link
                  href="/contact"
                  className="cursor-target flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white"
                  aria-label="Contact"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
                    <path
                      d="M4 6h16v12H4zM4 6l8 7 8-7"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="flex min-h-[160px] flex-col justify-between rounded-[1.35rem] border border-black/[0.1] bg-white p-5 sm:rounded-[1.5rem] sm:p-6 lg:col-span-5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-ink/40">
                  Project brief
                </p>
                <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-ink/55 sm:text-[14px]">
                  Live-plant concrete cut beside running assets — diamond wire, wall saw, and
                  coordinated drilling for a 72-hour shutdown window across steel and power sectors.
                </p>
              </div>
              <div className="mt-5 flex items-center justify-end">
                <button
                  type="button"
                  onClick={scrollToServices}
                  className="cursor-target btn-shine inline-flex h-10 items-center rounded-full bg-ink px-5 text-[12px] font-semibold text-white transition hover:bg-brand"
                >
                  Browse services
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service cards — replace tabs */}
      <section id="service-lines" className="scroll-mt-28 bg-[#f7f6f4] py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-5 lg:px-6 xl:px-8">
          <FadeIn className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">
                Our service lines
              </p>
              <h2 className="mt-2 text-[clamp(1.55rem,3vw,2.35rem)] font-bold tracking-[-0.03em] text-ink">
                Seven capabilities. One shutdown partner.
              </h2>
              <p className="mt-2 max-w-lg text-[14px] text-ink/55">
                Open any card for detailed scope, site imagery, video, related technology, and
                project case studies.
              </p>
            </div>
            <p className="text-[13px] font-medium tabular-nums text-ink/40">
              {String(SERVICES.length).padStart(2, "0")} services
            </p>
          </FadeIn>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-5">
            {SERVICES.map((service, i) => (
              <FadeIn key={service.slug} delay={Math.min(i * 0.04, 0.24)}>
                <article className="group flex h-full flex-col overflow-hidden rounded-[1.35rem] bg-white ring-1 ring-black/[0.06] transition hover:-translate-y-1 hover:ring-brand/25 sm:rounded-[1.5rem]">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition duration-700 group-hover:scale-[1.04]"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-bold tracking-wide text-ink/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="flex flex-wrap gap-1.5">
                      {service.highlights.slice(0, 3).map((h) => (
                        <span
                          key={h}
                          className="rounded-full bg-[#f3f1ee] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-ink/45"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                    <h3 className="mt-3 text-[17px] font-bold tracking-[-0.02em] text-ink sm:text-[18px]">
                      {service.title}
                    </h3>
                    <p className="mt-2 flex-1 text-[13px] leading-relaxed text-ink/55 sm:text-[14px]">
                      {service.short}
                    </p>
                    <Link
                      href={`/services/${service.slug}`}
                      className="cursor-target btn-shine mt-5 inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-full bg-ink text-[13px] font-semibold text-white transition hover:bg-brand"
                    >
                      Read more
                      <span aria-hidden>→</span>
                    </Link>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="mt-14 overflow-hidden rounded-[1.75rem] bg-steel px-6 py-10 text-white sm:rounded-[2rem] sm:px-10">
            <h3 className="text-[clamp(1.25rem,2.4vw,1.75rem)] font-bold tracking-[-0.03em]">
              Major project completion certificates
            </h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {CERTIFICATES.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[11px] text-white/70"
                >
                  {c}
                </span>
              ))}
            </div>
            <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/35">
              Esteemed customers
            </p>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
              {CUSTOMERS.map((c) => (
                <span key={c} className="text-[14px] font-semibold text-white/80">
                  {c}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="border-t border-black/[0.06] bg-white py-12 sm:py-14">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-5 lg:px-6 xl:px-8">
          <div>
            <h2 className="text-[clamp(1.35rem,2.5vw,1.85rem)] font-bold tracking-[-0.03em] text-ink">
              Ready to discuss your project?
            </h2>
            <p className="mt-1 text-[14px] text-ink/50">
              Tell us the shutdown window — we&apos;ll map the right technology and crew.
            </p>
          </div>
          <Link
            href="/contact"
            className="cursor-target btn-shine inline-flex h-11 shrink-0 items-center rounded-full bg-brand px-6 text-[13px] font-semibold text-white transition hover:bg-brand-deep"
          >
            Get a project consultation
          </Link>
        </div>
      </section>
    </>
  );
}
