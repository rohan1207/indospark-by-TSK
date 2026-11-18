"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import ScrollStack, { ScrollStackItem } from "@/components/effects/ScrollStack";
import {
  ABOUT_TABS,
  ACHIEVEMENTS,
  VERTICALS,
} from "./aboutData";
import HistorySection from "./HistorySection";

function useSectionSpy(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const nodes = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!nodes.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-28% 0px -55% 0px", threshold: [0.1, 0.25, 0.5] }
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [ids]);

  return [active, setActive];
}

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = 108;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}

function FadeIn({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ children }) {
  return (
    <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-brand">
      {children}
    </p>
  );
}

function AboutHero() {
  const stats = [
    {
      title: "Est. 1978",
      sub: "Trusted Legacy",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
          <rect x="3.5" y="5" width="17" height="15" rx="2" stroke="currentColor" strokeWidth="1.7" />
          <path d="M8 3.5v3M16 3.5v3M3.5 10h17" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      title: "43+ Years",
      sub: "of Expertise",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
          <path d="M12 4.2L4 8.5 12 12.8 20 8.5 12 4.2Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
          <path d="M4 12.2L12 16.5 20 12.2M4 15.5L12 19.8 20 15.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      title: "Global",
      sub: "Supply Reach",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.7" />
          <path d="M4.5 12h15M12 4.5c2.4 2.6 3.6 5.2 3.6 7.5S14.4 16.9 12 19.5C9.6 16.9 8.4 14.3 8.4 12S9.6 7.1 12 4.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  return (
    <section
      className="relative overflow-hidden bg-white lg:h-[calc(100svh-6.85rem)] lg:max-h-[calc(100svh-6.85rem)]"
      aria-labelledby="about-hero-heading"
    >
      <div className="grid w-full items-stretch lg:h-full lg:grid-cols-12">
        {/* Left copy */}
        <div className="relative z-10 flex flex-col justify-center px-4 py-8 sm:px-5 sm:py-10 lg:col-span-5 lg:pl-[max(1.5rem,calc((100vw-1440px)/2+1.5rem))] lg:pr-6 lg:py-6 xl:col-span-5 xl:pr-8">
          <p className="flex items-center gap-3 text-[13px] font-bold uppercase tracking-[0.18em] text-ink">
            About ICFS
            <span className="h-[2px] w-8 rounded-full bg-brand" aria-hidden />
          </p>

          <h1
            id="about-hero-heading"
            className="mt-2.5 max-w-lg text-[clamp(1.75rem,3.4vw,2.7rem)] font-bold leading-[1.08] tracking-[-0.035em] text-ink"
          >
            Precision Anchor Fastening{" "}
            <span className="text-brand">Solutions</span>
          </h1>

          <p className="mt-3 max-w-md text-[14px] leading-relaxed text-ink/55 sm:text-[15px]">
            Engineered for strength, safety and long-term performance since 1978.
            Clear specs, steady supply, and site-ready systems for concrete and
            masonry fixing.
          </p>

          <ul className="mt-4 max-w-md space-y-1.5 text-[13px] leading-snug text-ink/70 sm:text-[14px]">
            <li className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
              Chemical anchors: resin mortars, capsules, and studs
            </li>
            <li className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
              Mechanical anchors: wedge, drop-in, and frame fixings
            </li>
            <li className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
              Free design tools to size anchors before you specify
            </li>
          </ul>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-black/10">
            {stats.map((item) => (
              <div key={item.title} className="flex items-start gap-3 sm:flex-col sm:gap-2 sm:px-4 first:sm:pl-0 last:sm:pr-0">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand/10 text-brand">
                  {item.icon}
                </span>
                <div>
                  <p className="text-[14px] font-bold tracking-[-0.02em] text-ink sm:text-[15px]">
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-[12px] leading-snug text-ink/50 sm:text-[13px]">
                    {item.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollToId("overview")}
            className="cursor-target btn-shine mt-5 inline-flex h-11 w-fit items-center gap-2 rounded-full bg-brand px-6 text-[15px] font-semibold text-white transition hover:bg-brand-deep"
          >
            Our Story
            <span aria-hidden className="text-lg leading-none">
              →
            </span>
          </button>
        </div>

        {/* Right visual: flush right + bottom, above left copy */}
        <div className="relative z-20 hidden h-full items-end justify-end overflow-visible lg:col-span-7 lg:flex xl:col-span-7">
          <Image
            src="/images/about/hero-products.png"
            alt="ICFS chemical and mechanical anchor fasteners on site"
            width={1400}
            height={1050}
            priority
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="pointer-events-none h-[132%] w-[132%] max-w-none origin-bottom-right object-contain object-right-bottom"
          />
        </div>

        {/* Mobile image */}
        <div className="relative z-20 flex items-end justify-end overflow-hidden px-0 lg:hidden">
          <Image
            src="/images/about/hero-products.png"
            alt="ICFS chemical and mechanical anchor fasteners on site"
            width={900}
            height={700}
            priority
            sizes="100vw"
            className="h-auto max-h-[52svh] w-[125%] max-w-none origin-bottom-right object-contain object-right-bottom"
          />
        </div>
      </div>
    </section>
  );
}

function AboutTabs({ active, onSelect }) {
  return (
    <div className="sticky top-[6.85rem] z-40 border-b border-black/[0.06] bg-white/90 backdrop-blur-md">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-5 lg:px-6 xl:px-8">
        <div
          role="tablist"
          aria-label="About ICFS"
          className="-mx-1 flex gap-1 overflow-x-auto py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {ABOUT_TABS.map((tab) => {
            const isActive = active === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => onSelect(tab.id)}
                className={`cursor-target relative shrink-0 rounded-full px-4 py-2 text-[14px] font-semibold tracking-[-0.01em] transition-colors sm:px-5 sm:text-[15px] ${
                  isActive ? "text-white" : "text-ink/55 hover:text-ink"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="about-tab-pill"
                    className="absolute inset-0 rounded-full bg-ink"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function OverviewSection() {
  const gallery = [
    {
      src: "/images/categories/mortars.png",
      alt: "Chemical mortars",
      href: "/shop?category=mortars",
      fit: "contain",
    },
    {
      src: "/images/categories/mechanical.png",
      alt: "Mechanical anchors",
      href: "/shop?category=mechanical",
      fit: "contain",
    },
    {
      src: "/images/categories/studs.png",
      alt: "Chemical anchor studs",
      href: "/shop?category=studs",
      fit: "contain",
    },
    {
      src: "/images/news/exhibition.png",
      alt: "ICFS at trade shows",
      href: "/about#achievements",
      fit: "cover",
    },
  ];

  const stats = [
    { value: "43", label: "Years experience" },
    { value: "25", label: "Years fastening" },
    { value: "ETA", label: "Approvals" },
  ];

  return (
    <section
      id="overview"
      className="relative scroll-mt-[10.1rem] overflow-hidden bg-white"
    >
      <div className="mx-auto flex min-h-[calc(100svh-10.1rem)] max-w-[1440px] flex-col justify-center px-4 py-8 sm:px-5 sm:py-10 lg:h-[calc(100svh-10.1rem)] lg:min-h-0 lg:px-6 lg:py-6 xl:px-8 xl:py-8">
        <div className="grid flex-1 items-stretch gap-7 lg:grid-cols-2 lg:gap-10 xl:gap-12">
          {/* Left, copy + social, vertically balanced */}
          <FadeIn className="flex h-full flex-col justify-between gap-8 lg:py-1">
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-brand">
                Overview
              </p>
              <h2 className="mt-2.5 max-w-xl text-[clamp(1.65rem,3.2vw,2.55rem)] font-bold leading-[1.12] tracking-[-0.035em] text-ink">
                Chemical and mechanical{" "}
                <span className="text-brand">anchors</span> for construction.
              </h2>
              <p className="mt-3 max-w-md text-[16px] leading-relaxed text-ink/55">
                ICFS supplies anchor fasteners that hold when the load matters. Clear specs, steady
                stock, and support across India, including Solapur, Hyderabad, Bengaluru, Chiplun,
                and Mumbai.
              </p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={() => scrollToId("verticals")}
                  className="cursor-target inline-flex h-10 items-center gap-1.5 rounded-full border border-brand bg-transparent px-5 text-[14px] font-semibold text-brand transition hover:bg-brand hover:text-white sm:h-11 sm:text-[15px]"
                >
                  See products
                  <span aria-hidden>→</span>
                </button>
                <Link
                  href="/#shop"
                  className="cursor-target btn-shine inline-flex h-10 items-center gap-1.5 rounded-full bg-brand px-5 text-[14px] font-semibold text-white transition hover:bg-brand-deep sm:h-11 sm:text-[15px]"
                >
                  Shop products
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
            </div>

            <div className="border-t border-black/[0.06] pt-5">
              <h3 className="text-[1.05rem] font-bold tracking-[-0.03em] text-ink sm:text-[1.15rem]">
                From our fastening house
              </h3>
              <p className="mt-1.5 max-w-sm text-[14px] leading-relaxed text-ink/50 sm:text-[15px]">
                Jobsite sales, consultation, and ETA-backed ICFS products, customers talk about the
                service.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3.5">
                <div className="flex items-center">
                  {[
                    "/images/clients/client-01.jpg",
                    "/images/clients/client-04.jpg",
                    "/images/clients/client-07.jpg",
                    "/images/clients/client-10.jpg",
                  ].map((src, i) => (
                    <span
                      key={src}
                      className="relative h-9 w-9 overflow-hidden rounded-full ring-2 ring-white"
                      style={{ marginLeft: i === 0 ? 0 : -9 }}
                    >
                      <Image src={src} alt="" fill sizes="36px" className="object-cover" />
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2.5">
                  <p className="text-[1.5rem] font-bold leading-none tracking-[-0.04em] text-ink">
                    5.0
                  </p>
                  <span className="h-7 w-px bg-black/10" aria-hidden />
                  <div>
                    <div className="flex gap-0.5" aria-hidden>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          viewBox="0 0 24 24"
                          className="h-3 w-3 text-[#f5a623]"
                          fill="currentColor"
                        >
                          <path d="M12 2l2.4 7.2H22l-6 4.4 2.3 7L12 16.8 5.7 20.6l2.3-7-6-4.4h7.6L12 2z" />
                        </svg>
                      ))}
                    </div>
                    <p className="mt-0.5 text-[10.5px] font-medium text-ink/45">Limca · ETA trusted</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Right, video fills height, stats + gallery lock to bottom */}
          <FadeIn delay={0.06} className="flex min-h-0 flex-col gap-3.5 lg:h-full">
            <div className="relative min-h-[200px] flex-1 overflow-hidden rounded-[1.15rem] sm:min-h-[240px] sm:rounded-[1.35rem] lg:min-h-0">
              <Image
                src="/images/news/exhibition.png"
                alt="ICFS at industry exhibitions"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              <a
                href="https://www.youtube.com/watch?v=BmEwjzdobek"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-target absolute inset-0 flex items-center justify-center bg-ink/10 transition hover:bg-ink/20"
                aria-label="Watch ICFS overview video"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg sm:h-16 sm:w-16">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand sm:h-11 sm:w-11">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4 translate-x-px text-white"
                      fill="currentColor"
                      aria-hidden
                    >
                      <path d="M8 5.5v13l11-6.5L8 5.5z" />
                    </svg>
                  </span>
                </span>
              </a>
            </div>

            <div className="grid shrink-0 grid-cols-3 gap-3 border-t border-black/[0.06] pt-3.5 sm:gap-4 sm:pt-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-[clamp(1.35rem,2.4vw,1.85rem)] font-bold leading-none tracking-[-0.04em] text-ink">
                    {s.value}
                    <span className="text-brand">+</span>
                  </p>
                  <p className="mt-1 text-[10.5px] font-medium leading-snug text-ink/45 sm:text-[11.5px]">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>

            <div className="grid shrink-0 grid-cols-4 gap-2 sm:gap-2.5">
              {gallery.map((img) => (
                <Link
                  key={img.src}
                  href={img.href}
                  className="cursor-target group relative aspect-[4/5] overflow-hidden rounded-[0.85rem] bg-[#f5f5f5] ring-1 ring-black/[0.06] transition hover:ring-brand/40 sm:rounded-[1rem]"
                  aria-label={img.alt}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 1024px) 25vw, 12vw"
                    className={`transition duration-500 group-hover:scale-[1.04] ${
                      img.fit === "contain" ? "object-contain p-2.5 sm:p-3" : "object-cover"
                    }`}
                  />
                </Link>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function VerticalsSection() {
  const runwayRef = useRef(null);
  const [stackProgress, setStackProgress] = useState(0);

  useEffect(() => {
    const runway = runwayRef.current;
    if (!runway) return undefined;

    // Stack finishes slightly before sticky ends, then page scroll unlocks
    const SETTLE_AT = 0.94;

    const update = () => {
      const rect = runway.getBoundingClientRect();
      const total = Math.max(1, runway.offsetHeight - window.innerHeight);
      const scrolled = Math.min(total, Math.max(0, -rect.top));
      const raw = scrolled / total;
      setStackProgress(Math.min(1, raw / SETTLE_AT));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section id="verticals" className="scroll-mt-[10.5rem] bg-white">
      {/* Runway sized so sticky unlocks as soon as the 3rd card settles */}
      <div ref={runwayRef} className="relative h-[165svh]">
        <div className="sticky top-[calc(6.85rem+3.25rem)] flex h-[calc(100svh-6.85rem-3.25rem)] items-center overflow-hidden border-b border-black/[0.05] bg-white">
          <div className="mx-auto grid h-full w-full max-w-[1440px] items-center gap-6 px-4 sm:px-5 lg:grid-cols-12 lg:gap-10 lg:px-6 xl:gap-12 xl:px-8">
            <div className="lg:col-span-4">
              <FadeIn>
                <SectionLabel>What we offer</SectionLabel>
                <h2 className="mt-3 text-[clamp(1.6rem,2.8vw,2.55rem)] font-bold leading-[1.1] tracking-[-0.035em] text-ink">
                  Anchors and the tools to size them
                </h2>
                <p className="mt-3 max-w-sm text-[16px] leading-relaxed text-ink/55 sm:text-[16px]">
                  Chemical anchors, mechanical anchors, and free design software, scroll to explore
                  each line.
                </p>
                <div className="mt-6 flex items-center gap-3" aria-hidden>
                  <div className="h-px flex-1 max-w-[4rem] bg-black/10" />
                  <span className="text-[15px] font-semibold tabular-nums text-ink/35">
                    {String(Math.min(3, Math.floor(stackProgress * 3) + 1)).padStart(2, "0")} / 03
                  </span>
                </div>
              </FadeIn>
            </div>

            <div className="relative h-[min(68vh,520px)] lg:col-span-8 lg:h-[min(72vh,560px)]">
              <ScrollStack
                className="h-full"
                scrollProgress={stackProgress}
                itemDistance={70}
                itemStackDistance={22}
                baseScale={0.9}
                itemScale={0.035}
                stackPosition="8%"
                scaleEndPosition="4%"
                blurAmount={0.5}
              >
                {VERTICALS.map((v) => (
                  <ScrollStackItem
                    key={v.id}
                    itemClassName="overflow-hidden rounded-[1.35rem] border border-black/[0.06] bg-paper shadow-[0_18px_50px_rgba(0,0,0,0.08)] sm:rounded-[1.75rem]"
                  >
                    <div className="grid h-full min-h-[min(52vh,400px)] lg:grid-cols-12">
                      <div className="flex flex-col justify-center p-5 sm:p-7 lg:col-span-6 lg:p-8">
                        <span className="text-[26px] font-bold text-brand/70 sm:text-[32px]">
                          {v.code}
                        </span>
                        <p className="mt-1.5 text-[13px] font-semibold uppercase tracking-[0.18em] text-ink/35">
                          {v.eyebrow}
                        </p>
                        <h3 className="mt-1.5 text-[clamp(1.2rem,2vw,1.65rem)] font-bold tracking-[-0.03em] text-ink">
                          {v.title}
                        </h3>
                        <p className="mt-2.5 text-[15px] leading-relaxed text-ink/55 sm:text-[16px]">
                          {v.summary}
                        </p>
                        <ul className="mt-4 space-y-2">
                          {v.points.map((point) => (
                            <li
                              key={point}
                              className="flex gap-2.5 text-[14px] leading-snug text-ink/70 sm:text-[15px]"
                            >
                              <span
                                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
                                aria-hidden
                              />
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="relative min-h-[180px] lg:col-span-6 lg:min-h-0">
                        <Image
                          src={v.image}
                          alt={v.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 40vw"
                          className="object-cover"
                        />
                        <div
                          className="absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent lg:bg-gradient-to-l"
                          aria-hidden
                        />
                      </div>
                    </div>
                  </ScrollStackItem>
                ))}
              </ScrollStack>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LeadershipSection() {
  return (
    <section
      id="leadership"
      className="scroll-mt-[10.1rem] overflow-hidden bg-white"
    >
      <div className="mx-auto grid min-h-[min(88svh,720px)] max-w-[1440px] lg:grid-cols-12">
        {/* Left, modern quote card */}
        <FadeIn className="flex items-center px-4 py-12 sm:px-5 sm:py-14 lg:col-span-6 lg:px-6 lg:py-16 xl:px-8">
          <blockquote className="relative w-full overflow-hidden rounded-[2rem] bg-brand p-7 text-white sm:rounded-[2.5rem] sm:p-9 lg:rounded-[2.75rem] lg:p-10 xl:p-12">
            {/* Soft geometric accents, shape interest, not a second card */}
            <span
              className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/10"
              aria-hidden
            />
            <span
              className="pointer-events-none absolute -bottom-24 -left-10 h-48 w-48 rounded-full bg-black/10"
              aria-hidden
            />
            <span
              className="pointer-events-none absolute right-8 top-1/2 h-24 w-24 -translate-y-1/2 rounded-[1.5rem] bg-white/[0.06]"
              aria-hidden
            />

            <div className="relative">
              <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-white/55">
                CEO speech
              </p>

              <span
                className="mt-5 block text-[4.5rem] font-bold leading-none text-white/25 select-none sm:text-[5.5rem]"
                aria-hidden
              >
                “
              </span>

              <div className="-mt-6 space-y-4 text-[16px] leading-relaxed text-white/90 sm:-mt-8 sm:text-[16px] lg:text-[16px]">
                <p>
                  Change in the market is constant. We use these moments to build strong
                  partnerships for the next stage of growth.
                </p>
                <p>
                  Construction Fastening Systems (United Kingdom) has entered a strategic
                  partnership with ICFS. We are glad to walk this path together.
                </p>
                <p>
                  From a small workshop with two people in 1978 to a trusted fastener brand in
                  Across India, the journey had challenges. We stayed honest, delivered on time, and
                  kept quality first.
                </p>
                <p>
                  Two things made ICFS grow: the wisdom of our chairperson Mr. Tilakchand Ingale
                  and his trust in people, and the hard work of our team, young and old.
                </p>
              </div>

              <p className="relative mt-8 text-[clamp(1.35rem,2.4vw,1.85rem)] font-bold leading-snug tracking-[-0.03em] text-white">
                We have never stopped growing.
              </p>

              <div className="mt-8 border-t border-white/20 pt-6">
                <p className="text-[16px] font-bold text-white">Sandeep Ingale</p>
                <p className="mt-0.5 text-[14px] text-white/55">CEO · ICFS</p>
              </div>
            </div>
          </blockquote>
        </FadeIn>

        {/* Right, founder PNG flush to bottom; no card / shadow / frame */}
        <FadeIn
          delay={0.08}
          className="relative flex min-h-[420px] items-end justify-center bg-white lg:col-span-6 lg:min-h-0"
        >
          <Image
            src="/founder.png"
            alt="ICFS founders: Tilakchand Ingale and Sandeep Ingale"
            width={920}
            height={1100}
            priority
            className="relative z-10 h-auto w-full max-w-[580px] object-contain object-bottom"
          />
        </FadeIn>
      </div>
    </section>
  );
}

function AchievementsSection() {
  return (
    <section id="achievements" className="scroll-mt-36 bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-5 lg:px-6 xl:px-8">
        <FadeIn className="max-w-2xl">
          <SectionLabel>Exhibitions · Events · Approvals</SectionLabel>
          <h2 className="mt-3 text-[clamp(1.75rem,3.2vw,2.75rem)] font-bold tracking-[-0.035em] text-ink">
            Proof on the floor, and on paper.
          </h2>
          <p className="mt-3 text-[16px] leading-relaxed text-ink/55 sm:text-[16px]">
            Limca records, ETA approvals, UK partnership, anniversary milestones, and industry
            exhibitions, curated highlights from a long public journey.
          </p>
        </FadeIn>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {ACHIEVEMENTS.map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.05}>
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 380, damping: 28 }}
                className="group flex h-full flex-col overflow-hidden rounded-2xl bg-paper ring-1 ring-black/[0.06] sm:rounded-3xl"
              >
                <div className="relative aspect-[5/4] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink/70">
                    {item.tag}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-[16px] font-bold tracking-[-0.02em] text-ink sm:text-[16px]">
                    {item.title}
                  </h3>
                  <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink/55">
                    {item.text}
                  </p>
                </div>
              </motion.article>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-14 overflow-hidden rounded-[1.75rem] bg-brand sm:rounded-[2rem]">
          <div className="flex flex-col gap-8 px-6 py-9 sm:px-8 sm:py-11 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-10 lg:py-12">
            <div className="max-w-xl">
              <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-white/70">
                Next step
              </p>
              <h3 className="mt-3 text-[clamp(1.45rem,2.8vw,2.15rem)] font-bold tracking-[-0.035em] text-white">
                Spec the fix. Get it on site.
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-white/80 sm:text-[16px]">
                Share your base material, load, and timeline. ICFS will recommend the right
                chemical or mechanical anchor and arrange supply.
              </p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="How we help">
                {["Site guidance", "ETA-backed range", "Pan-India supply"].map((item) => (
                  <li
                    key={item}
                    className="rounded-full bg-white/15 px-3 py-1 text-[12px] font-medium text-white ring-1 ring-white/25 sm:text-[13px]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="cursor-target btn-shine inline-flex h-11 items-center gap-2 rounded-full bg-white px-6 text-[15px] font-semibold text-brand transition hover:bg-ink hover:text-white"
              >
                Contact us
                <span aria-hidden className="text-lg leading-none">
                  →
                </span>
              </Link>
              <Link
                href="/#shop"
                className="cursor-target inline-flex h-11 items-center rounded-full border border-white/45 bg-transparent px-6 text-[15px] font-semibold text-white transition hover:border-white hover:bg-white/10"
              >
                Browse products
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export default function AboutPage() {
  const tabIds = ABOUT_TABS.map((t) => t.id);
  const [active, setActive] = useSectionSpy(tabIds);

  const onSelect = (id) => {
    setActive(id);
    scrollToId(id);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.replace("#", "");
    if (hash && ABOUT_TABS.some((t) => t.id === hash)) {
      requestAnimationFrame(() => scrollToId(hash));
    }
  }, []);

  return (
    <>
      <AboutHero />
      <AboutTabs active={active} onSelect={onSelect} />
      <OverviewSection />
      <VerticalsSection />
      <HistorySection />
      <LeadershipSection />
      <AchievementsSection />
    </>
  );
}
