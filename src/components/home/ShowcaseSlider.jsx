"use client";

import Image from "next/image";
import Link from "next/link";

const SPOTLIGHT = [
  {
    id: "chemical",
    title: "Chemical anchors",
    description: "Injection mortars and studs for high-load fixing in concrete and masonry.",
    href: "/shop?category=mortars",
    image: "/images/categories/mortars-cm350vesf.png",
    alt: "ICFS chemical mortar cartridge",
    fit: "contain",
  },
  {
    id: "mechanical",
    title: "Mechanical anchors",
    description: "Wedge and expansion anchors for reliable hold when the schedule is tight.",
    href: "/shop?category=mechanical",
    image: "/images/about-preview/mechanical-anchor.png",
    alt: "ICFS mechanical wedge anchor",
    fit: "contain",
  },
  {
    id: "software",
    title: "Design software",
    description: "Free tools to size chemical and mechanical anchors before you specify.",
    href: "/design-software",
    image: "/images/about-preview/indoexpert-software.png",
    alt: "ICFS IndoExpert design software",
    fit: "cover",
  },
];

export default function ShowcaseSlider() {
  return (
    <section
      id="showcase"
      className="bg-white py-14 sm:py-16 lg:py-20"
      aria-labelledby="showcase-heading"
    >
      <div className="mx-auto max-w-[1440px] px-4 sm:px-5 lg:px-6 xl:px-8">
        <div className="mb-8 max-w-2xl sm:mb-10">
          <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-brand">
            Spotlight
          </p>
          <h2
            id="showcase-heading"
            className="mt-2 text-[clamp(1.55rem,3vw,2.25rem)] font-bold tracking-[-0.03em] text-ink"
          >
            Categories we are known for
          </h2>
          <p className="mt-3 text-[15px] leading-relaxed text-ink/55 sm:text-[16px]">
            Explore chemical anchors, mechanical fixing, and design tools, then open the full range
            when you are ready to specify.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {SPOTLIGHT.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group flex flex-col overflow-hidden rounded-[1.35rem] bg-paper ring-1 ring-black/[0.06] transition hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] hover:ring-brand/25"
            >
              <div className="relative aspect-[16/11] overflow-hidden bg-white">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className={`transition-transform duration-500 group-hover:scale-[1.03] ${
                    item.fit === "contain" ? "object-contain p-6 sm:p-8" : "object-cover"
                  }`}
                />
              </div>
              <div className="flex flex-1 flex-col px-5 py-5 sm:px-6 sm:py-6">
                <h3 className="text-[17px] font-bold tracking-[-0.02em] text-ink sm:text-[18px]">
                  {item.title}
                </h3>
                <p className="mt-2 flex-1 text-[14px] leading-relaxed text-ink/55 sm:text-[15px]">
                  {item.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-brand transition group-hover:gap-2.5">
                  Explore
                  <span aria-hidden>→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
