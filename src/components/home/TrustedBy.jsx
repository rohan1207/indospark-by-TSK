"use client";

import Image from "next/image";

/** Row A — scrolls right → left */
const ROW_A = [
  { src: "/images/clients/client-01.jpg", alt: "Client partner 1" },
  { src: "/images/clients/client-02.jpg", alt: "Client partner 2" },
  { src: "/images/clients/client-03.jpg", alt: "Client partner 3" },
  { src: "/images/clients/client-04.jpg", alt: "Client partner 4" },
  { src: "/images/clients/client-05.jpg", alt: "Client partner 5" },
  { src: "/images/clients/client-06.jpg", alt: "Client partner 6" },
  { src: "/images/clients/client-07.jpg", alt: "Client partner 7" },
];

/** Row B — scrolls left → right (different set) */
const ROW_B = [
  { src: "/images/clients/client-08.jpg", alt: "Client partner 8" },
  { src: "/images/clients/client-09.jpg", alt: "Client partner 9" },
  { src: "/images/clients/client-10.jpg", alt: "Client partner 10" },
  { src: "/images/clients/client-11.jpg", alt: "Client partner 11" },
  { src: "/images/clients/client-12.jpg", alt: "Client partner 12" },
  { src: "/images/clients/client-13.jpg", alt: "Client partner 13" },
  { src: "/images/clients/client-14.jpg", alt: "Client partner 14" },
];

function LogoCard({ logo }) {
  return (
    <div className="relative flex h-14 w-[180px] shrink-0 items-center justify-center sm:h-16 sm:w-[210px] md:h-[4.5rem] md:w-[240px]">
      <Image
        src={logo.src}
        alt={logo.alt}
        fill
        sizes="240px"
        className="object-contain transition duration-300 hover:scale-[1.03]"
      />
    </div>
  );
}

function MarqueeRow({ logos, direction = "rtl" }) {
  // Pad so one cycle is always wider than the viewport, then duplicate for a seamless -50% loop
  const unit = [...logos, ...logos];
  const track = [...unit, ...unit];

  return (
    <div className="relative overflow-hidden py-1">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-white to-transparent sm:w-20"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-white to-transparent sm:w-20"
        aria-hidden
      />

      <div
        className={`flex w-max items-center gap-10 sm:gap-14 md:gap-16 ${
          direction === "rtl" ? "animate-marquee-rtl" : "animate-marquee-ltr"
        }`}
      >
        {track.map((logo, i) => (
          <LogoCard key={`${logo.src}-${i}`} logo={logo} />
        ))}
      </div>
    </div>
  );
}

export default function TrustedBy() {
  return (
    <section
      id="trusted-by"
      className="group relative overflow-hidden border-y border-black/[0.05] bg-white py-10 sm:py-12"
      aria-labelledby="trusted-by-heading"
    >
      <div className="mx-auto mb-8 max-w-[1440px] px-4 text-center sm:mb-9 sm:px-5 lg:px-6 xl:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">
          Our clients
        </p>
        <h2
          id="trusted-by-heading"
          className="mt-2 text-[clamp(1.25rem,2.4vw,1.65rem)] font-bold tracking-[-0.03em] text-ink"
        >
          Trusted by industry leaders
        </h2>
      </div>

      <div className="flex flex-col gap-6 sm:gap-8" aria-hidden="true">
        <MarqueeRow logos={ROW_A} direction="rtl" />
        <MarqueeRow logos={ROW_B} direction="ltr" />
      </div>

      <span className="sr-only">
        IndoSpark works with leading construction and industrial partners across India.
      </span>
    </section>
  );
}
