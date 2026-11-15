"use client";

import Image from "next/image";
import Link from "next/link";

function IconCalendar() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8 3.5v3M16 3.5v3M3.5 10h17" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      <path
        d="M9.2 15.2l1.7 1.7 3.9-4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PullOutTestBanner() {
  return (
    <section
      id="pull-out-test-cta"
      className="bg-white py-10 sm:py-12"
      aria-labelledby="pull-out-test-cta-heading"
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-5 lg:px-6 xl:px-8">
        <div className="relative overflow-hidden rounded-[1.25rem] ring-1 ring-black/[0.06] sm:rounded-[1.5rem]">
          <div className="absolute inset-0">
            <Image
              src="/images/banners/pull-out-test-banner.jpg"
              alt="ICFS on-site pull out testing"
              fill
              sizes="(max-width: 1440px) 100vw, 1440px"
              className="object-cover object-right"
              priority={false}
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-black via-black/78 to-black/25 sm:via-black/70 sm:to-black/20"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute left-5 top-6 hidden h-16 w-16 opacity-35 sm:left-8 sm:block"
              aria-hidden
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(255,255,255,0.55) 1.2px, transparent 1.4px)",
                backgroundSize: "10px 10px",
              }}
            />
          </div>

          <div className="relative flex min-h-[15rem] flex-col justify-between gap-8 p-6 sm:min-h-[16.5rem] sm:flex-row sm:items-center sm:gap-10 sm:p-8 lg:min-h-[17.5rem] lg:p-10 xl:px-12">
            <div className="max-w-xl">
              <h2
                id="pull-out-test-cta-heading"
                className="text-[clamp(1.55rem,3.2vw,2.35rem)] font-bold leading-[1.12] tracking-[-0.03em] text-white"
              >
                Pull Out Test — <span className="text-brand">Book Now</span>
              </h2>
              <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/75 sm:text-[16px]">
                Ensure anchor strength and safety with certified on-site testing services.
              </p>
            </div>

            <div className="shrink-0 sm:self-center">
              <Link
                href="/services/pull-out-test/book"
                className="cursor-target btn-shine inline-flex h-12 items-center gap-2.5 rounded-full bg-brand px-6 text-[14px] font-semibold uppercase tracking-[0.06em] text-white shadow-[0_10px_28px_rgba(201,52,46,0.45)] transition hover:bg-brand-deep sm:h-[3.25rem] sm:px-7 sm:text-[15px]"
              >
                <IconCalendar />
                Book Your Test Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
