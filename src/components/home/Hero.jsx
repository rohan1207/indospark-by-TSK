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
      className="relative overflow-hidden bg-[#f4f4f4] max-lg:min-h-0 lg:h-[calc(100svh-6.85rem)]"
      aria-labelledby="hero-heading"
    >
      {/* 6.85rem ≈ navbar top bar (2.75rem) + main bar (4rem) + borders */}
      <div className="mx-auto flex h-full w-full max-w-[1440px] flex-col px-4 py-4 sm:px-5 sm:py-5 lg:px-6 lg:py-4 xl:px-8">
        <div className="grid min-h-0 flex-1 grid-cols-1 gap-3 lg:grid-cols-12 lg:grid-rows-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-3.5">
          {/* Intro — top left */}
          <div
            data-bento
            className="flex flex-col justify-center lg:col-span-7 lg:row-start-1"
          >
            <h1
              id="hero-heading"
              className="text-[clamp(1.75rem,3.4vw,3rem)] font-bold uppercase leading-[1.1] tracking-[-0.02em] text-ink"
            >
              India&apos;s largest construction
              <br />
              fastening systems
            </h1>

            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center lg:mt-6">
              <div className="inline-flex w-fit items-center gap-1.5 rounded-full border border-black/8 bg-white p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
                <Link
                  href="/products"
                  className="cursor-target btn-shine inline-flex items-center rounded-full bg-ink px-5 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-brand"
                >
                  Shop now
                </Link>
                <Link
                  href="/enquiry"
                  className="cursor-target btn-shine inline-flex items-center rounded-full bg-white px-5 py-2.5 text-[13px] font-semibold text-ink ring-1 ring-ink/10 transition-colors hover:bg-paper"
                >
                  Send enquiry
                </Link>
                <Link
                  href="/services"
                  aria-label="Watch services overview"
                  className="cursor-target flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white transition-transform hover:scale-105"
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 translate-x-px" fill="currentColor" aria-hidden="true">
                    <path d="M8 5.5v13l11-6.5L8 5.5z" />
                  </svg>
                </Link>
              </div>

              <p className="max-w-[240px] text-[13px] leading-relaxed text-ink/55">
                Right product on time — ICFS anchors, foams & site services across India and worldwide.
              </p>
            </div>
          </div>

          {/* Feature card — 3D product model */}
          <div
            data-bento
            className="relative min-h-[220px] overflow-hidden rounded-[1.5rem] border border-black/5 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.04)] lg:col-span-5 lg:row-start-1 lg:min-h-0"
          >
            <div className="absolute inset-0 scale-[1.05] translate-x-[12%] translate-y-[6%] sm:translate-x-[16%]">
              <HeroProductModel />
            </div>

            <div className="relative z-10 flex h-full min-h-[220px] flex-col justify-between p-5 pointer-events-none sm:p-6 lg:min-h-0">
              <div className="max-w-[15rem]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
                  Featured product
                </p>
                <h3 className="mt-2 text-[1.15rem] font-bold leading-snug tracking-[-0.02em] text-ink xl:text-[1.3rem]">
                  ICFS Chemical Fastening System
                </h3>
                <p className="mt-2 text-[12px] leading-relaxed text-ink/55 xl:text-[13px]">
                  High-strength chemical anchors for rebaring, façades, and heavy structural fixing.
                </p>
              </div>

              <Link
                href="/products/chemical-anchors"
                className="cursor-target btn-shine pointer-events-auto inline-flex w-fit items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-[12px] font-semibold text-white transition hover:bg-brand-deep"
              >
                Explore product
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          {/* Stats card — bottom left */}
          <div
            data-bento
            data-magnetic-field
            className="relative min-h-[200px] overflow-visible rounded-[1.5rem] border border-black/5 bg-white lg:col-span-4 lg:row-start-2 lg:min-h-0"
          >
            <MagneticFloat
              className="absolute -left-2 -top-14 z-30 h-[78%] w-[52%] sm:-top-16 md:-top-[4.5rem]"
              strength={0.16}
              max={16}
            >
              <Image
                src="/pu-foam_3d.png"
                alt="ICFS PU Foam"
                fill
                className="object-contain drop-shadow-2xl"
                sizes="200px"
              />
            </MagneticFloat>
            <MagneticFloat
              className="absolute bottom-0 right-0 z-10 h-[55%] w-[48%]"
              strength={0.14}
              max={14}
            >
              <Image
                src="/chemical_mortars.png"
                alt="ICFS chemical mortars"
                fill
                className="object-contain object-bottom drop-shadow-xl"
                sizes="160px"
              />
            </MagneticFloat>

            <div className="absolute inset-x-0 bottom-0 z-20 p-5 sm:p-6">
              <p className="text-[clamp(2.75rem,5.5vw,4rem)] font-bold leading-none tracking-[-0.04em] text-ink">
                25+
              </p>
              <p className="mt-0.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-ink/70">
                Years of trust
              </p>
            </div>
          </div>

          {/* Middle card — product collection */}
          <div
            data-bento
            data-magnetic-field
            className="relative min-h-[200px] overflow-visible rounded-[1.5rem] bg-brand p-5 text-white sm:p-6 lg:col-span-4 lg:row-start-2 lg:min-h-0"
          >
            <MagneticFloat
              className="absolute right-1 top-[-28%] z-30 h-[95%] w-[62%] translate-x-0 scale-[1.15] sm:top-[-32%]"
              strength={0.15}
              max={16}
            >
              <Image
                src="/anchors_product.png"
                alt="ICFS anchor products"
                fill
                className="object-contain object-top drop-shadow-2xl"
                sizes="240px"
                priority
              />
            </MagneticFloat>
            <MagneticFloat
              className="absolute bottom-[12%] right-[38%] h-[40%] w-[32%] rotate-6"
              strength={0.2}
              max={12}
            >
              <Image
                src="/chemical-capsule-supercap.png"
                alt="ICFS chemical capsule supercap"
                fill
                className="object-contain drop-shadow-lg"
                sizes="120px"
              />
            </MagneticFloat>

            <div className="relative z-10 flex h-full min-h-[180px] flex-col justify-between pr-[42%] lg:min-h-0">
              <div>
                <p className="text-[1.05rem] font-bold leading-snug tracking-[-0.02em] xl:text-[1.15rem]">
                  Complete collection of ICFS fastening products
                </p>
                <p className="mt-1.5 text-[12px] text-white/75 xl:text-[13px]">
                  See our chemical, mechanical & foam range.
                </p>
              </div>
              <Link
                href="/products"
                className="cursor-target btn-shine mt-4 inline-flex w-fit items-center rounded-full bg-white px-4 py-2 text-[12px] font-semibold text-brand transition-colors hover:bg-white/90 xl:px-5 xl:py-2.5 xl:text-[13px]"
              >
                Shop products
              </Link>
            </div>
          </div>

          {/* Process / services card */}
          <div
            data-bento
            className="relative min-h-[200px] overflow-hidden rounded-[1.5rem] bg-[#ebebeb] lg:col-span-4 lg:row-start-2 lg:min-h-0"
          >
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src="/video.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-black/25"
              aria-hidden="true"
            />

            <p className="relative z-10 max-w-[12rem] p-5 text-[1.1rem] font-bold leading-snug tracking-[-0.02em] text-white sm:p-6 xl:text-[1.15rem]">
              Precision services from cutting to rebaring
            </p>

            <Link
              href="/services"
              className="cursor-target btn-shine absolute bottom-5 left-5 z-10 inline-flex items-center rounded-full bg-white px-4 py-2 text-[12px] font-semibold text-ink shadow-sm transition-colors hover:bg-paper"
            >
              Book services →
            </Link>
          </div>
        </div>

        <div
          data-bento
          className="mt-3 flex shrink-0 flex-wrap items-center gap-3 sm:mt-3.5 sm:gap-5"
        >
          <div className="inline-flex overflow-hidden rounded-full border border-black/5 bg-white shadow-sm">
            <span className="bg-brand px-3 py-2 text-[12px] font-bold text-ink sm:px-3.5 sm:text-[13px]">
              500+
            </span>
            <span className="px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-ink/70 sm:px-3.5 sm:text-[12px]">
              Projects delivered
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-[11px] font-bold text-white">
              PB
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <p className="text-[12px] font-semibold text-ink sm:text-[13px]">Pramod Beri</p>
                <span className="text-[11px] text-amber-500" aria-label="5 stars">
                  ★★★★★
                </span>
                <span className="text-[11px] text-ink/40">(5.0)</span>
              </div>
              <p className="text-[11px] text-ink/45 sm:text-[12px]">ICFS quality matches global brands</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
