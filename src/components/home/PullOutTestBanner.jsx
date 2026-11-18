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
      className="bg-paper py-8 sm:py-10 lg:py-12"
      aria-labelledby="pull-out-test-cta-heading"
    >
      <div className="mx-auto w-full max-w-[1500px] px-3 sm:px-4 lg:px-5 xl:px-6">
        <div className="relative overflow-hidden rounded-[1.35rem] ring-1 ring-black/[0.06] sm:rounded-[1.75rem]">
          <div className="absolute inset-0">
            <Image
              src="/images/banners/pull-out-test-banner.jpg"
              alt="ICFS on-site pull out testing"
              fill
              sizes="(max-width: 1500px) 100vw, 1500px"
              className="object-cover object-right"
              priority={false}
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/30 sm:via-black/72 sm:to-black/22"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute left-6 top-7 hidden h-[4.5rem] w-[4.5rem] opacity-40 sm:left-10 sm:block"
              aria-hidden
              style={{
                backgroundImage:
                  "radial-gradient(circle, rgba(255,255,255,0.55) 1.2px, transparent 1.4px)",
                backgroundSize: "10px 10px",
              }}
            />
          </div>

          <div className="relative flex min-h-[19rem] flex-col justify-center gap-8 p-7 sm:min-h-[21rem] sm:flex-row sm:items-center sm:justify-between sm:gap-12 sm:p-10 lg:min-h-[22.5rem] lg:p-12 xl:min-h-[24rem] xl:px-14 xl:py-14">
            <div className="max-w-2xl">
              <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-white/55 sm:text-[13px]">
                On-site testing service
              </p>
              <h2
                id="pull-out-test-cta-heading"
                className="mt-2 text-[clamp(1.85rem,3.8vw,2.85rem)] font-bold leading-[1.1] tracking-[-0.03em] text-white"
              >
                Pull Out Test{" "}
                <span className="text-brand">Book Now</span>
              </h2>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/78 sm:text-[16px] lg:text-[17px]">
                Prove anchor hold on site with calibrated pull-out testing up to 75 tons.
                Covering 8 mm to 40 mm anchors, our trained team runs the test with you and
                delivers a co-signed certified report for safety and compliance.
              </p>
              <ul className="mt-5 flex flex-wrap gap-2.5" aria-label="Service highlights">
                {["Up to 75 tons", "Dia 8-40 mm", "Pan-India sites", "Co-signed report"].map(
                  (item) => (
                    <li
                      key={item}
                      className="rounded-full bg-white/10 px-3 py-1 text-[12px] font-medium text-white/85 ring-1 ring-white/15 sm:text-[13px]"
                    >
                      {item}
                    </li>
                  )
                )}
              </ul>
            </div>

            <div className="shrink-0 sm:self-center">
              <Link
                href="/services/pull-out-test/book"
                className="cursor-target btn-shine inline-flex h-12 items-center gap-2.5 rounded-full bg-brand px-7 text-[14px] font-semibold uppercase tracking-[0.06em] text-white shadow-[0_12px_32px_rgba(201,52,46,0.5)] transition hover:bg-brand-deep sm:h-[3.4rem] sm:px-8 sm:text-[15px]"
              >
                <IconCalendar />
                Book Your Test Now
              </Link>
              <p className="mt-3 max-w-[14rem] text-[12px] leading-snug text-white/50 sm:text-[13px]">
                Share site details and our technical team will confirm your schedule.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
