"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import MagneticFloat from "@/components/effects/MagneticFloat";
import CubeLoader from "@/components/effects/CubeLoader";

const HeroProductModel = dynamic(() => import("./HeroProductModel"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-[#fafafa] to-[#f0f0f0]">
      <CubeLoader />
    </div>
  ),
});

export default function Hero() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from("[data-bento]", {
        y: 20,
        opacity: 0,
        duration: 0.55,
        stagger: 0.05,
        ease: "power3.out",
        delay: 0.04,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative isolate min-h-[calc(100svh-6.85rem)] overflow-hidden bg-[#ececec] lg:h-[calc(100svh-6.85rem)]"
      aria-labelledby="hero-heading"
    >
      {/* Soft brand atmosphere, concrete / fastening texture */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <Image
          src="/images/hero-bg-anchors.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#f4f4f4]/40 via-transparent to-[#f4f4f4]/55" />
      </div>

      {/* 6.85rem ≈ navbar top bar (2.75rem) + main bar (4rem) + borders */}
      <div className="relative z-10 mx-auto flex h-full min-h-[calc(100svh-6.85rem)] w-full max-w-[1440px] flex-col px-4 py-5 sm:px-5 sm:py-6 lg:min-h-0 lg:px-6 lg:py-4 xl:px-8">
        <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 lg:grid-cols-12 lg:grid-rows-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-3.5">
          {/* Intro, top left */}
          <div
            data-bento
            className="flex flex-col justify-center lg:col-span-7 lg:row-start-1"
          >
            <h1
              id="hero-heading"
              className="text-[clamp(1.75rem,3.4vw,3rem)] font-bold uppercase leading-[1.1] tracking-[-0.02em] text-ink"
            >
              Chemical &amp; mechanical
              <br />
              anchor fasteners
            </h1>

            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center lg:mt-6">
              <div className="inline-flex w-fit items-center gap-1.5 rounded-full border border-black/8 bg-white p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
                <Link
                  href="/shop"
                  className="cursor-target btn-shine inline-flex items-center rounded-full bg-ink px-5 py-2.5 text-[15px] font-semibold text-white transition-colors hover:bg-brand"
                >
                  Shop now
                </Link>
                <Link
                  href="/contact"
                  className="cursor-target btn-shine inline-flex items-center rounded-full bg-white px-5 py-2.5 text-[15px] font-semibold text-ink ring-1 ring-ink/10 transition-colors hover:bg-paper"
                >
                  Send enquiry
                </Link>
              </div>

              <p className="max-w-[280px] text-[16px] leading-relaxed text-ink/55">
                Right product on time: ICFS chemical and mechanical anchors across India.
              </p>
            </div>
          </div>

          {/* Feature card: 3D product model only, centered */}
          <div
            data-bento
            className="relative min-h-[220px] overflow-hidden rounded-[1.5rem] border border-black/5 bg-gradient-to-b from-[#fafafa] to-[#f0f0f0] shadow-[0_10px_40px_rgba(0,0,0,0.04)] lg:col-span-5 lg:row-start-1 lg:min-h-0"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative h-full w-full max-w-[min(100%,32rem)] scale-[1.12]">
                <HeroProductModel />
              </div>
            </div>
          </div>

          {/* Stats card, bottom left */}
          <div
            data-bento
            data-magnetic-field
            className="relative min-h-[200px] overflow-visible rounded-[1.5rem] border border-black/5 bg-white lg:col-span-4 lg:row-start-2 lg:min-h-0"
          >
            <div className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-3 p-5 sm:p-6">
              <div className="min-w-0">
                <p className="text-[clamp(2.75rem,5.5vw,4rem)] font-bold leading-none tracking-[-0.04em] text-ink">
                  25+
                </p>
                <p className="mt-1 text-[14px] font-semibold uppercase tracking-[0.12em] text-ink/70">
                  Years of trust
                </p>
              </div>
              <MagneticFloat
                className="relative h-[9rem] w-[9rem] shrink-0 -translate-y-5 scale-[1.15] sm:h-[10.5rem] sm:w-[10.5rem] sm:-translate-y-7 md:h-[11.5rem] md:w-[11.5rem] md:-translate-y-8"
                strength={0.12}
                max={12}
              >
                <Image
                  src="/images/hero/anchors.png"
                  alt="ICFS mechanical anchors"
                  fill
                  className="object-contain object-bottom drop-shadow-2xl"
                  sizes="200px"
                />
              </MagneticFloat>
            </div>
          </div>

          {/* Middle card, product collection */}
          <div
            data-bento
            data-magnetic-field
            className="relative flex min-h-[220px] flex-col overflow-hidden rounded-[1.5rem] bg-brand p-4 text-white sm:p-5 lg:col-span-4 lg:row-start-2 lg:min-h-0"
          >
            <div className="relative z-10 shrink-0">
              <p className="text-[1.15rem] font-bold leading-snug tracking-[-0.02em] xl:text-[1.25rem]">
                Complete collection of ICFS fastening products
              </p>
              <Link
                href="/shop"
                className="cursor-target btn-shine mt-3 inline-flex w-fit items-center rounded-full bg-white px-4 py-2 text-[14px] font-semibold text-brand transition-colors hover:bg-white/90 xl:px-5 xl:py-2.5 xl:text-[15px]"
              >
                Shop products
              </Link>
            </div>

            <div className="relative mt-3 min-h-[7.5rem] flex-1 sm:min-h-[8.5rem]">
              <Image
                src="/images/hero/collection.png"
                alt="ICFS complete fastening product collection"
                fill
                className="object-contain object-bottom translate-x-6 -translate-y-9 sm:translate-x-8 sm:-translate-y-12"
                sizes="(max-width: 1024px) 90vw, 360px"
                priority
              />
            </div>
          </div>

          {/* Featured product */}
          <div
            data-bento
            data-magnetic-field
            className="relative min-h-[200px] overflow-visible rounded-[1.5rem] border border-black/5 bg-white lg:col-span-4 lg:row-start-2 lg:min-h-0"
          >
            <MagneticFloat
              className="pointer-events-none absolute -right-2 bottom-0 z-10 h-[70%] w-[55%] sm:w-[58%]"
              strength={0.14}
              max={14}
            >
              <Image
                src="/images/hero/featured-mortars.png"
                alt="ICFS chemical mortars: pure epoxy and injection resin cartridges"
                fill
                className="object-contain object-bottom drop-shadow-xl"
                sizes="220px"
              />
            </MagneticFloat>

            <div className="relative z-10 flex h-full min-h-[200px] flex-col justify-between p-5 sm:p-6 lg:min-h-0">
              <div className="max-w-[14.5rem]">
                <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-brand">
                  Featured product
                </p>
                <h3 className="mt-2 text-[1.25rem] font-bold leading-snug tracking-[-0.02em] text-ink xl:text-[1.35rem]">
                  ICFS Chemical Mortars
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/55 xl:text-[16px]">
                  Pure epoxy and injection resins for high-load anchoring in concrete and masonry.
                </p>
              </div>

              <Link
                href="/shop?category=mortars"
                className="cursor-target btn-shine inline-flex w-fit items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-[14px] font-semibold text-white transition hover:bg-brand-deep"
              >
                Shop mortars
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>

        <div
          data-bento
          className="mt-3 flex shrink-0 flex-wrap items-center gap-3 sm:mt-3.5 sm:gap-5"
        >
          <div className="inline-flex overflow-hidden rounded-full border border-black/5 bg-white shadow-sm">
            <span className="bg-brand px-3 py-2 text-[14px] font-bold text-ink sm:px-3.5 sm:text-[15px]">
              500+
            </span>
            <span className="px-3 py-2 text-[13px] font-semibold uppercase tracking-[0.1em] text-ink/70 sm:px-3.5 sm:text-[14px]">
              Projects delivered
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-[13px] font-bold text-white">
              PB
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <p className="text-[14px] font-semibold text-ink sm:text-[15px]">Pramod Beri</p>
                <span className="text-[13px] text-amber-500" aria-label="5 stars">
                  ★★★★★
                </span>
                <span className="text-[13px] text-ink/40">(5.0)</span>
              </div>
              <p className="text-[13px] text-ink/45 sm:text-[14px]">ICFS quality matches global brands</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
